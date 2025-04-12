"use strict";(self.webpackChunkrmc_software_documentation=self.webpackChunkrmc_software_documentation||[]).push([[9e3],{1222:(e,t,n)=>{n.d(t,{A:()=>r});var i=n(6540),o=n(4848);const r=e=>{let{parentDocId:t,equationKey:n}=e;const[r,s]=(0,i.useState)(null),a=`/RMC-Software-Documentation/counters/${t.replace(/\//g,"-")}.json`;return(0,i.useEffect)((()=>{(async()=>{try{const e=await fetch(a);if(!e.ok)throw new Error(`Failed to load ${a}`);const t=await e.json();let i=null;Object.keys(t).forEach((e=>{t[e]?.equations?.[n]&&(i=t[e].equations[n])})),i?s(i.equationNumber):console.warn(`Equation key "${n}" not found`)}catch(e){console.error("Error loading counters:",e)}})()}),[n]),null===r?(0,o.jsx)("span",{children:"Loading..."}):(0,o.jsxs)("span",{className:"equation-reference",children:["Equation ",r]})}},1488:(e,t,n)=>{n.d(t,{A:()=>r});var i=n(6540),o=n(4848);const r=e=>{let{parentDocId:t,figKey:n}=e;const[r,s]=(0,i.useState)(null),a=`/RMC-Software-Documentation/counters/${t.replace(/\//g,"-")}.json`;return(0,i.useEffect)((()=>{(async()=>{try{const e=await fetch(a);if(!e.ok)throw new Error(`Failed to load ${a}`);const t=await e.json();let i=null;Object.keys(t).forEach((e=>{t[e]?.figures?.[n]&&(i=t[e].figures[n])})),i?s(i):console.warn(`Figure key "${n}" not found`)}catch(e){console.error("Error loading counters:",e)}})()}),[n]),r?(0,o.jsxs)("span",{className:"figure-reference",children:["Figure ",r.figNumber]}):(0,o.jsx)("span",{children:"Loading..."})}},2783:(e,t,n)=>{n.d(t,{A:()=>s});var i=n(6540),o=n(8908),r=n(4848);const s=e=>{let{parentDocId:t,equationKey:n,equation:s,inline:a=!1}=e;const[c,l]=(0,i.useState)(null),d=`/RMC-Software-Documentation/counters/${t.replace(/\//g,"-")}.json`;if((0,i.useEffect)((()=>{try{(async()=>{try{const e=await fetch(d);if(!e.ok)throw new Error(`Failed to load ${d}`);const t=await e.json();let i=null;Object.keys(t).forEach((e=>{t[e]?.equations?.[n]&&(i=t[e].equations[n])})),i?l(i.equationNumber):console.warn(`Equation key "${n}" not found`)}catch(e){console.error("Error loading counters:",e)}})()}catch(e){console.error("Critical error in useEffect:",e)}}),[t,n]),null===c)return(0,r.jsx)("span",{children:"Loading..."});const h=s,u=`${s} \\tag{${c}}`;return(0,r.jsx)("span",{className:"equation-container",children:a?(0,r.jsx)(o.InlineMath,{math:h}):(0,r.jsx)(o.BlockMath,{math:u})})}},3900:(e,t,n)=>{n.d(t,{A:()=>a});var i=n(6540),o=n(6916),r=n(6347),s=n(4848);const a=()=>{const[e,t]=(0,i.useState)([]),n=(0,r.zy)();if((0,i.useEffect)((()=>{const e=()=>{const e=(0,o.h)(n.pathname);t(e)};e();const i=()=>{e()};return window.addEventListener("citationsUpdated",i),()=>{window.removeEventListener("citationsUpdated",i)}}),[n.pathname]),0===e.length)return null;const a=e=>{const{author:t,year:n,title:i,journal:o,booktitle:r,report:a,manual:c,institution:l,organization:d,location:h,volume:u,edition:f,pages:p,doi:x,url:j,publisher:m}=e;return(0,s.jsxs)(s.Fragment,{children:[(b=t,Array.isArray(b)?b.map((e=>{const t=e.split(" ");return`${t.slice(0,-1).map((e=>e[0]+".")).join(" ")} ${t[t.length-1]}`})).join(", "):b)," (",n,"). ",(0,s.jsx)("em",{children:i}),".",o&&` ${o}`,r&&` In ${r}`,d&&` (${d})`,h&&`, ${h}`,u&&`, Vol. ${u}`,f&&`(${f})`,p&&`, pp. ${p}`,m&&` ${m}`,l&&` ${l}`,a&&` ${a}`,c&&` ${c}`,x&&(0,s.jsxs)(s.Fragment,{children:[" ",(0,s.jsxs)("a",{href:`https://doi.org/${x}`,target:"_blank",rel:"noopener noreferrer",children:["https://doi.org/",x]})]}),j&&(0,s.jsxs)(s.Fragment,{children:[" ",(0,s.jsx)("a",{href:j,target:"_blank",rel:"noopener noreferrer",children:j})]})]});var b};return(0,s.jsx)("div",{className:"citation-footnote",style:{marginLeft:"20px"},children:(0,s.jsx)("ol",{style:{listStyleType:"none",paddingLeft:"0"},children:e.sort(((e,t)=>e.number-t.number)).map((e=>(0,s.jsxs)("li",{value:e.number,id:`footnote-${e.citationKey}`,style:{display:"flex",alignItems:"flex-start",marginBottom:"10px"},children:[(0,s.jsxs)("span",{style:{minWidth:"40px",flexShrink:0},children:["[",e.number,"]"]})," ",(0,s.jsx)("span",{style:{display:"block"},children:a(e)})]},e.citationKey)))})})}},4193:(e,t,n)=>{n.d(t,{A:()=>c});n(6540);var i=n(9030),o=n(6289),r=n(4848);const s=e=>{let{link:t,linkTitle:n}=e;return(0,r.jsx)("div",{className:"nav-and-print-container",children:(0,r.jsx)("div",{className:"nav-link",children:(0,r.jsxs)(o.A,{to:`${(0,i.Ay)(t)}`,children:["\u2190 ",n]})})})};var a=n(4408);const c=e=>{let{link:t,linkTitle:n,document:i}=e;return(0,r.jsxs)("div",{className:"nav-container",children:[(0,r.jsx)("div",{className:"nav-link-container",children:(0,r.jsx)(s,{link:t,linkTitle:n})}),(0,r.jsx)("div",{className:"version-container",children:(0,r.jsx)(a.A,{document:i})})]})}},4408:(e,t,n)=>{n.d(t,{A:()=>s});var i=n(6540),o=n(6347),r=n(4848);const s=e=>{let{document:t}=e;const n=(0,o.W6)(),s=(0,o.zy)(),[a,c]=(0,i.useState)([]),[l,d]=(0,i.useState)("");(0,i.useEffect)((()=>{(async()=>{try{const e=await fetch("/RMC-Software-Documentation/versions/versionList.json"),n=(await e.json())[t]||[];c(n);const i=(()=>{const e=s.pathname.match(/\/(v\d+\.\d+)\//);return e?e[1]:""})();i&&n.includes(i)&&d(i)}catch(e){console.error("Error fetching version list:",e)}})()}),[t,s.pathname]);return(0,r.jsx)("div",{className:"version-selector-container",children:a.length>0?(0,r.jsx)("select",{className:"version-selector-dropdown",value:l,onChange:e=>{const t=e.target.value;d(t);const i=s.pathname.replace(/\/v\d+\.\d+\//,`/${t}/`);i!==s.pathname&&n.push(i)},children:a.map((e=>(0,r.jsx)("option",{value:e,children:e},e)))}):(0,r.jsx)("p",{className:"loading-message",children:"Loading versions..."})})}},4577:(e,t,n)=>{n.d(t,{A:()=>r});var i=n(6540),o=n(4848);const r=e=>{let{parentDocId:t,figKey:n,src:r,alt:s,caption:a}=e;const[c,l]=(0,i.useState)(null),d=`/RMC-Software-Documentation/counters/${t.replace(/\//g,"-")}.json`,h=`/RMC-Software-Documentation/${r}`;return(0,i.useEffect)((()=>{try{(async()=>{try{const e=await fetch(d);if(!e.ok)throw new Error(`Failed to load ${d}`);const t=await e.json();let i=null;Object.keys(t).forEach((e=>{t[e]?.figures?.[n]&&(i=t[e].figures[n])})),i?l(i):console.warn(`Figure key "${n}" not found`)}catch(e){console.error("Error loading counters:",e)}})()}catch(e){console.error("Critical error in useEffect:",e)}}),[t,n]),c?(0,o.jsxs)("figure",{className:"figure-container",children:[(0,o.jsx)("img",{src:h,alt:s,className:"figure-image"}),(0,o.jsxs)("figcaption",{className:"figure-caption",children:["Figure ",c.figNumber,": ",a]})]}):(0,o.jsx)("span",{children:"Loading..."})}},5528:(e,t,n)=>{n.d(t,{A:()=>s});var i=n(6540),o=n(9030),r=n(4848);const s=e=>{let{parentDocId:t,tableKey:n}=e;const[s,a]=(0,i.useState)(null),c=(0,o.Ay)(`counters/${t.replace(/\//g,"-")}.json`);return(0,i.useEffect)((()=>{(async()=>{try{const e=await fetch(c);if(!e.ok)throw new Error(`Failed to load ${c}`);const t=await e.json();let i=null;Object.keys(t).forEach((e=>{t[e]?.tables?.[n]&&(i=t[e].tables[n])})),i?a(i):console.warn(`Figure key "${n}" not found`)}catch(e){console.error("Error loading counters:",e)}})()}),[n]),s?(0,r.jsxs)("span",{className:"table-reference",children:["Table ",s.tableNumber]}):(0,r.jsx)("span",{children:"Loading..."})}},5620:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>g,contentTitle:()=>b,default:()=>w,frontMatter:()=>m,metadata:()=>i,toc:()=>y});const i=JSON.parse('{"id":"toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/constricted-exit","title":"Constricted Exit","description":"<NavContainer","source":"@site/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/10-constricted-exit.mdx","sourceDirName":"toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0","slug":"/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/constricted-exit","permalink":"/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/constricted-exit","draft":false,"unlisted":false,"tags":[],"version":"current","lastUpdatedAt":1744420475000,"sidebarPosition":10,"frontMatter":{"title":"Constricted Exit"},"sidebar":"filterEvaluationSidebar","previous":{"title":"Summary Plot","permalink":"/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/summary-plot"},"next":{"title":"Permeability","permalink":"/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/permeability"}}');var o=n(4848),r=n(8453),s=n(4577),a=n(1488),c=n(6540),l=n(9030);const d=e=>{let{parentDocId:t,tableKey:n,headers:i,rows:r,alt:s,caption:a}=e;const[d,h]=(0,c.useState)(null),u=(0,l.Ay)(`counters/${t.replace(/\//g,"-")}.json`);if((0,c.useEffect)((()=>{(async()=>{try{const e=await fetch(u);if(!e.ok)throw new Error(`Failed to load ${u}`);const t=await e.json();let i=null;Object.keys(t).forEach((e=>{t[e]?.tables?.[n]&&(i=t[e].tables[n])})),i?h(i):console.warn(`Table key "${n}" not found`)}catch(e){console.error("Error loading counters:",e)}})()}),[t,n]),!d)return(0,o.jsx)("span",{children:"Loading..."});const f=e=>({__html:e});return(0,o.jsx)("div",{className:"table-container",children:(0,o.jsxs)("table",{alt:s,className:"static-table-horizontal",children:[(0,o.jsxs)("caption",{className:"table-caption",children:["Table ",d.tableNumber,": ",a]}),(0,o.jsx)("tbody",{children:i.map(((e,t)=>(0,o.jsxs)("tr",{children:[(0,o.jsx)("th",{dangerouslySetInnerHTML:f(e)}),r[t].map(((e,t)=>(0,o.jsx)("td",{dangerouslySetInnerHTML:f(e)},t)))]},t)))})]})})};var h=n(5528),u=n(2783),f=n(1222),p=n(6916),x=n(3900),j=n(4193);n(6289);const m={title:"Constricted Exit"},b="Constricted Exit",g={},y=[{value:"Base Soil Characterization",id:"base-soil-characterization",level:2},{value:"Open Joint, Defect, or Crack Characterization",id:"open-joint-defect-or-crack-characterization",level:2},{value:"Likelihood of Continuation",id:"likelihood-of-continuation",level:2}];function v(e){const t={em:"em",h1:"h1",h2:"h2",header:"header",p:"p",...(0,r.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(j.A,{link:"/toolboxes/internal-erosion-suite",linkTitle:"Internal Erosion Suite",document:"toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation"}),"\n",(0,o.jsx)(t.header,{children:(0,o.jsx)(t.h1,{id:"constricted-exit",children:"Constricted Exit"})}),"\n",(0,o.jsx)(t.p,{children:"Constricted, or non-erodible, exits consist of open joints, defects, or cracks in conduits, drains, walls, or rock. For erosion to continue, the opening size must be sufficient\r\nfor the adjacent base soil particles to pass through it. This worksheet assesses the joint/defect opening size that allows erosion to continue."}),"\n",(0,o.jsx)(t.h2,{id:"base-soil-characterization",children:"Base Soil Characterization"}),"\n",(0,o.jsxs)(t.p,{children:["Step 1 characterizes the base material. The range of ",(0,o.jsxs)(t.em,{children:["D",(0,o.jsx)("sub",{children:"95"}),"B"]})," of the base soil adjacent to the open joint, defect, or crack is obtained from the Base Gradation worksheet,\r\nwhere the finest and coarsest ",(0,o.jsxs)(t.em,{children:["D",(0,o.jsx)("sub",{children:"95"}),"B"]})," of the adjacent base soil after regrading (if applicable) are interpolated using a logarithmic scale for particle size and linear\r\nscale for percent passing. ",(0,o.jsx)(a.A,{parentDocId:"107_1_0",figKey:"constricted-exit-base-soil"})," is an example of step 1."]}),"\n",(0,o.jsx)(s.A,{parentDocId:"107_1_0",docId:"10-constricted-exit.mdx",figKey:"constricted-exit-base-soil",src:"figures/toolbox-technical-manuals/filter-evaluation-continuation/figure34.png",alt:"Step 1 of Constricted Exit worksheet: Base soil characterization.",caption:"Step 1 of Constricted Exit worksheet: Base soil characterization."}),"\n",(0,o.jsx)(t.h2,{id:"open-joint-defect-or-crack-characterization",children:"Open Joint, Defect, or Crack Characterization"}),"\n",(0,o.jsxs)(t.p,{children:["Step 2 characterizes the open joint, defect, or crack, and the joint/defect opening size (",(0,o.jsx)(t.em,{children:"JOS"}),") is input. The user-specified ",(0,o.jsx)(t.em,{children:"JOS"})," and range of ",(0,o.jsxs)(t.em,{children:["D",(0,o.jsx)("sub",{children:"95"}),"B"]})," of the adjacent\r\nbase soil are portrayed on a cumulative particle-size plot to visually compare their relative sizes, as shown in ",(0,o.jsx)(a.A,{parentDocId:"107_1_0",figKey:"effective-opening"}),". The\r\ny-axis (percent passing by weight) is truncated at 90 percent passing since only the particle-size diameter corresponding to 95 percent passing is used in the evaluation. The size\r\nof the open joint, defect, or crack is depicted with a vertical back line at the ",(0,o.jsx)(t.em,{children:"JOS"})," and horizontal lines that extend infinitely smaller since a logarithmic scale is used. The\r\nrange of ",(0,o.jsxs)(t.em,{children:["D",(0,o.jsx)("sub",{children:"95"}),"B"]})," displays as a red horizontal line."]}),"\n",(0,o.jsx)(s.A,{parentDocId:"107_1_0",docId:"10-constricted-exit.mdx",figKey:"effective-opening",src:"figures/toolbox-technical-manuals/filter-evaluation-continuation/figure35.png",alt:"Step 2 of Constricted Exit worksheet: Effective opening size.",caption:"Step 2 of Constricted Exit worksheet: Effective opening size."}),"\n",(0,o.jsxs)(t.p,{children:["The plot options for this chart are illustrated in ",(0,o.jsx)(a.A,{parentDocId:"107_1_0",figKey:"plot-options"}),". The minimum and maximum values for the x-axis (particle size) are user-specified."]}),"\n",(0,o.jsx)(s.A,{parentDocId:"107_1_0",docId:"10-constricted-exit.mdx",figKey:"plot-options",src:"figures/toolbox-technical-manuals/filter-evaluation-continuation/figure36.png",alt:"Step 2 of Constricted Exit worksheet: Plot options.",caption:"Step 2 of Constricted Exit worksheet: Plot options."}),"\n",(0,o.jsx)(t.h2,{id:"likelihood-of-continuation",children:"Likelihood of Continuation"}),"\n",(0,o.jsxs)(t.p,{children:["Step 3 estimates the probability of continuing erosion (",(0,o.jsxs)(t.em,{children:["P",(0,o.jsx)("sub",{children:"CE"})]}),") using the procedure of Fell and Foster ",(0,o.jsx)(p.A,{citationKey:"Toolbox2023",bibFile:"/bibliographies/107_1_0-bib.json"}),".\r\nThe ",(0,o.jsx)(t.em,{children:"JOS"})," that allows continuing erosion of the adjacent base soil (",(0,o.jsxs)(t.em,{children:["JOS",(0,o.jsx)("sub",{children:"CE"})]}),") is between ",(0,o.jsxs)(t.em,{children:["D",(0,o.jsx)("sub",{children:"95"}),"B"]})," and ",(0,o.jsxs)(t.em,{children:["3D",(0,o.jsx)("sub",{children:"95"}),"B"]}),". Sherard et al. ",(0,o.jsx)(p.A,{citationKey:"Sherard1984",bibFile:"/bibliographies/107_1_0-bib.json"}),"\r\nconcluded that uniform filters act similar to laboratory sieves with an opening sieve size approximately equal to ",(0,o.jsx)(u.A,{parentDocId:"107_1_0",equationKey:"p-ce-constricted",equation:"\\frac{D_{15}F}{9}",inline:!0}),".\r\nThe ",(0,o.jsxs)(t.em,{children:["D",(0,o.jsx)("sub",{children:"95"}),"B"]})," criterion assumes the Foster and Fell ",(0,o.jsx)(p.A,{citationKey:"FosterFell2001",bibFile:"/bibliographies/107_1_0-bib.json"})," continuing erosion criterion (see section 8.4)\r\napplies to erosion into an open joint, defect, or crack, and the crack width is equivalent to the filter opening size of the voids between the particles in a filter. The ",(0,o.jsxs)(t.em,{children:["3D",(0,o.jsx)("sub",{children:"95"}),"B"]}),"\r\ncriterion is based on the ",(0,o.jsx)(t.em,{children:"JOS"})," for cement grout to penetrate and flow along the opening of joints in rock."]}),"\n",(0,o.jsxs)(t.p,{children:["The probabilities shown in ",(0,o.jsx)(h.A,{parentDocId:"107_1_0",tableKey:"constricted-exit-probabilities"})," considered these limits. In the table, ",(0,o.jsxs)(t.em,{children:["P",(0,o.jsx)("sub",{children:"CE"})]})," is a function the ratio of\r\nthe ",(0,o.jsx)(t.em,{children:"JOS"})," to the finest ",(0,o.jsxs)(t.em,{children:["D",(0,o.jsx)("sub",{children:"95"}),"B"]})," of the adjacent base soil after regrading (if applicable). If ",(0,o.jsx)(u.A,{parentDocId:"107_1_0",equationKey:"p-ce-constricted",equation:"\\frac{JOS}{D_{95}B}",inline:!0}),"\r\nis less than 0.4, zero is displayed. If ",(0,o.jsx)(u.A,{parentDocId:"107_1_0",equationKey:"p-ce-constricted",equation:"\\frac{JOS}{D_{95}B}",inline:!0})," is greater than or equal to 0.4 and less\r\nthan 0.5, ",'"<0.0001"'," is displayed. Intermediate values between 0.5 and 3.0 are interpolated using a z-variate scale for probability and a linear scale for the\r\nratio ",(0,o.jsx)(u.A,{parentDocId:"107_1_0",equationKey:"p-ce-constricted",equation:"\\frac{JOS}{D_{95}B}",inline:!0}),"."]}),"\n",(0,o.jsx)(d,{parentDocId:"107_1_0",tableKey:"constricted-exit-probabilities",headers:["JOS / D<sub>95</sub>B","P<sub>CE</sub>"],rows:[["< 0.4","0.5","0.75","1.0","2.0","\u2265 3.0"],["0","0.0001","0.001","0.1","0.5","0.9"]],alt:"Probability of continuing erosion for joint/defect opening size.",caption:"Probability of continuing erosion for joint/defect opening size."}),"\n",(0,o.jsxs)(t.p,{children:["According to Fell and Foster ",(0,o.jsx)(p.A,{citationKey:"Toolbox2023",bibFile:"/bibliographies/107_1_0-bib.json"}),", these probabilities apply to erosion into open defects in the foundation and conduits\r\nor walls with steady flow conditions. Use higher probabilities for erosion into open defects in conduits or walls with dynamic flow conditions."]}),"\n",(0,o.jsxs)(t.p,{children:["If the coarsest ",(0,o.jsxs)(t.em,{children:["D",(0,o.jsx)("sub",{children:"95"}),"B"]})," of the adjacent base soil after regrading is less than or equal to the ",(0,o.jsx)(t.em,{children:"JOS"})," (",(0,o.jsx)(t.em,{children:"coarsest"})," ",(0,o.jsxs)(t.em,{children:["D",(0,o.jsx)("sub",{children:"95"}),"B"]})," \u2264 ",(0,o.jsx)(t.em,{children:"JOS"}),"), the proportion of the ",(0,o.jsxs)(t.em,{children:["D",(0,o.jsx)("sub",{children:"95"}),"B"]})," finer\r\nthan the ",(0,o.jsx)(t.em,{children:"JOS"})," is 100 percent. If the finest ",(0,o.jsxs)(t.em,{children:["D",(0,o.jsx)("sub",{children:"95"}),"B"]})," of the adjacent base soil after regrading is greater than or equal to the ",(0,o.jsx)(t.em,{children:"JOS"})," (",(0,o.jsx)(t.em,{children:"finest"})," ",(0,o.jsxs)(t.em,{children:["D",(0,o.jsx)("sub",{children:"95"}),"B"]})," \u2265 ",(0,o.jsx)(t.em,{children:"JOS"}),"), the proportion\r\nof the ",(0,o.jsxs)(t.em,{children:["D",(0,o.jsx)("sub",{children:"95"}),"B"]})," finer than the ",(0,o.jsx)(t.em,{children:"JOS"})," is 0 percent. If the coarsest ",(0,o.jsxs)(t.em,{children:["D",(0,o.jsx)("sub",{children:"95"}),"B"]})," of the adjacent base soil after regrading (if applicable) is greater than the ",(0,o.jsx)(t.em,{children:"JOS"})," and the\r\nfinest ",(0,o.jsxs)(t.em,{children:["D",(0,o.jsx)("sub",{children:"95"}),"B"]})," after regrading (if applicable) is less than the ",(0,o.jsx)(t.em,{children:"JOS"}),", the proportion of the ",(0,o.jsxs)(t.em,{children:["D",(0,o.jsx)("sub",{children:"95"}),"B"]})," finer than the ",(0,o.jsx)(t.em,{children:"JOS"})," is calculated as in"]}),"\n",(0,o.jsxs)(t.p,{children:[(0,o.jsx)(f.A,{parentDocId:"107_1_0",equationKey:"p-ce-constricted"}),". ",(0,o.jsx)(a.A,{parentDocId:"107_1_0",figKey:"CE-probability"})," is an example of step 3."]}),"\n",(0,o.jsx)(u.A,{parentDocId:"107_1_0",equationKey:"p-ce-constricted",equation:"P_{CE} = \\frac{log_{10}(JOS) - log_{10}(\\textit{finest}\\ D_{95}B)} {log_{10}(\\textit{coarsest}\\ D_{95}B) - log_{10}(\\textit{finest}\\ D_{95}B)}"}),"\n",(0,o.jsx)(s.A,{parentDocId:"107_1_0",figKey:"CE-probability",src:"figures/toolbox-technical-manuals/filter-evaluation-continuation/figure37.png",alt:"Step 3 of Constricted Exit worksheet: Probability of continuing erosion.",caption:"Step 3 of Constricted Exit worksheet: Probability of continuing erosion."}),"\n",(0,o.jsx)(x.A,{})]})}function w(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(v,{...e})}):v(e)}},6916:(e,t,n)=>{n.d(t,{A:()=>l,h:()=>c});var i=n(6540),o=n(6347),r=n(9030),s=n(4848);const a=new Map,c=e=>Array.from(a.get(e)?.values()||[]),l=e=>{let{citationKey:t,bibFile:n}=e;const[c,l]=(0,i.useState)("?"),d=(0,o.zy)(),h=(0,r.Ay)(n);return(0,i.useEffect)((()=>{(async()=>{try{const e=await fetch(h),n=(await e.json()).sort(((e,t)=>{const n=Array.isArray(e.author)?e.author[0]:e.author,i=Array.isArray(t.author)?t.author[0]:t.author;return n.localeCompare(i)})),i=n.findIndex((e=>e.citationKey===t));if(-1!==i){const e=i+1;l(e),a.has(d.pathname)||a.set(d.pathname,new Map);a.get(d.pathname).set(t,{...n[i],number:e}),window.dispatchEvent(new Event("citationsUpdated"))}}catch(e){console.error("Error fetching bibliography:",e)}})()}),[t,h,d.pathname]),(0,s.jsx)("span",{className:"citation-reference",children:(0,s.jsxs)("a",{href:`#footnote-${t}`,style:{textDecorartion:"none"},children:["[",c,"]"]})})}}}]);