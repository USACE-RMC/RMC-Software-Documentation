"use strict";(self.webpackChunkrmc_software_documentation=self.webpackChunkrmc_software_documentation||[]).push([[224],{174:(e,i,t)=>{t.r(i),t.d(i,{assets:()=>p,contentTitle:()=>d,default:()=>f,frontMatter:()=>h,metadata:()=>a,toc:()=>u});const a=JSON.parse('{"id":"toolbox-technical-manuals/filter-evaluation-continuation/permeability","title":"permeability","description":"<NavAndPrint","source":"@site/docs/toolbox-technical-manuals/filter-evaluation-continuation/11-permeability.mdx","sourceDirName":"toolbox-technical-manuals/filter-evaluation-continuation","slug":"/toolbox-technical-manuals/filter-evaluation-continuation/permeability","permalink":"/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/permeability","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":11,"frontMatter":{},"sidebar":"filterEvaluationSidebar","previous":{"title":"Constricted Exit","permalink":"/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/constricted-exit"},"next":{"title":"References","permalink":"/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/references"}}');var s=t(4848),r=t(8453),n=t(4577),l=t(1488),o=t(6916),c=t(3900),m=t(8807);t(6289);const h={},d="Permeability",p={},u=[{value:"Base Soil Characterization",id:"base-soil-characterization",level:2},{value:"Filter Material Characterization",id:"filter-material-characterization",level:2},{value:"Permeability Criterion",id:"permeability-criterion",level:2}];function x(e){const i={annotation:"annotation",blockquote:"blockquote",br:"br",em:"em",h1:"h1",h2:"h2",header:"header",math:"math",mi:"mi",mn:"mn",mo:"mo",mrow:"mrow",msub:"msub",mtext:"mtext",p:"p",semantics:"semantics",span:"span",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(m.A,{link:"internal-erosion-suite",linkTitle:"Internal Erosion Suite",reportName:"toolbox-technical-manuals/filter-evaluation-continuation",pdfFilename:"11-permeability.pdf"}),"\n",(0,s.jsx)(i.header,{children:(0,s.jsx)(i.h1,{id:"permeability",children:"Permeability"})}),"\n",(0,s.jsxs)(i.p,{children:["This worksheet assesses whether the filter material meets the drainage criterion for permeability. It requires no user-specified input.\r\nPermeability is directly proportional to the square of the effective particle size with all other factors being equal. Typically, the\r\npermeability of a filter should be at least 16 to 25 times that of the base material. This criterion is generally met if ",(0,s.jsxs)(i.em,{children:["D",(0,s.jsx)("sub",{children:"15"}),"F"]}),"\r\nis larger than 4 to 5 times ",(0,s.jsxs)(i.em,{children:["D",(0,s.jsx)("sub",{children:"15"}),"B"]}),". In some very broadly graded base soils, this requirement may be difficult to meet."]}),"\n",(0,s.jsx)(i.h2,{id:"base-soil-characterization",children:"Base Soil Characterization"}),"\n",(0,s.jsxs)(i.p,{children:["Step 1 characterizes the base soil. FEMA ",(0,s.jsx)(o.A,{citationKey:"FEMA2011",bibFile:"/bibliographies/107-bib.json"})," indicates the\r\ncoarsest ",(0,s.jsxs)(i.em,{children:["D",(0,s.jsx)("sub",{children:"15"}),"B"]})," before regrading is used to evaluate permeability requirements. Step 1 obtains the coarsest ",(0,s.jsxs)(i.em,{children:["D",(0,s.jsx)("sub",{children:"15"}),"B"]}),"\r\nbefore regrading from the Base Gradation worksheet, where it is interpolated using a logarithmic scale for particle size and linear scale\r\nfor percent passing. ",(0,s.jsx)(l.A,{parentDocId:"107",figKey:"permeability-base-soil"})," is an example of step 1."]}),"\n",(0,s.jsx)(n.A,{parentDocId:"107",docId:"11-permeability.mdx",figKey:"permeability-base-soil",src:"/figures/toolbox-technical-manuals/filter-evaluation-continuation/figure38.png",alt:"Step 1 of Permeability worksheet: Base soil characterization.",caption:"Step 1 of Permeability worksheet: Base soil characterization."}),"\n",(0,s.jsx)(i.h2,{id:"filter-material-characterization",children:"Filter Material Characterization"}),"\n",(0,s.jsxs)(i.p,{children:["Step 2 characterizes the filter material. The finest ",(0,s.jsxs)(i.em,{children:["D",(0,s.jsx)("sub",{children:"15"}),"F"]})," is obtained from the Filter Gradation worksheet, where it is interpolated\r\nusing a logarithmic scale for particle size and linear scale for percent passing. ",(0,s.jsx)(l.A,{parentDocId:"107",figKey:"permeability-filter-material"}),"\r\nis an example of step 2."]}),"\n",(0,s.jsx)(n.A,{parentDocId:"107",docId:"11-permeability.mdx",figKey:"permeability-filter-material",src:"/figures/toolbox-technical-manuals/filter-evaluation-continuation/figure39.png",alt:"Step 2 of Permeability worksheet: Filter material characterization.",caption:"Step 2 of Permeability worksheet: Filter material characterization."}),"\n",(0,s.jsx)(i.h2,{id:"permeability-criterion",children:"Permeability Criterion"}),"\n",(0,s.jsxs)(i.p,{children:["The criterion for permeability is that the filter material has a minimum ",(0,s.jsxs)(i.em,{children:["D",(0,s.jsx)("sub",{children:"15"}),"F"]})," that is an integer multiplier of the coarsest ",(0,s.jsxs)(i.em,{children:["D",(0,s.jsx)("sub",{children:"15"}),"B"]}),"\r\nbefore regrading but not less than 0.1 mm. USACE Engineer Manual (EM) 1110-2-1901 ",(0,s.jsx)(o.A,{citationKey:"USACE2005",bibFile:"/bibliographies/107-bib.json"}),"\r\nrequires a multiplier of 3 to 5. However, USBR ",(0,s.jsx)(o.A,{citationKey:"USBR2011",bibFile:"/bibliographies/107-bib.json"})," and National Resources Conservation\r\nService (NRCS) ",(0,s.jsx)(o.A,{citationKey:"USDA2017",bibFile:"/bibliographies/107-bib.json"})," require a multiplier of 5, which is considered the primary criterion\r\non this worksheet. The minimum ",(0,s.jsxs)(i.em,{children:["D",(0,s.jsx)("sub",{children:"15"}),"F"]})," of the filter material is calculated as in the following equation."]}),"\n",(0,s.jsx)(i.span,{className:"katex-display",children:(0,s.jsxs)(i.span,{className:"katex",children:[(0,s.jsx)(i.span,{className:"katex-mathml",children:(0,s.jsx)(i.math,{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block",children:(0,s.jsxs)(i.semantics,{children:[(0,s.jsxs)(i.mrow,{children:[(0,s.jsxs)(i.msub,{children:[(0,s.jsx)(i.mi,{children:"D"}),(0,s.jsx)(i.mn,{children:"15"})]}),(0,s.jsx)(i.mi,{children:"F"}),(0,s.jsx)(i.mo,{children:"="}),(0,s.jsx)(i.mn,{children:"5"}),(0,s.jsx)(i.mo,{stretchy:"false",children:"("}),(0,s.jsxs)(i.msub,{children:[(0,s.jsx)(i.mi,{children:"D"}),(0,s.jsx)(i.mn,{children:"15"})]}),(0,s.jsx)(i.mi,{children:"B"}),(0,s.jsx)(i.mo,{stretchy:"false",children:")"}),(0,s.jsx)(i.mtext,{children:"\xa0but\xa0not\xa0less\xa0than\xa00.1\xa0mm"})]}),(0,s.jsx)(i.annotation,{encoding:"application/x-tex",children:"D_{15}F = 5(D_{15}B) \\text{ but not less than 0.1 mm}"})]})})}),(0,s.jsxs)(i.span,{className:"katex-html","aria-hidden":"true",children:[(0,s.jsxs)(i.span,{className:"base",children:[(0,s.jsx)(i.span,{className:"strut",style:{height:"0.8333em",verticalAlign:"-0.15em"}}),(0,s.jsxs)(i.span,{className:"mord",children:[(0,s.jsx)(i.span,{className:"mord mathnormal",style:{marginRight:"0.02778em"},children:"D"}),(0,s.jsx)(i.span,{className:"msupsub",children:(0,s.jsxs)(i.span,{className:"vlist-t vlist-t2",children:[(0,s.jsxs)(i.span,{className:"vlist-r",children:[(0,s.jsx)(i.span,{className:"vlist",style:{height:"0.3011em"},children:(0,s.jsxs)(i.span,{style:{top:"-2.55em",marginLeft:"-0.0278em",marginRight:"0.05em"},children:[(0,s.jsx)(i.span,{className:"pstrut",style:{height:"2.7em"}}),(0,s.jsx)(i.span,{className:"sizing reset-size6 size3 mtight",children:(0,s.jsx)(i.span,{className:"mord mtight",children:(0,s.jsx)(i.span,{className:"mord mtight",children:"15"})})})]})}),(0,s.jsx)(i.span,{className:"vlist-s",children:"\u200b"})]}),(0,s.jsx)(i.span,{className:"vlist-r",children:(0,s.jsx)(i.span,{className:"vlist",style:{height:"0.15em"},children:(0,s.jsx)(i.span,{})})})]})})]}),(0,s.jsx)(i.span,{className:"mord mathnormal",style:{marginRight:"0.13889em"},children:"F"}),(0,s.jsx)(i.span,{className:"mspace",style:{marginRight:"0.2778em"}}),(0,s.jsx)(i.span,{className:"mrel",children:"="}),(0,s.jsx)(i.span,{className:"mspace",style:{marginRight:"0.2778em"}})]}),(0,s.jsxs)(i.span,{className:"base",children:[(0,s.jsx)(i.span,{className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,s.jsx)(i.span,{className:"mord",children:"5"}),(0,s.jsx)(i.span,{className:"mopen",children:"("}),(0,s.jsxs)(i.span,{className:"mord",children:[(0,s.jsx)(i.span,{className:"mord mathnormal",style:{marginRight:"0.02778em"},children:"D"}),(0,s.jsx)(i.span,{className:"msupsub",children:(0,s.jsxs)(i.span,{className:"vlist-t vlist-t2",children:[(0,s.jsxs)(i.span,{className:"vlist-r",children:[(0,s.jsx)(i.span,{className:"vlist",style:{height:"0.3011em"},children:(0,s.jsxs)(i.span,{style:{top:"-2.55em",marginLeft:"-0.0278em",marginRight:"0.05em"},children:[(0,s.jsx)(i.span,{className:"pstrut",style:{height:"2.7em"}}),(0,s.jsx)(i.span,{className:"sizing reset-size6 size3 mtight",children:(0,s.jsx)(i.span,{className:"mord mtight",children:(0,s.jsx)(i.span,{className:"mord mtight",children:"15"})})})]})}),(0,s.jsx)(i.span,{className:"vlist-s",children:"\u200b"})]}),(0,s.jsx)(i.span,{className:"vlist-r",children:(0,s.jsx)(i.span,{className:"vlist",style:{height:"0.15em"},children:(0,s.jsx)(i.span,{})})})]})})]}),(0,s.jsx)(i.span,{className:"mord mathnormal",style:{marginRight:"0.05017em"},children:"B"}),(0,s.jsx)(i.span,{className:"mclose",children:")"}),(0,s.jsx)(i.span,{className:"mord text",children:(0,s.jsx)(i.span,{className:"mord",children:"\xa0but\xa0not\xa0less\xa0than\xa00.1\xa0mm"})})]})]})]})}),"\n",(0,s.jsx)(i.p,{children:"where:"}),"\n",(0,s.jsxs)(i.blockquote,{children:["\n",(0,s.jsxs)(i.p,{children:[(0,s.jsxs)(i.em,{children:["D",(0,s.jsx)("sub",{children:"15"}),"F"]})," = particle-size diameter of the filter material corresponding to 15 percent passing on the cumulative particle-size distribution curve",(0,s.jsx)(i.br,{}),"\n",(0,s.jsxs)(i.em,{children:["D",(0,s.jsx)("sub",{children:"15"}),"B"]})," = particle-size diameter of the base soil corresponding to 15 percent passing on the cumulative particle-size distribution curve before regrading"]}),"\n"]}),"\n",(0,s.jsxs)(i.p,{children:["Step 3 evaluates the permeability criterion for integer multipliers ranging from 3 to 5. If the criterion is met, \u201cMeets\u201d displays next to the calculation.\r\nIf the criterion is not met, \u201cFails\u201d displays next to the calculation. A green background displays if the criterion is met, and an orange background displays\r\nif the criterion is not met. Based on the primary criterion using a multiplier of 5, a statement appears after the set of calculations indicating whether the\r\nfilter material is sufficiently permeable to perform the required drainage function. Examples of the two possible scenarios for the primary filter criterion\r\nare shown in ",(0,s.jsx)(l.A,{parentDocId:"107",figKey:"permeability-not-met"})," and ",(0,s.jsx)(l.A,{parentDocId:"107",figKey:"permeability-met"}),"."]}),"\n",(0,s.jsx)(n.A,{parentDocId:"107",docId:"11-permeability.mdx",figKey:"permeability-not-met",src:"/figures/toolbox-technical-manuals/filter-evaluation-continuation/figure40.png",alt:"Step 3 of Permeability worksheet: Primary permeability criteria not met.",caption:"Step 3 of Permeability worksheet: Primary permeability criteria not met."}),"\n",(0,s.jsx)(n.A,{parentDocId:"107",docId:"11-permeability.mdx",figKey:"permeability-met",src:"/figures/toolbox-technical-manuals/filter-evaluation-continuation/figure41.png",alt:"Step 3 of Permeability worksheet: Primary permeability criteria met.",caption:"Step 3 of Permeability worksheet: Primary permeability criteria met."}),"\n",(0,s.jsx)(c.A,{})]})}function f(e={}){const{wrapper:i}={...(0,r.R)(),...e.components};return i?(0,s.jsx)(i,{...e,children:(0,s.jsx)(x,{...e})}):x(e)}},1488:(e,i,t)=>{t.d(i,{A:()=>r});var a=t(6540),s=t(4848);const r=e=>{let{parentDocId:i,figKey:t}=e;const[r,n]=(0,a.useState)(null);return(0,a.useEffect)((()=>{(async()=>{try{const e=`/counters/${i.replace(/\//g,"-")}.json`,a=await fetch(e);if(!a.ok)throw new Error(`Failed to load ${e}`);const s=await a.json();let r=null;Object.keys(s).forEach((e=>{s[e]?.figures?.[t]&&(r=s[e].figures[t])})),r?n(r):console.warn(`Figure key "${t}" not found`)}catch(e){console.error("Error loading counters:",e)}})()}),[t]),r?(0,s.jsxs)("span",{className:"figure-reference",children:["Figure ",r.figNumber]}):(0,s.jsx)("span",{children:"Loading..."})}},3900:(e,i,t)=>{t.d(i,{A:()=>l});var a=t(6540),s=t(6916),r=t(6347),n=t(4848);const l=()=>{const[e,i]=(0,a.useState)([]),t=(0,r.zy)();if((0,a.useEffect)((()=>{const e=()=>{const e=(0,s.h)(t.pathname);i(e)};e();const a=()=>{e()};return window.addEventListener("citationsUpdated",a),()=>{window.removeEventListener("citationsUpdated",a)}}),[t.pathname]),console.log("# of citations: ",e.length),0===e.length)return null;const l=e=>{const{author:i,year:t,title:a,journal:s,booktitle:r,report:l,manual:o,institution:c,organization:m,location:h,volume:d,edition:p,pages:u,doi:x,url:f,publisher:b}=e;return(0,n.jsxs)(n.Fragment,{children:[(j=i,Array.isArray(j)?j.length>1?j.slice(0,-1).join(", ")+" & "+j[j.length-1]:j[0]:j)," (",t,"). ",(0,n.jsx)("em",{children:a}),".",s&&` ${s}`,r&&` In ${r}`,m&&` (${m})`,h&&`, ${h}`,d&&`, Vol. ${d}`,p&&`(${p})`,u&&`, pp. ${u}`,b&&` ${b}`,c&&` ${c}`,l&&` ${l}`,o&&` ${o}`,x&&(0,n.jsxs)(n.Fragment,{children:[" ",(0,n.jsxs)("a",{href:`https://doi.org/${x}`,target:"_blank",rel:"noopener noreferrer",children:["https://doi.org/",x]})]}),f&&(0,n.jsxs)(n.Fragment,{children:[" ",(0,n.jsx)("a",{href:f,target:"_blank",rel:"noopener noreferrer",children:f})]})]});var j};return(0,n.jsx)("div",{className:"citation-footnote",children:(0,n.jsx)("ol",{children:e.sort(((e,i)=>e.number-i.number)).map((e=>(0,n.jsx)("li",{value:e.number,id:`footnote-${e.citationKey}`,children:l(e)},e.citationKey)))})})}},4577:(e,i,t)=>{t.d(i,{A:()=>r});var a=t(6540),s=t(4848);const r=e=>{let{parentDocId:i,figKey:t,src:r,alt:n,caption:l}=e;const[o,c]=(0,a.useState)(null);return(0,a.useEffect)((()=>{(async()=>{try{const e=`/counters/${i.replace(/\//g,"-")}.json`,a=await fetch(e);if(!a.ok)throw new Error(`Failed to load ${e}`);const s=await a.json();let r=null;Object.keys(s).forEach((e=>{s[e]?.figures?.[t]&&(r=s[e].figures[t])})),r?c(r):console.warn(`Figure key "${t}" not found`)}catch(e){console.error("Error loading counters:",e)}})()}),[i,t]),o?(0,s.jsxs)("figure",{className:"figure-container",children:[(0,s.jsx)("img",{src:r,alt:n,className:"figure-image"}),(0,s.jsxs)("figcaption",{className:"figure-caption",children:["Figure ",o.figNumber,": ",l]})]}):(0,s.jsx)("span",{children:"Loading..."})}},6916:(e,i,t)=>{t.d(i,{A:()=>o,h:()=>l});var a=t(6540),s=t(6347),r=t(4848);const n=new Map,l=e=>Array.from(n.get(e)?.values()||[]),o=e=>{let{citationKey:i,bibFile:t}=e;const[l,o]=(0,a.useState)("?"),c=(0,s.zy)();return(0,a.useEffect)((()=>{(async()=>{try{const e=await fetch(t),a=(await e.json()).sort(((e,i)=>{const t=Array.isArray(e.author)?e.author[0]:e.author,a=Array.isArray(i.author)?i.author[0]:i.author;return t.localeCompare(a)})),s=a.findIndex((e=>e.citationKey===i));if(-1!==s){const e=s+1;o(e),n.has(c.pathname)||n.set(c.pathname,new Map);n.get(c.pathname).set(i,{...a[s],number:e}),window.dispatchEvent(new Event("citationsUpdated"))}}catch(e){console.error("Error fetching bibliography:",e)}})()}),[i,t,c.pathname]),(0,r.jsx)("span",{className:"citation-reference",children:(0,r.jsxs)("sup",{children:["[",l,"]"]})})}},8453:(e,i,t)=>{t.d(i,{R:()=>n,x:()=>l});var a=t(6540);const s={},r=a.createContext(s);function n(e){const i=a.useContext(r);return a.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function l(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:n(e.components),a.createElement(r.Provider,{value:i},e.children)}},8807:(e,i,t)=>{t.d(i,{A:()=>n});t(6540);var a=t(4848);const s=e=>{let{reportName:i,pdfFilename:t}=e;return(0,a.jsx)("button",{className:"download-pdf-button",onClick:()=>{const e=`/pdfs/${i}/${t}`,a=document.createElement("a");a.href=e,a.download=t,a.click(),console.log("Downloading PDF from:",e)},children:"\u2193 PDF"})};var r=t(6289);const n=e=>{let{link:i,linkTitle:t,reportName:n,pdfFilename:l}=e;return"none"===i?(0,a.jsx)("div",{className:"nav-and-print-container",children:(0,a.jsx)("div",{className:"print-to-pdf-container",children:(0,a.jsx)(s,{reportName:n,pdfFilename:l})})}):(0,a.jsxs)("div",{className:"nav-and-print-container",children:[(0,a.jsx)("div",{className:"nav-link",children:(0,a.jsxs)(r.A,{to:`/${i}`,children:["\u2190 ",t]})}),(0,a.jsx)("div",{className:"print-to-pdf-container",children:(0,a.jsx)(s,{reportName:n,pdfFilename:l})})]})}}}]);