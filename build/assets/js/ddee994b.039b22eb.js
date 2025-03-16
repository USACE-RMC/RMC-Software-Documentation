"use strict";(self.webpackChunkrmc_software_documentation=self.webpackChunkrmc_software_documentation||[]).push([[869],{1488:(e,n,t)=>{t.d(n,{A:()=>i});var r=t(6540),a=t(4848);const i=e=>{let{parentDocId:n,figKey:t}=e;const[i,o]=(0,r.useState)(null);return(0,r.useEffect)((()=>{(async()=>{try{const e=`/counters/${n.replace(/\//g,"-")}.json`,r=await fetch(e);if(!r.ok)throw new Error(`Failed to load ${e}`);const a=await r.json();let i=null;Object.keys(a).forEach((e=>{a[e]?.figures?.[t]&&(i=a[e].figures[t])})),i?o(i):console.warn(`Figure key "${t}" not found`)}catch(e){console.error("Error loading counters:",e)}})()}),[t]),i?(0,a.jsxs)("span",{className:"figure-reference",children:["Figure ",i.figNumber]}):(0,a.jsx)("span",{children:"Loading..."})}},3900:(e,n,t)=>{t.d(n,{A:()=>s});var r=t(6540),a=t(6916),i=t(6347),o=t(4848);const s=()=>{const[e,n]=(0,r.useState)([]),t=(0,i.zy)();if((0,r.useEffect)((()=>{const e=()=>{const e=(0,a.h)(t.pathname);n(e)};e();const r=()=>{e()};return window.addEventListener("citationsUpdated",r),()=>{window.removeEventListener("citationsUpdated",r)}}),[t.pathname]),console.log("# of citations: ",e.length),0===e.length)return null;const s=e=>{const{author:n,year:t,title:r,journal:a,booktitle:i,report:s,manual:l,institution:c,organization:d,location:u,volume:h,edition:f,pages:p,doi:m,url:g,publisher:x}=e;return(0,o.jsxs)(o.Fragment,{children:[(b=n,Array.isArray(b)?b.length>1?b.slice(0,-1).join(", ")+" & "+b[b.length-1]:b[0]:b)," (",t,"). ",(0,o.jsx)("em",{children:r}),".",a&&` ${a}`,i&&` In ${i}`,d&&` (${d})`,u&&`, ${u}`,h&&`, Vol. ${h}`,f&&`(${f})`,p&&`, pp. ${p}`,x&&` ${x}`,c&&` ${c}`,s&&` ${s}`,l&&` ${l}`,m&&(0,o.jsxs)(o.Fragment,{children:[" ",(0,o.jsxs)("a",{href:`https://doi.org/${m}`,target:"_blank",rel:"noopener noreferrer",children:["https://doi.org/",m]})]}),g&&(0,o.jsxs)(o.Fragment,{children:[" ",(0,o.jsx)("a",{href:g,target:"_blank",rel:"noopener noreferrer",children:g})]})]});var b};return(0,o.jsx)("div",{className:"citation-footnote",children:(0,o.jsx)("ol",{children:e.sort(((e,n)=>e.number-n.number)).map((e=>(0,o.jsx)("li",{value:e.number,id:`footnote-${e.citationKey}`,children:s(e)},e.citationKey)))})})}},4577:(e,n,t)=>{t.d(n,{A:()=>i});var r=t(6540),a=t(4848);const i=e=>{let{parentDocId:n,figKey:t,src:i,alt:o,caption:s}=e;const[l,c]=(0,r.useState)(null);return(0,r.useEffect)((()=>{(async()=>{try{const e=`/counters/${n.replace(/\//g,"-")}.json`,r=await fetch(e);if(!r.ok)throw new Error(`Failed to load ${e}`);const a=await r.json();let i=null;Object.keys(a).forEach((e=>{a[e]?.figures?.[t]&&(i=a[e].figures[t])})),i?c(i):console.warn(`Figure key "${t}" not found`)}catch(e){console.error("Error loading counters:",e)}})()}),[n,t]),l?(0,a.jsxs)("figure",{className:"figure-container",children:[(0,a.jsx)("img",{src:i,alt:o,className:"figure-image"}),(0,a.jsxs)("figcaption",{className:"figure-caption",children:["Figure ",l.figNumber,": ",s]})]}):(0,a.jsx)("span",{children:"Loading..."})}},6916:(e,n,t)=>{t.d(n,{A:()=>l,h:()=>s});var r=t(6540),a=t(6347),i=t(4848);const o=new Map,s=e=>Array.from(o.get(e)?.values()||[]),l=e=>{let{citationKey:n,bibFile:t}=e;const[s,l]=(0,r.useState)("?"),c=(0,a.zy)();return(0,r.useEffect)((()=>{(async()=>{try{const e=await fetch(t),r=(await e.json()).sort(((e,n)=>{const t=Array.isArray(e.author)?e.author[0]:e.author,r=Array.isArray(n.author)?n.author[0]:n.author;return t.localeCompare(r)})),a=r.findIndex((e=>e.citationKey===n));if(-1!==a){const e=a+1;l(e),o.has(c.pathname)||o.set(c.pathname,new Map);o.get(c.pathname).set(n,{...r[a],number:e}),window.dispatchEvent(new Event("citationsUpdated"))}}catch(e){console.error("Error fetching bibliography:",e)}})()}),[n,t,c.pathname]),(0,i.jsx)("span",{className:"citation-reference",children:(0,i.jsxs)("sup",{children:["[",s,"]"]})})}},7057:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>f,default:()=>x,frontMatter:()=>h,metadata:()=>r,toc:()=>m});const r=JSON.parse('{"id":"toolbox-technical-manuals/filter-evaluation-continuation/background","title":"background","description":"<NavAndPrint","source":"@site/docs/toolbox-technical-manuals/filter-evaluation-continuation/04-background.mdx","sourceDirName":"toolbox-technical-manuals/filter-evaluation-continuation","slug":"/toolbox-technical-manuals/filter-evaluation-continuation/background","permalink":"/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/background","draft":false,"unlisted":false,"tags":[],"version":"current","lastUpdatedAt":1742133555000,"sidebarPosition":4,"frontMatter":{},"sidebar":"filterEvaluationSidebar","previous":{"title":"General Overview","permalink":"/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/general-overview"},"next":{"title":"Filter Gradation","permalink":"/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/filter-gradation"}}');var a=t(4848),i=t(8453),o=t(4577),s=t(1488),l=t(6916),c=t(3900),d=t(8807),u=(t(6289),t(9030));const h={},f="Background",p={},m=[];function g(e){const n={em:"em",h1:"h1",header:"header",li:"li",p:"p",ul:"ul",...(0,i.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(d.A,{link:"internal-erosion-suite",linkTitle:"Internal Erosion Suite",reportName:"toolbox-technical-manuals/filter-evaluation-continuation",pdfFilename:"04-background.pdf"}),"\n",(0,a.jsx)(n.header,{children:(0,a.jsx)(n.h1,{id:"background",children:"Background"})}),"\n",(0,a.jsx)(n.p,{children:"Once erosion initiates, it continues unless the eroding forces are reduced or migrating eroded particles are impeded. Continuation is the phase of\r\ninternal erosion where the relationship of the particle-size distribution between the base soil (core) and the filters or adjacent materials controls\r\nwhether erosion will continue."}),"\n",(0,a.jsx)(n.p,{children:"Filters are designed to prevent particle movement from intergranular seepage flow where defects are present in a base soil or seepage water flows\r\nthrough pore spaces of a soil mass in an embankment or foundation. A properly designed filter prevents movement of base soils by seepage forces at a\r\ndischarge face. The filter supports the discharge face such that bridging between closely spaced contact points prevents any movement of base soil\r\nparticles into the filter. The filter is also sufficiently coarse to allow seepage water to escape freely."}),"\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(s.A,{parentDocId:"107",figKey:"particle-retention"})," illustrates\r\nhow the filter, in contact with the soil discharge face, supports and prevents soil\r\nmovement."]}),"\n",(0,a.jsx)(o.A,{parentDocId:"107",docId:"04-background.mdx",figKey:"particle-retention",src:(0,u.ed)("/figures/toolbox-technical-manuals/filter-evaluation-continuation/figure8.png"),alt:"Schematic of filter providing particle retention",caption:"Schematic of filter providing particle retention."}),"\n",(0,a.jsxs)(n.p,{children:["The Federal Emergency Management Agency (FEMA) ",(0,a.jsx)(l.A,{citationKey:"FEMA2011",bibFile:"/bibliographies/107-bib.json"})," defines a filter as a soil gradation that meets both particle retention and drainage criteria.\r\nThe term drain refers to a soil gradation that is typically a second stage to the first-stage filter and conveys larger amounts of seepage.\r\nThis toolbox assesses the particle retention and permeability criteria of filters to inform the likelihood of continuation of erosion.\r\nThe procedures for evaluating particle retention can be for single-stage and multi-stage filters. For multi-stage filters, repeat the procedure for\r\neach zone boundary progressing from the finest to the coarsest-grained filter material."]}),"\n",(0,a.jsxs)(n.p,{children:["In their published literature, Terzaghi and Sherard used a lowercase \u201c",(0,a.jsx)(n.em,{children:"d"}),"\u201d to represent the particle size (diameter) of the base soil and an uppercase\r\n\u201c",(0,a.jsx)(n.em,{children:"D"}),"\u201d for the particle size (diameter) of the filter material. This nomenclature is still commonly used but can be confusing when designing or evaluating\r\ntwo-stage filters since the filter from the first stage becomes the base for the second stage. Therefore, the toolbox uses the following nomenclature:"]}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsxs)(n.p,{children:[(0,a.jsxs)(n.em,{children:["D",(0,a.jsx)("sub",{children:"XX"}),"Y"]}),", where ",(0,a.jsx)(n.em,{children:"D"})," = particle size (diameter)"]}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.em,{children:"XX"})," = percentage passing by weight of particles finer than ",(0,a.jsx)(n.em,{children:"D"})]}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.em,{children:"Y"})," = material designation (either ",(0,a.jsx)(n.em,{children:"B"})," = base, ",(0,a.jsx)(n.em,{children:"F"})," = first-stage filter, ",(0,a.jsx)(n.em,{children:"E"})," = second-stage envelope, or other drainage element)."]}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(c.A,{})]})}function x(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(g,{...e})}):g(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>s});var r=t(6540);const a={},i=r.createContext(a);function o(e){const n=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),r.createElement(i.Provider,{value:n},e.children)}},8807:(e,n,t)=>{t.d(n,{A:()=>o});t(6540);var r=t(4848);const a=e=>{let{reportName:n,pdfFilename:t}=e;return(0,r.jsx)("button",{className:"download-pdf-button",onClick:()=>{const e=`/pdfs/${n}/${t}`,r=document.createElement("a");r.href=e,r.download=t,r.click(),console.log("Downloading PDF from:",e)},children:"\u2193 PDF"})};var i=t(6289);const o=e=>{let{link:n,linkTitle:t,reportName:o,pdfFilename:s}=e;return"none"===n?(0,r.jsx)("div",{className:"nav-and-print-container",children:(0,r.jsx)("div",{className:"print-to-pdf-container",children:(0,r.jsx)(a,{reportName:o,pdfFilename:s})})}):(0,r.jsxs)("div",{className:"nav-and-print-container",children:[(0,r.jsx)("div",{className:"nav-link",children:(0,r.jsxs)(i.A,{to:`/${n}`,children:["\u2190 ",t]})}),(0,r.jsx)("div",{className:"print-to-pdf-container",children:(0,r.jsx)(a,{reportName:o,pdfFilename:s})})]})}}}]);