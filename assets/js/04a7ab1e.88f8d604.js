"use strict";(self.webpackChunkrmc_software_documentation=self.webpackChunkrmc_software_documentation||[]).push([[5780],{6213:(e,s,i)=>{i.r(s),i.d(s,{default:()=>l});var n=i(6540),c=i(4582),t=i(6584),a=i(9030),o=i(6289),r=i(4848);function l(){const[e,s]=(0,n.useState)({});(0,n.useEffect)((()=>{fetch("/RMC-Software-Documentation/versions/latestVersions.json").then((e=>e.json())).then((e=>s(e))).catch((e=>console.error("Error loading latest versions:",e)))}),[]);const i=[{icon:(0,a.Ay)("img/LifeSim.png"),doc_location:(0,a.Ay)(`docs/desktop-applications/lifesim/users-guide/${e["desktop-applications/lifesim/users-guide"]}/users-guide`),doc_name:"LifeSim Users Guide",active:!1}];return(0,r.jsx)(c.A,{title:"RMC Software Documentation",description:"Documentation for RMC Software Packages",children:(0,r.jsxs)("main",{children:[(0,r.jsx)("div",{className:"header-container",children:(0,r.jsx)("h1",{children:"RMC Software Documentation"})}),(0,r.jsxs)("div",{className:"title-container",children:[(0,r.jsx)("div",{className:"title-container-nav-link",children:(0,r.jsx)(o.A,{to:`${(0,a.Ay)("desktop-applications/desktop-applications")}`,children:"\u2190 Desktop Applications"})}),(0,r.jsx)("img",{src:(0,a.Ay)("img/LifeSim.png")}),(0,r.jsxs)("div",{className:"text-container",children:[(0,r.jsx)("p",{className:"text-title",children:"LifeSim"}),(0,r.jsx)("p",{className:"text-description",children:"LifeSim"})]})]}),(0,r.jsx)(t.A,{contentData:i})]})})}},6584:(e,s,i)=>{i.d(s,{A:()=>t});i(6540);var n=i(4848);const c=e=>{let{icon:s,doc_location:i,doc_name:c,active:t}=e;return t?(0,n.jsxs)("a",{href:i,className:"content-bubble",children:[(0,n.jsx)("div",{className:"icon",children:(0,n.jsx)("img",{src:s})}),(0,n.jsx)("div",{className:"doc-name",children:(0,n.jsx)("p",{children:c})})]}):(0,n.jsxs)("div",{className:"content-bubble inactive",children:[(0,n.jsx)("div",{className:"icon",children:(0,n.jsx)("img",{src:s})}),(0,n.jsxs)("div",{className:"doc-name",children:[(0,n.jsx)("p",{children:c}),(0,n.jsx)("p",{className:"coming-soon",children:"Coming soon!"})]})]})},t=e=>{let{contentData:s}=e;return(0,n.jsxs)("div",{className:"content-container",children:[(0,n.jsx)("div",{className:"bubble-container",children:s.map(((e,s)=>(0,n.jsx)(c,{icon:e.icon,doc_location:e.doc_location,doc_name:e.doc_name,active:e.active},s)))}),(0,n.jsx)("div",{className:"bottom-border"})]})}}}]);