"use strict";(self.webpackChunkrmc_software_documentation=self.webpackChunkrmc_software_documentation||[]).push([[7205],{6584:(e,s,n)=>{n.d(s,{A:()=>a});n(6540);var c=n(4848);const i=e=>{let{icon:s,doc_location:n,doc_name:i,active:a}=e;return a?(0,c.jsxs)("a",{href:n,className:"content-bubble",children:[(0,c.jsx)("div",{className:"icon",children:(0,c.jsx)("img",{src:s})}),(0,c.jsx)("div",{className:"doc-name",children:(0,c.jsx)("p",{children:i})})]}):(0,c.jsxs)("div",{className:"content-bubble inactive",children:[(0,c.jsx)("div",{className:"icon",children:(0,c.jsx)("img",{src:s})}),(0,c.jsxs)("div",{className:"doc-name",children:[(0,c.jsx)("p",{children:i}),(0,c.jsx)("p",{className:"coming-soon",children:"Coming soon!"})]})]})},a=e=>{let{contentData:s}=e;return(0,c.jsxs)("div",{className:"content-container",children:[(0,c.jsx)("div",{className:"bubble-container",children:s.map(((e,s)=>(0,c.jsx)(i,{icon:e.icon,doc_location:e.doc_location,doc_name:e.doc_name,active:e.active},s)))}),(0,c.jsx)("div",{className:"bottom-border"})]})}},7040:(e,s,n)=>{n.r(s),n.d(s,{default:()=>l});var c=n(6540),i=n(4582),a=n(6584),t=n(9030),o=n(6289),r=n(4848);function l(){const[e,s]=(0,c.useState)({});(0,c.useEffect)((()=>{fetch("/RMC-Software-Documentation/versions/latestVersions.json").then((e=>e.json())).then((e=>s(e))).catch((e=>console.error("Error loading latest versions:",e)))}),[]);const n=[{icon:(0,t.Ay)("img/RFA.png"),doc_location:(0,t.Ay)(`docs/desktop-applications/rmc-rfa/users-guide/${e["desktop-applications/rmc-rfa/users-guide"]}users-guide`),doc_name:"RMC RFA Users Guide",active:!1}];return(0,r.jsx)(i.A,{title:"RMC Software Documentation",description:"Documentation for RMC Software Packages",children:(0,r.jsxs)("main",{children:[(0,r.jsx)("div",{className:"header-container",children:(0,r.jsx)("h1",{children:"RMC Software Documentation"})}),(0,r.jsxs)("div",{className:"title-container",children:[(0,r.jsx)("div",{className:"title-container-nav-link",children:(0,r.jsx)(o.A,{to:`${(0,t.Ay)("desktop-applications/desktop-applications")}`,children:"\u2190 Desktop Applications"})}),(0,r.jsx)("img",{src:(0,t.Ay)("img/RFA.png")}),(0,r.jsxs)("div",{className:"text-container",children:[(0,r.jsx)("p",{className:"text-title",children:"RMC Reservoir Frequency Analysis"}),(0,r.jsx)("p",{className:"text-description",children:"RMC Reservoir Frequency Analysis"})]})]}),(0,r.jsx)(a.A,{contentData:n})]})})}}}]);