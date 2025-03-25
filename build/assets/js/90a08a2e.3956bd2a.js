"use strict";(self.webpackChunkrmc_software_documentation=self.webpackChunkrmc_software_documentation||[]).push([[3885],{4577:(e,t,o)=>{o.d(t,{A:()=>n});var s=o(6540),r=o(4848);const n=e=>{let{parentDocId:t,figKey:o,src:n,alt:i,caption:a}=e;const[c,l]=(0,s.useState)(null),u=`/RMC-Software-Documentation/counters/${t.replace(/\//g,"-")}.json`,d=`/RMC-Software-Documentation/${n}`;return(0,s.useEffect)((()=>{try{(async()=>{try{const e=await fetch(u);if(!e.ok)throw new Error(`Failed to load ${u}`);const t=await e.json();let s=null;Object.keys(t).forEach((e=>{t[e]?.figures?.[o]&&(s=t[e].figures[o])})),s?l(s):console.warn(`Figure key "${o}" not found`)}catch(e){console.error("Error loading counters:",e)}})()}catch(e){console.error("Critical error in useEffect:",e)}}),[t,o]),c?(0,r.jsxs)("figure",{className:"figure-container",children:[(0,r.jsx)("img",{src:d,alt:i,className:"figure-image"}),(0,r.jsxs)("figcaption",{className:"figure-caption",children:["Figure ",c.figNumber,": ",a]})]}):(0,r.jsx)("span",{children:"Loading..."})}},5231:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>d,frontMatter:()=>i,metadata:()=>s,toc:()=>l});const s=JSON.parse('{"id":"web-applications/dst/users-guide/users-guide","title":"Introduction","description":"The Risk Management Center (RMC) of the U.S. Army Corps of Engineers (USACE) has developed a suite of Microsoft Excel spreadsheets to support risk assessments for dam and levee safety. Each analysis suite is composed of multiple toolboxes (Microsoft Excel workbooks), and each toolbox contains multiple spreadsheet tools or calculation worksheets (Microsoft Excel worksheets). The RMC Filter Evaluation (Continuation) Toolbox is part of the RMC Internal Erosion Suite.","source":"@site/docs/web-applications/dst/users-guide/users-guide.mdx","sourceDirName":"web-applications/dst/users-guide","slug":"/web-applications/dst/users-guide/","permalink":"/RMC-Software-Documentation/docs/web-applications/dst/users-guide/","draft":false,"unlisted":false,"tags":[],"version":"current","lastUpdatedAt":1742926281000,"frontMatter":{}}');var r=o(4848),n=o(8453);o(4577),o(6289);const i={},a="Introduction",c={},l=[];function u(e){const t={a:"a",br:"br",h1:"h1",header:"header",p:"p",...(0,n.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"introduction",children:"Introduction"})}),"\n",(0,r.jsx)(t.p,{children:"The Risk Management Center (RMC) of the U.S. Army Corps of Engineers (USACE) has developed a suite of Microsoft Excel spreadsheets to support risk assessments for dam and levee safety. Each analysis suite is composed of multiple toolboxes (Microsoft Excel workbooks), and each toolbox contains multiple spreadsheet tools or calculation worksheets (Microsoft Excel worksheets). The RMC Filter Evaluation (Continuation) Toolbox is part of the RMC Internal Erosion Suite."}),"\n",(0,r.jsx)(t.p,{children:"The information from these spreadsheet tools, along with other pertinent information, informs judgment when developing a list of more and less likely factors and estimating probabilities. USACE best practice for estimating probabilities is to use the best available and multiple methods, but all final probabilities are estimated using team elicitation based on the totality and strength of the evidence."}),"\n",(0,r.jsx)(t.p,{children:"The RMC continuously works to improve the performance of RMC software; report possible bugs directly to the RMC at the address listed below. Ideally, report suspected errors in written form with a description of the problem and the steps that lead to its occurrence. Suggestions for improvement are also welcomed."}),"\n",(0,r.jsxs)(t.p,{children:["U.S. Army Corps of Engineers",(0,r.jsx)(t.br,{}),"\n","Institute for Water Resources",(0,r.jsx)(t.br,{}),"\n","Risk Management Center",(0,r.jsx)(t.br,{}),"\n",(0,r.jsx)(t.a,{href:"mailto:rmc.software@usace.army.mil",children:"rmc.software@usace.army.mil"})]})]})}function d(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(u,{...e})}):u(e)}},8453:(e,t,o)=>{o.d(t,{R:()=>i,x:()=>a});var s=o(6540);const r={},n=s.createContext(r);function i(e){const t=s.useContext(n);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),s.createElement(n.Provider,{value:t},e.children)}}}]);