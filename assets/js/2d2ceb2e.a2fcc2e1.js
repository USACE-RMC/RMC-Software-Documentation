"use strict";(self.webpackChunkrmc_software_documentation=self.webpackChunkrmc_software_documentation||[]).push([[7642],{6584:(e,s,t)=>{t.d(s,{A:()=>i});t(6540);var c=t(4848);const n=e=>{let{icon:s,doc_location:t,doc_name:n,active:i}=e;return i?(0,c.jsxs)("a",{href:t,className:"content-bubble",children:[(0,c.jsx)("div",{className:"icon",children:(0,c.jsx)("img",{src:s})}),(0,c.jsx)("div",{className:"doc-name",children:(0,c.jsx)("p",{children:n})})]}):(0,c.jsxs)("div",{className:"content-bubble inactive",children:[(0,c.jsx)("div",{className:"icon",children:(0,c.jsx)("img",{src:s})}),(0,c.jsxs)("div",{className:"doc-name",children:[(0,c.jsx)("p",{children:n}),(0,c.jsx)("p",{className:"coming-soon",children:"Coming soon!"})]})]})},i=e=>{let{contentData:s}=e;return(0,c.jsxs)("div",{className:"content-container",children:[(0,c.jsx)("div",{className:"bubble-container",children:s.map(((e,s)=>(0,c.jsx)(n,{icon:e.icon,doc_location:e.doc_location,doc_name:e.doc_name,active:e.active},s)))}),(0,c.jsx)("div",{className:"bottom-border"})]})}},9574:(e,s,t)=>{t.r(s),t.d(s,{default:()=>l});var c=t(6540),n=t(4582),i=t(6584),a=t(9030),o=t(6289),r=t(4848);function l(){const[e,s]=(0,c.useState)({});(0,c.useEffect)((()=>{fetch("/RMC-Software-Documentation/versions/latestVersions.json").then((e=>e.json())).then((e=>s(e))).catch((e=>console.error("Error loading latest versions:",e)))}),[]);const t=[{icon:(0,a.Ay)("img/BestFit.png"),doc_location:(0,a.Ay)(`docs/desktop-applications/rmc-bestfit/users-guide/${e["desktop-applications/rmc-bestfit/users-guide"]}users-guide`),doc_name:"RMC BestFit Users Guide",active:!1}];return(0,r.jsx)(n.A,{title:"RMC Software Documentation",description:"Documentation for RMC Software Packages",children:(0,r.jsxs)("main",{children:[(0,r.jsx)("div",{className:"header-container",children:(0,r.jsx)("h1",{children:"RMC Software Documentation"})}),(0,r.jsxs)("div",{className:"title-container",children:[(0,r.jsx)("div",{className:"title-container-nav-link",children:(0,r.jsx)(o.A,{to:`${(0,a.Ay)("desktop-applications/desktop-applications")}`,children:"\u2190 Desktop Applications"})}),(0,r.jsx)("img",{src:(0,a.Ay)("img/BestFit.png")}),(0,r.jsxs)("div",{className:"text-container",children:[(0,r.jsx)("p",{className:"text-title",children:"RMC BestFit"}),(0,r.jsx)("p",{className:"text-description",children:"RMC BestFit"})]})]}),(0,r.jsx)(i.A,{contentData:t})]})})}}}]);