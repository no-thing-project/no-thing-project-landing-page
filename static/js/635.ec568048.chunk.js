"use strict";(self.webpackChunkno_thin_project_landing=self.webpackChunkno_thin_project_landing||[]).push([[635],{8988:(e,n,s)=>{s.d(n,{A:()=>l});var i=s(2555),t=(s(5043),s(1674)),o=s(8103),r=s(1675),c=s(579);const l=()=>(0,c.jsx)("footer",{className:"landing-footer inverting-text",children:(0,c.jsxs)(t.P.div,(0,i.A)((0,i.A)({className:"footer-content"},(0,o.I)({delay:.2})),{},{children:[(0,c.jsxs)("p",{className:"footer-links",children:[(0,c.jsx)(r.N_,{to:"/privacy-policy",className:"footer-link",children:"Privacy Policy"})," ","\u25cf"," ",(0,c.jsx)(r.N_,{to:"/terms-of-use",className:"footer-link",children:"Terms & Conditions"})]}),(0,c.jsx)("p",{children:(0,c.jsx)("span",{className:"brand",children:"no.thing.project"})}),(0,c.jsx)("p",{children:"Copyright \xa9 2025 . All Rights Reserved"})]}))})},9586:(e,n,s)=>{s.d(n,{A:()=>d});var i=s(2555),t=s(5043),o=s(1674),r=s(8103),c=s(579);const l=function(){return(0,c.jsx)(o.P.a,{href:"https://www.paypal.com/donate/?hosted_button_id=FFPAVCYLTSZV6",target:"_blank",rel:"noopener noreferrer",children:(0,c.jsxs)("button",{className:"fancy-button",children:["Contribute ",(0,c.jsx)("span",{children:"\u2192"})]})})};var a=s(1675),h=s(4117);const d=e=>{let{scrollToSection:n,logoOpacity:s,logoY:d,isMobile:u,showDebugButtons:j,handleStop:x,handleContinue:p,handlePrev:m,handleNext:g,showHubButton:f,showDonateButton:v}=e;const[b,y]=(0,t.useState)(!1),N=(0,a.zy)(),C=(0,a.Zp)(),k="/"===N.pathname,{i18n:w}=(0,h.Bd)(),A=e=>{n(e),y(!1)};(0,t.useEffect)((()=>{const e=e=>{!b||e.target.closest(".mobile-nav")||e.target.closest(".hamburger")||y(!1)};return document.addEventListener("click",e),()=>{document.removeEventListener("click",e)}}),[b]),(0,t.useEffect)((()=>{b?(document.body.classList.add("menu-open"),s.set(1),d.set(0)):(document.body.classList.remove("menu-open"),0===window.scrollY&&k?s.set(0):s.set(1),d.set(0))}),[b,k,s,d]);const P=e=>{w.changeLanguage(e)};return(0,c.jsxs)("header",{className:"landing-header ".concat(b?"menu-open":""),children:[(0,c.jsx)(o.P.a,{className:"logo",href:"#section1",onClick:e=>{e.preventDefault(),k?n("section1"):C("/")},style:{opacity:s,y:d},children:(0,c.jsxs)("h1",{className:"logo-text",children:["no.thing",(0,c.jsx)("br",{}),(0,c.jsx)("span",{className:"logo-sub",children:"project"})]})}),k&&(0,c.jsx)(c.Fragment,{children:u?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)("div",{className:"header-right",children:[b&&(0,c.jsx)("div",{className:"language-switcher",children:(0,c.jsxs)("select",{value:w.language,onChange:e=>{P(e.target.value),y(!1)},children:[(0,c.jsx)("option",{value:"uk",children:"UA"}),(0,c.jsx)("option",{value:"en",children:"EN"})]})}),(0,c.jsx)("button",{className:"hamburger",onClick:()=>{y((e=>!e))},children:b?"CLOSE":"MENU"})]}),(0,c.jsxs)("nav",{className:"mobile-nav ".concat(b?"open":""),children:[(0,c.jsx)("div",{className:"mobile-nav-footer",children:(0,c.jsx)(l,{})}),(0,c.jsxs)("ul",{children:[(0,c.jsx)("li",{children:(0,c.jsx)("a",{href:"#section2",onClick:()=>A("section2"),children:"About"})}),(0,c.jsx)("li",{children:(0,c.jsx)("a",{href:"#section3",onClick:()=>A("section3"),children:"Nothing"})}),(0,c.jsx)("li",{children:(0,c.jsx)("a",{href:"#section4",onClick:()=>A("section4"),children:"Stories"})}),(0,c.jsx)("li",{children:(0,c.jsx)("a",{href:"#support",onClick:()=>A("support"),children:"Join the movement"})}),(0,c.jsx)("li",{children:(0,c.jsx)("a",{href:"#section6",onClick:()=>A("section6"),children:"Connect"})})]})]})]}):(0,c.jsx)("nav",{className:"landing-nav",children:(0,c.jsxs)("ul",{children:[(0,c.jsx)("li",{children:(0,c.jsx)("a",{href:"#section2",onClick:e=>{e.preventDefault(),n("section2")},children:"About"})}),(0,c.jsx)("li",{children:(0,c.jsx)("a",{href:"#section3",onClick:e=>{e.preventDefault(),n("section3")},children:"Nothing"})}),(0,c.jsx)("li",{children:(0,c.jsx)("a",{href:"#section4",onClick:e=>{e.preventDefault(),n("section4")},children:"Stories"})}),(0,c.jsx)("li",{children:(0,c.jsx)("a",{href:"#support",onClick:e=>{e.preventDefault(),n("support")},children:"Join the movement"})}),(0,c.jsx)("li",{children:(0,c.jsx)("a",{href:"#section6",onClick:e=>{e.preventDefault(),n("section6")},children:"Connect"})})]})})}),!u&&(0,c.jsxs)("div",{className:"header-right",children:[(0,c.jsx)("div",{className:"language-switcher",children:(0,c.jsxs)("select",{value:w.language,onChange:e=>P(e.target.value),children:[(0,c.jsx)("option",{value:"uk",children:"UA"}),(0,c.jsx)("option",{value:"en",children:"EN"})]})}),(0,c.jsxs)("div",{className:"header-buttons-wrapper",children:[j&&(0,c.jsxs)(o.P.div,(0,i.A)((0,i.A)({className:"header-buttons"},(0,r.I)({opacityY:-50,duration:.7})),{},{children:[(0,c.jsx)("button",{onClick:x,children:"Stop"}),(0,c.jsx)("button",{onClick:p,children:"Continue"}),(0,c.jsx)("button",{onClick:m,children:"<"}),(0,c.jsx)("button",{onClick:g,children:">"})]})),f&&(0,c.jsx)(o.P.div,(0,i.A)((0,i.A)({className:"header-hub-button"},(0,r.I)({opacityY:-50,duration:.7})),{},{children:(0,c.jsx)("a",{href:"https://external-resource.com",target:"_blank",rel:"noopener noreferrer",children:"no.thing | HUB"})})),v&&(0,c.jsx)(l,{})]})]})]})}},635:(e,n,s)=>{s.r(n),s.d(n,{default:()=>a});s(5043);var i=s(948),t=s(1674),o=s(1591),r=s(9586),c=s(8988),l=(s(9555),s(579));const a=()=>{const e=(0,i.d)(1),n=(0,i.d)(0);return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(o.m,{children:[(0,l.jsx)("title",{children:"Terms of Use - no.thing.project"}),(0,l.jsx)("meta",{name:"description",content:"Terms of Use of no.thing.project"})]}),(0,l.jsxs)(t.P.div,{className:"landing-container",initial:{opacity:0},animate:{opacity:1},transition:{duration:.8},children:[(0,l.jsx)(r.A,{scrollToSection:()=>{},logoOpacity:e,logoY:n,isMobile:!1,showDebugButtons:!1,showHubButton:!1,showDonateButton:!1}),(0,l.jsx)("div",{className:"section-wrapper",children:(0,l.jsxs)("div",{className:"terms-of-use-content",children:[(0,l.jsx)("h2",{children:"Terms of Use"}),(0,l.jsx)("p",{children:"Welcome to No.Thing Project. By using our website, you agree to these terms."}),(0,l.jsx)("h3",{children:"Use of Content"}),(0,l.jsx)("p",{children:"All content on this site is for informational purposes only. Unauthorized use or duplication without consent is prohibited."}),(0,l.jsx)("h3",{children:"User Responsibilities"}),(0,l.jsx)("p",{children:"Users must respect community guidelines and refrain from harmful activities, including spamming and illegal use."}),(0,l.jsx)("h3",{children:"Liability Disclaimer"}),(0,l.jsx)("p",{children:"No.Thing Project is not responsible for any direct or indirect damages arising from the use of this site."}),(0,l.jsx)("h3",{children:"Policy Updates"}),(0,l.jsx)("p",{children:"These terms may be updated periodically. Continued use of the site signifies acceptance of changes."})]})}),(0,l.jsx)(c.A,{})]})]})}},8103:(e,n,s)=>{s.d(n,{I:()=>i});const i=e=>{let{delay:n=.2,opacityY:s=20,duration:i=.5}=e;return{initial:{opacity:0,y:s},whileInView:{opacity:1,y:0},transition:{delay:n,duration:i},viewport:{once:!0}}}},9555:()=>{}}]);
//# sourceMappingURL=635.ec568048.chunk.js.map