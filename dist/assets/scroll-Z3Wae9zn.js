import{bv as p,ay as n,aA as u}from"./index-DJ7OPhWL.js";const m=(t="")=>t.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d"),v=t=>p(t),h=(t,o)=>{if(!n)return!1;const e={undefined:"overflow",true:"overflow-y",false:"overflow-x"}[String(o)],l=u(t,e);return["scroll","auto","overlay"].some(r=>l.includes(r))},y=(t,o)=>{if(!n)return;let e=t;for(;e;){if([window,document,document.documentElement].includes(e))return window;if(h(e,o))return e;e=e.parentNode}return e};let i;const g=t=>{var o;if(!n)return 0;if(i!==void 0)return i;const e=document.createElement("div");e.className=`${t}-scrollbar__wrap`,e.style.visibility="hidden",e.style.width="100px",e.style.position="absolute",e.style.top="-9999px",document.body.appendChild(e);const l=e.offsetWidth;e.style.overflow="scroll";const r=document.createElement("div");r.style.width="100%",e.appendChild(r);const s=r.offsetWidth;return(o=e.parentNode)==null||o.removeChild(e),i=l-s,i};function S(t,o){if(!n)return;if(!o){t.scrollTop=0;return}const e=[];let l=o.offsetParent;for(;l!==null&&t!==l&&t.contains(l);)e.push(l),l=l.offsetParent;const r=o.offsetTop+e.reduce((f,d)=>f+d.offsetTop,0),s=r+o.offsetHeight,c=t.scrollTop,a=c+t.clientHeight;r<c?t.scrollTop=r:s>a&&(t.scrollTop=s-t.clientHeight)}export{g as a,v as c,m as e,y as g,S as s};
