"use strict";(self.webpackChunkrmc_software_documentation=self.webpackChunkrmc_software_documentation||[]).push([[2104],{4877:(e,n,s)=>{s.r(n),s.d(n,{default:()=>l});var c=s(6540),i=s(686),a=s(6584),t=s(9030),o=s(6289),r=s(4848);function l(){const[e,n]=(0,c.useState)({});(0,c.useEffect)((()=>{fetch("/RMC-Software-Documentation/versions/latestVersions.json").then((e=>e.json())).then((e=>n(e))).catch((e=>console.error("Error loading latest versions:",e)))}),[]);const s=[{icon:(0,t.Ay)("img/WebApp.png"),doc_location:(0,t.Ay)(`docs/web-applications/dst/users-guide/${e["web-applications/dst/users-guide"]}/users-guide`),doc_name:"Dam Screening Tool Users Guide",active:!1}];return(0,r.jsx)(i.A,{title:"RMC Software Documentation",description:"Documentation for RMC Software Packages",children:(0,r.jsxs)("main",{children:[(0,r.jsx)("div",{className:"header-container",children:(0,r.jsx)("h1",{children:"RMC Software Documentation"})}),(0,r.jsxs)("div",{className:"title-container",children:[(0,r.jsx)("div",{className:"title-container-nav-link",children:(0,r.jsx)(o.A,{to:`${(0,t.Ay)("web-applications")}`,children:"\u2190 Web Applications"})}),(0,r.jsx)("img",{src:(0,t.Ay)("img/WebAppFilled.png")}),(0,r.jsxs)("div",{className:"text-container",children:[(0,r.jsx)("p",{className:"text-title",children:"Dam Screening Tool"}),(0,r.jsx)("p",{className:"text-description",children:"Dam Screening Tool"})]})]}),(0,r.jsx)(a.A,{contentData:s})]})})}},6584:(e,n,s)=>{s.d(n,{A:()=>a});s(6540);var c=s(4848);const i=e=>{let{icon:n,doc_location:s,doc_name:i,active:a}=e;return a?(0,c.jsxs)("a",{href:s,className:"content-bubble",children:[(0,c.jsx)("div",{className:"icon",children:(0,c.jsx)("img",{src:n})}),(0,c.jsx)("div",{className:"doc-name",children:(0,c.jsx)("p",{children:i})})]}):(0,c.jsxs)("div",{className:"content-bubble inactive",children:[(0,c.jsx)("div",{className:"icon",children:(0,c.jsx)("img",{src:n})}),(0,c.jsxs)("div",{className:"doc-name",children:[(0,c.jsx)("p",{children:i}),(0,c.jsx)("p",{className:"coming-soon",children:"Coming soon!"})]})]})},a=e=>{let{contentData:n}=e;return(0,c.jsxs)("div",{className:"content-container",children:[(0,c.jsx)("div",{className:"bubble-container",children:n.map(((e,n)=>(0,c.jsx)(i,{icon:e.icon,doc_location:e.doc_location,doc_name:e.doc_name,active:e.active},n)))}),(0,c.jsx)("div",{className:"bottom-border"})]})}}}]);