"use strict";(self.webpackChunkrmc_software_documentation=self.webpackChunkrmc_software_documentation||[]).push([[408],{1488:(e,t,n)=>{n.d(t,{A:()=>i});var o=n(6540),a=n(4848);const i=e=>{let{parentDocId:t,figKey:n}=e;const[i,r]=(0,o.useState)(null);return(0,o.useEffect)((()=>{(async()=>{try{const e=`/counters/${t.replace(/\//g,"-")}.json`,o=await fetch(e);if(!o.ok)throw new Error(`Failed to load ${e}`);const a=await o.json();let i=null;Object.keys(a).forEach((e=>{a[e]?.figures?.[n]&&(i=a[e].figures[n])})),i?r(i):console.warn(`Figure key "${n}" not found`)}catch(e){console.error("Error loading counters:",e)}})()}),[n]),i?(0,a.jsxs)("span",{className:"figure-reference",children:["Figure ",i.figNumber]}):(0,a.jsx)("span",{children:"Loading..."})}},2428:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>d,default:()=>p,frontMatter:()=>c,metadata:()=>o,toc:()=>h});const o=JSON.parse('{"id":"toolbox-technical-manuals/filter-evaluation-continuation/general-overview","title":"general-overview","description":"<NavAndPrint","source":"@site/docs/toolbox-technical-manuals/filter-evaluation-continuation/03-general-overview.mdx","sourceDirName":"toolbox-technical-manuals/filter-evaluation-continuation","slug":"/toolbox-technical-manuals/filter-evaluation-continuation/general-overview","permalink":"/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/general-overview","draft":false,"unlisted":false,"tags":[],"version":"current","lastUpdatedAt":1742087426000,"sidebarPosition":3,"frontMatter":{},"sidebar":"filterEvaluationSidebar","previous":{"title":"Terms and Conditions for Use","permalink":"/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/terms-and-conditions-for-use"},"next":{"title":"Background","permalink":"/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/background"}}');var a=n(4848),i=n(8453),r=n(4577),s=n(1488),l=(n(6916),n(3900),n(6289),n(8807));const c={},d="General Overview",u={},h=[{value:"Getting Started",id:"getting-started",level:2},{value:"Organization",id:"organization",level:2}];function f(e){const t={code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",ul:"ul",...(0,i.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(l.A,{link:"internal-erosion-suite",linkTitle:"Internal Erosion Suite",reportName:"toolbox-technical-manuals/filter-evaluation-continuation",pdfFilename:"03-general-overview.pdf"}),"\n",(0,a.jsx)(t.header,{children:(0,a.jsx)(t.h1,{id:"general-overview",children:"General Overview"})}),"\n",(0,a.jsx)(t.h2,{id:"getting-started",children:"Getting Started"}),"\n",(0,a.jsx)(t.p,{children:"Copy or download the toolbox file to the computer. To open the toolbox file, either:"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:"Find the file on the computer and double-click it. This opens the file in Microsoft Excel."}),"\n",(0,a.jsx)(t.li,{children:"Open Microsoft Excel and use the application to open the file: Once Microsoft Excel is open, go to the File menu at the top of the window and select Open."}),"\n"]}),"\n",(0,a.jsxs)(t.p,{children:["The toolbox is an Excel binary workbook (.xlsb) that uses macros. You may need to enable the macros, either before opening the file or by clicking\r\n\u201cEnable Content\u201d in the yellow Security Warning message bar with a shield icon that appears after the file is opened. The actual message in the\r\nmessage bar will vary depending on the computer\u2019s settings and installed add-ins. ",(0,a.jsx)(s.A,{parentDocId:"107",figKey:"enable-macros"})," displays examples of different wordings that may appear in the message bar."]}),"\n",(0,a.jsx)(r.A,{parentDocId:"107",docId:"03-general-overview.mdx",figKey:"enable-macros",src:"/figures/toolbox-technical-manuals/filter-evaluation-continuation/figure1.png",alt:"Security warning message bars with the 'Enable Content' option to enable macros",caption:"Security warning message bars with the 'Enable Content' option to enable macros."}),"\n",(0,a.jsx)(t.h2,{id:"organization",children:"Organization"}),"\n",(0,a.jsx)(t.p,{children:"Although the toolbox does not provide a calculation cover sheet, adding one is strongly recommended. A calculation cover sheet captures project\r\ninformation, a description and purpose of the calculation, the assumptions for critical input parameters, a summary of the major conclusion and\r\nresults, and a revision history."}),"\n",(0,a.jsx)(t.p,{children:"Each toolbox has a similar appearance and organizational structure:"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:"The first worksheet, About, summarizes the purpose of the toolbox and gives contact information for the RMC software development team."}),"\n",(0,a.jsx)(t.li,{children:"The second worksheet, Terms and Conditions, contains the terms and conditions for use of the toolbox (IWR software)."}),"\n",(0,a.jsxs)(t.li,{children:["The third worksheet, Version History, contains the revision history. Semantic versioning is used in the format of MAJOR.MINOR.PATCH:","\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:"MAJOR - significant worksheet changes not compatible with previous versions."}),"\n",(0,a.jsx)(t.li,{children:"MINOR - additional features or enhancements that do not fundamentally change the calculations."}),"\n",(0,a.jsx)(t.li,{children:"PATCH - backward-compatible bug fixes."}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(t.li,{children:"The fourth worksheet, References, lists the references cited for each calculation worksheet."}),"\n"]}),"\n",(0,a.jsx)(t.p,{children:"The workbook and worksheets are not protected to prevent unwanted changes. However, because the toolbox has user-defined functions (UDFs) and\r\nsubroutines in Visual Basic, you cannot directly copy worksheets to another workbook without potentially losing functionality. A note in a bold\r\nred font at the upper right margin indicates if the selected worksheet includes such features."}),"\n",(0,a.jsxs)(t.p,{children:["At the top of each calculation worksheet, input information for the preparer and checker for quality control (QC) documentation and the calculation\r\ntitle in case multiple copies of the worksheet are created for different analysis scenarios (",(0,a.jsx)(s.A,{parentDocId:"107",figKey:"heading"}),").\r\nThe footer of each calculation worksheet contains the versionnumber,which can be cross-referenced with the revision history on the third worksheet."]}),"\n",(0,a.jsx)(r.A,{parentDocId:"107",docId:"03-general-overview.mdx",figKey:"heading",src:"/figures/toolbox-technical-manuals/filter-evaluation-continuation/figure2.png",alt:"Calculation worksheet heading",caption:"Calculation worksheet heading."}),"\n",(0,a.jsx)(t.p,{children:"User-specified input includes values and selections from drop-down lists. User input cells are light yellow, and these cells are unprotected.\r\nWhen cells use drop-down lists, a note in blue font in the right margin of the row alerts the user to use the drop-down list. Conditional formatting\r\napplies a gray background to cells that are not based on a user selection. When a user-specified value or calculated value is outside of acceptable\r\nranges, the cell is orange to indicate caution to the user."}),"\n",(0,a.jsx)(t.p,{children:"All units for user-specified input values are clearly labeled. Most user-specified input values use English units. However, values may be in metric\r\nwhere metric units are more common in practice (e.g., particle size in millimeters or permeability in centimeters per second). The toolbox may convert\r\nEnglish units to metric units to perform some calculations or if required for a specific formula based on the reference material for the equation."}),"\n",(0,a.jsxs)(t.p,{children:["If the calculation worksheet is a function of headwater level, up to seven headwater and tailwater levels may be specified at the top of the worksheet.\r\nTailwater may be required to calculate the net hydraulic head and hydraulic gradient. Specify the elevation datum by selecting one of three options\r\nfrom the drop-down list: ft-NAVD88, ft-NGVD29, and Other. The two datum selections include English units of length (feet). If Other is selected, provide\r\na user-specified datum along with feet (e.g., ft-MSL [Mean Sea Level]). ",(0,a.jsx)(s.A,{parentDocId:"107",figKey:"NAVD88"}),", ",(0,a.jsx)(s.A,{parentDocId:"107",figKey:"NGVD29"}),", and ",(0,a.jsx)(s.A,{parentDocId:"107",figKey:"datum"})," illustrate\r\nthe three possible scenarios."]}),"\n",(0,a.jsx)(r.A,{parentDocId:"107",docId:"03-general-overview.mdx",figKey:"NAVD88",src:"/figures/toolbox-technical-manuals/filter-evaluation-continuation/figure3.png",alt:"Headwater and tailwater input: NAVD88",caption:"Headwater and tailwater input: NAVD88."}),"\n",(0,a.jsx)(r.A,{parentDocId:"107",docId:"03-general-overview.mdx",figKey:"NGVD29",src:"/figures/toolbox-technical-manuals/filter-evaluation-continuation/figure4.png",alt:"Headwater and tailwater input: NGVD29",caption:"Headwater and tailwater input: NGVD29."}),"\n",(0,a.jsx)(r.A,{parentDocId:"107",docId:"03-general-overview.mdx",figKey:"datum",src:"/figures/toolbox-technical-manuals/filter-evaluation-continuation/figure5.png",alt:"Headwater and tailwater input: User-specified datum",caption:"Headwater and tailwater input: User-specified datum."}),"\n",(0,a.jsxs)(t.p,{children:["Most calculation worksheets break down complex analysis into computational steps following a logical sequence (",(0,a.jsx)(s.A,{parentDocId:"107",figKey:"step-banner"}),"). Some simpler\r\nworksheets do not have steps. Generally, different methodologies are unique worksheets. Some worksheets may include multiple methodologies, which\r\nare labeled as options (",(0,a.jsx)(s.A,{parentDocId:"107",figKey:"option-banner"}),")."]}),"\n",(0,a.jsx)(r.A,{parentDocId:"107",docId:"03-general-overview.mdx",figKey:"step-banner",src:"/figures/toolbox-technical-manuals/filter-evaluation-continuation/figure6.png",alt:"Example of step banner",caption:"Example of step banner."}),"\n",(0,a.jsx)(r.A,{parentDocId:"107",docId:"03-general-overview.mdx",figKey:"option-banner",src:"/figures/toolbox-technical-manuals/filter-evaluation-continuation/figure7.png",alt:"Example of option banner",caption:"Example of option banner."}),"\n",(0,a.jsxs)(t.p,{children:["Some calculation worksheets can perform either a deterministic or probabilistic analysis. Although not required to perform a probabilistic\r\nanalysis, Palisade ",(0,a.jsx)(t.code,{children:"@RISK"})," software (standalone version or as part of the Palisade DecisionTools Suite) can customize the probabilistic analysis.\r\nA note appears in a bold red font at the upper right-hand margin of a calculation worksheet indicating if this feature is included with the toolbox."]}),"\n",(0,a.jsx)(t.p,{children:"User notes generally appear in the right margin of each calculation worksheet. Some notes are in blue or red font for heightened awareness. These\r\nnotes include references to source materials for equations, figures, tables, pages, etc. If the RMC modified the source material, the reference\r\ncitation says \u201cadapted from\u201d instead of \u201cfrom.\u201d"}),"\n",(0,a.jsx)(t.p,{children:"Tabular and/or graphical summaries are generally the primary output of the toolbox. The UDFs in the PlotScale module change the minimum and maximum\r\nvalues of the x-axis and y-axis for charts. If the calculation worksheet is a function of headwater level, you can define up to five headwater levels\r\nof interest and plot them as vertical reference lines. By selecting the chart and then selecting the Filter icon to display the filter pane, you can\r\nchoose which data series to display. This is useful when computing the results from multiple methodologies, but not all are applicable or desired to display."})]})}function p(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(f,{...e})}):f(e)}},3900:(e,t,n)=>{n.d(t,{A:()=>s});var o=n(6540),a=n(6916),i=n(6347),r=n(4848);const s=()=>{const[e,t]=(0,o.useState)([]),n=(0,i.zy)();if((0,o.useEffect)((()=>{const e=()=>{const e=(0,a.h)(n.pathname);t(e)};e();const o=()=>{e()};return window.addEventListener("citationsUpdated",o),()=>{window.removeEventListener("citationsUpdated",o)}}),[n.pathname]),console.log("# of citations: ",e.length),0===e.length)return null;const s=e=>{const{author:t,year:n,title:o,journal:a,booktitle:i,report:s,manual:l,institution:c,organization:d,location:u,volume:h,edition:f,pages:p,doi:m,url:g,publisher:w}=e;return(0,r.jsxs)(r.Fragment,{children:[(x=t,Array.isArray(x)?x.length>1?x.slice(0,-1).join(", ")+" & "+x[x.length-1]:x[0]:x)," (",n,"). ",(0,r.jsx)("em",{children:o}),".",a&&` ${a}`,i&&` In ${i}`,d&&` (${d})`,u&&`, ${u}`,h&&`, Vol. ${h}`,f&&`(${f})`,p&&`, pp. ${p}`,w&&` ${w}`,c&&` ${c}`,s&&` ${s}`,l&&` ${l}`,m&&(0,r.jsxs)(r.Fragment,{children:[" ",(0,r.jsxs)("a",{href:`https://doi.org/${m}`,target:"_blank",rel:"noopener noreferrer",children:["https://doi.org/",m]})]}),g&&(0,r.jsxs)(r.Fragment,{children:[" ",(0,r.jsx)("a",{href:g,target:"_blank",rel:"noopener noreferrer",children:g})]})]});var x};return(0,r.jsx)("div",{className:"citation-footnote",children:(0,r.jsx)("ol",{children:e.sort(((e,t)=>e.number-t.number)).map((e=>(0,r.jsx)("li",{value:e.number,id:`footnote-${e.citationKey}`,children:s(e)},e.citationKey)))})})}},4577:(e,t,n)=>{n.d(t,{A:()=>i});var o=n(6540),a=n(4848);const i=e=>{let{parentDocId:t,figKey:n,src:i,alt:r,caption:s}=e;const[l,c]=(0,o.useState)(null);return(0,o.useEffect)((()=>{(async()=>{try{const e=`/counters/${t.replace(/\//g,"-")}.json`,o=await fetch(e);if(!o.ok)throw new Error(`Failed to load ${e}`);const a=await o.json();let i=null;Object.keys(a).forEach((e=>{a[e]?.figures?.[n]&&(i=a[e].figures[n])})),i?c(i):console.warn(`Figure key "${n}" not found`)}catch(e){console.error("Error loading counters:",e)}})()}),[t,n]),l?(0,a.jsxs)("figure",{className:"figure-container",children:[(0,a.jsx)("img",{src:i,alt:r,className:"figure-image"}),(0,a.jsxs)("figcaption",{className:"figure-caption",children:["Figure ",l.figNumber,": ",s]})]}):(0,a.jsx)("span",{children:"Loading..."})}},6916:(e,t,n)=>{n.d(t,{A:()=>l,h:()=>s});var o=n(6540),a=n(6347),i=n(4848);const r=new Map,s=e=>Array.from(r.get(e)?.values()||[]),l=e=>{let{citationKey:t,bibFile:n}=e;const[s,l]=(0,o.useState)("?"),c=(0,a.zy)();return(0,o.useEffect)((()=>{(async()=>{try{const e=await fetch(n),o=(await e.json()).sort(((e,t)=>{const n=Array.isArray(e.author)?e.author[0]:e.author,o=Array.isArray(t.author)?t.author[0]:t.author;return n.localeCompare(o)})),a=o.findIndex((e=>e.citationKey===t));if(-1!==a){const e=a+1;l(e),r.has(c.pathname)||r.set(c.pathname,new Map);r.get(c.pathname).set(t,{...o[a],number:e}),window.dispatchEvent(new Event("citationsUpdated"))}}catch(e){console.error("Error fetching bibliography:",e)}})()}),[t,n,c.pathname]),(0,i.jsx)("span",{className:"citation-reference",children:(0,i.jsxs)("sup",{children:["[",s,"]"]})})}},8453:(e,t,n)=>{n.d(t,{R:()=>r,x:()=>s});var o=n(6540);const a={},i=o.createContext(a);function r(e){const t=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),o.createElement(i.Provider,{value:t},e.children)}},8807:(e,t,n)=>{n.d(t,{A:()=>r});n(6540);var o=n(4848);const a=e=>{let{reportName:t,pdfFilename:n}=e;return(0,o.jsx)("button",{className:"download-pdf-button",onClick:()=>{const e=`/pdfs/${t}/${n}`,o=document.createElement("a");o.href=e,o.download=n,o.click(),console.log("Downloading PDF from:",e)},children:"\u2193 PDF"})};var i=n(6289);const r=e=>{let{link:t,linkTitle:n,reportName:r,pdfFilename:s}=e;return"none"===t?(0,o.jsx)("div",{className:"nav-and-print-container",children:(0,o.jsx)("div",{className:"print-to-pdf-container",children:(0,o.jsx)(a,{reportName:r,pdfFilename:s})})}):(0,o.jsxs)("div",{className:"nav-and-print-container",children:[(0,o.jsx)("div",{className:"nav-link",children:(0,o.jsxs)(i.A,{to:`/${t}`,children:["\u2190 ",n]})}),(0,o.jsx)("div",{className:"print-to-pdf-container",children:(0,o.jsx)(a,{reportName:r,pdfFilename:s})})]})}}}]);