var Be=Object.defineProperty;var Ke=(e,n,t)=>n in e?Be(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t;var fe=(e,n,t)=>(Ke(e,typeof n!="symbol"?n+"":n,t),t);(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();function y(){}const Ve=e=>e;function xe(e,n){for(const t in n)e[t]=n[t];return e}function Me(e){return e()}function $e(){return Object.create(null)}function X(e){e.forEach(Me)}function ve(e){return typeof e=="function"}function T(e,n){return e!=e?n==n:e!==n||e&&typeof e=="object"||typeof e=="function"}let re;function L(e,n){return e===n?!0:(re||(re=document.createElement("a")),re.href=n,e===re.href)}function Ye(e){return Object.keys(e).length===0}function Ge(e,...n){if(e==null){for(const s of n)s(void 0);return y}const t=e.subscribe(...n);return t.unsubscribe?()=>t.unsubscribe():t}function D(e,n,t){e.$$.on_destroy.push(Ge(n,t))}function ke(e){const n=typeof e=="string"&&e.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);return n?[parseFloat(n[1]),n[2]||"px"]:[e,"px"]}const De=typeof window<"u";let Ne=De?()=>window.performance.now():()=>Date.now(),_e=De?e=>requestAnimationFrame(e):y;const Y=new Set;function Re(e){Y.forEach(n=>{n.c(e)||(Y.delete(n),n.f())}),Y.size!==0&&_e(Re)}function Fe(e){let n;return Y.size===0&&_e(Re),{promise:new Promise(t=>{Y.add(n={c:e,f:t})}),abort(){Y.delete(n)}}}function a(e,n){e.appendChild(n)}function Le(e){if(!e)return document;const n=e.getRootNode?e.getRootNode():e.ownerDocument;return n&&n.host?n:e.ownerDocument}function Je(e){const n=d("style");return n.textContent="/* empty */",Xe(Le(e),n),n.sheet}function Xe(e,n){return a(e.head||e,n),n.sheet}function A(e,n,t){e.insertBefore(n,t||null)}function C(e){e.parentNode&&e.parentNode.removeChild(e)}function Qe(e,n){for(let t=0;t<e.length;t+=1)e[t]&&e[t].d(n)}function d(e){return document.createElement(e)}function k(e){return document.createTextNode(e)}function _(){return k(" ")}function Z(e,n,t,s){return e.addEventListener(n,t,s),()=>e.removeEventListener(n,t,s)}function l(e,n,t){t==null?e.removeAttribute(n):e.getAttribute(n)!==t&&e.setAttribute(n,t)}function Ze(e){return Array.from(e.childNodes)}function E(e,n){n=""+n,e.data!==n&&(e.data=n)}function S(e,n,t,s){t==null?e.style.removeProperty(n):e.style.setProperty(n,t,s?"important":"")}function F(e,n,t){e.classList.toggle(n,!!t)}function et(e,n,{bubbles:t=!1,cancelable:s=!1}={}){return new CustomEvent(e,{detail:n,bubbles:t,cancelable:s})}function Se(e,n){return new e(n)}const oe=new Map;let ae=0;function tt(e){let n=5381,t=e.length;for(;t--;)n=(n<<5)-n^e.charCodeAt(t);return n>>>0}function nt(e,n){const t={stylesheet:Je(n),rules:{}};return oe.set(e,t),t}function st(e,n,t,s,i,r,c,o=0){const f=16.666/s;let u=`{
`;for(let w=0;w<=1;w+=f){const x=n+(t-n)*r(w);u+=w*100+`%{${c(x,1-x)}}
`}const p=u+`100% {${c(t,1-t)}}
}`,h=`__svelte_${tt(p)}_${o}`,m=Le(e),{stylesheet:g,rules:b}=oe.get(m)||nt(m,e);b[h]||(b[h]=!0,g.insertRule(`@keyframes ${h} ${p}`,g.cssRules.length));const v=e.style.animation||"";return e.style.animation=`${v?`${v}, `:""}${h} ${s}ms linear ${i}ms 1 both`,ae+=1,h}function Ce(e,n){const t=(e.style.animation||"").split(", "),s=t.filter(n?r=>r.indexOf(n)<0:r=>r.indexOf("__svelte")===-1),i=t.length-s.length;i&&(e.style.animation=s.join(", "),ae-=i,ae||it())}function it(){_e(()=>{ae||(oe.forEach(e=>{const{ownerNode:n}=e.stylesheet;n&&C(n)}),oe.clear())})}let te;function ee(e){te=e}function He(){if(!te)throw new Error("Function called outside component initialization");return te}function V(e){He().$$.on_mount.push(e)}function ie(e){He().$$.on_destroy.push(e)}const K=[],Te=[];let G=[];const Ae=[],rt=Promise.resolve();let he=!1;function lt(){he||(he=!0,rt.then(ze))}function ne(e){G.push(e)}const de=new Set;let W=0;function ze(){if(W!==0)return;const e=te;do{try{for(;W<K.length;){const n=K[W];W++,ee(n),ot(n.$$)}}catch(n){throw K.length=0,W=0,n}for(ee(null),K.length=0,W=0;Te.length;)Te.pop()();for(let n=0;n<G.length;n+=1){const t=G[n];de.has(t)||(de.add(t),t())}G.length=0}while(K.length);for(;Ae.length;)Ae.pop()();he=!1,de.clear(),ee(e)}function ot(e){if(e.fragment!==null){e.update(),X(e.before_update);const n=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,n),e.after_update.forEach(ne)}}function at(e){const n=[],t=[];G.forEach(s=>e.indexOf(s)===-1?n.push(s):t.push(s)),t.forEach(s=>s()),G=n}let Q;function ct(){return Q||(Q=Promise.resolve(),Q.then(()=>{Q=null})),Q}function Oe(e,n,t){e.dispatchEvent(et(`${n?"intro":"outro"}${t}`))}const le=new Set;let U;function Ue(){U={r:0,c:[],p:U}}function We(){U.r||X(U.c),U=U.p}function J(e,n){e&&e.i&&(le.delete(e),e.i(n))}function se(e,n,t,s){if(e&&e.o){if(le.has(e))return;le.add(e),U.c.push(()=>{le.delete(e),s&&(t&&e.d(1),s())}),e.o(n)}else s&&s()}const ut={duration:0};function ft(e,n,t){const s={direction:"in"};let i=n(e,t,s),r=!1,c,o,f=0;function u(){c&&Ce(e,c)}function p(){const{delay:m=0,duration:g=300,easing:b=Ve,tick:v=y,css:w}=i||ut;w&&(c=st(e,0,1,g,m,b,w,f++)),v(0,1);const x=Ne()+m,M=x+g;o&&o.abort(),r=!0,ne(()=>Oe(e,!0,"start")),o=Fe(O=>{if(r){if(O>=M)return v(1,0),Oe(e,!0,"end"),u(),r=!1;if(O>=x){const $=b((O-x)/g);v($,1-$)}}return r})}let h=!1;return{start(){h||(h=!0,Ce(e),ve(i)?(i=i(s),ct().then(p)):p())},invalidate(){h=!1},end(){r&&(u(),r=!1)}}}function je(e){return(e==null?void 0:e.length)!==void 0?e:Array.from(e)}function ge(e){e&&e.c()}function ce(e,n,t){const{fragment:s,after_update:i}=e.$$;s&&s.m(n,t),ne(()=>{const r=e.$$.on_mount.map(Me).filter(ve);e.$$.on_destroy?e.$$.on_destroy.push(...r):X(r),e.$$.on_mount=[]}),i.forEach(ne)}function ue(e,n){const t=e.$$;t.fragment!==null&&(at(t.after_update),X(t.on_destroy),t.fragment&&t.fragment.d(n),t.on_destroy=t.fragment=null,t.ctx=[])}function dt(e,n){e.$$.dirty[0]===-1&&(K.push(e),lt(),e.$$.dirty.fill(0)),e.$$.dirty[n/31|0]|=1<<n%31}function j(e,n,t,s,i,r,c,o=[-1]){const f=te;ee(e);const u=e.$$={fragment:null,ctx:[],props:r,update:y,not_equal:i,bound:$e(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(f?f.$$.context:[])),callbacks:$e(),dirty:o,skip_bound:!1,root:n.target||f.$$.root};c&&c(u.root);let p=!1;if(u.ctx=t?t(e,n.props||{},(h,m,...g)=>{const b=g.length?g[0]:m;return u.ctx&&i(u.ctx[h],u.ctx[h]=b)&&(!u.skip_bound&&u.bound[h]&&u.bound[h](b),p&&dt(e,h)),m}):[],u.update(),p=!0,X(u.before_update),u.fragment=s?s(u.ctx):!1,n.target){if(n.hydrate){const h=Ze(n.target);u.fragment&&u.fragment.l(h),h.forEach(C)}else u.fragment&&u.fragment.c();n.intro&&J(e.$$.fragment),ce(e,n.target,n.anchor),ze()}ee(f)}class q{constructor(){fe(this,"$$");fe(this,"$$set")}$destroy(){ue(this,1),this.$destroy=y}$on(n,t){if(!ve(t))return y;const s=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return s.push(t),()=>{const i=s.indexOf(t);i!==-1&&s.splice(i,1)}}$set(n){this.$$set&&!Ye(n)&&(this.$$.skip_bound=!0,this.$$set(n),this.$$.skip_bound=!1)}}const pt="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(pt);const B=[];function ye(e,n=y){let t;const s=new Set;function i(o){if(T(e,o)&&(e=o,t)){const f=!B.length;for(const u of s)u[1](),B.push(u,e);if(f){for(let u=0;u<B.length;u+=2)B[u][0](B[u+1]);B.length=0}}}function r(o){i(o(e))}function c(o,f=y){const u=[o,f];return s.add(u),s.size===1&&(t=n(i,r)||y),o(e),()=>{s.delete(u),s.size===0&&t&&(t(),t=null)}}return{set:i,update:r,subscribe:c}}const z=ye(["","","",""]),H=ye(0);function mt(e){let n,t;return{c(){n=d("span"),t=k(e[0]),l(n,"id","flytext"),l(n,"class","svelte-1wd2v0g")},m(s,i){A(s,n,i),a(n,t)},p(s,[i]){i&1&&E(t,s[0])},i:y,o:y,d(s){s&&C(n)}}}function ht(e){let n=[e.length];for(let t=0;t<e.length;t++)n[t]=t;return n.sort(()=>Math.random()-.5),n}function gt(e,n,t){let s=["             ","Mathematician","Roboticist   ","Developer    ","Musician     ","Student      ","Human        "],i=s[0],r=s[0],c=0,o=0,f=!1,u=[],p,h;function m(){z.subscribe(g=>{h=g}),z.set([h[0],h[1],h[2],i]),i==s[c]?(i=="Mathematician"&&c==1&&(s.shift(),c=0),r=s[c],c=(c+1)%s.length,u=ht(s[c]),o=0,i=="             "?p=setTimeout(m,10):p=setTimeout(m,3e3)):f?(o==13?t(0,i=i.substring(0,u[o])+s[c][u[o]]):t(0,i=i.substring(0,u[o])+s[c][u[o]]+i.substring(u[o]+1)),o++,f=!1,p=setTimeout(m,55)):r[u[o]]==s[c][u[o]]?(f=!0,setTimeout(m,0)):o==13?(t(0,i=i.substring(0,u[o])+"■"),f=!0,p=setTimeout(m,55)):(t(0,i=i.substring(0,u[o])+"■"+i.substring(u[o]+1)),f=!0,p=setTimeout(m,55))}return V(m),ie(()=>clearTimeout(p)),[i]}class bt extends q{constructor(n){super(),j(this,n,gt,mt,T,{})}}let pe,me;function P(e,n,t,s){if(console.log(s),H.subscribe(r=>{me=r}),s!==me)return console.log(s,me),e;e.length!==n.length&&(e.length>n.length?n+=" ".repeat(e.length-n.length):e+=" ".repeat(n.length-e.length)),z.subscribe(r=>{pe=r}),pe[t]=e.trim()+" ",z.set(pe);let i=[];if(e===n)return e.trim();if(e.search("■")===-1){for(let c=0;c<e.length;c++)e[c]!==n[c]&&i.push(c);let r=i[Math.floor(Math.random()*i.length)];setTimeout(P,40,e.substring(0,r)+"■"+(r==e.length-1?"":e.substring(r+1)),n,t,s)}else setTimeout(P,40,e.replace("■",n[e.search("■")]),n,t,s)}function vt(e){let n,t,s,i,r,c,o,f,u,p,h,m;return h=new bt({}),{c(){n=d("main"),t=d("div"),s=d("p"),i=k(e[2]),r=_(),c=d("p"),o=k(e[1]),f=_(),u=d("p"),p=k(e[0]),ge(h.$$.fragment),l(s,"id","hi-text"),l(s,"class","svelte-10fmstn"),l(c,"id","name-text"),l(c,"class","svelte-10fmstn"),l(u,"id","sub-name-text"),l(u,"class","svelte-10fmstn"),l(t,"id","title-block"),l(t,"class","svelte-10fmstn")},m(g,b){A(g,n,b),a(n,t),a(t,s),a(s,i),a(t,r),a(t,c),a(c,o),a(t,f),a(t,u),a(u,p),ce(h,u,null),m=!0},p(g,[b]){(!m||b&4)&&E(i,g[2]),(!m||b&2)&&E(o,g[1]),(!m||b&1)&&E(p,g[0])},i(g){m||(J(h.$$.fragment,g),m=!0)},o(g){se(h.$$.fragment,g),m=!1},d(g){g&&C(n),ue(h)}}}function _t(e,n,t){let s,i,r,c=["","","",""];z.subscribe(f=>{t(3,c=f)});let o;return V(()=>{setTimeout(()=>{P(s,"Hi! My name is",0,0),P(i,"Drew Steindl",1,0),P(r,"I'm a ",2,0)})}),ie(()=>clearTimeout(o)),e.$$.update=()=>{e.$$.dirty&8&&t(2,s=c[0]),e.$$.dirty&8&&t(1,i=c[1]),e.$$.dirty&8&&t(0,r=c[2])},[r,i,s,c]}class yt extends q{constructor(n){super(),j(this,n,_t,vt,T,{})}}function wt(e){let n,t,s,i,r,c,o,f,u,p,h,m,g;return{c(){n=d("main"),t=d("div"),s=d("p"),i=k(e[3]),r=_(),c=d("p"),o=k(e[2]),f=_(),u=d("p"),p=k(e[1]),h=_(),m=d("p"),g=k(e[0]),l(s,"id","hi-text"),l(s,"class","svelte-8gs5dn"),l(c,"id","name-text"),l(c,"class","svelte-8gs5dn"),l(u,"id","sub-name-text"),l(u,"class","svelte-8gs5dn"),l(m,"id","last-word"),l(m,"class","svelte-8gs5dn"),l(t,"id","title-block"),l(t,"class","svelte-8gs5dn")},m(b,v){A(b,n,v),a(n,t),a(t,s),a(s,i),a(t,r),a(t,c),a(c,o),a(t,f),a(t,u),a(u,p),a(t,h),a(t,m),a(m,g)},p(b,[v]){v&8&&E(i,b[3]),v&4&&E(o,b[2]),v&2&&E(p,b[1]),v&1&&E(g,b[0])},i:y,o:y,d(b){b&&C(n)}}}function xt(e,n,t){let s,i,r,c,o=["","","",""],f;return z.subscribe(u=>{t(4,o=u)}),V(()=>{setTimeout(()=>{P(s,"Scroll Down to view some of my",0,1),P(i,"Projects",1,1),P(r,"Move right to",2,1),P(c,"Experiences",3,1)},10)}),ie(()=>clearTimeout(f)),e.$$.update=()=>{e.$$.dirty&16&&t(3,s=o[0]),e.$$.dirty&16&&t(2,i=o[1]),e.$$.dirty&16&&t(1,r=o[2]),e.$$.dirty&16&&t(0,c=o[3])},[c,r,i,s,o]}class $t extends q{constructor(n){super(),j(this,n,xt,wt,T,{})}}function kt(e){let n,t,s,i,r,c,o,f,u,p,h,m,g;return{c(){n=d("main"),t=d("div"),s=d("p"),i=k(e[3]),r=_(),c=d("p"),o=k(e[2]),f=_(),u=d("p"),p=k(e[1]),h=_(),m=d("p"),g=k(e[0]),l(s,"id","hi-text"),l(s,"class","svelte-ta2v34"),l(c,"id","name-text"),l(c,"class","svelte-ta2v34"),l(u,"id","sub-name-text"),l(u,"class","svelte-ta2v34"),l(m,"id","last-word"),l(m,"class","svelte-ta2v34"),l(t,"id","title-block"),l(t,"class","svelte-ta2v34")},m(b,v){A(b,n,v),a(n,t),a(t,s),a(s,i),a(t,r),a(t,c),a(c,o),a(t,f),a(t,u),a(u,p),a(t,h),a(t,m),a(m,g)},p(b,[v]){v&8&&E(i,b[3]),v&4&&E(o,b[2]),v&2&&E(p,b[1]),v&1&&E(g,b[0])},i:y,o:y,d(b){b&&C(n)}}}function St(e,n,t){let s,i,r,c,o=["","","",""],f;z.subscribe(p=>{t(4,o=p)});function u(){P(s,"Go Down to view my",0,2),P(i,"Experiences",1,2),P(r,"Move right to",2,2),P(c,"Contact",3,2)}return V(()=>{setTimeout(()=>{u()},10)}),ie(()=>clearTimeout(f)),e.$$.update=()=>{e.$$.dirty&16&&t(3,s=o[0]),e.$$.dirty&16&&t(2,i=o[1]),e.$$.dirty&16&&t(1,r=o[2]),e.$$.dirty&16&&t(0,c=o[3])},[c,r,i,s,o]}class Ct extends q{constructor(n){super(),j(this,n,St,kt,T,{})}}function Tt(e){let n,t,s,i,r,c,o,f,u,p,h,m,g,b,v,w;return{c(){n=d("main"),t=d("div"),s=d("p"),i=k(e[3]),r=_(),c=d("p"),o=k(e[2]),f=_(),u=d("a"),p=d("p"),h=k(e[1]),m=_(),g=d("p"),b=k(e[0]),v=_(),w=d("form"),w.innerHTML='<div class="form-group"><input type="text" name="name" placeholder="Name" class="svelte-jcpv8w"/> <input type="email" name="email" placeholder="Email" class="svelte-jcpv8w"/></div> <div class="form-group"><textarea style="height: 8vh;" name="message" placeholder="Message" rows="5" class="svelte-jcpv8w"></textarea></div> <div id="button-container"><button type="submit" class="svelte-jcpv8w">Send</button></div>',l(s,"id","hi-text"),l(s,"class","svelte-jcpv8w"),l(c,"id","name-text"),l(c,"class","svelte-jcpv8w"),l(p,"id","sub-name-text"),l(p,"class","svelte-jcpv8w"),l(u,"href","https://github.com/DrewPhi"),l(g,"id","last-word"),l(g,"class","svelte-jcpv8w"),l(w,"action","https://formspree.io/f/xaygpggk"),l(w,"method","POST"),l(w,"class","svelte-jcpv8w"),l(t,"id","title-block"),l(t,"class","svelte-jcpv8w")},m(x,M){A(x,n,M),a(n,t),a(t,s),a(s,i),a(t,r),a(t,c),a(c,o),a(t,f),a(t,u),a(u,p),a(p,h),a(t,m),a(t,g),a(g,b),a(t,v),a(t,w)},p(x,[M]){M&8&&E(i,x[3]),M&4&&E(o,x[2]),M&2&&E(h,x[1]),M&1&&E(b,x[0])},i:y,o:y,d(x){x&&C(n)}}}function At(e,n,t){let s,i,r,c,o=["","","",""],f;return z.subscribe(u=>{t(4,o=u)}),V(()=>{setTimeout(()=>{P(s,"Send your Pigeon!",0,3),P(i,"Contact",1,3),P(r,"Github",2,3),P(c,"",3,3)},10)}),ie(()=>clearTimeout(f)),e.$$.update=()=>{e.$$.dirty&16&&t(3,s=o[0]),e.$$.dirty&16&&t(2,i=o[1]),e.$$.dirty&16&&t(1,r=o[2]),e.$$.dirty&16&&t(0,c=o[3])},[c,r,i,s,o]}class Ot extends q{constructor(n){super(),j(this,n,At,Tt,T,{})}}function qe(e){return Object.prototype.toString.call(e)==="[object Date]"}function jt(e){const n=e-1;return n*n*n+1}function be(e,n){if(e===n||e!==e)return()=>e;const t=typeof e;if(t!==typeof n||Array.isArray(e)!==Array.isArray(n))throw new Error("Cannot interpolate values of different type");if(Array.isArray(e)){const s=n.map((i,r)=>be(e[r],i));return i=>s.map(r=>r(i))}if(t==="object"){if(!e||!n)throw new Error("Object cannot be null");if(qe(e)&&qe(n)){e=e.getTime(),n=n.getTime();const r=n-e;return c=>new Date(e+c*r)}const s=Object.keys(n),i={};return s.forEach(r=>{i[r]=be(e[r],n[r])}),r=>{const c={};return s.forEach(o=>{c[o]=i[o](r)}),c}}if(t==="number"){const s=n-e;return i=>e+i*s}throw new Error(`Cannot interpolate ${t} values`)}function N(e,n={}){const t=ye(e);let s,i=e;function r(c,o){if(e==null)return t.set(e=c),Promise.resolve();i=c;let f=s,u=!1,{delay:p=0,duration:h=400,easing:m=Ve,interpolate:g=be}=xe(xe({},n),o);if(h===0)return f&&(f.abort(),f=null),t.set(e=i),Promise.resolve();const b=Ne()+p;let v;return s=Fe(w=>{if(w<b)return!0;u||(v=g(e,c),typeof h=="function"&&(h=h(e,c)),u=!0),f&&(f.abort(),f=null);const x=w-b;return x>h?(t.set(e=c),!1):(t.set(e=v(m(x/h))),!0)}),s.promise}return{set:r,update:(c,o)=>r(c(i,e),o),subscribe:t.subscribe}}function qt(e){let n,t,s,i,r,c,o,f,u,p,h,m,g;return{c(){n=d("main"),t=d("div"),s=d("p"),s.textContent="Mathematics Research",i=_(),r=d("p"),r.textContent="Vassar Summer 2022",c=_(),o=d("p"),f=k("As a fellow at Vassar's URSI, I explored the genus distribution of two bridge knots on a team of five students. We had a successful summer with substantial results, and we presented our work at various conferences, including SUNY New Paltz and Mt. Holyoke. For more information, please see our paper, which we've submitted for publication."),u=_(),p=d("a"),p.innerHTML='<p id="last-word" class="svelte-1bqdt99">View Our Paper</p> <a></a>',h=_(),m=d("iframe"),l(s,"id","hi-text"),l(s,"class","svelte-1bqdt99"),l(r,"id","name-text"),l(r,"class","svelte-1bqdt99"),l(o,"id","sub-name-text"),S(o,"backdrop-filter","blur("+e[0]+"px)"),l(o,"class","svelte-1bqdt99"),l(p,"href","/PaperKnot.pdf"),l(t,"id","title-block"),l(t,"class","svelte-1bqdt99"),l(m,"title","pdf"),l(m,"id","pdf"),L(m.src,g="/PaperKnot.pdf")||l(m,"src",g),S(m,"width","30%"),S(m,"height","75%"),l(m,"frameborder","0"),l(m,"class","svelte-1bqdt99")},m(b,v){A(b,n,v),a(n,t),a(t,s),a(t,i),a(t,r),a(t,c),a(t,o),a(o,f),a(t,u),a(t,p),a(n,h),a(n,m)},p(b,[v]){v&1&&S(o,"backdrop-filter","blur("+b[0]+"px)")},i:y,o:y,d(b){b&&C(n)}}}function It(e,n,t){let s,i=N(0,{duration:2e3});return D(e,i,r=>t(0,s=r)),V(()=>{i.set(15)}),[s,i]}class Et extends q{constructor(n){super(),j(this,n,It,qt,T,{})}}function Pt(e){let n,t,s,i,r,c,o,f,u,p,h,m,g;return{c(){n=d("main"),t=d("div"),s=d("p"),s.textContent="Humanoid Robotics",i=_(),r=d("p"),r.textContent="Vassar Summer 2023",c=_(),o=d("p"),f=k("Again as an URSI fellow at Vassar, I worked on a team of two on a humanoid robot named Harper. Our job was to develop the hardware and software infrastructure for human-like perception and action. We designed and are implementing a custom control architecture, coordinating vision, language, and motor control systems. We've been working with Nvidia's Jetson AGX Orin, DepthAI, Ros2, MicroRos, Nvidia Riva SDK, Arduino, and more. This experience has become an ongoing project."),u=_(),p=d("a"),p.innerHTML='<p id="last-word" class="svelte-1qbd782">View Our Poster</p>',h=_(),m=d("iframe"),l(s,"id","hi-text"),l(s,"class","svelte-1qbd782"),l(r,"id","name-text"),l(r,"class","svelte-1qbd782"),l(o,"id","sub-name-text"),S(o,"backdrop-filter","blur("+e[0]+"px)"),l(o,"class","svelte-1qbd782"),l(p,"href","/URSI_26_KenLivingston_MichaelFerrante_AndrewJSteindl_flat.pdf"),l(t,"id","title-block"),l(t,"class","svelte-1qbd782"),l(m,"title","video"),l(m,"class","mounted-image svelte-1qbd782"),L(m.src,g="https://www.youtube.com/embed/mwKXxNulNms")||l(m,"src",g),l(m,"frameborder","0"),m.allowFullscreen=!0},m(b,v){A(b,n,v),a(n,t),a(t,s),a(t,i),a(t,r),a(t,c),a(t,o),a(o,f),a(t,u),a(t,p),a(n,h),a(n,m)},p(b,[v]){v&1&&S(o,"backdrop-filter","blur("+b[0]+"px)")},i:y,o:y,d(b){b&&C(n)}}}function Vt(e,n,t){let s,i=N(0,{duration:2e3});return D(e,i,r=>t(0,s=r)),V(()=>{i.set(15)}),[s,i]}class Mt extends q{constructor(n){super(),j(this,n,Vt,Pt,T,{})}}function Dt(e,{delay:n=0,duration:t=400,easing:s=jt,x:i=0,y:r=0,opacity:c=0}={}){const o=getComputedStyle(e),f=+o.opacity,u=o.transform==="none"?"":o.transform,p=f*(1-c),[h,m]=ke(i),[g,b]=ke(r);return{delay:n,duration:t,easing:s,css:(v,w)=>`
			transform: ${u} translate(${(1-v)*h}${m}, ${(1-v)*g}${b});
			opacity: ${f-p*w}`}}function Nt(e){let n,t,s,i,r,c,o,f;return{c(){n=d("main"),t=d("div"),s=d("p"),s.textContent="Modular Ornithopter",i=_(),r=d("p"),r.textContent="Vassar Ongoing",c=_(),o=d("p"),f=k("I am currently designing and constructing a biomimetic modular ornithopter with a professor here at Vassar. The ornithopter will let us test a perforated wing design based on real bird feathers. The wing passively opens up on the upstroke of a flap to allow air to pass through and closes on the downstroke just as real birds do. We will compare this wing design with a classical solid wing design to study its advantages and gain insights into the role feathers play in bird evolution. The ornithopter is powered by a 2S brushless motor and is predominantly 3D printed."),l(s,"id","hi-text"),l(s,"class","svelte-1ctlox9"),l(r,"id","name-text"),l(r,"class","svelte-1ctlox9"),l(o,"id","sub-name-text"),S(o,"backdrop-filter","blur("+e[0]+"px)"),l(o,"class","svelte-1ctlox9"),l(t,"id","title-block"),l(t,"class","svelte-1ctlox9")},m(u,p){A(u,n,p),a(n,t),a(t,s),a(t,i),a(t,r),a(t,c),a(t,o),a(o,f)},p(u,[p]){p&1&&S(o,"backdrop-filter","blur("+u[0]+"px)")},i:y,o:y,d(u){u&&C(n)}}}function Rt(e,n,t){let s,i=N(0,{duration:2e3});return D(e,i,r=>t(0,s=r)),V(()=>{i.set(15)}),[s,i]}class Ft extends q{constructor(n){super(),j(this,n,Rt,Nt,T,{})}}function Lt(e){let n,t,s,i,r,c,o,f,u,p,h;return{c(){n=d("main"),t=d("div"),s=d("p"),s.textContent="This Website",i=_(),r=d("p"),r.textContent="Updated October 2023",c=_(),o=d("p"),f=k("I designed and created this website to have a place to log my projects and experiences. This was built with Svelte and Vite. The background of this website was made with p5.js and is a Perlin Noise FlowField. You can click to scramble the Noise!"),u=_(),p=d("iframe"),l(s,"id","hi-text"),l(s,"class","svelte-b8de69"),l(r,"id","name-text"),l(r,"class","svelte-b8de69"),l(o,"id","sub-name-text"),S(o,"backdrop-filter","blur("+e[0]+"px)"),l(o,"class","svelte-b8de69"),l(t,"id","title-block"),l(t,"class","svelte-b8de69"),l(p,"class","mounted-image svelte-b8de69"),L(p.src,h="https://drewphi.github.io/")||l(p,"src",h),l(p,"title","Website")},m(m,g){A(m,n,g),a(n,t),a(t,s),a(t,i),a(t,r),a(t,c),a(t,o),a(o,f),a(n,u),a(n,p)},p(m,[g]){g&1&&S(o,"backdrop-filter","blur("+m[0]+"px)")},i:y,o:y,d(m){m&&C(n)}}}function Ht(e,n,t){let s,i=N(0,{duration:2e3});return D(e,i,r=>t(0,s=r)),V(()=>{i.set(15)}),[s,i]}class zt extends q{constructor(n){super(),j(this,n,Ht,Lt,T,{})}}function Ut(e){let n,t,s,i,r,c,o,f;return{c(){n=d("main"),t=d("div"),s=d("p"),s.textContent="About Me!",i=_(),r=d("p"),r.textContent="Updated September 2023",c=_(),o=d("p"),f=k("Hi! I'm Drew, a student at Vassar College studying Pure and Applied Mathematics. I also have an unwavering enthusiasm for the world of Robotics. I've been learning, tinkering, and breaking things my whole life. Feel free to explore my portfolio to see what I've been up to :)"),l(s,"id","hi-text"),l(s,"class","svelte-11u0xtc"),l(r,"id","name-text"),l(r,"class","svelte-11u0xtc"),l(o,"id","sub-name-text"),S(o,"backdrop-filter","blur("+e[0]+"px)"),l(o,"class","svelte-11u0xtc"),l(t,"id","title-block"),l(t,"class","svelte-11u0xtc")},m(u,p){A(u,n,p),a(n,t),a(t,s),a(t,i),a(t,r),a(t,c),a(t,o),a(o,f)},p(u,[p]){p&1&&S(o,"backdrop-filter","blur("+u[0]+"px)")},i:y,o:y,d(u){u&&C(n)}}}function Wt(e,n,t){let s,i=N(0,{duration:2e3});return D(e,i,r=>t(0,s=r)),V(()=>{i.set(15)}),[s,i]}class Bt extends q{constructor(n){super(),j(this,n,Wt,Ut,T,{})}}function Kt(e){let n,t,s,i,r,c,o,f,u,p,h;return{c(){n=d("main"),t=d("div"),s=d("p"),s.textContent="Short Film",i=_(),r=d("p"),r.textContent="Vassar",c=_(),o=d("p"),f=k("One night I had a dream that was quite scenic so my friends and I checked out a fancy camera, asked two talented dancers to dance, and made a film. This film happened to win first place at the Vassar Film Festival!"),u=_(),p=d("iframe"),l(s,"id","hi-text"),l(s,"class","svelte-4vqxis"),l(r,"id","name-text"),l(r,"class","svelte-4vqxis"),l(o,"id","sub-name-text"),S(o,"backdrop-filter","blur("+e[0]+"px)"),l(o,"class","svelte-4vqxis"),l(t,"id","title-block"),l(t,"class","svelte-4vqxis"),l(p,"title","video"),l(p,"class","mounted-image svelte-4vqxis"),L(p.src,h="https://www.youtube.com/embed/E9OQo9YBNcI")||l(p,"src",h),l(p,"frameborder","0"),p.allowFullscreen=!0},m(m,g){A(m,n,g),a(n,t),a(t,s),a(t,i),a(t,r),a(t,c),a(t,o),a(o,f),a(n,u),a(n,p)},p(m,[g]){g&1&&S(o,"backdrop-filter","blur("+m[0]+"px)")},i:y,o:y,d(m){m&&C(n)}}}function Yt(e,n,t){let s,i=N(0,{duration:2e3});return D(e,i,r=>t(0,s=r)),V(()=>{i.set(15)}),[s,i]}class Gt extends q{constructor(n){super(),j(this,n,Yt,Kt,T,{})}}function Jt(e){let n,t,s,i,r,c,o,f,u,p,h;return{c(){n=d("main"),t=d("div"),s=d("p"),s.textContent="Satire",i=_(),r=d("p"),r.textContent="Vassar",c=_(),o=d("p"),f=k("I got an idea for a dumb joke, got my friend to act, and now it's a reality."),u=_(),p=d("iframe"),l(s,"id","hi-text"),l(s,"class","svelte-4vqxis"),l(r,"id","name-text"),l(r,"class","svelte-4vqxis"),l(o,"id","sub-name-text"),S(o,"backdrop-filter","blur("+e[0]+"px)"),l(o,"class","svelte-4vqxis"),l(t,"id","title-block"),l(t,"class","svelte-4vqxis"),l(p,"title","video"),l(p,"class","mounted-image svelte-4vqxis"),L(p.src,h="https://www.youtube.com/embed/JzvUG1MI-m4")||l(p,"src",h),l(p,"frameborder","0"),p.allowFullscreen=!0},m(m,g){A(m,n,g),a(n,t),a(t,s),a(t,i),a(t,r),a(t,c),a(t,o),a(o,f),a(n,u),a(n,p)},p(m,[g]){g&1&&S(o,"backdrop-filter","blur("+m[0]+"px)")},i:y,o:y,d(m){m&&C(n)}}}function Xt(e,n,t){let s,i=N(0,{duration:2e3});return D(e,i,r=>t(0,s=r)),V(()=>{i.set(15)}),[s,i]}class Qt extends q{constructor(n){super(),j(this,n,Xt,Jt,T,{})}}function Zt(e){let n,t,s,i,r,c,o,f,u,p,h;return{c(){n=d("main"),t=d("div"),s=d("p"),s.textContent="Pizza Reviews",i=_(),r=d("p"),r.textContent="Vassar",c=_(),o=d("p"),f=k("My roomate and I freshman wanted videos to document our time in college. We found pizza reviews to be a perfect medium. We've regularly been reviewing the Vassar College Pizza at the Deece ever since. I've embed one of our videos from a notable day."),u=_(),p=d("iframe"),l(s,"id","hi-text"),l(s,"class","svelte-4vqxis"),l(r,"id","name-text"),l(r,"class","svelte-4vqxis"),l(o,"id","sub-name-text"),S(o,"backdrop-filter","blur("+e[0]+"px)"),l(o,"class","svelte-4vqxis"),l(t,"id","title-block"),l(t,"class","svelte-4vqxis"),l(p,"title","video"),l(p,"class","mounted-image svelte-4vqxis"),L(p.src,h="https://www.youtube.com/embed/B5Zf6qH5Ltc")||l(p,"src",h),l(p,"frameborder","0"),p.allowFullscreen=!0},m(m,g){A(m,n,g),a(n,t),a(t,s),a(t,i),a(t,r),a(t,c),a(t,o),a(o,f),a(n,u),a(n,p)},p(m,[g]){g&1&&S(o,"backdrop-filter","blur("+m[0]+"px)")},i:y,o:y,d(m){m&&C(n)}}}function en(e,n,t){let s,i=N(0,{duration:2e3});return D(e,i,r=>t(0,s=r)),V(()=>{i.set(15)}),[s,i]}class tn extends q{constructor(n){super(),j(this,n,en,Zt,T,{})}}function nn(e){let n,t,s,i,r,c,o,f;return{c(){n=d("main"),t=d("div"),s=d("p"),s.textContent="Slarm",i=_(),r=d("p"),r.textContent="Vassar Ongoing",c=_(),o=d("p"),f=k('I am collaborating with a professor at Vassar on the development of a robot arm made from a slinky, which we affectionately refer to as the "Slarm." This unique robotic arm is designed to possess infinite degrees of freedom, and it is expected to exhibit intriguing properties that distinguish it from other snake-arm robots, primarily because it comprises a single continuous surface.'),l(s,"id","hi-text"),l(s,"class","svelte-1vsu44s"),l(r,"id","name-text"),l(r,"class","svelte-1vsu44s"),l(o,"id","sub-name-text"),S(o,"backdrop-filter","blur("+e[0]+"px)"),l(o,"class","svelte-1vsu44s"),l(t,"id","title-block"),l(t,"class","svelte-1vsu44s")},m(u,p){A(u,n,p),a(n,t),a(t,s),a(t,i),a(t,r),a(t,c),a(t,o),a(o,f)},p(u,[p]){p&1&&S(o,"backdrop-filter","blur("+u[0]+"px)")},i:y,o:y,d(u){u&&C(n)}}}function sn(e,n,t){let s,i=N(0,{duration:2e3});return D(e,i,r=>t(0,s=r)),V(()=>{i.set(15)}),[s,i]}class rn extends q{constructor(n){super(),j(this,n,sn,nn,T,{})}}function ln(e){let n,t,s,i,r,c,o,f,u,p,h,m;return{c(){n=d("main"),t=d("div"),s=d("div"),i=d("p"),i.textContent="Turtle Predator Robot",r=_(),c=d("p"),c.textContent="Vassar",o=_(),f=d("p"),u=k("As part of an autonomous robot competition, I worked on a team of four to design a robot to capture a robotic turtle navigating an obstacle-filled arena. Using machine vision, our robot located and pursued the turtle, ultimately capturing it with a descending arm. To confirm the capture and distinguish it from obstacles, we employed an accelerometer to detect the turtle's movements. Additionally, a gyro assisted in arena navigation. Despite obstacles sharing the same color as the turtle, our shape-based filtering techniques allowed us to excel beyond expectations."),p=_(),h=d("img"),l(i,"id","hi-text"),l(i,"class","svelte-1pe4p0g"),l(c,"id","name-text"),l(c,"class","svelte-1pe4p0g"),l(f,"id","sub-name-text"),S(f,"backdrop-filter","blur("+e[0]+"px)"),l(f,"class","svelte-1pe4p0g"),l(s,"id","title-block"),l(s,"class","svelte-1pe4p0g"),l(h,"class","mounted-image svelte-1pe4p0g"),L(h.src,m="/TurtleRobot.png")||l(h,"src",m),l(h,"alt","RobotRender"),l(t,"id","content-container"),l(t,"class","svelte-1pe4p0g")},m(g,b){A(g,n,b),a(n,t),a(t,s),a(s,i),a(s,r),a(s,c),a(s,o),a(s,f),a(f,u),a(t,p),a(t,h)},p(g,[b]){b&1&&S(f,"backdrop-filter","blur("+g[0]+"px)")},i:y,o:y,d(g){g&&C(n)}}}function on(e,n,t){let s,i=N(0,{duration:2e3});return D(e,i,r=>t(0,s=r)),V(()=>{i.set(15)}),[s,i]}class an extends q{constructor(n){super(),j(this,n,on,ln,T,{})}}function cn(e){let n,t,s,i,r,c,o,f,u,p,h,m,g,b;return{c(){n=d("main"),t=d("div"),s=d("div"),i=d("p"),i.textContent="Covid 3D Printing",r=_(),c=d("p"),c.textContent="2020",o=_(),f=d("p"),u=k("With grants from Southington Community Cultural Arts and the Southington Arts and Crafts Association, my two friends and I transformed an abandoned bar into a 3D printing facility. Together, we manufactured thousands of vital personal protective equipment items, donating them to nearby hospitals. Our hometown provided the space for this inspiring effort."),p=_(),h=d("a"),h.innerHTML='<p id="last-word" class="svelte-10de9yl">View The Article</p>',m=_(),g=d("img"),l(i,"id","hi-text"),l(i,"class","svelte-10de9yl"),l(c,"id","name-text"),l(c,"class","svelte-10de9yl"),l(f,"id","sub-name-text"),S(f,"backdrop-filter","blur("+e[0]+"px)"),l(f,"class","svelte-10de9yl"),l(h,"href","https://www.myrecordjournal.com/News/Southington/Southington-News/SOCCA-grant-funds-local-faceshield-printing-efforts.html#gallery-9"),l(s,"id","title-block"),l(s,"class","svelte-10de9yl"),l(g,"class","mounted-image svelte-10de9yl"),L(g.src,b="/COVID.jpg")||l(g,"src",b),l(g,"alt","3D printers in an abandoned bar"),l(t,"id","content-container"),l(t,"class","svelte-10de9yl")},m(v,w){A(v,n,w),a(n,t),a(t,s),a(s,i),a(s,r),a(s,c),a(s,o),a(s,f),a(f,u),a(s,p),a(s,h),a(t,m),a(t,g)},p(v,[w]){w&1&&S(f,"backdrop-filter","blur("+v[0]+"px)")},i:y,o:y,d(v){v&&C(n)}}}function un(e,n,t){let s,i=N(0,{duration:2e3});return D(e,i,r=>t(0,s=r)),V(()=>{i.set(15)}),[s,i]}class fn extends q{constructor(n){super(),j(this,n,un,cn,T,{})}}function dn(e){let n,t,s,i,r,c,o,f,u,p,h,m;return{c(){n=d("main"),t=d("div"),s=d("div"),i=d("p"),i.textContent="First Robotics",r=_(),c=d("p"),c.textContent="UHSSE 2017-2021",o=_(),f=d("p"),u=k("During my time with Team 1991 Dragons in First Robotics, I transitioned from programming lead to electrical lead and eventually team captain, gaining valuable experience in team management and integration. We utilized OpenCV, LabVIEW, Java, Python, and electronics, along with CAD and 3D printing. I am most proud of us receiving the Autonomous Systems Award for our robot's precise machine vision and machine learning-assisted performance. Over four years, we built three 125-pound robots, tackled various challenges, and fostered collaboration between experienced engineers and newcomers."),p=_(),h=d("img"),l(i,"id","hi-text"),l(i,"class","svelte-1pe4p0g"),l(c,"id","name-text"),l(c,"class","svelte-1pe4p0g"),l(f,"id","sub-name-text"),S(f,"backdrop-filter","blur("+e[0]+"px)"),l(f,"class","svelte-1pe4p0g"),l(s,"id","title-block"),l(s,"class","svelte-1pe4p0g"),l(h,"class","mounted-image svelte-1pe4p0g"),L(h.src,m="/robot1991.jpg")||l(h,"src",m),l(h,"alt","RobotPhoto"),l(t,"id","content-container"),l(t,"class","svelte-1pe4p0g")},m(g,b){A(g,n,b),a(n,t),a(t,s),a(s,i),a(s,r),a(s,c),a(s,o),a(s,f),a(f,u),a(t,p),a(t,h)},p(g,[b]){b&1&&S(f,"backdrop-filter","blur("+g[0]+"px)")},i:y,o:y,d(g){g&&C(n)}}}function pn(e,n,t){let s,i=N(0,{duration:2e3});return D(e,i,r=>t(0,s=r)),V(()=>{i.set(15)}),[s,i]}class mn extends q{constructor(n){super(),j(this,n,pn,dn,T,{})}}function Ie(e,n,t){const s=e.slice();return s[12]=n[t],s[14]=t,s}function Ee(e){let n,t,s,i;var r=e[4][e[0]][e[1]];function c(o,f){return{}}return r&&(t=Se(r,c())),{c(){n=d("div"),t&&ge(t.$$.fragment),l(n,"class","containerMain svelte-dfmnmk")},m(o,f){A(o,n,f),t&&ce(t,n,null),i=!0},p(o,f){if(f&3&&r!==(r=o[4][o[0]][o[1]])){if(t){Ue();const u=t;se(u.$$.fragment,1,0,()=>{ue(u,1)}),We()}r?(t=Se(r,c()),ge(t.$$.fragment),J(t.$$.fragment,1),ce(t,n,null)):t=null}},i(o){i||(t&&J(t.$$.fragment,o),o&&(s||ne(()=>{s=ft(n,Dt,{y:-200,duration:200}),s.start()})),i=!0)},o(o){t&&se(t.$$.fragment,o),i=!1},d(o){o&&C(n),t&&ue(t)}}}function Pe(e){let n,t=e[12]+"",s,i,r,c;function o(){return e[11](e[14])}return{c(){n=d("button"),s=k(t),i=_(),l(n,"class","svelte-dfmnmk"),F(n,"active",e[3]===e[14])},m(f,u){A(f,n,u),a(n,s),a(n,i),r||(c=Z(n,"click",o),r=!0)},p(f,u){e=f,u&1&&t!==(t=e[12]+"")&&E(s,t),u&8&&F(n,"active",e[3]===e[14])},d(f){f&&C(n),r=!1,c()}}}function hn(e){let n,t=e[1],s,i,r,c,o,f,u,p,h,m,g,b,v,w,x=Ee(e),M=je(e[5][e[0]]),O=[];for(let $=0;$<M.length;$+=1)O[$]=Pe(Ie(e,M,$));return{c(){n=d("main"),x.c(),s=_(),i=d("nav");for(let $=0;$<O.length;$+=1)O[$].c();r=_(),c=d("nav"),o=d("button"),o.textContent="Home",f=_(),u=d("button"),u.textContent="Projects",p=_(),h=d("button"),h.textContent="Experiences",m=_(),g=d("button"),g.textContent="Contact",l(i,"class","vnavbar svelte-dfmnmk"),l(o,"class","svelte-dfmnmk"),F(o,"active",e[2]===0),l(u,"class","svelte-dfmnmk"),F(u,"active",e[2]===1),l(h,"class","svelte-dfmnmk"),F(h,"active",e[2]===2),l(g,"class","svelte-dfmnmk"),F(g,"active",e[2]===3),l(c,"class","navbar svelte-dfmnmk")},m($,R){A($,n,R),x.m(n,null),a(n,s),a(n,i);for(let I=0;I<O.length;I+=1)O[I]&&O[I].m(i,null);a(n,r),a(n,c),a(c,o),a(c,f),a(c,u),a(c,p),a(c,h),a(c,m),a(c,g),b=!0,v||(w=[Z(o,"click",e[6]),Z(u,"click",e[7]),Z(h,"click",e[8]),Z(g,"click",e[9])],v=!0)},p($,[R]){if(R&2&&T(t,t=$[1])?(Ue(),se(x,1,1,y),We(),x=Ee($),x.c(),J(x,1),x.m(n,s)):x.p($,R),R&1065){M=je($[5][$[0]]);let I;for(I=0;I<M.length;I+=1){const we=Ie($,M,I);O[I]?O[I].p(we,R):(O[I]=Pe(we),O[I].c(),O[I].m(i,null))}for(;I<O.length;I+=1)O[I].d(1);O.length=M.length}(!b||R&4)&&F(o,"active",$[2]===0),(!b||R&4)&&F(u,"active",$[2]===1),(!b||R&4)&&F(h,"active",$[2]===2),(!b||R&4)&&F(g,"active",$[2]===3)},i($){b||(J(x),b=!0)},o($){se(x),b=!1},d($){$&&C(n),x.d($),Qe(O,$),v=!1,X(w)}}}function gn(e,n,t){let s={0:[yt,Bt],1:[$t,Ft,rn,an,zt,Gt,Qt,tn],2:[Ct,Et,Mt,mn,fn],3:[Ot]},i={0:["Home","About"],1:["Projects","Ornithopter","Slarm","TurtleBot","Website","Valse d'eclairage","Satire","Vassar Pizza Daily!"],2:["Experiences","Knot Theory","Harper","First Robotics","Covid"],3:["Contact"]},r=0,c=0,o=0,f=0;window.addEventListener("keyup",v=>{if(v.key=="ArrowRight")t(1,f=0),t(0,r=(r+1)%Object.keys(s).length),H.set(r);else if(v.key=="ArrowLeft")t(1,f=0),r==0?(t(0,r=Object.keys(s).length-1),H.set(r)):(t(0,r=(r-1)%Object.keys(s).length),H.set(r));else if(v.key==="ArrowUp"||v.key==="ArrowDown"){const w=i[r].length;w>0&&(v.key==="ArrowUp"?t(1,f=(f-1+w)%w):t(1,f=(f+1)%w))}console.log(r)}),window.addEventListener("wheel",v=>{v.deltaY<-100?t(1,f=(f+1)%i[r].length):v.deltaY>100&&(f==0?t(1,f=i[r].length-1):t(1,f=(f-1)%i[r].length))});function u(){t(0,r=0),t(1,f=0),H.set(r),t(1,f=0)}function p(){t(0,r=1),t(1,f=0),H.set(r),t(1,f=0)}function h(){t(0,r=2),t(1,f=0),H.set(r)}function m(){t(0,r=3),t(1,f=0),H.set(r)}function g(v){console.log(v),t(1,f=v)}const b=v=>g(v);return e.$$.update=()=>{e.$$.dirty&1&&t(2,c=r),e.$$.dirty&2&&t(3,o=f),e.$$.dirty&1&&document.documentElement.style.setProperty("--vnavbar-button-count",s[r].length)},[r,f,c,o,s,i,u,p,h,m,g,b]}class bn extends q{constructor(n){super(),j(this,n,gn,hn,T,{})}}new bn({target:document.getElementById("app")});