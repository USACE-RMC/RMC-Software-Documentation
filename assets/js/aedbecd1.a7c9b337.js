"use strict";(self.webpackChunkrmc_software_documentation=self.webpackChunkrmc_software_documentation||[]).push([[9790],{193:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>g,contentTitle:()=>p,default:()=>j,frontMatter:()=>f,metadata:()=>i,toc:()=>m});const i=JSON.parse('{"id":"toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/filter-gradation","title":"Filter Gradation","description":"<NavContainer","source":"@site/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/05-filter-gradation.mdx","sourceDirName":"toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0","slug":"/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/filter-gradation","permalink":"/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/filter-gradation","draft":false,"unlisted":false,"tags":[],"version":"current","lastUpdatedAt":1744420475000,"sidebarPosition":5,"frontMatter":{"title":"Filter Gradation"},"sidebar":"filterEvaluationSidebar","previous":{"title":"Background","permalink":"/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/background"},"next":{"title":"Base Gradation","permalink":"/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/base-gradation"}}');var r=n(4848),a=n(8453),o=n(4577),s=n(1488),l=n(2783),c=n(1222),d=n(6916),u=n(3900),h=n(4193);n(6289),n(9030);const f={title:"Filter Gradation"},p="Filter Gradation",g={},m=[{value:"Filter Gradation",id:"filter-gradation-1",level:2},{value:"Filter Gradation After Segregation or Washout",id:"filter-gradation-after-segregation-or-washout",level:2}];function x(e){const t={blockquote:"blockquote",br:"br",em:"em",h1:"h1",h2:"h2",header:"header",p:"p",...(0,a.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(h.A,{link:"/toolboxes/internal-erosion-suite",linkTitle:"Internal Erosion Suite",document:"toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation"}),"\n",(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"filter-gradation",children:"Filter Gradation"})}),"\n",(0,r.jsx)(t.p,{children:"This worksheet performs a particle-size analysis of the filter material."}),"\n",(0,r.jsx)(t.h2,{id:"filter-gradation-1",children:"Filter Gradation"}),"\n",(0,r.jsx)(t.p,{children:"The input includes sieve size (inches or sieve number), particle size (mm) for hydrometer analysis, and percent finer (by weight) for representative\r\ncoarse and fine gradations of the filter material."}),"\n",(0,r.jsxs)(t.p,{children:["Use the drop-down list to select the sieve size that defines the gradation of the filter material. Coarse sieve designations range from 12 inches to\r\n0.25 inch, and standard sieve designations range from No. 3\xbd to No. 200. The particle size (",(0,r.jsx)(t.em,{children:"D"}),") in millimeters is automatically populated if a sieve\r\nsize is selected. If a hydrometer (sedimentation) analysis was performed on the fine-grained portion of the filter material (i.e., passing the No. 200\r\nsieve), select \u201cHydrometer\u201d from the drop-down list for sieve size, and input user-specified particle sizes. Particle sizes from sieve or hydrometer\r\nanalysis must be in descending order."]}),"\n",(0,r.jsxs)(t.p,{children:["The user-specified percent finer (by weight) for the filter material gradation (",(0,r.jsx)(t.em,{children:"F"}),") is the percentage of material passing each sieve size or percentage\r\nof particles finer than the diameter given by Stokes\u2019 Law for hydrometer analysis. The input must be a decimal number consisting of a whole number and\r\na fractional part (e.g., 100.0 for 100.0 percent passing, 25.5 for 25.5 percent passing). Cells that do not apply or do not require user-specified input\r\nhave a gray background. ",(0,r.jsx)(s.A,{parentDocId:"107_1_0",figKey:"filter-gradation-input"})," is an example of the gradation input."]}),"\n",(0,r.jsx)(o.A,{parentDocId:"107_1_0",docId:"05-filter-gradation.mdx",figKey:"filter-gradation-input",src:"figures/toolbox-technical-manuals/filter-evaluation-continuation/figure9.png",alt:"Filter Gradation worksheet: Gradation input",caption:"Filter Gradation worksheet: Gradation input."}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(s.A,{parentDocId:"107_1_0",figKey:"filter-analysis-summary"})," is an example of the summary of the particle-size analysis for the user-specified\r\ngradations. The gravel percentage (including coarse and fine gravel percentages), sand percentage (including coarse, medium, and fine sand percentages),\r\nfines content (",(0,r.jsx)(t.em,{children:"FC"}),") (including estimated silt and clay percentages), coefficient of uniformity (",(0,r.jsxs)(t.em,{children:["C",(0,r.jsx)("sub",{children:"u"})]}),") and coefficient of curvature (",(0,r.jsxs)(t.em,{children:["C",(0,r.jsx)("sub",{children:"c"})]}),")\r\nfor the coarsest and finest filter material are calculated according to the Unified Soil Classification\r\nSystem. ",(0,r.jsx)(d.A,{citationKey:"ASTM2487",bibFile:"/bibliographies/107_1_0-bib.json"})," An average percentage is also calculated."]}),"\n",(0,r.jsxs)(t.p,{children:["The coefficient of uniformity (",(0,r.jsxs)(t.em,{children:["C",(0,r.jsx)("sub",{children:"u"})]}),") is calculated as in ",(0,r.jsx)(c.A,{parentDocId:"107_1_0",equationKey:"c-u"}),"."]}),"\n",(0,r.jsx)(l.A,{parentDocId:"107_1_0",equationKey:"c-u",equation:"C_u = \\frac{D_{60}}{D_{10}}"}),"\n",(0,r.jsx)(t.p,{children:"where:"}),"\n",(0,r.jsxs)(t.blockquote,{children:["\n",(0,r.jsxs)(t.p,{children:[(0,r.jsxs)(t.em,{children:["D",(0,r.jsx)("sub",{children:"10"})]})," = particle-size diameter corresponding to 10 percent passing on the cumulative particle-size distribution curve",(0,r.jsx)(t.br,{}),"\n",(0,r.jsxs)(t.em,{children:["D",(0,r.jsx)("sub",{children:"60"})]})," = particle-size diameter corresponding to 60 percent passing on the cumulative particle-size distribution curve"]}),"\n"]}),"\n",(0,r.jsxs)(t.p,{children:["The coefficient of curvature (",(0,r.jsxs)(t.em,{children:["C",(0,r.jsx)("sub",{children:"c"})]}),") is calculated as in ",(0,r.jsx)(c.A,{parentDocId:"107_1_0",equationKey:"c-c"}),"."]}),"\n",(0,r.jsx)(l.A,{parentDocId:"107_1_0",equationKey:"c-c",equation:"C_c = \\frac{(D_{30})^2}{D_{10} \\cdot D_{60}}"}),"\n",(0,r.jsx)(t.p,{children:"where:"}),"\n",(0,r.jsxs)(t.blockquote,{children:["\n",(0,r.jsxs)(t.p,{children:[(0,r.jsxs)(t.em,{children:["D",(0,r.jsx)("sub",{children:"30"})]})," = particle-size diameter corresponding to 30 percent passing on the cumulative particle-size distribution curve"]}),"\n"]}),"\n",(0,r.jsxs)(t.p,{children:["If a gradation does not specify the particle size corresponding to 10 percent passing, 30 percent passing, or 60 percent passing, ",(0,r.jsxs)(t.em,{children:["C",(0,r.jsx)("sub",{children:"u"})]}),"\r\nand ",(0,r.jsxs)(t.em,{children:["C",(0,r.jsx)("sub",{children:"c"})]})," are not calculated."]}),"\n",(0,r.jsx)(o.A,{parentDocId:"107_1_0",docId:"05-filter-gradation.mdx",figKey:"filter-analysis-summary",src:"figures/toolbox-technical-manuals/filter-evaluation-continuation/figure10.png",alt:"Filter gradation worksheet: Summary of particle-size analysis.",caption:"Filter gradation worksheet: Summary of particle-size analysis."}),"\n",(0,r.jsx)(t.h2,{id:"filter-gradation-after-segregation-or-washout",children:"Filter Gradation After Segregation or Washout"}),"\n",(0,r.jsx)(t.p,{children:"The filter material may be susceptible to segregation or internal instability. Segregation is the tendency of large particles in a given mass of\r\naggregate to gather together when the material is loaded, transported, or otherwise disturbed."}),"\n",(0,r.jsxs)(t.p,{children:["Segregation can cause pockets of coarse zones that may not be filter-compatible with the material being protected. FEMA ",(0,r.jsx)(d.A,{citationKey:"FEMA2011",bibFile:"/bibliographies/107_1_0-bib.json"}),"\r\nprovides filter design guidance to limit segregation potential based on the maximum ",(0,r.jsxs)(t.em,{children:["D",(0,r.jsx)("sub",{children:"90"}),"F"]})," and the minimum ",(0,r.jsxs)(t.em,{children:["D",(0,r.jsx)("sub",{children:"10"}),"F"]}),". This segregation\r\ncriterion considers only the design gradation, but the potential for segregation during storing, hauling, dumping, spreading, and compacting must also be considered.\r\nThis is more subjective and relies on indirect evidence such as construction photographs."]}),"\n",(0,r.jsx)(t.p,{children:"Internal instability describes the loss of soil particles due to seepage. Finer particles in the soil can move within the soil mass under the\r\nforces imposed by seepage flow. Gap-graded or broadly graded soils are examples of internally unstable soils. The RMC Internal\r\nInstability Toolbox assesses the susceptibility of the filter material to internal instability. Soils that are susceptible to internal instability\r\nare also susceptible to segregation."}),"\n",(0,r.jsxs)(t.p,{children:["Segregation and internal instability result in a coarser filter. ",(0,r.jsx)(s.A,{parentDocId:"107_1_0",figKey:"filter-event-tree"}),"\r\nillustrates an event tree node that can be added to explicitly consider the likelihood of the filter being segregated or internally unstable during a\r\nrisk assessment. The particle retention evaluation must consider two gradations of the filter material. Perform the first evaluation using the original\r\nor stable gradation and perform the second evaluation using the adjusted gradation after segregation or washout of the erodible finer fraction."]}),"\n",(0,r.jsx)(o.A,{parentDocId:"107_1_0",docId:"05-filter-gradation.mdx",figKey:"filter-event-tree",src:"figures/toolbox-technical-manuals/filter-evaluation-continuation/figure11.png",alt:"Event tree considerations for segregation or washout of finer fraction.",caption:"Event tree considerations for segregation or washout of finer fraction."}),"\n",(0,r.jsx)(u.A,{})]})}function j(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(x,{...e})}):x(e)}},1222:(e,t,n)=>{n.d(t,{A:()=>a});var i=n(6540),r=n(4848);const a=e=>{let{parentDocId:t,equationKey:n}=e;const[a,o]=(0,i.useState)(null),s=`/RMC-Software-Documentation/counters/${t.replace(/\//g,"-")}.json`;return(0,i.useEffect)((()=>{(async()=>{try{const e=await fetch(s);if(!e.ok)throw new Error(`Failed to load ${s}`);const t=await e.json();let i=null;Object.keys(t).forEach((e=>{t[e]?.equations?.[n]&&(i=t[e].equations[n])})),i?o(i.equationNumber):console.warn(`Equation key "${n}" not found`)}catch(e){console.error("Error loading counters:",e)}})()}),[n]),null===a?(0,r.jsx)("span",{children:"Loading..."}):(0,r.jsxs)("span",{className:"equation-reference",children:["Equation ",a]})}},1488:(e,t,n)=>{n.d(t,{A:()=>a});var i=n(6540),r=n(4848);const a=e=>{let{parentDocId:t,figKey:n}=e;const[a,o]=(0,i.useState)(null),s=`/RMC-Software-Documentation/counters/${t.replace(/\//g,"-")}.json`;return(0,i.useEffect)((()=>{(async()=>{try{const e=await fetch(s);if(!e.ok)throw new Error(`Failed to load ${s}`);const t=await e.json();let i=null;Object.keys(t).forEach((e=>{t[e]?.figures?.[n]&&(i=t[e].figures[n])})),i?o(i):console.warn(`Figure key "${n}" not found`)}catch(e){console.error("Error loading counters:",e)}})()}),[n]),a?(0,r.jsxs)("span",{className:"figure-reference",children:["Figure ",a.figNumber]}):(0,r.jsx)("span",{children:"Loading..."})}},2783:(e,t,n)=>{n.d(t,{A:()=>o});var i=n(6540),r=n(8908),a=n(4848);const o=e=>{let{parentDocId:t,equationKey:n,equation:o,inline:s=!1}=e;const[l,c]=(0,i.useState)(null),d=`/RMC-Software-Documentation/counters/${t.replace(/\//g,"-")}.json`;if((0,i.useEffect)((()=>{try{(async()=>{try{const e=await fetch(d);if(!e.ok)throw new Error(`Failed to load ${d}`);const t=await e.json();let i=null;Object.keys(t).forEach((e=>{t[e]?.equations?.[n]&&(i=t[e].equations[n])})),i?c(i.equationNumber):console.warn(`Equation key "${n}" not found`)}catch(e){console.error("Error loading counters:",e)}})()}catch(e){console.error("Critical error in useEffect:",e)}}),[t,n]),null===l)return(0,a.jsx)("span",{children:"Loading..."});const u=o,h=`${o} \\tag{${l}}`;return(0,a.jsx)("span",{className:"equation-container",children:s?(0,a.jsx)(r.InlineMath,{math:u}):(0,a.jsx)(r.BlockMath,{math:h})})}},3900:(e,t,n)=>{n.d(t,{A:()=>s});var i=n(6540),r=n(6916),a=n(6347),o=n(4848);const s=()=>{const[e,t]=(0,i.useState)([]),n=(0,a.zy)();if((0,i.useEffect)((()=>{const e=()=>{const e=(0,r.h)(n.pathname);t(e)};e();const i=()=>{e()};return window.addEventListener("citationsUpdated",i),()=>{window.removeEventListener("citationsUpdated",i)}}),[n.pathname]),0===e.length)return null;const s=e=>{const{author:t,year:n,title:i,journal:r,booktitle:a,report:s,manual:l,institution:c,organization:d,location:u,volume:h,edition:f,pages:p,doi:g,url:m,publisher:x}=e;return(0,o.jsxs)(o.Fragment,{children:[(j=t,Array.isArray(j)?j.map((e=>{const t=e.split(" ");return`${t.slice(0,-1).map((e=>e[0]+".")).join(" ")} ${t[t.length-1]}`})).join(", "):j)," (",n,"). ",(0,o.jsx)("em",{children:i}),".",r&&` ${r}`,a&&` In ${a}`,d&&` (${d})`,u&&`, ${u}`,h&&`, Vol. ${h}`,f&&`(${f})`,p&&`, pp. ${p}`,x&&` ${x}`,c&&` ${c}`,s&&` ${s}`,l&&` ${l}`,g&&(0,o.jsxs)(o.Fragment,{children:[" ",(0,o.jsxs)("a",{href:`https://doi.org/${g}`,target:"_blank",rel:"noopener noreferrer",children:["https://doi.org/",g]})]}),m&&(0,o.jsxs)(o.Fragment,{children:[" ",(0,o.jsx)("a",{href:m,target:"_blank",rel:"noopener noreferrer",children:m})]})]});var j};return(0,o.jsx)("div",{className:"citation-footnote",style:{marginLeft:"20px"},children:(0,o.jsx)("ol",{style:{listStyleType:"none",paddingLeft:"0"},children:e.sort(((e,t)=>e.number-t.number)).map((e=>(0,o.jsxs)("li",{value:e.number,id:`footnote-${e.citationKey}`,style:{display:"flex",alignItems:"flex-start",marginBottom:"10px"},children:[(0,o.jsxs)("span",{style:{minWidth:"40px",flexShrink:0},children:["[",e.number,"]"]})," ",(0,o.jsx)("span",{style:{display:"block"},children:s(e)})]},e.citationKey)))})})}},4193:(e,t,n)=>{n.d(t,{A:()=>l});n(6540);var i=n(9030),r=n(6289),a=n(4848);const o=e=>{let{link:t,linkTitle:n}=e;return(0,a.jsx)("div",{className:"nav-and-print-container",children:(0,a.jsx)("div",{className:"nav-link",children:(0,a.jsxs)(r.A,{to:`${(0,i.Ay)(t)}`,children:["\u2190 ",n]})})})};var s=n(4408);const l=e=>{let{link:t,linkTitle:n,document:i}=e;return(0,a.jsxs)("div",{className:"nav-container",children:[(0,a.jsx)("div",{className:"nav-link-container",children:(0,a.jsx)(o,{link:t,linkTitle:n})}),(0,a.jsx)("div",{className:"version-container",children:(0,a.jsx)(s.A,{document:i})})]})}},4408:(e,t,n)=>{n.d(t,{A:()=>o});var i=n(6540),r=n(6347),a=n(4848);const o=e=>{let{document:t}=e;const n=(0,r.W6)(),o=(0,r.zy)(),[s,l]=(0,i.useState)([]),[c,d]=(0,i.useState)("");(0,i.useEffect)((()=>{(async()=>{try{const e=await fetch("/RMC-Software-Documentation/versions/versionList.json"),n=(await e.json())[t]||[];l(n);const i=(()=>{const e=o.pathname.match(/\/(v\d+\.\d+)\//);return e?e[1]:""})();i&&n.includes(i)&&d(i)}catch(e){console.error("Error fetching version list:",e)}})()}),[t,o.pathname]);return(0,a.jsx)("div",{className:"version-selector-container",children:s.length>0?(0,a.jsx)("select",{className:"version-selector-dropdown",value:c,onChange:e=>{const t=e.target.value;d(t);const i=o.pathname.replace(/\/v\d+\.\d+\//,`/${t}/`);i!==o.pathname&&n.push(i)},children:s.map((e=>(0,a.jsx)("option",{value:e,children:e},e)))}):(0,a.jsx)("p",{className:"loading-message",children:"Loading versions..."})})}},4577:(e,t,n)=>{n.d(t,{A:()=>a});var i=n(6540),r=n(4848);const a=e=>{let{parentDocId:t,figKey:n,src:a,alt:o,caption:s}=e;const[l,c]=(0,i.useState)(null),d=`/RMC-Software-Documentation/counters/${t.replace(/\//g,"-")}.json`,u=`/RMC-Software-Documentation/${a}`;return(0,i.useEffect)((()=>{try{(async()=>{try{const e=await fetch(d);if(!e.ok)throw new Error(`Failed to load ${d}`);const t=await e.json();let i=null;Object.keys(t).forEach((e=>{t[e]?.figures?.[n]&&(i=t[e].figures[n])})),i?c(i):console.warn(`Figure key "${n}" not found`)}catch(e){console.error("Error loading counters:",e)}})()}catch(e){console.error("Critical error in useEffect:",e)}}),[t,n]),l?(0,r.jsxs)("figure",{className:"figure-container",children:[(0,r.jsx)("img",{src:u,alt:o,className:"figure-image"}),(0,r.jsxs)("figcaption",{className:"figure-caption",children:["Figure ",l.figNumber,": ",s]})]}):(0,r.jsx)("span",{children:"Loading..."})}},6916:(e,t,n)=>{n.d(t,{A:()=>c,h:()=>l});var i=n(6540),r=n(6347),a=n(9030),o=n(4848);const s=new Map,l=e=>Array.from(s.get(e)?.values()||[]),c=e=>{let{citationKey:t,bibFile:n}=e;const[l,c]=(0,i.useState)("?"),d=(0,r.zy)(),u=(0,a.Ay)(n);return(0,i.useEffect)((()=>{(async()=>{try{const e=await fetch(u),n=(await e.json()).sort(((e,t)=>{const n=Array.isArray(e.author)?e.author[0]:e.author,i=Array.isArray(t.author)?t.author[0]:t.author;return n.localeCompare(i)})),i=n.findIndex((e=>e.citationKey===t));if(-1!==i){const e=i+1;c(e),s.has(d.pathname)||s.set(d.pathname,new Map);s.get(d.pathname).set(t,{...n[i],number:e}),window.dispatchEvent(new Event("citationsUpdated"))}}catch(e){console.error("Error fetching bibliography:",e)}})()}),[t,u,d.pathname]),(0,o.jsx)("span",{className:"citation-reference",children:(0,o.jsxs)("a",{href:`#footnote-${t}`,style:{textDecorartion:"none"},children:["[",l,"]"]})})}}}]);