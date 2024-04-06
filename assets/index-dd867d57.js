var Be=Object.defineProperty;var Ke=(t,n,e)=>n in t?Be(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e;var fe=(t,n,e)=>(Ke(t,typeof n!="symbol"?n+"":n,e),e);(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();function y(){}const Ve=t=>t;function xe(t,n){for(const e in n)t[e]=n[e];return t}function Re(t){return t()}function ke(){return Object.create(null)}function X(t){t.forEach(Re)}function ve(t){return typeof t=="function"}function T(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}let re;function F(t,n){return t===n?!0:(re||(re=document.createElement("a")),re.href=n,t===re.href)}function Ye(t){return Object.keys(t).length===0}function Ge(t,...n){if(t==null){for(const s of n)s(void 0);return y}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function j(t,n,e){t.$$.on_destroy.push(Ge(n,e))}function $e(t){const n=typeof t=="string"&&t.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);return n?[parseFloat(n[1]),n[2]||"px"]:[t,"px"]}const je=typeof window<"u";let De=je?()=>window.performance.now():()=>Date.now(),_e=je?t=>requestAnimationFrame(t):y;const Y=new Set;function Fe(t){Y.forEach(n=>{n.c(t)||(Y.delete(n),n.f())}),Y.size!==0&&_e(Fe)}function Ne(t){let n;return Y.size===0&&_e(Fe),{promise:new Promise(e=>{Y.add(n={c:t,f:e})}),abort(){Y.delete(n)}}}function a(t,n){t.appendChild(n)}function Le(t){if(!t)return document;const n=t.getRootNode?t.getRootNode():t.ownerDocument;return n&&n.host?n:t.ownerDocument}function Je(t){const n=p("style");return n.textContent="/* empty */",Xe(Le(t),n),n.sheet}function Xe(t,n){return a(t.head||t,n),n.sheet}function A(t,n,e){t.insertBefore(n,e||null)}function S(t){t.parentNode&&t.parentNode.removeChild(t)}function Ze(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function p(t){return document.createElement(t)}function x(t){return document.createTextNode(t)}function _(){return x(" ")}function Q(t,n,e,s){return t.addEventListener(n,e,s),()=>t.removeEventListener(n,e,s)}function l(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function Qe(t){return Array.from(t.childNodes)}function M(t,n){n=""+n,t.data!==n&&(t.data=n)}function C(t,n,e,s){e==null?t.style.removeProperty(n):t.style.setProperty(n,e,s?"important":"")}function L(t,n,e){t.classList.toggle(n,!!e)}function et(t,n,{bubbles:e=!1,cancelable:s=!1}={}){return new CustomEvent(t,{detail:n,bubbles:e,cancelable:s})}function Ce(t,n){return new t(n)}const oe=new Map;let ae=0;function tt(t){let n=5381,e=t.length;for(;e--;)n=(n<<5)-n^t.charCodeAt(e);return n>>>0}function nt(t,n){const e={stylesheet:Je(n),rules:{}};return oe.set(t,e),e}function st(t,n,e,s,i,r,c,o=0){const f=16.666/s;let u=`{
`;for(let w=0;w<=1;w+=f){const k=n+(e-n)*r(w);u+=w*100+`%{${c(k,1-k)}}
`}const m=u+`100% {${c(e,1-e)}}
}`,h=`__svelte_${tt(m)}_${o}`,d=Le(t),{stylesheet:g,rules:b}=oe.get(d)||nt(d,t);b[h]||(b[h]=!0,g.insertRule(`@keyframes ${h} ${m}`,g.cssRules.length));const v=t.style.animation||"";return t.style.animation=`${v?`${v}, `:""}${h} ${s}ms linear ${i}ms 1 both`,ae+=1,h}function Se(t,n){const e=(t.style.animation||"").split(", "),s=e.filter(n?r=>r.indexOf(n)<0:r=>r.indexOf("__svelte")===-1),i=e.length-s.length;i&&(t.style.animation=s.join(", "),ae-=i,ae||it())}function it(){_e(()=>{ae||(oe.forEach(t=>{const{ownerNode:n}=t.stylesheet;n&&S(n)}),oe.clear())})}let te;function ee(t){te=t}function He(){if(!te)throw new Error("Function called outside component initialization");return te}function E(t){He().$$.on_mount.push(t)}function ie(t){He().$$.on_destroy.push(t)}const K=[],Te=[];let G=[];const Ae=[],rt=Promise.resolve();let he=!1;function lt(){he||(he=!0,rt.then(ze))}function ne(t){G.push(t)}const de=new Set;let W=0;function ze(){if(W!==0)return;const t=te;do{try{for(;W<K.length;){const n=K[W];W++,ee(n),ot(n.$$)}}catch(n){throw K.length=0,W=0,n}for(ee(null),K.length=0,W=0;Te.length;)Te.pop()();for(let n=0;n<G.length;n+=1){const e=G[n];de.has(e)||(de.add(e),e())}G.length=0}while(K.length);for(;Ae.length;)Ae.pop()();he=!1,de.clear(),ee(t)}function ot(t){if(t.fragment!==null){t.update(),X(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(ne)}}function at(t){const n=[],e=[];G.forEach(s=>t.indexOf(s)===-1?n.push(s):e.push(s)),e.forEach(s=>s()),G=n}let Z;function ct(){return Z||(Z=Promise.resolve(),Z.then(()=>{Z=null})),Z}function qe(t,n,e){t.dispatchEvent(et(`${n?"intro":"outro"}${e}`))}const le=new Set;let U;function Ue(){U={r:0,c:[],p:U}}function We(){U.r||X(U.c),U=U.p}function J(t,n){t&&t.i&&(le.delete(t),t.i(n))}function se(t,n,e,s){if(t&&t.o){if(le.has(t))return;le.add(t),U.c.push(()=>{le.delete(t),s&&(e&&t.d(1),s())}),t.o(n)}else s&&s()}const ut={duration:0};function ft(t,n,e){const s={direction:"in"};let i=n(t,e,s),r=!1,c,o,f=0;function u(){c&&Se(t,c)}function m(){const{delay:d=0,duration:g=300,easing:b=Ve,tick:v=y,css:w}=i||ut;w&&(c=st(t,0,1,g,d,b,w,f++)),v(0,1);const k=De()+d,R=k+g;o&&o.abort(),r=!0,ne(()=>qe(t,!0,"start")),o=Ne(q=>{if(r){if(q>=R)return v(1,0),qe(t,!0,"end"),u(),r=!1;if(q>=k){const $=b((q-k)/g);v($,1-$)}}return r})}let h=!1;return{start(){h||(h=!0,Se(t),ve(i)?(i=i(s),ct().then(m)):m())},invalidate(){h=!1},end(){r&&(u(),r=!1)}}}function Ie(t){return(t==null?void 0:t.length)!==void 0?t:Array.from(t)}function ge(t){t&&t.c()}function ce(t,n,e){const{fragment:s,after_update:i}=t.$$;s&&s.m(n,e),ne(()=>{const r=t.$$.on_mount.map(Re).filter(ve);t.$$.on_destroy?t.$$.on_destroy.push(...r):X(r),t.$$.on_mount=[]}),i.forEach(ne)}function ue(t,n){const e=t.$$;e.fragment!==null&&(at(e.after_update),X(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function dt(t,n){t.$$.dirty[0]===-1&&(K.push(t),lt(),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function I(t,n,e,s,i,r,c,o=[-1]){const f=te;ee(t);const u=t.$$={fragment:null,ctx:[],props:r,update:y,not_equal:i,bound:ke(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(f?f.$$.context:[])),callbacks:ke(),dirty:o,skip_bound:!1,root:n.target||f.$$.root};c&&c(u.root);let m=!1;if(u.ctx=e?e(t,n.props||{},(h,d,...g)=>{const b=g.length?g[0]:d;return u.ctx&&i(u.ctx[h],u.ctx[h]=b)&&(!u.skip_bound&&u.bound[h]&&u.bound[h](b),m&&dt(t,h)),d}):[],u.update(),m=!0,X(u.before_update),u.fragment=s?s(u.ctx):!1,n.target){if(n.hydrate){const h=Qe(n.target);u.fragment&&u.fragment.l(h),h.forEach(S)}else u.fragment&&u.fragment.c();n.intro&&J(t.$$.fragment),ce(t,n.target,n.anchor),ze()}ee(f)}class O{constructor(){fe(this,"$$");fe(this,"$$set")}$destroy(){ue(this,1),this.$destroy=y}$on(n,e){if(!ve(e))return y;const s=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return s.push(e),()=>{const i=s.indexOf(e);i!==-1&&s.splice(i,1)}}$set(n){this.$$set&&!Ye(n)&&(this.$$.skip_bound=!0,this.$$set(n),this.$$.skip_bound=!1)}}const pt="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(pt);const B=[];function ye(t,n=y){let e;const s=new Set;function i(o){if(T(t,o)&&(t=o,e)){const f=!B.length;for(const u of s)u[1](),B.push(u,t);if(f){for(let u=0;u<B.length;u+=2)B[u][0](B[u+1]);B.length=0}}}function r(o){i(o(t))}function c(o,f=y){const u=[o,f];return s.add(u),s.size===1&&(e=n(i,r)||y),o(t),()=>{s.delete(u),s.size===0&&e&&(e(),e=null)}}return{set:i,update:r,subscribe:c}}const z=ye(["","","",""]),H=ye(0);function mt(t){let n,e;return{c(){n=p("span"),e=x(t[0]),l(n,"id","flytext"),l(n,"class","svelte-1wd2v0g")},m(s,i){A(s,n,i),a(n,e)},p(s,[i]){i&1&&M(e,s[0])},i:y,o:y,d(s){s&&S(n)}}}function ht(t){let n=[t.length];for(let e=0;e<t.length;e++)n[e]=e;return n.sort(()=>Math.random()-.5),n}function gt(t,n,e){let s=["             ","Mathematician","Roboticist   ","Developer    ","Musician     ","Student      ","Human        "],i=s[0],r=s[0],c=0,o=0,f=!1,u=[],m,h;function d(){z.subscribe(g=>{h=g}),z.set([h[0],h[1],h[2],i]),i==s[c]?(i=="Mathematician"&&c==1&&(s.shift(),c=0),r=s[c],c=(c+1)%s.length,u=ht(s[c]),o=0,i=="             "?m=setTimeout(d,10):m=setTimeout(d,3e3)):f?(o==13?e(0,i=i.substring(0,u[o])+s[c][u[o]]):e(0,i=i.substring(0,u[o])+s[c][u[o]]+i.substring(u[o]+1)),o++,f=!1,m=setTimeout(d,55)):r[u[o]]==s[c][u[o]]?(f=!0,setTimeout(d,0)):o==13?(e(0,i=i.substring(0,u[o])+"■"),f=!0,m=setTimeout(d,55)):(e(0,i=i.substring(0,u[o])+"■"+i.substring(u[o]+1)),f=!0,m=setTimeout(d,55))}return E(d),ie(()=>clearTimeout(m)),[i]}class bt extends O{constructor(n){super(),I(this,n,gt,mt,T,{})}}let pe,me;function V(t,n,e,s){if(console.log(s),H.subscribe(r=>{me=r}),s!==me)return console.log(s,me),t;t.length!==n.length&&(t.length>n.length?n+=" ".repeat(t.length-n.length):t+=" ".repeat(n.length-t.length)),z.subscribe(r=>{pe=r}),pe[e]=t.trim()+" ",z.set(pe);let i=[];if(t===n)return t.trim();if(t.search("■")===-1){for(let c=0;c<t.length;c++)t[c]!==n[c]&&i.push(c);let r=i[Math.floor(Math.random()*i.length)];setTimeout(V,40,t.substring(0,r)+"■"+(r==t.length-1?"":t.substring(r+1)),n,e,s)}else setTimeout(V,40,t.replace("■",n[t.search("■")]),n,e,s)}function vt(t){let n,e,s,i,r,c,o,f,u,m,h,d;return h=new bt({}),{c(){n=p("main"),e=p("div"),s=p("p"),i=x(t[2]),r=_(),c=p("p"),o=x(t[1]),f=_(),u=p("p"),m=x(t[0]),ge(h.$$.fragment),l(s,"id","hi-text"),l(s,"class","svelte-10fmstn"),l(c,"id","name-text"),l(c,"class","svelte-10fmstn"),l(u,"id","sub-name-text"),l(u,"class","svelte-10fmstn"),l(e,"id","title-block"),l(e,"class","svelte-10fmstn")},m(g,b){A(g,n,b),a(n,e),a(e,s),a(s,i),a(e,r),a(e,c),a(c,o),a(e,f),a(e,u),a(u,m),ce(h,u,null),d=!0},p(g,[b]){(!d||b&4)&&M(i,g[2]),(!d||b&2)&&M(o,g[1]),(!d||b&1)&&M(m,g[0])},i(g){d||(J(h.$$.fragment,g),d=!0)},o(g){se(h.$$.fragment,g),d=!1},d(g){g&&S(n),ue(h)}}}function _t(t,n,e){let s,i,r,c=["","","",""];z.subscribe(f=>{e(3,c=f)});let o;return E(()=>{setTimeout(()=>{V(s,"Hi! My name is",0,0),V(i,"Drew Steindl",1,0),V(r,"I'm a ",2,0)})}),ie(()=>clearTimeout(o)),t.$$.update=()=>{t.$$.dirty&8&&e(2,s=c[0]),t.$$.dirty&8&&e(1,i=c[1]),t.$$.dirty&8&&e(0,r=c[2])},[r,i,s,c]}class yt extends O{constructor(n){super(),I(this,n,_t,vt,T,{})}}function wt(t){let n,e,s,i,r,c,o,f,u,m,h,d,g;return{c(){n=p("main"),e=p("div"),s=p("p"),i=x(t[3]),r=_(),c=p("p"),o=x(t[2]),f=_(),u=p("p"),m=x(t[1]),h=_(),d=p("p"),g=x(t[0]),l(s,"id","hi-text"),l(s,"class","svelte-8gs5dn"),l(c,"id","name-text"),l(c,"class","svelte-8gs5dn"),l(u,"id","sub-name-text"),l(u,"class","svelte-8gs5dn"),l(d,"id","last-word"),l(d,"class","svelte-8gs5dn"),l(e,"id","title-block"),l(e,"class","svelte-8gs5dn")},m(b,v){A(b,n,v),a(n,e),a(e,s),a(s,i),a(e,r),a(e,c),a(c,o),a(e,f),a(e,u),a(u,m),a(e,h),a(e,d),a(d,g)},p(b,[v]){v&8&&M(i,b[3]),v&4&&M(o,b[2]),v&2&&M(m,b[1]),v&1&&M(g,b[0])},i:y,o:y,d(b){b&&S(n)}}}function xt(t,n,e){let s,i,r,c,o=["","","",""],f;return z.subscribe(u=>{e(4,o=u)}),E(()=>{setTimeout(()=>{V(s,"Move Down to view some of my",0,1),V(i,"Projects",1,1),V(r,"Move right to",2,1),V(c,"Experiences",3,1)},10)}),ie(()=>clearTimeout(f)),t.$$.update=()=>{t.$$.dirty&16&&e(3,s=o[0]),t.$$.dirty&16&&e(2,i=o[1]),t.$$.dirty&16&&e(1,r=o[2]),t.$$.dirty&16&&e(0,c=o[3])},[c,r,i,s,o]}class kt extends O{constructor(n){super(),I(this,n,xt,wt,T,{})}}function $t(t){let n,e,s,i,r,c,o,f,u,m,h,d,g;return{c(){n=p("main"),e=p("div"),s=p("p"),i=x(t[3]),r=_(),c=p("p"),o=x(t[2]),f=_(),u=p("p"),m=x(t[1]),h=_(),d=p("p"),g=x(t[0]),l(s,"id","hi-text"),l(s,"class","svelte-ta2v34"),l(c,"id","name-text"),l(c,"class","svelte-ta2v34"),l(u,"id","sub-name-text"),l(u,"class","svelte-ta2v34"),l(d,"id","last-word"),l(d,"class","svelte-ta2v34"),l(e,"id","title-block"),l(e,"class","svelte-ta2v34")},m(b,v){A(b,n,v),a(n,e),a(e,s),a(s,i),a(e,r),a(e,c),a(c,o),a(e,f),a(e,u),a(u,m),a(e,h),a(e,d),a(d,g)},p(b,[v]){v&8&&M(i,b[3]),v&4&&M(o,b[2]),v&2&&M(m,b[1]),v&1&&M(g,b[0])},i:y,o:y,d(b){b&&S(n)}}}function Ct(t,n,e){let s,i,r,c,o=["","","",""],f;z.subscribe(m=>{e(4,o=m)});function u(){V(s,"Go Down to view my",0,2),V(i,"Experiences",1,2),V(r,"Move right to",2,2),V(c,"Contact",3,2)}return E(()=>{setTimeout(()=>{u()},10)}),ie(()=>clearTimeout(f)),t.$$.update=()=>{t.$$.dirty&16&&e(3,s=o[0]),t.$$.dirty&16&&e(2,i=o[1]),t.$$.dirty&16&&e(1,r=o[2]),t.$$.dirty&16&&e(0,c=o[3])},[c,r,i,s,o]}class St extends O{constructor(n){super(),I(this,n,Ct,$t,T,{})}}function Tt(t){let n,e,s,i,r,c,o,f,u,m,h,d,g,b,v,w;return{c(){n=p("main"),e=p("div"),s=p("p"),i=x(t[3]),r=_(),c=p("p"),o=x(t[2]),f=_(),u=p("a"),m=p("p"),h=x(t[1]),d=_(),g=p("p"),b=x(t[0]),v=_(),w=p("form"),w.innerHTML='<div class="form-group"><input type="text" name="name" placeholder="Name" class="svelte-15cwp1a"/> <input type="email" name="email" placeholder="Email" class="svelte-15cwp1a"/></div> <div class="form-group"><textarea style="height: 8vh;" name="message" placeholder="Message" rows="5" class="svelte-15cwp1a"></textarea></div> <div id="button-container"><button type="submit" class="svelte-15cwp1a">Send</button></div>',l(s,"id","hi-text"),l(s,"class","svelte-15cwp1a"),l(c,"id","name-text"),l(c,"class","svelte-15cwp1a"),l(m,"id","sub-name-text"),l(m,"class","svelte-15cwp1a"),l(u,"href","https://github.com/DrewPhi"),l(g,"id","last-word"),l(g,"class","svelte-15cwp1a"),l(w,"action","https://formspree.io/f/xaygpggk"),l(w,"method","POST"),l(w,"class","svelte-15cwp1a"),l(e,"id","title-block"),l(e,"class","svelte-15cwp1a")},m(k,R){A(k,n,R),a(n,e),a(e,s),a(s,i),a(e,r),a(e,c),a(c,o),a(e,f),a(e,u),a(u,m),a(m,h),a(e,d),a(e,g),a(g,b),a(e,v),a(e,w)},p(k,[R]){R&8&&M(i,k[3]),R&4&&M(o,k[2]),R&2&&M(h,k[1]),R&1&&M(b,k[0])},i:y,o:y,d(k){k&&S(n)}}}function At(t,n,e){let s,i,r,c,o=["","","",""],f;return z.subscribe(u=>{e(4,o=u)}),E(()=>{setTimeout(()=>{V(s,"Send your Pigeon!",0,3),V(i,"Contact",1,3),V(r,"Github",2,3),V(c,"",3,3)},10)}),ie(()=>clearTimeout(f)),t.$$.update=()=>{t.$$.dirty&16&&e(3,s=o[0]),t.$$.dirty&16&&e(2,i=o[1]),t.$$.dirty&16&&e(1,r=o[2]),t.$$.dirty&16&&e(0,c=o[3])},[c,r,i,s,o]}class qt extends O{constructor(n){super(),I(this,n,At,Tt,T,{})}}function Oe(t){return Object.prototype.toString.call(t)==="[object Date]"}function It(t){const n=t-1;return n*n*n+1}function be(t,n){if(t===n||t!==t)return()=>t;const e=typeof t;if(e!==typeof n||Array.isArray(t)!==Array.isArray(n))throw new Error("Cannot interpolate values of different type");if(Array.isArray(t)){const s=n.map((i,r)=>be(t[r],i));return i=>s.map(r=>r(i))}if(e==="object"){if(!t||!n)throw new Error("Object cannot be null");if(Oe(t)&&Oe(n)){t=t.getTime(),n=n.getTime();const r=n-t;return c=>new Date(t+c*r)}const s=Object.keys(n),i={};return s.forEach(r=>{i[r]=be(t[r],n[r])}),r=>{const c={};return s.forEach(o=>{c[o]=i[o](r)}),c}}if(e==="number"){const s=n-t;return i=>t+i*s}throw new Error(`Cannot interpolate ${e} values`)}function D(t,n={}){const e=ye(t);let s,i=t;function r(c,o){if(t==null)return e.set(t=c),Promise.resolve();i=c;let f=s,u=!1,{delay:m=0,duration:h=400,easing:d=Ve,interpolate:g=be}=xe(xe({},n),o);if(h===0)return f&&(f.abort(),f=null),e.set(t=i),Promise.resolve();const b=De()+m;let v;return s=Ne(w=>{if(w<b)return!0;u||(v=g(t,c),typeof h=="function"&&(h=h(t,c)),u=!0),f&&(f.abort(),f=null);const k=w-b;return k>h?(e.set(t=c),!1):(e.set(t=v(d(k/h))),!0)}),s.promise}return{set:r,update:(c,o)=>r(c(i,t),o),subscribe:e.subscribe}}function Ot(t){let n,e,s,i,r,c,o,f,u,m,h,d,g;return{c(){n=p("main"),e=p("div"),s=p("p"),s.textContent="Mathematics Research",i=_(),r=p("p"),r.textContent="Vassar Summer 2022",c=_(),o=p("p"),f=x("As a fellow at Vassar's URSI, I explored the genus distribution of two bridge knots on a team of five students. We had a successful summer with substantial results, and we presented our work at various conferences, including SUNY New Paltz and Mt. Holyoke. For more information, please see our paper, which we've submitted for publication."),u=_(),m=p("a"),m.innerHTML='<p id="last-word" class="svelte-1bqdt99">View Our Paper</p> <a></a>',h=_(),d=p("iframe"),l(s,"id","hi-text"),l(s,"class","svelte-1bqdt99"),l(r,"id","name-text"),l(r,"class","svelte-1bqdt99"),l(o,"id","sub-name-text"),C(o,"backdrop-filter","blur("+t[0]+"px)"),l(o,"class","svelte-1bqdt99"),l(m,"href","/PaperKnot.pdf"),l(e,"id","title-block"),l(e,"class","svelte-1bqdt99"),l(d,"title","pdf"),l(d,"id","pdf"),F(d.src,g="/PaperKnot.pdf")||l(d,"src",g),C(d,"width","30%"),C(d,"height","75%"),l(d,"frameborder","0"),l(d,"class","svelte-1bqdt99")},m(b,v){A(b,n,v),a(n,e),a(e,s),a(e,i),a(e,r),a(e,c),a(e,o),a(o,f),a(e,u),a(e,m),a(n,h),a(n,d)},p(b,[v]){v&1&&C(o,"backdrop-filter","blur("+b[0]+"px)")},i:y,o:y,d(b){b&&S(n)}}}function Et(t,n,e){let s,i=D(0,{duration:2e3});return j(t,i,r=>e(0,s=r)),E(()=>{i.set(15)}),[s,i]}class Pt extends O{constructor(n){super(),I(this,n,Et,Ot,T,{})}}function Mt(t){let n,e,s,i,r,c,o,f,u,m,h,d,g;return{c(){n=p("main"),e=p("div"),s=p("p"),s.textContent="Humanoid Robotics",i=_(),r=p("p"),r.textContent="Vassar Summer 2023",c=_(),o=p("p"),f=x("Again as an URSI fellow at Vassar, I worked on a team of two on a humanoid robot named Harper. Our job was to develop the hardware and software infrastructure for human-like perception and action. We designed and are implementing a custom control architecture, coordinating vision, language, and motor control systems. We've been working with Nvidia's Jetson AGX Orin, DepthAI, Ros2, MicroRos, Nvidia Riva SDK, Arduino, and more. This experience has become an ongoing project."),u=_(),m=p("a"),m.innerHTML='<p id="last-word" class="svelte-1qbd782">View Our Poster</p>',h=_(),d=p("iframe"),l(s,"id","hi-text"),l(s,"class","svelte-1qbd782"),l(r,"id","name-text"),l(r,"class","svelte-1qbd782"),l(o,"id","sub-name-text"),C(o,"backdrop-filter","blur("+t[0]+"px)"),l(o,"class","svelte-1qbd782"),l(m,"href","/URSI_26_KenLivingston_MichaelFerrante_AndrewJSteindl_flat.pdf"),l(e,"id","title-block"),l(e,"class","svelte-1qbd782"),l(d,"title","video"),l(d,"class","mounted-image svelte-1qbd782"),F(d.src,g="https://www.youtube.com/embed/mwKXxNulNms")||l(d,"src",g),l(d,"frameborder","0"),d.allowFullscreen=!0},m(b,v){A(b,n,v),a(n,e),a(e,s),a(e,i),a(e,r),a(e,c),a(e,o),a(o,f),a(e,u),a(e,m),a(n,h),a(n,d)},p(b,[v]){v&1&&C(o,"backdrop-filter","blur("+b[0]+"px)")},i:y,o:y,d(b){b&&S(n)}}}function Vt(t,n,e){let s,i=D(0,{duration:2e3});return j(t,i,r=>e(0,s=r)),E(()=>{i.set(15)}),[s,i]}class Rt extends O{constructor(n){super(),I(this,n,Vt,Mt,T,{})}}function jt(t,{delay:n=0,duration:e=400,easing:s=It,x:i=0,y:r=0,opacity:c=0}={}){const o=getComputedStyle(t),f=+o.opacity,u=o.transform==="none"?"":o.transform,m=f*(1-c),[h,d]=$e(i),[g,b]=$e(r);return{delay:n,duration:e,easing:s,css:(v,w)=>`
			transform: ${u} translate(${(1-v)*h}${d}, ${(1-v)*g}${b});
			opacity: ${f-m*w}`}}function Dt(t){let n,e,s,i,r,c,o,f,u,m;return{c(){n=p("main"),e=p("div"),s=p("p"),s.textContent="Modular Ornithopter",i=_(),r=p("p"),r.textContent="Vassar Ongoing",c=_(),o=p("p"),f=x("I've designed and constructed an open source biomimetic modular ornithopter with a professor here at Vassar. The ornithopter will let us test a perforated wing design based on real bird feathers. The wing passively opens up on the upstroke of a flap to allow air to pass through and closes on the downstroke just as real birds do. We will compare this wing design with a classical solid wing design to study its advantages and gain insights into the role feathers play in bird evolution. The ornithopter is powered by a 2S brushless motor and is predominantly 3D printed. I am hoping the expiriment will happen next semester."),u=_(),m=p("a"),m.innerHTML='<p id="last-word" class="svelte-10ts20s">How to Build it</p> <a></a> <img class="mounted-image svelte-10ts20s" src="/BirdPhoto.png" alt="3D printed Bird"/>',l(s,"id","hi-text"),l(s,"class","svelte-10ts20s"),l(r,"id","name-text"),l(r,"class","svelte-10ts20s"),l(o,"id","sub-name-text"),C(o,"backdrop-filter","blur("+t[0]+"px)"),l(o,"class","svelte-10ts20s"),l(m,"href","/Ornithopter_Public_Tutorial.pdf"),l(e,"id","title-block"),l(e,"class","svelte-10ts20s")},m(h,d){A(h,n,d),a(n,e),a(e,s),a(e,i),a(e,r),a(e,c),a(e,o),a(o,f),a(e,u),a(e,m)},p(h,[d]){d&1&&C(o,"backdrop-filter","blur("+h[0]+"px)")},i:y,o:y,d(h){h&&S(n)}}}function Ft(t,n,e){let s,i=D(0,{duration:2e3});return j(t,i,r=>e(0,s=r)),E(()=>{i.set(15)}),[s,i]}class Nt extends O{constructor(n){super(),I(this,n,Ft,Dt,T,{})}}function Lt(t){let n,e,s,i,r,c,o,f,u,m,h;return{c(){n=p("main"),e=p("div"),s=p("p"),s.textContent="This Website",i=_(),r=p("p"),r.textContent="Updated October 2023",c=_(),o=p("p"),f=x("I designed and created this website to have a place to log my projects and experiences. This was built with Svelte and Vite. The background of this website was made with p5.js and is a Perlin Noise FlowField. You can click to scramble the Noise!"),u=_(),m=p("iframe"),l(s,"id","hi-text"),l(s,"class","svelte-b8de69"),l(r,"id","name-text"),l(r,"class","svelte-b8de69"),l(o,"id","sub-name-text"),C(o,"backdrop-filter","blur("+t[0]+"px)"),l(o,"class","svelte-b8de69"),l(e,"id","title-block"),l(e,"class","svelte-b8de69"),l(m,"class","mounted-image svelte-b8de69"),F(m.src,h="https://drewphi.github.io/")||l(m,"src",h),l(m,"title","Website")},m(d,g){A(d,n,g),a(n,e),a(e,s),a(e,i),a(e,r),a(e,c),a(e,o),a(o,f),a(n,u),a(n,m)},p(d,[g]){g&1&&C(o,"backdrop-filter","blur("+d[0]+"px)")},i:y,o:y,d(d){d&&S(n)}}}function Ht(t,n,e){let s,i=D(0,{duration:2e3});return j(t,i,r=>e(0,s=r)),E(()=>{i.set(15)}),[s,i]}class zt extends O{constructor(n){super(),I(this,n,Ht,Lt,T,{})}}function Ut(t){let n,e,s,i,r,c,o,f,u,m,h,d,g;return{c(){n=p("main"),e=p("div"),s=p("p"),s.textContent="About Me!",i=_(),r=p("p"),r.textContent="Updated September 2023",c=_(),o=p("p"),f=x("Hi! I'm Drew, a student at Vassar College studying Pure and Applied Mathematics. I also have an unwavering enthusiasm for the world of Robotics. I've been learning, tinkering, and breaking things my whole life. Feel free to explore my portfolio to see what I've been up to :)"),u=_(),m=p("a"),m.innerHTML='<p id="last-word" class="svelte-1kl3mn2">My Resume</p>',h=_(),d=p("iframe"),l(s,"id","hi-text"),l(s,"class","svelte-1kl3mn2"),l(r,"id","name-text"),l(r,"class","svelte-1kl3mn2"),l(o,"id","sub-name-text"),C(o,"backdrop-filter","blur("+t[0]+"px)"),l(o,"class","svelte-1kl3mn2"),l(m,"href","/RESUMEFINAL.pdf"),l(e,"id","title-block"),l(e,"class","svelte-1kl3mn2"),l(d,"title","pdf"),l(d,"id","pdf"),F(d.src,g="/AlphaZeroKnot-4.pdf")||l(d,"src",g),C(d,"width","30%"),C(d,"height","75%"),l(d,"frameborder","0"),l(d,"class","svelte-1kl3mn2")},m(b,v){A(b,n,v),a(n,e),a(e,s),a(e,i),a(e,r),a(e,c),a(e,o),a(o,f),a(e,u),a(e,m),a(n,h),a(n,d)},p(b,[v]){v&1&&C(o,"backdrop-filter","blur("+b[0]+"px)")},i:y,o:y,d(b){b&&S(n)}}}function Wt(t,n,e){let s,i=D(0,{duration:2e3});return j(t,i,r=>e(0,s=r)),E(()=>{i.set(15)}),[s,i]}class Bt extends O{constructor(n){super(),I(this,n,Wt,Ut,T,{})}}function Kt(t){let n,e,s,i,r,c,o,f,u,m,h;return{c(){n=p("main"),e=p("div"),s=p("p"),s.textContent="Short Film",i=_(),r=p("p"),r.textContent="Vassar",c=_(),o=p("p"),f=x("One night I had a dream that was quite scenic so my friends and I checked out a fancy camera, asked two talented dancers to dance, and made a film. This film happened to win first place at the Vassar Film Festival!"),u=_(),m=p("iframe"),l(s,"id","hi-text"),l(s,"class","svelte-4vqxis"),l(r,"id","name-text"),l(r,"class","svelte-4vqxis"),l(o,"id","sub-name-text"),C(o,"backdrop-filter","blur("+t[0]+"px)"),l(o,"class","svelte-4vqxis"),l(e,"id","title-block"),l(e,"class","svelte-4vqxis"),l(m,"title","video"),l(m,"class","mounted-image svelte-4vqxis"),F(m.src,h="https://www.youtube.com/embed/E9OQo9YBNcI")||l(m,"src",h),l(m,"frameborder","0"),m.allowFullscreen=!0},m(d,g){A(d,n,g),a(n,e),a(e,s),a(e,i),a(e,r),a(e,c),a(e,o),a(o,f),a(n,u),a(n,m)},p(d,[g]){g&1&&C(o,"backdrop-filter","blur("+d[0]+"px)")},i:y,o:y,d(d){d&&S(n)}}}function Yt(t,n,e){let s,i=D(0,{duration:2e3});return j(t,i,r=>e(0,s=r)),E(()=>{i.set(15)}),[s,i]}class Gt extends O{constructor(n){super(),I(this,n,Yt,Kt,T,{})}}function Jt(t){let n,e,s,i,r,c,o,f,u,m,h;return{c(){n=p("main"),e=p("div"),s=p("p"),s.textContent="Satire",i=_(),r=p("p"),r.textContent="Vassar",c=_(),o=p("p"),f=x("I got an idea for a dumb joke, got my friend to act, and now it's a reality."),u=_(),m=p("iframe"),l(s,"id","hi-text"),l(s,"class","svelte-4vqxis"),l(r,"id","name-text"),l(r,"class","svelte-4vqxis"),l(o,"id","sub-name-text"),C(o,"backdrop-filter","blur("+t[0]+"px)"),l(o,"class","svelte-4vqxis"),l(e,"id","title-block"),l(e,"class","svelte-4vqxis"),l(m,"title","video"),l(m,"class","mounted-image svelte-4vqxis"),F(m.src,h="https://www.youtube.com/embed/JzvUG1MI-m4")||l(m,"src",h),l(m,"frameborder","0"),m.allowFullscreen=!0},m(d,g){A(d,n,g),a(n,e),a(e,s),a(e,i),a(e,r),a(e,c),a(e,o),a(o,f),a(n,u),a(n,m)},p(d,[g]){g&1&&C(o,"backdrop-filter","blur("+d[0]+"px)")},i:y,o:y,d(d){d&&S(n)}}}function Xt(t,n,e){let s,i=D(0,{duration:2e3});return j(t,i,r=>e(0,s=r)),E(()=>{i.set(15)}),[s,i]}class Zt extends O{constructor(n){super(),I(this,n,Xt,Jt,T,{})}}function Qt(t){let n,e,s,i,r,c,o,f,u,m,h;return{c(){n=p("main"),e=p("div"),s=p("p"),s.textContent="Pizza Reviews",i=_(),r=p("p"),r.textContent="Vassar",c=_(),o=p("p"),f=x("My roomate and I freshman year wanted videos to document our time in college. We found pizza reviews to be a perfect medium. We've regularly been reviewing the Vassar College Pizza at the Deece ever since. I've embed one of our videos from a notable day."),u=_(),m=p("iframe"),l(s,"id","hi-text"),l(s,"class","svelte-4vqxis"),l(r,"id","name-text"),l(r,"class","svelte-4vqxis"),l(o,"id","sub-name-text"),C(o,"backdrop-filter","blur("+t[0]+"px)"),l(o,"class","svelte-4vqxis"),l(e,"id","title-block"),l(e,"class","svelte-4vqxis"),l(m,"title","video"),l(m,"class","mounted-image svelte-4vqxis"),F(m.src,h="https://www.youtube.com/embed/B5Zf6qH5Ltc")||l(m,"src",h),l(m,"frameborder","0"),m.allowFullscreen=!0},m(d,g){A(d,n,g),a(n,e),a(e,s),a(e,i),a(e,r),a(e,c),a(e,o),a(o,f),a(n,u),a(n,m)},p(d,[g]){g&1&&C(o,"backdrop-filter","blur("+d[0]+"px)")},i:y,o:y,d(d){d&&S(n)}}}function en(t,n,e){let s,i=D(0,{duration:2e3});return j(t,i,r=>e(0,s=r)),E(()=>{i.set(15)}),[s,i]}class tn extends O{constructor(n){super(),I(this,n,en,Qt,T,{})}}function nn(t){let n,e,s,i,r,c,o,f;return{c(){n=p("main"),e=p("div"),s=p("p"),s.textContent="Slarm",i=_(),r=p("p"),r.textContent="Vassar Ongoing",c=_(),o=p("p"),f=x('I am collaborating with a professor at Vassar on the development of a robot arm made from a slinky, which we affectionately refer to as the "Slarm." This unique robotic arm is designed to possess infinite degrees of freedom, and it is expected to exhibit intriguing properties that distinguish it from other snake-arm robots, primarily because it comprises a single continuous surface.'),l(s,"id","hi-text"),l(s,"class","svelte-1vsu44s"),l(r,"id","name-text"),l(r,"class","svelte-1vsu44s"),l(o,"id","sub-name-text"),C(o,"backdrop-filter","blur("+t[0]+"px)"),l(o,"class","svelte-1vsu44s"),l(e,"id","title-block"),l(e,"class","svelte-1vsu44s")},m(u,m){A(u,n,m),a(n,e),a(e,s),a(e,i),a(e,r),a(e,c),a(e,o),a(o,f)},p(u,[m]){m&1&&C(o,"backdrop-filter","blur("+u[0]+"px)")},i:y,o:y,d(u){u&&S(n)}}}function sn(t,n,e){let s,i=D(0,{duration:2e3});return j(t,i,r=>e(0,s=r)),E(()=>{i.set(15)}),[s,i]}class rn extends O{constructor(n){super(),I(this,n,sn,nn,T,{})}}function ln(t){let n,e,s,i,r,c,o,f,u,m,h,d;return{c(){n=p("main"),e=p("div"),s=p("div"),i=p("p"),i.textContent="Turtle Predator Robot",r=_(),c=p("p"),c.textContent="Vassar",o=_(),f=p("p"),u=x("As part of an autonomous robot competition, I worked on a team of four to design a robot to capture a robotic turtle navigating an obstacle-filled arena. Using machine vision, our robot located and pursued the turtle, ultimately capturing it with a descending arm. To confirm the capture and distinguish it from obstacles, we employed an accelerometer to detect the turtle's movements. Additionally, a gyro assisted in arena navigation. Despite obstacles sharing the same color as the turtle, our shape-based filtering techniques allowed us to excel beyond expectations."),m=_(),h=p("img"),l(i,"id","hi-text"),l(i,"class","svelte-qgxc4a"),l(c,"id","name-text"),l(c,"class","svelte-qgxc4a"),l(f,"id","sub-name-text"),C(f,"backdrop-filter","blur("+t[0]+"px)"),l(f,"class","svelte-qgxc4a"),l(s,"id","title-block"),l(s,"class","svelte-qgxc4a"),l(h,"class","mounted-image svelte-qgxc4a"),F(h.src,d="/TurtleRobot.png")||l(h,"src",d),l(h,"alt","RobotRender"),l(e,"id","content-container"),l(e,"class","svelte-qgxc4a")},m(g,b){A(g,n,b),a(n,e),a(e,s),a(s,i),a(s,r),a(s,c),a(s,o),a(s,f),a(f,u),a(e,m),a(e,h)},p(g,[b]){b&1&&C(f,"backdrop-filter","blur("+g[0]+"px)")},i:y,o:y,d(g){g&&S(n)}}}function on(t,n,e){let s,i=D(0,{duration:2e3});return j(t,i,r=>e(0,s=r)),E(()=>{i.set(15)}),[s,i]}class an extends O{constructor(n){super(),I(this,n,on,ln,T,{})}}function cn(t){let n,e,s,i,r,c,o,f,u,m,h,d,g,b;return{c(){n=p("main"),e=p("div"),s=p("div"),i=p("p"),i.textContent="Covid 3D Printing",r=_(),c=p("p"),c.textContent="2020",o=_(),f=p("p"),u=x("With grants from Southington Community Cultural Arts and the Southington Arts and Crafts Association, my two friends and I transformed an abandoned bar into a 3D printing facility. Together, we manufactured thousands of vital personal protective equipment items, donating them to nearby hospitals. Our hometown provided the space for this inspiring effort."),m=_(),h=p("a"),h.innerHTML='<p id="last-word" class="svelte-10de9yl">View The Article</p>',d=_(),g=p("img"),l(i,"id","hi-text"),l(i,"class","svelte-10de9yl"),l(c,"id","name-text"),l(c,"class","svelte-10de9yl"),l(f,"id","sub-name-text"),C(f,"backdrop-filter","blur("+t[0]+"px)"),l(f,"class","svelte-10de9yl"),l(h,"href","https://www.myrecordjournal.com/News/Southington/Southington-News/SOCCA-grant-funds-local-faceshield-printing-efforts.html#gallery-9"),l(s,"id","title-block"),l(s,"class","svelte-10de9yl"),l(g,"class","mounted-image svelte-10de9yl"),F(g.src,b="/COVID.jpg")||l(g,"src",b),l(g,"alt","3D printers in an abandoned bar"),l(e,"id","content-container"),l(e,"class","svelte-10de9yl")},m(v,w){A(v,n,w),a(n,e),a(e,s),a(s,i),a(s,r),a(s,c),a(s,o),a(s,f),a(f,u),a(s,m),a(s,h),a(e,d),a(e,g)},p(v,[w]){w&1&&C(f,"backdrop-filter","blur("+v[0]+"px)")},i:y,o:y,d(v){v&&S(n)}}}function un(t,n,e){let s,i=D(0,{duration:2e3});return j(t,i,r=>e(0,s=r)),E(()=>{i.set(15)}),[s,i]}class fn extends O{constructor(n){super(),I(this,n,un,cn,T,{})}}function dn(t){let n,e,s,i,r,c,o,f,u,m,h,d;return{c(){n=p("main"),e=p("div"),s=p("div"),i=p("p"),i.textContent="First Robotics",r=_(),c=p("p"),c.textContent="UHSSE 2017-2021",o=_(),f=p("p"),u=x("During my time with Team 1991 Dragons in First Robotics, I transitioned from programming lead to electrical lead and eventually team captain, gaining valuable experience in team management and integration. We utilized OpenCV, LabVIEW, Java, Python, and electronics, along with CAD and 3D printing. I am most proud of us receiving the Autonomous Systems Award for our robot's precise machine vision and machine learning-assisted performance. Over four years, we built three 125-pound robots, tackled various challenges, and fostered collaboration between experienced engineers and newcomers."),m=_(),h=p("img"),l(i,"id","hi-text"),l(i,"class","svelte-1pe4p0g"),l(c,"id","name-text"),l(c,"class","svelte-1pe4p0g"),l(f,"id","sub-name-text"),C(f,"backdrop-filter","blur("+t[0]+"px)"),l(f,"class","svelte-1pe4p0g"),l(s,"id","title-block"),l(s,"class","svelte-1pe4p0g"),l(h,"class","mounted-image svelte-1pe4p0g"),F(h.src,d="/robot1991.jpg")||l(h,"src",d),l(h,"alt","RobotPhoto"),l(e,"id","content-container"),l(e,"class","svelte-1pe4p0g")},m(g,b){A(g,n,b),a(n,e),a(e,s),a(s,i),a(s,r),a(s,c),a(s,o),a(s,f),a(f,u),a(e,m),a(e,h)},p(g,[b]){b&1&&C(f,"backdrop-filter","blur("+g[0]+"px)")},i:y,o:y,d(g){g&&S(n)}}}function pn(t,n,e){let s,i=D(0,{duration:2e3});return j(t,i,r=>e(0,s=r)),E(()=>{i.set(15)}),[s,i]}class mn extends O{constructor(n){super(),I(this,n,pn,dn,T,{})}}function hn(t){let n,e,s,i,r,c,o,f,u,m,h;return{c(){n=p("main"),e=p("div"),s=p("p"),s.textContent="Flowplane 2023",i=_(),r=p("a"),r.textContent="https://flowplane.vercel.app/",c=_(),o=p("p"),f=x("My friend and I wanted to see animations of the dynamical systems we were learning about in class. We were unable to find a tool for this so we made our own. It takes any dynamical system and numerically finds and classifies fixed points. To do this properly we developed our own algorithm. There are a ton of settings giving the user complete control. If this web app fails to find a fixed point or classify it correctly you can increase its precision through settings. It also saves setting values in a link that you could send to people."),u=_(),m=p("iframe"),l(s,"id","hi-text"),l(s,"class","svelte-ruw711"),l(r,"href","https://flowplane.vercel.app/"),l(r,"id","name-text"),l(r,"class","svelte-ruw711"),l(o,"id","sub-name-text"),C(o,"backdrop-filter","blur("+t[0]+"px)"),l(o,"class","svelte-ruw711"),l(e,"id","title-block"),l(e,"class","svelte-ruw711"),l(m,"class","mounted-image svelte-ruw711"),F(m.src,h="https://flowplane.vercel.app/")||l(m,"src",h),l(m,"title","Website")},m(d,g){A(d,n,g),a(n,e),a(e,s),a(e,i),a(e,r),a(e,c),a(e,o),a(o,f),a(n,u),a(n,m)},p(d,[g]){g&1&&C(o,"backdrop-filter","blur("+d[0]+"px)")},i:y,o:y,d(d){d&&S(n)}}}function gn(t,n,e){let s,i=D(0,{duration:2e3});return j(t,i,r=>e(0,s=r)),E(()=>{i.set(15)}),[s,i]}class bn extends O{constructor(n){super(),I(this,n,gn,hn,T,{})}}function Ee(t,n,e){const s=t.slice();return s[12]=n[e],s[14]=e,s}function Pe(t){let n,e,s,i;var r=t[4][t[0]][t[1]];function c(o,f){return{}}return r&&(e=Ce(r,c())),{c(){n=p("div"),e&&ge(e.$$.fragment),l(n,"class","containerMain svelte-dfmnmk")},m(o,f){A(o,n,f),e&&ce(e,n,null),i=!0},p(o,f){if(f&3&&r!==(r=o[4][o[0]][o[1]])){if(e){Ue();const u=e;se(u.$$.fragment,1,0,()=>{ue(u,1)}),We()}r?(e=Ce(r,c()),ge(e.$$.fragment),J(e.$$.fragment,1),ce(e,n,null)):e=null}},i(o){i||(e&&J(e.$$.fragment,o),o&&(s||ne(()=>{s=ft(n,jt,{y:-200,duration:200}),s.start()})),i=!0)},o(o){e&&se(e.$$.fragment,o),i=!1},d(o){o&&S(n),e&&ue(e)}}}function Me(t){let n,e=t[12]+"",s,i,r,c;function o(){return t[11](t[14])}return{c(){n=p("button"),s=x(e),i=_(),l(n,"class","svelte-dfmnmk"),L(n,"active",t[3]===t[14])},m(f,u){A(f,n,u),a(n,s),a(n,i),r||(c=Q(n,"click",o),r=!0)},p(f,u){t=f,u&1&&e!==(e=t[12]+"")&&M(s,e),u&8&&L(n,"active",t[3]===t[14])},d(f){f&&S(n),r=!1,c()}}}function vn(t){let n,e=t[1],s,i,r,c,o,f,u,m,h,d,g,b,v,w,k=Pe(t),R=Ie(t[5][t[0]]),q=[];for(let $=0;$<R.length;$+=1)q[$]=Me(Ee(t,R,$));return{c(){n=p("main"),k.c(),s=_(),i=p("nav");for(let $=0;$<q.length;$+=1)q[$].c();r=_(),c=p("nav"),o=p("button"),o.textContent="Home",f=_(),u=p("button"),u.textContent="Projects",m=_(),h=p("button"),h.textContent="Experiences",d=_(),g=p("button"),g.textContent="Contact",l(i,"class","vnavbar svelte-dfmnmk"),l(o,"class","svelte-dfmnmk"),L(o,"active",t[2]===0),l(u,"class","svelte-dfmnmk"),L(u,"active",t[2]===1),l(h,"class","svelte-dfmnmk"),L(h,"active",t[2]===2),l(g,"class","svelte-dfmnmk"),L(g,"active",t[2]===3),l(c,"class","navbar svelte-dfmnmk")},m($,N){A($,n,N),k.m(n,null),a(n,s),a(n,i);for(let P=0;P<q.length;P+=1)q[P]&&q[P].m(i,null);a(n,r),a(n,c),a(c,o),a(c,f),a(c,u),a(c,m),a(c,h),a(c,d),a(c,g),b=!0,v||(w=[Q(o,"click",t[6]),Q(u,"click",t[7]),Q(h,"click",t[8]),Q(g,"click",t[9])],v=!0)},p($,[N]){if(N&2&&T(e,e=$[1])?(Ue(),se(k,1,1,y),We(),k=Pe($),k.c(),J(k,1),k.m(n,s)):k.p($,N),N&1065){R=Ie($[5][$[0]]);let P;for(P=0;P<R.length;P+=1){const we=Ee($,R,P);q[P]?q[P].p(we,N):(q[P]=Me(we),q[P].c(),q[P].m(i,null))}for(;P<q.length;P+=1)q[P].d(1);q.length=R.length}(!b||N&4)&&L(o,"active",$[2]===0),(!b||N&4)&&L(u,"active",$[2]===1),(!b||N&4)&&L(h,"active",$[2]===2),(!b||N&4)&&L(g,"active",$[2]===3)},i($){b||(J(k),b=!0)},o($){se(k),b=!1},d($){$&&S(n),k.d($),Ze(q,$),v=!1,X(w)}}}function _n(t,n,e){let s={0:[yt,Bt],1:[kt,bn,Nt,rn,an,zt,Gt,Zt,tn],2:[St,Pt,Rt,mn,fn],3:[qt]},i={0:["Home","About"],1:["Projects","Flowplane","Ornithopter","Slarm","TurtleBot","Website","Valse d'eclairage","Satire","Vassar Pizza Daily!"],2:["Experiences","Knot Theory","Harper","First Robotics","Covid"],3:["Contact"]},r=0,c=0,o=0,f=0;window.addEventListener("keyup",v=>{if(v.key=="ArrowRight")e(1,f=0),e(0,r=(r+1)%Object.keys(s).length),H.set(r);else if(v.key=="ArrowLeft")e(1,f=0),r==0?(e(0,r=Object.keys(s).length-1),H.set(r)):(e(0,r=(r-1)%Object.keys(s).length),H.set(r));else if(v.key==="ArrowUp"||v.key==="ArrowDown"){const w=i[r].length;w>0&&(v.key==="ArrowUp"?e(1,f=(f-1+w)%w):e(1,f=(f+1)%w))}console.log(r)}),window.addEventListener("wheel",v=>{v.deltaY<-100?e(1,f=(f+1)%i[r].length):v.deltaY>100&&(f==0?e(1,f=i[r].length-1):e(1,f=(f-1)%i[r].length))});function u(){e(0,r=0),e(1,f=0),H.set(r),e(1,f=0)}function m(){e(0,r=1),e(1,f=0),H.set(r),e(1,f=0)}function h(){e(0,r=2),e(1,f=0),H.set(r)}function d(){e(0,r=3),e(1,f=0),H.set(r)}function g(v){console.log(v),e(1,f=v)}const b=v=>g(v);return t.$$.update=()=>{t.$$.dirty&1&&e(2,c=r),t.$$.dirty&2&&e(3,o=f),t.$$.dirty&1&&document.documentElement.style.setProperty("--vnavbar-button-count",s[r].length)},[r,f,c,o,s,i,u,m,h,d,g,b]}class yn extends O{constructor(n){super(),I(this,n,_n,vn,T,{})}}new yn({target:document.getElementById("app")});
