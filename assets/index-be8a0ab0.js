var Be=Object.defineProperty;var Ke=(e,n,t)=>n in e?Be(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t;var fe=(e,n,t)=>(Ke(e,typeof n!="symbol"?n+"":n,t),t);(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function t(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=t(r);fetch(r.href,i)}})();function y(){}const Me=e=>e;function xe(e,n){for(const t in n)e[t]=n[t];return e}function je(e){return e()}function ke(){return Object.create(null)}function X(e){e.forEach(je)}function ve(e){return typeof e=="function"}function q(e,n){return e!=e?n==n:e!==n||e&&typeof e=="object"||typeof e=="function"}let ie;function U(e,n){return e===n?!0:(ie||(ie=document.createElement("a")),ie.href=n,e===ie.href)}function Ge(e){return Object.keys(e).length===0}function Ye(e,...n){if(e==null){for(const s of n)s(void 0);return y}const t=e.subscribe(...n);return t.unsubscribe?()=>t.unsubscribe():t}function L(e,n,t){e.$$.on_destroy.push(Ye(n,t))}function $e(e){const n=typeof e=="string"&&e.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);return n?[parseFloat(n[1]),n[2]||"px"]:[e,"px"]}const Ne=typeof window<"u";let Le=Ne?()=>window.performance.now():()=>Date.now(),_e=Ne?e=>requestAnimationFrame(e):y;const G=new Set;function Re(e){G.forEach(n=>{n.c(e)||(G.delete(n),n.f())}),G.size!==0&&_e(Re)}function ze(e){let n;return G.size===0&&_e(Re),{promise:new Promise(t=>{G.add(n={c:e,f:t})}),abort(){G.delete(n)}}}function a(e,n){e.appendChild(n)}function He(e){if(!e)return document;const n=e.getRootNode?e.getRootNode():e.ownerDocument;return n&&n.host?n:e.ownerDocument}function Je(e){const n=p("style");return n.textContent="/* empty */",Xe(He(e),n),n.sheet}function Xe(e,n){return a(e.head||e,n),n.sheet}function E(e,n,t){e.insertBefore(n,t||null)}function T(e){e.parentNode&&e.parentNode.removeChild(e)}function Qe(e,n){for(let t=0;t<e.length;t+=1)e[t]&&e[t].d(n)}function p(e){return document.createElement(e)}function $(e){return document.createTextNode(e)}function _(){return $(" ")}function Z(e,n,t,s){return e.addEventListener(n,t,s),()=>e.removeEventListener(n,t,s)}function o(e,n,t){t==null?e.removeAttribute(n):e.getAttribute(n)!==t&&e.setAttribute(n,t)}function Ze(e){return Array.from(e.childNodes)}function I(e,n){n=""+n,e.data!==n&&(e.data=n)}function S(e,n,t,s){t==null?e.style.removeProperty(n):e.style.setProperty(n,t,s?"important":"")}function N(e,n,t){e.classList.toggle(n,!!t)}function et(e,n,{bubbles:t=!1,cancelable:s=!1}={}){return new CustomEvent(e,{detail:n,bubbles:t,cancelable:s})}function Se(e,n){return new e(n)}const oe=new Map;let ae=0;function tt(e){let n=5381,t=e.length;for(;t--;)n=(n<<5)-n^e.charCodeAt(t);return n>>>0}function nt(e,n){const t={stylesheet:Je(n),rules:{}};return oe.set(e,t),t}function st(e,n,t,s,r,i,c,l=0){const f=16.666/s;let u=`{
`;for(let x=0;x<=1;x+=f){const k=n+(t-n)*i(x);u+=x*100+`%{${c(k,1-k)}}
`}const d=u+`100% {${c(t,1-t)}}
}`,h=`__svelte_${tt(d)}_${l}`,m=He(e),{stylesheet:b,rules:g}=oe.get(m)||nt(m,e);g[h]||(g[h]=!0,b.insertRule(`@keyframes ${h} ${d}`,b.cssRules.length));const v=e.style.animation||"";return e.style.animation=`${v?`${v}, `:""}${h} ${s}ms linear ${r}ms 1 both`,ae+=1,h}function Te(e,n){const t=(e.style.animation||"").split(", "),s=t.filter(n?i=>i.indexOf(n)<0:i=>i.indexOf("__svelte")===-1),r=t.length-s.length;r&&(e.style.animation=s.join(", "),ae-=r,ae||rt())}function rt(){_e(()=>{ae||(oe.forEach(e=>{const{ownerNode:n}=e.stylesheet;n&&T(n)}),oe.clear())})}let te;function ee(e){te=e}function De(){if(!te)throw new Error("Function called outside component initialization");return te}function M(e){De().$$.on_mount.push(e)}function re(e){De().$$.on_destroy.push(e)}const K=[],Ce=[];let Y=[];const qe=[],it=Promise.resolve();let he=!1;function lt(){he||(he=!0,it.then(Fe))}function ne(e){Y.push(e)}const de=new Set;let W=0;function Fe(){if(W!==0)return;const e=te;do{try{for(;W<K.length;){const n=K[W];W++,ee(n),ot(n.$$)}}catch(n){throw K.length=0,W=0,n}for(ee(null),K.length=0,W=0;Ce.length;)Ce.pop()();for(let n=0;n<Y.length;n+=1){const t=Y[n];de.has(t)||(de.add(t),t())}Y.length=0}while(K.length);for(;qe.length;)qe.pop()();he=!1,de.clear(),ee(e)}function ot(e){if(e.fragment!==null){e.update(),X(e.before_update);const n=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,n),e.after_update.forEach(ne)}}function at(e){const n=[],t=[];Y.forEach(s=>e.indexOf(s)===-1?n.push(s):t.push(s)),t.forEach(s=>s()),Y=n}let Q;function ct(){return Q||(Q=Promise.resolve(),Q.then(()=>{Q=null})),Q}function Ee(e,n,t){e.dispatchEvent(et(`${n?"intro":"outro"}${t}`))}const le=new Set;let F;function Ue(){F={r:0,c:[],p:F}}function We(){F.r||X(F.c),F=F.p}function J(e,n){e&&e.i&&(le.delete(e),e.i(n))}function se(e,n,t,s){if(e&&e.o){if(le.has(e))return;le.add(e),F.c.push(()=>{le.delete(e),s&&(t&&e.d(1),s())}),e.o(n)}else s&&s()}const ut={duration:0};function ft(e,n,t){const s={direction:"in"};let r=n(e,t,s),i=!1,c,l,f=0;function u(){c&&Te(e,c)}function d(){const{delay:m=0,duration:b=300,easing:g=Me,tick:v=y,css:x}=r||ut;x&&(c=st(e,0,1,b,m,g,x,f++)),v(0,1);const k=Le()+m,z=k+b;l&&l.abort(),i=!0,ne(()=>Ee(e,!0,"start")),l=ze(C=>{if(i){if(C>=z)return v(1,0),Ee(e,!0,"end"),u(),i=!1;if(C>=k){const w=g((C-k)/b);v(w,1-w)}}return i})}let h=!1;return{start(){h||(h=!0,Te(e),ve(r)?(r=r(s),ct().then(d)):d())},invalidate(){h=!1},end(){i&&(u(),i=!1)}}}function Ae(e){return(e==null?void 0:e.length)!==void 0?e:Array.from(e)}function be(e){e&&e.c()}function ce(e,n,t){const{fragment:s,after_update:r}=e.$$;s&&s.m(n,t),ne(()=>{const i=e.$$.on_mount.map(je).filter(ve);e.$$.on_destroy?e.$$.on_destroy.push(...i):X(i),e.$$.on_mount=[]}),r.forEach(ne)}function ue(e,n){const t=e.$$;t.fragment!==null&&(at(t.after_update),X(t.on_destroy),t.fragment&&t.fragment.d(n),t.on_destroy=t.fragment=null,t.ctx=[])}function dt(e,n){e.$$.dirty[0]===-1&&(K.push(e),lt(),e.$$.dirty.fill(0)),e.$$.dirty[n/31|0]|=1<<n%31}function O(e,n,t,s,r,i,c,l=[-1]){const f=te;ee(e);const u=e.$$={fragment:null,ctx:[],props:i,update:y,not_equal:r,bound:ke(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(f?f.$$.context:[])),callbacks:ke(),dirty:l,skip_bound:!1,root:n.target||f.$$.root};c&&c(u.root);let d=!1;if(u.ctx=t?t(e,n.props||{},(h,m,...b)=>{const g=b.length?b[0]:m;return u.ctx&&r(u.ctx[h],u.ctx[h]=g)&&(!u.skip_bound&&u.bound[h]&&u.bound[h](g),d&&dt(e,h)),m}):[],u.update(),d=!0,X(u.before_update),u.fragment=s?s(u.ctx):!1,n.target){if(n.hydrate){const h=Ze(n.target);u.fragment&&u.fragment.l(h),h.forEach(T)}else u.fragment&&u.fragment.c();n.intro&&J(e.$$.fragment),ce(e,n.target,n.anchor),Fe()}ee(f)}class V{constructor(){fe(this,"$$");fe(this,"$$set")}$destroy(){ue(this,1),this.$destroy=y}$on(n,t){if(!ve(t))return y;const s=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return s.push(t),()=>{const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}$set(n){this.$$set&&!Ge(n)&&(this.$$.skip_bound=!0,this.$$set(n),this.$$.skip_bound=!1)}}const pt="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(pt);const B=[];function ye(e,n=y){let t;const s=new Set;function r(l){if(q(e,l)&&(e=l,t)){const f=!B.length;for(const u of s)u[1](),B.push(u,e);if(f){for(let u=0;u<B.length;u+=2)B[u][0](B[u+1]);B.length=0}}}function i(l){r(l(e))}function c(l,f=y){const u=[l,f];return s.add(u),s.size===1&&(t=n(r,i)||y),l(e),()=>{s.delete(u),s.size===0&&t&&(t(),t=null)}}return{set:r,update:i,subscribe:c}}const D=ye(["","","",""]),H=ye(0);function mt(e){let n,t;return{c(){n=p("span"),t=$(e[0]),o(n,"id","flytext"),o(n,"class","svelte-1wd2v0g")},m(s,r){E(s,n,r),a(n,t)},p(s,[r]){r&1&&I(t,s[0])},i:y,o:y,d(s){s&&T(n)}}}function ht(e){let n=[e.length];for(let t=0;t<e.length;t++)n[t]=t;return n.sort(()=>Math.random()-.5),n}function bt(e,n,t){let s=["             ","Mathematician","Roboticist   ","Developer    ","Musician     ","Student      ","Human        "],r=s[0],i=s[0],c=0,l=0,f=!1,u=[],d,h;function m(){D.subscribe(b=>{h=b}),D.set([h[0],h[1],h[2],r]),r==s[c]?(r=="Mathematician"&&c==1&&(s.shift(),c=0),i=s[c],c=(c+1)%s.length,u=ht(s[c]),l=0,r=="             "?d=setTimeout(m,10):d=setTimeout(m,3e3)):f?(l==13?t(0,r=r.substring(0,u[l])+s[c][u[l]]):t(0,r=r.substring(0,u[l])+s[c][u[l]]+r.substring(u[l]+1)),l++,f=!1,d=setTimeout(m,55)):i[u[l]]==s[c][u[l]]?(f=!0,setTimeout(m,0)):l==13?(t(0,r=r.substring(0,u[l])+"■"),f=!0,d=setTimeout(m,55)):(t(0,r=r.substring(0,u[l])+"■"+r.substring(u[l]+1)),f=!0,d=setTimeout(m,55))}return M(m),re(()=>clearTimeout(d)),[r]}class gt extends V{constructor(n){super(),O(this,n,bt,mt,q,{})}}let pe,me;function P(e,n,t,s){if(console.log(s),H.subscribe(i=>{me=i}),s!==me)return console.log(s,me),e;e.length!==n.length&&(e.length>n.length?n+=" ".repeat(e.length-n.length):e+=" ".repeat(n.length-e.length)),D.subscribe(i=>{pe=i}),pe[t]=e.trim()+" ",D.set(pe);let r=[];if(e===n)return e.trim();if(e.search("■")===-1){for(let c=0;c<e.length;c++)e[c]!==n[c]&&r.push(c);let i=r[Math.floor(Math.random()*r.length)];setTimeout(P,40,e.substring(0,i)+"■"+(i==e.length-1?"":e.substring(i+1)),n,t,s)}else setTimeout(P,40,e.replace("■",n[e.search("■")]),n,t,s)}function vt(e){let n,t,s,r,i,c,l,f,u,d,h,m;return h=new gt({}),{c(){n=p("main"),t=p("div"),s=p("p"),r=$(e[2]),i=_(),c=p("p"),l=$(e[1]),f=_(),u=p("p"),d=$(e[0]),be(h.$$.fragment),o(s,"id","hi-text"),o(s,"class","svelte-10fmstn"),o(c,"id","name-text"),o(c,"class","svelte-10fmstn"),o(u,"id","sub-name-text"),o(u,"class","svelte-10fmstn"),o(t,"id","title-block"),o(t,"class","svelte-10fmstn")},m(b,g){E(b,n,g),a(n,t),a(t,s),a(s,r),a(t,i),a(t,c),a(c,l),a(t,f),a(t,u),a(u,d),ce(h,u,null),m=!0},p(b,[g]){(!m||g&4)&&I(r,b[2]),(!m||g&2)&&I(l,b[1]),(!m||g&1)&&I(d,b[0])},i(b){m||(J(h.$$.fragment,b),m=!0)},o(b){se(h.$$.fragment,b),m=!1},d(b){b&&T(n),ue(h)}}}function _t(e,n,t){let s,r,i,c=["","","",""];D.subscribe(f=>{t(3,c=f)});let l;return M(()=>{setTimeout(()=>{P(s,"Hi! My name is",0,0),P(r,"Drew Steindl",1,0),P(i,"I'm a ",2,0)})}),re(()=>clearTimeout(l)),e.$$.update=()=>{e.$$.dirty&8&&t(2,s=c[0]),e.$$.dirty&8&&t(1,r=c[1]),e.$$.dirty&8&&t(0,i=c[2])},[i,r,s,c]}class yt extends V{constructor(n){super(),O(this,n,_t,vt,q,{})}}function wt(e){let n,t,s,r,i,c,l,f,u,d,h,m,b;return{c(){n=p("main"),t=p("div"),s=p("p"),r=$(e[3]),i=_(),c=p("p"),l=$(e[2]),f=_(),u=p("p"),d=$(e[1]),h=_(),m=p("p"),b=$(e[0]),o(s,"id","hi-text"),o(s,"class","svelte-8gs5dn"),o(c,"id","name-text"),o(c,"class","svelte-8gs5dn"),o(u,"id","sub-name-text"),o(u,"class","svelte-8gs5dn"),o(m,"id","last-word"),o(m,"class","svelte-8gs5dn"),o(t,"id","title-block"),o(t,"class","svelte-8gs5dn")},m(g,v){E(g,n,v),a(n,t),a(t,s),a(s,r),a(t,i),a(t,c),a(c,l),a(t,f),a(t,u),a(u,d),a(t,h),a(t,m),a(m,b)},p(g,[v]){v&8&&I(r,g[3]),v&4&&I(l,g[2]),v&2&&I(d,g[1]),v&1&&I(b,g[0])},i:y,o:y,d(g){g&&T(n)}}}function xt(e,n,t){let s,r,i,c,l=["","","",""],f;return D.subscribe(u=>{t(4,l=u)}),M(()=>{setTimeout(()=>{P(s,"Scroll Down to view some of my",0,1),P(r,"Projects",1,1),P(i,"Move right to",2,1),P(c,"Experiences",3,1)},10)}),re(()=>clearTimeout(f)),e.$$.update=()=>{e.$$.dirty&16&&t(3,s=l[0]),e.$$.dirty&16&&t(2,r=l[1]),e.$$.dirty&16&&t(1,i=l[2]),e.$$.dirty&16&&t(0,c=l[3])},[c,i,r,s,l]}class kt extends V{constructor(n){super(),O(this,n,xt,wt,q,{})}}function $t(e){let n,t,s,r,i,c,l,f,u,d,h,m,b;return{c(){n=p("main"),t=p("div"),s=p("p"),r=$(e[3]),i=_(),c=p("p"),l=$(e[2]),f=_(),u=p("p"),d=$(e[1]),h=_(),m=p("p"),b=$(e[0]),o(s,"id","hi-text"),o(s,"class","svelte-ta2v34"),o(c,"id","name-text"),o(c,"class","svelte-ta2v34"),o(u,"id","sub-name-text"),o(u,"class","svelte-ta2v34"),o(m,"id","last-word"),o(m,"class","svelte-ta2v34"),o(t,"id","title-block"),o(t,"class","svelte-ta2v34")},m(g,v){E(g,n,v),a(n,t),a(t,s),a(s,r),a(t,i),a(t,c),a(c,l),a(t,f),a(t,u),a(u,d),a(t,h),a(t,m),a(m,b)},p(g,[v]){v&8&&I(r,g[3]),v&4&&I(l,g[2]),v&2&&I(d,g[1]),v&1&&I(b,g[0])},i:y,o:y,d(g){g&&T(n)}}}function St(e,n,t){let s,r,i,c,l=["","","",""],f;D.subscribe(d=>{t(4,l=d)});function u(){P(s,"Go Down to view my",0,2),P(r,"Experiences",1,2),P(i,"Move right to",2,2),P(c,"Contact",3,2)}return M(()=>{setTimeout(()=>{u()},10)}),re(()=>clearTimeout(f)),e.$$.update=()=>{e.$$.dirty&16&&t(3,s=l[0]),e.$$.dirty&16&&t(2,r=l[1]),e.$$.dirty&16&&t(1,i=l[2]),e.$$.dirty&16&&t(0,c=l[3])},[c,i,r,s,l]}class Tt extends V{constructor(n){super(),O(this,n,St,$t,q,{})}}function Ct(e){let n,t,s,r,i,c,l,f,u,d,h,m,b,g,v;return{c(){n=p("main"),t=p("div"),s=p("p"),r=$(e[3]),i=_(),c=p("p"),l=$(e[2]),f=_(),u=p("p"),d=$(e[1]),h=_(),m=p("p"),b=$(e[0]),g=_(),v=p("form"),v.innerHTML='<div class="form-group"><input type="text" name="name" placeholder="Name" class="svelte-1d6fh6o"/> <input type="email" name="email" placeholder="Email" class="svelte-1d6fh6o"/></div> <div class="form-group"><textarea style="height: 8vh;" name="message" placeholder="Message" rows="5" class="svelte-1d6fh6o"></textarea></div> <div id="button-container"><button type="submit" class="svelte-1d6fh6o">Send</button></div>',o(s,"id","hi-text"),o(s,"class","svelte-1d6fh6o"),o(c,"id","name-text"),o(c,"class","svelte-1d6fh6o"),o(u,"id","sub-name-text"),o(u,"class","svelte-1d6fh6o"),o(m,"id","last-word"),o(m,"class","svelte-1d6fh6o"),o(v,"action","https://formspree.io/f/xaygpggk"),o(v,"method","POST"),o(v,"class","svelte-1d6fh6o"),o(t,"id","title-block"),o(t,"class","svelte-1d6fh6o")},m(x,k){E(x,n,k),a(n,t),a(t,s),a(s,r),a(t,i),a(t,c),a(c,l),a(t,f),a(t,u),a(u,d),a(t,h),a(t,m),a(m,b),a(t,g),a(t,v)},p(x,[k]){k&8&&I(r,x[3]),k&4&&I(l,x[2]),k&2&&I(d,x[1]),k&1&&I(b,x[0])},i:y,o:y,d(x){x&&T(n)}}}function qt(e,n,t){let s,r,i,c,l=["","","",""],f;return D.subscribe(u=>{t(4,l=u)}),M(()=>{setTimeout(()=>{P(s,"Send your Pigeon!",0,3),P(r,"Contact",1,3),P(i,"Github",2,3),P(c,"LinkedIn",3,3)},10)}),re(()=>clearTimeout(f)),e.$$.update=()=>{e.$$.dirty&16&&t(3,s=l[0]),e.$$.dirty&16&&t(2,r=l[1]),e.$$.dirty&16&&t(1,i=l[2]),e.$$.dirty&16&&t(0,c=l[3])},[c,i,r,s,l]}class Et extends V{constructor(n){super(),O(this,n,qt,Ct,q,{})}}function Ie(e){return Object.prototype.toString.call(e)==="[object Date]"}function At(e){const n=e-1;return n*n*n+1}function ge(e,n){if(e===n||e!==e)return()=>e;const t=typeof e;if(t!==typeof n||Array.isArray(e)!==Array.isArray(n))throw new Error("Cannot interpolate values of different type");if(Array.isArray(e)){const s=n.map((r,i)=>ge(e[i],r));return r=>s.map(i=>i(r))}if(t==="object"){if(!e||!n)throw new Error("Object cannot be null");if(Ie(e)&&Ie(n)){e=e.getTime(),n=n.getTime();const i=n-e;return c=>new Date(e+c*i)}const s=Object.keys(n),r={};return s.forEach(i=>{r[i]=ge(e[i],n[i])}),i=>{const c={};return s.forEach(l=>{c[l]=r[l](i)}),c}}if(t==="number"){const s=n-e;return r=>e+r*s}throw new Error(`Cannot interpolate ${t} values`)}function R(e,n={}){const t=ye(e);let s,r=e;function i(c,l){if(e==null)return t.set(e=c),Promise.resolve();r=c;let f=s,u=!1,{delay:d=0,duration:h=400,easing:m=Me,interpolate:b=ge}=xe(xe({},n),l);if(h===0)return f&&(f.abort(),f=null),t.set(e=r),Promise.resolve();const g=Le()+d;let v;return s=ze(x=>{if(x<g)return!0;u||(v=b(e,c),typeof h=="function"&&(h=h(e,c)),u=!0),f&&(f.abort(),f=null);const k=x-g;return k>h?(t.set(e=c),!1):(t.set(e=v(m(k/h))),!0)}),s.promise}return{set:i,update:(c,l)=>i(c(r,e),l),subscribe:t.subscribe}}function It(e){let n,t,s,r,i,c,l,f,u,d,h,m,b;return{c(){n=p("main"),t=p("div"),s=p("p"),s.textContent="Mathematics Research",r=_(),i=p("p"),i.textContent="Vassar Summer 2022",c=_(),l=p("p"),f=$("As a fellow at Vassar's URSI, I explored the genus distribution of two bridge knots on a team of five students. We had a successful summer with substantial results, and we presented our work at various conferences, including SUNY New Paltz and Mt. Holyoke. For more information, please see our paper, which we've submitted for publication."),u=_(),d=p("a"),d.innerHTML='<p id="last-word" class="svelte-1bqdt99">View Our Paper</p> <a></a>',h=_(),m=p("iframe"),o(s,"id","hi-text"),o(s,"class","svelte-1bqdt99"),o(i,"id","name-text"),o(i,"class","svelte-1bqdt99"),o(l,"id","sub-name-text"),S(l,"backdrop-filter","blur("+e[0]+"px)"),o(l,"class","svelte-1bqdt99"),o(d,"href","/PaperKnot.pdf"),o(t,"id","title-block"),o(t,"class","svelte-1bqdt99"),o(m,"title","pdf"),o(m,"id","pdf"),U(m.src,b="/PaperKnot.pdf")||o(m,"src",b),S(m,"width","30%"),S(m,"height","75%"),o(m,"frameborder","0"),o(m,"class","svelte-1bqdt99")},m(g,v){E(g,n,v),a(n,t),a(t,s),a(t,r),a(t,i),a(t,c),a(t,l),a(l,f),a(t,u),a(t,d),a(n,h),a(n,m)},p(g,[v]){v&1&&S(l,"backdrop-filter","blur("+g[0]+"px)")},i:y,o:y,d(g){g&&T(n)}}}function Pt(e,n,t){let s,r=R(0,{duration:2e3});return L(e,r,i=>t(0,s=i)),M(()=>{r.set(15)}),[s,r]}class Ot extends V{constructor(n){super(),O(this,n,Pt,It,q,{})}}function Vt(e){let n,t,s,r,i,c,l,f,u,d,h,m,b;return{c(){n=p("main"),t=p("div"),s=p("p"),s.textContent="Humanoid Robotics",r=_(),i=p("p"),i.textContent="Vassar Summer 2023",c=_(),l=p("p"),f=$("Again as an URSI fellow at Vassar, I worked on a team of two on a humanoid robot named Harper. Our job was to develop the hardware and software infrastructure for human-like perception and action. We designed and are implementing a custom control architecture, coordinating vision, language, and motor control systems. We've been working with Nvidia's Jetson AGX Orin, DepthAI, Ros2, MicroRos, Nvidia Riva SDK, Arduino, and more. This experience has become an ongoing project."),u=_(),d=p("a"),d.innerHTML='<p id="last-word" class="svelte-1qbd782">View Our Poster</p>',h=_(),m=p("iframe"),o(s,"id","hi-text"),o(s,"class","svelte-1qbd782"),o(i,"id","name-text"),o(i,"class","svelte-1qbd782"),o(l,"id","sub-name-text"),S(l,"backdrop-filter","blur("+e[0]+"px)"),o(l,"class","svelte-1qbd782"),o(d,"href","/URSI_26_KenLivingston_MichaelFerrante_AndrewJSteindl_flat.pdf"),o(t,"id","title-block"),o(t,"class","svelte-1qbd782"),o(m,"title","video"),o(m,"class","mounted-image svelte-1qbd782"),U(m.src,b="https://www.youtube.com/embed/mwKXxNulNms")||o(m,"src",b),o(m,"frameborder","0"),m.allowFullscreen=!0},m(g,v){E(g,n,v),a(n,t),a(t,s),a(t,r),a(t,i),a(t,c),a(t,l),a(l,f),a(t,u),a(t,d),a(n,h),a(n,m)},p(g,[v]){v&1&&S(l,"backdrop-filter","blur("+g[0]+"px)")},i:y,o:y,d(g){g&&T(n)}}}function Mt(e,n,t){let s,r=R(0,{duration:2e3});return L(e,r,i=>t(0,s=i)),M(()=>{r.set(15)}),[s,r]}class jt extends V{constructor(n){super(),O(this,n,Mt,Vt,q,{})}}function Nt(e,{delay:n=0,duration:t=400,easing:s=At,x:r=0,y:i=0,opacity:c=0}={}){const l=getComputedStyle(e),f=+l.opacity,u=l.transform==="none"?"":l.transform,d=f*(1-c),[h,m]=$e(r),[b,g]=$e(i);return{delay:n,duration:t,easing:s,css:(v,x)=>`
			transform: ${u} translate(${(1-v)*h}${m}, ${(1-v)*b}${g});
			opacity: ${f-d*x}`}}function Lt(e){let n,t,s,r,i,c,l,f;return{c(){n=p("main"),t=p("div"),s=p("p"),s.textContent="Modular Ornithopter",r=_(),i=p("p"),i.textContent="Vassar 2023",c=_(),l=p("p"),f=$("I am currently designing and constructing a biomimetic modular ornithopter with a professor here at Vassar. The ornithopter will let us test a perforated wing design based on real bird feathers. The wing passively opens up on the upstroke of a flap to allow air to pass through and closes on the downstroke just as real birds do. We will compare this wing design with a classical solid wing design to study its advantages and gain insights into the role feathers play in bird evolution. The ornithopter is powered by a 2S brushless motor and is predominantly 3D printed."),o(s,"id","hi-text"),o(s,"class","svelte-1ctlox9"),o(i,"id","name-text"),o(i,"class","svelte-1ctlox9"),o(l,"id","sub-name-text"),S(l,"backdrop-filter","blur("+e[0]+"px)"),o(l,"class","svelte-1ctlox9"),o(t,"id","title-block"),o(t,"class","svelte-1ctlox9")},m(u,d){E(u,n,d),a(n,t),a(t,s),a(t,r),a(t,i),a(t,c),a(t,l),a(l,f)},p(u,[d]){d&1&&S(l,"backdrop-filter","blur("+u[0]+"px)")},i:y,o:y,d(u){u&&T(n)}}}function Rt(e,n,t){let s,r=R(0,{duration:2e3});return L(e,r,i=>t(0,s=i)),M(()=>{r.set(15)}),[s,r]}class zt extends V{constructor(n){super(),O(this,n,Rt,Lt,q,{})}}function Ht(e){let n,t,s,r,i,c,l,f,u,d,h,m;return{c(){n=p("main"),t=p("div"),s=p("div"),r=p("p"),r.textContent="This Website",i=_(),c=p("p"),c.textContent="Updated September 2023",l=_(),f=p("p"),u=$("I designed and created this website to have a place to log my projects and experiences. This was built with Svelte and Vite. The background of this website was made with p5.js and is a Perlin Noise FlowField. You can click to scramble the Noise!"),d=_(),h=p("iframe"),o(r,"id","hi-text"),o(r,"class","svelte-i7txft"),o(c,"id","name-text"),o(c,"class","svelte-i7txft"),o(f,"id","sub-name-text"),S(f,"backdrop-filter","blur("+e[0]+"px)"),o(f,"class","svelte-i7txft"),o(s,"id","title-block"),o(s,"class","svelte-i7txft"),o(h,"class","mounted-image svelte-i7txft"),U(h.src,m="https://drewphi.github.io/")||o(h,"src",m),o(h,"title","Website"),o(t,"id","content-container"),o(t,"class","svelte-i7txft")},m(b,g){E(b,n,g),a(n,t),a(t,s),a(s,r),a(s,i),a(s,c),a(s,l),a(s,f),a(f,u),a(t,d),a(t,h)},p(b,[g]){g&1&&S(f,"backdrop-filter","blur("+b[0]+"px)")},i:y,o:y,d(b){b&&T(n)}}}function Dt(e,n,t){let s,r=R(0,{duration:2e3});return L(e,r,i=>t(0,s=i)),M(()=>{r.set(15)}),[s,r]}class Ft extends V{constructor(n){super(),O(this,n,Dt,Ht,q,{})}}function Ut(e){let n,t,s,r,i,c,l,f;return{c(){n=p("main"),t=p("div"),s=p("p"),s.textContent="About Me!",r=_(),i=p("p"),i.textContent="Updated September 2023",c=_(),l=p("p"),f=$("I am a student at Vassar College studying Pure and Applied Mathematics. I am passionate about a slew of math topics namely Spectral Graph theory, Dimensionality Reduction and the Manifold Hypothesis. I am also very passionate about Robotics and have been working on robots for as long as I can remember. View my Projects and Experiences to see what I've been up to."),o(s,"id","hi-text"),o(s,"class","svelte-11u0xtc"),o(i,"id","name-text"),o(i,"class","svelte-11u0xtc"),o(l,"id","sub-name-text"),S(l,"backdrop-filter","blur("+e[0]+"px)"),o(l,"class","svelte-11u0xtc"),o(t,"id","title-block"),o(t,"class","svelte-11u0xtc")},m(u,d){E(u,n,d),a(n,t),a(t,s),a(t,r),a(t,i),a(t,c),a(t,l),a(l,f)},p(u,[d]){d&1&&S(l,"backdrop-filter","blur("+u[0]+"px)")},i:y,o:y,d(u){u&&T(n)}}}function Wt(e,n,t){let s,r=R(0,{duration:2e3});return L(e,r,i=>t(0,s=i)),M(()=>{r.set(15)}),[s,r]}class Bt extends V{constructor(n){super(),O(this,n,Wt,Ut,q,{})}}function Kt(e){let n,t,s,r,i,c,l,f,u,d,h;return{c(){n=p("main"),t=p("div"),s=p("p"),s.textContent="Short Film",r=_(),i=p("p"),i.textContent="Vassar Spring 2023",c=_(),l=p("p"),f=$("One night I had a dream that was quite scenic so my friends and I checked out a fancy camera, asked two talented dancers to dance, and made a film. This film happened to win first place at the Vassar Film Festival!"),u=_(),d=p("iframe"),o(s,"id","hi-text"),o(s,"class","svelte-4vqxis"),o(i,"id","name-text"),o(i,"class","svelte-4vqxis"),o(l,"id","sub-name-text"),S(l,"backdrop-filter","blur("+e[0]+"px)"),o(l,"class","svelte-4vqxis"),o(t,"id","title-block"),o(t,"class","svelte-4vqxis"),o(d,"title","video"),o(d,"class","mounted-image svelte-4vqxis"),U(d.src,h="https://www.youtube.com/embed/E9OQo9YBNcI")||o(d,"src",h),o(d,"frameborder","0"),d.allowFullscreen=!0},m(m,b){E(m,n,b),a(n,t),a(t,s),a(t,r),a(t,i),a(t,c),a(t,l),a(l,f),a(n,u),a(n,d)},p(m,[b]){b&1&&S(l,"backdrop-filter","blur("+m[0]+"px)")},i:y,o:y,d(m){m&&T(n)}}}function Gt(e,n,t){let s,r=R(0,{duration:2e3});return L(e,r,i=>t(0,s=i)),M(()=>{r.set(15)}),[s,r]}class Yt extends V{constructor(n){super(),O(this,n,Gt,Kt,q,{})}}function Jt(e){let n,t,s,r,i,c,l,f,u,d,h;return{c(){n=p("main"),t=p("div"),s=p("p"),s.textContent="Satire",r=_(),i=p("p"),i.textContent="Vassar Winter 2022",c=_(),l=p("p"),f=$("I got an idea for a dumb joke, got my friend to act, and now it's a reality."),u=_(),d=p("iframe"),o(s,"id","hi-text"),o(s,"class","svelte-4vqxis"),o(i,"id","name-text"),o(i,"class","svelte-4vqxis"),o(l,"id","sub-name-text"),S(l,"backdrop-filter","blur("+e[0]+"px)"),o(l,"class","svelte-4vqxis"),o(t,"id","title-block"),o(t,"class","svelte-4vqxis"),o(d,"title","video"),o(d,"class","mounted-image svelte-4vqxis"),U(d.src,h="https://www.youtube.com/embed/JzvUG1MI-m4")||o(d,"src",h),o(d,"frameborder","0"),d.allowFullscreen=!0},m(m,b){E(m,n,b),a(n,t),a(t,s),a(t,r),a(t,i),a(t,c),a(t,l),a(l,f),a(n,u),a(n,d)},p(m,[b]){b&1&&S(l,"backdrop-filter","blur("+m[0]+"px)")},i:y,o:y,d(m){m&&T(n)}}}function Xt(e,n,t){let s,r=R(0,{duration:2e3});return L(e,r,i=>t(0,s=i)),M(()=>{r.set(15)}),[s,r]}class Qt extends V{constructor(n){super(),O(this,n,Xt,Jt,q,{})}}function Zt(e){let n,t,s,r,i,c,l,f,u,d,h;return{c(){n=p("main"),t=p("div"),s=p("p"),s.textContent="Pizza Reviews",r=_(),i=p("p"),i.textContent="Vassar College",c=_(),l=p("p"),f=$("My roomate and I freshman wanted videos to document our time in college. We found pizza reviews to be a perfect medium. We've regularly been reviewing the Vassar College Pizza at the Deece ever since. I've embed one of our videos from a notable day."),u=_(),d=p("iframe"),o(s,"id","hi-text"),o(s,"class","svelte-4vqxis"),o(i,"id","name-text"),o(i,"class","svelte-4vqxis"),o(l,"id","sub-name-text"),S(l,"backdrop-filter","blur("+e[0]+"px)"),o(l,"class","svelte-4vqxis"),o(t,"id","title-block"),o(t,"class","svelte-4vqxis"),o(d,"title","video"),o(d,"class","mounted-image svelte-4vqxis"),U(d.src,h="https://www.youtube.com/embed/B5Zf6qH5Ltc")||o(d,"src",h),o(d,"frameborder","0"),d.allowFullscreen=!0},m(m,b){E(m,n,b),a(n,t),a(t,s),a(t,r),a(t,i),a(t,c),a(t,l),a(l,f),a(n,u),a(n,d)},p(m,[b]){b&1&&S(l,"backdrop-filter","blur("+m[0]+"px)")},i:y,o:y,d(m){m&&T(n)}}}function en(e,n,t){let s,r=R(0,{duration:2e3});return L(e,r,i=>t(0,s=i)),M(()=>{r.set(15)}),[s,r]}class tn extends V{constructor(n){super(),O(this,n,en,Zt,q,{})}}function nn(e){let n,t,s,r,i,c,l,f;return{c(){n=p("main"),t=p("div"),s=p("p"),s.textContent="Slarm",r=_(),i=p("p"),i.textContent="Vassar 2023",c=_(),l=p("p"),f=$('I am collaborating with a professor at Vassar on the development of a robot arm made from a slinky, which we affectionately refer to as the "Slarm." This unique robotic arm is designed to possess infinite degrees of freedom, and it is expected to exhibit intriguing properties that distinguish it from other snake-arm robots, primarily because it comprises a single continuous surface.'),o(s,"id","hi-text"),o(s,"class","svelte-1vsu44s"),o(i,"id","name-text"),o(i,"class","svelte-1vsu44s"),o(l,"id","sub-name-text"),S(l,"backdrop-filter","blur("+e[0]+"px)"),o(l,"class","svelte-1vsu44s"),o(t,"id","title-block"),o(t,"class","svelte-1vsu44s")},m(u,d){E(u,n,d),a(n,t),a(t,s),a(t,r),a(t,i),a(t,c),a(t,l),a(l,f)},p(u,[d]){d&1&&S(l,"backdrop-filter","blur("+u[0]+"px)")},i:y,o:y,d(u){u&&T(n)}}}function sn(e,n,t){let s,r=R(0,{duration:2e3});return L(e,r,i=>t(0,s=i)),M(()=>{r.set(15)}),[s,r]}class rn extends V{constructor(n){super(),O(this,n,sn,nn,q,{})}}function ln(e){let n,t,s,r,i,c,l,f,u,d,h,m;return{c(){n=p("main"),t=p("div"),s=p("div"),r=p("p"),r.textContent="Turtle Predator Robot",i=_(),c=p("p"),c.textContent="Vassar Spring 2023",l=_(),f=p("p"),u=$("As part of an autonomous robot competition, I worked on a team of four to design a robot to capture a robotic turtle navigating an obstacle-filled arena. Using machine vision, our robot located and pursued the turtle, ultimately capturing it with a descending arm. To confirm the capture and distinguish it from obstacles, we employed an accelerometer to detect the turtle's movements. Additionally, a gyro assisted in arena navigation. Despite obstacles sharing the same color as the turtle, our shape-based filtering techniques allowed us to excel beyond expectations."),d=_(),h=p("img"),o(r,"id","hi-text"),o(r,"class","svelte-1pe4p0g"),o(c,"id","name-text"),o(c,"class","svelte-1pe4p0g"),o(f,"id","sub-name-text"),S(f,"backdrop-filter","blur("+e[0]+"px)"),o(f,"class","svelte-1pe4p0g"),o(s,"id","title-block"),o(s,"class","svelte-1pe4p0g"),o(h,"class","mounted-image svelte-1pe4p0g"),U(h.src,m="/TurtleRobot.png")||o(h,"src",m),o(h,"alt","RobotRender"),o(t,"id","content-container"),o(t,"class","svelte-1pe4p0g")},m(b,g){E(b,n,g),a(n,t),a(t,s),a(s,r),a(s,i),a(s,c),a(s,l),a(s,f),a(f,u),a(t,d),a(t,h)},p(b,[g]){g&1&&S(f,"backdrop-filter","blur("+b[0]+"px)")},i:y,o:y,d(b){b&&T(n)}}}function on(e,n,t){let s,r=R(0,{duration:2e3});return L(e,r,i=>t(0,s=i)),M(()=>{r.set(15)}),[s,r]}class an extends V{constructor(n){super(),O(this,n,on,ln,q,{})}}function Pe(e,n,t){const s=e.slice();return s[12]=n[t],s[14]=t,s}function Oe(e){let n,t,s,r;var i=e[4][e[0]][e[1]];function c(l,f){return{}}return i&&(t=Se(i,c())),{c(){n=p("div"),t&&be(t.$$.fragment),o(n,"class","containerMain svelte-dfmnmk")},m(l,f){E(l,n,f),t&&ce(t,n,null),r=!0},p(l,f){if(f&3&&i!==(i=l[4][l[0]][l[1]])){if(t){Ue();const u=t;se(u.$$.fragment,1,0,()=>{ue(u,1)}),We()}i?(t=Se(i,c()),be(t.$$.fragment),J(t.$$.fragment,1),ce(t,n,null)):t=null}},i(l){r||(t&&J(t.$$.fragment,l),l&&(s||ne(()=>{s=ft(n,Nt,{y:-200,duration:200}),s.start()})),r=!0)},o(l){t&&se(t.$$.fragment,l),r=!1},d(l){l&&T(n),t&&ue(t)}}}function Ve(e){let n,t=e[12]+"",s,r,i,c;function l(){return e[11](e[14])}return{c(){n=p("button"),s=$(t),r=_(),o(n,"class","svelte-dfmnmk"),N(n,"active",e[3]===e[14])},m(f,u){E(f,n,u),a(n,s),a(n,r),i||(c=Z(n,"click",l),i=!0)},p(f,u){e=f,u&1&&t!==(t=e[12]+"")&&I(s,t),u&8&&N(n,"active",e[3]===e[14])},d(f){f&&T(n),i=!1,c()}}}function cn(e){let n,t=e[1],s,r,i,c,l,f,u,d,h,m,b,g,v,x,k=Oe(e),z=Ae(e[5][e[0]]),C=[];for(let w=0;w<z.length;w+=1)C[w]=Ve(Pe(e,z,w));return{c(){n=p("main"),k.c(),s=_(),r=p("nav");for(let w=0;w<C.length;w+=1)C[w].c();i=_(),c=p("nav"),l=p("button"),l.textContent="Home",f=_(),u=p("button"),u.textContent="Projects",d=_(),h=p("button"),h.textContent="Experiences",m=_(),b=p("button"),b.textContent="Contact",o(r,"class","vnavbar svelte-dfmnmk"),o(l,"class","svelte-dfmnmk"),N(l,"active",e[2]===0),o(u,"class","svelte-dfmnmk"),N(u,"active",e[2]===1),o(h,"class","svelte-dfmnmk"),N(h,"active",e[2]===2),o(b,"class","svelte-dfmnmk"),N(b,"active",e[2]===3),o(c,"class","navbar svelte-dfmnmk")},m(w,j){E(w,n,j),k.m(n,null),a(n,s),a(n,r);for(let A=0;A<C.length;A+=1)C[A]&&C[A].m(r,null);a(n,i),a(n,c),a(c,l),a(c,f),a(c,u),a(c,d),a(c,h),a(c,m),a(c,b),g=!0,v||(x=[Z(l,"click",e[6]),Z(u,"click",e[7]),Z(h,"click",e[8]),Z(b,"click",e[9])],v=!0)},p(w,[j]){if(j&2&&q(t,t=w[1])?(Ue(),se(k,1,1,y),We(),k=Oe(w),k.c(),J(k,1),k.m(n,s)):k.p(w,j),j&1065){z=Ae(w[5][w[0]]);let A;for(A=0;A<z.length;A+=1){const we=Pe(w,z,A);C[A]?C[A].p(we,j):(C[A]=Ve(we),C[A].c(),C[A].m(r,null))}for(;A<C.length;A+=1)C[A].d(1);C.length=z.length}(!g||j&4)&&N(l,"active",w[2]===0),(!g||j&4)&&N(u,"active",w[2]===1),(!g||j&4)&&N(h,"active",w[2]===2),(!g||j&4)&&N(b,"active",w[2]===3)},i(w){g||(J(k),g=!0)},o(w){se(k),g=!1},d(w){w&&T(n),k.d(w),Qe(C,w),v=!1,X(x)}}}function un(e,n,t){let s={0:[yt,Bt],1:[kt,zt,an,rn,Ft,Yt,Qt,tn],2:[Tt,Ot,jt],3:[Et]},r={0:["Home","About"],1:["Projects","Ornithopter","TurtleBot","Slarm","Website","Valse d'eclairage","Satire","Vassar Pizza Daily!"],2:["Experiences","Knot Theory","Harper"],3:["Contact"]},i=0,c=0,l=0,f=0;window.addEventListener("keyup",v=>{if(v.key=="ArrowRight")t(1,f=0),t(0,i=(i+1)%Object.keys(s).length),H.set(i);else if(v.key=="ArrowLeft")t(1,f=0),i==0?(t(0,i=Object.keys(s).length-1),H.set(i)):(t(0,i=(i-1)%Object.keys(s).length),H.set(i));else if(v.key==="ArrowUp"||v.key==="ArrowDown"){const x=r[i].length;x>0&&(v.key==="ArrowUp"?t(1,f=(f-1+x)%x):t(1,f=(f+1)%x))}console.log(i)}),window.addEventListener("wheel",v=>{v.deltaY<-100?t(1,f=(f+1)%r[i].length):v.deltaY>100&&(f==0?t(1,f=r[i].length-1):t(1,f=(f-1)%r[i].length))});function u(){t(0,i=0),t(1,f=0),H.set(i),t(1,f=0)}function d(){t(0,i=1),t(1,f=0),H.set(i),t(1,f=0)}function h(){t(0,i=2),t(1,f=0),H.set(i)}function m(){t(0,i=3),t(1,f=0),H.set(i)}function b(v){console.log(v),t(1,f=v)}const g=v=>b(v);return e.$$.update=()=>{e.$$.dirty&1&&t(2,c=i),e.$$.dirty&2&&t(3,l=f),e.$$.dirty&1&&document.documentElement.style.setProperty("--vnavbar-button-count",s[i].length)},[i,f,c,l,s,r,u,d,h,m,b,g]}class fn extends V{constructor(n){super(),O(this,n,un,cn,q,{})}}new fn({target:document.getElementById("app")});