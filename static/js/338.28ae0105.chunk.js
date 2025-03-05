"use strict";(self.webpackChunkno_thing_project_landing=self.webpackChunkno_thing_project_landing||[]).push([[338],{8988:(e,n,t)=>{t.d(n,{A:()=>a});t(5043);var s=t(1674),o=t(1675),i=t(579);const a=e=>{let{lang:n}=e;return(0,i.jsx)("footer",{className:"landing-footer inverting-text",children:(0,i.jsxs)(s.P.div,{className:"footer-content",initial:{opacity:0},animate:{opacity:1},transition:{delay:.2},children:[(0,i.jsxs)("p",{className:"footer-links",children:[(0,i.jsx)(o.N_,{to:"/privacy-policy",className:"footer-link",children:n("footer.privacyPolicy")})," ","\u25cf"," ",(0,i.jsx)(o.N_,{to:"/terms-of-use",className:"footer-link",children:n("footer.termsConditions")})]}),(0,i.jsx)("p",{children:(0,i.jsx)("span",{className:"brand",children:n("footer.brand")})}),(0,i.jsxs)("p",{children:["Copyright \xa9 ",(new Date).getFullYear()," ",n("footer.allRightsReserved")]})]})})}},9586:(e,n,t)=>{t.d(n,{A:()=>d});var s=t(2555),o=t(5043),i=t(1674),a=t(8103),r=t(579);const c=function(e){let{lang:n}=e;return(0,r.jsx)(i.P.a,{href:"https://secure.wayforpay.com/donate/NoThingProject",target:"_blank",rel:"noopener noreferrer",children:(0,r.jsxs)("button",{className:"fancy-button",children:[n("header.donateButton")," ",(0,r.jsx)("span",{children:"\u2192"})]})})};var l=t(1675),h=t(4117);const d=e=>{let{scrollToSection:n,logoOpacity:t,logoY:d,isMobile:u,showDebugButtons:j,handleStop:x,handleContinue:p,handlePrev:g,handleNext:v,showHubButton:m,showDonateButton:y,lang:f}=e;const[b,N]=(0,o.useState)(!1),k=(0,l.zy)(),w=(0,l.Zp)(),C="/"===k.pathname,{i18n:P}=(0,h.Bd)(),D=e=>{n(e),N(!1)};(0,o.useEffect)((()=>{const e=e=>{!b||e.target.closest(".mobile-nav")||e.target.closest(".hamburger")||e.target.closest(".language-switcher")||N(!1)};return document.addEventListener("click",e),()=>{document.removeEventListener("click",e)}}),[b]),(0,o.useEffect)((()=>{b?(document.body.classList.add("menu-open"),t.set(1),d.set(0)):(document.body.classList.remove("menu-open"),0===window.scrollY&&C?t.set(0):t.set(1),d.set(0))}),[b,C,t,d]);const A=e=>{P.changeLanguage(e)};return(0,r.jsxs)("header",{className:"landing-header ".concat(b?"menu-open":""),children:[(0,r.jsx)(i.P.a,{className:"logo",href:"#section1",onClick:e=>{e.preventDefault(),C?n("section1"):w("/")},style:{opacity:t,y:d},children:(0,r.jsxs)("h1",{className:"logo-text",children:[f("header.logoMain"),(0,r.jsx)("br",{}),(0,r.jsx)("span",{className:"logo-sub",children:f("header.logoSub")})]})}),C&&(0,r.jsx)(r.Fragment,{children:u?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:"header-right",children:[b&&(0,r.jsx)("div",{className:"language-switcher",children:(0,r.jsxs)("select",{value:P.language,onChange:e=>A(e.target.value),children:[(0,r.jsx)("option",{value:"uk",children:"UA"}),(0,r.jsx)("option",{value:"en",children:"EN"})]})}),(0,r.jsx)("button",{className:"hamburger",onClick:()=>{N((e=>!e))},children:b?"CLOSE":"MENU"})]}),(0,r.jsxs)("nav",{className:"mobile-nav ".concat(b?"open":""),children:[(0,r.jsx)("div",{className:"mobile-nav-footer",children:(0,r.jsx)(c,{lang:f})}),(0,r.jsxs)("ul",{children:[(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"#section2",onClick:()=>D("section2"),children:f("nav.about")})}),(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"#section3",onClick:()=>D("section3"),children:f("nav.nothing")})}),(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"#section4",onClick:()=>D("section4"),children:f("nav.stories")})}),(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"#support",onClick:()=>D("support"),children:f("nav.join")})}),(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"#section6",onClick:()=>D("section6"),children:f("nav.connect")})})]})]})]}):(0,r.jsx)("nav",{className:"landing-nav",children:(0,r.jsxs)("ul",{children:[(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"#section2",onClick:e=>{e.preventDefault(),n("section2")},children:f("nav.about")})}),(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"#section3",onClick:e=>{e.preventDefault(),n("section3")},children:f("nav.nothing")})}),(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"#section4",onClick:e=>{e.preventDefault(),n("section4")},children:f("nav.stories")})}),(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"#support",onClick:e=>{e.preventDefault(),n("support")},children:f("nav.join")})}),(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"#section6",onClick:e=>{e.preventDefault(),n("section6")},children:f("nav.connect")})})]})})}),!u&&(0,r.jsxs)("div",{className:"header-right",children:[(0,r.jsx)("div",{className:"language-switcher",children:(0,r.jsxs)("select",{value:P.language,onChange:e=>A(e.target.value),children:[(0,r.jsx)("option",{value:"en",children:"EN"}),(0,r.jsx)("option",{value:"uk",children:"UA"})]})}),(0,r.jsxs)("div",{className:"header-buttons-wrapper",children:[j&&(0,r.jsxs)(i.P.div,(0,s.A)((0,s.A)({className:"header-buttons"},(0,a.I)({opacityY:-50,duration:.7})),{},{children:[(0,r.jsx)("button",{onClick:x,children:"Stop"}),(0,r.jsx)("button",{onClick:p,children:"Continue"}),(0,r.jsx)("button",{onClick:g,children:"<"}),(0,r.jsx)("button",{onClick:v,children:">"})]})),m&&(0,r.jsx)(i.P.div,(0,s.A)((0,s.A)({className:"header-hub-button"},(0,a.I)({opacityY:-50,duration:.7})),{},{children:(0,r.jsx)("a",{href:"https://external-resource.com",target:"_blank",rel:"noopener noreferrer",children:"no.thing | HUB"})})),y&&(0,r.jsx)(c,{lang:f})]})]})]})}},5338:(e,n,t)=>{t.r(n),t.d(n,{default:()=>h});t(5043);var s=t(948),o=t(1674),i=t(1591),a=t(9586),r=t(8988),c=(t(9555),t(4117)),l=t(579);const h=()=>{const e=(0,s.d)(1),n=(0,s.d)(0),{t:t}=(0,c.Bd)();return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(i.m,{children:[(0,l.jsx)("title",{children:"Privacy Policy - no.thing.project"}),(0,l.jsx)("meta",{name:"description",content:"Privacy Policy of no.thing.project"})]}),(0,l.jsxs)(o.P.div,{className:"landing-container",initial:{opacity:0},animate:{opacity:1},transition:{duration:.8},children:[(0,l.jsx)(a.A,{lang:t,scrollToSection:()=>{},logoOpacity:e,logoY:n,isMobile:!1,showDebugButtons:!1,showHubButton:!1,showDonateButton:!1}),(0,l.jsx)("div",{className:"section-wrapper",children:(0,l.jsxs)("div",{className:"privacy-policy-content",children:[(0,l.jsx)("h2",{children:"Privacy Policy"}),(0,l.jsx)("p",{children:"At No.Thing Project, we value your privacy. This Privacy Policy outlines how we collect, use, and protect your information when you visit our website."}),(0,l.jsx)("h3",{children:"Information We Collect"}),(0,l.jsx)("p",{children:"We collect minimal data necessary to improve our website, such as analytics and contact information you voluntarily provide."}),(0,l.jsx)("h3",{children:"How We Use Your Data"}),(0,l.jsx)("p",{children:"Your data helps us enhance the No.Thing experience, ensuring a seamless and engaging platform."}),(0,l.jsx)("h3",{children:"Data Protection"}),(0,l.jsx)("p",{children:"We implement industry-standard security measures to protect your data from unauthorized access."}),(0,l.jsx)("h3",{children:"Your Rights"}),(0,l.jsxs)("p",{children:["You have the right to access, modify, or delete your personal data. Contact us at"," ",(0,l.jsx)("a",{href:"mailto:someone@nothingproject.io",children:"someone@nothingproject.io"})," ","for any privacy concerns."]})]})}),(0,l.jsx)(r.A,{lang:t})]})]})}},8103:(e,n,t)=>{t.d(n,{I:()=>s});const s=e=>{let{delay:n=.2,opacityY:t=20,duration:s=.5}=e;return{initial:{opacity:0,y:t},whileInView:{opacity:1,y:0},transition:{delay:n,duration:s},viewport:{once:!0}}}},9555:()=>{}}]);
//# sourceMappingURL=338.28ae0105.chunk.js.map