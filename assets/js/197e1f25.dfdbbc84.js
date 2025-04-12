"use strict";(self.webpackChunkrmc_software_documentation=self.webpackChunkrmc_software_documentation||[]).push([[5591],{418:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>l,default:()=>u,frontMatter:()=>c,metadata:()=>i,toc:()=>h});const i=JSON.parse('{"id":"toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1/version-history","title":"Version History","description":"<NavContainer","source":"@site/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1/00-version-history.mdx","sourceDirName":"toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1","slug":"/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1/version-history","permalink":"/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1/version-history","draft":false,"unlisted":false,"tags":[],"version":"current","lastUpdatedAt":1744420475000,"sidebarPosition":0,"frontMatter":{"title":"Version History"},"sidebar":"bepProgressionSidebar_v1_1","previous":{"title":"Document Info","permalink":"/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1/document-info"},"next":{"title":"Preface","permalink":"/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1/preface"}}');var o=t(4848),s=t(8453),r=t(4193),a=t(7749);t(6289);const c={title:"Version History"},l="Version History",d={},h=[];function p(e){const n={h1:"h1",header:"header",...(0,s.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(r.A,{link:"/toolboxes/internal-erosion-suite",linkTitle:"Internal Erosion Suite",document:"toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression"}),"\n",(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"version-history",children:"Version History"})}),"\n",(0,o.jsx)(a.A,{versions:["1.0","1.1"],dates:["November 2023","April 2025"],descriptions:["Initial release.","Added Appendix B - Common Applications."],modifiedBy:["Tim O'Leary","Adam Gohs"],reviewedBy:["Damon Amlung","Tim O'Leary"],approvedBy:["Nate Snorteland","Tim O'Leary"]})]})}function u(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(p,{...e})}):p(e)}},4193:(e,n,t)=>{t.d(n,{A:()=>c});t(6540);var i=t(9030),o=t(6289),s=t(4848);const r=e=>{let{link:n,linkTitle:t}=e;return(0,s.jsx)("div",{className:"nav-and-print-container",children:(0,s.jsx)("div",{className:"nav-link",children:(0,s.jsxs)(o.A,{to:`${(0,i.Ay)(n)}`,children:["\u2190 ",t]})})})};var a=t(4408);const c=e=>{let{link:n,linkTitle:t,document:i}=e;return(0,s.jsxs)("div",{className:"nav-container",children:[(0,s.jsx)("div",{className:"nav-link-container",children:(0,s.jsx)(r,{link:n,linkTitle:t})}),(0,s.jsx)("div",{className:"version-container",children:(0,s.jsx)(a.A,{document:i})})]})}},4408:(e,n,t)=>{t.d(n,{A:()=>r});var i=t(6540),o=t(6347),s=t(4848);const r=e=>{let{document:n}=e;const t=(0,o.W6)(),r=(0,o.zy)(),[a,c]=(0,i.useState)([]),[l,d]=(0,i.useState)("");(0,i.useEffect)((()=>{(async()=>{try{const e=await fetch("/RMC-Software-Documentation/versions/versionList.json"),t=(await e.json())[n]||[];c(t);const i=(()=>{const e=r.pathname.match(/\/(v\d+\.\d+)\//);return e?e[1]:""})();i&&t.includes(i)&&d(i)}catch(e){console.error("Error fetching version list:",e)}})()}),[n,r.pathname]);return(0,s.jsx)("div",{className:"version-selector-container",children:a.length>0?(0,s.jsx)("select",{className:"version-selector-dropdown",value:l,onChange:e=>{const n=e.target.value;d(n);const i=r.pathname.replace(/\/v\d+\.\d+\//,`/${n}/`);i!==r.pathname&&t.push(i)},children:a.map((e=>(0,s.jsx)("option",{value:e,children:e},e)))}):(0,s.jsx)("p",{className:"loading-message",children:"Loading versions..."})})}},7749:(e,n,t)=>{t.d(n,{A:()=>o});t(6540);var i=t(4848);const o=e=>{let{versions:n=[],dates:t=[],descriptions:o=[],modifiedBy:s=[],reviewedBy:r=[],approvedBy:a=[]}=e;const c=Math.max(n.length,t.length,o.length,s.length,r.length,a.length);return(0,i.jsx)("div",{className:"table-container-version-history",children:(0,i.jsxs)("table",{className:"static-table-version-history",children:[(0,i.jsx)("thead",{children:(0,i.jsxs)("tr",{children:[(0,i.jsx)("th",{children:"Version"}),(0,i.jsx)("th",{children:"Date"}),(0,i.jsx)("th",{children:"Description"}),(0,i.jsx)("th",{children:"Modified By"}),(0,i.jsx)("th",{children:"Reviewed By"}),(0,i.jsx)("th",{children:"Approved By"})]})}),(0,i.jsx)("tbody",{children:Array.from({length:c}).map(((e,c)=>(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:n[c]||""}),(0,i.jsx)("td",{children:t[c]||""}),(0,i.jsx)("td",{children:o[c]||""}),(0,i.jsx)("td",{children:s[c]||""}),(0,i.jsx)("td",{children:r[c]||""}),(0,i.jsx)("td",{children:a[c]||""})]},c)))})]})})}},8453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>a});var i=t(6540);const o={},s=i.createContext(o);function r(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);