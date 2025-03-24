"use strict";(self.webpackChunkrmc_software_documentation=self.webpackChunkrmc_software_documentation||[]).push([[98],{8453:(e,o,n)=>{n.d(o,{R:()=>i,x:()=>a});var t=n(6540);const r={},s=t.createContext(r);function i(e){const o=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function a(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),t.createElement(s.Provider,{value:o},e.children)}},8807:(e,o,n)=>{n.d(o,{A:()=>a});n(6540);var t=n(9030),r=n(4848);const s=e=>{let{reportName:o,pdfFilename:n}=e;const s=(0,t.Ay)(`pdfs/${o}/${n}`);return(0,r.jsx)("button",{className:"download-pdf-button",onClick:()=>{const e=document.createElement("a");e.href=s,e.download=n,e.click(),console.log("Downloading PDF from:",s)},children:"\u2193 PDF"})};var i=n(6289);const a=e=>{let{link:o,linkTitle:n,reportName:t,pdfFilename:a}=e;return"none"===o?(0,r.jsx)("div",{className:"nav-and-print-container",children:(0,r.jsx)("div",{className:"print-to-pdf-container",children:(0,r.jsx)(s,{reportName:t,pdfFilename:a})})}):(0,r.jsxs)("div",{className:"nav-and-print-container",children:[(0,r.jsx)("div",{className:"nav-link",children:(0,r.jsxs)(i.A,{to:`/${o}`,children:["\u2190 ",n]})}),(0,r.jsx)("div",{className:"print-to-pdf-container",children:(0,r.jsx)(s,{reportName:t,pdfFilename:a})})]})}},9471:(e,o,n)=>{n.r(o),n.d(o,{assets:()=>l,contentTitle:()=>c,default:()=>m,frontMatter:()=>a,metadata:()=>t,toc:()=>d});const t=JSON.parse('{"id":"toolbox-technical-manuals/backward-erosion-piping-progression/introduction","title":"introduction","description":"<NavAndPrint","source":"@site/docs/toolbox-technical-manuals/backward-erosion-piping-progression/01-introduction.mdx","sourceDirName":"toolbox-technical-manuals/backward-erosion-piping-progression","slug":"/toolbox-technical-manuals/backward-erosion-piping-progression/introduction","permalink":"/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/introduction","draft":false,"unlisted":false,"tags":[],"version":"current","lastUpdatedAt":1742418420000,"sidebarPosition":1,"frontMatter":{},"sidebar":"bepProgressionSidebar","next":{"title":"Terms and Conditions for Use","permalink":"/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/terms-and-conditions-for-use"}}');var r=n(4848),s=n(8453),i=n(8807);n(6289),n(9030);const a={},c="Introduction",l={},d=[];function p(e){const o={a:"a",br:"br",h1:"h1",header:"header",p:"p",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.A,{link:"internal-erosion-suite",linkTitle:"Internal Erosion Suite",reportName:"toolbox-technical-manuals/backward-erosion-piping-progression",pdfFilename:"01-introduction.pdf"}),"\n",(0,r.jsx)(o.header,{children:(0,r.jsx)(o.h1,{id:"introduction",children:"Introduction"})}),"\n",(0,r.jsx)(o.p,{children:"The Risk Management Center (RMC) of the U.S. Army Corps of Engineers (USACE) has developed a suite of Microsoft Excel spreadsheets to support risk assessments for dam and levee safety. Each analysis suite is composed of multiple toolboxes (Microsoft Excel workbooks), and each toolbox contains multiple spreadsheet tools or calculation worksheets (Microsoft Excel worksheets). The RMC Filter Evaluation (Continuation) Toolbox is part of the RMC Internal Erosion Suite."}),"\n",(0,r.jsx)(o.p,{children:"The information from these spreadsheet tools, along with other pertinent information, informs judgment when developing a list of more and less likely factors and estimating probabilities. USACE best practice for estimating probabilities is to use the best available and multiple methods, but all final probabilities are estimated using team elicitation based on the totality and strength of the evidence."}),"\n",(0,r.jsx)(o.p,{children:"The RMC continuously works to improve the performance of RMC software; report possible bugs directly to the RMC at the address listed below. Ideally, report suspected errors in written form with a description of the problem and the steps that lead to its occurrence. Suggestions for improvement are also welcomed."}),"\n",(0,r.jsxs)(o.p,{children:["U.S. Army Corps of Engineers",(0,r.jsx)(o.br,{}),"\n","Institute for Water Resources",(0,r.jsx)(o.br,{}),"\n","Risk Management Center",(0,r.jsx)(o.br,{}),"\n",(0,r.jsx)(o.a,{href:"mailto:rmc.software@usace.army.mil",children:"rmc.software@usace.army.mil"})]})]})}function m(e={}){const{wrapper:o}={...(0,s.R)(),...e.components};return o?(0,r.jsx)(o,{...e,children:(0,r.jsx)(p,{...e})}):p(e)}}}]);