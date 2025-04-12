"use strict";(self.webpackChunkrmc_software_documentation=self.webpackChunkrmc_software_documentation||[]).push([[7356],{4193:(e,n,o)=>{o.d(n,{A:()=>l});o(6540);var t=o(9030),r=o(6289),i=o(4848);const s=e=>{let{link:n,linkTitle:o}=e;return(0,i.jsx)("div",{className:"nav-and-print-container",children:(0,i.jsx)("div",{className:"nav-link",children:(0,i.jsxs)(r.A,{to:`${(0,t.Ay)(n)}`,children:["\u2190 ",o]})})})};var a=o(4408);const l=e=>{let{link:n,linkTitle:o,document:t}=e;return(0,i.jsxs)("div",{className:"nav-container",children:[(0,i.jsx)("div",{className:"nav-link-container",children:(0,i.jsx)(s,{link:n,linkTitle:o})}),(0,i.jsx)("div",{className:"version-container",children:(0,i.jsx)(a.A,{document:t})})]})}},4408:(e,n,o)=>{o.d(n,{A:()=>s});var t=o(6540),r=o(6347),i=o(4848);const s=e=>{let{document:n}=e;const o=(0,r.W6)(),s=(0,r.zy)(),[a,l]=(0,t.useState)([]),[c,d]=(0,t.useState)("");(0,t.useEffect)((()=>{(async()=>{try{const e=await fetch("/RMC-Software-Documentation/versions/versionList.json"),o=(await e.json())[n]||[];l(o);const t=(()=>{const e=s.pathname.match(/\/(v\d+\.\d+)\//);return e?e[1]:""})();t&&o.includes(t)&&d(t)}catch(e){console.error("Error fetching version list:",e)}})()}),[n,s.pathname]);return(0,i.jsx)("div",{className:"version-selector-container",children:a.length>0?(0,i.jsx)("select",{className:"version-selector-dropdown",value:c,onChange:e=>{const n=e.target.value;d(n);const t=s.pathname.replace(/\/v\d+\.\d+\//,`/${n}/`);t!==s.pathname&&o.push(t)},children:a.map((e=>(0,i.jsx)("option",{value:e,children:e},e)))}):(0,i.jsx)("p",{className:"loading-message",children:"Loading versions..."})})}},4765:(e,n,o)=>{o.d(n,{A:()=>r});o(6540);var t=o(4848);const r=e=>{let{metadata:n}=e;if(!n)return null;const{reportDate:o,reportType:r,reportTitle:i,reportSubTitle:s,reportAuthors:a,reportAbstract:l,reportSubjectTerms:c,responsiblePersonName:d,responsiblePersonNumber:m}=n,u=e=>({__html:e}),p=[o,r,i,s,Array.isArray(a)?a.join(", "):a,l,Array.isArray(c)?c.join(", "):c,`${d||""}${m?` | ${m}`:""}`];return(0,t.jsx)("div",{className:"table-container-metadata",children:(0,t.jsx)("table",{className:"static-table-metadata",children:(0,t.jsx)("tbody",{children:["Report Date","Type","Title","Subtitle","Author(s)","Abstract","Subject Terms","Responsible Person"].map(((e,n)=>(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{dangerouslySetInnerHTML:u(e)}),(0,t.jsx)("td",{dangerouslySetInnerHTML:u(p[n]||"")})]},n)))})})})}},7970:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>d,contentTitle:()=>c,default:()=>p,frontMatter:()=>l,metadata:()=>t,toc:()=>m});const t=JSON.parse('{"id":"toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/document-info","title":"Document Info","description":"<NavContainer","source":"@site/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/00-document-info.mdx","sourceDirName":"toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0","slug":"/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/document-info","permalink":"/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/document-info","draft":false,"unlisted":false,"tags":[],"version":"current","lastUpdatedAt":1744420475000,"sidebarPosition":0,"frontMatter":{"title":"Document Info","reportDate":"November 2023","reportType":"Computer Program Document","reportTitle":"RMC Backward Erosion Piping (Progression) Toolbox","reportSubTitle":"RMC Internal Erosion Suite","reportAuthors":["Tim O\'Leary, Risk Management Center"],"reportAbstract":"The spreadsheet tools contained in this toolbox deterministically and probabilistically assess the likelihood of backward erosion piping progression (hydraulic condition) using the adjusted Schmertmann (2000) method and the adjusted calculation rule of Sellmeijer et al. (2011) in addition to creep ratio methods of Bligh (1910) and Lane (1935).","reportSubjectTerms":["Internal erosion","backward erosion piping","Schmertmann","Sellmeijer","Bligh","Lane","creep ratio"],"responsiblePersonName":"Tim O\'Leary","responsiblePersonNumber":"502-315-6599"},"sidebar":"bepProgressionSidebar_v1_0","next":{"title":"Version History","permalink":"/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/version-history"}}');var r=o(4848),i=o(8453),s=o(4193),a=o(4765);o(6289),o(9030);const l={title:"Document Info",reportDate:"November 2023",reportType:"Computer Program Document",reportTitle:"RMC Backward Erosion Piping (Progression) Toolbox",reportSubTitle:"RMC Internal Erosion Suite",reportAuthors:["Tim O'Leary, Risk Management Center"],reportAbstract:"The spreadsheet tools contained in this toolbox deterministically and probabilistically assess the likelihood of backward erosion piping progression (hydraulic condition) using the adjusted Schmertmann (2000) method and the adjusted calculation rule of Sellmeijer et al. (2011) in addition to creep ratio methods of Bligh (1910) and Lane (1935).",reportSubjectTerms:["Internal erosion","backward erosion piping","Schmertmann","Sellmeijer","Bligh","Lane","creep ratio"],responsiblePersonName:"Tim O'Leary",responsiblePersonNumber:"502-315-6599"},c="Document Information",d={},m=[];function u(e){const n={h1:"h1",header:"header",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.A,{link:"/toolboxes/internal-erosion-suite",linkTitle:"Internal Erosion Suite",document:"toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression"}),"\n",(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"document-information",children:"Document Information"})}),"\n",(0,r.jsx)(a.A,{metadata:l})]})}function p(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(u,{...e})}):u(e)}},8453:(e,n,o)=>{o.d(n,{R:()=>s,x:()=>a});var t=o(6540);const r={},i=t.createContext(r);function s(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);