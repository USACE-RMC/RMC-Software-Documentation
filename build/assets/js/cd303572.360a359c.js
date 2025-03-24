"use strict";(self.webpackChunkrmc_software_documentation=self.webpackChunkrmc_software_documentation||[]).push([[2224],{174:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>p,contentTitle:()=>d,default:()=>f,frontMatter:()=>h,metadata:()=>a,toc:()=>u});const a=JSON.parse('{"id":"toolbox-technical-manuals/filter-evaluation-continuation/permeability","title":"permeability","description":"<NavAndPrint","source":"@site/docs/toolbox-technical-manuals/filter-evaluation-continuation/11-permeability.mdx","sourceDirName":"toolbox-technical-manuals/filter-evaluation-continuation","slug":"/toolbox-technical-manuals/filter-evaluation-continuation/permeability","permalink":"/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/permeability","draft":false,"unlisted":false,"tags":[],"version":"current","lastUpdatedAt":1742522843000,"sidebarPosition":11,"frontMatter":{},"sidebar":"filterEvaluationSidebar","previous":{"title":"Constricted Exit","permalink":"/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/constricted-exit"},"next":{"title":"References","permalink":"/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/references"}}');var s=i(4848),r=i(8453),n=i(4577),l=i(1488),o=i(6916),c=i(3900),m=i(8807);i(6289),i(9030);const h={},d="Permeability",p={},u=[{value:"Base Soil Characterization",id:"base-soil-characterization",level:2},{value:"Filter Material Characterization",id:"filter-material-characterization",level:2},{value:"Permeability Criterion",id:"permeability-criterion",level:2}];function x(e){const t={annotation:"annotation",blockquote:"blockquote",br:"br",em:"em",h1:"h1",h2:"h2",header:"header",math:"math",mi:"mi",mn:"mn",mo:"mo",mrow:"mrow",msub:"msub",mtable:"mtable",mtd:"mtd",mtext:"mtext",mtr:"mtr",p:"p",semantics:"semantics",span:"span",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(m.A,{link:"internal-erosion-suite",linkTitle:"Internal Erosion Suite",reportName:"toolbox-technical-manuals/filter-evaluation-continuation",pdfFilename:"11-permeability.pdf"}),"\n",(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"permeability",children:"Permeability"})}),"\n",(0,s.jsxs)(t.p,{children:["This worksheet assesses whether the filter material meets the drainage criterion for permeability. It requires no user-specified input.\r\nPermeability is directly proportional to the square of the effective particle size with all other factors being equal. Typically, the\r\npermeability of a filter should be at least 16 to 25 times that of the base material. This criterion is generally met if ",(0,s.jsxs)(t.em,{children:["D",(0,s.jsx)("sub",{children:"15"}),"F"]}),"\r\nis larger than 4 to 5 times ",(0,s.jsxs)(t.em,{children:["D",(0,s.jsx)("sub",{children:"15"}),"B"]}),". In some very broadly graded base soils, this requirement may be difficult to meet."]}),"\n",(0,s.jsx)(t.h2,{id:"base-soil-characterization",children:"Base Soil Characterization"}),"\n",(0,s.jsxs)(t.p,{children:["Step 1 characterizes the base soil. FEMA ",(0,s.jsx)(o.A,{citationKey:"FEMA2011",bibFile:"/bibliographies/107-bib.json"})," indicates the\r\ncoarsest ",(0,s.jsxs)(t.em,{children:["D",(0,s.jsx)("sub",{children:"15"}),"B"]})," before regrading is used to evaluate permeability requirements. Step 1 obtains the coarsest ",(0,s.jsxs)(t.em,{children:["D",(0,s.jsx)("sub",{children:"15"}),"B"]}),"\r\nbefore regrading from the Base Gradation worksheet, where it is interpolated using a logarithmic scale for particle size and linear scale\r\nfor percent passing. ",(0,s.jsx)(l.A,{parentDocId:"107",figKey:"permeability-base-soil"})," is an example of step 1."]}),"\n",(0,s.jsx)(n.A,{parentDocId:"107",docId:"11-permeability.mdx",figKey:"permeability-base-soil",src:"figures/toolbox-technical-manuals/filter-evaluation-continuation/figure38.png",alt:"Step 1 of Permeability worksheet: Base soil characterization.",caption:"Step 1 of Permeability worksheet: Base soil characterization."}),"\n",(0,s.jsx)(t.h2,{id:"filter-material-characterization",children:"Filter Material Characterization"}),"\n",(0,s.jsxs)(t.p,{children:["Step 2 characterizes the filter material. The finest ",(0,s.jsxs)(t.em,{children:["D",(0,s.jsx)("sub",{children:"15"}),"F"]})," is obtained from the Filter Gradation worksheet, where it is interpolated\r\nusing a logarithmic scale for particle size and linear scale for percent passing. ",(0,s.jsx)(l.A,{parentDocId:"107",figKey:"permeability-filter-material"}),"\r\nis an example of step 2."]}),"\n",(0,s.jsx)(n.A,{parentDocId:"107",docId:"11-permeability.mdx",figKey:"permeability-filter-material",src:"figures/toolbox-technical-manuals/filter-evaluation-continuation/figure39.png",alt:"Step 2 of Permeability worksheet: Filter material characterization.",caption:"Step 2 of Permeability worksheet: Filter material characterization."}),"\n",(0,s.jsx)(t.h2,{id:"permeability-criterion",children:"Permeability Criterion"}),"\n",(0,s.jsxs)(t.p,{children:["The criterion for permeability is that the filter material has a minimum ",(0,s.jsxs)(t.em,{children:["D",(0,s.jsx)("sub",{children:"15"}),"F"]})," that is an integer multiplier of the coarsest ",(0,s.jsxs)(t.em,{children:["D",(0,s.jsx)("sub",{children:"15"}),"B"]}),"\r\nbefore regrading but not less than 0.1 mm. USACE Engineer Manual (EM) 1110-2-1901 ",(0,s.jsx)(o.A,{citationKey:"USACE2005",bibFile:"/bibliographies/107-bib.json"}),"\r\nrequires a multiplier of 3 to 5. However, USBR ",(0,s.jsx)(o.A,{citationKey:"USBR2011",bibFile:"/bibliographies/107-bib.json"})," and National Resources Conservation\r\nService (NRCS) ",(0,s.jsx)(o.A,{citationKey:"USDA2017",bibFile:"/bibliographies/107-bib.json"})," require a multiplier of 5, which is considered the primary criterion\r\non this worksheet. The minimum ",(0,s.jsxs)(t.em,{children:["D",(0,s.jsx)("sub",{children:"15"}),"F"]})," of the filter material is calculated as in the following equation."]}),"\n",(0,s.jsx)(t.span,{className:"katex-display",children:(0,s.jsxs)(t.span,{className:"katex",children:[(0,s.jsx)(t.span,{className:"katex-mathml",children:(0,s.jsx)(t.math,{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block",children:(0,s.jsxs)(t.semantics,{children:[(0,s.jsx)(t.mtable,{width:"100%",children:(0,s.jsxs)(t.mtr,{children:[(0,s.jsx)(t.mtd,{width:"50%"}),(0,s.jsx)(t.mtd,{children:(0,s.jsxs)(t.mrow,{children:[(0,s.jsxs)(t.msub,{children:[(0,s.jsx)(t.mi,{children:"D"}),(0,s.jsx)(t.mn,{children:"15"})]}),(0,s.jsx)(t.mi,{children:"F"}),(0,s.jsx)(t.mo,{children:"="}),(0,s.jsx)(t.mn,{children:"5"}),(0,s.jsx)(t.mo,{stretchy:"false",children:"("}),(0,s.jsxs)(t.msub,{children:[(0,s.jsx)(t.mi,{children:"D"}),(0,s.jsx)(t.mn,{children:"15"})]}),(0,s.jsx)(t.mi,{children:"B"}),(0,s.jsx)(t.mo,{stretchy:"false",children:")"}),(0,s.jsx)(t.mtext,{children:"\xa0but\xa0not\xa0less\xa0than\xa00.1\xa0mm"})]})}),(0,s.jsx)(t.mtd,{width:"50%"}),(0,s.jsx)(t.mtd,{children:(0,s.jsx)(t.mtext,{children:"(7)"})})]})}),(0,s.jsx)(t.annotation,{encoding:"application/x-tex",children:"D_{15}F = 5(D_{15}B) \\text{ but not less than 0.1 mm} \\tag{7}"})]})})}),(0,s.jsxs)(t.span,{className:"katex-html","aria-hidden":"true",children:[(0,s.jsxs)(t.span,{className:"base",children:[(0,s.jsx)(t.span,{className:"strut",style:{height:"0.8333em",verticalAlign:"-0.15em"}}),(0,s.jsxs)(t.span,{className:"mord",children:[(0,s.jsx)(t.span,{className:"mord mathnormal",style:{marginRight:"0.02778em"},children:"D"}),(0,s.jsx)(t.span,{className:"msupsub",children:(0,s.jsxs)(t.span,{className:"vlist-t vlist-t2",children:[(0,s.jsxs)(t.span,{className:"vlist-r",children:[(0,s.jsx)(t.span,{className:"vlist",style:{height:"0.3011em"},children:(0,s.jsxs)(t.span,{style:{top:"-2.55em",marginLeft:"-0.0278em",marginRight:"0.05em"},children:[(0,s.jsx)(t.span,{className:"pstrut",style:{height:"2.7em"}}),(0,s.jsx)(t.span,{className:"sizing reset-size6 size3 mtight",children:(0,s.jsx)(t.span,{className:"mord mtight",children:(0,s.jsx)(t.span,{className:"mord mtight",children:"15"})})})]})}),(0,s.jsx)(t.span,{className:"vlist-s",children:"\u200b"})]}),(0,s.jsx)(t.span,{className:"vlist-r",children:(0,s.jsx)(t.span,{className:"vlist",style:{height:"0.15em"},children:(0,s.jsx)(t.span,{})})})]})})]}),(0,s.jsx)(t.span,{className:"mord mathnormal",style:{marginRight:"0.13889em"},children:"F"}),(0,s.jsx)(t.span,{className:"mspace",style:{marginRight:"0.2778em"}}),(0,s.jsx)(t.span,{className:"mrel",children:"="}),(0,s.jsx)(t.span,{className:"mspace",style:{marginRight:"0.2778em"}})]}),(0,s.jsxs)(t.span,{className:"base",children:[(0,s.jsx)(t.span,{className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,s.jsx)(t.span,{className:"mord",children:"5"}),(0,s.jsx)(t.span,{className:"mopen",children:"("}),(0,s.jsxs)(t.span,{className:"mord",children:[(0,s.jsx)(t.span,{className:"mord mathnormal",style:{marginRight:"0.02778em"},children:"D"}),(0,s.jsx)(t.span,{className:"msupsub",children:(0,s.jsxs)(t.span,{className:"vlist-t vlist-t2",children:[(0,s.jsxs)(t.span,{className:"vlist-r",children:[(0,s.jsx)(t.span,{className:"vlist",style:{height:"0.3011em"},children:(0,s.jsxs)(t.span,{style:{top:"-2.55em",marginLeft:"-0.0278em",marginRight:"0.05em"},children:[(0,s.jsx)(t.span,{className:"pstrut",style:{height:"2.7em"}}),(0,s.jsx)(t.span,{className:"sizing reset-size6 size3 mtight",children:(0,s.jsx)(t.span,{className:"mord mtight",children:(0,s.jsx)(t.span,{className:"mord mtight",children:"15"})})})]})}),(0,s.jsx)(t.span,{className:"vlist-s",children:"\u200b"})]}),(0,s.jsx)(t.span,{className:"vlist-r",children:(0,s.jsx)(t.span,{className:"vlist",style:{height:"0.15em"},children:(0,s.jsx)(t.span,{})})})]})})]}),(0,s.jsx)(t.span,{className:"mord mathnormal",style:{marginRight:"0.05017em"},children:"B"}),(0,s.jsx)(t.span,{className:"mclose",children:")"}),(0,s.jsx)(t.span,{className:"mord text",children:(0,s.jsx)(t.span,{className:"mord",children:"\xa0but\xa0not\xa0less\xa0than\xa00.1\xa0mm"})})]}),(0,s.jsxs)(t.span,{className:"tag",children:[(0,s.jsx)(t.span,{className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,s.jsxs)(t.span,{className:"mord text",children:[(0,s.jsx)(t.span,{className:"mord",children:"("}),(0,s.jsx)(t.span,{className:"mord",children:(0,s.jsx)(t.span,{className:"mord",children:"7"})}),(0,s.jsx)(t.span,{className:"mord",children:")"})]})]})]})]})}),"\n",(0,s.jsx)(t.p,{children:"where:"}),"\n",(0,s.jsxs)(t.blockquote,{children:["\n",(0,s.jsxs)(t.p,{children:[(0,s.jsxs)(t.em,{children:["D",(0,s.jsx)("sub",{children:"15"}),"F"]})," = particle-size diameter of the filter material corresponding to 15 percent passing on the cumulative particle-size distribution curve",(0,s.jsx)(t.br,{}),"\n",(0,s.jsxs)(t.em,{children:["D",(0,s.jsx)("sub",{children:"15"}),"B"]})," = particle-size diameter of the base soil corresponding to 15 percent passing on the cumulative particle-size distribution curve before regrading"]}),"\n"]}),"\n",(0,s.jsxs)(t.p,{children:["Step 3 evaluates the permeability criterion for integer multipliers ranging from 3 to 5. If the criterion is met, \u201cMeets\u201d displays next to the calculation.\r\nIf the criterion is not met, \u201cFails\u201d displays next to the calculation. A green background displays if the criterion is met, and an orange background displays\r\nif the criterion is not met. Based on the primary criterion using a multiplier of 5, a statement appears after the set of calculations indicating whether the\r\nfilter material is sufficiently permeable to perform the required drainage function. Examples of the two possible scenarios for the primary filter criterion\r\nare shown in ",(0,s.jsx)(l.A,{parentDocId:"107",figKey:"permeability-not-met"})," and ",(0,s.jsx)(l.A,{parentDocId:"107",figKey:"permeability-met"}),"."]}),"\n",(0,s.jsx)(n.A,{parentDocId:"107",docId:"11-permeability.mdx",figKey:"permeability-not-met",src:"figures/toolbox-technical-manuals/filter-evaluation-continuation/figure40.png",alt:"Step 3 of Permeability worksheet: Primary permeability criteria not met.",caption:"Step 3 of Permeability worksheet: Primary permeability criteria not met."}),"\n",(0,s.jsx)(n.A,{parentDocId:"107",docId:"11-permeability.mdx",figKey:"permeability-met",src:"figures/toolbox-technical-manuals/filter-evaluation-continuation/figure41.png",alt:"Step 3 of Permeability worksheet: Primary permeability criteria met.",caption:"Step 3 of Permeability worksheet: Primary permeability criteria met."}),"\n",(0,s.jsx)(c.A,{})]})}function f(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(x,{...e})}):x(e)}},1488:(e,t,i)=>{i.d(t,{A:()=>n});var a=i(6540),s=i(9030),r=i(4848);const n=e=>{let{parentDocId:t,figKey:i}=e;const[n,l]=(0,a.useState)(null),o=(0,s.Ay)(`counters/${t.replace(/\//g,"-")}.json`);return(0,a.useEffect)((()=>{(async()=>{try{const e=await fetch(o);if(!e.ok)throw new Error(`Failed to load ${o}`);const t=await e.json();let a=null;Object.keys(t).forEach((e=>{t[e]?.figures?.[i]&&(a=t[e].figures[i])})),a?l(a):console.warn(`Figure key "${i}" not found`)}catch(e){console.error("Error loading counters:",e)}})()}),[i]),n?(0,r.jsxs)("span",{className:"figure-reference",children:["Figure ",n.figNumber]}):(0,r.jsx)("span",{children:"Loading..."})}},3900:(e,t,i)=>{i.d(t,{A:()=>l});var a=i(6540),s=i(6916),r=i(6347),n=i(4848);const l=()=>{const[e,t]=(0,a.useState)([]),i=(0,r.zy)();if((0,a.useEffect)((()=>{const e=()=>{const e=(0,s.h)(i.pathname);t(e)};e();const a=()=>{e()};return window.addEventListener("citationsUpdated",a),()=>{window.removeEventListener("citationsUpdated",a)}}),[i.pathname]),0===e.length)return null;const l=e=>{const{author:t,year:i,title:a,journal:s,booktitle:r,report:l,manual:o,institution:c,organization:m,location:h,volume:d,edition:p,pages:u,doi:x,url:f,publisher:j}=e;return(0,n.jsxs)(n.Fragment,{children:[(b=t,Array.isArray(b)?b.length>1?b.slice(0,-1).join(", ")+" & "+b[b.length-1]:b[0]:b)," (",i,"). ",(0,n.jsx)("em",{children:a}),".",s&&` ${s}`,r&&` In ${r}`,m&&` (${m})`,h&&`, ${h}`,d&&`, Vol. ${d}`,p&&`(${p})`,u&&`, pp. ${u}`,j&&` ${j}`,c&&` ${c}`,l&&` ${l}`,o&&` ${o}`,x&&(0,n.jsxs)(n.Fragment,{children:[" ",(0,n.jsxs)("a",{href:`https://doi.org/${x}`,target:"_blank",rel:"noopener noreferrer",children:["https://doi.org/",x]})]}),f&&(0,n.jsxs)(n.Fragment,{children:[" ",(0,n.jsx)("a",{href:f,target:"_blank",rel:"noopener noreferrer",children:f})]})]});var b};return(0,n.jsx)("div",{className:"citation-footnote",children:(0,n.jsx)("ol",{children:e.sort(((e,t)=>e.number-t.number)).map((e=>(0,n.jsx)("li",{value:e.number,id:`footnote-${e.citationKey}`,children:l(e)},e.citationKey)))})})}},4577:(e,t,i)=>{i.d(t,{A:()=>n});var a=i(6540),s=i(9030),r=i(4848);const n=e=>{let{parentDocId:t,figKey:i,src:n,alt:l,caption:o}=e;const[c,m]=(0,a.useState)(null),h=(0,s.Ay)(`counters/${t.replace(/\//g,"-")}.json`),d=(0,s.Ay)(n);return(0,a.useEffect)((()=>{try{(async()=>{try{const e=await fetch(h);if(!e.ok)throw new Error(`Failed to load ${h}`);const t=await e.json();let a=null;Object.keys(t).forEach((e=>{t[e]?.figures?.[i]&&(a=t[e].figures[i])})),a?m(a):console.warn(`Figure key "${i}" not found`)}catch(e){console.error("Error loading counters:",e)}})()}catch(e){console.error("Critical error in useEffect:",e)}}),[t,i]),c?(0,r.jsxs)("figure",{className:"figure-container",children:[(0,r.jsx)("img",{src:d,alt:l,className:"figure-image"}),(0,r.jsxs)("figcaption",{className:"figure-caption",children:["Figure ",c.figNumber,": ",o]})]}):(0,r.jsx)("span",{children:"Loading..."})}},6916:(e,t,i)=>{i.d(t,{A:()=>c,h:()=>o});var a=i(6540),s=i(6347),r=i(9030),n=i(4848);const l=new Map,o=e=>Array.from(l.get(e)?.values()||[]),c=e=>{let{citationKey:t,bibFile:i}=e;const[o,c]=(0,a.useState)("?"),m=(0,s.zy)(),h=(0,r.Ay)(i);return(0,a.useEffect)((()=>{(async()=>{try{const e=await fetch(h),i=(await e.json()).sort(((e,t)=>{const i=Array.isArray(e.author)?e.author[0]:e.author,a=Array.isArray(t.author)?t.author[0]:t.author;return i.localeCompare(a)})),a=i.findIndex((e=>e.citationKey===t));if(-1!==a){const e=a+1;c(e),l.has(m.pathname)||l.set(m.pathname,new Map);l.get(m.pathname).set(t,{...i[a],number:e}),window.dispatchEvent(new Event("citationsUpdated"))}}catch(e){console.error("Error fetching bibliography:",e)}})()}),[t,h,m.pathname]),(0,n.jsx)("span",{className:"citation-reference",children:(0,n.jsxs)("sup",{children:["[",o,"]"]})})}},8453:(e,t,i)=>{i.d(t,{R:()=>n,x:()=>l});var a=i(6540);const s={},r=a.createContext(s);function n(e){const t=a.useContext(r);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:n(e.components),a.createElement(r.Provider,{value:t},e.children)}},8807:(e,t,i)=>{i.d(t,{A:()=>l});i(6540);var a=i(9030),s=i(4848);const r=e=>{let{reportName:t,pdfFilename:i}=e;const r=(0,a.Ay)(`pdfs/${t}/${i}`);return(0,s.jsx)("button",{className:"download-pdf-button",onClick:()=>{const e=document.createElement("a");e.href=r,e.download=i,e.click(),console.log("Downloading PDF from:",r)},children:"\u2193 PDF"})};var n=i(6289);const l=e=>{let{link:t,linkTitle:i,reportName:a,pdfFilename:l}=e;return"none"===t?(0,s.jsx)("div",{className:"nav-and-print-container",children:(0,s.jsx)("div",{className:"print-to-pdf-container",children:(0,s.jsx)(r,{reportName:a,pdfFilename:l})})}):(0,s.jsxs)("div",{className:"nav-and-print-container",children:[(0,s.jsx)("div",{className:"nav-link",children:(0,s.jsxs)(n.A,{to:`/${t}`,children:["\u2190 ",i]})}),(0,s.jsx)("div",{className:"print-to-pdf-container",children:(0,s.jsx)(r,{reportName:a,pdfFilename:l})})]})}}}]);