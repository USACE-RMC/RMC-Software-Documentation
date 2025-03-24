"use strict";(self.webpackChunkrmc_software_documentation=self.webpackChunkrmc_software_documentation||[]).push([[5113],{2237:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>c,default:()=>f,frontMatter:()=>l,metadata:()=>o,toc:()=>d});const o=JSON.parse('{"id":"toolbox-technical-manuals/filter-evaluation-continuation/references","title":"references","description":"<NavAndPrint","source":"@site/docs/toolbox-technical-manuals/filter-evaluation-continuation/12-references.mdx","sourceDirName":"toolbox-technical-manuals/filter-evaluation-continuation","slug":"/toolbox-technical-manuals/filter-evaluation-continuation/references","permalink":"/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/references","draft":false,"unlisted":false,"tags":[],"version":"current","lastUpdatedAt":1742135725000,"sidebarPosition":12,"frontMatter":{},"sidebar":"filterEvaluationSidebar","previous":{"title":"Permeability","permalink":"/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/permeability"},"next":{"title":"Appendix A - Acronyms","permalink":"/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/appendix-acronyms"}}');var r=t(4848),a=t(8453),i=t(8761),s=t(8807);t(6289),t(9030);const l={},c="References",u={},d=[];function m(e){const n={h1:"h1",header:"header",...(0,a.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.A,{link:"internal-erosion-suite",linkTitle:"Internal Erosion Suite",reportName:"toolbox-technical-manuals/filter-evaluation-continuation",pdfFilename:"12-references.pdf"}),"\n",(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"references",children:"References"})}),"\n",(0,r.jsx)(i.A,{bibFile:"/bibliographies/107-bib.json"})]})}function f(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(m,{...e})}):m(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>s});var o=t(6540);const r={},a=o.createContext(r);function i(e){const n=o.useContext(a);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),o.createElement(a.Provider,{value:n},e.children)}},8761:(e,n,t)=>{t.d(n,{A:()=>a});var o=t(6540),r=t(4848);const a=e=>{let{bibFile:n}=e;const[t,a]=(0,o.useState)([]),i=`/RMC-Software-Documentation/${n}`;(0,o.useEffect)((()=>{(async()=>{try{const e=await fetch(i),n=(await e.json()).sort(((e,n)=>{const t=Array.isArray(e.author)?e.author[0]:e.author,o=Array.isArray(n.author)?n.author[0]:n.author;return t.localeCompare(o)}));a(n)}catch(e){console.error("Error fetching bibliography:",e)}})()}),[i]);const s=e=>{const{author:n,year:t,title:o,journal:a,booktitle:i,report:s,manual:l,institution:c,organization:u,location:d,volume:m,edition:f,pages:h,doi:p,url:x,publisher:b}=e;return(0,r.jsxs)(r.Fragment,{children:[(v=n,Array.isArray(v)?v.length>1?v.slice(0,-1).join(", ")+" & "+v[v.length-1]:v[0]:v)," (",t,"). ",(0,r.jsx)("em",{children:o}),".",a&&` ${a}`,i&&` In ${i}`,u&&` (${u})`,d&&`, ${d}`,m&&`, Vol. ${m}`,f&&`(${f})`,h&&`, pp. ${h}`,b&&` ${b}`,c&&` ${c}`,s&&` ${s}`,l&&` ${l}`,p&&(0,r.jsxs)(r.Fragment,{children:[" ",(0,r.jsxs)("a",{href:`https://doi.org/${p}`,target:"_blank",rel:"noopener noreferrer",children:["https://doi.org/",p]})]}),x&&(0,r.jsxs)(r.Fragment,{children:[" ",(0,r.jsx)("a",{href:x,target:"_blank",rel:"noopener noreferrer",children:x})]})]});var v};return(0,r.jsx)("div",{children:(0,r.jsx)("ol",{children:t.map((e=>(0,r.jsx)("li",{className:"citation",children:s(e)},e.citationKey)))})})}},8807:(e,n,t)=>{t.d(n,{A:()=>s});t(6540);var o=t(9030),r=t(4848);const a=e=>{let{reportName:n,pdfFilename:t}=e;const a=(0,o.Ay)(`pdfs/${n}/${t}`);return(0,r.jsx)("button",{className:"download-pdf-button",onClick:()=>{const e=document.createElement("a");e.href=a,e.download=t,e.click(),console.log("Downloading PDF from:",a)},children:"\u2193 PDF"})};var i=t(6289);const s=e=>{let{link:n,linkTitle:t,reportName:o,pdfFilename:s}=e;return"none"===n?(0,r.jsx)("div",{className:"nav-and-print-container",children:(0,r.jsx)("div",{className:"print-to-pdf-container",children:(0,r.jsx)(a,{reportName:o,pdfFilename:s})})}):(0,r.jsxs)("div",{className:"nav-and-print-container",children:[(0,r.jsx)("div",{className:"nav-link",children:(0,r.jsxs)(i.A,{to:`/${n}`,children:["\u2190 ",t]})}),(0,r.jsx)("div",{className:"print-to-pdf-container",children:(0,r.jsx)(a,{reportName:o,pdfFilename:s})})]})}}}]);