import React, { useRef, useEffect } from "react";
import { svgPathProperties } from "svg-path-properties";

// Масив із шляхами до SVG файлів
const svgImages = [
  "assets/svg/beer.svg",
  "assets/svg/bolt.svg",
  "assets/svg/briefcase.svg",
  "assets/svg/car.svg",
  "assets/svg/circle.svg",
  "assets/svg/cloud.svg",
  "assets/svg/code.svg",
  "assets/svg/cow.svg",
  "assets/svg/cross.svg",
  "assets/svg/gear.svg",
  "assets/svg/heart.svg",
  "assets/svg/house.svg",
  "assets/svg/martini.svg",
  "assets/svg/pig.svg",
  "assets/svg/smile.svg",
  "assets/svg/star.svg",
  "assets/svg/tree.svg",
  "assets/svg/triangle.svg",
  "assets/svg/umbrella.svg",
];

// Функція для вибору випадкового SVG
const getRandomSvg = () => {
  const idx = Math.floor(Math.random() * svgImages.length);
  return svgImages[idx];
};

// Функція для завантаження всіх шляхів із SVG файлу
const loadSvgPaths = async (url) => {
  try {
    const response = await fetch(url);
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "image/svg+xml");
    const paths = doc.querySelectorAll("path");
    return Array.from(paths).map((path) => path.getAttribute("d"));
  } catch (error) {
    console.error("Помилка завантаження SVG:", error);
    return [];
  }
};

// Функція для обчислення bounding box шляху з адаптивною кількістю зразків
const computePathBBox = (pathProps) => {
  const totalLength = pathProps.getTotalLength();
  const numSamples = Math.max(100, Math.floor(totalLength / 2)); // Адаптивна кількість зразків
  let minX = Infinity,
    maxX = -Infinity,
    minY = Infinity,
    maxY = -Infinity;
  for (let i = 0; i <= numSamples; i++) {
    const pt = pathProps.getPointAtLength((totalLength * i) / numSamples);
    minX = Math.min(minX, pt.x);
    maxX = Math.max(maxX, pt.x);
    minY = Math.min(minY, pt.y);
    maxY = Math.max(maxY, pt.y);
  }
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  return { minX, maxX, minY, maxY, centerX, centerY };
};

// Налаштування констант
const SETTINGS = {
  numMetaballs: 100,
  metaballSize: 50,
  randomAccel: 0.02,
  damping: 0.99,
  speedLimit: 0.5,
  minSpeed: 0.3,
  repulsionCoeff: 0.0005,
  attractionCoeff: 0.0001,
  startImpulseMin: 0,
  startImpulseMax: 0,
  formationAttractionFactor: 0.05,
  formationGatheringSpeed: 1.3,
  formationSizeFactor: 0.1,
  formationSizeSpeed: 0.06,
  desiredSvgSize: 400,
  bondThreshold: 50,
  bondStrength: 0.001,
  formationDelay: 200,
  metaballColor: [0.0, 0.0, 0.0, 1.0],
  threshold: 0.99,
};

// Ініціалізація метаболів
const initializeMetaballs = (numMetaballs, width, height) => {
  const metaballs = [];
  for (let i = 0; i < numMetaballs; i++) {
    const radius = 10 + Math.random() * SETTINGS.metaballSize;
    const ball = {
      x: width / 2 + (Math.random() - 0.5) * 5,
      y: height / 2 + (Math.random() - 0.5) * 5,
      vx: 0,
      vy: 0,
      r: radius,
      baseR: radius,
      formation: false,
      targetX: 0,
      targetY: 0,
    };
    if (Math.random() < 0.5) {
      const corner = Math.floor(Math.random() * 4);
      let dirX = 0,
        dirY = 0;
      if (corner === 0) { dirX = -1; dirY = -1; }
      else if (corner === 1) { dirX = 1; dirY = -1; }
      else if (corner === 2) { dirX = -1; dirY = 1; }
      else { dirX = 1; dirY = 1; }
      const impulseFactor = SETTINGS.startImpulseMin + Math.random() * (SETTINGS.startImpulseMax - SETTINGS.startImpulseMin);
      const mag = impulseFactor * SETTINGS.speedLimit;
      ball.vx = dirX * mag;
      ball.vy = dirY * mag;
    } else {
      ball.vx = (Math.random() - 0.5) * SETTINGS.speedLimit * 0.2;
      ball.vy = (Math.random() - 0.5) * SETTINGS.speedLimit * 0.2;
    }
    metaballs.push(ball);
  }
  return metaballs;
};

// Оновлення метаболів
const updateMetaballs = (metaballs, width, height, isMobile) => {
  const time = performance.now() * 0.001;

  for (let i = 0; i < metaballs.length; i++) {
    for (let j = i + 1; j < metaballs.length; j++) {
      const dx = metaballs[j].x - metaballs[i].x;
      const dy = metaballs[j].y - metaballs[i].y;
      const dist = Math.sqrt(dx * dx + dy * dy) + 0.0001;
      const desiredDist = (metaballs[i].r + metaballs[j].r) * 1.5;
      let force = 0;
      if (dist < desiredDist) {
        force = -SETTINGS.repulsionCoeff * (desiredDist - dist);
      } else if (dist < desiredDist * 1.5) {
        force = SETTINGS.attractionCoeff * (dist - desiredDist);
      }
      const fx = (dx / dist) * force;
      const fy = (dy / dist) * force;
      metaballs[i].vx += fx;
      metaballs[i].vy += fy;
      metaballs[j].vx -= fx;
      metaballs[j].vy -= fy;

      if (metaballs[i].formation && metaballs[j].formation && dist < SETTINGS.bondThreshold) {
        const bondForce = SETTINGS.bondStrength * (SETTINGS.bondThreshold - dist);
        const bondFx = (dx / dist) * bondForce;
        const bondFy = (dy / dist) * bondForce;
        metaballs[i].vx += bondFx;
        metaballs[i].vy += bondFy;
        metaballs[j].vx -= bondFx;
        metaballs[j].vy -= bondFy;
      }
    }
  }

  metaballs.forEach((ball, i) => {
    ball.vx += (Math.random() - 0.5) * SETTINGS.randomAccel + Math.sin(time + i) * 0.001;
    ball.vy += (Math.random() - 0.5) * SETTINGS.randomAccel + Math.cos(time + i) * 0.001;
    ball.vx *= SETTINGS.damping;
    ball.vy *= SETTINGS.damping;

    if (ball.formation) {
      ball.vx += (ball.targetX - ball.x) * SETTINGS.formationAttractionFactor * SETTINGS.formationGatheringSpeed - SETTINGS.damping * ball.vx;
      ball.vy += (ball.targetY - ball.y) * SETTINGS.formationAttractionFactor * SETTINGS.formationGatheringSpeed - SETTINGS.damping * ball.vy;
    }
    
    const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
    if (speed < SETTINGS.minSpeed) {
      if (speed > 0.0001) {
        const factor = SETTINGS.minSpeed / speed;
        ball.vx *= factor;
        ball.vy *= factor;
      } else {
        const angle = Math.random() * 2 * Math.PI;
        ball.vx = Math.cos(angle) * SETTINGS.minSpeed;
        ball.vy = Math.sin(angle) * SETTINGS.minSpeed;
      }
    }

    ball.x += ball.vx;
    ball.y += ball.vy;

    const targetR = ball.formation ? ball.baseR * SETTINGS.formationSizeFactor : ball.baseR;
    ball.r += (targetR - ball.r) * SETTINGS.formationSizeSpeed;

    if (ball.x < ball.r) {
      ball.x = ball.r;
      ball.vx *= -1;
    } else if (ball.x > width - ball.r) {
      ball.x = width - ball.r;
      ball.vx *= -1;
    }
    if (ball.y < ball.r) {
      ball.y = ball.r;
      ball.vy *= -1;
    } else if (ball.y > height - ball.r) {
      ball.y = height - ball.r;
      ball.vy *= -1;
    }
  });
};

// Основний компонент
const MetaBallsCanvas = ({ isMobile }) => {
  const canvasRef = useRef(null);

  const CANVAS_SETTINGS = {
    numMetaballs: isMobile ? 50 : SETTINGS.numMetaballs,
    randomAccel: SETTINGS.randomAccel,
    damping: SETTINGS.damping,
    speedLimit: SETTINGS.speedLimit,
    minSpeed: SETTINGS.minSpeed,
    repulsionCoeff: SETTINGS.repulsionCoeff,
    attractionCoeff: SETTINGS.attractionCoeff,
    startImpulseMin: SETTINGS.startImpulseMin,
    startImpulseMax: SETTINGS.startImpulseMax,
  };

  useEffect(() => {
    if (isMobile) {
      SETTINGS.metaballSize = 30;
      SETTINGS.formationSizeFactor = 0.3;
    }

    const canvas = canvasRef.current;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.error("WebGL не підтримується");
      return;
    }

    const metaballs = initializeMetaballs(CANVAS_SETTINGS.numMetaballs, width, height);

    let formationActive = false;
    let formationTimer = null;
    let formationIndices = [];
    let formationOffsets = {};
    let formationCenter = { x: 0, y: 0 };

    // Обробники для миші
    const handleMouseDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      formationCenter.x = e.clientX - rect.left;
      formationCenter.y = height - (e.clientY - rect.top);
      formationTimer = setTimeout(async () => {
        formationActive = true;
        const countFormation = Math.floor(metaballs.length * (1 + 0.1 * Math.random()));
        const indices = Array.from({ length: metaballs.length }, (_, i) => i);
        for (let i = indices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        formationIndices = indices.slice(0, countFormation);

        const svgUrl = getRandomSvg();
        const svgPaths = await loadSvgPaths(svgUrl);
        if (svgPaths.length > 0) {
          const pathData = svgPaths[Math.floor(Math.random() * svgPaths.length)];
          const pathProps = new svgPathProperties(pathData);
          const bbox = computePathBBox(pathProps);
          const actualWidth = bbox.maxX - bbox.minX;
          const actualHeight = bbox.maxY - bbox.minY;
          const scale = SETTINGS.desiredSvgSize / Math.max(actualWidth, actualHeight);
          const totalLength = pathProps.getTotalLength();
          formationIndices.forEach((idx, i) => {
            const pos = pathProps.getPointAtLength((totalLength * i) / formationIndices.length);
            const centeredX = (pos.x - bbox.centerX) * scale;
            const centeredY = -(pos.y - bbox.centerY) * scale;
            formationOffsets[idx] = { x: centeredX, y: centeredY };
            metaballs[idx].formation = true;
            metaballs[idx].targetX = formationCenter.x + centeredX;
            metaballs[idx].targetY = formationCenter.y + centeredY;
          });
        } else {
          console.warn("SVG дані не завантажено");
        }
      }, SETTINGS.formationDelay);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      formationCenter.x = e.clientX - rect.left;
      formationCenter.y = height - (e.clientY - rect.top);
      if (formationActive) {
        formationIndices.forEach((idx) => {
          const offset = formationOffsets[idx];
          if (offset) {
            metaballs[idx].targetX = formationCenter.x + offset.x;
            metaballs[idx].targetY = formationCenter.y + offset.y;
          }
        });
      }
    };

    const handleMouseUp = () => {
      if (formationTimer) {
        clearTimeout(formationTimer);
        formationTimer = null;
      }
      if (formationActive) {
        formationIndices.forEach((idx) => {
          metaballs[idx].formation = false;
        });
        formationActive = false;
        formationIndices = [];
        formationOffsets = {};
      }
    };

    // Обробники для touch-подій
    const handleTouchStart = (e) => {

      if (formationActive) {
        e.preventDefault();
      }

      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      formationCenter.x = touch.clientX - rect.left;
      formationCenter.y = height - (touch.clientY - rect.top);
      formationTimer = setTimeout(async () => {
        formationActive = true;
        const countFormation = Math.floor(metaballs.length * (1 + 0.1 * Math.random()));
        const indices = Array.from({ length: metaballs.length }, (_, i) => i);
        for (let i = indices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        formationIndices = indices.slice(0, countFormation);

        const svgUrl = getRandomSvg();
        const svgPaths = await loadSvgPaths(svgUrl);
        if (svgPaths.length > 0) {
          const pathData = svgPaths[Math.floor(Math.random() * svgPaths.length)];
          const pathProps = new svgPathProperties(pathData);
          const bbox = computePathBBox(pathProps);
          const actualWidth = bbox.maxX - bbox.minX;
          const actualHeight = bbox.maxY - bbox.minY;
          const scale = SETTINGS.desiredSvgSize / Math.max(actualWidth, actualHeight);
          const totalLength = pathProps.getTotalLength();
          formationIndices.forEach((idx, i) => {
            const pos = pathProps.getPointAtLength((totalLength * i) / formationIndices.length);
            const centeredX = (pos.x - bbox.centerX) * scale;
            const centeredY = -(pos.y - bbox.centerY) * scale;
            formationOffsets[idx] = { x: centeredX, y: centeredY };
            metaballs[idx].formation = true;
            metaballs[idx].targetX = formationCenter.x + centeredX;
            metaballs[idx].targetY = formationCenter.y + centeredY;
          });
        } else {
          console.warn("SVG дані не завантажено");
        }
      }, SETTINGS.formationDelay);
    };

    const handleTouchMove = (e) => {
      if (formationActive) {
        e.preventDefault();
      }
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      formationCenter.x = touch.clientX - rect.left;
      formationCenter.y = height - (touch.clientY - rect.top);
      if (formationActive) {
        formationIndices.forEach((idx) => {
          const offset = formationOffsets[idx];
          if (offset) {
            metaballs[idx].targetX = formationCenter.x + offset.x;
            metaballs[idx].targetY = formationCenter.y + offset.y;
          }
        });
      }
    };

    const handleTouchEnd = (e) => {
      e.preventDefault();
      if (formationTimer) {
        clearTimeout(formationTimer);
        formationTimer = null;
      }
      if (formationActive) {
        formationIndices.forEach((idx) => {
          metaballs[idx].formation = false;
        });
        formationActive = false;
        formationIndices = [];
        formationOffsets = {};
      }
    };

    // Додаємо слухачі подій для миші
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseUp);

    // Додаємо слухачі подій для touch (з опцією passive: false)
    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchend", handleTouchEnd, { passive: false });
    canvas.addEventListener("touchcancel", handleTouchEnd, { passive: false });

    const vertexShaderSrc = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;
    const fragmentShaderSrc = `
      #ifdef GL_ES
      precision highp float;
      #endif
      const float WIDTH = ${width}.0;
      const float HEIGHT = ${height}.0;
      uniform float threshold;
      uniform vec3 metaballs[${CANVAS_SETTINGS.numMetaballs}];
      uniform vec4 metaballColor;
      void main() {
        float x = gl_FragCoord.x;
        float y = gl_FragCoord.y;
        float sum = 0.0;
        for (int i = 0; i < ${CANVAS_SETTINGS.numMetaballs}; i++) {
          vec3 mb = metaballs[i];
          float dx = mb.x - x;
          float dy = mb.y - y;
          float r = mb.z;
          sum += (r * r) / (dx * dx + dy * dy);
        }
        float smoothVal = smoothstep(threshold - 0.02, threshold + 0.02, sum);
        gl_FragColor = mix(vec4(1.0), metaballColor, smoothVal);
      }
    `;

    const compileShader = (src, type) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error("Помилка компіляції шейдера: " + gl.getShaderInfoLog(shader));
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSrc, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSrc, gl.FRAGMENT_SHADER);
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error("Помилка зв’язування програми: " + gl.getProgramInfoLog(program));
    }
    gl.useProgram(program);

    const vertexData = new Float32Array([-1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, -1.0]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const metaballsHandle = gl.getUniformLocation(program, "metaballs");
    const metaballColorHandle = gl.getUniformLocation(program, "metaballColor");
    const thresholdHandle = gl.getUniformLocation(program, "threshold");

    const loop = () => {
      updateMetaballs(metaballs, width, height);
      const uniformData = new Float32Array(3 * CANVAS_SETTINGS.numMetaballs);
      metaballs.forEach((mb, i) => {
        const base = i * 3;
        uniformData[base] = mb.x;
        uniformData[base + 1] = mb.y;
        uniformData[base + 2] = mb.r;
      });
      gl.useProgram(program);
      gl.uniform3fv(metaballsHandle, uniformData);
      gl.uniform4fv(metaballColorHandle, SETTINGS.metaballColor);
      gl.uniform1f(thresholdHandle, SETTINGS.threshold);
      gl.viewport(0, 0, width, height);
      gl.clearColor(1.0, 1.0, 1.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(loop);
    };
    loop();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseUp);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="metaballs-canvas"
      style={{ display: "block", backgroundColor: "white" }}
    />
  );
};

export default MetaBallsCanvas;
