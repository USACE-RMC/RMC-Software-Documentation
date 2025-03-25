"use strict";(self.webpackChunkrmc_software_documentation=self.webpackChunkrmc_software_documentation||[]).push([[7302],{246:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>u,default:()=>g,frontMatter:()=>h,metadata:()=>o,toc:()=>m});const o=JSON.parse('{"id":"toolbox-technical-manuals/backward-erosion-piping-progression/background","title":"background","description":"<NavAndPrint","source":"@site/docs/toolbox-technical-manuals/backward-erosion-piping-progression/04-background.mdx","sourceDirName":"toolbox-technical-manuals/backward-erosion-piping-progression","slug":"/toolbox-technical-manuals/backward-erosion-piping-progression/background","permalink":"/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/background","draft":false,"unlisted":false,"tags":[],"version":"current","lastUpdatedAt":1742479717000,"sidebarPosition":4,"frontMatter":{},"sidebar":"bepProgressionSidebar","previous":{"title":"General Overview","permalink":"/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/general-overview"},"next":{"title":"Schmertmann","permalink":"/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/schmertmann"}}');var r=t(4848),a=t(8453),i=t(4577),s=t(1488),l=t(6916),c=t(3900),d=t(8807);t(6289),t(9030);const h={},u="Background",p={},m=[];function f(e){const n={em:"em",h1:"h1",header:"header",p:"p",...(0,a.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(d.A,{link:"/toolboxes/internal-erosion-suite",linkTitle:"Internal Erosion Suite",reportName:"toolbox-technical-manuals/backward-erosion-piping-progression",pdfFilename:"04-background.pdf"}),"\n",(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"background",children:"Background"})}),"\n",(0,r.jsx)(n.p,{children:"Backward erosion piping (BEP) is the detachment of soil particles that occurs at a free, unfiltered surface in which the process gradually\r\nworks its way toward the upstream or floodside of the embankment or its foundation until a continuous pipe is formed.\r\nErosion initiates at the downstream side of a dam or the landside of a levee through unfiltered seepage exits that may exist due to penetrations\r\nor weaknesses in the overlying blanket, such as ditches, animal burrows (such as rodent or crawfish holes), root holes, former sand boils, cracks,\r\nor other thin or weak spots. Once erosion initiates, the pipe may progress horizontally through the foundation in the direction toward the\r\nimpounded water if hydraulic gradients in the foundation are sufficiently high. The hydraulic gradients and flow must remain high near the upstream\r\nor floodside tip of the progressing pipe for particles to continue eroding."}),"\n",(0,r.jsxs)(n.p,{children:["To assess the likelihood of BEP progression (hydraulic condition), the global or average horizontal gradient in the foundation at the pipe\r\nhead, ",(0,r.jsx)(n.em,{children:"iavf = \u0394H/L"}),", as illustrated in ",(0,r.jsx)(s.A,{parentDocId:"108",figKey:"average-horizontal-gradient"}),", can be compared to the\r\ncritical horizontal gradient for BEP progression."]}),"\n",(0,r.jsx)(n.p,{children:"There are several methods for assessing the critical horizontal gradient. Creep ratios are an empirical method based on observations of seepage\r\nperformance for a range of soil types and are among the oldest methods. The inverse of the creep ratio is the average horizontal gradient if\r\nthere are no vertical structures. More recently, methods based on horizontal gradient have gained more attention for evaluating the potential for BEP of cohesionless soils,\r\nspecifically based on laboratory research involving laboratory flume tests to study the hydraulic gradient across a structure required to achieve\r\ncomplete pipe formation."}),"\n",(0,r.jsx)(i.A,{parentDocId:"108",docId:"04-background.mdx",figKey:"average-horizontal-gradient",src:"figures/toolbox-technical-manuals/backward-erosion-piping-progression/figure8.png",alt:"Geometry for average horizontal gradient.",caption:"Geometry for average horizontal gradient."}),"\n",(0,r.jsxs)(n.p,{children:["This toolbox deterministically and probabilistically assesses the likelihood of BEP progression using the adjusted Schmertmann (2000) method\r\nand the adjusted calculation rule of Sellmeijer et al. ",(0,r.jsx)(l.A,{citationKey:"Sellmeijer2011",bibFile:"/bibliographies/108-bib.json"}),", in\r\naddition to the creep ratio methods of Bligh ",(0,r.jsx)(l.A,{citationKey:"Bligh1910",bibFile:"/bibliographies/108-bib.json"})," and Lane ",(0,r.jsx)(l.A,{citationKey:"Lane1935",bibFile:"/bibliographies/108-bib.json"}),".\r\nApplying these methods correctly requires an understanding of the context from which each method was developed. Robbins and van Beek ",(0,r.jsx)(l.A,{citationKey:"vanBeek2015",bibFile:"/bibliographies/108-bib.json"}),"\r\nprovide a more detailed review of the background, advantages, and disadvantages of each method and the various laboratory test conditions (such\r\nas density, exit configuration, soil characteristics, and scale effects) that significantly impact the findings. For example, the adjusted\r\nSchmertmann method and adjusted calculation rule of Sellmeijer et al. can be used only for situations that have a purely two-dimensional (2D)\r\nseepage regime (applicable only to situations that have uniform boundary conditions parallel to the embankment centerline, such as an exposed\r\nditch or no confining layer). Some methods may not apply to the materials under consideration. For example, the adjusted calculation rule of\r\nSellmeijer et al. applies only within the range of soils tested. For soils beyond the suggested ranges and differing exit configurations, the\r\nmethods are not necessarily applicable, and the actual critical horizontal gradients may be quite different from what is estimated."]}),"\n",(0,r.jsx)(c.A,{})]})}function g(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(f,{...e})}):f(e)}},1488:(e,n,t)=>{t.d(n,{A:()=>a});var o=t(6540),r=t(4848);const a=e=>{let{parentDocId:n,figKey:t}=e;const[a,i]=(0,o.useState)(null),s=`/RMC-Software-Documentation/counters/${n.replace(/\//g,"-")}.json`;return(0,o.useEffect)((()=>{(async()=>{try{const e=await fetch(s);if(!e.ok)throw new Error(`Failed to load ${s}`);const n=await e.json();let o=null;Object.keys(n).forEach((e=>{n[e]?.figures?.[t]&&(o=n[e].figures[t])})),o?i(o):console.warn(`Figure key "${t}" not found`)}catch(e){console.error("Error loading counters:",e)}})()}),[t]),a?(0,r.jsxs)("span",{className:"figure-reference",children:["Figure ",a.figNumber]}):(0,r.jsx)("span",{children:"Loading..."})}},3900:(e,n,t)=>{t.d(n,{A:()=>s});var o=t(6540),r=t(6916),a=t(6347),i=t(4848);const s=()=>{const[e,n]=(0,o.useState)([]),t=(0,a.zy)();if((0,o.useEffect)((()=>{const e=()=>{const e=(0,r.h)(t.pathname);n(e)};e();const o=()=>{e()};return window.addEventListener("citationsUpdated",o),()=>{window.removeEventListener("citationsUpdated",o)}}),[t.pathname]),0===e.length)return null;const s=e=>{const{author:n,year:t,title:o,journal:r,booktitle:a,report:s,manual:l,institution:c,organization:d,location:h,volume:u,edition:p,pages:m,doi:f,url:g,publisher:b}=e;return(0,i.jsxs)(i.Fragment,{children:[(y=n,Array.isArray(y)?y.map((e=>{const n=e.split(" ");return`${n.slice(0,-1).map((e=>e[0]+".")).join(" ")} ${n[n.length-1]}`})).join(", "):y)," (",t,"). ",(0,i.jsx)("em",{children:o}),".",r&&` ${r}`,a&&` In ${a}`,d&&` (${d})`,h&&`, ${h}`,u&&`, Vol. ${u}`,p&&`(${p})`,m&&`, pp. ${m}`,b&&` ${b}`,c&&` ${c}`,s&&` ${s}`,l&&` ${l}`,f&&(0,i.jsxs)(i.Fragment,{children:[" ",(0,i.jsxs)("a",{href:`https://doi.org/${f}`,target:"_blank",rel:"noopener noreferrer",children:["https://doi.org/",f]})]}),g&&(0,i.jsxs)(i.Fragment,{children:[" ",(0,i.jsx)("a",{href:g,target:"_blank",rel:"noopener noreferrer",children:g})]})]});var y};return(0,i.jsx)("div",{className:"citation-footnote",style:{marginLeft:"20px"},children:(0,i.jsx)("ol",{style:{listStyleType:"none",paddingLeft:"0"},children:e.sort(((e,n)=>e.number-n.number)).map((e=>(0,i.jsxs)("li",{value:e.number,id:`footnote-${e.citationKey}`,style:{display:"flex",alignItems:"flex-start",marginBottom:"10px"},children:[(0,i.jsxs)("span",{style:{minWidth:"40px",flexShrink:0},children:["[",e.number,"]"]})," ",(0,i.jsx)("span",{style:{display:"block"},children:s(e)})]},e.citationKey)))})})}},4577:(e,n,t)=>{t.d(n,{A:()=>a});var o=t(6540),r=t(4848);const a=e=>{let{parentDocId:n,figKey:t,src:a,alt:i,caption:s}=e;const[l,c]=(0,o.useState)(null),d=`/RMC-Software-Documentation/counters/${n.replace(/\//g,"-")}.json`,h=`/RMC-Software-Documentation/${a}`;return(0,o.useEffect)((()=>{try{(async()=>{try{const e=await fetch(d);if(!e.ok)throw new Error(`Failed to load ${d}`);const n=await e.json();let o=null;Object.keys(n).forEach((e=>{n[e]?.figures?.[t]&&(o=n[e].figures[t])})),o?c(o):console.warn(`Figure key "${t}" not found`)}catch(e){console.error("Error loading counters:",e)}})()}catch(e){console.error("Critical error in useEffect:",e)}}),[n,t]),l?(0,r.jsxs)("figure",{className:"figure-container",children:[(0,r.jsx)("img",{src:h,alt:i,className:"figure-image"}),(0,r.jsxs)("figcaption",{className:"figure-caption",children:["Figure ",l.figNumber,": ",s]})]}):(0,r.jsx)("span",{children:"Loading..."})}},6916:(e,n,t)=>{t.d(n,{A:()=>c,h:()=>l});var o=t(6540),r=t(6347),a=t(9030),i=t(4848);const s=new Map,l=e=>Array.from(s.get(e)?.values()||[]),c=e=>{let{citationKey:n,bibFile:t}=e;const[l,c]=(0,o.useState)("?"),d=(0,r.zy)(),h=(0,a.Ay)(t);return(0,o.useEffect)((()=>{(async()=>{try{const e=await fetch(h),t=(await e.json()).sort(((e,n)=>{const t=Array.isArray(e.author)?e.author[0]:e.author,o=Array.isArray(n.author)?n.author[0]:n.author;return t.localeCompare(o)})),o=t.findIndex((e=>e.citationKey===n));if(-1!==o){const e=o+1;c(e),s.has(d.pathname)||s.set(d.pathname,new Map);s.get(d.pathname).set(n,{...t[o],number:e}),window.dispatchEvent(new Event("citationsUpdated"))}}catch(e){console.error("Error fetching bibliography:",e)}})()}),[n,h,d.pathname]),(0,i.jsx)("span",{className:"citation-reference",children:(0,i.jsxs)("a",{href:`#footnote-${n}`,style:{textDecorartion:"none"},children:["[",l,"]"]})})}},8453:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>s});var o=t(6540);const r={},a=o.createContext(r);function i(e){const n=o.useContext(a);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),o.createElement(a.Provider,{value:n},e.children)}},8807:(e,n,t)=>{t.d(n,{A:()=>s});t(6540);var o=t(9030),r=t(4848);const a=e=>{let{reportName:n,pdfFilename:t}=e;const a=(0,o.Ay)(`pdfs/${n}/${t}`);return(0,r.jsx)("button",{className:"download-pdf-button",onClick:()=>{const e=document.createElement("a");e.href=a,e.download=t,e.click(),console.log("Downloading PDF from:",a)},children:"\u2193 PDF"})};var i=t(6289);const s=e=>{let{link:n,linkTitle:t,reportName:o,pdfFilename:s}=e;return"none"===n?(0,r.jsx)("div",{className:"nav-and-print-container",children:(0,r.jsx)("div",{className:"print-to-pdf-container",children:(0,r.jsx)(a,{reportName:o,pdfFilename:s})})}):(0,r.jsxs)("div",{className:"nav-and-print-container",children:[(0,r.jsx)("div",{className:"nav-link",children:(0,r.jsxs)(i.A,{to:`/${n}`,children:["\u2190 ",t]})}),(0,r.jsx)("div",{className:"print-to-pdf-container",children:(0,r.jsx)(a,{reportName:o,pdfFilename:s})})]})}}}]);