"use strict";(self.webpackChunkwebsite_landing=self.webpackChunkwebsite_landing||[]).push([[397],{8397:(e,t,n)=>{n.r(t),n.d(t,{default:()=>N});var o=n(5043),i=n(5741),r=n(7798),s=n(3411),a=n(8659),c=n(1591),l=n(9435),d=n(9408);const h=[[{position:new l.Pq0(0,.32,0),rotation:new l.O9p(0,0,0)},{position:new l.Pq0(0,0,0),rotation:new l.O9p(0,0,0)},{position:new l.Pq0(-.15,0,0),rotation:new l.O9p(0,0,l.cj9.degToRad(-20))},{position:new l.Pq0(.15,0,0),rotation:new l.O9p(0,0,l.cj9.degToRad(20))},{position:new l.Pq0(-.11,-.4,0),rotation:new l.O9p(0,0,l.cj9.degToRad(-15))},{position:new l.Pq0(.11,-.4,0),rotation:new l.O9p(0,0,l.cj9.degToRad(15))}]];var u=n(6064),p=n(453),m=n(1053),w=n(9612),g=n(217),f=n(8368),y=n(579);const v={debug:{enable:!0,showDebugCursorCollision:!1,debugCursorColor:16711935,showDebugOBB:!1,showDebugSphere:!1},boundary:{collisionType:"OBB",sphereScale:1},speed:{objectSpeedMultiplier:1,stateLerpSpeed:.5},performance:{enablePostProcessing:!1,pixelRatio:.3,enableShadows:!1,antialias:!0},constants:{CURSOR_IMPULSE_MULTIPLIER:.05},controls:{enableScrollRotation:!1,toggleKey:"r",enableScrollImpulse:!1,toggleImpulseKey:"i"},camera:{fov:20}};function x(e){e.updateWorldMatrix(!0,!1),e.geometry.computeBoundingBox();const t=e.geometry.boundingBox,n=new l.Pq0;t.getSize(n);const o=n.multiplyScalar(.5),i=new l.Pq0;t.getCenter(i),i.applyMatrix4(e.matrixWorld);const r=new f.W;r.center.copy(i),r.halfSize.copy(o);const s=(new l.dwI).setFromMatrix4(e.matrixWorld);return r.rotation.copy(s),r}function b(e){const t=[];for(let s=0;s<8;s++){const n=1&s?1:-1,o=2&s?1:-1,i=4&s?1:-1,r=new l.Pq0(n*e.halfSize.x,o*e.halfSize.y,i*e.halfSize.z);r.applyMatrix3(e.rotation),r.add(e.center),t.push(r)}const n=[0,1,0,2,0,4,1,3,1,5,2,3,2,6,3,7,4,5,4,6,5,7,6,7],o=new l.LoY,i=new Float32Array(3*n.length);for(let s=0;s<n.length;s++){const e=t[n[s]];i[3*s]=e.x,i[3*s+1]=e.y,i[3*s+2]=e.z}o.setAttribute("position",new l.THS(i,3));const r=new l.mrM({color:65280,depthTest:!1,transparent:!0,opacity:1});return new l.DXC(o,r)}function j(e){const t=2*Math.tan(l.cj9.degToRad(e.fov/2))*Math.abs(e.position.z);return{frustumWidth:t*e.aspect,frustumHeight:t}}const S=(0,o.forwardRef)(((e,t)=>{let{hdrTexture:n,showDebugButtons:i}=e;const r=(0,o.useRef)(null),s=(0,o.useRef)(null),a=(0,o.useRef)([]),c=(0,o.useRef)([]),f=(0,o.useRef)([]),S=(0,o.useRef)([]),N=(0,o.useRef)(!0),P=(0,o.useRef)(null),R=(0,o.useRef)(null),M=(0,o.useRef)(null),I=(0,o.useRef)(new l.YJl),C=(0,o.useRef)(h),E=(0,o.useRef)(0),T=(0,o.useRef)(new l.I9Y),L=(0,o.useRef)(!1),z=(0,o.useRef)(null),q=(0,o.useRef)(v.controls.enableScrollRotation),H=(0,o.useRef)(v.controls.enableScrollImpulse),O=(0,o.useRef)(!1),B=(0,o.useRef)(new l.Pq0);function k(){const e=a.current;e&&e.length&&(c.current=e.map((e=>e.velocity.clone())),f.current=e.map((e=>e.rotationSpeed.clone())),S.current=e.map((e=>e.mass)),e.forEach((e=>{e.mass=0,e.velocity.set(0,0,0),e.rotationSpeed.set(0,0,0)})))}function D(){const e=a.current;if(!e||!e.length)return;N.current=!1,setTimeout((()=>{N.current=!0}),500);const t=B.current||new l.Pq0(0,0,0);e.forEach((e=>{e.mass=1;let n=e.position.clone().sub(t),o=n.length();o<.001&&(n=new l.Pq0(Math.random()-.5,Math.random()-.5,Math.random()-.5),o=n.length()),n.normalize();let i=1/(o+.5);i*=.8+.4*Math.random(),e.velocity.copy(n.multiplyScalar(i));const r=.1+.3*Math.random();e.rotationSpeed.set((Math.random()-.5)*r,(Math.random()-.5)*r,(Math.random()-.5)*r),e.rotation.set(Math.random()*Math.PI*2,Math.random()*Math.PI*2,Math.random()*Math.PI*2)}))}function W(){const e=a.current;null!==e&&void 0!==e&&e.length&&(E.current++,E.current>=C.current.length&&(E.current=0),console.log("\u0417\u0430\u0441\u0442\u043e\u0441\u043e\u0432\u0443\u0454\u0442\u044c\u0441\u044f \u0444\u0456\u0433\u0443\u0440\u0430, state index:",E.current),A())}function V(){const e=a.current;null!==e&&void 0!==e&&e.length&&(E.current--,E.current<0&&(E.current=C.current.length-1),A())}function A(){const e=a.current,t=E.current,n=C.current;n[t]&&n[t].forEach(((t,n)=>{const{position:o,rotation:i}=t,r=e[n];r.startPos=r.position.clone(),r.startRot=(new l.O9p).copy(r.rotation),r.targetPos=o.clone(),r.targetRot=new l.O9p(i.x,i.y,i.z),r.lerpAlpha=0,r.isLerpingToState=!0}))}return(0,o.useEffect)((()=>{function e(e){const t=e.key.toLowerCase();t===v.controls.toggleKey.toLowerCase()&&(q.current=!q.current,console.log("Scroll rotation toggled:",q.current)),t===v.controls.toggleImpulseKey.toLowerCase()&&(H.current=!H.current,console.log("Scroll impulse toggled:",H.current))}window.addEventListener("keydown",e);const t=new l.Z58;P.current=t;const o=new l.YJl;if(I.current=o,t.add(o),v.debug.enable&&v.debug.showDebugCursorCollision){const e=new l.eaF(new l.Gu$(.05,8,8),new l.V9B({color:v.debug.debugCursorColor,wireframe:!0}));e.visible=!1,t.add(e),z.current=e}const i=new l.ubm(v.camera.fov,r.current.clientWidth/r.current.clientHeight,.1,1e3);i.position.z=5,R.current=i;const{frustumWidth:c,frustumHeight:h}=j(i),f={halfWidth:c/2,halfHeight:h/2,halfDepth:.5};if(v.debug.enable&&v.debug.showDebugSphere){const e=new l.eaF(new l.iNn(2*f.halfWidth,2*f.halfHeight,2*f.halfDepth),new l.V9B({color:16711680,wireframe:!1,transparent:!0,opacity:.2}));e.position.set(0,0,0),t.add(e)}const y=new d.JeP({antialias:v.performance.antialias,alpha:!0,premultipliedAlpha:!1});let S;if(y.setSize(r.current.clientWidth,r.current.clientHeight),y.setPixelRatio(v.performance.pixelRatio),y.shadowMap.enabled=v.performance.enableShadows,y.shadowMap.type=l.Wk7,y.toneMapping=l.FV,y.toneMappingExposure=1,r.current.appendChild(y.domElement),M.current=y,v.performance.enablePostProcessing){S=new p.s(y),s.current=S;const e=new m.A(t,i);if(S.addPass(e),1===y.getPixelRatio()){const e=new w.I(window.innerWidth,window.innerHeight);S.addPass(e)}const n=new g.X;S.addPass(n)}y.physicallyCorrectLights=!0;const N=new d.BdL(y);if(N.compileEquirectangularShader(),n){const e=N.fromEquirectangular(n).texture;t.environment=e,N.dispose()}else(new u.Y).setPath("hdr_maps/").load("poly_haven_studio_1k.hdr",(e=>{const n=N.fromEquirectangular(e).texture;t.environment=n,e.dispose(),N.dispose()}));const C=new l.$p8(16777215,.5);t.add(C);const E=new l.ZyN(16777215,1.5);E.position.set(2,2,2),E.castShadow=v.performance.enableShadows,E.shadow.mapSize.width=2048,E.shadow.mapSize.height=2048,E.shadow.camera.near=.1,E.shadow.camera.far=20,E.shadow.camera.left=-5,E.shadow.camera.right=5,E.shadow.camera.top=5,E.shadow.camera.bottom=-5,t.add(E);function B(e){let{geometry:n,color:i,x:r,y:s,speed:c=.05,rotation:d,isStatic:h=!1}=e;n.computeBoundingSphere();const u=new l.uSd({color:i,metalness:.5,roughness:.3,clearcoat:1,clearcoatRoughness:.1,sheen:.5,transmission:.2,opacity:1,transparent:!0}),p=new l.eaF(n,u);p.castShadow=v.performance.enableShadows,p.receiveShadow=v.performance.enableShadows,h?(p.rotationSpeed=new l.Pq0(0,0,0),p.velocity=new l.Pq0(0,0,0)):(p.rotationSpeed=new l.Pq0((Math.random()-.5)*c*v.speed.objectSpeedMultiplier,(Math.random()-.5)*c*v.speed.objectSpeedMultiplier,(Math.random()-.5)*c*v.speed.objectSpeedMultiplier),p.velocity=new l.Pq0((Math.random()-.5)*c*v.speed.objectSpeedMultiplier,(Math.random()-.5)*c*v.speed.objectSpeedMultiplier,(Math.random()-.5)*c*v.speed.objectSpeedMultiplier)),p.initialVelocity=p.velocity.clone(),p.initialRotationSpeed=p.rotationSpeed.clone(),p.mass=1,p.position.set(r,s,0),p.boundingRadius=n.boundingSphere.radius*v.boundary.sphereScale,p.isLerpingToState=!1,p.lerpAlpha=0,p.startPos=new l.Pq0,p.targetPos=new l.Pq0,p.startRot=new l.O9p,p.targetRot=new l.O9p,d&&p.rotation.copy(d),"OBB"===v.boundary.collisionType&&"CapsuleGeometry"===n.type&&v.debug.enable&&v.debug.showDebugOBB&&(p.obbHelper=b(x(p)),t.add(p.obbHelper)),o.add(p),a.current.push(p)}a.current=[];B({geometry:new l.Gu$(.1,50,50),color:0,x:10*(Math.random()-.5),y:10*(Math.random()-.5),isStatic:!1});for(let n=0;n<5;n++)B({geometry:new l.qU7(.03,.35,50,50),color:0,x:10*(Math.random()-.5),y:10*(Math.random()-.5)});let k=window.scrollY;const D=function(e,t){let n=0;return function(){const o=Date.now();if(!(o-n<t))return n=o,e(...arguments)}}((function(){const e=window.scrollY,t=e-k;k=e,q.current&&I.current&&(I.current.rotation.y=.001*e),H.current&&a.current.forEach((e=>{e.velocity.y+=-2e-4*-t}))}),16);function W(e){const t=r.current.getBoundingClientRect(),n=new l.I9Y((e.clientX-t.left)/t.width*2-1,-(e.clientY-t.top)/t.height*2+1);T.current.copy(n),L.current=!0}window.addEventListener("scroll",D),window.addEventListener("mousemove",W);const V=new l.zD7;function A(){i.aspect=r.current.clientWidth/r.current.clientHeight,i.updateProjectionMatrix(),y.setSize(r.current.clientWidth,r.current.clientHeight);const{frustumWidth:e,frustumHeight:t}=j(i);f.halfWidth=e/2,f.halfHeight=t/2}return function e(){requestAnimationFrame(e);const n=V.getDelta();if(a.current.forEach((e=>{e.collisionCount=0})),a.current.forEach((e=>{if(e.isLerpingToState){e.lerpAlpha+=n*v.speed.stateLerpSpeed;const t=Math.min(e.lerpAlpha,1);e.position.lerpVectors(e.startPos,e.targetPos,t);const o=(new l.PTz).setFromEuler(e.startRot),i=(new l.PTz).setFromEuler(e.targetRot),r=(new l.PTz).slerpQuaternions(o,i,t);e.rotation.setFromQuaternion(r),t>=1&&(e.isLerpingToState=!1)}else e.rotation.x+=e.rotationSpeed.x*n,e.rotation.z+=e.rotationSpeed.z*n,e.position.x+=e.velocity.x*n,e.position.y+=e.velocity.y*n,e.position.z+=e.velocity.z*n;const t=e.boundingRadius||0;if(e.position.x+t>f.halfWidth&&(e.position.x=f.halfWidth-t,e.velocity.x*=-1),e.position.x-t<-f.halfWidth&&(e.position.x=-f.halfWidth+t,e.velocity.x*=-1),e.position.y+t>f.halfHeight&&(e.position.y=f.halfHeight-t,e.velocity.y*=-1),e.position.y-t<-f.halfHeight&&(e.position.y=-f.halfHeight+t,e.velocity.y*=-1),e.position.z+t>f.halfDepth&&(e.position.z=f.halfDepth-t,e.velocity.z*=-1),e.position.z-t<-f.halfDepth&&(e.position.z=-f.halfDepth+t,e.velocity.z*=-1),e.obbHelper&&v.debug.enable&&v.debug.showDebugOBB){const t=b(x(e));e.obbHelper.geometry.dispose(),e.obbHelper.geometry=t.geometry}})),L.current&&!O.current){const e=new l.tBo;e.setFromCamera(T.current,R.current);const t=e.ray;let n=!1;a.current.forEach((e=>{const o=new l.iyt(e.position,e.boundingRadius);if(t.intersectsSphere(o)){const o=new l.Pq0;t.closestPointToPoint(e.position,o);if(o.distanceTo(e.position)<e.boundingRadius){const t=(new l.Pq0).subVectors(e.position,o).normalize(),i=v.constants.CURSOR_IMPULSE_MULTIPLIER;e.velocity.add(t.clone().multiplyScalar(i));const r=new l.Pq0(t.y,0,-t.x).multiplyScalar(.5*i);e.rotationSpeed.add(r),e.collisionCount=(e.collisionCount||0)+1,v.debug.enable&&v.debug.showDebugCursorCollision&&z.current&&(z.current.position.copy(o),z.current.visible=!0),n=!0}}})),z.current&&!n&&(z.current.visible=!1)}a.current.forEach((e=>{const t=.99*(1-Math.min(.05*(e.collisionCount||0),.5)),n=e.velocity.length()*t,o=e.initialVelocity?e.initialVelocity.length():0,i=Math.max(n,o);e.velocity.length()>0&&e.velocity.setLength(i);const r=e.rotationSpeed.length()*t,s=e.initialRotationSpeed?e.initialRotationSpeed.length():0,a=Math.max(r,s);e.rotationSpeed.length()>0&&e.rotationSpeed.setLength(a)})),v.performance.enablePostProcessing&&s.current?s.current.render(n):y.render(t,i)}(),window.addEventListener("resize",A),()=>{window.removeEventListener("resize",A),window.removeEventListener("mousemove",W),window.removeEventListener("scroll",D),window.removeEventListener("keydown",e),r.current.removeChild(y.domElement),y.dispose()}}),[n]),(0,o.useEffect)((()=>{let e=!1,t=!1,n=null;function o(o){e=!0;const i=r.current.getBoundingClientRect(),s=new l.I9Y((o.clientX-i.left)/i.width*2-1,-(o.clientY-i.top)/i.height*2+1),c=new l.tBo;c.setFromCamera(s,R.current);const d=new l.Zcv(new l.Pq0(0,0,1),0),h=new l.Pq0;c.ray.intersectPlane(d,h),B.current=h.clone(),O.current=!0,n=setTimeout((()=>{if(e){t=!0;const e=C.current[Math.floor(Math.random()*C.current.length)];E.current=e,e.forEach(((e,t)=>{const n=a.current[t];n&&(n.startPos=n.position.clone(),n.startRot=(new l.O9p).copy(n.rotation),n.targetPos=e.position.clone().add(B.current),n.targetRot=new l.O9p(e.rotation.x,e.rotation.y,e.rotation.z),n.lerpAlpha=0,n.isLerpingToState=!0)})),k()}}),500)}function i(){e&&(e=!1,n&&(clearTimeout(n),n=null),t&&(D(),t=!1),setTimeout((()=>{O.current=!1}),1e3))}return window.addEventListener("mousedown",o),window.addEventListener("mouseup",i),()=>{window.removeEventListener("mousedown",o),window.removeEventListener("mouseup",i)}}),[]),(0,o.useImperativeHandle)(t,(()=>({stopObjects:k,continueObjects:D,showNextState:W,showPreviousState:V}))),(0,y.jsx)("div",{ref:r,style:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",overflow:"hidden",pointerEvents:"none"}})})),N=e=>{let{hdrTexture:t,showDebugButtons:n,showHubButton:l,isMobile:d}=e;const h=(0,o.useRef)(null),{scrollY:u}=((0,o.useRef)(null),(0,i.N)()),p=((0,r.G)(u,[0,400,700,1400,1800,2500],["0vw","0vw","50vw","50vw","10vw","10vw"]),(0,r.G)(u,[0,390,700,800,1510,1800,2650,2700],[1,1,1,1,1,1,1,0]),(0,o.useRef)(null)),[m,w]=(0,o.useState)(1500);(0,o.useEffect)((()=>{p.current&&w(p.current.offsetWidth)}),[]);const g=(0,r.G)(u,(e=>(0,a.L)(0,-m,.5*-e)));const f=(0,o.useCallback)((e=>{const t=document.getElementById(e);if(t){!function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:800;const n=window.scrollY,o=e-n;let i=null;requestAnimationFrame((function e(r){i||(i=r);const s=r-i,a=Math.min(s/t,1),c=a<.5?2*a*a:(4-2*a)*a-1;window.scrollTo(0,n+o*c),s<t&&requestAnimationFrame(e)}))}(t.getBoundingClientRect().top+window.scrollY,1e3)}}),[]);return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(c.m,{children:(0,y.jsx)("link",{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"})}),(0,y.jsxs)(s.P.div,{className:"landing-container",initial:{opacity:0},animate:{opacity:1},transition:{duration:1},children:[!d&&(0,y.jsxs)("div",{className:"background-container",children:[(0,y.jsx)(o.Suspense,{fallback:(0,y.jsx)("div",{children:"Loading 3D scene..."}),children:(0,y.jsx)("div",{className:"scene-wrapper",children:(0,y.jsx)(S,{ref:h,hdrTexture:t,showDebugButtons:n,isMobile:d})})}),(0,y.jsx)("div",{className:"glass-overlay"})]}),(0,y.jsxs)("header",{className:"landing-header",children:[(0,y.jsx)(s.P.a,{className:"logo",href:"#section1",onClick:e=>{e.preventDefault(),f("section1")},initial:{opacity:0,y:-50},whileInView:{opacity:1,y:0},transition:{duration:.5},viewport:{once:!0},children:(0,y.jsxs)("h1",{className:"logo-text",children:["no.thing",(0,y.jsx)("br",{}),(0,y.jsx)("span",{className:"logo-sub",children:"project"})]})}),!d&&(0,y.jsx)("nav",{className:"landing-nav",children:(0,y.jsxs)("ul",{children:[(0,y.jsx)("li",{children:(0,y.jsx)("a",{href:"#section2",onClick:e=>{e.preventDefault(),f("section2")},children:"What is"})}),(0,y.jsx)("li",{children:(0,y.jsx)("a",{href:"#section3",onClick:e=>{e.preventDefault(),f("section3")},children:"Nothing"})}),(0,y.jsx)("li",{children:(0,y.jsx)("a",{href:"#section4",onClick:e=>{e.preventDefault(),f("section4")},children:"For You?"})}),(0,y.jsx)("li",{children:(0,y.jsx)("a",{href:"#section6",onClick:e=>{e.preventDefault(),f("section6")},children:"Contact Us"})})]})}),(0,y.jsxs)("div",{className:"header-buttons-wrapper",children:[n&&(0,y.jsxs)(s.P.div,{className:"header-buttons",initial:{opacity:0,y:-50},whileInView:{opacity:1,y:0},transition:{duration:.7},viewport:{once:!0},children:[(0,y.jsx)("button",{onClick:()=>{var e;return null===(e=h.current)||void 0===e?void 0:e.stopObjects()},children:"Stop"}),(0,y.jsx)("button",{onClick:()=>{var e;return null===(e=h.current)||void 0===e?void 0:e.continueObjects()},children:"Continue"}),(0,y.jsx)("button",{onClick:()=>{var e;return null===(e=h.current)||void 0===e?void 0:e.showPreviousState()},children:"<"}),(0,y.jsx)("button",{onClick:()=>{var e;return null===(e=h.current)||void 0===e?void 0:e.showNextState()},children:">"})]}),l&&(0,y.jsx)(s.P.div,{className:"header-hub-button",initial:{opacity:0,y:-50},whileInView:{opacity:1,y:0},transition:{duration:.7},viewport:{once:!0},children:(0,y.jsx)("a",{href:"https://external-resource.com",target:"_blank",rel:"noopener noreferrer",children:"no.thing | HUB"})})]})]}),(0,y.jsx)("section",{id:"section1",className:"page-section first-screen","data-section-id":"1",children:(0,y.jsxs)("div",{className:"first-screen-content",children:[(0,y.jsx)(s.P.h1,{className:"first-screen-title",initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},transition:{delay:.2,duration:.5},viewport:{once:!0},children:"No.Thing Project"}),(0,y.jsx)(s.P.p,{className:"first-screen-description",initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},transition:{delay:.4,duration:.5},viewport:{once:!0},children:"start with Nothing, create Everything"}),(0,y.jsx)(s.P.p,{className:"first-screen-description",initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},transition:{delay:.4,duration:.5},viewport:{once:!0}})]})}),(0,y.jsx)("section",{id:"section2",className:"page-section second-screen","data-section-id":"2",children:(0,y.jsxs)("div",{className:"second-screen-content",children:[(0,y.jsx)(s.P.h1,{className:"second-screen-title",initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},transition:{delay:.2,duration:.5},viewport:{once:!0},children:"WHAT IS"}),(0,y.jsx)(s.P.p,{className:"second-screen-description",initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},transition:{delay:.4,duration:.5},viewport:{once:!0},children:"No.Thing Project is a movement, a mindset, and a platform for transformation"}),(0,y.jsx)(s.P.p,{className:"second-screen-description",initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},transition:{delay:.6,duration:.5},viewport:{once:!0},children:"It is the idea that nothing is not emptiness but a starting point\u2014a space where creativity, innovation, and change can emerge."}),(0,y.jsx)(s.P.p,{className:"second-screen-description",initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},transition:{delay:.6,duration:.5},viewport:{once:!0},children:"We embrace minimalism as a tool for clarity and inspiration, proving that even from nothing, something extraordinary can be built."})]})}),(0,y.jsx)("section",{id:"section3",className:"page-section section3","data-section-id":"3",children:(0,y.jsx)(s.P.h2,{className:"section3-title",initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},transition:{delay:.2,duration:.5},viewport:{once:!0},children:"WHAT IS NOTHING FOR YOU?".split(" ").map(((e,t)=>(0,y.jsx)("a",{style:{display:"block"},children:e},t)))})}),(0,y.jsx)("section",{id:"section4",className:"page-section section4","data-section-id":"4",children:(0,y.jsxs)("div",{className:"stories-container",children:[(0,y.jsx)("div",{className:"story",children:(0,y.jsxs)("div",{className:"story-content",children:[(0,y.jsx)("div",{className:"story-photo",children:(0,y.jsx)("img",{src:"someone-photo.png",alt:"Someone"})}),(0,y.jsxs)("div",{className:"story-text",children:[(0,y.jsx)("h3",{className:"story-name",children:"Someone"}),(0,y.jsx)("p",{className:"story-description",children:"Nothing is not emptiness. It is a breath before a thought. A space before a step. A silence before a song. Nothing is not absence. It is freedom from what does not matter. It is the weight that was never there. I do not fear nothing. I live in it. I move with it. And in nothing, I find everything."})]})]})}),(0,y.jsx)("div",{className:"story",children:(0,y.jsxs)("div",{className:"story-content",children:[(0,y.jsx)("div",{className:"story-photo",children:(0,y.jsx)("img",{src:"noone-photo.png",alt:"Noone"})}),(0,y.jsxs)("div",{className:"story-text",children:[(0,y.jsx)("h3",{className:"story-name",children:"Noone"}),(0,y.jsx)("p",{className:"story-description",children:"For me, Nothing is not empty. It\u2019s not the absence of meaning, but the space where meaning begins. Nothing is silence before a song, the blank page before a story, the deep breath before the first step. People fear Nothing. They think it\u2019s a void, a dead end. But I see it as freedom. Freedom from expectations. Freedom to create, to reinvent, to become. I am No One. And I\u2019ve built everything from Nothing."})]})]})})]})}),(0,y.jsx)("section",{id:"section5",className:"page-section section5","data-section-id":"5",children:(0,y.jsx)("div",{className:"interesting-container",children:(0,y.jsxs)(s.P.div,{className:"interesting-wrapper",style:{x:g},children:[(0,y.jsx)("a",{ref:p,className:"interesting-text",children:"INTERESTING?"}),(0,y.jsx)("a",{className:"interesting-text",children:"INTERESTING?"})]})})}),(0,y.jsx)("section",{id:"section6",className:"page-section section6","data-section-id":"6",children:(0,y.jsxs)("div",{className:"second-screen-content",children:[(0,y.jsx)(s.P.h1,{className:"second-screen-title",initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},transition:{delay:.2,duration:.5},viewport:{once:!0},children:"CONTACT US"}),(0,y.jsxs)("div",{className:"contacts",children:[(0,y.jsx)("p",{children:(0,y.jsx)("a",{href:"mailto:someone@nothingproject.io",children:"someone@nothingproject.io"})}),(0,y.jsx)("p",{children:(0,y.jsx)("a",{href:"mailto:noone@nothingproject.io",children:"noone@nothingproject.io"})}),(0,y.jsxs)("div",{className:"social-icons",children:[(0,y.jsx)(s.P.a,{href:"https://t.me/no_thing_project",target:"_blank",rel:"noopener noreferrer",className:"social-icon",whileHover:{scale:1,color:"#7f44ff"},transition:{duration:.1,ease:"easeInOut"},children:(0,y.jsx)("i",{className:"fab fa-telegram"})}),(0,y.jsx)(s.P.a,{href:"https://www.instagram.com/no.thing.project",target:"_blank",rel:"noopener noreferrer",className:"social-icon",whileHover:{scale:1,color:"#7f44ff"},transition:{duration:.1,ease:"easeInOut"},children:(0,y.jsx)("i",{className:"fab fa-instagram"})})]})]})]})}),(0,y.jsx)("footer",{className:"landing-footer",children:(0,y.jsxs)(s.P.div,{className:"footer-content",initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},transition:{delay:.8,duration:.5},viewport:{once:!0},children:[(0,y.jsxs)("p",{children:["\xa9 2025 ",(0,y.jsx)("span",{className:"brand",children:"no.thing.project"})]}),(0,y.jsx)("p",{className:"rights",children:"ALL.RIGHTS.RESERVED"})]})})]})]})}}}]);
//# sourceMappingURL=397.fee84b58.chunk.js.map