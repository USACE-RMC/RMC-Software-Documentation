"use strict";(self.webpackChunkrmc_software_documentation=self.webpackChunkrmc_software_documentation||[]).push([[9897],{1462:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>h,contentTitle:()=>p,default:()=>g,frontMatter:()=>u,metadata:()=>a,toc:()=>m});const a=JSON.parse('{"id":"toolbox-technical-manuals/backward-erosion-piping-progression/summary","title":"summary","description":"<NavAndPrint","source":"@site/docs/toolbox-technical-manuals/backward-erosion-piping-progression/08-summary.mdx","sourceDirName":"toolbox-technical-manuals/backward-erosion-piping-progression","slug":"/toolbox-technical-manuals/backward-erosion-piping-progression/summary","permalink":"/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/summary","draft":false,"unlisted":false,"tags":[],"version":"current","lastUpdatedAt":1742696789000,"sidebarPosition":8,"frontMatter":{},"sidebar":"bepProgressionSidebar","previous":{"title":"Creep Ratios","permalink":"/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/creep-ratios"},"next":{"title":"References","permalink":"/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/references"}}');var n=r(4848),o=r(8453),i=r(4577),s=r(1488),l=(r(5211),r(5528),r(6916)),c=r(3900),d=r(8807);r(6289),r(9030);const u={},p="Summary",h={},m=[];function f(e){const t={h1:"h1",header:"header",p:"p",...(0,o.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(d.A,{link:"internal-erosion-suite",linkTitle:"Internal Erosion Suite",reportName:"toolbox-technical-manuals/backward-erosion-piping-progression",pdfFilename:"08-summary.pdf"}),"\n",(0,n.jsx)(t.header,{children:(0,n.jsx)(t.h1,{id:"summary",children:"Summary"})}),"\n",(0,n.jsxs)(t.p,{children:["This worksheet provides summary plots of the various methods used to assess the likelihood of BEP progression. The first plot\r\nis the average hydraulic gradient at the pipe head (black solid line) as a function of headwater level. If cycling through\r\niterations using @RISK, the displayed results are no longer mean values; they are the selected iteration. Horizontal reference\r\nlines display for the mean field critical gradient for the adjusted Schmertmann method (blue dashed line), mean field horizontal\r\ncritical gradient for the adjusted calculation rule of Sellmeijer et al. (green dashed line), inverse of Bligh\u2019s minimum creep\r\nratio (red dashed line), and inverse of Lane\u2019s minimum weighted creep ratio (orange dashed line). If cycling through iterations\r\nusing @RISK, the displayed results are no longer mean values; they are the selected\r\niteration. ",(0,n.jsx)(s.A,{parentDocId:"108",figKey:"summary-deterministic-graphical-output"})," illustrates the deterministic graphical output."]}),"\n",(0,n.jsx)(i.A,{parentDocId:"108",figKey:"summary-deterministic-graphical-output",src:"figures/toolbox-technical-manuals/backward-erosion-piping-progression/figure64.png",alt:"Summary worksheet: Deterministic graphical output.",caption:"Summary worksheet: Deterministic graphical output."}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(s.A,{parentDocId:"108",figKey:"summary-deterministic-plot-options"})," illustrates the plot options for this chart. The\r\nmaximum value for the y-axis (average horizontal gradient at the pipe head) and minimum and maximum values for the x-axis (headwater\r\nlevel) are user-specified. Users can input up to five vertical reference elevations, and user-specified labels display at the\r\ntop of the chart."]}),"\n",(0,n.jsx)(i.A,{parentDocId:"108",figKey:"summary-deterministic-plot-options",src:"figures/toolbox-technical-manuals/backward-erosion-piping-progression/figure65.png",alt:"Summary worksheet: Plot options for deterministic graphical output.",caption:"Summary worksheet: Plot options for deterministic graphical output."}),"\n",(0,n.jsxs)(t.p,{children:["Select the chart and filter icon to display the filter pane to select or deselect data series, as shown\r\nin ",(0,n.jsx)(s.A,{parentDocId:"108",figKey:"summary-filter-data"}),". For example, if only the results from the adjusted\r\nSchmertmann method and inverse of Bligh\u2019s creep ratio are judged applicable, deselecting the other data series removes them from\r\nthe plot and the legend."]}),"\n",(0,n.jsx)(i.A,{parentDocId:"108",figKey:"summary-filter-data",src:"figures/toolbox-technical-manuals/backward-erosion-piping-progression/figure66.png",alt:"Summary worksheet: Example of filtering data.",caption:"Summary worksheet: Example of filtering data."}),"\n",(0,n.jsxs)(t.p,{children:["The second plot of the worksheet is the probability of BEP progression for the adjusted Schmertmann method (blue solid line) and\r\nadjusted calculation rule of Sellmeijer et al. (green solid line) as functions of headwater level. Because the adjusted Schmertmann\r\nmethod uses the probabilistic chart of Robbins and Sharp ",(0,n.jsx)(l.A,{citationKey:"Robbins2016",bibFile:"/bibliographies/108-bib.json"}),",\r\nexpanded by Robbins and O\u2019Leary ",(0,n.jsx)(l.A,{citationKey:"Robbins2020",bibFile:"/bibliographies/108-bib.json"}),", a probability of BEP\r\nprogression displays for both deterministic and probabilistic analysis. However, the adjusted calculation rule of Sellmeijer et al.\r\ndisplays for probabilistic analysis only. ",(0,n.jsx)(s.A,{parentDocId:"108",figKey:"summary-probabilistic-graphical-output"})," illustrates\r\nthe probabilistic graphical output."]}),"\n",(0,n.jsx)(i.A,{parentDocId:"108",figKey:"summary-probabilistic-graphical-output",src:"figures/toolbox-technical-manuals/backward-erosion-piping-progression/figure67.png",alt:"Summary worksheet: Probabilistic graphical output.",caption:"Summary worksheet: Probabilistic graphical output."}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(s.A,{parentDocId:"108",figKey:"summary-probabilistic-plot-options"})," illustrates the plot options for this chart. The vertical\r\nreference elevations and minimum and maximum values for the x-axis (headwater level) are the same as the input\r\nfor ",(0,n.jsx)(s.A,{parentDocId:"108",figKey:"summary-deterministic-plot-options"}),". Only the maximum value for the y-axis (probability\r\nof BEP progression) is user-specified."]}),"\n",(0,n.jsx)(i.A,{parentDocId:"108",figKey:"summary-probabilistic-plot-options",src:"figures/toolbox-technical-manuals/backward-erosion-piping-progression/figure68.png",alt:"Summary worksheet: Plot options for probabilistic graphical output.",caption:"Summary worksheet: Plot options for probabilistic graphical output."}),"\n",(0,n.jsx)(c.A,{})]})}function g(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(f,{...e})}):f(e)}},1488:(e,t,r)=>{r.d(t,{A:()=>i});var a=r(6540),n=r(9030),o=r(4848);const i=e=>{let{parentDocId:t,figKey:r}=e;const[i,s]=(0,a.useState)(null),l=(0,n.Ay)(`counters/${t.replace(/\//g,"-")}.json`);return(0,a.useEffect)((()=>{(async()=>{try{const e=await fetch(l);if(!e.ok)throw new Error(`Failed to load ${l}`);const t=await e.json();let a=null;Object.keys(t).forEach((e=>{t[e]?.figures?.[r]&&(a=t[e].figures[r])})),a?s(a):console.warn(`Figure key "${r}" not found`)}catch(e){console.error("Error loading counters:",e)}})()}),[r]),i?(0,o.jsxs)("span",{className:"figure-reference",children:["Figure ",i.figNumber]}):(0,o.jsx)("span",{children:"Loading..."})}},3900:(e,t,r)=>{r.d(t,{A:()=>s});var a=r(6540),n=r(6916),o=r(6347),i=r(4848);const s=()=>{const[e,t]=(0,a.useState)([]),r=(0,o.zy)();if((0,a.useEffect)((()=>{const e=()=>{const e=(0,n.h)(r.pathname);t(e)};e();const a=()=>{e()};return window.addEventListener("citationsUpdated",a),()=>{window.removeEventListener("citationsUpdated",a)}}),[r.pathname]),0===e.length)return null;const s=e=>{const{author:t,year:r,title:a,journal:n,booktitle:o,report:s,manual:l,institution:c,organization:d,location:u,volume:p,edition:h,pages:m,doi:f,url:g,publisher:b}=e;return(0,i.jsxs)(i.Fragment,{children:[(y=t,Array.isArray(y)?y.length>1?y.slice(0,-1).join(", ")+" & "+y[y.length-1]:y[0]:y)," (",r,"). ",(0,i.jsx)("em",{children:a}),".",n&&` ${n}`,o&&` In ${o}`,d&&` (${d})`,u&&`, ${u}`,p&&`, Vol. ${p}`,h&&`(${h})`,m&&`, pp. ${m}`,b&&` ${b}`,c&&` ${c}`,s&&` ${s}`,l&&` ${l}`,f&&(0,i.jsxs)(i.Fragment,{children:[" ",(0,i.jsxs)("a",{href:`https://doi.org/${f}`,target:"_blank",rel:"noopener noreferrer",children:["https://doi.org/",f]})]}),g&&(0,i.jsxs)(i.Fragment,{children:[" ",(0,i.jsx)("a",{href:g,target:"_blank",rel:"noopener noreferrer",children:g})]})]});var y};return(0,i.jsx)("div",{className:"citation-footnote",children:(0,i.jsx)("ol",{children:e.sort(((e,t)=>e.number-t.number)).map((e=>(0,i.jsx)("li",{value:e.number,id:`footnote-${e.citationKey}`,children:s(e)},e.citationKey)))})})}},4577:(e,t,r)=>{r.d(t,{A:()=>i});var a=r(6540),n=r(9030),o=r(4848);const i=e=>{let{parentDocId:t,figKey:r,src:i,alt:s,caption:l}=e;const[c,d]=(0,a.useState)(null),u=(0,n.Ay)(`counters/${t.replace(/\//g,"-")}.json`),p=(0,n.Ay)(i);return(0,a.useEffect)((()=>{try{(async()=>{try{const e=await fetch(u);if(!e.ok)throw new Error(`Failed to load ${u}`);const t=await e.json();let a=null;Object.keys(t).forEach((e=>{t[e]?.figures?.[r]&&(a=t[e].figures[r])})),a?d(a):console.warn(`Figure key "${r}" not found`)}catch(e){console.error("Error loading counters:",e)}})()}catch(e){console.error("Critical error in useEffect:",e)}}),[t,r]),c?(0,o.jsxs)("figure",{className:"figure-container",children:[(0,o.jsx)("img",{src:p,alt:s,className:"figure-image"}),(0,o.jsxs)("figcaption",{className:"figure-caption",children:["Figure ",c.figNumber,": ",l]})]}):(0,o.jsx)("span",{children:"Loading..."})}},5211:(e,t,r)=>{r.d(t,{A:()=>i});var a=r(6540),n=r(9030),o=r(4848);const i=e=>{let{parentDocId:t,tableKey:r,headers:i,columns:s,alt:l,caption:c}=e;const[d,u]=(0,a.useState)(null),p=(0,n.Ay)(`counters/${t.replace(/\//g,"-")}.json`);if((0,a.useEffect)((()=>{(async()=>{try{const e=await fetch(p);if(!e.ok)throw new Error(`Failed to load ${p}`);const t=await e.json();let a=null;Object.keys(t).forEach((e=>{t[e]?.tables?.[r]&&(a=t[e].tables[r])})),a?u(a):console.warn(`Table key "${r}" not found`)}catch(e){console.error("Error loading counters:",e)}})()}),[t,r]),!d)return(0,o.jsx)("span",{children:"Loading..."});const h=s.length>0?s[0].length:0;return(0,o.jsx)("div",{className:"table-container",children:(0,o.jsxs)("table",{alt:l,className:"static-table-vertical",children:[(0,o.jsxs)("caption",{className:"table-caption",children:["Table ",d.tableNumber,": ",c]}),(0,o.jsx)("thead",{children:(0,o.jsx)("tr",{children:i.map(((e,t)=>(0,o.jsx)("th",{children:e},t)))})}),(0,o.jsx)("tbody",{children:Array.from({length:h}).map(((e,t)=>(0,o.jsx)("tr",{children:s.map(((e,r)=>(0,o.jsx)("td",{children:e[t]||""},r)))},t)))})]})})}},5528:(e,t,r)=>{r.d(t,{A:()=>i});var a=r(6540),n=r(9030),o=r(4848);const i=e=>{let{parentDocId:t,tableKey:r}=e;const[i,s]=(0,a.useState)(null),l=(0,n.Ay)(`counters/${t.replace(/\//g,"-")}.json`);return(0,a.useEffect)((()=>{(async()=>{try{const e=await fetch(l);if(!e.ok)throw new Error(`Failed to load ${l}`);const t=await e.json();let a=null;Object.keys(t).forEach((e=>{t[e]?.tables?.[r]&&(a=t[e].tables[r])})),a?s(a):console.warn(`Figure key "${r}" not found`)}catch(e){console.error("Error loading counters:",e)}})()}),[r]),i?(0,o.jsxs)("span",{className:"table-reference",children:["Table ",i.tableNumber]}):(0,o.jsx)("span",{children:"Loading..."})}},6916:(e,t,r)=>{r.d(t,{A:()=>c,h:()=>l});var a=r(6540),n=r(6347),o=r(9030),i=r(4848);const s=new Map,l=e=>Array.from(s.get(e)?.values()||[]),c=e=>{let{citationKey:t,bibFile:r}=e;const[l,c]=(0,a.useState)("?"),d=(0,n.zy)(),u=(0,o.Ay)(r);return(0,a.useEffect)((()=>{(async()=>{try{const e=await fetch(u),r=(await e.json()).sort(((e,t)=>{const r=Array.isArray(e.author)?e.author[0]:e.author,a=Array.isArray(t.author)?t.author[0]:t.author;return r.localeCompare(a)})),a=r.findIndex((e=>e.citationKey===t));if(-1!==a){const e=a+1;c(e),s.has(d.pathname)||s.set(d.pathname,new Map);s.get(d.pathname).set(t,{...r[a],number:e}),window.dispatchEvent(new Event("citationsUpdated"))}}catch(e){console.error("Error fetching bibliography:",e)}})()}),[t,u,d.pathname]),(0,i.jsx)("span",{className:"citation-reference",children:(0,i.jsxs)("sup",{children:["[",l,"]"]})})}},8453:(e,t,r)=>{r.d(t,{R:()=>i,x:()=>s});var a=r(6540);const n={},o=a.createContext(n);function i(e){const t=a.useContext(o);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:i(e.components),a.createElement(o.Provider,{value:t},e.children)}},8807:(e,t,r)=>{r.d(t,{A:()=>s});r(6540);var a=r(9030),n=r(4848);const o=e=>{let{reportName:t,pdfFilename:r}=e;const o=(0,a.Ay)(`pdfs/${t}/${r}`);return(0,n.jsx)("button",{className:"download-pdf-button",onClick:()=>{const e=document.createElement("a");e.href=o,e.download=r,e.click(),console.log("Downloading PDF from:",o)},children:"\u2193 PDF"})};var i=r(6289);const s=e=>{let{link:t,linkTitle:r,reportName:a,pdfFilename:s}=e;return"none"===t?(0,n.jsx)("div",{className:"nav-and-print-container",children:(0,n.jsx)("div",{className:"print-to-pdf-container",children:(0,n.jsx)(o,{reportName:a,pdfFilename:s})})}):(0,n.jsxs)("div",{className:"nav-and-print-container",children:[(0,n.jsx)("div",{className:"nav-link",children:(0,n.jsxs)(i.A,{to:`/${t}`,children:["\u2190 ",r]})}),(0,n.jsx)("div",{className:"print-to-pdf-container",children:(0,n.jsx)(o,{reportName:a,pdfFilename:s})})]})}}}]);