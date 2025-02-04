import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import "./SplashScreen.css";

const SplashScreen = ({ onFinish }) => {
  const dotSize = 5; // діаметр крапки
  const controlsShape = useAnimation();
  const controlsLeft = useAnimation();
  const controlsRight = useAnimation();
  const controlsProject = useAnimation();

  useEffect(() => {
    async function sequence() {
      // 1. Крапка з'являється (масштаб 0 -> 1)
      await controlsShape.start({
        scale: [0, 1],
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.6
        }
      });

      // 2. Крапка трансформується у вертикальну лінію
      await controlsShape.start({
        height: 30,
        borderRadius: 0,
        transition: {
          type: "spring",
          stiffness: 80,
          damping: 20,
          duration: 0.6
        }
      });

      // 3. Тексти "NO" та "THING" з’являються
      controlsLeft.start({
        x: [-30, -40],
        opacity: [0, 0.5, 1],
        transition: {
          type: "spring",
          stiffness: 80,
          damping: 20,
          duration: 0.6,
          delay: 0.1
        }
      });
      controlsRight.start({
        x: [0, 5],
        opacity: [0, 0.5, 1],
        transition: {
          type: "spring",
          stiffness: 80,
          damping: 20,
          duration: 0.6,
          delay: 0.1
        }
      });

      // Невелика пауза
      await new Promise(resolve => setTimeout(resolve, 700));

      // 4. Повертаємо лінію у крапку
      await controlsShape.start({
        height: dotSize,
        borderRadius: "50%",
        transition: {
          type: "spring",
          stiffness: 120,
          damping: 20,
          duration: 0.3
        }
      });

      // 4.1. Показуємо "project" (лише фейд-ін, без зсуву)
      await controlsProject.start({
        opacity: 1,
        x: 10,
        transition: {
          type: "spring",
          stiffness: 80,
          damping: 20,
          duration: 0.6
        }
      });

      // Невелика пауза перед масштабуванням
      await new Promise(resolve => setTimeout(resolve, 500));

      // 5. Масштабуємо крапку на весь екран
      controlsShape.set({ transformOrigin: "center" });
      await controlsShape.start({
        scale: 500, // підібрати під ваш розмір екрану
        transition: {
          type: "tween",
          ease: "easeInOut",
          duration: 0.8
        }
      });

      onFinish();
    }
    sequence();
  }, [controlsShape, controlsLeft, controlsRight, controlsProject, onFinish, dotSize]);

  return (
    <div className="splash-container">
      {/* Центральна фігура (крапка / лінія / крапка) */}
      <motion.div
        className="central-shape"
        animate={controlsShape}
        initial={{
          width: dotSize,
          height: dotSize,
          borderRadius: "50%",
          backgroundColor: "#fff",
          y: 0,
          transformOrigin: "bottom center"
        }}
      />
      {/* Текст "no" */}
      <motion.div
        className="text-left"
        animate={controlsLeft}
        initial={{ opacity: 0, x: 0 }}
      >
        no
      </motion.div>
      {/* Текст "thing" */}
      <motion.div
        className="text-right"
        animate={controlsRight}
        initial={{ opacity: 0, x: 0 }}
      >
        thing
      </motion.div>
      {/* Текст "project" */}
      <motion.div
        className="text-project"
        animate={controlsProject}
        initial={{ opacity: 0, x: 10 }}
      >
        project
      </motion.div>
    </div>
  );
};

export default SplashScreen;
