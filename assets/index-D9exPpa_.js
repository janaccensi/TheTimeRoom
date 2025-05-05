(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**//*! #__NO_SIDE_EFFECTS__ */function Gl(n){const e=Object.create(null);for(const t of n.split(","))e[t]=1;return t=>t in e}const mt={},_s=[],Bn=()=>{},wf=()=>!1,Ao=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),Vl=n=>n.startsWith("onUpdate:"),Jt=Object.assign,Wl=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},Ef=Object.prototype.hasOwnProperty,ct=(n,e)=>Ef.call(n,e),et=Array.isArray,qs=n=>Co(n)==="[object Map]",Tf=n=>Co(n)==="[object Set]",Qe=n=>typeof n=="function",Lt=n=>typeof n=="string",Ps=n=>typeof n=="symbol",wt=n=>n!==null&&typeof n=="object",Mh=n=>(wt(n)||Qe(n))&&Qe(n.then)&&Qe(n.catch),Af=Object.prototype.toString,Co=n=>Af.call(n),Cf=n=>Co(n).slice(8,-1),Rf=n=>Co(n)==="[object Object]",Xl=n=>Lt(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,js=Gl(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Ro=n=>{const e=Object.create(null);return t=>e[t]||(e[t]=n(t))},Pf=/-(\w)/g,yn=Ro(n=>n.replace(Pf,(e,t)=>t?t.toUpperCase():"")),Df=/\B([A-Z])/g,ji=Ro(n=>n.replace(Df,"-$1").toLowerCase()),Po=Ro(n=>n.charAt(0).toUpperCase()+n.slice(1)),qo=Ro(n=>n?`on${Po(n)}`:""),vi=(n,e)=>!Object.is(n,e),jo=(n,...e)=>{for(let t=0;t<n.length;t++)n[t](...e)},Sh=(n,e,t,i=!1)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,writable:i,value:t})},Lf=n=>{const e=parseFloat(n);return isNaN(e)?n:e};let Ic;const Do=()=>Ic||(Ic=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function ql(n){if(et(n)){const e={};for(let t=0;t<n.length;t++){const i=n[t],s=Lt(i)?Of(i):ql(i);if(s)for(const r in s)e[r]=s[r]}return e}else if(Lt(n)||wt(n))return n}const If=/;(?![^(]*\))/g,Uf=/:([^]+)/,Nf=/\/\*[^]*?\*\//g;function Of(n){const e={};return n.replace(Nf,"").split(If).forEach(t=>{if(t){const i=t.split(Uf);i.length>1&&(e[i[0].trim()]=i[1].trim())}}),e}function jl(n){let e="";if(Lt(n))e=n;else if(et(n))for(let t=0;t<n.length;t++){const i=jl(n[t]);i&&(e+=i+" ")}else if(wt(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const Ff="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Bf=Gl(Ff);function bh(n){return!!n||n===""}/**
* @vue/reactivity v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let ln;class zf{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=ln,!e&&ln&&(this.index=(ln.scopes||(ln.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=ln;try{return ln=this,e()}finally{ln=t}}}on(){ln=this}off(){ln=this.parent}stop(e){if(this._active){this._active=!1;let t,i;for(t=0,i=this.effects.length;t<i;t++)this.effects[t].stop();for(this.effects.length=0,t=0,i=this.cleanups.length;t<i;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,i=this.scopes.length;t<i;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function kf(){return ln}let pt;const Yo=new WeakSet;class wh{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,ln&&ln.active&&ln.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Yo.has(this)&&(Yo.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Th(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Uc(this),Ah(this);const e=pt,t=An;pt=this,An=!0;try{return this.fn()}finally{Ch(this),pt=e,An=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Zl(e);this.deps=this.depsTail=void 0,Uc(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Yo.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Ba(this)&&this.run()}get dirty(){return Ba(this)}}let Eh=0,Ys,$s;function Th(n,e=!1){if(n.flags|=8,e){n.next=$s,$s=n;return}n.next=Ys,Ys=n}function Yl(){Eh++}function $l(){if(--Eh>0)return;if($s){let e=$s;for($s=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let n;for(;Ys;){let e=Ys;for(Ys=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(i){n||(n=i)}e=t}}if(n)throw n}function Ah(n){for(let e=n.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function Ch(n){let e,t=n.depsTail,i=t;for(;i;){const s=i.prevDep;i.version===-1?(i===t&&(t=s),Zl(i),Hf(i)):e=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=s}n.deps=e,n.depsTail=t}function Ba(n){for(let e=n.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(Rh(e.dep.computed)||e.dep.version!==e.version))return!0;return!!n._dirty}function Rh(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===rr))return;n.globalVersion=rr;const e=n.dep;if(n.flags|=2,e.version>0&&!n.isSSR&&n.deps&&!Ba(n)){n.flags&=-3;return}const t=pt,i=An;pt=n,An=!0;try{Ah(n);const s=n.fn(n._value);(e.version===0||vi(s,n._value))&&(n._value=s,e.version++)}catch(s){throw e.version++,s}finally{pt=t,An=i,Ch(n),n.flags&=-3}}function Zl(n,e=!1){const{dep:t,prevSub:i,nextSub:s}=n;if(i&&(i.nextSub=s,n.prevSub=void 0),s&&(s.prevSub=i,n.nextSub=void 0),t.subs===n&&(t.subs=i,!i&&t.computed)){t.computed.flags&=-5;for(let r=t.computed.deps;r;r=r.nextDep)Zl(r,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function Hf(n){const{prevDep:e,nextDep:t}=n;e&&(e.nextDep=t,n.prevDep=void 0),t&&(t.prevDep=e,n.nextDep=void 0)}let An=!0;const Ph=[];function Si(){Ph.push(An),An=!1}function bi(){const n=Ph.pop();An=n===void 0?!0:n}function Uc(n){const{cleanup:e}=n;if(n.cleanup=void 0,e){const t=pt;pt=void 0;try{e()}finally{pt=t}}}let rr=0;class Gf{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Jl{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0}track(e){if(!pt||!An||pt===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==pt)t=this.activeLink=new Gf(pt,this),pt.deps?(t.prevDep=pt.depsTail,pt.depsTail.nextDep=t,pt.depsTail=t):pt.deps=pt.depsTail=t,Dh(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const i=t.nextDep;i.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=i),t.prevDep=pt.depsTail,t.nextDep=void 0,pt.depsTail.nextDep=t,pt.depsTail=t,pt.deps===t&&(pt.deps=i)}return t}trigger(e){this.version++,rr++,this.notify(e)}notify(e){Yl();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{$l()}}}function Dh(n){if(n.dep.sc++,n.sub.flags&4){const e=n.dep.computed;if(e&&!n.dep.subs){e.flags|=20;for(let i=e.deps;i;i=i.nextDep)Dh(i)}const t=n.dep.subs;t!==n&&(n.prevSub=t,t&&(t.nextSub=n)),n.dep.subs=n}}const za=new WeakMap,Hi=Symbol(""),ka=Symbol(""),or=Symbol("");function Bt(n,e,t){if(An&&pt){let i=za.get(n);i||za.set(n,i=new Map);let s=i.get(t);s||(i.set(t,s=new Jl),s.map=i,s.key=t),s.track()}}function Jn(n,e,t,i,s,r){const o=za.get(n);if(!o){rr++;return}const a=l=>{l&&l.trigger()};if(Yl(),e==="clear")o.forEach(a);else{const l=et(n),c=l&&Xl(t);if(l&&t==="length"){const u=Number(i);o.forEach((h,d)=>{(d==="length"||d===or||!Ps(d)&&d>=u)&&a(h)})}else switch((t!==void 0||o.has(void 0))&&a(o.get(t)),c&&a(o.get(or)),e){case"add":l?c&&a(o.get("length")):(a(o.get(Hi)),qs(n)&&a(o.get(ka)));break;case"delete":l||(a(o.get(Hi)),qs(n)&&a(o.get(ka)));break;case"set":qs(n)&&a(o.get(Hi));break}}$l()}function Qi(n){const e=lt(n);return e===n?e:(Bt(e,"iterate",or),Cn(n)?e:e.map(Yt))}function Kl(n){return Bt(n=lt(n),"iterate",or),n}const Vf={__proto__:null,[Symbol.iterator](){return $o(this,Symbol.iterator,Yt)},concat(...n){return Qi(this).concat(...n.map(e=>et(e)?Qi(e):e))},entries(){return $o(this,"entries",n=>(n[1]=Yt(n[1]),n))},every(n,e){return Gn(this,"every",n,e,void 0,arguments)},filter(n,e){return Gn(this,"filter",n,e,t=>t.map(Yt),arguments)},find(n,e){return Gn(this,"find",n,e,Yt,arguments)},findIndex(n,e){return Gn(this,"findIndex",n,e,void 0,arguments)},findLast(n,e){return Gn(this,"findLast",n,e,Yt,arguments)},findLastIndex(n,e){return Gn(this,"findLastIndex",n,e,void 0,arguments)},forEach(n,e){return Gn(this,"forEach",n,e,void 0,arguments)},includes(...n){return Zo(this,"includes",n)},indexOf(...n){return Zo(this,"indexOf",n)},join(n){return Qi(this).join(n)},lastIndexOf(...n){return Zo(this,"lastIndexOf",n)},map(n,e){return Gn(this,"map",n,e,void 0,arguments)},pop(){return Ns(this,"pop")},push(...n){return Ns(this,"push",n)},reduce(n,...e){return Nc(this,"reduce",n,e)},reduceRight(n,...e){return Nc(this,"reduceRight",n,e)},shift(){return Ns(this,"shift")},some(n,e){return Gn(this,"some",n,e,void 0,arguments)},splice(...n){return Ns(this,"splice",n)},toReversed(){return Qi(this).toReversed()},toSorted(n){return Qi(this).toSorted(n)},toSpliced(...n){return Qi(this).toSpliced(...n)},unshift(...n){return Ns(this,"unshift",n)},values(){return $o(this,"values",Yt)}};function $o(n,e,t){const i=Kl(n),s=i[e]();return i!==n&&!Cn(n)&&(s._next=s.next,s.next=()=>{const r=s._next();return r.value&&(r.value=t(r.value)),r}),s}const Wf=Array.prototype;function Gn(n,e,t,i,s,r){const o=Kl(n),a=o!==n&&!Cn(n),l=o[e];if(l!==Wf[e]){const h=l.apply(n,r);return a?Yt(h):h}let c=t;o!==n&&(a?c=function(h,d){return t.call(this,Yt(h),d,n)}:t.length>2&&(c=function(h,d){return t.call(this,h,d,n)}));const u=l.call(o,c,i);return a&&s?s(u):u}function Nc(n,e,t,i){const s=Kl(n);let r=t;return s!==n&&(Cn(n)?t.length>3&&(r=function(o,a,l){return t.call(this,o,a,l,n)}):r=function(o,a,l){return t.call(this,o,Yt(a),l,n)}),s[e](r,...i)}function Zo(n,e,t){const i=lt(n);Bt(i,"iterate",or);const s=i[e](...t);return(s===-1||s===!1)&&nc(t[0])?(t[0]=lt(t[0]),i[e](...t)):s}function Ns(n,e,t=[]){Si(),Yl();const i=lt(n)[e].apply(n,t);return $l(),bi(),i}const Xf=Gl("__proto__,__v_isRef,__isVue"),Lh=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(Ps));function qf(n){Ps(n)||(n=String(n));const e=lt(this);return Bt(e,"has",n),e.hasOwnProperty(n)}class Ih{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,i){if(t==="__v_skip")return e.__v_skip;const s=this._isReadonly,r=this._isShallow;if(t==="__v_isReactive")return!s;if(t==="__v_isReadonly")return s;if(t==="__v_isShallow")return r;if(t==="__v_raw")return i===(s?r?np:Fh:r?Oh:Nh).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(i)?e:void 0;const o=et(e);if(!s){let l;if(o&&(l=Vf[t]))return l;if(t==="hasOwnProperty")return qf}const a=Reflect.get(e,t,Ht(e)?e:i);return(Ps(t)?Lh.has(t):Xf(t))||(s||Bt(e,"get",t),r)?a:Ht(a)?o&&Xl(t)?a:a.value:wt(a)?s?Bh(a):ec(a):a}}class Uh extends Ih{constructor(e=!1){super(!1,e)}set(e,t,i,s){let r=e[t];if(!this._isShallow){const l=Vi(r);if(!Cn(i)&&!Vi(i)&&(r=lt(r),i=lt(i)),!et(e)&&Ht(r)&&!Ht(i))return l?!1:(r.value=i,!0)}const o=et(e)&&Xl(t)?Number(t)<e.length:ct(e,t),a=Reflect.set(e,t,i,Ht(e)?e:s);return e===lt(s)&&(o?vi(i,r)&&Jn(e,"set",t,i):Jn(e,"add",t,i)),a}deleteProperty(e,t){const i=ct(e,t);e[t];const s=Reflect.deleteProperty(e,t);return s&&i&&Jn(e,"delete",t,void 0),s}has(e,t){const i=Reflect.has(e,t);return(!Ps(t)||!Lh.has(t))&&Bt(e,"has",t),i}ownKeys(e){return Bt(e,"iterate",et(e)?"length":Hi),Reflect.ownKeys(e)}}class jf extends Ih{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const Yf=new Uh,$f=new jf,Zf=new Uh(!0);const Ha=n=>n,Pr=n=>Reflect.getPrototypeOf(n);function Jf(n,e,t){return function(...i){const s=this.__v_raw,r=lt(s),o=qs(r),a=n==="entries"||n===Symbol.iterator&&o,l=n==="keys"&&o,c=s[n](...i),u=t?Ha:e?Ga:Yt;return!e&&Bt(r,"iterate",l?ka:Hi),{next(){const{value:h,done:d}=c.next();return d?{value:h,done:d}:{value:a?[u(h[0]),u(h[1])]:u(h),done:d}},[Symbol.iterator](){return this}}}}function Dr(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function Kf(n,e){const t={get(s){const r=this.__v_raw,o=lt(r),a=lt(s);n||(vi(s,a)&&Bt(o,"get",s),Bt(o,"get",a));const{has:l}=Pr(o),c=e?Ha:n?Ga:Yt;if(l.call(o,s))return c(r.get(s));if(l.call(o,a))return c(r.get(a));r!==o&&r.get(s)},get size(){const s=this.__v_raw;return!n&&Bt(lt(s),"iterate",Hi),Reflect.get(s,"size",s)},has(s){const r=this.__v_raw,o=lt(r),a=lt(s);return n||(vi(s,a)&&Bt(o,"has",s),Bt(o,"has",a)),s===a?r.has(s):r.has(s)||r.has(a)},forEach(s,r){const o=this,a=o.__v_raw,l=lt(a),c=e?Ha:n?Ga:Yt;return!n&&Bt(l,"iterate",Hi),a.forEach((u,h)=>s.call(r,c(u),c(h),o))}};return Jt(t,n?{add:Dr("add"),set:Dr("set"),delete:Dr("delete"),clear:Dr("clear")}:{add(s){!e&&!Cn(s)&&!Vi(s)&&(s=lt(s));const r=lt(this);return Pr(r).has.call(r,s)||(r.add(s),Jn(r,"add",s,s)),this},set(s,r){!e&&!Cn(r)&&!Vi(r)&&(r=lt(r));const o=lt(this),{has:a,get:l}=Pr(o);let c=a.call(o,s);c||(s=lt(s),c=a.call(o,s));const u=l.call(o,s);return o.set(s,r),c?vi(r,u)&&Jn(o,"set",s,r):Jn(o,"add",s,r),this},delete(s){const r=lt(this),{has:o,get:a}=Pr(r);let l=o.call(r,s);l||(s=lt(s),l=o.call(r,s)),a&&a.call(r,s);const c=r.delete(s);return l&&Jn(r,"delete",s,void 0),c},clear(){const s=lt(this),r=s.size!==0,o=s.clear();return r&&Jn(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{t[s]=Jf(s,n,e)}),t}function Ql(n,e){const t=Kf(n,e);return(i,s,r)=>s==="__v_isReactive"?!n:s==="__v_isReadonly"?n:s==="__v_raw"?i:Reflect.get(ct(t,s)&&s in i?t:i,s,r)}const Qf={get:Ql(!1,!1)},ep={get:Ql(!1,!0)},tp={get:Ql(!0,!1)};const Nh=new WeakMap,Oh=new WeakMap,Fh=new WeakMap,np=new WeakMap;function ip(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function sp(n){return n.__v_skip||!Object.isExtensible(n)?0:ip(Cf(n))}function ec(n){return Vi(n)?n:tc(n,!1,Yf,Qf,Nh)}function rp(n){return tc(n,!1,Zf,ep,Oh)}function Bh(n){return tc(n,!0,$f,tp,Fh)}function tc(n,e,t,i,s){if(!wt(n)||n.__v_raw&&!(e&&n.__v_isReactive))return n;const r=s.get(n);if(r)return r;const o=sp(n);if(o===0)return n;const a=new Proxy(n,o===2?i:t);return s.set(n,a),a}function Zs(n){return Vi(n)?Zs(n.__v_raw):!!(n&&n.__v_isReactive)}function Vi(n){return!!(n&&n.__v_isReadonly)}function Cn(n){return!!(n&&n.__v_isShallow)}function nc(n){return n?!!n.__v_raw:!1}function lt(n){const e=n&&n.__v_raw;return e?lt(e):n}function op(n){return!ct(n,"__v_skip")&&Object.isExtensible(n)&&Sh(n,"__v_skip",!0),n}const Yt=n=>wt(n)?ec(n):n,Ga=n=>wt(n)?Bh(n):n;function Ht(n){return n?n.__v_isRef===!0:!1}function ap(n){return lp(n,!1)}function lp(n,e){return Ht(n)?n:new cp(n,e)}class cp{constructor(e,t){this.dep=new Jl,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:lt(e),this._value=t?e:Yt(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,i=this.__v_isShallow||Cn(e)||Vi(e);e=i?e:lt(e),vi(e,t)&&(this._rawValue=e,this._value=i?e:Yt(e),this.dep.trigger())}}function up(n){return Ht(n)?n.value:n}const hp={get:(n,e,t)=>e==="__v_raw"?n:up(Reflect.get(n,e,t)),set:(n,e,t,i)=>{const s=n[e];return Ht(s)&&!Ht(t)?(s.value=t,!0):Reflect.set(n,e,t,i)}};function zh(n){return Zs(n)?n:new Proxy(n,hp)}class dp{constructor(e,t,i){this.fn=e,this.setter=t,this._value=void 0,this.dep=new Jl(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=rr-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&pt!==this)return Th(this,!0),!0}get value(){const e=this.dep.track();return Rh(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function fp(n,e,t=!1){let i,s;return Qe(n)?i=n:(i=n.get,s=n.set),new dp(i,s,t)}const Lr={},vo=new WeakMap;let Ni;function pp(n,e=!1,t=Ni){if(t){let i=vo.get(t);i||vo.set(t,i=[]),i.push(n)}}function mp(n,e,t=mt){const{immediate:i,deep:s,once:r,scheduler:o,augmentJob:a,call:l}=t,c=_=>s?_:Cn(_)||s===!1||s===0?pi(_,1):pi(_);let u,h,d,f,m=!1,v=!1;if(Ht(n)?(h=()=>n.value,m=Cn(n)):Zs(n)?(h=()=>c(n),m=!0):et(n)?(v=!0,m=n.some(_=>Zs(_)||Cn(_)),h=()=>n.map(_=>{if(Ht(_))return _.value;if(Zs(_))return c(_);if(Qe(_))return l?l(_,2):_()})):Qe(n)?e?h=l?()=>l(n,2):n:h=()=>{if(d){Si();try{d()}finally{bi()}}const _=Ni;Ni=u;try{return l?l(n,3,[f]):n(f)}finally{Ni=_}}:h=Bn,e&&s){const _=h,P=s===!0?1/0:s;h=()=>pi(_(),P)}const g=kf(),p=()=>{u.stop(),g&&g.active&&Wl(g.effects,u)};if(r&&e){const _=e;e=(...P)=>{_(...P),p()}}let S=v?new Array(n.length).fill(Lr):Lr;const b=_=>{if(!(!(u.flags&1)||!u.dirty&&!_))if(e){const P=u.run();if(s||m||(v?P.some((C,T)=>vi(C,S[T])):vi(P,S))){d&&d();const C=Ni;Ni=u;try{const T=[P,S===Lr?void 0:v&&S[0]===Lr?[]:S,f];l?l(e,3,T):e(...T),S=P}finally{Ni=C}}}else u.run()};return a&&a(b),u=new wh(h),u.scheduler=o?()=>o(b,!1):b,f=_=>pp(_,!1,u),d=u.onStop=()=>{const _=vo.get(u);if(_){if(l)l(_,4);else for(const P of _)P();vo.delete(u)}},e?i?b(!0):S=u.run():o?o(b.bind(null,!0),!0):u.run(),p.pause=u.pause.bind(u),p.resume=u.resume.bind(u),p.stop=p,p}function pi(n,e=1/0,t){if(e<=0||!wt(n)||n.__v_skip||(t=t||new Set,t.has(n)))return n;if(t.add(n),e--,Ht(n))pi(n.value,e,t);else if(et(n))for(let i=0;i<n.length;i++)pi(n[i],e,t);else if(Tf(n)||qs(n))n.forEach(i=>{pi(i,e,t)});else if(Rf(n)){for(const i in n)pi(n[i],e,t);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&pi(n[i],e,t)}return n}/**
* @vue/runtime-core v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Mr(n,e,t,i){try{return i?n(...i):n()}catch(s){Lo(s,e,t)}}function kn(n,e,t,i){if(Qe(n)){const s=Mr(n,e,t,i);return s&&Mh(s)&&s.catch(r=>{Lo(r,e,t)}),s}if(et(n)){const s=[];for(let r=0;r<n.length;r++)s.push(kn(n[r],e,t,i));return s}}function Lo(n,e,t,i=!0){const s=e?e.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||mt;if(e){let a=e.parent;const l=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${t}`;for(;a;){const u=a.ec;if(u){for(let h=0;h<u.length;h++)if(u[h](n,l,c)===!1)return}a=a.parent}if(r){Si(),Mr(r,null,10,[n,l,c]),bi();return}}gp(n,t,s,i,o)}function gp(n,e,t,i=!0,s=!1){if(s)throw n;console.error(n)}const $t=[];let Un=-1;const xs=[];let hi=null,ps=0;const kh=Promise.resolve();let _o=null;function vp(n){const e=_o||kh;return n?e.then(this?n.bind(this):n):e}function _p(n){let e=Un+1,t=$t.length;for(;e<t;){const i=e+t>>>1,s=$t[i],r=ar(s);r<n||r===n&&s.flags&2?e=i+1:t=i}return e}function ic(n){if(!(n.flags&1)){const e=ar(n),t=$t[$t.length-1];!t||!(n.flags&2)&&e>=ar(t)?$t.push(n):$t.splice(_p(e),0,n),n.flags|=1,Hh()}}function Hh(){_o||(_o=kh.then(Vh))}function xp(n){et(n)?xs.push(...n):hi&&n.id===-1?hi.splice(ps+1,0,n):n.flags&1||(xs.push(n),n.flags|=1),Hh()}function Oc(n,e,t=Un+1){for(;t<$t.length;t++){const i=$t[t];if(i&&i.flags&2){if(n&&i.id!==n.uid)continue;$t.splice(t,1),t--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function Gh(n){if(xs.length){const e=[...new Set(xs)].sort((t,i)=>ar(t)-ar(i));if(xs.length=0,hi){hi.push(...e);return}for(hi=e,ps=0;ps<hi.length;ps++){const t=hi[ps];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}hi=null,ps=0}}const ar=n=>n.id==null?n.flags&2?-1:1/0:n.id;function Vh(n){try{for(Un=0;Un<$t.length;Un++){const e=$t[Un];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Mr(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;Un<$t.length;Un++){const e=$t[Un];e&&(e.flags&=-2)}Un=-1,$t.length=0,Gh(),_o=null,($t.length||xs.length)&&Vh()}}let Tn=null,Wh=null;function xo(n){const e=Tn;return Tn=n,Wh=n&&n.type.__scopeId||null,e}function yp(n,e=Tn,t){if(!e||n._n)return n;const i=(...s)=>{i._d&&qc(-1);const r=xo(e);let o;try{o=n(...s)}finally{xo(r),i._d&&qc(1)}return o};return i._n=!0,i._c=!0,i._d=!0,i}function Ai(n,e,t,i){const s=n.dirs,r=e&&e.dirs;for(let o=0;o<s.length;o++){const a=s[o];r&&(a.oldValue=r[o].value);let l=a.dir[i];l&&(Si(),kn(l,t,8,[n.el,a,n,e]),bi())}}const Mp=Symbol("_vte"),Sp=n=>n.__isTeleport;function sc(n,e){n.shapeFlag&6&&n.component?(n.transition=e,sc(n.component.subTree,e)):n.shapeFlag&128?(n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback)):n.transition=e}function Xh(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function yo(n,e,t,i,s=!1){if(et(n)){n.forEach((m,v)=>yo(m,e&&(et(e)?e[v]:e),t,i,s));return}if(Js(i)&&!s){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&yo(n,e,t,i.component.subTree);return}const r=i.shapeFlag&4?lc(i.component):i.el,o=s?null:r,{i:a,r:l}=n,c=e&&e.r,u=a.refs===mt?a.refs={}:a.refs,h=a.setupState,d=lt(h),f=h===mt?()=>!1:m=>ct(d,m);if(c!=null&&c!==l&&(Lt(c)?(u[c]=null,f(c)&&(h[c]=null)):Ht(c)&&(c.value=null)),Qe(l))Mr(l,a,12,[o,u]);else{const m=Lt(l),v=Ht(l);if(m||v){const g=()=>{if(n.f){const p=m?f(l)?h[l]:u[l]:l.value;s?et(p)&&Wl(p,r):et(p)?p.includes(r)||p.push(r):m?(u[l]=[r],f(l)&&(h[l]=u[l])):(l.value=[r],n.k&&(u[n.k]=l.value))}else m?(u[l]=o,f(l)&&(h[l]=o)):v&&(l.value=o,n.k&&(u[n.k]=o))};o?(g.id=-1,on(g,t)):g()}}}Do().requestIdleCallback;Do().cancelIdleCallback;const Js=n=>!!n.type.__asyncLoader,qh=n=>n.type.__isKeepAlive;function bp(n,e){jh(n,"a",e)}function wp(n,e){jh(n,"da",e)}function jh(n,e,t=zt){const i=n.__wdc||(n.__wdc=()=>{let s=t;for(;s;){if(s.isDeactivated)return;s=s.parent}return n()});if(Io(e,i,t),t){let s=t.parent;for(;s&&s.parent;)qh(s.parent.vnode)&&Ep(i,e,t,s),s=s.parent}}function Ep(n,e,t,i){const s=Io(e,n,i,!0);Zh(()=>{Wl(i[e],s)},t)}function Io(n,e,t=zt,i=!1){if(t){const s=t[n]||(t[n]=[]),r=e.__weh||(e.__weh=(...o)=>{Si();const a=Sr(t),l=kn(e,t,n,o);return a(),bi(),l});return i?s.unshift(r):s.push(r),r}}const ii=n=>(e,t=zt)=>{(!ur||n==="sp")&&Io(n,(...i)=>e(...i),t)},Tp=ii("bm"),Yh=ii("m"),Ap=ii("bu"),Cp=ii("u"),$h=ii("bum"),Zh=ii("um"),Rp=ii("sp"),Pp=ii("rtg"),Dp=ii("rtc");function Lp(n,e=zt){Io("ec",n,e)}const Ip="components";function Up(n,e){return Op(Ip,n,!0,e)||n}const Np=Symbol.for("v-ndc");function Op(n,e,t=!0,i=!1){const s=Tn||zt;if(s){const r=s.type;{const a=Tm(r,!1);if(a&&(a===e||a===yn(e)||a===Po(yn(e))))return r}const o=Fc(s[n]||r[n],e)||Fc(s.appContext[n],e);return!o&&i?r:o}}function Fc(n,e){return n&&(n[e]||n[yn(e)]||n[Po(yn(e))])}const Va=n=>n?xd(n)?lc(n):Va(n.parent):null,Ks=Jt(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>Va(n.parent),$root:n=>Va(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>Kh(n),$forceUpdate:n=>n.f||(n.f=()=>{ic(n.update)}),$nextTick:n=>n.n||(n.n=vp.bind(n.proxy)),$watch:n=>sm.bind(n)}),Jo=(n,e)=>n!==mt&&!n.__isScriptSetup&&ct(n,e),Fp={get({_:n},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:i,data:s,props:r,accessCache:o,type:a,appContext:l}=n;let c;if(e[0]!=="$"){const f=o[e];if(f!==void 0)switch(f){case 1:return i[e];case 2:return s[e];case 4:return t[e];case 3:return r[e]}else{if(Jo(i,e))return o[e]=1,i[e];if(s!==mt&&ct(s,e))return o[e]=2,s[e];if((c=n.propsOptions[0])&&ct(c,e))return o[e]=3,r[e];if(t!==mt&&ct(t,e))return o[e]=4,t[e];Wa&&(o[e]=0)}}const u=Ks[e];let h,d;if(u)return e==="$attrs"&&Bt(n.attrs,"get",""),u(n);if((h=a.__cssModules)&&(h=h[e]))return h;if(t!==mt&&ct(t,e))return o[e]=4,t[e];if(d=l.config.globalProperties,ct(d,e))return d[e]},set({_:n},e,t){const{data:i,setupState:s,ctx:r}=n;return Jo(s,e)?(s[e]=t,!0):i!==mt&&ct(i,e)?(i[e]=t,!0):ct(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(r[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:i,appContext:s,propsOptions:r}},o){let a;return!!t[o]||n!==mt&&ct(n,o)||Jo(e,o)||(a=r[0])&&ct(a,o)||ct(i,o)||ct(Ks,o)||ct(s.config.globalProperties,o)},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:ct(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function Bc(n){return et(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let Wa=!0;function Bp(n){const e=Kh(n),t=n.proxy,i=n.ctx;Wa=!1,e.beforeCreate&&zc(e.beforeCreate,n,"bc");const{data:s,computed:r,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:h,mounted:d,beforeUpdate:f,updated:m,activated:v,deactivated:g,beforeDestroy:p,beforeUnmount:S,destroyed:b,unmounted:_,render:P,renderTracked:C,renderTriggered:T,errorCaptured:R,serverPrefetch:w,expose:x,inheritAttrs:D,components:Y,directives:N,filters:H}=e;if(c&&zp(c,i,null),o)for(const X in o){const O=o[X];Qe(O)&&(i[X]=O.bind(t))}if(s){const X=s.call(t,t);wt(X)&&(n.data=ec(X))}if(Wa=!0,r)for(const X in r){const O=r[X],ne=Qe(O)?O.bind(t,t):Qe(O.get)?O.get.bind(t,t):Bn,he=!Qe(O)&&Qe(O.set)?O.set.bind(t):Bn,me=Cm({get:ne,set:he});Object.defineProperty(i,X,{enumerable:!0,configurable:!0,get:()=>me.value,set:_e=>me.value=_e})}if(a)for(const X in a)Jh(a[X],i,t,X);if(l){const X=Qe(l)?l.call(t):l;Reflect.ownKeys(X).forEach(O=>{Xp(O,X[O])})}u&&zc(u,n,"c");function G(X,O){et(O)?O.forEach(ne=>X(ne.bind(t))):O&&X(O.bind(t))}if(G(Tp,h),G(Yh,d),G(Ap,f),G(Cp,m),G(bp,v),G(wp,g),G(Lp,R),G(Dp,C),G(Pp,T),G($h,S),G(Zh,_),G(Rp,w),et(x))if(x.length){const X=n.exposed||(n.exposed={});x.forEach(O=>{Object.defineProperty(X,O,{get:()=>t[O],set:ne=>t[O]=ne})})}else n.exposed||(n.exposed={});P&&n.render===Bn&&(n.render=P),D!=null&&(n.inheritAttrs=D),Y&&(n.components=Y),N&&(n.directives=N),w&&Xh(n)}function zp(n,e,t=Bn){et(n)&&(n=Xa(n));for(const i in n){const s=n[i];let r;wt(s)?"default"in s?r=oo(s.from||i,s.default,!0):r=oo(s.from||i):r=oo(s),Ht(r)?Object.defineProperty(e,i,{enumerable:!0,configurable:!0,get:()=>r.value,set:o=>r.value=o}):e[i]=r}}function zc(n,e,t){kn(et(n)?n.map(i=>i.bind(e.proxy)):n.bind(e.proxy),e,t)}function Jh(n,e,t,i){let s=i.includes(".")?dd(t,i):()=>t[i];if(Lt(n)){const r=e[n];Qe(r)&&Qo(s,r)}else if(Qe(n))Qo(s,n.bind(t));else if(wt(n))if(et(n))n.forEach(r=>Jh(r,e,t,i));else{const r=Qe(n.handler)?n.handler.bind(t):e[n.handler];Qe(r)&&Qo(s,r,n)}}function Kh(n){const e=n.type,{mixins:t,extends:i}=e,{mixins:s,optionsCache:r,config:{optionMergeStrategies:o}}=n.appContext,a=r.get(e);let l;return a?l=a:!s.length&&!t&&!i?l=e:(l={},s.length&&s.forEach(c=>Mo(l,c,o,!0)),Mo(l,e,o)),wt(e)&&r.set(e,l),l}function Mo(n,e,t,i=!1){const{mixins:s,extends:r}=e;r&&Mo(n,r,t,!0),s&&s.forEach(o=>Mo(n,o,t,!0));for(const o in e)if(!(i&&o==="expose")){const a=kp[o]||t&&t[o];n[o]=a?a(n[o],e[o]):e[o]}return n}const kp={data:kc,props:Hc,emits:Hc,methods:Vs,computed:Vs,beforeCreate:Xt,created:Xt,beforeMount:Xt,mounted:Xt,beforeUpdate:Xt,updated:Xt,beforeDestroy:Xt,beforeUnmount:Xt,destroyed:Xt,unmounted:Xt,activated:Xt,deactivated:Xt,errorCaptured:Xt,serverPrefetch:Xt,components:Vs,directives:Vs,watch:Gp,provide:kc,inject:Hp};function kc(n,e){return e?n?function(){return Jt(Qe(n)?n.call(this,this):n,Qe(e)?e.call(this,this):e)}:e:n}function Hp(n,e){return Vs(Xa(n),Xa(e))}function Xa(n){if(et(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function Xt(n,e){return n?[...new Set([].concat(n,e))]:e}function Vs(n,e){return n?Jt(Object.create(null),n,e):e}function Hc(n,e){return n?et(n)&&et(e)?[...new Set([...n,...e])]:Jt(Object.create(null),Bc(n),Bc(e??{})):e}function Gp(n,e){if(!n)return e;if(!e)return n;const t=Jt(Object.create(null),n);for(const i in e)t[i]=Xt(n[i],e[i]);return t}function Qh(){return{app:null,config:{isNativeTag:wf,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Vp=0;function Wp(n,e){return function(i,s=null){Qe(i)||(i=Jt({},i)),s!=null&&!wt(s)&&(s=null);const r=Qh(),o=new WeakSet,a=[];let l=!1;const c=r.app={_uid:Vp++,_component:i,_props:s,_container:null,_context:r,_instance:null,version:Rm,get config(){return r.config},set config(u){},use(u,...h){return o.has(u)||(u&&Qe(u.install)?(o.add(u),u.install(c,...h)):Qe(u)&&(o.add(u),u(c,...h))),c},mixin(u){return r.mixins.includes(u)||r.mixins.push(u),c},component(u,h){return h?(r.components[u]=h,c):r.components[u]},directive(u,h){return h?(r.directives[u]=h,c):r.directives[u]},mount(u,h,d){if(!l){const f=c._ceVNode||_i(i,s);return f.appContext=r,d===!0?d="svg":d===!1&&(d=void 0),n(f,u,d),l=!0,c._container=u,u.__vue_app__=c,lc(f.component)}},onUnmount(u){a.push(u)},unmount(){l&&(kn(a,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(u,h){return r.provides[u]=h,c},runWithContext(u){const h=ys;ys=c;try{return u()}finally{ys=h}}};return c}}let ys=null;function Xp(n,e){if(zt){let t=zt.provides;const i=zt.parent&&zt.parent.provides;i===t&&(t=zt.provides=Object.create(i)),t[n]=e}}function oo(n,e,t=!1){const i=zt||Tn;if(i||ys){const s=ys?ys._context.provides:i?i.parent==null?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(s&&n in s)return s[n];if(arguments.length>1)return t&&Qe(e)?e.call(i&&i.proxy):e}}const ed={},td=()=>Object.create(ed),nd=n=>Object.getPrototypeOf(n)===ed;function qp(n,e,t,i=!1){const s={},r=td();n.propsDefaults=Object.create(null),id(n,e,s,r);for(const o in n.propsOptions[0])o in s||(s[o]=void 0);t?n.props=i?s:rp(s):n.type.props?n.props=s:n.props=r,n.attrs=r}function jp(n,e,t,i){const{props:s,attrs:r,vnode:{patchFlag:o}}=n,a=lt(s),[l]=n.propsOptions;let c=!1;if((i||o>0)&&!(o&16)){if(o&8){const u=n.vnode.dynamicProps;for(let h=0;h<u.length;h++){let d=u[h];if(Uo(n.emitsOptions,d))continue;const f=e[d];if(l)if(ct(r,d))f!==r[d]&&(r[d]=f,c=!0);else{const m=yn(d);s[m]=qa(l,a,m,f,n,!1)}else f!==r[d]&&(r[d]=f,c=!0)}}}else{id(n,e,s,r)&&(c=!0);let u;for(const h in a)(!e||!ct(e,h)&&((u=ji(h))===h||!ct(e,u)))&&(l?t&&(t[h]!==void 0||t[u]!==void 0)&&(s[h]=qa(l,a,h,void 0,n,!0)):delete s[h]);if(r!==a)for(const h in r)(!e||!ct(e,h))&&(delete r[h],c=!0)}c&&Jn(n.attrs,"set","")}function id(n,e,t,i){const[s,r]=n.propsOptions;let o=!1,a;if(e)for(let l in e){if(js(l))continue;const c=e[l];let u;s&&ct(s,u=yn(l))?!r||!r.includes(u)?t[u]=c:(a||(a={}))[u]=c:Uo(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,o=!0)}if(r){const l=lt(t),c=a||mt;for(let u=0;u<r.length;u++){const h=r[u];t[h]=qa(s,l,h,c[h],n,!ct(c,h))}}return o}function qa(n,e,t,i,s,r){const o=n[t];if(o!=null){const a=ct(o,"default");if(a&&i===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&Qe(l)){const{propsDefaults:c}=s;if(t in c)i=c[t];else{const u=Sr(s);i=c[t]=l.call(null,e),u()}}else i=l;s.ce&&s.ce._setProp(t,i)}o[0]&&(r&&!a?i=!1:o[1]&&(i===""||i===ji(t))&&(i=!0))}return i}const Yp=new WeakMap;function sd(n,e,t=!1){const i=t?Yp:e.propsCache,s=i.get(n);if(s)return s;const r=n.props,o={},a=[];let l=!1;if(!Qe(n)){const u=h=>{l=!0;const[d,f]=sd(h,e,!0);Jt(o,d),f&&a.push(...f)};!t&&e.mixins.length&&e.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!r&&!l)return wt(n)&&i.set(n,_s),_s;if(et(r))for(let u=0;u<r.length;u++){const h=yn(r[u]);Gc(h)&&(o[h]=mt)}else if(r)for(const u in r){const h=yn(u);if(Gc(h)){const d=r[u],f=o[h]=et(d)||Qe(d)?{type:d}:Jt({},d),m=f.type;let v=!1,g=!0;if(et(m))for(let p=0;p<m.length;++p){const S=m[p],b=Qe(S)&&S.name;if(b==="Boolean"){v=!0;break}else b==="String"&&(g=!1)}else v=Qe(m)&&m.name==="Boolean";f[0]=v,f[1]=g,(v||ct(f,"default"))&&a.push(h)}}const c=[o,a];return wt(n)&&i.set(n,c),c}function Gc(n){return n[0]!=="$"&&!js(n)}const rd=n=>n[0]==="_"||n==="$stable",rc=n=>et(n)?n.map(Nn):[Nn(n)],$p=(n,e,t)=>{if(e._n)return e;const i=yp((...s)=>rc(e(...s)),t);return i._c=!1,i},od=(n,e,t)=>{const i=n._ctx;for(const s in n){if(rd(s))continue;const r=n[s];if(Qe(r))e[s]=$p(s,r,i);else if(r!=null){const o=rc(r);e[s]=()=>o}}},ad=(n,e)=>{const t=rc(e);n.slots.default=()=>t},ld=(n,e,t)=>{for(const i in e)(t||i!=="_")&&(n[i]=e[i])},Zp=(n,e,t)=>{const i=n.slots=td();if(n.vnode.shapeFlag&32){const s=e._;s?(ld(i,e,t),t&&Sh(i,"_",s,!0)):od(e,i)}else e&&ad(n,e)},Jp=(n,e,t)=>{const{vnode:i,slots:s}=n;let r=!0,o=mt;if(i.shapeFlag&32){const a=e._;a?t&&a===1?r=!1:ld(s,e,t):(r=!e.$stable,od(e,s)),o=e}else e&&(ad(n,e),o={default:1});if(r)for(const a in s)!rd(a)&&o[a]==null&&delete s[a]},on=hm;function Kp(n){return Qp(n)}function Qp(n,e){const t=Do();t.__VUE__=!0;const{insert:i,remove:s,patchProp:r,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:h,nextSibling:d,setScopeId:f=Bn,insertStaticContent:m}=n,v=(I,U,E,ae=null,F=null,k=null,V=void 0,ee=null,B=!!U.dynamicChildren)=>{if(I===U)return;I&&!Os(I,U)&&(ae=le(I),_e(I,F,k,!0),I=null),U.patchFlag===-2&&(B=!1,U.dynamicChildren=null);const{type:M,ref:y,shapeFlag:L}=U;switch(M){case No:g(I,U,E,ae);break;case lr:p(I,U,E,ae);break;case ea:I==null&&S(U,E,ae,V);break;case Zn:Y(I,U,E,ae,F,k,V,ee,B);break;default:L&1?P(I,U,E,ae,F,k,V,ee,B):L&6?N(I,U,E,ae,F,k,V,ee,B):(L&64||L&128)&&M.process(I,U,E,ae,F,k,V,ee,B,De)}y!=null&&F&&yo(y,I&&I.ref,k,U||I,!U)},g=(I,U,E,ae)=>{if(I==null)i(U.el=a(U.children),E,ae);else{const F=U.el=I.el;U.children!==I.children&&c(F,U.children)}},p=(I,U,E,ae)=>{I==null?i(U.el=l(U.children||""),E,ae):U.el=I.el},S=(I,U,E,ae)=>{[I.el,I.anchor]=m(I.children,U,E,ae,I.el,I.anchor)},b=({el:I,anchor:U},E,ae)=>{let F;for(;I&&I!==U;)F=d(I),i(I,E,ae),I=F;i(U,E,ae)},_=({el:I,anchor:U})=>{let E;for(;I&&I!==U;)E=d(I),s(I),I=E;s(U)},P=(I,U,E,ae,F,k,V,ee,B)=>{U.type==="svg"?V="svg":U.type==="math"&&(V="mathml"),I==null?C(U,E,ae,F,k,V,ee,B):w(I,U,F,k,V,ee,B)},C=(I,U,E,ae,F,k,V,ee)=>{let B,M;const{props:y,shapeFlag:L,transition:j,dirs:Z}=I;if(B=I.el=o(I.type,k,y&&y.is,y),L&8?u(B,I.children):L&16&&R(I.children,B,null,ae,F,Ko(I,k),V,ee),Z&&Ai(I,null,ae,"created"),T(B,I,I.scopeId,V,ae),y){for(const xe in y)xe!=="value"&&!js(xe)&&r(B,xe,null,y[xe],k,ae);"value"in y&&r(B,"value",null,y.value,k),(M=y.onVnodeBeforeMount)&&Ln(M,ae,I)}Z&&Ai(I,null,ae,"beforeMount");const Q=em(F,j);Q&&j.beforeEnter(B),i(B,U,E),((M=y&&y.onVnodeMounted)||Q||Z)&&on(()=>{M&&Ln(M,ae,I),Q&&j.enter(B),Z&&Ai(I,null,ae,"mounted")},F)},T=(I,U,E,ae,F)=>{if(E&&f(I,E),ae)for(let k=0;k<ae.length;k++)f(I,ae[k]);if(F){let k=F.subTree;if(U===k||pd(k.type)&&(k.ssContent===U||k.ssFallback===U)){const V=F.vnode;T(I,V,V.scopeId,V.slotScopeIds,F.parent)}}},R=(I,U,E,ae,F,k,V,ee,B=0)=>{for(let M=B;M<I.length;M++){const y=I[M]=ee?di(I[M]):Nn(I[M]);v(null,y,U,E,ae,F,k,V,ee)}},w=(I,U,E,ae,F,k,V)=>{const ee=U.el=I.el;let{patchFlag:B,dynamicChildren:M,dirs:y}=U;B|=I.patchFlag&16;const L=I.props||mt,j=U.props||mt;let Z;if(E&&Ci(E,!1),(Z=j.onVnodeBeforeUpdate)&&Ln(Z,E,U,I),y&&Ai(U,I,E,"beforeUpdate"),E&&Ci(E,!0),(L.innerHTML&&j.innerHTML==null||L.textContent&&j.textContent==null)&&u(ee,""),M?x(I.dynamicChildren,M,ee,E,ae,Ko(U,F),k):V||O(I,U,ee,null,E,ae,Ko(U,F),k,!1),B>0){if(B&16)D(ee,L,j,E,F);else if(B&2&&L.class!==j.class&&r(ee,"class",null,j.class,F),B&4&&r(ee,"style",L.style,j.style,F),B&8){const Q=U.dynamicProps;for(let xe=0;xe<Q.length;xe++){const ce=Q[xe],Se=L[ce],ke=j[ce];(ke!==Se||ce==="value")&&r(ee,ce,Se,ke,F,E)}}B&1&&I.children!==U.children&&u(ee,U.children)}else!V&&M==null&&D(ee,L,j,E,F);((Z=j.onVnodeUpdated)||y)&&on(()=>{Z&&Ln(Z,E,U,I),y&&Ai(U,I,E,"updated")},ae)},x=(I,U,E,ae,F,k,V)=>{for(let ee=0;ee<U.length;ee++){const B=I[ee],M=U[ee],y=B.el&&(B.type===Zn||!Os(B,M)||B.shapeFlag&70)?h(B.el):E;v(B,M,y,null,ae,F,k,V,!0)}},D=(I,U,E,ae,F)=>{if(U!==E){if(U!==mt)for(const k in U)!js(k)&&!(k in E)&&r(I,k,U[k],null,F,ae);for(const k in E){if(js(k))continue;const V=E[k],ee=U[k];V!==ee&&k!=="value"&&r(I,k,ee,V,F,ae)}"value"in E&&r(I,"value",U.value,E.value,F)}},Y=(I,U,E,ae,F,k,V,ee,B)=>{const M=U.el=I?I.el:a(""),y=U.anchor=I?I.anchor:a("");let{patchFlag:L,dynamicChildren:j,slotScopeIds:Z}=U;Z&&(ee=ee?ee.concat(Z):Z),I==null?(i(M,E,ae),i(y,E,ae),R(U.children||[],E,y,F,k,V,ee,B)):L>0&&L&64&&j&&I.dynamicChildren?(x(I.dynamicChildren,j,E,F,k,V,ee),(U.key!=null||F&&U===F.subTree)&&cd(I,U,!0)):O(I,U,E,y,F,k,V,ee,B)},N=(I,U,E,ae,F,k,V,ee,B)=>{U.slotScopeIds=ee,I==null?U.shapeFlag&512?F.ctx.activate(U,E,ae,V,B):H(U,E,ae,F,k,V,B):$(I,U,B)},H=(I,U,E,ae,F,k,V)=>{const ee=I.component=Mm(I,ae,F);if(qh(I)&&(ee.ctx.renderer=De),Sm(ee,!1,V),ee.asyncDep){if(F&&F.registerDep(ee,G,V),!I.el){const B=ee.subTree=_i(lr);p(null,B,U,E)}}else G(ee,I,U,E,F,k,V)},$=(I,U,E)=>{const ae=U.component=I.component;if(cm(I,U,E))if(ae.asyncDep&&!ae.asyncResolved){X(ae,U,E);return}else ae.next=U,ae.update();else U.el=I.el,ae.vnode=U},G=(I,U,E,ae,F,k,V)=>{const ee=()=>{if(I.isMounted){let{next:L,bu:j,u:Z,parent:Q,vnode:xe}=I;{const pe=ud(I);if(pe){L&&(L.el=xe.el,X(I,L,V)),pe.asyncDep.then(()=>{I.isUnmounted||ee()});return}}let ce=L,Se;Ci(I,!1),L?(L.el=xe.el,X(I,L,V)):L=xe,j&&jo(j),(Se=L.props&&L.props.onVnodeBeforeUpdate)&&Ln(Se,Q,L,xe),Ci(I,!0);const ke=Wc(I),fe=I.subTree;I.subTree=ke,v(fe,ke,h(fe.el),le(fe),I,F,k),L.el=ke.el,ce===null&&um(I,ke.el),Z&&on(Z,F),(Se=L.props&&L.props.onVnodeUpdated)&&on(()=>Ln(Se,Q,L,xe),F)}else{let L;const{el:j,props:Z}=U,{bm:Q,m:xe,parent:ce,root:Se,type:ke}=I,fe=Js(U);Ci(I,!1),Q&&jo(Q),!fe&&(L=Z&&Z.onVnodeBeforeMount)&&Ln(L,ce,U),Ci(I,!0);{Se.ce&&Se.ce._injectChildStyle(ke);const pe=I.subTree=Wc(I);v(null,pe,E,ae,I,F,k),U.el=pe.el}if(xe&&on(xe,F),!fe&&(L=Z&&Z.onVnodeMounted)){const pe=U;on(()=>Ln(L,ce,pe),F)}(U.shapeFlag&256||ce&&Js(ce.vnode)&&ce.vnode.shapeFlag&256)&&I.a&&on(I.a,F),I.isMounted=!0,U=E=ae=null}};I.scope.on();const B=I.effect=new wh(ee);I.scope.off();const M=I.update=B.run.bind(B),y=I.job=B.runIfDirty.bind(B);y.i=I,y.id=I.uid,B.scheduler=()=>ic(y),Ci(I,!0),M()},X=(I,U,E)=>{U.component=I;const ae=I.vnode.props;I.vnode=U,I.next=null,jp(I,U.props,ae,E),Jp(I,U.children,E),Si(),Oc(I),bi()},O=(I,U,E,ae,F,k,V,ee,B=!1)=>{const M=I&&I.children,y=I?I.shapeFlag:0,L=U.children,{patchFlag:j,shapeFlag:Z}=U;if(j>0){if(j&128){he(M,L,E,ae,F,k,V,ee,B);return}else if(j&256){ne(M,L,E,ae,F,k,V,ee,B);return}}Z&8?(y&16&&de(M,F,k),L!==M&&u(E,L)):y&16?Z&16?he(M,L,E,ae,F,k,V,ee,B):de(M,F,k,!0):(y&8&&u(E,""),Z&16&&R(L,E,ae,F,k,V,ee,B))},ne=(I,U,E,ae,F,k,V,ee,B)=>{I=I||_s,U=U||_s;const M=I.length,y=U.length,L=Math.min(M,y);let j;for(j=0;j<L;j++){const Z=U[j]=B?di(U[j]):Nn(U[j]);v(I[j],Z,E,null,F,k,V,ee,B)}M>y?de(I,F,k,!0,!1,L):R(U,E,ae,F,k,V,ee,B,L)},he=(I,U,E,ae,F,k,V,ee,B)=>{let M=0;const y=U.length;let L=I.length-1,j=y-1;for(;M<=L&&M<=j;){const Z=I[M],Q=U[M]=B?di(U[M]):Nn(U[M]);if(Os(Z,Q))v(Z,Q,E,null,F,k,V,ee,B);else break;M++}for(;M<=L&&M<=j;){const Z=I[L],Q=U[j]=B?di(U[j]):Nn(U[j]);if(Os(Z,Q))v(Z,Q,E,null,F,k,V,ee,B);else break;L--,j--}if(M>L){if(M<=j){const Z=j+1,Q=Z<y?U[Z].el:ae;for(;M<=j;)v(null,U[M]=B?di(U[M]):Nn(U[M]),E,Q,F,k,V,ee,B),M++}}else if(M>j)for(;M<=L;)_e(I[M],F,k,!0),M++;else{const Z=M,Q=M,xe=new Map;for(M=Q;M<=j;M++){const ge=U[M]=B?di(U[M]):Nn(U[M]);ge.key!=null&&xe.set(ge.key,M)}let ce,Se=0;const ke=j-Q+1;let fe=!1,pe=0;const be=new Array(ke);for(M=0;M<ke;M++)be[M]=0;for(M=Z;M<=L;M++){const ge=I[M];if(Se>=ke){_e(ge,F,k,!0);continue}let Ie;if(ge.key!=null)Ie=xe.get(ge.key);else for(ce=Q;ce<=j;ce++)if(be[ce-Q]===0&&Os(ge,U[ce])){Ie=ce;break}Ie===void 0?_e(ge,F,k,!0):(be[Ie-Q]=M+1,Ie>=pe?pe=Ie:fe=!0,v(ge,U[Ie],E,null,F,k,V,ee,B),Se++)}const Ne=fe?tm(be):_s;for(ce=Ne.length-1,M=ke-1;M>=0;M--){const ge=Q+M,Ie=U[ge],Oe=ge+1<y?U[ge+1].el:ae;be[M]===0?v(null,Ie,E,Oe,F,k,V,ee,B):fe&&(ce<0||M!==Ne[ce]?me(Ie,E,Oe,2):ce--)}}},me=(I,U,E,ae,F=null)=>{const{el:k,type:V,transition:ee,children:B,shapeFlag:M}=I;if(M&6){me(I.component.subTree,U,E,ae);return}if(M&128){I.suspense.move(U,E,ae);return}if(M&64){V.move(I,U,E,De);return}if(V===Zn){i(k,U,E);for(let L=0;L<B.length;L++)me(B[L],U,E,ae);i(I.anchor,U,E);return}if(V===ea){b(I,U,E);return}if(ae!==2&&M&1&&ee)if(ae===0)ee.beforeEnter(k),i(k,U,E),on(()=>ee.enter(k),F);else{const{leave:L,delayLeave:j,afterLeave:Z}=ee,Q=()=>i(k,U,E),xe=()=>{L(k,()=>{Q(),Z&&Z()})};j?j(k,Q,xe):xe()}else i(k,U,E)},_e=(I,U,E,ae=!1,F=!1)=>{const{type:k,props:V,ref:ee,children:B,dynamicChildren:M,shapeFlag:y,patchFlag:L,dirs:j,cacheIndex:Z}=I;if(L===-2&&(F=!1),ee!=null&&yo(ee,null,E,I,!0),Z!=null&&(U.renderCache[Z]=void 0),y&256){U.ctx.deactivate(I);return}const Q=y&1&&j,xe=!Js(I);let ce;if(xe&&(ce=V&&V.onVnodeBeforeUnmount)&&Ln(ce,U,I),y&6)re(I.component,E,ae);else{if(y&128){I.suspense.unmount(E,ae);return}Q&&Ai(I,null,U,"beforeUnmount"),y&64?I.type.remove(I,U,E,De,ae):M&&!M.hasOnce&&(k!==Zn||L>0&&L&64)?de(M,U,E,!1,!0):(k===Zn&&L&384||!F&&y&16)&&de(B,U,E),ae&&Ue(I)}(xe&&(ce=V&&V.onVnodeUnmounted)||Q)&&on(()=>{ce&&Ln(ce,U,I),Q&&Ai(I,null,U,"unmounted")},E)},Ue=I=>{const{type:U,el:E,anchor:ae,transition:F}=I;if(U===Zn){te(E,ae);return}if(U===ea){_(I);return}const k=()=>{s(E),F&&!F.persisted&&F.afterLeave&&F.afterLeave()};if(I.shapeFlag&1&&F&&!F.persisted){const{leave:V,delayLeave:ee}=F,B=()=>V(E,k);ee?ee(I.el,k,B):B()}else k()},te=(I,U)=>{let E;for(;I!==U;)E=d(I),s(I),I=E;s(U)},re=(I,U,E)=>{const{bum:ae,scope:F,job:k,subTree:V,um:ee,m:B,a:M}=I;Vc(B),Vc(M),ae&&jo(ae),F.stop(),k&&(k.flags|=8,_e(V,I,U,E)),ee&&on(ee,U),on(()=>{I.isUnmounted=!0},U),U&&U.pendingBranch&&!U.isUnmounted&&I.asyncDep&&!I.asyncResolved&&I.suspenseId===U.pendingId&&(U.deps--,U.deps===0&&U.resolve())},de=(I,U,E,ae=!1,F=!1,k=0)=>{for(let V=k;V<I.length;V++)_e(I[V],U,E,ae,F)},le=I=>{if(I.shapeFlag&6)return le(I.component.subTree);if(I.shapeFlag&128)return I.suspense.next();const U=d(I.anchor||I.el),E=U&&U[Mp];return E?d(E):U};let Ce=!1;const Te=(I,U,E)=>{I==null?U._vnode&&_e(U._vnode,null,null,!0):v(U._vnode||null,I,U,null,null,null,E),U._vnode=I,Ce||(Ce=!0,Oc(),Gh(),Ce=!1)},De={p:v,um:_e,m:me,r:Ue,mt:H,mc:R,pc:O,pbc:x,n:le,o:n};return{render:Te,hydrate:void 0,createApp:Wp(Te)}}function Ko({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function Ci({effect:n,job:e},t){t?(n.flags|=32,e.flags|=4):(n.flags&=-33,e.flags&=-5)}function em(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function cd(n,e,t=!1){const i=n.children,s=e.children;if(et(i)&&et(s))for(let r=0;r<i.length;r++){const o=i[r];let a=s[r];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[r]=di(s[r]),a.el=o.el),!t&&a.patchFlag!==-2&&cd(o,a)),a.type===No&&(a.el=o.el)}}function tm(n){const e=n.slice(),t=[0];let i,s,r,o,a;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(s=t[t.length-1],n[s]<c){e[i]=s,t.push(i);continue}for(r=0,o=t.length-1;r<o;)a=r+o>>1,n[t[a]]<c?r=a+1:o=a;c<n[t[r]]&&(r>0&&(e[i]=t[r-1]),t[r]=i)}}for(r=t.length,o=t[r-1];r-- >0;)t[r]=o,o=e[o];return t}function ud(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:ud(e)}function Vc(n){if(n)for(let e=0;e<n.length;e++)n[e].flags|=8}const nm=Symbol.for("v-scx"),im=()=>oo(nm);function Qo(n,e,t){return hd(n,e,t)}function hd(n,e,t=mt){const{immediate:i,deep:s,flush:r,once:o}=t,a=Jt({},t),l=e&&i||!e&&r!=="post";let c;if(ur){if(r==="sync"){const f=im();c=f.__watcherHandles||(f.__watcherHandles=[])}else if(!l){const f=()=>{};return f.stop=Bn,f.resume=Bn,f.pause=Bn,f}}const u=zt;a.call=(f,m,v)=>kn(f,u,m,v);let h=!1;r==="post"?a.scheduler=f=>{on(f,u&&u.suspense)}:r!=="sync"&&(h=!0,a.scheduler=(f,m)=>{m?f():ic(f)}),a.augmentJob=f=>{e&&(f.flags|=4),h&&(f.flags|=2,u&&(f.id=u.uid,f.i=u))};const d=mp(n,e,a);return ur&&(c?c.push(d):l&&d()),d}function sm(n,e,t){const i=this.proxy,s=Lt(n)?n.includes(".")?dd(i,n):()=>i[n]:n.bind(i,i);let r;Qe(e)?r=e:(r=e.handler,t=e);const o=Sr(this),a=hd(s,r.bind(i),t);return o(),a}function dd(n,e){const t=e.split(".");return()=>{let i=n;for(let s=0;s<t.length&&i;s++)i=i[t[s]];return i}}const rm=(n,e)=>e==="modelValue"||e==="model-value"?n.modelModifiers:n[`${e}Modifiers`]||n[`${yn(e)}Modifiers`]||n[`${ji(e)}Modifiers`];function om(n,e,...t){if(n.isUnmounted)return;const i=n.vnode.props||mt;let s=t;const r=e.startsWith("update:"),o=r&&rm(i,e.slice(7));o&&(o.trim&&(s=t.map(u=>Lt(u)?u.trim():u)),o.number&&(s=t.map(Lf)));let a,l=i[a=qo(e)]||i[a=qo(yn(e))];!l&&r&&(l=i[a=qo(ji(e))]),l&&kn(l,n,6,s);const c=i[a+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[a])return;n.emitted[a]=!0,kn(c,n,6,s)}}function fd(n,e,t=!1){const i=e.emitsCache,s=i.get(n);if(s!==void 0)return s;const r=n.emits;let o={},a=!1;if(!Qe(n)){const l=c=>{const u=fd(c,e,!0);u&&(a=!0,Jt(o,u))};!t&&e.mixins.length&&e.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!r&&!a?(wt(n)&&i.set(n,null),null):(et(r)?r.forEach(l=>o[l]=null):Jt(o,r),wt(n)&&i.set(n,o),o)}function Uo(n,e){return!n||!Ao(e)?!1:(e=e.slice(2).replace(/Once$/,""),ct(n,e[0].toLowerCase()+e.slice(1))||ct(n,ji(e))||ct(n,e))}function Wc(n){const{type:e,vnode:t,proxy:i,withProxy:s,propsOptions:[r],slots:o,attrs:a,emit:l,render:c,renderCache:u,props:h,data:d,setupState:f,ctx:m,inheritAttrs:v}=n,g=xo(n);let p,S;try{if(t.shapeFlag&4){const _=s||i,P=_;p=Nn(c.call(P,_,u,h,f,d,m)),S=a}else{const _=e;p=Nn(_.length>1?_(h,{attrs:a,slots:o,emit:l}):_(h,null)),S=e.props?a:am(a)}}catch(_){Qs.length=0,Lo(_,n,1),p=_i(lr)}let b=p;if(S&&v!==!1){const _=Object.keys(S),{shapeFlag:P}=b;_.length&&P&7&&(r&&_.some(Vl)&&(S=lm(S,r)),b=bs(b,S,!1,!0))}return t.dirs&&(b=bs(b,null,!1,!0),b.dirs=b.dirs?b.dirs.concat(t.dirs):t.dirs),t.transition&&sc(b,t.transition),p=b,xo(g),p}const am=n=>{let e;for(const t in n)(t==="class"||t==="style"||Ao(t))&&((e||(e={}))[t]=n[t]);return e},lm=(n,e)=>{const t={};for(const i in n)(!Vl(i)||!(i.slice(9)in e))&&(t[i]=n[i]);return t};function cm(n,e,t){const{props:i,children:s,component:r}=n,{props:o,children:a,patchFlag:l}=e,c=r.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&l>=0){if(l&1024)return!0;if(l&16)return i?Xc(i,o,c):!!o;if(l&8){const u=e.dynamicProps;for(let h=0;h<u.length;h++){const d=u[h];if(o[d]!==i[d]&&!Uo(c,d))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:i===o?!1:i?o?Xc(i,o,c):!0:!!o;return!1}function Xc(n,e,t){const i=Object.keys(e);if(i.length!==Object.keys(n).length)return!0;for(let s=0;s<i.length;s++){const r=i[s];if(e[r]!==n[r]&&!Uo(t,r))return!0}return!1}function um({vnode:n,parent:e},t){for(;e;){const i=e.subTree;if(i.suspense&&i.suspense.activeBranch===n&&(i.el=n.el),i===n)(n=e.vnode).el=t,e=e.parent;else break}}const pd=n=>n.__isSuspense;function hm(n,e){e&&e.pendingBranch?et(n)?e.effects.push(...n):e.effects.push(n):xp(n)}const Zn=Symbol.for("v-fgt"),No=Symbol.for("v-txt"),lr=Symbol.for("v-cmt"),ea=Symbol.for("v-stc"),Qs=[];let dn=null;function md(n=!1){Qs.push(dn=n?null:[])}function dm(){Qs.pop(),dn=Qs[Qs.length-1]||null}let cr=1;function qc(n,e=!1){cr+=n,n<0&&dn&&e&&(dn.hasOnce=!0)}function gd(n){return n.dynamicChildren=cr>0?dn||_s:null,dm(),cr>0&&dn&&dn.push(n),n}function fm(n,e,t,i,s,r){return gd(oc(n,e,t,i,s,r,!0))}function pm(n,e,t,i,s){return gd(_i(n,e,t,i,s,!0))}function vd(n){return n?n.__v_isVNode===!0:!1}function Os(n,e){return n.type===e.type&&n.key===e.key}const _d=({key:n})=>n??null,ao=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?Lt(n)||Ht(n)||Qe(n)?{i:Tn,r:n,k:e,f:!!t}:n:null);function oc(n,e=null,t=null,i=0,s=null,r=n===Zn?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&_d(e),ref:e&&ao(e),scopeId:Wh,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:Tn};return a?(ac(l,t),r&128&&n.normalize(l)):t&&(l.shapeFlag|=Lt(t)?8:16),cr>0&&!o&&dn&&(l.patchFlag>0||r&6)&&l.patchFlag!==32&&dn.push(l),l}const _i=mm;function mm(n,e=null,t=null,i=0,s=null,r=!1){if((!n||n===Np)&&(n=lr),vd(n)){const a=bs(n,e,!0);return t&&ac(a,t),cr>0&&!r&&dn&&(a.shapeFlag&6?dn[dn.indexOf(n)]=a:dn.push(a)),a.patchFlag=-2,a}if(Am(n)&&(n=n.__vccOpts),e){e=gm(e);let{class:a,style:l}=e;a&&!Lt(a)&&(e.class=jl(a)),wt(l)&&(nc(l)&&!et(l)&&(l=Jt({},l)),e.style=ql(l))}const o=Lt(n)?1:pd(n)?128:Sp(n)?64:wt(n)?4:Qe(n)?2:0;return oc(n,e,t,i,s,o,r,!0)}function gm(n){return n?nc(n)||nd(n)?Jt({},n):n:null}function bs(n,e,t=!1,i=!1){const{props:s,ref:r,patchFlag:o,children:a,transition:l}=n,c=e?_m(s||{},e):s,u={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&_d(c),ref:e&&e.ref?t&&r?et(r)?r.concat(ao(e)):[r,ao(e)]:ao(e):r,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:a,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==Zn?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&bs(n.ssContent),ssFallback:n.ssFallback&&bs(n.ssFallback),el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return l&&i&&sc(u,l.clone(u)),u}function vm(n=" ",e=0){return _i(No,null,n,e)}function Nn(n){return n==null||typeof n=="boolean"?_i(lr):et(n)?_i(Zn,null,n.slice()):vd(n)?di(n):_i(No,null,String(n))}function di(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:bs(n)}function ac(n,e){let t=0;const{shapeFlag:i}=n;if(e==null)e=null;else if(et(e))t=16;else if(typeof e=="object")if(i&65){const s=e.default;s&&(s._c&&(s._d=!1),ac(n,s()),s._c&&(s._d=!0));return}else{t=32;const s=e._;!s&&!nd(e)?e._ctx=Tn:s===3&&Tn&&(Tn.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else Qe(e)?(e={default:e,_ctx:Tn},t=32):(e=String(e),i&64?(t=16,e=[vm(e)]):t=8);n.children=e,n.shapeFlag|=t}function _m(...n){const e={};for(let t=0;t<n.length;t++){const i=n[t];for(const s in i)if(s==="class")e.class!==i.class&&(e.class=jl([e.class,i.class]));else if(s==="style")e.style=ql([e.style,i.style]);else if(Ao(s)){const r=e[s],o=i[s];o&&r!==o&&!(et(r)&&r.includes(o))&&(e[s]=r?[].concat(r,o):o)}else s!==""&&(e[s]=i[s])}return e}function Ln(n,e,t,i=null){kn(n,e,7,[t,i])}const xm=Qh();let ym=0;function Mm(n,e,t){const i=n.type,s=(e?e.appContext:n.appContext)||xm,r={uid:ym++,vnode:n,type:i,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new zf(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:sd(i,s),emitsOptions:fd(i,s),emit:null,emitted:null,propsDefaults:mt,inheritAttrs:i.inheritAttrs,ctx:mt,data:mt,props:mt,attrs:mt,slots:mt,refs:mt,setupState:mt,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=e?e.root:r,r.emit=om.bind(null,r),n.ce&&n.ce(r),r}let zt=null,So,ja;{const n=Do(),e=(t,i)=>{let s;return(s=n[t])||(s=n[t]=[]),s.push(i),r=>{s.length>1?s.forEach(o=>o(r)):s[0](r)}};So=e("__VUE_INSTANCE_SETTERS__",t=>zt=t),ja=e("__VUE_SSR_SETTERS__",t=>ur=t)}const Sr=n=>{const e=zt;return So(n),n.scope.on(),()=>{n.scope.off(),So(e)}},jc=()=>{zt&&zt.scope.off(),So(null)};function xd(n){return n.vnode.shapeFlag&4}let ur=!1;function Sm(n,e=!1,t=!1){e&&ja(e);const{props:i,children:s}=n.vnode,r=xd(n);qp(n,i,r,e),Zp(n,s,t);const o=r?bm(n,e):void 0;return e&&ja(!1),o}function bm(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,Fp);const{setup:i}=t;if(i){Si();const s=n.setupContext=i.length>1?Em(n):null,r=Sr(n),o=Mr(i,n,0,[n.props,s]),a=Mh(o);if(bi(),r(),(a||n.sp)&&!Js(n)&&Xh(n),a){if(o.then(jc,jc),e)return o.then(l=>{Yc(n,l)}).catch(l=>{Lo(l,n,0)});n.asyncDep=o}else Yc(n,o)}else yd(n)}function Yc(n,e,t){Qe(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:wt(e)&&(n.setupState=zh(e)),yd(n)}function yd(n,e,t){const i=n.type;n.render||(n.render=i.render||Bn);{const s=Sr(n);Si();try{Bp(n)}finally{bi(),s()}}}const wm={get(n,e){return Bt(n,"get",""),n[e]}};function Em(n){const e=t=>{n.exposed=t||{}};return{attrs:new Proxy(n.attrs,wm),slots:n.slots,emit:n.emit,expose:e}}function lc(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(zh(op(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in Ks)return Ks[t](n)},has(e,t){return t in e||t in Ks}})):n.proxy}function Tm(n,e=!0){return Qe(n)?n.displayName||n.name:n.name||e&&n.__name}function Am(n){return Qe(n)&&"__vccOpts"in n}const Cm=(n,e)=>fp(n,e,ur),Rm="3.5.13";/**
* @vue/runtime-dom v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Ya;const $c=typeof window<"u"&&window.trustedTypes;if($c)try{Ya=$c.createPolicy("vue",{createHTML:n=>n})}catch{}const Md=Ya?n=>Ya.createHTML(n):n=>n,Pm="http://www.w3.org/2000/svg",Dm="http://www.w3.org/1998/Math/MathML",$n=typeof document<"u"?document:null,Zc=$n&&$n.createElement("template"),Lm={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,i)=>{const s=e==="svg"?$n.createElementNS(Pm,n):e==="mathml"?$n.createElementNS(Dm,n):t?$n.createElement(n,{is:t}):$n.createElement(n);return n==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:n=>$n.createTextNode(n),createComment:n=>$n.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>$n.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,i,s,r){const o=t?t.previousSibling:e.lastChild;if(s&&(s===r||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),t),!(s===r||!(s=s.nextSibling)););else{Zc.innerHTML=Md(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const a=Zc.content;if(i==="svg"||i==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}e.insertBefore(a,t)}return[o?o.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},Im=Symbol("_vtc");function Um(n,e,t){const i=n[Im];i&&(e=(e?[e,...i]:[...i]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const Jc=Symbol("_vod"),Nm=Symbol("_vsh"),Om=Symbol(""),Fm=/(^|;)\s*display\s*:/;function Bm(n,e,t){const i=n.style,s=Lt(t);let r=!1;if(t&&!s){if(e)if(Lt(e))for(const o of e.split(";")){const a=o.slice(0,o.indexOf(":")).trim();t[a]==null&&lo(i,a,"")}else for(const o in e)t[o]==null&&lo(i,o,"");for(const o in t)o==="display"&&(r=!0),lo(i,o,t[o])}else if(s){if(e!==t){const o=i[Om];o&&(t+=";"+o),i.cssText=t,r=Fm.test(t)}}else e&&n.removeAttribute("style");Jc in n&&(n[Jc]=r?i.display:"",n[Nm]&&(i.display="none"))}const Kc=/\s*!important$/;function lo(n,e,t){if(et(t))t.forEach(i=>lo(n,e,i));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const i=zm(n,e);Kc.test(t)?n.setProperty(ji(i),t.replace(Kc,""),"important"):n[i]=t}}const Qc=["Webkit","Moz","ms"],ta={};function zm(n,e){const t=ta[e];if(t)return t;let i=yn(e);if(i!=="filter"&&i in n)return ta[e]=i;i=Po(i);for(let s=0;s<Qc.length;s++){const r=Qc[s]+i;if(r in n)return ta[e]=r}return e}const eu="http://www.w3.org/1999/xlink";function tu(n,e,t,i,s,r=Bf(e)){i&&e.startsWith("xlink:")?t==null?n.removeAttributeNS(eu,e.slice(6,e.length)):n.setAttributeNS(eu,e,t):t==null||r&&!bh(t)?n.removeAttribute(e):n.setAttribute(e,r?"":Ps(t)?String(t):t)}function nu(n,e,t,i,s){if(e==="innerHTML"||e==="textContent"){t!=null&&(n[e]=e==="innerHTML"?Md(t):t);return}const r=n.tagName;if(e==="value"&&r!=="PROGRESS"&&!r.includes("-")){const a=r==="OPTION"?n.getAttribute("value")||"":n.value,l=t==null?n.type==="checkbox"?"on":"":String(t);(a!==l||!("_value"in n))&&(n.value=l),t==null&&n.removeAttribute(e),n._value=t;return}let o=!1;if(t===""||t==null){const a=typeof n[e];a==="boolean"?t=bh(t):t==null&&a==="string"?(t="",o=!0):a==="number"&&(t=0,o=!0)}try{n[e]=t}catch{}o&&n.removeAttribute(s||e)}function km(n,e,t,i){n.addEventListener(e,t,i)}function Hm(n,e,t,i){n.removeEventListener(e,t,i)}const iu=Symbol("_vei");function Gm(n,e,t,i,s=null){const r=n[iu]||(n[iu]={}),o=r[e];if(i&&o)o.value=i;else{const[a,l]=Vm(e);if(i){const c=r[e]=qm(i,s);km(n,a,c,l)}else o&&(Hm(n,a,o,l),r[e]=void 0)}}const su=/(?:Once|Passive|Capture)$/;function Vm(n){let e;if(su.test(n)){e={};let i;for(;i=n.match(su);)n=n.slice(0,n.length-i[0].length),e[i[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):ji(n.slice(2)),e]}let na=0;const Wm=Promise.resolve(),Xm=()=>na||(Wm.then(()=>na=0),na=Date.now());function qm(n,e){const t=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=t.attached)return;kn(jm(i,t.value),e,5,[i])};return t.value=n,t.attached=Xm(),t}function jm(n,e){if(et(e)){const t=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{t.call(n),n._stopped=!0},e.map(i=>s=>!s._stopped&&i&&i(s))}else return e}const ru=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,Ym=(n,e,t,i,s,r)=>{const o=s==="svg";e==="class"?Um(n,i,o):e==="style"?Bm(n,t,i):Ao(e)?Vl(e)||Gm(n,e,t,i,r):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):$m(n,e,i,o))?(nu(n,e,i),!n.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&tu(n,e,i,o,r,e!=="value")):n._isVueCE&&(/[A-Z]/.test(e)||!Lt(i))?nu(n,yn(e),i,r,e):(e==="true-value"?n._trueValue=i:e==="false-value"&&(n._falseValue=i),tu(n,e,i,o))};function $m(n,e,t,i){if(i)return!!(e==="innerHTML"||e==="textContent"||e in n&&ru(e)&&Qe(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=n.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return ru(e)&&Lt(t)?!1:e in n}const Zm=Jt({patchProp:Ym},Lm);let ou;function Jm(){return ou||(ou=Kp(Zm))}const Km=(...n)=>{const e=Jm().createApp(...n),{mount:t}=e;return e.mount=i=>{const s=e0(i);if(!s)return;const r=e._component;!Qe(r)&&!r.render&&!r.template&&(r.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=t(s,!1,Qm(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},e};function Qm(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function e0(n){return Lt(n)?document.querySelector(n):n}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const cc="175",Ms={ROTATE:0,DOLLY:1,PAN:2},gs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},t0=0,au=1,n0=2,Sd=1,i0=2,Yn=3,Mi=0,tn=1,kt=2,Rn=0,Gi=1,$a=2,lu=3,cu=4,s0=5,Fi=100,r0=101,o0=102,a0=103,l0=104,c0=200,u0=201,h0=202,d0=203,Za=204,Ja=205,f0=206,p0=207,m0=208,g0=209,v0=210,_0=211,x0=212,y0=213,M0=214,Ka=0,Qa=1,el=2,ws=3,tl=4,nl=5,il=6,sl=7,uc=0,S0=1,b0=2,xi=0,w0=1,E0=2,T0=3,bd=4,A0=5,C0=6,R0=7,wd=300,Es=301,Ts=302,rl=303,ol=304,Oo=306,an=1e3,zi=1001,al=1002,Pn=1003,P0=1004,Ir=1005,en=1006,ia=1007,ki=1008,ni=1009,Ed=1010,Td=1011,hr=1012,hc=1013,Wi=1014,Qn=1015,cn=1016,dc=1017,fc=1018,dr=1020,Ad=35902,Cd=1021,Rd=1022,xn=1023,Pd=1024,Dd=1025,fr=1026,pr=1027,Ld=1028,pc=1029,Id=1030,mc=1031,gc=1033,co=33776,uo=33777,ho=33778,fo=33779,ll=35840,cl=35841,ul=35842,hl=35843,dl=36196,fl=37492,pl=37496,ml=37808,gl=37809,vl=37810,_l=37811,xl=37812,yl=37813,Ml=37814,Sl=37815,bl=37816,wl=37817,El=37818,Tl=37819,Al=37820,Cl=37821,po=36492,Rl=36494,Pl=36495,Ud=36283,Dl=36284,Ll=36285,Il=36286,D0=3200,Nd=3201,vc=0,L0=1,mi="",_n="srgb",As="srgb-linear",bo="linear",ut="srgb",es=7680,uu=519,I0=512,U0=513,N0=514,Od=515,O0=516,F0=517,B0=518,z0=519,hu=35044,du="300 es",ei=2e3,wo=2001;class Yi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Nt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let fu=1234567;const er=Math.PI/180,mr=180/Math.PI;function $i(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Nt[n&255]+Nt[n>>8&255]+Nt[n>>16&255]+Nt[n>>24&255]+"-"+Nt[e&255]+Nt[e>>8&255]+"-"+Nt[e>>16&15|64]+Nt[e>>24&255]+"-"+Nt[t&63|128]+Nt[t>>8&255]+"-"+Nt[t>>16&255]+Nt[t>>24&255]+Nt[i&255]+Nt[i>>8&255]+Nt[i>>16&255]+Nt[i>>24&255]).toLowerCase()}function Ze(n,e,t){return Math.max(e,Math.min(t,n))}function _c(n,e){return(n%e+e)%e}function k0(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function H0(n,e,t){return n!==e?(t-n)/(e-n):0}function tr(n,e,t){return(1-t)*n+t*e}function G0(n,e,t,i){return tr(n,e,1-Math.exp(-t*i))}function V0(n,e=1){return e-Math.abs(_c(n,e*2)-e)}function W0(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function X0(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function q0(n,e){return n+Math.floor(Math.random()*(e-n+1))}function j0(n,e){return n+Math.random()*(e-n)}function Y0(n){return n*(.5-Math.random())}function $0(n){n!==void 0&&(fu=n);let e=fu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Z0(n){return n*er}function J0(n){return n*mr}function K0(n){return(n&n-1)===0&&n!==0}function Q0(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function eg(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function tg(n,e,t,i,s){const r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+i)/2),u=o((e+i)/2),h=r((e-i)/2),d=o((e-i)/2),f=r((i-e)/2),m=o((i-e)/2);switch(s){case"XYX":n.set(a*u,l*h,l*d,a*c);break;case"YZY":n.set(l*d,a*u,l*h,a*c);break;case"ZXZ":n.set(l*h,l*d,a*u,a*c);break;case"XZX":n.set(a*u,l*m,l*f,a*c);break;case"YXY":n.set(l*f,a*u,l*m,a*c);break;case"ZYZ":n.set(l*m,l*f,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ms(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function qt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Ul={DEG2RAD:er,RAD2DEG:mr,generateUUID:$i,clamp:Ze,euclideanModulo:_c,mapLinear:k0,inverseLerp:H0,lerp:tr,damp:G0,pingpong:V0,smoothstep:W0,smootherstep:X0,randInt:q0,randFloat:j0,randFloatSpread:Y0,seededRandom:$0,degToRad:Z0,radToDeg:J0,isPowerOfTwo:K0,ceilPowerOfTwo:Q0,floorPowerOfTwo:eg,setQuaternionFromProperEuler:tg,normalize:qt,denormalize:ms};class ve{constructor(e=0,t=0){ve.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ze(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*s+e.x,this.y=r*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Je{constructor(e,t,i,s,r,o,a,l,c){Je.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,c)}set(e,t,i,s,r,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],h=i[7],d=i[2],f=i[5],m=i[8],v=s[0],g=s[3],p=s[6],S=s[1],b=s[4],_=s[7],P=s[2],C=s[5],T=s[8];return r[0]=o*v+a*S+l*P,r[3]=o*g+a*b+l*C,r[6]=o*p+a*_+l*T,r[1]=c*v+u*S+h*P,r[4]=c*g+u*b+h*C,r[7]=c*p+u*_+h*T,r[2]=d*v+f*S+m*P,r[5]=d*g+f*b+m*C,r[8]=d*p+f*_+m*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-i*r*u+i*a*l+s*r*c-s*o*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=u*o-a*c,d=a*l-u*r,f=c*r-o*l,m=t*h+i*d+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/m;return e[0]=h*v,e[1]=(s*c-u*i)*v,e[2]=(a*i-s*o)*v,e[3]=d*v,e[4]=(u*t-s*l)*v,e[5]=(s*r-a*t)*v,e[6]=f*v,e[7]=(i*l-c*t)*v,e[8]=(o*t-i*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(sa.makeScale(e,t)),this}rotate(e){return this.premultiply(sa.makeRotation(-e)),this}translate(e,t){return this.premultiply(sa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const sa=new Je;function Fd(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function gr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function ng(){const n=gr("canvas");return n.style.display="block",n}const pu={};function mo(n){n in pu||(pu[n]=!0,console.warn(n))}function ig(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}function sg(n){const e=n.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function rg(n){const e=n.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const mu=new Je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),gu=new Je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function og(){const n={enabled:!0,workingColorSpace:As,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===ut&&(s.r=ti(s.r),s.g=ti(s.g),s.b=ti(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ut&&(s.r=Ss(s.r),s.g=Ss(s.g),s.b=Ss(s.b))),s},fromWorkingColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},toWorkingColorSpace:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===mi?bo:this.spaces[s].transfer},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[As]:{primaries:e,whitePoint:i,transfer:bo,toXYZ:mu,fromXYZ:gu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:_n},outputColorSpaceConfig:{drawingBufferColorSpace:_n}},[_n]:{primaries:e,whitePoint:i,transfer:ut,toXYZ:mu,fromXYZ:gu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:_n}}}),n}const rt=og();function ti(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ss(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ts;class ag{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{ts===void 0&&(ts=gr("canvas")),ts.width=e.width,ts.height=e.height;const s=ts.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=ts}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=gr("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ti(r[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(ti(t[i]/255)*255):t[i]=ti(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let lg=0;class xc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:lg++}),this.uuid=$i(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ra(s[o].image)):r.push(ra(s[o]))}else r=ra(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function ra(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?ag.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let cg=0;class Gt extends Yi{constructor(e=Gt.DEFAULT_IMAGE,t=Gt.DEFAULT_MAPPING,i=zi,s=zi,r=en,o=ki,a=xn,l=ni,c=Gt.DEFAULT_ANISOTROPY,u=mi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:cg++}),this.uuid=$i(),this.name="",this.source=new xc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ve(0,0),this.repeat=new ve(1,1),this.center=new ve(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==wd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case an:e.x=e.x-Math.floor(e.x);break;case zi:e.x=e.x<0?0:1;break;case al:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case an:e.y=e.y-Math.floor(e.y);break;case zi:e.y=e.y<0?0:1;break;case al:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Gt.DEFAULT_IMAGE=null;Gt.DEFAULT_MAPPING=wd;Gt.DEFAULT_ANISOTROPY=1;class dt{constructor(e=0,t=0,i=0,s=1){dt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],f=l[5],m=l[9],v=l[2],g=l[6],p=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-v)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+v)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(c+1)/2,_=(f+1)/2,P=(p+1)/2,C=(u+d)/4,T=(h+v)/4,R=(m+g)/4;return b>_&&b>P?b<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(b),s=C/i,r=T/i):_>P?_<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),i=C/s,r=R/s):P<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),i=T/r,s=R/r),this.set(i,s,r,t),this}let S=Math.sqrt((g-m)*(g-m)+(h-v)*(h-v)+(d-u)*(d-u));return Math.abs(S)<.001&&(S=1),this.x=(g-m)/S,this.y=(h-v)/S,this.z=(d-u)/S,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this.w=Ze(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this.w=Ze(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ug extends Yi{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new dt(0,0,e,t),this.scissorTest=!1,this.viewport=new dt(0,0,e,t);const s={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:en,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new Gt(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new xc(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ft extends ug{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Bd extends Gt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Pn,this.minFilter=Pn,this.wrapR=zi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class hg extends Gt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Pn,this.minFilter=Pn,this.wrapR=zi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Xi{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,o,a){let l=i[s+0],c=i[s+1],u=i[s+2],h=i[s+3];const d=r[o+0],f=r[o+1],m=r[o+2],v=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=m,e[t+3]=v;return}if(h!==v||l!==d||c!==f||u!==m){let g=1-a;const p=l*d+c*f+u*m+h*v,S=p>=0?1:-1,b=1-p*p;if(b>Number.EPSILON){const P=Math.sqrt(b),C=Math.atan2(P,p*S);g=Math.sin(g*C)/P,a=Math.sin(a*C)/P}const _=a*S;if(l=l*g+d*_,c=c*g+f*_,u=u*g+m*_,h=h*g+v*_,g===1-a){const P=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=P,c*=P,u*=P,h*=P}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,s,r,o){const a=i[s],l=i[s+1],c=i[s+2],u=i[s+3],h=r[o],d=r[o+1],f=r[o+2],m=r[o+3];return e[t]=a*m+u*h+l*f-c*d,e[t+1]=l*m+u*d+c*h-a*f,e[t+2]=c*m+u*f+a*d-l*h,e[t+3]=u*m-a*h-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(s/2),h=a(r/2),d=l(i/2),f=l(s/2),m=l(r/2);switch(o){case"XYZ":this._x=d*u*h+c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h-d*f*m;break;case"YXZ":this._x=d*u*h+c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h+d*f*m;break;case"ZXY":this._x=d*u*h-c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h-d*f*m;break;case"ZYX":this._x=d*u*h-c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h+d*f*m;break;case"YZX":this._x=d*u*h+c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h-d*f*m;break;case"XZY":this._x=d*u*h-c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=i+a+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(i>a&&i>h){const f=2*Math.sqrt(1+i-a-h);this._w=(u-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>h){const f=2*Math.sqrt(1+a-i-h);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+h-i-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ze(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-i*c,this._z=r*u+o*c+i*l-s*a,this._w=o*u-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+i*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*i+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-t)*u)/c,d=Math.sin(t*u)/c;return this._w=o*h+this._w*d,this._x=i*h+this._x*d,this._y=s*h+this._y*d,this._z=r*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class z{constructor(e=0,t=0,i=0){z.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(vu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(vu.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*i),u=2*(a*t-r*s),h=2*(r*i-o*t);return this.x=t+l*c+o*h-a*u,this.y=i+l*u+a*c-r*h,this.z=s+l*h+r*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return oa.copy(this).projectOnVector(e),this.sub(oa)}reflect(e){return this.sub(oa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ze(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const oa=new z,vu=new Xi;class br{constructor(e=new z(1/0,1/0,1/0),t=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Sn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Sn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Sn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Sn):Sn.fromBufferAttribute(r,o),Sn.applyMatrix4(e.matrixWorld),this.expandByPoint(Sn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ur.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ur.copy(i.boundingBox)),Ur.applyMatrix4(e.matrixWorld),this.union(Ur)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Sn),Sn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Fs),Nr.subVectors(this.max,Fs),ns.subVectors(e.a,Fs),is.subVectors(e.b,Fs),ss.subVectors(e.c,Fs),si.subVectors(is,ns),ri.subVectors(ss,is),Ri.subVectors(ns,ss);let t=[0,-si.z,si.y,0,-ri.z,ri.y,0,-Ri.z,Ri.y,si.z,0,-si.x,ri.z,0,-ri.x,Ri.z,0,-Ri.x,-si.y,si.x,0,-ri.y,ri.x,0,-Ri.y,Ri.x,0];return!aa(t,ns,is,ss,Nr)||(t=[1,0,0,0,1,0,0,0,1],!aa(t,ns,is,ss,Nr))?!1:(Or.crossVectors(si,ri),t=[Or.x,Or.y,Or.z],aa(t,ns,is,ss,Nr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Sn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Sn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Vn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Vn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Vn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Vn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Vn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Vn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Vn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Vn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Vn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Vn=[new z,new z,new z,new z,new z,new z,new z,new z],Sn=new z,Ur=new br,ns=new z,is=new z,ss=new z,si=new z,ri=new z,Ri=new z,Fs=new z,Nr=new z,Or=new z,Pi=new z;function aa(n,e,t,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Pi.fromArray(n,r);const a=s.x*Math.abs(Pi.x)+s.y*Math.abs(Pi.y)+s.z*Math.abs(Pi.z),l=e.dot(Pi),c=t.dot(Pi),u=i.dot(Pi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const dg=new br,Bs=new z,la=new z;class Fo{constructor(e=new z,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):dg.setFromPoints(e).getCenter(i);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Bs.subVectors(e,this.center);const t=Bs.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Bs,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(la.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Bs.copy(e.center).add(la)),this.expandByPoint(Bs.copy(e.center).sub(la))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Wn=new z,ca=new z,Fr=new z,oi=new z,ua=new z,Br=new z,ha=new z;class Bo{constructor(e=new z,t=new z(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Wn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Wn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Wn.copy(this.origin).addScaledVector(this.direction,t),Wn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){ca.copy(e).add(t).multiplyScalar(.5),Fr.copy(t).sub(e).normalize(),oi.copy(this.origin).sub(ca);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Fr),a=oi.dot(this.direction),l=-oi.dot(Fr),c=oi.lengthSq(),u=Math.abs(1-o*o);let h,d,f,m;if(u>0)if(h=o*l-a,d=o*a-l,m=r*u,h>=0)if(d>=-m)if(d<=m){const v=1/u;h*=v,d*=v,f=h*(h+o*d+2*a)+d*(o*h+d+2*l)+c}else d=r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;else d=-r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;else d<=-m?(h=Math.max(0,-(-o*r+a)),d=h>0?-r:Math.min(Math.max(-r,-l),r),f=-h*h+d*(d+2*l)+c):d<=m?(h=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(h=Math.max(0,-(o*r+a)),d=h>0?r:Math.min(Math.max(-r,-l),r),f=-h*h+d*(d+2*l)+c);else d=o>0?-r:r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(ca).addScaledVector(Fr,d),f}intersectSphere(e,t){Wn.subVectors(e.center,this.origin);const i=Wn.dot(this.direction),s=Wn.dot(Wn)-i*i,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),u>=0?(r=(e.min.y-d.y)*u,o=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,o=(e.min.y-d.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),h>=0?(a=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(a=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Wn)!==null}intersectTriangle(e,t,i,s,r){ua.subVectors(t,e),Br.subVectors(i,e),ha.crossVectors(ua,Br);let o=this.direction.dot(ha),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;oi.subVectors(this.origin,e);const l=a*this.direction.dot(Br.crossVectors(oi,Br));if(l<0)return null;const c=a*this.direction.dot(ua.cross(oi));if(c<0||l+c>o)return null;const u=-a*oi.dot(ha);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ft{constructor(e,t,i,s,r,o,a,l,c,u,h,d,f,m,v,g){ft.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,c,u,h,d,f,m,v,g)}set(e,t,i,s,r,o,a,l,c,u,h,d,f,m,v,g){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=m,p[11]=v,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ft().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/rs.setFromMatrixColumn(e,0).length(),r=1/rs.setFromMatrixColumn(e,1).length(),o=1/rs.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const d=o*u,f=o*h,m=a*u,v=a*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=f+m*c,t[5]=d-v*c,t[9]=-a*l,t[2]=v-d*c,t[6]=m+f*c,t[10]=o*l}else if(e.order==="YXZ"){const d=l*u,f=l*h,m=c*u,v=c*h;t[0]=d+v*a,t[4]=m*a-f,t[8]=o*c,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=f*a-m,t[6]=v+d*a,t[10]=o*l}else if(e.order==="ZXY"){const d=l*u,f=l*h,m=c*u,v=c*h;t[0]=d-v*a,t[4]=-o*h,t[8]=m+f*a,t[1]=f+m*a,t[5]=o*u,t[9]=v-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const d=o*u,f=o*h,m=a*u,v=a*h;t[0]=l*u,t[4]=m*c-f,t[8]=d*c+v,t[1]=l*h,t[5]=v*c+d,t[9]=f*c-m,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,f=o*c,m=a*l,v=a*c;t[0]=l*u,t[4]=v-d*h,t[8]=m*h+f,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=f*h+m,t[10]=d-v*h}else if(e.order==="XZY"){const d=o*l,f=o*c,m=a*l,v=a*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+v,t[5]=o*u,t[9]=f*h-m,t[2]=m*h-f,t[6]=a*u,t[10]=v*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(fg,e,pg)}lookAt(e,t,i){const s=this.elements;return sn.subVectors(e,t),sn.lengthSq()===0&&(sn.z=1),sn.normalize(),ai.crossVectors(i,sn),ai.lengthSq()===0&&(Math.abs(i.z)===1?sn.x+=1e-4:sn.z+=1e-4,sn.normalize(),ai.crossVectors(i,sn)),ai.normalize(),zr.crossVectors(sn,ai),s[0]=ai.x,s[4]=zr.x,s[8]=sn.x,s[1]=ai.y,s[5]=zr.y,s[9]=sn.y,s[2]=ai.z,s[6]=zr.z,s[10]=sn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],h=i[5],d=i[9],f=i[13],m=i[2],v=i[6],g=i[10],p=i[14],S=i[3],b=i[7],_=i[11],P=i[15],C=s[0],T=s[4],R=s[8],w=s[12],x=s[1],D=s[5],Y=s[9],N=s[13],H=s[2],$=s[6],G=s[10],X=s[14],O=s[3],ne=s[7],he=s[11],me=s[15];return r[0]=o*C+a*x+l*H+c*O,r[4]=o*T+a*D+l*$+c*ne,r[8]=o*R+a*Y+l*G+c*he,r[12]=o*w+a*N+l*X+c*me,r[1]=u*C+h*x+d*H+f*O,r[5]=u*T+h*D+d*$+f*ne,r[9]=u*R+h*Y+d*G+f*he,r[13]=u*w+h*N+d*X+f*me,r[2]=m*C+v*x+g*H+p*O,r[6]=m*T+v*D+g*$+p*ne,r[10]=m*R+v*Y+g*G+p*he,r[14]=m*w+v*N+g*X+p*me,r[3]=S*C+b*x+_*H+P*O,r[7]=S*T+b*D+_*$+P*ne,r[11]=S*R+b*Y+_*G+P*he,r[15]=S*w+b*N+_*X+P*me,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],f=e[14],m=e[3],v=e[7],g=e[11],p=e[15];return m*(+r*l*h-s*c*h-r*a*d+i*c*d+s*a*f-i*l*f)+v*(+t*l*f-t*c*d+r*o*d-s*o*f+s*c*u-r*l*u)+g*(+t*c*h-t*a*f-r*o*h+i*o*f+r*a*u-i*c*u)+p*(-s*a*u-t*l*h+t*a*d+s*o*h-i*o*d+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],f=e[11],m=e[12],v=e[13],g=e[14],p=e[15],S=h*g*c-v*d*c+v*l*f-a*g*f-h*l*p+a*d*p,b=m*d*c-u*g*c-m*l*f+o*g*f+u*l*p-o*d*p,_=u*v*c-m*h*c+m*a*f-o*v*f-u*a*p+o*h*p,P=m*h*l-u*v*l-m*a*d+o*v*d+u*a*g-o*h*g,C=t*S+i*b+s*_+r*P;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/C;return e[0]=S*T,e[1]=(v*d*r-h*g*r-v*s*f+i*g*f+h*s*p-i*d*p)*T,e[2]=(a*g*r-v*l*r+v*s*c-i*g*c-a*s*p+i*l*p)*T,e[3]=(h*l*r-a*d*r-h*s*c+i*d*c+a*s*f-i*l*f)*T,e[4]=b*T,e[5]=(u*g*r-m*d*r+m*s*f-t*g*f-u*s*p+t*d*p)*T,e[6]=(m*l*r-o*g*r-m*s*c+t*g*c+o*s*p-t*l*p)*T,e[7]=(o*d*r-u*l*r+u*s*c-t*d*c-o*s*f+t*l*f)*T,e[8]=_*T,e[9]=(m*h*r-u*v*r-m*i*f+t*v*f+u*i*p-t*h*p)*T,e[10]=(o*v*r-m*a*r+m*i*c-t*v*c-o*i*p+t*a*p)*T,e[11]=(u*a*r-o*h*r-u*i*c+t*h*c+o*i*f-t*a*f)*T,e[12]=P*T,e[13]=(u*v*s-m*h*s+m*i*d-t*v*d-u*i*g+t*h*g)*T,e[14]=(m*a*s-o*v*s-m*i*l+t*v*l+o*i*g-t*a*g)*T,e[15]=(o*h*s-u*a*s+u*i*l-t*h*l-o*i*d+t*a*d)*T,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,o=e.x,a=e.y,l=e.z,c=r*o,u=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+i,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,o){return this.set(1,i,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,u=o+o,h=a+a,d=r*c,f=r*u,m=r*h,v=o*u,g=o*h,p=a*h,S=l*c,b=l*u,_=l*h,P=i.x,C=i.y,T=i.z;return s[0]=(1-(v+p))*P,s[1]=(f+_)*P,s[2]=(m-b)*P,s[3]=0,s[4]=(f-_)*C,s[5]=(1-(d+p))*C,s[6]=(g+S)*C,s[7]=0,s[8]=(m+b)*T,s[9]=(g-S)*T,s[10]=(1-(d+v))*T,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let r=rs.set(s[0],s[1],s[2]).length();const o=rs.set(s[4],s[5],s[6]).length(),a=rs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],bn.copy(this);const c=1/r,u=1/o,h=1/a;return bn.elements[0]*=c,bn.elements[1]*=c,bn.elements[2]*=c,bn.elements[4]*=u,bn.elements[5]*=u,bn.elements[6]*=u,bn.elements[8]*=h,bn.elements[9]*=h,bn.elements[10]*=h,t.setFromRotationMatrix(bn),i.x=r,i.y=o,i.z=a,this}makePerspective(e,t,i,s,r,o,a=ei){const l=this.elements,c=2*r/(t-e),u=2*r/(i-s),h=(t+e)/(t-e),d=(i+s)/(i-s);let f,m;if(a===ei)f=-(o+r)/(o-r),m=-2*o*r/(o-r);else if(a===wo)f=-o/(o-r),m=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,o,a=ei){const l=this.elements,c=1/(t-e),u=1/(i-s),h=1/(o-r),d=(t+e)*c,f=(i+s)*u;let m,v;if(a===ei)m=(o+r)*h,v=-2*h;else if(a===wo)m=r*h,v=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=v,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const rs=new z,bn=new ft,fg=new z(0,0,0),pg=new z(1,1,1),ai=new z,zr=new z,sn=new z,_u=new ft,xu=new Xi;class Dn{constructor(e=0,t=0,i=0,s=Dn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],h=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Ze(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ze(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ze(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ze(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ze(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ze(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return _u.makeRotationFromQuaternion(e),this.setFromRotationMatrix(_u,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return xu.setFromEuler(this),this.setFromQuaternion(xu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Dn.DEFAULT_ORDER="XYZ";class yc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let mg=0;const yu=new z,os=new Xi,Xn=new ft,kr=new z,zs=new z,gg=new z,vg=new Xi,Mu=new z(1,0,0),Su=new z(0,1,0),bu=new z(0,0,1),wu={type:"added"},_g={type:"removed"},as={type:"childadded",child:null},da={type:"childremoved",child:null};class Dt extends Yi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:mg++}),this.uuid=$i(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Dt.DEFAULT_UP.clone();const e=new z,t=new Dn,i=new Xi,s=new z(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ft},normalMatrix:{value:new Je}}),this.matrix=new ft,this.matrixWorld=new ft,this.matrixAutoUpdate=Dt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new yc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return os.setFromAxisAngle(e,t),this.quaternion.multiply(os),this}rotateOnWorldAxis(e,t){return os.setFromAxisAngle(e,t),this.quaternion.premultiply(os),this}rotateX(e){return this.rotateOnAxis(Mu,e)}rotateY(e){return this.rotateOnAxis(Su,e)}rotateZ(e){return this.rotateOnAxis(bu,e)}translateOnAxis(e,t){return yu.copy(e).applyQuaternion(this.quaternion),this.position.add(yu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Mu,e)}translateY(e){return this.translateOnAxis(Su,e)}translateZ(e){return this.translateOnAxis(bu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Xn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?kr.copy(e):kr.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),zs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Xn.lookAt(zs,kr,this.up):Xn.lookAt(kr,zs,this.up),this.quaternion.setFromRotationMatrix(Xn),s&&(Xn.extractRotation(s.matrixWorld),os.setFromRotationMatrix(Xn),this.quaternion.premultiply(os.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(wu),as.child=e,this.dispatchEvent(as),as.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(_g),da.child=e,this.dispatchEvent(da),da.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Xn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Xn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Xn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(wu),as.child=e,this.dispatchEvent(as),as.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zs,e,gg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zs,vg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),d=o(e.skeletons),f=o(e.animations),m=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),d.length>0&&(i.skeletons=d),f.length>0&&(i.animations=f),m.length>0&&(i.nodes=m)}return i.object=s,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}Dt.DEFAULT_UP=new z(0,1,0);Dt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const wn=new z,qn=new z,fa=new z,jn=new z,ls=new z,cs=new z,Eu=new z,pa=new z,ma=new z,ga=new z,va=new dt,_a=new dt,xa=new dt;class En{constructor(e=new z,t=new z,i=new z){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),wn.subVectors(e,t),s.cross(wn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){wn.subVectors(s,t),qn.subVectors(i,t),fa.subVectors(e,t);const o=wn.dot(wn),a=wn.dot(qn),l=wn.dot(fa),c=qn.dot(qn),u=qn.dot(fa),h=o*c-a*a;if(h===0)return r.set(0,0,0),null;const d=1/h,f=(c*l-a*u)*d,m=(o*u-a*l)*d;return r.set(1-f-m,m,f)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,jn)===null?!1:jn.x>=0&&jn.y>=0&&jn.x+jn.y<=1}static getInterpolation(e,t,i,s,r,o,a,l){return this.getBarycoord(e,t,i,s,jn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,jn.x),l.addScaledVector(o,jn.y),l.addScaledVector(a,jn.z),l)}static getInterpolatedAttribute(e,t,i,s,r,o){return va.setScalar(0),_a.setScalar(0),xa.setScalar(0),va.fromBufferAttribute(e,t),_a.fromBufferAttribute(e,i),xa.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(va,r.x),o.addScaledVector(_a,r.y),o.addScaledVector(xa,r.z),o}static isFrontFacing(e,t,i,s){return wn.subVectors(i,t),qn.subVectors(e,t),wn.cross(qn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return wn.subVectors(this.c,this.b),qn.subVectors(this.a,this.b),wn.cross(qn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return En.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return En.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return En.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return En.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return En.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let o,a;ls.subVectors(s,i),cs.subVectors(r,i),pa.subVectors(e,i);const l=ls.dot(pa),c=cs.dot(pa);if(l<=0&&c<=0)return t.copy(i);ma.subVectors(e,s);const u=ls.dot(ma),h=cs.dot(ma);if(u>=0&&h<=u)return t.copy(s);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(ls,o);ga.subVectors(e,r);const f=ls.dot(ga),m=cs.dot(ga);if(m>=0&&f<=m)return t.copy(r);const v=f*c-l*m;if(v<=0&&c>=0&&m<=0)return a=c/(c-m),t.copy(i).addScaledVector(cs,a);const g=u*m-f*h;if(g<=0&&h-u>=0&&f-m>=0)return Eu.subVectors(r,s),a=(h-u)/(h-u+(f-m)),t.copy(s).addScaledVector(Eu,a);const p=1/(g+v+d);return o=v*p,a=d*p,t.copy(i).addScaledVector(ls,o).addScaledVector(cs,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const zd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},li={h:0,s:0,l:0},Hr={h:0,s:0,l:0};function ya(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class ze{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=_n){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,rt.toWorkingColorSpace(this,t),this}setRGB(e,t,i,s=rt.workingColorSpace){return this.r=e,this.g=t,this.b=i,rt.toWorkingColorSpace(this,s),this}setHSL(e,t,i,s=rt.workingColorSpace){if(e=_c(e,1),t=Ze(t,0,1),i=Ze(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=ya(o,r,e+1/3),this.g=ya(o,r,e),this.b=ya(o,r,e-1/3)}return rt.toWorkingColorSpace(this,s),this}setStyle(e,t=_n){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=_n){const i=zd[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ti(e.r),this.g=ti(e.g),this.b=ti(e.b),this}copyLinearToSRGB(e){return this.r=Ss(e.r),this.g=Ss(e.g),this.b=Ss(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=_n){return rt.fromWorkingColorSpace(Ot.copy(this),e),Math.round(Ze(Ot.r*255,0,255))*65536+Math.round(Ze(Ot.g*255,0,255))*256+Math.round(Ze(Ot.b*255,0,255))}getHexString(e=_n){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=rt.workingColorSpace){rt.fromWorkingColorSpace(Ot.copy(this),t);const i=Ot.r,s=Ot.g,r=Ot.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case i:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-i)/h+2;break;case r:l=(i-s)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=rt.workingColorSpace){return rt.fromWorkingColorSpace(Ot.copy(this),t),e.r=Ot.r,e.g=Ot.g,e.b=Ot.b,e}getStyle(e=_n){rt.fromWorkingColorSpace(Ot.copy(this),e);const t=Ot.r,i=Ot.g,s=Ot.b;return e!==_n?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(li),this.setHSL(li.h+e,li.s+t,li.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(li),e.getHSL(Hr);const i=tr(li.h,Hr.h,t),s=tr(li.s,Hr.s,t),r=tr(li.l,Hr.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ot=new ze;ze.NAMES=zd;let xg=0;class Zi extends Yi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:xg++}),this.uuid=$i(),this.name="",this.type="Material",this.blending=Gi,this.side=Mi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Za,this.blendDst=Ja,this.blendEquation=Fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ze(0,0,0),this.blendAlpha=0,this.depthFunc=ws,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=uu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=es,this.stencilZFail=es,this.stencilZPass=es,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Gi&&(i.blending=this.blending),this.side!==Mi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Za&&(i.blendSrc=this.blendSrc),this.blendDst!==Ja&&(i.blendDst=this.blendDst),this.blendEquation!==Fi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ws&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==uu&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==es&&(i.stencilFail=this.stencilFail),this.stencilZFail!==es&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==es&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class At extends Zi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dn,this.combine=uc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const bt=new z,Gr=new ve;let yg=0;class zn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:yg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=hu,this.updateRanges=[],this.gpuType=Qn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Gr.fromBufferAttribute(this,t),Gr.applyMatrix3(e),this.setXY(t,Gr.x,Gr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)bt.fromBufferAttribute(this,t),bt.applyMatrix3(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)bt.fromBufferAttribute(this,t),bt.applyMatrix4(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)bt.fromBufferAttribute(this,t),bt.applyNormalMatrix(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)bt.fromBufferAttribute(this,t),bt.transformDirection(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=ms(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=qt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ms(t,this.array)),t}setX(e,t){return this.normalized&&(t=qt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ms(t,this.array)),t}setY(e,t){return this.normalized&&(t=qt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ms(t,this.array)),t}setZ(e,t){return this.normalized&&(t=qt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ms(t,this.array)),t}setW(e,t){return this.normalized&&(t=qt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=qt(t,this.array),i=qt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=qt(t,this.array),i=qt(i,this.array),s=qt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=qt(t,this.array),i=qt(i,this.array),s=qt(s,this.array),r=qt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==hu&&(e.usage=this.usage),e}}class kd extends zn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Hd extends zn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class it extends zn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Mg=0;const vn=new ft,Ma=new Dt,us=new z,rn=new br,ks=new br,Pt=new z;class Et extends Yi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Mg++}),this.uuid=$i(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Fd(e)?Hd:kd)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Je().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return vn.makeRotationFromQuaternion(e),this.applyMatrix4(vn),this}rotateX(e){return vn.makeRotationX(e),this.applyMatrix4(vn),this}rotateY(e){return vn.makeRotationY(e),this.applyMatrix4(vn),this}rotateZ(e){return vn.makeRotationZ(e),this.applyMatrix4(vn),this}translate(e,t,i){return vn.makeTranslation(e,t,i),this.applyMatrix4(vn),this}scale(e,t,i){return vn.makeScale(e,t,i),this.applyMatrix4(vn),this}lookAt(e){return Ma.lookAt(e),Ma.updateMatrix(),this.applyMatrix4(Ma.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(us).negate(),this.translate(us.x,us.y,us.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new it(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new br);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];rn.setFromBufferAttribute(r),this.morphTargetsRelative?(Pt.addVectors(this.boundingBox.min,rn.min),this.boundingBox.expandByPoint(Pt),Pt.addVectors(this.boundingBox.max,rn.max),this.boundingBox.expandByPoint(Pt)):(this.boundingBox.expandByPoint(rn.min),this.boundingBox.expandByPoint(rn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Fo);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(e){const i=this.boundingSphere.center;if(rn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];ks.setFromBufferAttribute(a),this.morphTargetsRelative?(Pt.addVectors(rn.min,ks.min),rn.expandByPoint(Pt),Pt.addVectors(rn.max,ks.max),rn.expandByPoint(Pt)):(rn.expandByPoint(ks.min),rn.expandByPoint(ks.max))}rn.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)Pt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Pt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Pt.fromBufferAttribute(a,c),l&&(us.fromBufferAttribute(e,c),Pt.add(us)),s=Math.max(s,i.distanceToSquared(Pt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new zn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let R=0;R<i.count;R++)a[R]=new z,l[R]=new z;const c=new z,u=new z,h=new z,d=new ve,f=new ve,m=new ve,v=new z,g=new z;function p(R,w,x){c.fromBufferAttribute(i,R),u.fromBufferAttribute(i,w),h.fromBufferAttribute(i,x),d.fromBufferAttribute(r,R),f.fromBufferAttribute(r,w),m.fromBufferAttribute(r,x),u.sub(c),h.sub(c),f.sub(d),m.sub(d);const D=1/(f.x*m.y-m.x*f.y);isFinite(D)&&(v.copy(u).multiplyScalar(m.y).addScaledVector(h,-f.y).multiplyScalar(D),g.copy(h).multiplyScalar(f.x).addScaledVector(u,-m.x).multiplyScalar(D),a[R].add(v),a[w].add(v),a[x].add(v),l[R].add(g),l[w].add(g),l[x].add(g))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let R=0,w=S.length;R<w;++R){const x=S[R],D=x.start,Y=x.count;for(let N=D,H=D+Y;N<H;N+=3)p(e.getX(N+0),e.getX(N+1),e.getX(N+2))}const b=new z,_=new z,P=new z,C=new z;function T(R){P.fromBufferAttribute(s,R),C.copy(P);const w=a[R];b.copy(w),b.sub(P.multiplyScalar(P.dot(w))).normalize(),_.crossVectors(C,w);const D=_.dot(l[R])<0?-1:1;o.setXYZW(R,b.x,b.y,b.z,D)}for(let R=0,w=S.length;R<w;++R){const x=S[R],D=x.start,Y=x.count;for(let N=D,H=D+Y;N<H;N+=3)T(e.getX(N+0)),T(e.getX(N+1)),T(e.getX(N+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new zn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,f=i.count;d<f;d++)i.setXYZ(d,0,0,0);const s=new z,r=new z,o=new z,a=new z,l=new z,c=new z,u=new z,h=new z;if(e)for(let d=0,f=e.count;d<f;d+=3){const m=e.getX(d+0),v=e.getX(d+1),g=e.getX(d+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,v),o.fromBufferAttribute(t,g),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),a.fromBufferAttribute(i,m),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,g),a.add(u),l.add(u),c.add(u),i.setXYZ(m,a.x,a.y,a.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Pt.fromBufferAttribute(e,t),Pt.normalize(),e.setXYZ(t,Pt.x,Pt.y,Pt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,h=a.normalized,d=new c.constructor(l.length*u);let f=0,m=0;for(let v=0,g=l.length;v<g;v++){a.isInterleavedBufferAttribute?f=l[v]*a.data.stride+a.offset:f=l[v]*u;for(let p=0;p<u;p++)d[m++]=c[f++]}return new zn(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Et,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=e(l,i);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,h=c.length;u<h;u++){const d=c[u],f=e(d,i);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const f=c[h];u.push(f.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],h=r[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Tu=new ft,Di=new Bo,Vr=new Fo,Au=new z,Wr=new z,Xr=new z,qr=new z,Sa=new z,jr=new z,Cu=new z,Yr=new z;class W extends Dt{constructor(e=new Et,t=new At){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){jr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],h=r[l];u!==0&&(Sa.fromBufferAttribute(h,e),o?jr.addScaledVector(Sa,u):jr.addScaledVector(Sa.sub(t),u))}t.add(jr)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Vr.copy(i.boundingSphere),Vr.applyMatrix4(r),Di.copy(e.ray).recast(e.near),!(Vr.containsPoint(Di.origin)===!1&&(Di.intersectSphere(Vr,Au)===null||Di.origin.distanceToSquared(Au)>(e.far-e.near)**2))&&(Tu.copy(r).invert(),Di.copy(e.ray).applyMatrix4(Tu),!(i.boundingBox!==null&&Di.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Di)))}_computeIntersections(e,t,i){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,v=d.length;m<v;m++){const g=d[m],p=o[g.materialIndex],S=Math.max(g.start,f.start),b=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let _=S,P=b;_<P;_+=3){const C=a.getX(_),T=a.getX(_+1),R=a.getX(_+2);s=$r(this,p,e,i,c,u,h,C,T,R),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const m=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let g=m,p=v;g<p;g+=3){const S=a.getX(g),b=a.getX(g+1),_=a.getX(g+2);s=$r(this,o,e,i,c,u,h,S,b,_),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,v=d.length;m<v;m++){const g=d[m],p=o[g.materialIndex],S=Math.max(g.start,f.start),b=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let _=S,P=b;_<P;_+=3){const C=_,T=_+1,R=_+2;s=$r(this,p,e,i,c,u,h,C,T,R),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const m=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let g=m,p=v;g<p;g+=3){const S=g,b=g+1,_=g+2;s=$r(this,o,e,i,c,u,h,S,b,_),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}}function Sg(n,e,t,i,s,r,o,a){let l;if(e.side===tn?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,e.side===Mi,a),l===null)return null;Yr.copy(a),Yr.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Yr);return c<t.near||c>t.far?null:{distance:c,point:Yr.clone(),object:n}}function $r(n,e,t,i,s,r,o,a,l,c){n.getVertexPosition(a,Wr),n.getVertexPosition(l,Xr),n.getVertexPosition(c,qr);const u=Sg(n,e,t,i,Wr,Xr,qr,Cu);if(u){const h=new z;En.getBarycoord(Cu,Wr,Xr,qr,h),s&&(u.uv=En.getInterpolatedAttribute(s,a,l,c,h,new ve)),r&&(u.uv1=En.getInterpolatedAttribute(r,a,l,c,h,new ve)),o&&(u.normal=En.getInterpolatedAttribute(o,a,l,c,h,new z),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new z,materialIndex:0};En.getNormal(Wr,Xr,qr,d.normal),u.face=d,u.barycoord=h}return u}class ye extends Et{constructor(e=1,t=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],h=[];let d=0,f=0;m("z","y","x",-1,-1,i,t,e,o,r,0),m("z","y","x",1,-1,i,t,-e,o,r,1),m("x","z","y",1,1,e,i,t,s,o,2),m("x","z","y",1,-1,e,i,-t,s,o,3),m("x","y","z",1,-1,e,t,i,s,r,4),m("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new it(c,3)),this.setAttribute("normal",new it(u,3)),this.setAttribute("uv",new it(h,2));function m(v,g,p,S,b,_,P,C,T,R,w){const x=_/T,D=P/R,Y=_/2,N=P/2,H=C/2,$=T+1,G=R+1;let X=0,O=0;const ne=new z;for(let he=0;he<G;he++){const me=he*D-N;for(let _e=0;_e<$;_e++){const Ue=_e*x-Y;ne[v]=Ue*S,ne[g]=me*b,ne[p]=H,c.push(ne.x,ne.y,ne.z),ne[v]=0,ne[g]=0,ne[p]=C>0?1:-1,u.push(ne.x,ne.y,ne.z),h.push(_e/T),h.push(1-he/R),X+=1}}for(let he=0;he<R;he++)for(let me=0;me<T;me++){const _e=d+me+$*he,Ue=d+me+$*(he+1),te=d+(me+1)+$*(he+1),re=d+(me+1)+$*he;l.push(_e,Ue,re),l.push(Ue,te,re),O+=6}a.addGroup(f,O,w),f+=O,d+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ye(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Cs(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function jt(n){const e={};for(let t=0;t<n.length;t++){const i=Cs(n[t]);for(const s in i)e[s]=i[s]}return e}function bg(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Gd(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:rt.workingColorSpace}const Mc={clone:Cs,merge:jt};var wg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Eg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Zt extends Zi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=wg,this.fragmentShader=Eg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Cs(e.uniforms),this.uniformsGroups=bg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Vd extends Dt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ft,this.projectionMatrix=new ft,this.projectionMatrixInverse=new ft,this.coordinateSystem=ei}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ci=new z,Ru=new ve,Pu=new ve;class un extends Vd{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=mr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(er*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return mr*2*Math.atan(Math.tan(er*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){ci.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ci.x,ci.y).multiplyScalar(-e/ci.z),ci.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ci.x,ci.y).multiplyScalar(-e/ci.z)}getViewSize(e,t){return this.getViewBounds(e,Ru,Pu),t.subVectors(Pu,Ru)}setViewOffset(e,t,i,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(er*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const hs=-90,ds=1;class Tg extends Dt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new un(hs,ds,e,t);s.layers=this.layers,this.add(s);const r=new un(hs,ds,e,t);r.layers=this.layers,this.add(r);const o=new un(hs,ds,e,t);o.layers=this.layers,this.add(o);const a=new un(hs,ds,e,t);a.layers=this.layers,this.add(a);const l=new un(hs,ds,e,t);l.layers=this.layers,this.add(l);const c=new un(hs,ds,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===ei)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===wo)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,o),e.setRenderTarget(i,2,s),e.render(t,a),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,c),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,s),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class Wd extends Gt{constructor(e=[],t=Es,i,s,r,o,a,l,c,u){super(e,t,i,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ag extends Ft{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Wd(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:en}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new ye(5,5,5),r=new Zt({name:"CubemapFromEquirect",uniforms:Cs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:tn,blending:Rn});r.uniforms.tEquirect.value=t;const o=new W(s,r),a=t.minFilter;return t.minFilter===ki&&(t.minFilter=en),new Tg(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(r)}}class Ye extends Dt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Cg={type:"move"};class ba{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ye,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ye,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ye,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const v of e.hand.values()){const g=t.getJointPose(v,i),p=this._getHandJoint(c,v);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Cg)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ye;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Rg extends Dt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Dn,this.environmentIntensity=1,this.environmentRotation=new Dn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const wa=new z,Pg=new z,Dg=new Je;class fi{constructor(e=new z(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=wa.subVectors(i,t).cross(Pg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(wa),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Dg.getNormalMatrix(e),s=this.coplanarPoint(wa).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Li=new Fo,Zr=new z;class Sc{constructor(e=new fi,t=new fi,i=new fi,s=new fi,r=new fi,o=new fi){this.planes=[e,t,i,s,r,o]}set(e,t,i,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=ei){const i=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],u=s[5],h=s[6],d=s[7],f=s[8],m=s[9],v=s[10],g=s[11],p=s[12],S=s[13],b=s[14],_=s[15];if(i[0].setComponents(l-r,d-c,g-f,_-p).normalize(),i[1].setComponents(l+r,d+c,g+f,_+p).normalize(),i[2].setComponents(l+o,d+u,g+m,_+S).normalize(),i[3].setComponents(l-o,d-u,g-m,_-S).normalize(),i[4].setComponents(l-a,d-h,g-v,_-b).normalize(),t===ei)i[5].setComponents(l+a,d+h,g+v,_+b).normalize();else if(t===wo)i[5].setComponents(a,h,v,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Li.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Li.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Li)}intersectsSprite(e){return Li.center.set(0,0,0),Li.radius=.7071067811865476,Li.applyMatrix4(e.matrixWorld),this.intersectsSphere(Li)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(Zr.x=s.normal.x>0?e.max.x:e.min.x,Zr.y=s.normal.y>0?e.max.y:e.min.y,Zr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Zr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class bc extends Zi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ze(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Eo=new z,To=new z,Du=new ft,Hs=new Bo,Jr=new Fo,Ea=new z,Lu=new z;class Xd extends Dt{constructor(e=new Et,t=new bc){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)Eo.fromBufferAttribute(t,s-1),To.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=Eo.distanceTo(To);e.setAttribute("lineDistance",new it(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Jr.copy(i.boundingSphere),Jr.applyMatrix4(s),Jr.radius+=r,e.ray.intersectsSphere(Jr)===!1)return;Du.copy(s).invert(),Hs.copy(e.ray).applyMatrix4(Du);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,d=i.attributes.position;if(u!==null){const f=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let v=f,g=m-1;v<g;v+=c){const p=u.getX(v),S=u.getX(v+1),b=Kr(this,e,Hs,l,p,S,v);b&&t.push(b)}if(this.isLineLoop){const v=u.getX(m-1),g=u.getX(f),p=Kr(this,e,Hs,l,v,g,m-1);p&&t.push(p)}}else{const f=Math.max(0,o.start),m=Math.min(d.count,o.start+o.count);for(let v=f,g=m-1;v<g;v+=c){const p=Kr(this,e,Hs,l,v,v+1,v);p&&t.push(p)}if(this.isLineLoop){const v=Kr(this,e,Hs,l,m-1,f,m-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Kr(n,e,t,i,s,r,o){const a=n.geometry.attributes.position;if(Eo.fromBufferAttribute(a,s),To.fromBufferAttribute(a,r),t.distanceSqToSegment(Eo,To,Ea,Lu)>i)return;Ea.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Ea);if(!(c<e.near||c>e.far))return{distance:c,point:Lu.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}class qd extends Gt{constructor(e,t,i,s,r,o,a,l,c){super(e,t,i,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class jd extends Gt{constructor(e,t,i=Wi,s,r,o,a=Pn,l=Pn,c,u=fr){if(u!==fr&&u!==pr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super(null,s,r,o,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new xc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Hn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),r+=i.distanceTo(s),t.push(r),s=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const i=this.getLengths();let s=0;const r=i.length;let o;t?o=t:o=e*i[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=i[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===o)return s/(r-1);const u=i[s],d=i[s+1]-u,f=(o-u)/d;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=t||(o.isVector2?new ve:new z);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){const i=new z,s=[],r=[],o=[],a=new z,l=new ft;for(let f=0;f<=e;f++){const m=f/e;s[f]=this.getTangentAt(m,new z)}r[0]=new z,o[0]=new z;let c=Number.MAX_VALUE;const u=Math.abs(s[0].x),h=Math.abs(s[0].y),d=Math.abs(s[0].z);u<=c&&(c=u,i.set(1,0,0)),h<=c&&(c=h,i.set(0,1,0)),d<=c&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();const m=Math.acos(Ze(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,m))}o[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(Ze(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let m=1;m<=e;m++)r[m].applyMatrix4(l.makeRotationAxis(s[m],f*m)),o[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class vr extends Hn{constructor(e=0,t=0,i=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new ve){const i=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*u-f*h+this.aX,c=d*h+f*u+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Lg extends vr{constructor(e,t,i,s,r,o){super(e,t,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function wc(){let n=0,e=0,t=0,i=0;function s(r,o,a,l){n=r,e=a,t=-3*r+3*o-2*a-l,i=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,u,h){let d=(o-r)/c-(a-r)/(c+u)+(a-o)/u,f=(a-o)/u-(l-o)/(u+h)+(l-a)/h;d*=u,f*=u,s(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return n+e*r+t*o+i*a}}}const Qr=new z,Ta=new wc,Aa=new wc,Ca=new wc;class Ig extends Hn{constructor(e=[],t=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=s}getPoint(e,t=new z){const i=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,u;this.closed||a>0?c=s[(a-1)%r]:(Qr.subVectors(s[0],s[1]).add(s[0]),c=Qr);const h=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:(Qr.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=Qr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(h),f),v=Math.pow(h.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(u),f);v<1e-4&&(v=1),m<1e-4&&(m=v),g<1e-4&&(g=v),Ta.initNonuniformCatmullRom(c.x,h.x,d.x,u.x,m,v,g),Aa.initNonuniformCatmullRom(c.y,h.y,d.y,u.y,m,v,g),Ca.initNonuniformCatmullRom(c.z,h.z,d.z,u.z,m,v,g)}else this.curveType==="catmullrom"&&(Ta.initCatmullRom(c.x,h.x,d.x,u.x,this.tension),Aa.initCatmullRom(c.y,h.y,d.y,u.y,this.tension),Ca.initCatmullRom(c.z,h.z,d.z,u.z,this.tension));return i.set(Ta.calc(l),Aa.calc(l),Ca.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new z().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Iu(n,e,t,i,s){const r=(i-e)*.5,o=(s-t)*.5,a=n*n,l=n*a;return(2*t-2*i+r+o)*l+(-3*t+3*i-2*r-o)*a+r*n+t}function Ug(n,e){const t=1-n;return t*t*e}function Ng(n,e){return 2*(1-n)*n*e}function Og(n,e){return n*n*e}function nr(n,e,t,i){return Ug(n,e)+Ng(n,t)+Og(n,i)}function Fg(n,e){const t=1-n;return t*t*t*e}function Bg(n,e){const t=1-n;return 3*t*t*n*e}function zg(n,e){return 3*(1-n)*n*n*e}function kg(n,e){return n*n*n*e}function ir(n,e,t,i,s){return Fg(n,e)+Bg(n,t)+zg(n,i)+kg(n,s)}class Yd extends Hn{constructor(e=new ve,t=new ve,i=new ve,s=new ve){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new ve){const i=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(ir(e,s.x,r.x,o.x,a.x),ir(e,s.y,r.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Hg extends Hn{constructor(e=new z,t=new z,i=new z,s=new z){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new z){const i=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(ir(e,s.x,r.x,o.x,a.x),ir(e,s.y,r.y,o.y,a.y),ir(e,s.z,r.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class $d extends Hn{constructor(e=new ve,t=new ve){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ve){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ve){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Gg extends Hn{constructor(e=new z,t=new z){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new z){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new z){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Zd extends Hn{constructor(e=new ve,t=new ve,i=new ve){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new ve){const i=t,s=this.v0,r=this.v1,o=this.v2;return i.set(nr(e,s.x,r.x,o.x),nr(e,s.y,r.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Vg extends Hn{constructor(e=new z,t=new z,i=new z){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new z){const i=t,s=this.v0,r=this.v1,o=this.v2;return i.set(nr(e,s.x,r.x,o.x),nr(e,s.y,r.y,o.y),nr(e,s.z,r.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Jd extends Hn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ve){const i=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],u=s[o>s.length-2?s.length-1:o+1],h=s[o>s.length-3?s.length-1:o+2];return i.set(Iu(a,l.x,c.x,u.x,h.x),Iu(a,l.y,c.y,u.y,h.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new ve().fromArray(s))}return this}}var Nl=Object.freeze({__proto__:null,ArcCurve:Lg,CatmullRomCurve3:Ig,CubicBezierCurve:Yd,CubicBezierCurve3:Hg,EllipseCurve:vr,LineCurve:$d,LineCurve3:Gg,QuadraticBezierCurve:Zd,QuadraticBezierCurve3:Vg,SplineCurve:Jd});class Wg extends Hn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Nl[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=i){const o=s[r]-i,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,s=this.curves.length;i<s;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const u=l[c];i&&i.equals(u)||(t.push(u),i=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const s=e.curves[t];this.curves.push(new Nl[s.type]().fromJSON(s))}return this}}class Ol extends Wg{constructor(e){super(),this.type="Path",this.currentPoint=new ve,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new $d(this.currentPoint.clone(),new ve(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,s){const r=new Zd(this.currentPoint.clone(),new ve(e,t),new ve(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(e,t,i,s,r,o){const a=new Yd(this.currentPoint.clone(),new ve(e,t),new ve(i,s),new ve(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new Jd(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,s,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,i,s,r,o),this}absarc(e,t,i,s,r,o){return this.absellipse(e,t,i,i,s,r,o),this}ellipse(e,t,i,s,r,o,a,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,i,s,r,o,a,l),this}absellipse(e,t,i,s,r,o,a,l){const c=new vr(e,t,i,s,r,o,a,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Ec extends Et{constructor(e=[new ve(0,-.5),new ve(.5,0),new ve(0,.5)],t=12,i=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:i,phiLength:s},t=Math.floor(t),s=Ze(s,0,Math.PI*2);const r=[],o=[],a=[],l=[],c=[],u=1/t,h=new z,d=new ve,f=new z,m=new z,v=new z;let g=0,p=0;for(let S=0;S<=e.length-1;S++)switch(S){case 0:g=e[S+1].x-e[S].x,p=e[S+1].y-e[S].y,f.x=p*1,f.y=-g,f.z=p*0,v.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(v.x,v.y,v.z);break;default:g=e[S+1].x-e[S].x,p=e[S+1].y-e[S].y,f.x=p*1,f.y=-g,f.z=p*0,m.copy(f),f.x+=v.x,f.y+=v.y,f.z+=v.z,f.normalize(),l.push(f.x,f.y,f.z),v.copy(m)}for(let S=0;S<=t;S++){const b=i+S*u*s,_=Math.sin(b),P=Math.cos(b);for(let C=0;C<=e.length-1;C++){h.x=e[C].x*_,h.y=e[C].y,h.z=e[C].x*P,o.push(h.x,h.y,h.z),d.x=S/t,d.y=C/(e.length-1),a.push(d.x,d.y);const T=l[3*C+0]*_,R=l[3*C+1],w=l[3*C+0]*P;c.push(T,R,w)}}for(let S=0;S<t;S++)for(let b=0;b<e.length-1;b++){const _=b+S*e.length,P=_,C=_+e.length,T=_+e.length+1,R=_+1;r.push(P,C,R),r.push(T,R,C)}this.setIndex(r),this.setAttribute("position",new it(o,3)),this.setAttribute("uv",new it(a,2)),this.setAttribute("normal",new it(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ec(e.points,e.segments,e.phiStart,e.phiLength)}}class sr extends Ec{constructor(e=1,t=1,i=4,s=8){const r=new Ol;r.absarc(0,-t/2,e,Math.PI*1.5,0),r.absarc(0,t/2,e,0,Math.PI*.5),super(r.getPoints(i),s),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:i,radialSegments:s}}static fromJSON(e){return new sr(e.radius,e.length,e.capSegments,e.radialSegments)}}class Fn extends Et{constructor(e=1,t=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:s},t=Math.max(3,t);const r=[],o=[],a=[],l=[],c=new z,u=new ve;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let h=0,d=3;h<=t;h++,d+=3){const f=i+h/t*s;c.x=e*Math.cos(f),c.y=e*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[d]/e+1)/2,u.y=(o[d+1]/e+1)/2,l.push(u.x,u.y)}for(let h=1;h<=t;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new it(o,3)),this.setAttribute("normal",new it(a,3)),this.setAttribute("uv",new it(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fn(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class qe extends Et{constructor(e=1,t=1,i=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],h=[],d=[],f=[];let m=0;const v=[],g=i/2;let p=0;S(),o===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(u),this.setAttribute("position",new it(h,3)),this.setAttribute("normal",new it(d,3)),this.setAttribute("uv",new it(f,2));function S(){const _=new z,P=new z;let C=0;const T=(t-e)/i;for(let R=0;R<=r;R++){const w=[],x=R/r,D=x*(t-e)+e;for(let Y=0;Y<=s;Y++){const N=Y/s,H=N*l+a,$=Math.sin(H),G=Math.cos(H);P.x=D*$,P.y=-x*i+g,P.z=D*G,h.push(P.x,P.y,P.z),_.set($,T,G).normalize(),d.push(_.x,_.y,_.z),f.push(N,1-x),w.push(m++)}v.push(w)}for(let R=0;R<s;R++)for(let w=0;w<r;w++){const x=v[w][R],D=v[w+1][R],Y=v[w+1][R+1],N=v[w][R+1];(e>0||w!==0)&&(u.push(x,D,N),C+=3),(t>0||w!==r-1)&&(u.push(D,Y,N),C+=3)}c.addGroup(p,C,0),p+=C}function b(_){const P=m,C=new ve,T=new z;let R=0;const w=_===!0?e:t,x=_===!0?1:-1;for(let Y=1;Y<=s;Y++)h.push(0,g*x,0),d.push(0,x,0),f.push(.5,.5),m++;const D=m;for(let Y=0;Y<=s;Y++){const H=Y/s*l+a,$=Math.cos(H),G=Math.sin(H);T.x=w*G,T.y=g*x,T.z=w*$,h.push(T.x,T.y,T.z),d.push(0,x,0),C.x=$*.5+.5,C.y=G*.5*x+.5,f.push(C.x,C.y),m++}for(let Y=0;Y<s;Y++){const N=P+Y,H=D+Y;_===!0?u.push(H,H+1,N):u.push(H+1,H,N),R+=3}c.addGroup(p,R,_===!0?1:2),p+=R}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qe(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class wr extends Ol{constructor(e){super(e),this.uuid=$i(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,s=this.holes.length;i<s;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const s=e.holes[t];this.holes.push(new Ol().fromJSON(s))}return this}}function Xg(n,e,t=2){const i=e&&e.length,s=i?e[0]*t:n.length;let r=Kd(n,0,s,t,!0);const o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(i&&(r=Zg(n,e,r,t)),n.length>80*t){a=1/0,l=1/0;let u=-1/0,h=-1/0;for(let d=t;d<s;d+=t){const f=n[d],m=n[d+1];f<a&&(a=f),m<l&&(l=m),f>u&&(u=f),m>h&&(h=m)}c=Math.max(u-a,h-l),c=c!==0?32767/c:0}return _r(r,o,t,a,l,c,0),o}function Kd(n,e,t,i,s){let r;if(s===av(n,e,t,i)>0)for(let o=e;o<t;o+=i)r=Uu(o/i|0,n[o],n[o+1],r);else for(let o=t-i;o>=e;o-=i)r=Uu(o/i|0,n[o],n[o+1],r);return r&&Rs(r,r.next)&&(yr(r),r=r.next),r}function qi(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(Rs(t,t.next)||_t(t.prev,t,t.next)===0)){if(yr(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function _r(n,e,t,i,s,r,o){if(!n)return;!o&&r&&tv(n,i,s,r);let a=n;for(;n.prev!==n.next;){const l=n.prev,c=n.next;if(r?jg(n,i,s,r):qg(n)){e.push(l.i,n.i,c.i),yr(n),n=c.next,a=c.next;continue}if(n=c,n===a){o?o===1?(n=Yg(qi(n),e),_r(n,e,t,i,s,r,2)):o===2&&$g(n,e,t,i,s,r):_r(qi(n),e,t,i,s,r,1);break}}}function qg(n){const e=n.prev,t=n,i=n.next;if(_t(e,t,i)>=0)return!1;const s=e.x,r=t.x,o=i.x,a=e.y,l=t.y,c=i.y,u=Math.min(s,r,o),h=Math.min(a,l,c),d=Math.max(s,r,o),f=Math.max(a,l,c);let m=i.next;for(;m!==e;){if(m.x>=u&&m.x<=d&&m.y>=h&&m.y<=f&&Ws(s,a,r,l,o,c,m.x,m.y)&&_t(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function jg(n,e,t,i){const s=n.prev,r=n,o=n.next;if(_t(s,r,o)>=0)return!1;const a=s.x,l=r.x,c=o.x,u=s.y,h=r.y,d=o.y,f=Math.min(a,l,c),m=Math.min(u,h,d),v=Math.max(a,l,c),g=Math.max(u,h,d),p=Fl(f,m,e,t,i),S=Fl(v,g,e,t,i);let b=n.prevZ,_=n.nextZ;for(;b&&b.z>=p&&_&&_.z<=S;){if(b.x>=f&&b.x<=v&&b.y>=m&&b.y<=g&&b!==s&&b!==o&&Ws(a,u,l,h,c,d,b.x,b.y)&&_t(b.prev,b,b.next)>=0||(b=b.prevZ,_.x>=f&&_.x<=v&&_.y>=m&&_.y<=g&&_!==s&&_!==o&&Ws(a,u,l,h,c,d,_.x,_.y)&&_t(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;b&&b.z>=p;){if(b.x>=f&&b.x<=v&&b.y>=m&&b.y<=g&&b!==s&&b!==o&&Ws(a,u,l,h,c,d,b.x,b.y)&&_t(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;_&&_.z<=S;){if(_.x>=f&&_.x<=v&&_.y>=m&&_.y<=g&&_!==s&&_!==o&&Ws(a,u,l,h,c,d,_.x,_.y)&&_t(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function Yg(n,e){let t=n;do{const i=t.prev,s=t.next.next;!Rs(i,s)&&ef(i,t,t.next,s)&&xr(i,s)&&xr(s,i)&&(e.push(i.i,t.i,s.i),yr(t),yr(t.next),t=n=s),t=t.next}while(t!==n);return qi(t)}function $g(n,e,t,i,s,r){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&sv(o,a)){let l=tf(o,a);o=qi(o,o.next),l=qi(l,l.next),_r(o,e,t,i,s,r,0),_r(l,e,t,i,s,r,0);return}a=a.next}o=o.next}while(o!==n)}function Zg(n,e,t,i){const s=[];for(let r=0,o=e.length;r<o;r++){const a=e[r]*i,l=r<o-1?e[r+1]*i:n.length,c=Kd(n,a,l,i,!1);c===c.next&&(c.steiner=!0),s.push(iv(c))}s.sort(Jg);for(let r=0;r<s.length;r++)t=Kg(s[r],t);return t}function Jg(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=i-s}return t}function Kg(n,e){const t=Qg(n,e);if(!t)return e;const i=tf(t,n);return qi(i,i.next),qi(t,t.next)}function Qg(n,e){let t=e;const i=n.x,s=n.y;let r=-1/0,o;if(Rs(n,t))return t;do{if(Rs(n,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){const h=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=i&&h>r&&(r=h,o=t.x<t.next.x?t:t.next,h===i))return o}t=t.next}while(t!==e);if(!o)return null;const a=o,l=o.x,c=o.y;let u=1/0;t=o;do{if(i>=t.x&&t.x>=l&&i!==t.x&&Qd(s<c?i:r,s,l,c,s<c?r:i,s,t.x,t.y)){const h=Math.abs(s-t.y)/(i-t.x);xr(t,n)&&(h<u||h===u&&(t.x>o.x||t.x===o.x&&ev(o,t)))&&(o=t,u=h)}t=t.next}while(t!==a);return o}function ev(n,e){return _t(n.prev,n,e.prev)<0&&_t(e.next,n,n.next)<0}function tv(n,e,t,i){let s=n;do s.z===0&&(s.z=Fl(s.x,s.y,e,t,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,nv(s)}function nv(n){let e,t=1;do{let i=n,s;n=null;let r=null;for(e=0;i;){e++;let o=i,a=0;for(let c=0;c<t&&(a++,o=o.nextZ,!!o);c++);let l=t;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||i.z<=o.z)?(s=i,i=i.nextZ,a--):(s=o,o=o.nextZ,l--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;i=o}r.nextZ=null,t*=2}while(e>1);return n}function Fl(n,e,t,i,s){return n=(n-t)*s|0,e=(e-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function iv(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function Qd(n,e,t,i,s,r,o,a){return(s-o)*(e-a)>=(n-o)*(r-a)&&(n-o)*(i-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(i-a)}function Ws(n,e,t,i,s,r,o,a){return!(n===o&&e===a)&&Qd(n,e,t,i,s,r,o,a)}function sv(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!rv(n,e)&&(xr(n,e)&&xr(e,n)&&ov(n,e)&&(_t(n.prev,n,e.prev)||_t(n,e.prev,e))||Rs(n,e)&&_t(n.prev,n,n.next)>0&&_t(e.prev,e,e.next)>0)}function _t(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function Rs(n,e){return n.x===e.x&&n.y===e.y}function ef(n,e,t,i){const s=to(_t(n,e,t)),r=to(_t(n,e,i)),o=to(_t(t,i,n)),a=to(_t(t,i,e));return!!(s!==r&&o!==a||s===0&&eo(n,t,e)||r===0&&eo(n,i,e)||o===0&&eo(t,n,i)||a===0&&eo(t,e,i))}function eo(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function to(n){return n>0?1:n<0?-1:0}function rv(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&ef(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function xr(n,e){return _t(n.prev,n,n.next)<0?_t(n,e,n.next)>=0&&_t(n,n.prev,e)>=0:_t(n,e,n.prev)<0||_t(n,n.next,e)<0}function ov(n,e){let t=n,i=!1;const s=(n.x+e.x)/2,r=(n.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function tf(n,e){const t=Bl(n.i,n.x,n.y),i=Bl(e.i,e.x,e.y),s=n.next,r=e.prev;return n.next=e,e.prev=n,t.next=s,s.prev=t,i.next=t,t.prev=i,r.next=i,i.prev=r,i}function Uu(n,e,t,i){const s=Bl(n,e,t);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function yr(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Bl(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function av(n,e,t,i){let s=0;for(let r=e,o=t-i;r<t;r+=i)s+=(n[o]-n[r])*(n[r+1]+n[o+1]),o=r;return s}class lv{static triangulate(e,t,i=2){return Xg(e,t,i)}}class yi{static area(e){const t=e.length;let i=0;for(let s=t-1,r=0;r<t;s=r++)i+=e[s].x*e[r].y-e[r].x*e[s].y;return i*.5}static isClockWise(e){return yi.area(e)<0}static triangulateShape(e,t){const i=[],s=[],r=[];Nu(e),Ou(i,e);let o=e.length;t.forEach(Nu);for(let l=0;l<t.length;l++)s.push(o),o+=t[l].length,Ou(i,t[l]);const a=lv.triangulate(i,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function Nu(n){const e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function Ou(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}class zo extends Et{constructor(e=new wr([new ve(.5,.5),new ve(-.5,.5),new ve(-.5,-.5),new ve(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const i=this,s=[],r=[];for(let a=0,l=e.length;a<l;a++){const c=e[a];o(c)}this.setAttribute("position",new it(s,3)),this.setAttribute("uv",new it(r,2)),this.computeVertexNormals();function o(a){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,h=t.depth!==void 0?t.depth:1;let d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:f-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,S=t.UVGenerator!==void 0?t.UVGenerator:cv;let b,_=!1,P,C,T,R;p&&(b=p.getSpacedPoints(u),_=!0,d=!1,P=p.computeFrenetFrames(u,!1),C=new z,T=new z,R=new z),d||(g=0,f=0,m=0,v=0);const w=a.extractPoints(c);let x=w.shape;const D=w.holes;if(!yi.isClockWise(x)){x=x.reverse();for(let F=0,k=D.length;F<k;F++){const V=D[F];yi.isClockWise(V)&&(D[F]=V.reverse())}}function N(F){const V=10000000000000001e-36;let ee=F[0];for(let B=1;B<=F.length;B++){const M=B%F.length,y=F[M],L=y.x-ee.x,j=y.y-ee.y,Z=L*L+j*j,Q=Math.max(Math.abs(y.x),Math.abs(y.y),Math.abs(ee.x),Math.abs(ee.y)),xe=V*Q*Q;if(Z<=xe){F.splice(M,1),B--;continue}ee=y}}N(x),D.forEach(N);const H=D.length,$=x;for(let F=0;F<H;F++){const k=D[F];x=x.concat(k)}function G(F,k,V){return k||console.error("THREE.ExtrudeGeometry: vec does not exist"),F.clone().addScaledVector(k,V)}const X=x.length;function O(F,k,V){let ee,B,M;const y=F.x-k.x,L=F.y-k.y,j=V.x-F.x,Z=V.y-F.y,Q=y*y+L*L,xe=y*Z-L*j;if(Math.abs(xe)>Number.EPSILON){const ce=Math.sqrt(Q),Se=Math.sqrt(j*j+Z*Z),ke=k.x-L/ce,fe=k.y+y/ce,pe=V.x-Z/Se,be=V.y+j/Se,Ne=((pe-ke)*Z-(be-fe)*j)/(y*Z-L*j);ee=ke+y*Ne-F.x,B=fe+L*Ne-F.y;const ge=ee*ee+B*B;if(ge<=2)return new ve(ee,B);M=Math.sqrt(ge/2)}else{let ce=!1;y>Number.EPSILON?j>Number.EPSILON&&(ce=!0):y<-Number.EPSILON?j<-Number.EPSILON&&(ce=!0):Math.sign(L)===Math.sign(Z)&&(ce=!0),ce?(ee=-L,B=y,M=Math.sqrt(Q)):(ee=y,B=L,M=Math.sqrt(Q/2))}return new ve(ee/M,B/M)}const ne=[];for(let F=0,k=$.length,V=k-1,ee=F+1;F<k;F++,V++,ee++)V===k&&(V=0),ee===k&&(ee=0),ne[F]=O($[F],$[V],$[ee]);const he=[];let me,_e=ne.concat();for(let F=0,k=H;F<k;F++){const V=D[F];me=[];for(let ee=0,B=V.length,M=B-1,y=ee+1;ee<B;ee++,M++,y++)M===B&&(M=0),y===B&&(y=0),me[ee]=O(V[ee],V[M],V[y]);he.push(me),_e=_e.concat(me)}const Ue=[],te=[];for(let F=0;F<g;F++){const k=F/g,V=f*Math.cos(k*Math.PI/2),ee=m*Math.sin(k*Math.PI/2)+v;for(let B=0,M=$.length;B<M;B++){const y=G($[B],ne[B],ee);Ge(y.x,y.y,-V),k==0&&Ue.push(y)}for(let B=0,M=H;B<M;B++){const y=D[B];me=he[B];const L=[];for(let j=0,Z=y.length;j<Z;j++){const Q=G(y[j],me[j],ee);Ge(Q.x,Q.y,-V),k==0&&L.push(Q)}k==0&&te.push(L)}}const re=yi.triangulateShape(Ue,te),de=re.length,le=m+v;for(let F=0;F<X;F++){const k=d?G(x[F],_e[F],le):x[F];_?(T.copy(P.normals[0]).multiplyScalar(k.x),C.copy(P.binormals[0]).multiplyScalar(k.y),R.copy(b[0]).add(T).add(C),Ge(R.x,R.y,R.z)):Ge(k.x,k.y,0)}for(let F=1;F<=u;F++)for(let k=0;k<X;k++){const V=d?G(x[k],_e[k],le):x[k];_?(T.copy(P.normals[F]).multiplyScalar(V.x),C.copy(P.binormals[F]).multiplyScalar(V.y),R.copy(b[F]).add(T).add(C),Ge(R.x,R.y,R.z)):Ge(V.x,V.y,h/u*F)}for(let F=g-1;F>=0;F--){const k=F/g,V=f*Math.cos(k*Math.PI/2),ee=m*Math.sin(k*Math.PI/2)+v;for(let B=0,M=$.length;B<M;B++){const y=G($[B],ne[B],ee);Ge(y.x,y.y,h+V)}for(let B=0,M=D.length;B<M;B++){const y=D[B];me=he[B];for(let L=0,j=y.length;L<j;L++){const Z=G(y[L],me[L],ee);_?Ge(Z.x,Z.y+b[u-1].y,b[u-1].x+V):Ge(Z.x,Z.y,h+V)}}}Ce(),Te();function Ce(){const F=s.length/3;if(d){let k=0,V=X*k;for(let ee=0;ee<de;ee++){const B=re[ee];I(B[2]+V,B[1]+V,B[0]+V)}k=u+g*2,V=X*k;for(let ee=0;ee<de;ee++){const B=re[ee];I(B[0]+V,B[1]+V,B[2]+V)}}else{for(let k=0;k<de;k++){const V=re[k];I(V[2],V[1],V[0])}for(let k=0;k<de;k++){const V=re[k];I(V[0]+X*u,V[1]+X*u,V[2]+X*u)}}i.addGroup(F,s.length/3-F,0)}function Te(){const F=s.length/3;let k=0;De($,k),k+=$.length;for(let V=0,ee=D.length;V<ee;V++){const B=D[V];De(B,k),k+=B.length}i.addGroup(F,s.length/3-F,1)}function De(F,k){let V=F.length;for(;--V>=0;){const ee=V;let B=V-1;B<0&&(B=F.length-1);for(let M=0,y=u+g*2;M<y;M++){const L=X*M,j=X*(M+1),Z=k+ee+L,Q=k+B+L,xe=k+B+j,ce=k+ee+j;U(Z,Q,xe,ce)}}}function Ge(F,k,V){l.push(F),l.push(k),l.push(V)}function I(F,k,V){E(F),E(k),E(V);const ee=s.length/3,B=S.generateTopUV(i,s,ee-3,ee-2,ee-1);ae(B[0]),ae(B[1]),ae(B[2])}function U(F,k,V,ee){E(F),E(k),E(ee),E(k),E(V),E(ee);const B=s.length/3,M=S.generateSideWallUV(i,s,B-6,B-3,B-2,B-1);ae(M[0]),ae(M[1]),ae(M[3]),ae(M[1]),ae(M[2]),ae(M[3])}function E(F){s.push(l[F*3+0]),s.push(l[F*3+1]),s.push(l[F*3+2])}function ae(F){r.push(F.x),r.push(F.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,i=this.parameters.options;return uv(t,i,e)}static fromJSON(e,t){const i=[];for(let r=0,o=e.shapes.length;r<o;r++){const a=t[e.shapes[r]];i.push(a)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Nl[s.type]().fromJSON(s)),new zo(i,e.options)}}const cv={generateTopUV:function(n,e,t,i,s){const r=e[t*3],o=e[t*3+1],a=e[i*3],l=e[i*3+1],c=e[s*3],u=e[s*3+1];return[new ve(r,o),new ve(a,l),new ve(c,u)]},generateSideWallUV:function(n,e,t,i,s,r){const o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[i*3],u=e[i*3+1],h=e[i*3+2],d=e[s*3],f=e[s*3+1],m=e[s*3+2],v=e[r*3],g=e[r*3+1],p=e[r*3+2];return Math.abs(a-u)<Math.abs(o-c)?[new ve(o,1-l),new ve(c,1-h),new ve(d,1-m),new ve(v,1-p)]:[new ve(a,1-l),new ve(u,1-h),new ve(f,1-m),new ve(g,1-p)]}};function uv(n,e,t){if(t.shapes=[],Array.isArray(n))for(let i=0,s=n.length;i<s;i++){const r=n[i];t.shapes.push(r.uuid)}else t.shapes.push(n.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class hn extends Et{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(i),l=Math.floor(s),c=a+1,u=l+1,h=e/a,d=t/l,f=[],m=[],v=[],g=[];for(let p=0;p<u;p++){const S=p*d-o;for(let b=0;b<c;b++){const _=b*h-r;m.push(_,-S,0),v.push(0,0,1),g.push(b/a),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let S=0;S<a;S++){const b=S+c*p,_=S+c*(p+1),P=S+1+c*(p+1),C=S+1+c*p;f.push(b,_,C),f.push(_,P,C)}this.setIndex(f),this.setAttribute("position",new it(m,3)),this.setAttribute("normal",new it(v,3)),this.setAttribute("uv",new it(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hn(e.width,e.height,e.widthSegments,e.heightSegments)}}class ko extends Et{constructor(e=.5,t=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);const a=[],l=[],c=[],u=[];let h=e;const d=(t-e)/s,f=new z,m=new ve;for(let v=0;v<=s;v++){for(let g=0;g<=i;g++){const p=r+g/i*o;f.x=h*Math.cos(p),f.y=h*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),m.x=(f.x/t+1)/2,m.y=(f.y/t+1)/2,u.push(m.x,m.y)}h+=d}for(let v=0;v<s;v++){const g=v*(i+1);for(let p=0;p<i;p++){const S=p+g,b=S,_=S+i+1,P=S+i+2,C=S+1;a.push(b,_,C),a.push(_,P,C)}}this.setIndex(a),this.setAttribute("position",new it(l,3)),this.setAttribute("normal",new it(c,3)),this.setAttribute("uv",new it(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ko(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Tc extends Et{constructor(e=new wr([new ve(0,.5),new ve(-.5,-.5),new ve(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const i=[],s=[],r=[],o=[];let a=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(a,l,u),a+=l,l=0;this.setIndex(i),this.setAttribute("position",new it(s,3)),this.setAttribute("normal",new it(r,3)),this.setAttribute("uv",new it(o,2));function c(u){const h=s.length/3,d=u.extractPoints(t);let f=d.shape;const m=d.holes;yi.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,p=m.length;g<p;g++){const S=m[g];yi.isClockWise(S)===!0&&(m[g]=S.reverse())}const v=yi.triangulateShape(f,m);for(let g=0,p=m.length;g<p;g++){const S=m[g];f=f.concat(S)}for(let g=0,p=f.length;g<p;g++){const S=f[g];s.push(S.x,S.y,0),r.push(0,0,1),o.push(S.x,S.y)}for(let g=0,p=v.length;g<p;g++){const S=v[g],b=S[0]+h,_=S[1]+h,P=S[2]+h;i.push(b,_,P),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return hv(t,e)}static fromJSON(e,t){const i=[];for(let s=0,r=e.shapes.length;s<r;s++){const o=t[e.shapes[s]];i.push(o)}return new Tc(i,e.curveSegments)}}function hv(n,e){if(e.shapes=[],Array.isArray(n))for(let t=0,i=n.length;t<i;t++){const s=n[t];e.shapes.push(s.uuid)}else e.shapes.push(n.uuid);return e}class Mt extends Et{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],h=new z,d=new z,f=[],m=[],v=[],g=[];for(let p=0;p<=i;p++){const S=[],b=p/i;let _=0;p===0&&o===0?_=.5/t:p===i&&l===Math.PI&&(_=-.5/t);for(let P=0;P<=t;P++){const C=P/t;h.x=-e*Math.cos(s+C*r)*Math.sin(o+b*a),h.y=e*Math.cos(o+b*a),h.z=e*Math.sin(s+C*r)*Math.sin(o+b*a),m.push(h.x,h.y,h.z),d.copy(h).normalize(),v.push(d.x,d.y,d.z),g.push(C+_,1-b),S.push(c++)}u.push(S)}for(let p=0;p<i;p++)for(let S=0;S<t;S++){const b=u[p][S+1],_=u[p][S],P=u[p+1][S],C=u[p+1][S+1];(p!==0||o>0)&&f.push(b,_,C),(p!==i-1||l<Math.PI)&&f.push(_,P,C)}this.setIndex(f),this.setAttribute("position",new it(m,3)),this.setAttribute("normal",new it(v,3)),this.setAttribute("uv",new it(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mt(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Ho extends Et{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);const o=[],a=[],l=[],c=[],u=new z,h=new z,d=new z;for(let f=0;f<=i;f++)for(let m=0;m<=s;m++){const v=m/s*r,g=f/i*Math.PI*2;h.x=(e+t*Math.cos(g))*Math.cos(v),h.y=(e+t*Math.cos(g))*Math.sin(v),h.z=t*Math.sin(g),a.push(h.x,h.y,h.z),u.x=e*Math.cos(v),u.y=e*Math.sin(v),d.subVectors(h,u).normalize(),l.push(d.x,d.y,d.z),c.push(m/s),c.push(f/i)}for(let f=1;f<=i;f++)for(let m=1;m<=s;m++){const v=(s+1)*f+m-1,g=(s+1)*(f-1)+m-1,p=(s+1)*(f-1)+m,S=(s+1)*f+m;o.push(v,g,S),o.push(g,p,S)}this.setIndex(o),this.setAttribute("position",new it(a,3)),this.setAttribute("normal",new it(l,3)),this.setAttribute("uv",new it(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ho(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class we extends Zi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ze(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=vc,this.normalScale=new ve(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Kn extends we{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ve(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ze(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ze(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ze(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ze(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class dv extends Zi{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new ze(16777215),this.specular=new ze(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=vc,this.normalScale=new ve(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dn,this.combine=uc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class nf extends Zi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=D0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class fv extends Zi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Fu={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class pv{constructor(e,t,i){const s=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){const f=c[h],m=c[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return m}return null}}}const mv=new pv;class Ac{constructor(e){this.manager=e!==void 0?e:mv,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Ac.DEFAULT_MATERIAL_NAME="__DEFAULT";class gv extends Ac{constructor(e){super(e)}load(e,t,i,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=Fu.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=gr("img");function l(){u(),Fu.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(h){u(),s&&s(h),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class vv extends Ac{constructor(e){super(e)}load(e,t,i,s){const r=new Gt,o=new gv(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},i,s),r}}class Go extends Dt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ze(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class _v extends Go{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Dt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ze(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Ra=new ft,Bu=new z,zu=new z;class sf{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ve(512,512),this.map=null,this.mapPass=null,this.matrix=new ft,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Sc,this._frameExtents=new ve(1,1),this._viewportCount=1,this._viewports=[new dt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Bu.setFromMatrixPosition(e.matrixWorld),t.position.copy(Bu),zu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(zu),t.updateMatrixWorld(),Ra.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ra),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ra)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ku=new ft,Gs=new z,Pa=new z;class xv extends sf{constructor(){super(new un(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ve(4,2),this._viewportCount=6,this._viewports=[new dt(2,1,1,1),new dt(0,1,1,1),new dt(3,1,1,1),new dt(1,1,1,1),new dt(3,0,1,1),new dt(1,0,1,1)],this._cubeDirections=[new z(1,0,0),new z(-1,0,0),new z(0,0,1),new z(0,0,-1),new z(0,1,0),new z(0,-1,0)],this._cubeUps=[new z(0,1,0),new z(0,1,0),new z(0,1,0),new z(0,1,0),new z(0,0,1),new z(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,s=this.matrix,r=e.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),Gs.setFromMatrixPosition(e.matrixWorld),i.position.copy(Gs),Pa.copy(i.position),Pa.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(Pa),i.updateMatrixWorld(),s.makeTranslation(-Gs.x,-Gs.y,-Gs.z),ku.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ku)}}class zl extends Go{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new xv}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Cc extends Vd{constructor(e=-1,t=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,o=i+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class yv extends sf{constructor(){super(new Cc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Mv extends Go{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Dt.DEFAULT_UP),this.updateMatrix(),this.target=new Dt,this.shadow=new yv}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Sv extends Go{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class bv extends un{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e,this.index=0}}class wv{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Hu(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Hu();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Hu(){return performance.now()}const Gu=new ft;class Ev{constructor(e,t,i=0,s=1/0){this.ray=new Bo(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new yc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Gu.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Gu),this}intersectObject(e,t=!0,i=[]){return kl(e,this,i,t),i.sort(Vu),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)kl(e[s],this,i,t);return i.sort(Vu),i}}function Vu(n,e){return n.distance-e.distance}function kl(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)kl(r[o],e,t,!0)}}class Wu{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ze(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Ze(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Tv extends Yi{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Xu(n,e,t,i){const s=Av(i);switch(t){case Cd:return n*e;case Pd:return n*e;case Dd:return n*e*2;case Ld:return n*e/s.components*s.byteLength;case pc:return n*e/s.components*s.byteLength;case Id:return n*e*2/s.components*s.byteLength;case mc:return n*e*2/s.components*s.byteLength;case Rd:return n*e*3/s.components*s.byteLength;case xn:return n*e*4/s.components*s.byteLength;case gc:return n*e*4/s.components*s.byteLength;case co:case uo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ho:case fo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case cl:case hl:return Math.max(n,16)*Math.max(e,8)/4;case ll:case ul:return Math.max(n,8)*Math.max(e,8)/2;case dl:case fl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case pl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ml:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case gl:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case vl:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case _l:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case xl:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case yl:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Ml:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Sl:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case bl:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case wl:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case El:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Tl:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Al:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Cl:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case po:case Rl:case Pl:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Ud:case Dl:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Ll:case Il:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Av(n){switch(n){case ni:case Ed:return{byteLength:1,components:1};case hr:case Td:case cn:return{byteLength:2,components:1};case dc:case fc:return{byteLength:2,components:4};case Wi:case hc:case Qn:return{byteLength:4,components:1};case Ad:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:cc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=cc);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function rf(){let n=null,e=!1,t=null,i=null;function s(r,o){t(r,o),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function Cv(n){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,h=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,u),a.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function i(a,l,c){const u=l.array,h=l.updateRanges;if(n.bindBuffer(c,a),h.length===0)n.bufferSubData(c,0,u);else{h.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<h.length;f++){const m=h[d],v=h[f];v.start<=m.start+m.count+1?m.count=Math.max(m.count,v.start+v.count-m.start):(++d,h[d]=v)}h.length=d+1;for(let f=0,m=h.length;f<m;f++){const v=h[f];n.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var Rv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Pv=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Dv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Lv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Iv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Uv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Nv=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Ov=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Fv=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Bv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,zv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,kv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Hv=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Gv=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Vv=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Wv=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Xv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,qv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,jv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Yv=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,$v=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Zv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Jv=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Kv=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Qv=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,e_=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,t_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,n_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,i_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,s_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,r_="gl_FragColor = linearToOutputTexel( gl_FragColor );",o_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,a_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,l_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,c_=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,u_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,h_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,d_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,f_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,p_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,m_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,g_=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,v_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,__=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,x_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,y_=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,M_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,S_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,b_=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,w_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,E_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,T_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,A_=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,C_=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,R_=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,P_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,D_=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,L_=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,I_=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,U_=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,N_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,O_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,F_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,B_=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,z_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,k_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,H_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,G_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,V_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,W_=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,X_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,q_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,j_=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Y_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Z_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,J_=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,K_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Q_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ex=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,tx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,nx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ix=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,sx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,rx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ox=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ax=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,lx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,cx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ux=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,hx=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,dx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,fx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,px=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,mx=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,gx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,vx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,_x=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,xx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,yx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Mx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Sx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,bx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,wx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ex=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Tx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Ax=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Cx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Rx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Px=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Dx=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ix=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ux=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Nx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Ox=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Fx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Bx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,zx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Hx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Gx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Vx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Xx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qx=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,jx=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yx=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,$x=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Zx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Jx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Qx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ey=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ty=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ny=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,iy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sy=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ry=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,oy=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ay=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ke={alphahash_fragment:Rv,alphahash_pars_fragment:Pv,alphamap_fragment:Dv,alphamap_pars_fragment:Lv,alphatest_fragment:Iv,alphatest_pars_fragment:Uv,aomap_fragment:Nv,aomap_pars_fragment:Ov,batching_pars_vertex:Fv,batching_vertex:Bv,begin_vertex:zv,beginnormal_vertex:kv,bsdfs:Hv,iridescence_fragment:Gv,bumpmap_pars_fragment:Vv,clipping_planes_fragment:Wv,clipping_planes_pars_fragment:Xv,clipping_planes_pars_vertex:qv,clipping_planes_vertex:jv,color_fragment:Yv,color_pars_fragment:$v,color_pars_vertex:Zv,color_vertex:Jv,common:Kv,cube_uv_reflection_fragment:Qv,defaultnormal_vertex:e_,displacementmap_pars_vertex:t_,displacementmap_vertex:n_,emissivemap_fragment:i_,emissivemap_pars_fragment:s_,colorspace_fragment:r_,colorspace_pars_fragment:o_,envmap_fragment:a_,envmap_common_pars_fragment:l_,envmap_pars_fragment:c_,envmap_pars_vertex:u_,envmap_physical_pars_fragment:M_,envmap_vertex:h_,fog_vertex:d_,fog_pars_vertex:f_,fog_fragment:p_,fog_pars_fragment:m_,gradientmap_pars_fragment:g_,lightmap_pars_fragment:v_,lights_lambert_fragment:__,lights_lambert_pars_fragment:x_,lights_pars_begin:y_,lights_toon_fragment:S_,lights_toon_pars_fragment:b_,lights_phong_fragment:w_,lights_phong_pars_fragment:E_,lights_physical_fragment:T_,lights_physical_pars_fragment:A_,lights_fragment_begin:C_,lights_fragment_maps:R_,lights_fragment_end:P_,logdepthbuf_fragment:D_,logdepthbuf_pars_fragment:L_,logdepthbuf_pars_vertex:I_,logdepthbuf_vertex:U_,map_fragment:N_,map_pars_fragment:O_,map_particle_fragment:F_,map_particle_pars_fragment:B_,metalnessmap_fragment:z_,metalnessmap_pars_fragment:k_,morphinstance_vertex:H_,morphcolor_vertex:G_,morphnormal_vertex:V_,morphtarget_pars_vertex:W_,morphtarget_vertex:X_,normal_fragment_begin:q_,normal_fragment_maps:j_,normal_pars_fragment:Y_,normal_pars_vertex:$_,normal_vertex:Z_,normalmap_pars_fragment:J_,clearcoat_normal_fragment_begin:K_,clearcoat_normal_fragment_maps:Q_,clearcoat_pars_fragment:ex,iridescence_pars_fragment:tx,opaque_fragment:nx,packing:ix,premultiplied_alpha_fragment:sx,project_vertex:rx,dithering_fragment:ox,dithering_pars_fragment:ax,roughnessmap_fragment:lx,roughnessmap_pars_fragment:cx,shadowmap_pars_fragment:ux,shadowmap_pars_vertex:hx,shadowmap_vertex:dx,shadowmask_pars_fragment:fx,skinbase_vertex:px,skinning_pars_vertex:mx,skinning_vertex:gx,skinnormal_vertex:vx,specularmap_fragment:_x,specularmap_pars_fragment:xx,tonemapping_fragment:yx,tonemapping_pars_fragment:Mx,transmission_fragment:Sx,transmission_pars_fragment:bx,uv_pars_fragment:wx,uv_pars_vertex:Ex,uv_vertex:Tx,worldpos_vertex:Ax,background_vert:Cx,background_frag:Rx,backgroundCube_vert:Px,backgroundCube_frag:Dx,cube_vert:Lx,cube_frag:Ix,depth_vert:Ux,depth_frag:Nx,distanceRGBA_vert:Ox,distanceRGBA_frag:Fx,equirect_vert:Bx,equirect_frag:zx,linedashed_vert:kx,linedashed_frag:Hx,meshbasic_vert:Gx,meshbasic_frag:Vx,meshlambert_vert:Wx,meshlambert_frag:Xx,meshmatcap_vert:qx,meshmatcap_frag:jx,meshnormal_vert:Yx,meshnormal_frag:$x,meshphong_vert:Zx,meshphong_frag:Jx,meshphysical_vert:Kx,meshphysical_frag:Qx,meshtoon_vert:ey,meshtoon_frag:ty,points_vert:ny,points_frag:iy,shadow_vert:sy,shadow_frag:ry,sprite_vert:oy,sprite_frag:ay},Pe={common:{diffuse:{value:new ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Je}},envmap:{envMap:{value:null},envMapRotation:{value:new Je},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Je},normalScale:{value:new ve(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0},uvTransform:{value:new Je}},sprite:{diffuse:{value:new ze(16777215)},opacity:{value:1},center:{value:new ve(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}}},On={basic:{uniforms:jt([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.fog]),vertexShader:Ke.meshbasic_vert,fragmentShader:Ke.meshbasic_frag},lambert:{uniforms:jt([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new ze(0)}}]),vertexShader:Ke.meshlambert_vert,fragmentShader:Ke.meshlambert_frag},phong:{uniforms:jt([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new ze(0)},specular:{value:new ze(1118481)},shininess:{value:30}}]),vertexShader:Ke.meshphong_vert,fragmentShader:Ke.meshphong_frag},standard:{uniforms:jt([Pe.common,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.roughnessmap,Pe.metalnessmap,Pe.fog,Pe.lights,{emissive:{value:new ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag},toon:{uniforms:jt([Pe.common,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.gradientmap,Pe.fog,Pe.lights,{emissive:{value:new ze(0)}}]),vertexShader:Ke.meshtoon_vert,fragmentShader:Ke.meshtoon_frag},matcap:{uniforms:jt([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,{matcap:{value:null}}]),vertexShader:Ke.meshmatcap_vert,fragmentShader:Ke.meshmatcap_frag},points:{uniforms:jt([Pe.points,Pe.fog]),vertexShader:Ke.points_vert,fragmentShader:Ke.points_frag},dashed:{uniforms:jt([Pe.common,Pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ke.linedashed_vert,fragmentShader:Ke.linedashed_frag},depth:{uniforms:jt([Pe.common,Pe.displacementmap]),vertexShader:Ke.depth_vert,fragmentShader:Ke.depth_frag},normal:{uniforms:jt([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,{opacity:{value:1}}]),vertexShader:Ke.meshnormal_vert,fragmentShader:Ke.meshnormal_frag},sprite:{uniforms:jt([Pe.sprite,Pe.fog]),vertexShader:Ke.sprite_vert,fragmentShader:Ke.sprite_frag},background:{uniforms:{uvTransform:{value:new Je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ke.background_vert,fragmentShader:Ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Je}},vertexShader:Ke.backgroundCube_vert,fragmentShader:Ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ke.cube_vert,fragmentShader:Ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ke.equirect_vert,fragmentShader:Ke.equirect_frag},distanceRGBA:{uniforms:jt([Pe.common,Pe.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ke.distanceRGBA_vert,fragmentShader:Ke.distanceRGBA_frag},shadow:{uniforms:jt([Pe.lights,Pe.fog,{color:{value:new ze(0)},opacity:{value:1}}]),vertexShader:Ke.shadow_vert,fragmentShader:Ke.shadow_frag}};On.physical={uniforms:jt([On.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Je},clearcoatNormalScale:{value:new ve(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Je},sheen:{value:0},sheenColor:{value:new ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Je},transmissionSamplerSize:{value:new ve},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Je},attenuationDistance:{value:0},attenuationColor:{value:new ze(0)},specularColor:{value:new ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Je},anisotropyVector:{value:new ve},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Je}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag};const no={r:0,b:0,g:0},Ii=new Dn,ly=new ft;function cy(n,e,t,i,s,r,o){const a=new ze(0);let l=r===!0?0:1,c,u,h=null,d=0,f=null;function m(b){let _=b.isScene===!0?b.background:null;return _&&_.isTexture&&(_=(b.backgroundBlurriness>0?t:e).get(_)),_}function v(b){let _=!1;const P=m(b);P===null?p(a,l):P&&P.isColor&&(p(P,1),_=!0);const C=n.xr.getEnvironmentBlendMode();C==="additive"?i.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||_)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function g(b,_){const P=m(_);P&&(P.isCubeTexture||P.mapping===Oo)?(u===void 0&&(u=new W(new ye(1,1,1),new Zt({name:"BackgroundCubeMaterial",uniforms:Cs(On.backgroundCube.uniforms),vertexShader:On.backgroundCube.vertexShader,fragmentShader:On.backgroundCube.fragmentShader,side:tn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,T,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Ii.copy(_.backgroundRotation),Ii.x*=-1,Ii.y*=-1,Ii.z*=-1,P.isCubeTexture&&P.isRenderTargetTexture===!1&&(Ii.y*=-1,Ii.z*=-1),u.material.uniforms.envMap.value=P,u.material.uniforms.flipEnvMap.value=P.isCubeTexture&&P.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(ly.makeRotationFromEuler(Ii)),u.material.toneMapped=rt.getTransfer(P.colorSpace)!==ut,(h!==P||d!==P.version||f!==n.toneMapping)&&(u.material.needsUpdate=!0,h=P,d=P.version,f=n.toneMapping),u.layers.enableAll(),b.unshift(u,u.geometry,u.material,0,0,null)):P&&P.isTexture&&(c===void 0&&(c=new W(new hn(2,2),new Zt({name:"BackgroundMaterial",uniforms:Cs(On.background.uniforms),vertexShader:On.background.vertexShader,fragmentShader:On.background.fragmentShader,side:Mi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=P,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=rt.getTransfer(P.colorSpace)!==ut,P.matrixAutoUpdate===!0&&P.updateMatrix(),c.material.uniforms.uvTransform.value.copy(P.matrix),(h!==P||d!==P.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,h=P,d=P.version,f=n.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function p(b,_){b.getRGB(no,Gd(n)),i.buffers.color.setClear(no.r,no.g,no.b,_,o)}function S(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,_=1){a.set(b),l=_,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,p(a,l)},render:v,addToRenderList:g,dispose:S}}function uy(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=d(null);let r=s,o=!1;function a(x,D,Y,N,H){let $=!1;const G=h(N,Y,D);r!==G&&(r=G,c(r.object)),$=f(x,N,Y,H),$&&m(x,N,Y,H),H!==null&&e.update(H,n.ELEMENT_ARRAY_BUFFER),($||o)&&(o=!1,_(x,D,Y,N),H!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function l(){return n.createVertexArray()}function c(x){return n.bindVertexArray(x)}function u(x){return n.deleteVertexArray(x)}function h(x,D,Y){const N=Y.wireframe===!0;let H=i[x.id];H===void 0&&(H={},i[x.id]=H);let $=H[D.id];$===void 0&&($={},H[D.id]=$);let G=$[N];return G===void 0&&(G=d(l()),$[N]=G),G}function d(x){const D=[],Y=[],N=[];for(let H=0;H<t;H++)D[H]=0,Y[H]=0,N[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:Y,attributeDivisors:N,object:x,attributes:{},index:null}}function f(x,D,Y,N){const H=r.attributes,$=D.attributes;let G=0;const X=Y.getAttributes();for(const O in X)if(X[O].location>=0){const he=H[O];let me=$[O];if(me===void 0&&(O==="instanceMatrix"&&x.instanceMatrix&&(me=x.instanceMatrix),O==="instanceColor"&&x.instanceColor&&(me=x.instanceColor)),he===void 0||he.attribute!==me||me&&he.data!==me.data)return!0;G++}return r.attributesNum!==G||r.index!==N}function m(x,D,Y,N){const H={},$=D.attributes;let G=0;const X=Y.getAttributes();for(const O in X)if(X[O].location>=0){let he=$[O];he===void 0&&(O==="instanceMatrix"&&x.instanceMatrix&&(he=x.instanceMatrix),O==="instanceColor"&&x.instanceColor&&(he=x.instanceColor));const me={};me.attribute=he,he&&he.data&&(me.data=he.data),H[O]=me,G++}r.attributes=H,r.attributesNum=G,r.index=N}function v(){const x=r.newAttributes;for(let D=0,Y=x.length;D<Y;D++)x[D]=0}function g(x){p(x,0)}function p(x,D){const Y=r.newAttributes,N=r.enabledAttributes,H=r.attributeDivisors;Y[x]=1,N[x]===0&&(n.enableVertexAttribArray(x),N[x]=1),H[x]!==D&&(n.vertexAttribDivisor(x,D),H[x]=D)}function S(){const x=r.newAttributes,D=r.enabledAttributes;for(let Y=0,N=D.length;Y<N;Y++)D[Y]!==x[Y]&&(n.disableVertexAttribArray(Y),D[Y]=0)}function b(x,D,Y,N,H,$,G){G===!0?n.vertexAttribIPointer(x,D,Y,H,$):n.vertexAttribPointer(x,D,Y,N,H,$)}function _(x,D,Y,N){v();const H=N.attributes,$=Y.getAttributes(),G=D.defaultAttributeValues;for(const X in $){const O=$[X];if(O.location>=0){let ne=H[X];if(ne===void 0&&(X==="instanceMatrix"&&x.instanceMatrix&&(ne=x.instanceMatrix),X==="instanceColor"&&x.instanceColor&&(ne=x.instanceColor)),ne!==void 0){const he=ne.normalized,me=ne.itemSize,_e=e.get(ne);if(_e===void 0)continue;const Ue=_e.buffer,te=_e.type,re=_e.bytesPerElement,de=te===n.INT||te===n.UNSIGNED_INT||ne.gpuType===hc;if(ne.isInterleavedBufferAttribute){const le=ne.data,Ce=le.stride,Te=ne.offset;if(le.isInstancedInterleavedBuffer){for(let De=0;De<O.locationSize;De++)p(O.location+De,le.meshPerAttribute);x.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let De=0;De<O.locationSize;De++)g(O.location+De);n.bindBuffer(n.ARRAY_BUFFER,Ue);for(let De=0;De<O.locationSize;De++)b(O.location+De,me/O.locationSize,te,he,Ce*re,(Te+me/O.locationSize*De)*re,de)}else{if(ne.isInstancedBufferAttribute){for(let le=0;le<O.locationSize;le++)p(O.location+le,ne.meshPerAttribute);x.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let le=0;le<O.locationSize;le++)g(O.location+le);n.bindBuffer(n.ARRAY_BUFFER,Ue);for(let le=0;le<O.locationSize;le++)b(O.location+le,me/O.locationSize,te,he,me*re,me/O.locationSize*le*re,de)}}else if(G!==void 0){const he=G[X];if(he!==void 0)switch(he.length){case 2:n.vertexAttrib2fv(O.location,he);break;case 3:n.vertexAttrib3fv(O.location,he);break;case 4:n.vertexAttrib4fv(O.location,he);break;default:n.vertexAttrib1fv(O.location,he)}}}}S()}function P(){R();for(const x in i){const D=i[x];for(const Y in D){const N=D[Y];for(const H in N)u(N[H].object),delete N[H];delete D[Y]}delete i[x]}}function C(x){if(i[x.id]===void 0)return;const D=i[x.id];for(const Y in D){const N=D[Y];for(const H in N)u(N[H].object),delete N[H];delete D[Y]}delete i[x.id]}function T(x){for(const D in i){const Y=i[D];if(Y[x.id]===void 0)continue;const N=Y[x.id];for(const H in N)u(N[H].object),delete N[H];delete Y[x.id]}}function R(){w(),o=!0,r!==s&&(r=s,c(r.object))}function w(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:R,resetDefaultState:w,dispose:P,releaseStatesOfGeometry:C,releaseStatesOfProgram:T,initAttributes:v,enableAttribute:g,disableUnusedAttributes:S}}function hy(n,e,t){let i;function s(c){i=c}function r(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function o(c,u,h){h!==0&&(n.drawArraysInstanced(i,c,u,h),t.update(u,i,h))}function a(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,h);let f=0;for(let m=0;m<h;m++)f+=u[m];t.update(f,i,1)}function l(c,u,h,d){if(h===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)o(c[m],u[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,u,0,d,0,h);let m=0;for(let v=0;v<h;v++)m+=u[v]*d[v];t.update(m,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function dy(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(T){return!(T!==xn&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){const R=T===cn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==ni&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==Qn&&!R)}function l(T){if(T==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),S=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),b=n.getParameter(n.MAX_VARYING_VECTORS),_=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),P=m>0,C=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:v,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:S,maxVaryings:b,maxFragmentUniforms:_,vertexTextures:P,maxSamples:C}}function fy(n){const e=this;let t=null,i=0,s=!1,r=!1;const o=new fi,a=new Je,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||i!==0||s;return s=d,i=h.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){const m=h.clippingPlanes,v=h.clipIntersection,g=h.clipShadows,p=n.get(h);if(!s||m===null||m.length===0||r&&!g)r?u(null):c();else{const S=r?0:i,b=S*4;let _=p.clippingState||null;l.value=_,_=u(m,d,b,f);for(let P=0;P!==b;++P)_[P]=t[P];p.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(h,d,f,m){const v=h!==null?h.length:0;let g=null;if(v!==0){if(g=l.value,m!==!0||g===null){const p=f+v*4,S=d.matrixWorldInverse;a.getNormalMatrix(S),(g===null||g.length<p)&&(g=new Float32Array(p));for(let b=0,_=f;b!==v;++b,_+=4)o.copy(h[b]).applyMatrix4(S,a),o.normal.toArray(g,_),g[_+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,g}}function py(n){let e=new WeakMap;function t(o,a){return a===rl?o.mapping=Es:a===ol&&(o.mapping=Ts),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===rl||a===ol)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Ag(l.height);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",s),t(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}const vs=4,qu=[.125,.215,.35,.446,.526,.582],Bi=20,Da=new Cc,ju=new ze;let La=null,Ia=0,Ua=0,Na=!1;const Oi=(1+Math.sqrt(5))/2,fs=1/Oi,Yu=[new z(-Oi,fs,0),new z(Oi,fs,0),new z(-fs,0,Oi),new z(fs,0,Oi),new z(0,Oi,-fs),new z(0,Oi,fs),new z(-1,1,-1),new z(1,1,-1),new z(-1,1,1),new z(1,1,1)],my=new z;class $u{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100,r={}){const{size:o=256,position:a=my}=r;La=this._renderer.getRenderTarget(),Ia=this._renderer.getActiveCubeFace(),Ua=this._renderer.getActiveMipmapLevel(),Na=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ku(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ju(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(La,Ia,Ua),this._renderer.xr.enabled=Na,e.scissorTest=!1,io(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Es||e.mapping===Ts?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),La=this._renderer.getRenderTarget(),Ia=this._renderer.getActiveCubeFace(),Ua=this._renderer.getActiveMipmapLevel(),Na=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:en,minFilter:en,generateMipmaps:!1,type:cn,format:xn,colorSpace:As,depthBuffer:!1},s=Zu(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Zu(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=gy(r)),this._blurMaterial=vy(r,e,t)}return s}_compileMaterial(e){const t=new W(this._lodPlanes[0],e);this._renderer.compile(t,Da)}_sceneToCubeUV(e,t,i,s,r){const l=new un(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(ju),h.toneMapping=xi,h.autoClear=!1;const m=new At({name:"PMREM.Background",side:tn,depthWrite:!1,depthTest:!1}),v=new W(new ye,m);let g=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,g=!0):(m.color.copy(ju),g=!0);for(let S=0;S<6;S++){const b=S%3;b===0?(l.up.set(0,c[S],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[S],r.y,r.z)):b===1?(l.up.set(0,0,c[S]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[S],r.z)):(l.up.set(0,c[S],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[S]));const _=this._cubeSize;io(s,b*_,S>2?_:0,_,_),h.setRenderTarget(s),g&&h.render(v,l),h.render(e,l)}v.geometry.dispose(),v.material.dispose(),h.toneMapping=f,h.autoClear=d,e.background=p}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===Es||e.mapping===Ts;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ku()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ju());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new W(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;io(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,Da)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Yu[(s-r-1)%Yu.length];this._blur(e,r-1,r,o,a)}t.autoClear=i}_blur(e,t,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,s,"latitudinal",r),this._halfBlur(o,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new W(this._lodPlanes[s],c),d=c.uniforms,f=this._sizeLods[i]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Bi-1),v=r/m,g=isFinite(r)?1+Math.floor(u*v):Bi;g>Bi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Bi}`);const p=[];let S=0;for(let T=0;T<Bi;++T){const R=T/v,w=Math.exp(-R*R/2);p.push(w),T===0?S+=w:T<g&&(S+=2*w)}for(let T=0;T<p.length;T++)p[T]=p[T]/S;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:b}=this;d.dTheta.value=m,d.mipInt.value=b-i;const _=this._sizeLods[s],P=3*_*(s>b-vs?s-b+vs:0),C=4*(this._cubeSize-_);io(t,P,C,3*_,2*_),l.setRenderTarget(t),l.render(h,Da)}}function gy(n){const e=[],t=[],i=[];let s=n;const r=n-vs+1+qu.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let l=1/a;o>n-vs?l=qu[o-n+vs-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,m=6,v=3,g=2,p=1,S=new Float32Array(v*m*f),b=new Float32Array(g*m*f),_=new Float32Array(p*m*f);for(let C=0;C<f;C++){const T=C%3*2/3-1,R=C>2?0:-1,w=[T,R,0,T+2/3,R,0,T+2/3,R+1,0,T,R,0,T+2/3,R+1,0,T,R+1,0];S.set(w,v*m*C),b.set(d,g*m*C);const x=[C,C,C,C,C,C];_.set(x,p*m*C)}const P=new Et;P.setAttribute("position",new zn(S,v)),P.setAttribute("uv",new zn(b,g)),P.setAttribute("faceIndex",new zn(_,p)),e.push(P),s>vs&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Zu(n,e,t){const i=new Ft(n,e,t);return i.texture.mapping=Oo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function io(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function vy(n,e,t){const i=new Float32Array(Bi),s=new z(0,1,0);return new Zt({name:"SphericalGaussianBlur",defines:{n:Bi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Rc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function Ju(){return new Zt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Rc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function Ku(){return new Zt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Rc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function Rc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function _y(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===rl||l===ol,u=l===Es||l===Ts;if(c||u){let h=e.get(a);const d=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new $u(n)),h=c?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{const f=a.image;return c&&f&&f.height>0||u&&f&&s(f)?(t===null&&(t=new $u(n)),h=c?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",r),h.texture):null}}}return a}function s(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function xy(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&mo("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function yy(n,e,t,i){const s={},r=new WeakMap;function o(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const m in d.attributes)e.remove(d.attributes[m]);d.removeEventListener("dispose",o),delete s[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(h,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const f in d)e.update(d[f],n.ARRAY_BUFFER)}function c(h){const d=[],f=h.index,m=h.attributes.position;let v=0;if(f!==null){const S=f.array;v=f.version;for(let b=0,_=S.length;b<_;b+=3){const P=S[b+0],C=S[b+1],T=S[b+2];d.push(P,C,C,T,T,P)}}else if(m!==void 0){const S=m.array;v=m.version;for(let b=0,_=S.length/3-1;b<_;b+=3){const P=b+0,C=b+1,T=b+2;d.push(P,C,C,T,T,P)}}else return;const g=new(Fd(d)?Hd:kd)(d,1);g.version=v;const p=r.get(h);p&&e.remove(p),r.set(h,g)}function u(h){const d=r.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return r.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function My(n,e,t){let i;function s(d){i=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){n.drawElements(i,f,r,d*o),t.update(f,i,1)}function c(d,f,m){m!==0&&(n.drawElementsInstanced(i,f,r,d*o,m),t.update(f,i,m))}function u(d,f,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,d,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];t.update(g,i,1)}function h(d,f,m,v){if(m===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)c(d[p]/o,f[p],v[p]);else{g.multiDrawElementsInstancedWEBGL(i,f,0,r,d,0,v,0,m);let p=0;for(let S=0;S<m;S++)p+=f[S]*v[S];t.update(p,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function Sy(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(r/3);break;case n.LINES:t.lines+=a*(r/2);break;case n.LINE_STRIP:t.lines+=a*(r-1);break;case n.LINE_LOOP:t.lines+=a*r;break;case n.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function by(n,e,t){const i=new WeakMap,s=new dt;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let d=i.get(a);if(d===void 0||d.count!==h){let x=function(){R.dispose(),i.delete(a),a.removeEventListener("dispose",x)};var f=x;d!==void 0&&d.texture.dispose();const m=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],S=a.morphAttributes.normal||[],b=a.morphAttributes.color||[];let _=0;m===!0&&(_=1),v===!0&&(_=2),g===!0&&(_=3);let P=a.attributes.position.count*_,C=1;P>e.maxTextureSize&&(C=Math.ceil(P/e.maxTextureSize),P=e.maxTextureSize);const T=new Float32Array(P*C*4*h),R=new Bd(T,P,C,h);R.type=Qn,R.needsUpdate=!0;const w=_*4;for(let D=0;D<h;D++){const Y=p[D],N=S[D],H=b[D],$=P*C*4*D;for(let G=0;G<Y.count;G++){const X=G*w;m===!0&&(s.fromBufferAttribute(Y,G),T[$+X+0]=s.x,T[$+X+1]=s.y,T[$+X+2]=s.z,T[$+X+3]=0),v===!0&&(s.fromBufferAttribute(N,G),T[$+X+4]=s.x,T[$+X+5]=s.y,T[$+X+6]=s.z,T[$+X+7]=0),g===!0&&(s.fromBufferAttribute(H,G),T[$+X+8]=s.x,T[$+X+9]=s.y,T[$+X+10]=s.z,T[$+X+11]=H.itemSize===4?s.w:1)}}d={count:h,texture:R,size:new ve(P,C)},i.set(a,d),a.addEventListener("dispose",x)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let m=0;for(let g=0;g<c.length;g++)m+=c[g];const v=a.morphTargetsRelative?1:1-m;l.getUniforms().setValue(n,"morphTargetBaseInfluence",v),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:r}}function wy(n,e,t,i){let s=new WeakMap;function r(l){const c=i.render.frame,u=l.geometry,h=e.get(l,u);if(s.get(h)!==c&&(e.update(h),s.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return h}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}const of=new Gt,Qu=new jd(1,1),af=new Bd,lf=new hg,cf=new Wd,eh=[],th=[],nh=new Float32Array(16),ih=new Float32Array(9),sh=new Float32Array(4);function Ds(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=eh[s];if(r===void 0&&(r=new Float32Array(s),eh[s]=r),e!==0){i.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(r,a)}return r}function Ct(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Rt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Vo(n,e){let t=th[e];t===void 0&&(t=new Int32Array(e),th[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Ey(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Ty(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;n.uniform2fv(this.addr,e),Rt(t,e)}}function Ay(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ct(t,e))return;n.uniform3fv(this.addr,e),Rt(t,e)}}function Cy(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;n.uniform4fv(this.addr,e),Rt(t,e)}}function Ry(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ct(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Rt(t,e)}else{if(Ct(t,i))return;sh.set(i),n.uniformMatrix2fv(this.addr,!1,sh),Rt(t,i)}}function Py(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ct(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Rt(t,e)}else{if(Ct(t,i))return;ih.set(i),n.uniformMatrix3fv(this.addr,!1,ih),Rt(t,i)}}function Dy(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ct(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Rt(t,e)}else{if(Ct(t,i))return;nh.set(i),n.uniformMatrix4fv(this.addr,!1,nh),Rt(t,i)}}function Ly(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Iy(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;n.uniform2iv(this.addr,e),Rt(t,e)}}function Uy(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ct(t,e))return;n.uniform3iv(this.addr,e),Rt(t,e)}}function Ny(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;n.uniform4iv(this.addr,e),Rt(t,e)}}function Oy(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Fy(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;n.uniform2uiv(this.addr,e),Rt(t,e)}}function By(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ct(t,e))return;n.uniform3uiv(this.addr,e),Rt(t,e)}}function zy(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;n.uniform4uiv(this.addr,e),Rt(t,e)}}function ky(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Qu.compareFunction=Od,r=Qu):r=of,t.setTexture2D(e||r,s)}function Hy(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||lf,s)}function Gy(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||cf,s)}function Vy(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||af,s)}function Wy(n){switch(n){case 5126:return Ey;case 35664:return Ty;case 35665:return Ay;case 35666:return Cy;case 35674:return Ry;case 35675:return Py;case 35676:return Dy;case 5124:case 35670:return Ly;case 35667:case 35671:return Iy;case 35668:case 35672:return Uy;case 35669:case 35673:return Ny;case 5125:return Oy;case 36294:return Fy;case 36295:return By;case 36296:return zy;case 35678:case 36198:case 36298:case 36306:case 35682:return ky;case 35679:case 36299:case 36307:return Hy;case 35680:case 36300:case 36308:case 36293:return Gy;case 36289:case 36303:case 36311:case 36292:return Vy}}function Xy(n,e){n.uniform1fv(this.addr,e)}function qy(n,e){const t=Ds(e,this.size,2);n.uniform2fv(this.addr,t)}function jy(n,e){const t=Ds(e,this.size,3);n.uniform3fv(this.addr,t)}function Yy(n,e){const t=Ds(e,this.size,4);n.uniform4fv(this.addr,t)}function $y(n,e){const t=Ds(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Zy(n,e){const t=Ds(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Jy(n,e){const t=Ds(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Ky(n,e){n.uniform1iv(this.addr,e)}function Qy(n,e){n.uniform2iv(this.addr,e)}function eM(n,e){n.uniform3iv(this.addr,e)}function tM(n,e){n.uniform4iv(this.addr,e)}function nM(n,e){n.uniform1uiv(this.addr,e)}function iM(n,e){n.uniform2uiv(this.addr,e)}function sM(n,e){n.uniform3uiv(this.addr,e)}function rM(n,e){n.uniform4uiv(this.addr,e)}function oM(n,e,t){const i=this.cache,s=e.length,r=Vo(t,s);Ct(i,r)||(n.uniform1iv(this.addr,r),Rt(i,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||of,r[o])}function aM(n,e,t){const i=this.cache,s=e.length,r=Vo(t,s);Ct(i,r)||(n.uniform1iv(this.addr,r),Rt(i,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||lf,r[o])}function lM(n,e,t){const i=this.cache,s=e.length,r=Vo(t,s);Ct(i,r)||(n.uniform1iv(this.addr,r),Rt(i,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||cf,r[o])}function cM(n,e,t){const i=this.cache,s=e.length,r=Vo(t,s);Ct(i,r)||(n.uniform1iv(this.addr,r),Rt(i,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||af,r[o])}function uM(n){switch(n){case 5126:return Xy;case 35664:return qy;case 35665:return jy;case 35666:return Yy;case 35674:return $y;case 35675:return Zy;case 35676:return Jy;case 5124:case 35670:return Ky;case 35667:case 35671:return Qy;case 35668:case 35672:return eM;case 35669:case 35673:return tM;case 5125:return nM;case 36294:return iM;case 36295:return sM;case 36296:return rM;case 35678:case 36198:case 36298:case 36306:case 35682:return oM;case 35679:case 36299:case 36307:return aM;case 35680:case 36300:case 36308:case 36293:return lM;case 36289:case 36303:case 36311:case 36292:return cM}}class hM{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Wy(t.type)}}class dM{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=uM(t.type)}}class fM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],i)}}}const Oa=/(\w+)(\])?(\[|\.)?/g;function rh(n,e){n.seq.push(e),n.map[e.id]=e}function pM(n,e,t){const i=n.name,s=i.length;for(Oa.lastIndex=0;;){const r=Oa.exec(i),o=Oa.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){rh(t,c===void 0?new hM(a,n,e):new dM(a,n,e));break}else{let h=t.map[a];h===void 0&&(h=new fM(a),rh(t,h)),t=h}}}class go{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);pM(r,o,this)}}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&i.push(o)}return i}}function oh(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const mM=37297;let gM=0;function vM(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const ah=new Je;function _M(n){rt._getMatrix(ah,rt.workingColorSpace,n);const e=`mat3( ${ah.elements.map(t=>t.toFixed(4))} )`;switch(rt.getTransfer(n)){case bo:return[e,"LinearTransferOETF"];case ut:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function lh(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=n.getShaderInfoLog(e).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+vM(n.getShaderSource(e),o)}else return s}function xM(n,e){const t=_M(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function yM(n,e){let t;switch(e){case w0:t="Linear";break;case E0:t="Reinhard";break;case T0:t="Cineon";break;case bd:t="ACESFilmic";break;case C0:t="AgX";break;case R0:t="Neutral";break;case A0:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const so=new z;function MM(){rt.getLuminanceCoefficients(so);const n=so.x.toFixed(4),e=so.y.toFixed(4),t=so.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function SM(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Xs).join(`
`)}function bM(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function wM(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Xs(n){return n!==""}function ch(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function uh(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const EM=/^[ \t]*#include +<([\w\d./]+)>/gm;function Hl(n){return n.replace(EM,AM)}const TM=new Map;function AM(n,e){let t=Ke[e];if(t===void 0){const i=TM.get(e);if(i!==void 0)t=Ke[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Hl(t)}const CM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function hh(n){return n.replace(CM,RM)}function RM(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function dh(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function PM(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Sd?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===i0?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Yn&&(e="SHADOWMAP_TYPE_VSM"),e}function DM(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Es:case Ts:e="ENVMAP_TYPE_CUBE";break;case Oo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function LM(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Ts:e="ENVMAP_MODE_REFRACTION";break}return e}function IM(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case uc:e="ENVMAP_BLENDING_MULTIPLY";break;case S0:e="ENVMAP_BLENDING_MIX";break;case b0:e="ENVMAP_BLENDING_ADD";break}return e}function UM(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function NM(n,e,t,i){const s=n.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=PM(t),c=DM(t),u=LM(t),h=IM(t),d=UM(t),f=SM(t),m=bM(r),v=s.createProgram();let g,p,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Xs).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Xs).join(`
`),p.length>0&&(p+=`
`)):(g=[dh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Xs).join(`
`),p=[dh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==xi?"#define TONE_MAPPING":"",t.toneMapping!==xi?Ke.tonemapping_pars_fragment:"",t.toneMapping!==xi?yM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ke.colorspace_pars_fragment,xM("linearToOutputTexel",t.outputColorSpace),MM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Xs).join(`
`)),o=Hl(o),o=ch(o,t),o=uh(o,t),a=Hl(a),a=ch(a,t),a=uh(a,t),o=hh(o),a=hh(a),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===du?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===du?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const b=S+g+o,_=S+p+a,P=oh(s,s.VERTEX_SHADER,b),C=oh(s,s.FRAGMENT_SHADER,_);s.attachShader(v,P),s.attachShader(v,C),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function T(D){if(n.debug.checkShaderErrors){const Y=s.getProgramInfoLog(v).trim(),N=s.getShaderInfoLog(P).trim(),H=s.getShaderInfoLog(C).trim();let $=!0,G=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if($=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,P,C);else{const X=lh(s,P,"vertex"),O=lh(s,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+Y+`
`+X+`
`+O)}else Y!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Y):(N===""||H==="")&&(G=!1);G&&(D.diagnostics={runnable:$,programLog:Y,vertexShader:{log:N,prefix:g},fragmentShader:{log:H,prefix:p}})}s.deleteShader(P),s.deleteShader(C),R=new go(s,v),w=wM(s,v)}let R;this.getUniforms=function(){return R===void 0&&T(this),R};let w;this.getAttributes=function(){return w===void 0&&T(this),w};let x=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=s.getProgramParameter(v,mM)),x},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=gM++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=P,this.fragmentShader=C,this}let OM=0;class FM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new BM(e),t.set(e,i)),i}}class BM{constructor(e){this.id=OM++,this.code=e,this.usedTimes=0}}function zM(n,e,t,i,s,r,o){const a=new yc,l=new FM,c=new Set,u=[],h=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(w){return c.add(w),w===0?"uv":`uv${w}`}function g(w,x,D,Y,N){const H=Y.fog,$=N.geometry,G=w.isMeshStandardMaterial?Y.environment:null,X=(w.isMeshStandardMaterial?t:e).get(w.envMap||G),O=X&&X.mapping===Oo?X.image.height:null,ne=m[w.type];w.precision!==null&&(f=s.getMaxPrecision(w.precision),f!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",f,"instead."));const he=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,me=he!==void 0?he.length:0;let _e=0;$.morphAttributes.position!==void 0&&(_e=1),$.morphAttributes.normal!==void 0&&(_e=2),$.morphAttributes.color!==void 0&&(_e=3);let Ue,te,re,de;if(ne){const tt=On[ne];Ue=tt.vertexShader,te=tt.fragmentShader}else Ue=w.vertexShader,te=w.fragmentShader,l.update(w),re=l.getVertexShaderID(w),de=l.getFragmentShaderID(w);const le=n.getRenderTarget(),Ce=n.state.buffers.depth.getReversed(),Te=N.isInstancedMesh===!0,De=N.isBatchedMesh===!0,Ge=!!w.map,I=!!w.matcap,U=!!X,E=!!w.aoMap,ae=!!w.lightMap,F=!!w.bumpMap,k=!!w.normalMap,V=!!w.displacementMap,ee=!!w.emissiveMap,B=!!w.metalnessMap,M=!!w.roughnessMap,y=w.anisotropy>0,L=w.clearcoat>0,j=w.dispersion>0,Z=w.iridescence>0,Q=w.sheen>0,xe=w.transmission>0,ce=y&&!!w.anisotropyMap,Se=L&&!!w.clearcoatMap,ke=L&&!!w.clearcoatNormalMap,fe=L&&!!w.clearcoatRoughnessMap,pe=Z&&!!w.iridescenceMap,be=Z&&!!w.iridescenceThicknessMap,Ne=Q&&!!w.sheenColorMap,ge=Q&&!!w.sheenRoughnessMap,Ie=!!w.specularMap,Oe=!!w.specularColorMap,$e=!!w.specularIntensityMap,q=xe&&!!w.transmissionMap,Ae=xe&&!!w.thicknessMap,oe=!!w.gradientMap,ue=!!w.alphaMap,Ee=w.alphaTest>0,Re=!!w.alphaHash,je=!!w.extensions;let gt=xi;w.toneMapped&&(le===null||le.isXRRenderTarget===!0)&&(gt=n.toneMapping);const yt={shaderID:ne,shaderType:w.type,shaderName:w.name,vertexShader:Ue,fragmentShader:te,defines:w.defines,customVertexShaderID:re,customFragmentShaderID:de,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:f,batching:De,batchingColor:De&&N._colorsTexture!==null,instancing:Te,instancingColor:Te&&N.instanceColor!==null,instancingMorph:Te&&N.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:le===null?n.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:As,alphaToCoverage:!!w.alphaToCoverage,map:Ge,matcap:I,envMap:U,envMapMode:U&&X.mapping,envMapCubeUVHeight:O,aoMap:E,lightMap:ae,bumpMap:F,normalMap:k,displacementMap:d&&V,emissiveMap:ee,normalMapObjectSpace:k&&w.normalMapType===L0,normalMapTangentSpace:k&&w.normalMapType===vc,metalnessMap:B,roughnessMap:M,anisotropy:y,anisotropyMap:ce,clearcoat:L,clearcoatMap:Se,clearcoatNormalMap:ke,clearcoatRoughnessMap:fe,dispersion:j,iridescence:Z,iridescenceMap:pe,iridescenceThicknessMap:be,sheen:Q,sheenColorMap:Ne,sheenRoughnessMap:ge,specularMap:Ie,specularColorMap:Oe,specularIntensityMap:$e,transmission:xe,transmissionMap:q,thicknessMap:Ae,gradientMap:oe,opaque:w.transparent===!1&&w.blending===Gi&&w.alphaToCoverage===!1,alphaMap:ue,alphaTest:Ee,alphaHash:Re,combine:w.combine,mapUv:Ge&&v(w.map.channel),aoMapUv:E&&v(w.aoMap.channel),lightMapUv:ae&&v(w.lightMap.channel),bumpMapUv:F&&v(w.bumpMap.channel),normalMapUv:k&&v(w.normalMap.channel),displacementMapUv:V&&v(w.displacementMap.channel),emissiveMapUv:ee&&v(w.emissiveMap.channel),metalnessMapUv:B&&v(w.metalnessMap.channel),roughnessMapUv:M&&v(w.roughnessMap.channel),anisotropyMapUv:ce&&v(w.anisotropyMap.channel),clearcoatMapUv:Se&&v(w.clearcoatMap.channel),clearcoatNormalMapUv:ke&&v(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:fe&&v(w.clearcoatRoughnessMap.channel),iridescenceMapUv:pe&&v(w.iridescenceMap.channel),iridescenceThicknessMapUv:be&&v(w.iridescenceThicknessMap.channel),sheenColorMapUv:Ne&&v(w.sheenColorMap.channel),sheenRoughnessMapUv:ge&&v(w.sheenRoughnessMap.channel),specularMapUv:Ie&&v(w.specularMap.channel),specularColorMapUv:Oe&&v(w.specularColorMap.channel),specularIntensityMapUv:$e&&v(w.specularIntensityMap.channel),transmissionMapUv:q&&v(w.transmissionMap.channel),thicknessMapUv:Ae&&v(w.thicknessMap.channel),alphaMapUv:ue&&v(w.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(k||y),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!$.attributes.uv&&(Ge||ue),fog:!!H,useFog:w.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:Ce,skinning:N.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:me,morphTextureStride:_e,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:w.dithering,shadowMapEnabled:n.shadowMap.enabled&&D.length>0,shadowMapType:n.shadowMap.type,toneMapping:gt,decodeVideoTexture:Ge&&w.map.isVideoTexture===!0&&rt.getTransfer(w.map.colorSpace)===ut,decodeVideoTextureEmissive:ee&&w.emissiveMap.isVideoTexture===!0&&rt.getTransfer(w.emissiveMap.colorSpace)===ut,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===kt,flipSided:w.side===tn,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:je&&w.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(je&&w.extensions.multiDraw===!0||De)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return yt.vertexUv1s=c.has(1),yt.vertexUv2s=c.has(2),yt.vertexUv3s=c.has(3),c.clear(),yt}function p(w){const x=[];if(w.shaderID?x.push(w.shaderID):(x.push(w.customVertexShaderID),x.push(w.customFragmentShaderID)),w.defines!==void 0)for(const D in w.defines)x.push(D),x.push(w.defines[D]);return w.isRawShaderMaterial===!1&&(S(x,w),b(x,w),x.push(n.outputColorSpace)),x.push(w.customProgramCacheKey),x.join()}function S(w,x){w.push(x.precision),w.push(x.outputColorSpace),w.push(x.envMapMode),w.push(x.envMapCubeUVHeight),w.push(x.mapUv),w.push(x.alphaMapUv),w.push(x.lightMapUv),w.push(x.aoMapUv),w.push(x.bumpMapUv),w.push(x.normalMapUv),w.push(x.displacementMapUv),w.push(x.emissiveMapUv),w.push(x.metalnessMapUv),w.push(x.roughnessMapUv),w.push(x.anisotropyMapUv),w.push(x.clearcoatMapUv),w.push(x.clearcoatNormalMapUv),w.push(x.clearcoatRoughnessMapUv),w.push(x.iridescenceMapUv),w.push(x.iridescenceThicknessMapUv),w.push(x.sheenColorMapUv),w.push(x.sheenRoughnessMapUv),w.push(x.specularMapUv),w.push(x.specularColorMapUv),w.push(x.specularIntensityMapUv),w.push(x.transmissionMapUv),w.push(x.thicknessMapUv),w.push(x.combine),w.push(x.fogExp2),w.push(x.sizeAttenuation),w.push(x.morphTargetsCount),w.push(x.morphAttributeCount),w.push(x.numDirLights),w.push(x.numPointLights),w.push(x.numSpotLights),w.push(x.numSpotLightMaps),w.push(x.numHemiLights),w.push(x.numRectAreaLights),w.push(x.numDirLightShadows),w.push(x.numPointLightShadows),w.push(x.numSpotLightShadows),w.push(x.numSpotLightShadowsWithMaps),w.push(x.numLightProbes),w.push(x.shadowMapType),w.push(x.toneMapping),w.push(x.numClippingPlanes),w.push(x.numClipIntersection),w.push(x.depthPacking)}function b(w,x){a.disableAll(),x.supportsVertexTextures&&a.enable(0),x.instancing&&a.enable(1),x.instancingColor&&a.enable(2),x.instancingMorph&&a.enable(3),x.matcap&&a.enable(4),x.envMap&&a.enable(5),x.normalMapObjectSpace&&a.enable(6),x.normalMapTangentSpace&&a.enable(7),x.clearcoat&&a.enable(8),x.iridescence&&a.enable(9),x.alphaTest&&a.enable(10),x.vertexColors&&a.enable(11),x.vertexAlphas&&a.enable(12),x.vertexUv1s&&a.enable(13),x.vertexUv2s&&a.enable(14),x.vertexUv3s&&a.enable(15),x.vertexTangents&&a.enable(16),x.anisotropy&&a.enable(17),x.alphaHash&&a.enable(18),x.batching&&a.enable(19),x.dispersion&&a.enable(20),x.batchingColor&&a.enable(21),w.push(a.mask),a.disableAll(),x.fog&&a.enable(0),x.useFog&&a.enable(1),x.flatShading&&a.enable(2),x.logarithmicDepthBuffer&&a.enable(3),x.reverseDepthBuffer&&a.enable(4),x.skinning&&a.enable(5),x.morphTargets&&a.enable(6),x.morphNormals&&a.enable(7),x.morphColors&&a.enable(8),x.premultipliedAlpha&&a.enable(9),x.shadowMapEnabled&&a.enable(10),x.doubleSided&&a.enable(11),x.flipSided&&a.enable(12),x.useDepthPacking&&a.enable(13),x.dithering&&a.enable(14),x.transmission&&a.enable(15),x.sheen&&a.enable(16),x.opaque&&a.enable(17),x.pointsUvs&&a.enable(18),x.decodeVideoTexture&&a.enable(19),x.decodeVideoTextureEmissive&&a.enable(20),x.alphaToCoverage&&a.enable(21),w.push(a.mask)}function _(w){const x=m[w.type];let D;if(x){const Y=On[x];D=Mc.clone(Y.uniforms)}else D=w.uniforms;return D}function P(w,x){let D;for(let Y=0,N=u.length;Y<N;Y++){const H=u[Y];if(H.cacheKey===x){D=H,++D.usedTimes;break}}return D===void 0&&(D=new NM(n,x,w,r),u.push(D)),D}function C(w){if(--w.usedTimes===0){const x=u.indexOf(w);u[x]=u[u.length-1],u.pop(),w.destroy()}}function T(w){l.remove(w)}function R(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:_,acquireProgram:P,releaseProgram:C,releaseShaderCache:T,programs:u,dispose:R}}function kM(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function HM(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function fh(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function ph(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function o(h,d,f,m,v,g){let p=n[e];return p===void 0?(p={id:h.id,object:h,geometry:d,material:f,groupOrder:m,renderOrder:h.renderOrder,z:v,group:g},n[e]=p):(p.id=h.id,p.object=h,p.geometry=d,p.material=f,p.groupOrder=m,p.renderOrder=h.renderOrder,p.z=v,p.group=g),e++,p}function a(h,d,f,m,v,g){const p=o(h,d,f,m,v,g);f.transmission>0?i.push(p):f.transparent===!0?s.push(p):t.push(p)}function l(h,d,f,m,v,g){const p=o(h,d,f,m,v,g);f.transmission>0?i.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function c(h,d){t.length>1&&t.sort(h||HM),i.length>1&&i.sort(d||fh),s.length>1&&s.sort(d||fh)}function u(){for(let h=e,d=n.length;h<d;h++){const f=n[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:u,sort:c}}function GM(){let n=new WeakMap;function e(i,s){const r=n.get(i);let o;return r===void 0?(o=new ph,n.set(i,[o])):s>=r.length?(o=new ph,r.push(o)):o=r[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function VM(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new z,color:new ze};break;case"SpotLight":t={position:new z,direction:new z,color:new ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new z,color:new ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new z,skyColor:new ze,groundColor:new ze};break;case"RectAreaLight":t={color:new ze,position:new z,halfWidth:new z,halfHeight:new z};break}return n[e.id]=t,t}}}function WM(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ve};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ve};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ve,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let XM=0;function qM(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function jM(n){const e=new VM,t=WM(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new z);const s=new z,r=new ft,o=new ft;function a(c){let u=0,h=0,d=0;for(let w=0;w<9;w++)i.probe[w].set(0,0,0);let f=0,m=0,v=0,g=0,p=0,S=0,b=0,_=0,P=0,C=0,T=0;c.sort(qM);for(let w=0,x=c.length;w<x;w++){const D=c[w],Y=D.color,N=D.intensity,H=D.distance,$=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)u+=Y.r*N,h+=Y.g*N,d+=Y.b*N;else if(D.isLightProbe){for(let G=0;G<9;G++)i.probe[G].addScaledVector(D.sh.coefficients[G],N);T++}else if(D.isDirectionalLight){const G=e.get(D);if(G.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const X=D.shadow,O=t.get(D);O.shadowIntensity=X.intensity,O.shadowBias=X.bias,O.shadowNormalBias=X.normalBias,O.shadowRadius=X.radius,O.shadowMapSize=X.mapSize,i.directionalShadow[f]=O,i.directionalShadowMap[f]=$,i.directionalShadowMatrix[f]=D.shadow.matrix,S++}i.directional[f]=G,f++}else if(D.isSpotLight){const G=e.get(D);G.position.setFromMatrixPosition(D.matrixWorld),G.color.copy(Y).multiplyScalar(N),G.distance=H,G.coneCos=Math.cos(D.angle),G.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),G.decay=D.decay,i.spot[v]=G;const X=D.shadow;if(D.map&&(i.spotLightMap[P]=D.map,P++,X.updateMatrices(D),D.castShadow&&C++),i.spotLightMatrix[v]=X.matrix,D.castShadow){const O=t.get(D);O.shadowIntensity=X.intensity,O.shadowBias=X.bias,O.shadowNormalBias=X.normalBias,O.shadowRadius=X.radius,O.shadowMapSize=X.mapSize,i.spotShadow[v]=O,i.spotShadowMap[v]=$,_++}v++}else if(D.isRectAreaLight){const G=e.get(D);G.color.copy(Y).multiplyScalar(N),G.halfWidth.set(D.width*.5,0,0),G.halfHeight.set(0,D.height*.5,0),i.rectArea[g]=G,g++}else if(D.isPointLight){const G=e.get(D);if(G.color.copy(D.color).multiplyScalar(D.intensity),G.distance=D.distance,G.decay=D.decay,D.castShadow){const X=D.shadow,O=t.get(D);O.shadowIntensity=X.intensity,O.shadowBias=X.bias,O.shadowNormalBias=X.normalBias,O.shadowRadius=X.radius,O.shadowMapSize=X.mapSize,O.shadowCameraNear=X.camera.near,O.shadowCameraFar=X.camera.far,i.pointShadow[m]=O,i.pointShadowMap[m]=$,i.pointShadowMatrix[m]=D.shadow.matrix,b++}i.point[m]=G,m++}else if(D.isHemisphereLight){const G=e.get(D);G.skyColor.copy(D.color).multiplyScalar(N),G.groundColor.copy(D.groundColor).multiplyScalar(N),i.hemi[p]=G,p++}}g>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Pe.LTC_FLOAT_1,i.rectAreaLTC2=Pe.LTC_FLOAT_2):(i.rectAreaLTC1=Pe.LTC_HALF_1,i.rectAreaLTC2=Pe.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=d;const R=i.hash;(R.directionalLength!==f||R.pointLength!==m||R.spotLength!==v||R.rectAreaLength!==g||R.hemiLength!==p||R.numDirectionalShadows!==S||R.numPointShadows!==b||R.numSpotShadows!==_||R.numSpotMaps!==P||R.numLightProbes!==T)&&(i.directional.length=f,i.spot.length=v,i.rectArea.length=g,i.point.length=m,i.hemi.length=p,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=_,i.spotShadowMap.length=_,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=_+P-C,i.spotLightMap.length=P,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=T,R.directionalLength=f,R.pointLength=m,R.spotLength=v,R.rectAreaLength=g,R.hemiLength=p,R.numDirectionalShadows=S,R.numPointShadows=b,R.numSpotShadows=_,R.numSpotMaps=P,R.numLightProbes=T,i.version=XM++)}function l(c,u){let h=0,d=0,f=0,m=0,v=0;const g=u.matrixWorldInverse;for(let p=0,S=c.length;p<S;p++){const b=c[p];if(b.isDirectionalLight){const _=i.directional[h];_.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(g),h++}else if(b.isSpotLight){const _=i.spot[f];_.position.setFromMatrixPosition(b.matrixWorld),_.position.applyMatrix4(g),_.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(g),f++}else if(b.isRectAreaLight){const _=i.rectArea[m];_.position.setFromMatrixPosition(b.matrixWorld),_.position.applyMatrix4(g),o.identity(),r.copy(b.matrixWorld),r.premultiply(g),o.extractRotation(r),_.halfWidth.set(b.width*.5,0,0),_.halfHeight.set(0,b.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),m++}else if(b.isPointLight){const _=i.point[d];_.position.setFromMatrixPosition(b.matrixWorld),_.position.applyMatrix4(g),d++}else if(b.isHemisphereLight){const _=i.hemi[v];_.direction.setFromMatrixPosition(b.matrixWorld),_.direction.transformDirection(g),v++}}}return{setup:a,setupView:l,state:i}}function mh(n){const e=new jM(n),t=[],i=[];function s(u){c.camera=u,t.length=0,i.length=0}function r(u){t.push(u)}function o(u){i.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function YM(n){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new mh(n),e.set(s,[a])):r>=o.length?(a=new mh(n),o.push(a)):a=o[r],a}function i(){e=new WeakMap}return{get:t,dispose:i}}const $M=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ZM=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function JM(n,e,t){let i=new Sc;const s=new ve,r=new ve,o=new dt,a=new nf({depthPacking:Nd}),l=new fv,c={},u=t.maxTextureSize,h={[Mi]:tn,[tn]:Mi,[kt]:kt},d=new Zt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ve},radius:{value:4}},vertexShader:$M,fragmentShader:ZM}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const m=new Et;m.setAttribute("position",new zn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new W(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Sd;let p=this.type;this.render=function(C,T,R){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||C.length===0)return;const w=n.getRenderTarget(),x=n.getActiveCubeFace(),D=n.getActiveMipmapLevel(),Y=n.state;Y.setBlending(Rn),Y.buffers.color.setClear(1,1,1,1),Y.buffers.depth.setTest(!0),Y.setScissorTest(!1);const N=p!==Yn&&this.type===Yn,H=p===Yn&&this.type!==Yn;for(let $=0,G=C.length;$<G;$++){const X=C[$],O=X.shadow;if(O===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;s.copy(O.mapSize);const ne=O.getFrameExtents();if(s.multiply(ne),r.copy(O.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ne.x),s.x=r.x*ne.x,O.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ne.y),s.y=r.y*ne.y,O.mapSize.y=r.y)),O.map===null||N===!0||H===!0){const me=this.type!==Yn?{minFilter:Pn,magFilter:Pn}:{};O.map!==null&&O.map.dispose(),O.map=new Ft(s.x,s.y,me),O.map.texture.name=X.name+".shadowMap",O.camera.updateProjectionMatrix()}n.setRenderTarget(O.map),n.clear();const he=O.getViewportCount();for(let me=0;me<he;me++){const _e=O.getViewport(me);o.set(r.x*_e.x,r.y*_e.y,r.x*_e.z,r.y*_e.w),Y.viewport(o),O.updateMatrices(X,me),i=O.getFrustum(),_(T,R,O.camera,X,this.type)}O.isPointLightShadow!==!0&&this.type===Yn&&S(O,R),O.needsUpdate=!1}p=this.type,g.needsUpdate=!1,n.setRenderTarget(w,x,D)};function S(C,T){const R=e.update(v);d.defines.VSM_SAMPLES!==C.blurSamples&&(d.defines.VSM_SAMPLES=C.blurSamples,f.defines.VSM_SAMPLES=C.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Ft(s.x,s.y)),d.uniforms.shadow_pass.value=C.map.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,n.setRenderTarget(C.mapPass),n.clear(),n.renderBufferDirect(T,null,R,d,v,null),f.uniforms.shadow_pass.value=C.mapPass.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,n.setRenderTarget(C.map),n.clear(),n.renderBufferDirect(T,null,R,f,v,null)}function b(C,T,R,w){let x=null;const D=R.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(D!==void 0)x=D;else if(x=R.isPointLight===!0?l:a,n.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const Y=x.uuid,N=T.uuid;let H=c[Y];H===void 0&&(H={},c[Y]=H);let $=H[N];$===void 0&&($=x.clone(),H[N]=$,T.addEventListener("dispose",P)),x=$}if(x.visible=T.visible,x.wireframe=T.wireframe,w===Yn?x.side=T.shadowSide!==null?T.shadowSide:T.side:x.side=T.shadowSide!==null?T.shadowSide:h[T.side],x.alphaMap=T.alphaMap,x.alphaTest=T.alphaTest,x.map=T.map,x.clipShadows=T.clipShadows,x.clippingPlanes=T.clippingPlanes,x.clipIntersection=T.clipIntersection,x.displacementMap=T.displacementMap,x.displacementScale=T.displacementScale,x.displacementBias=T.displacementBias,x.wireframeLinewidth=T.wireframeLinewidth,x.linewidth=T.linewidth,R.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const Y=n.properties.get(x);Y.light=R}return x}function _(C,T,R,w,x){if(C.visible===!1)return;if(C.layers.test(T.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&x===Yn)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,C.matrixWorld);const N=e.update(C),H=C.material;if(Array.isArray(H)){const $=N.groups;for(let G=0,X=$.length;G<X;G++){const O=$[G],ne=H[O.materialIndex];if(ne&&ne.visible){const he=b(C,ne,w,x);C.onBeforeShadow(n,C,T,R,N,he,O),n.renderBufferDirect(R,null,N,he,C,O),C.onAfterShadow(n,C,T,R,N,he,O)}}}else if(H.visible){const $=b(C,H,w,x);C.onBeforeShadow(n,C,T,R,N,$,null),n.renderBufferDirect(R,null,N,$,C,null),C.onAfterShadow(n,C,T,R,N,$,null)}}const Y=C.children;for(let N=0,H=Y.length;N<H;N++)_(Y[N],T,R,w,x)}function P(C){C.target.removeEventListener("dispose",P);for(const R in c){const w=c[R],x=C.target.uuid;x in w&&(w[x].dispose(),delete w[x])}}}const KM={[Ka]:Qa,[el]:il,[tl]:sl,[ws]:nl,[Qa]:Ka,[il]:el,[sl]:tl,[nl]:ws};function QM(n,e){function t(){let q=!1;const Ae=new dt;let oe=null;const ue=new dt(0,0,0,0);return{setMask:function(Ee){oe!==Ee&&!q&&(n.colorMask(Ee,Ee,Ee,Ee),oe=Ee)},setLocked:function(Ee){q=Ee},setClear:function(Ee,Re,je,gt,yt){yt===!0&&(Ee*=gt,Re*=gt,je*=gt),Ae.set(Ee,Re,je,gt),ue.equals(Ae)===!1&&(n.clearColor(Ee,Re,je,gt),ue.copy(Ae))},reset:function(){q=!1,oe=null,ue.set(-1,0,0,0)}}}function i(){let q=!1,Ae=!1,oe=null,ue=null,Ee=null;return{setReversed:function(Re){if(Ae!==Re){const je=e.get("EXT_clip_control");Re?je.clipControlEXT(je.LOWER_LEFT_EXT,je.ZERO_TO_ONE_EXT):je.clipControlEXT(je.LOWER_LEFT_EXT,je.NEGATIVE_ONE_TO_ONE_EXT),Ae=Re;const gt=Ee;Ee=null,this.setClear(gt)}},getReversed:function(){return Ae},setTest:function(Re){Re?le(n.DEPTH_TEST):Ce(n.DEPTH_TEST)},setMask:function(Re){oe!==Re&&!q&&(n.depthMask(Re),oe=Re)},setFunc:function(Re){if(Ae&&(Re=KM[Re]),ue!==Re){switch(Re){case Ka:n.depthFunc(n.NEVER);break;case Qa:n.depthFunc(n.ALWAYS);break;case el:n.depthFunc(n.LESS);break;case ws:n.depthFunc(n.LEQUAL);break;case tl:n.depthFunc(n.EQUAL);break;case nl:n.depthFunc(n.GEQUAL);break;case il:n.depthFunc(n.GREATER);break;case sl:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ue=Re}},setLocked:function(Re){q=Re},setClear:function(Re){Ee!==Re&&(Ae&&(Re=1-Re),n.clearDepth(Re),Ee=Re)},reset:function(){q=!1,oe=null,ue=null,Ee=null,Ae=!1}}}function s(){let q=!1,Ae=null,oe=null,ue=null,Ee=null,Re=null,je=null,gt=null,yt=null;return{setTest:function(tt){q||(tt?le(n.STENCIL_TEST):Ce(n.STENCIL_TEST))},setMask:function(tt){Ae!==tt&&!q&&(n.stencilMask(tt),Ae=tt)},setFunc:function(tt,It,fn){(oe!==tt||ue!==It||Ee!==fn)&&(n.stencilFunc(tt,It,fn),oe=tt,ue=It,Ee=fn)},setOp:function(tt,It,fn){(Re!==tt||je!==It||gt!==fn)&&(n.stencilOp(tt,It,fn),Re=tt,je=It,gt=fn)},setLocked:function(tt){q=tt},setClear:function(tt){yt!==tt&&(n.clearStencil(tt),yt=tt)},reset:function(){q=!1,Ae=null,oe=null,ue=null,Ee=null,Re=null,je=null,gt=null,yt=null}}}const r=new t,o=new i,a=new s,l=new WeakMap,c=new WeakMap;let u={},h={},d=new WeakMap,f=[],m=null,v=!1,g=null,p=null,S=null,b=null,_=null,P=null,C=null,T=new ze(0,0,0),R=0,w=!1,x=null,D=null,Y=null,N=null,H=null;const $=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,X=0;const O=n.getParameter(n.VERSION);O.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(O)[1]),G=X>=1):O.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(O)[1]),G=X>=2);let ne=null,he={};const me=n.getParameter(n.SCISSOR_BOX),_e=n.getParameter(n.VIEWPORT),Ue=new dt().fromArray(me),te=new dt().fromArray(_e);function re(q,Ae,oe,ue){const Ee=new Uint8Array(4),Re=n.createTexture();n.bindTexture(q,Re),n.texParameteri(q,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(q,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let je=0;je<oe;je++)q===n.TEXTURE_3D||q===n.TEXTURE_2D_ARRAY?n.texImage3D(Ae,0,n.RGBA,1,1,ue,0,n.RGBA,n.UNSIGNED_BYTE,Ee):n.texImage2D(Ae+je,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Ee);return Re}const de={};de[n.TEXTURE_2D]=re(n.TEXTURE_2D,n.TEXTURE_2D,1),de[n.TEXTURE_CUBE_MAP]=re(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),de[n.TEXTURE_2D_ARRAY]=re(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),de[n.TEXTURE_3D]=re(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),le(n.DEPTH_TEST),o.setFunc(ws),F(!1),k(au),le(n.CULL_FACE),E(Rn);function le(q){u[q]!==!0&&(n.enable(q),u[q]=!0)}function Ce(q){u[q]!==!1&&(n.disable(q),u[q]=!1)}function Te(q,Ae){return h[q]!==Ae?(n.bindFramebuffer(q,Ae),h[q]=Ae,q===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=Ae),q===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=Ae),!0):!1}function De(q,Ae){let oe=f,ue=!1;if(q){oe=d.get(Ae),oe===void 0&&(oe=[],d.set(Ae,oe));const Ee=q.textures;if(oe.length!==Ee.length||oe[0]!==n.COLOR_ATTACHMENT0){for(let Re=0,je=Ee.length;Re<je;Re++)oe[Re]=n.COLOR_ATTACHMENT0+Re;oe.length=Ee.length,ue=!0}}else oe[0]!==n.BACK&&(oe[0]=n.BACK,ue=!0);ue&&n.drawBuffers(oe)}function Ge(q){return m!==q?(n.useProgram(q),m=q,!0):!1}const I={[Fi]:n.FUNC_ADD,[r0]:n.FUNC_SUBTRACT,[o0]:n.FUNC_REVERSE_SUBTRACT};I[a0]=n.MIN,I[l0]=n.MAX;const U={[c0]:n.ZERO,[u0]:n.ONE,[h0]:n.SRC_COLOR,[Za]:n.SRC_ALPHA,[v0]:n.SRC_ALPHA_SATURATE,[m0]:n.DST_COLOR,[f0]:n.DST_ALPHA,[d0]:n.ONE_MINUS_SRC_COLOR,[Ja]:n.ONE_MINUS_SRC_ALPHA,[g0]:n.ONE_MINUS_DST_COLOR,[p0]:n.ONE_MINUS_DST_ALPHA,[_0]:n.CONSTANT_COLOR,[x0]:n.ONE_MINUS_CONSTANT_COLOR,[y0]:n.CONSTANT_ALPHA,[M0]:n.ONE_MINUS_CONSTANT_ALPHA};function E(q,Ae,oe,ue,Ee,Re,je,gt,yt,tt){if(q===Rn){v===!0&&(Ce(n.BLEND),v=!1);return}if(v===!1&&(le(n.BLEND),v=!0),q!==s0){if(q!==g||tt!==w){if((p!==Fi||_!==Fi)&&(n.blendEquation(n.FUNC_ADD),p=Fi,_=Fi),tt)switch(q){case Gi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case $a:n.blendFunc(n.ONE,n.ONE);break;case lu:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case cu:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",q);break}else switch(q){case Gi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case $a:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case lu:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case cu:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",q);break}S=null,b=null,P=null,C=null,T.set(0,0,0),R=0,g=q,w=tt}return}Ee=Ee||Ae,Re=Re||oe,je=je||ue,(Ae!==p||Ee!==_)&&(n.blendEquationSeparate(I[Ae],I[Ee]),p=Ae,_=Ee),(oe!==S||ue!==b||Re!==P||je!==C)&&(n.blendFuncSeparate(U[oe],U[ue],U[Re],U[je]),S=oe,b=ue,P=Re,C=je),(gt.equals(T)===!1||yt!==R)&&(n.blendColor(gt.r,gt.g,gt.b,yt),T.copy(gt),R=yt),g=q,w=!1}function ae(q,Ae){q.side===kt?Ce(n.CULL_FACE):le(n.CULL_FACE);let oe=q.side===tn;Ae&&(oe=!oe),F(oe),q.blending===Gi&&q.transparent===!1?E(Rn):E(q.blending,q.blendEquation,q.blendSrc,q.blendDst,q.blendEquationAlpha,q.blendSrcAlpha,q.blendDstAlpha,q.blendColor,q.blendAlpha,q.premultipliedAlpha),o.setFunc(q.depthFunc),o.setTest(q.depthTest),o.setMask(q.depthWrite),r.setMask(q.colorWrite);const ue=q.stencilWrite;a.setTest(ue),ue&&(a.setMask(q.stencilWriteMask),a.setFunc(q.stencilFunc,q.stencilRef,q.stencilFuncMask),a.setOp(q.stencilFail,q.stencilZFail,q.stencilZPass)),ee(q.polygonOffset,q.polygonOffsetFactor,q.polygonOffsetUnits),q.alphaToCoverage===!0?le(n.SAMPLE_ALPHA_TO_COVERAGE):Ce(n.SAMPLE_ALPHA_TO_COVERAGE)}function F(q){x!==q&&(q?n.frontFace(n.CW):n.frontFace(n.CCW),x=q)}function k(q){q!==t0?(le(n.CULL_FACE),q!==D&&(q===au?n.cullFace(n.BACK):q===n0?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ce(n.CULL_FACE),D=q}function V(q){q!==Y&&(G&&n.lineWidth(q),Y=q)}function ee(q,Ae,oe){q?(le(n.POLYGON_OFFSET_FILL),(N!==Ae||H!==oe)&&(n.polygonOffset(Ae,oe),N=Ae,H=oe)):Ce(n.POLYGON_OFFSET_FILL)}function B(q){q?le(n.SCISSOR_TEST):Ce(n.SCISSOR_TEST)}function M(q){q===void 0&&(q=n.TEXTURE0+$-1),ne!==q&&(n.activeTexture(q),ne=q)}function y(q,Ae,oe){oe===void 0&&(ne===null?oe=n.TEXTURE0+$-1:oe=ne);let ue=he[oe];ue===void 0&&(ue={type:void 0,texture:void 0},he[oe]=ue),(ue.type!==q||ue.texture!==Ae)&&(ne!==oe&&(n.activeTexture(oe),ne=oe),n.bindTexture(q,Ae||de[q]),ue.type=q,ue.texture=Ae)}function L(){const q=he[ne];q!==void 0&&q.type!==void 0&&(n.bindTexture(q.type,null),q.type=void 0,q.texture=void 0)}function j(){try{n.compressedTexImage2D(...arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function Z(){try{n.compressedTexImage3D(...arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function Q(){try{n.texSubImage2D(...arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function xe(){try{n.texSubImage3D(...arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function ce(){try{n.compressedTexSubImage2D(...arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function Se(){try{n.compressedTexSubImage3D(...arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function ke(){try{n.texStorage2D(...arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function fe(){try{n.texStorage3D(...arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function pe(){try{n.texImage2D(...arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function be(){try{n.texImage3D(...arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function Ne(q){Ue.equals(q)===!1&&(n.scissor(q.x,q.y,q.z,q.w),Ue.copy(q))}function ge(q){te.equals(q)===!1&&(n.viewport(q.x,q.y,q.z,q.w),te.copy(q))}function Ie(q,Ae){let oe=c.get(Ae);oe===void 0&&(oe=new WeakMap,c.set(Ae,oe));let ue=oe.get(q);ue===void 0&&(ue=n.getUniformBlockIndex(Ae,q.name),oe.set(q,ue))}function Oe(q,Ae){const ue=c.get(Ae).get(q);l.get(Ae)!==ue&&(n.uniformBlockBinding(Ae,ue,q.__bindingPointIndex),l.set(Ae,ue))}function $e(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},ne=null,he={},h={},d=new WeakMap,f=[],m=null,v=!1,g=null,p=null,S=null,b=null,_=null,P=null,C=null,T=new ze(0,0,0),R=0,w=!1,x=null,D=null,Y=null,N=null,H=null,Ue.set(0,0,n.canvas.width,n.canvas.height),te.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:le,disable:Ce,bindFramebuffer:Te,drawBuffers:De,useProgram:Ge,setBlending:E,setMaterial:ae,setFlipSided:F,setCullFace:k,setLineWidth:V,setPolygonOffset:ee,setScissorTest:B,activeTexture:M,bindTexture:y,unbindTexture:L,compressedTexImage2D:j,compressedTexImage3D:Z,texImage2D:pe,texImage3D:be,updateUBOMapping:Ie,uniformBlockBinding:Oe,texStorage2D:ke,texStorage3D:fe,texSubImage2D:Q,texSubImage3D:xe,compressedTexSubImage2D:ce,compressedTexSubImage3D:Se,scissor:Ne,viewport:ge,reset:$e}}function eS(n,e,t,i,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ve,u=new WeakMap;let h;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(M,y){return f?new OffscreenCanvas(M,y):gr("canvas")}function v(M,y,L){let j=1;const Z=B(M);if((Z.width>L||Z.height>L)&&(j=L/Math.max(Z.width,Z.height)),j<1)if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&M instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&M instanceof ImageBitmap||typeof VideoFrame<"u"&&M instanceof VideoFrame){const Q=Math.floor(j*Z.width),xe=Math.floor(j*Z.height);h===void 0&&(h=m(Q,xe));const ce=y?m(Q,xe):h;return ce.width=Q,ce.height=xe,ce.getContext("2d").drawImage(M,0,0,Q,xe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+Q+"x"+xe+")."),ce}else return"data"in M&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),M;return M}function g(M){return M.generateMipmaps}function p(M){n.generateMipmap(M)}function S(M){return M.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:M.isWebGL3DRenderTarget?n.TEXTURE_3D:M.isWebGLArrayRenderTarget||M.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function b(M,y,L,j,Z=!1){if(M!==null){if(n[M]!==void 0)return n[M];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+M+"'")}let Q=y;if(y===n.RED&&(L===n.FLOAT&&(Q=n.R32F),L===n.HALF_FLOAT&&(Q=n.R16F),L===n.UNSIGNED_BYTE&&(Q=n.R8)),y===n.RED_INTEGER&&(L===n.UNSIGNED_BYTE&&(Q=n.R8UI),L===n.UNSIGNED_SHORT&&(Q=n.R16UI),L===n.UNSIGNED_INT&&(Q=n.R32UI),L===n.BYTE&&(Q=n.R8I),L===n.SHORT&&(Q=n.R16I),L===n.INT&&(Q=n.R32I)),y===n.RG&&(L===n.FLOAT&&(Q=n.RG32F),L===n.HALF_FLOAT&&(Q=n.RG16F),L===n.UNSIGNED_BYTE&&(Q=n.RG8)),y===n.RG_INTEGER&&(L===n.UNSIGNED_BYTE&&(Q=n.RG8UI),L===n.UNSIGNED_SHORT&&(Q=n.RG16UI),L===n.UNSIGNED_INT&&(Q=n.RG32UI),L===n.BYTE&&(Q=n.RG8I),L===n.SHORT&&(Q=n.RG16I),L===n.INT&&(Q=n.RG32I)),y===n.RGB_INTEGER&&(L===n.UNSIGNED_BYTE&&(Q=n.RGB8UI),L===n.UNSIGNED_SHORT&&(Q=n.RGB16UI),L===n.UNSIGNED_INT&&(Q=n.RGB32UI),L===n.BYTE&&(Q=n.RGB8I),L===n.SHORT&&(Q=n.RGB16I),L===n.INT&&(Q=n.RGB32I)),y===n.RGBA_INTEGER&&(L===n.UNSIGNED_BYTE&&(Q=n.RGBA8UI),L===n.UNSIGNED_SHORT&&(Q=n.RGBA16UI),L===n.UNSIGNED_INT&&(Q=n.RGBA32UI),L===n.BYTE&&(Q=n.RGBA8I),L===n.SHORT&&(Q=n.RGBA16I),L===n.INT&&(Q=n.RGBA32I)),y===n.RGB&&L===n.UNSIGNED_INT_5_9_9_9_REV&&(Q=n.RGB9_E5),y===n.RGBA){const xe=Z?bo:rt.getTransfer(j);L===n.FLOAT&&(Q=n.RGBA32F),L===n.HALF_FLOAT&&(Q=n.RGBA16F),L===n.UNSIGNED_BYTE&&(Q=xe===ut?n.SRGB8_ALPHA8:n.RGBA8),L===n.UNSIGNED_SHORT_4_4_4_4&&(Q=n.RGBA4),L===n.UNSIGNED_SHORT_5_5_5_1&&(Q=n.RGB5_A1)}return(Q===n.R16F||Q===n.R32F||Q===n.RG16F||Q===n.RG32F||Q===n.RGBA16F||Q===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function _(M,y){let L;return M?y===null||y===Wi||y===dr?L=n.DEPTH24_STENCIL8:y===Qn?L=n.DEPTH32F_STENCIL8:y===hr&&(L=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===Wi||y===dr?L=n.DEPTH_COMPONENT24:y===Qn?L=n.DEPTH_COMPONENT32F:y===hr&&(L=n.DEPTH_COMPONENT16),L}function P(M,y){return g(M)===!0||M.isFramebufferTexture&&M.minFilter!==Pn&&M.minFilter!==en?Math.log2(Math.max(y.width,y.height))+1:M.mipmaps!==void 0&&M.mipmaps.length>0?M.mipmaps.length:M.isCompressedTexture&&Array.isArray(M.image)?y.mipmaps.length:1}function C(M){const y=M.target;y.removeEventListener("dispose",C),R(y),y.isVideoTexture&&u.delete(y)}function T(M){const y=M.target;y.removeEventListener("dispose",T),x(y)}function R(M){const y=i.get(M);if(y.__webglInit===void 0)return;const L=M.source,j=d.get(L);if(j){const Z=j[y.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&w(M),Object.keys(j).length===0&&d.delete(L)}i.remove(M)}function w(M){const y=i.get(M);n.deleteTexture(y.__webglTexture);const L=M.source,j=d.get(L);delete j[y.__cacheKey],o.memory.textures--}function x(M){const y=i.get(M);if(M.depthTexture&&(M.depthTexture.dispose(),i.remove(M.depthTexture)),M.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(y.__webglFramebuffer[j]))for(let Z=0;Z<y.__webglFramebuffer[j].length;Z++)n.deleteFramebuffer(y.__webglFramebuffer[j][Z]);else n.deleteFramebuffer(y.__webglFramebuffer[j]);y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer[j])}else{if(Array.isArray(y.__webglFramebuffer))for(let j=0;j<y.__webglFramebuffer.length;j++)n.deleteFramebuffer(y.__webglFramebuffer[j]);else n.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&n.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let j=0;j<y.__webglColorRenderbuffer.length;j++)y.__webglColorRenderbuffer[j]&&n.deleteRenderbuffer(y.__webglColorRenderbuffer[j]);y.__webglDepthRenderbuffer&&n.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const L=M.textures;for(let j=0,Z=L.length;j<Z;j++){const Q=i.get(L[j]);Q.__webglTexture&&(n.deleteTexture(Q.__webglTexture),o.memory.textures--),i.remove(L[j])}i.remove(M)}let D=0;function Y(){D=0}function N(){const M=D;return M>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+M+" texture units while this GPU supports only "+s.maxTextures),D+=1,M}function H(M){const y=[];return y.push(M.wrapS),y.push(M.wrapT),y.push(M.wrapR||0),y.push(M.magFilter),y.push(M.minFilter),y.push(M.anisotropy),y.push(M.internalFormat),y.push(M.format),y.push(M.type),y.push(M.generateMipmaps),y.push(M.premultiplyAlpha),y.push(M.flipY),y.push(M.unpackAlignment),y.push(M.colorSpace),y.join()}function $(M,y){const L=i.get(M);if(M.isVideoTexture&&V(M),M.isRenderTargetTexture===!1&&M.version>0&&L.__version!==M.version){const j=M.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{te(L,M,y);return}}t.bindTexture(n.TEXTURE_2D,L.__webglTexture,n.TEXTURE0+y)}function G(M,y){const L=i.get(M);if(M.version>0&&L.__version!==M.version){te(L,M,y);return}t.bindTexture(n.TEXTURE_2D_ARRAY,L.__webglTexture,n.TEXTURE0+y)}function X(M,y){const L=i.get(M);if(M.version>0&&L.__version!==M.version){te(L,M,y);return}t.bindTexture(n.TEXTURE_3D,L.__webglTexture,n.TEXTURE0+y)}function O(M,y){const L=i.get(M);if(M.version>0&&L.__version!==M.version){re(L,M,y);return}t.bindTexture(n.TEXTURE_CUBE_MAP,L.__webglTexture,n.TEXTURE0+y)}const ne={[an]:n.REPEAT,[zi]:n.CLAMP_TO_EDGE,[al]:n.MIRRORED_REPEAT},he={[Pn]:n.NEAREST,[P0]:n.NEAREST_MIPMAP_NEAREST,[Ir]:n.NEAREST_MIPMAP_LINEAR,[en]:n.LINEAR,[ia]:n.LINEAR_MIPMAP_NEAREST,[ki]:n.LINEAR_MIPMAP_LINEAR},me={[I0]:n.NEVER,[z0]:n.ALWAYS,[U0]:n.LESS,[Od]:n.LEQUAL,[N0]:n.EQUAL,[B0]:n.GEQUAL,[O0]:n.GREATER,[F0]:n.NOTEQUAL};function _e(M,y){if(y.type===Qn&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===en||y.magFilter===ia||y.magFilter===Ir||y.magFilter===ki||y.minFilter===en||y.minFilter===ia||y.minFilter===Ir||y.minFilter===ki)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(M,n.TEXTURE_WRAP_S,ne[y.wrapS]),n.texParameteri(M,n.TEXTURE_WRAP_T,ne[y.wrapT]),(M===n.TEXTURE_3D||M===n.TEXTURE_2D_ARRAY)&&n.texParameteri(M,n.TEXTURE_WRAP_R,ne[y.wrapR]),n.texParameteri(M,n.TEXTURE_MAG_FILTER,he[y.magFilter]),n.texParameteri(M,n.TEXTURE_MIN_FILTER,he[y.minFilter]),y.compareFunction&&(n.texParameteri(M,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(M,n.TEXTURE_COMPARE_FUNC,me[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Pn||y.minFilter!==Ir&&y.minFilter!==ki||y.type===Qn&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||i.get(y).__currentAnisotropy){const L=e.get("EXT_texture_filter_anisotropic");n.texParameterf(M,L.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy}}}function Ue(M,y){let L=!1;M.__webglInit===void 0&&(M.__webglInit=!0,y.addEventListener("dispose",C));const j=y.source;let Z=d.get(j);Z===void 0&&(Z={},d.set(j,Z));const Q=H(y);if(Q!==M.__cacheKey){Z[Q]===void 0&&(Z[Q]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,L=!0),Z[Q].usedTimes++;const xe=Z[M.__cacheKey];xe!==void 0&&(Z[M.__cacheKey].usedTimes--,xe.usedTimes===0&&w(y)),M.__cacheKey=Q,M.__webglTexture=Z[Q].texture}return L}function te(M,y,L){let j=n.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(j=n.TEXTURE_2D_ARRAY),y.isData3DTexture&&(j=n.TEXTURE_3D);const Z=Ue(M,y),Q=y.source;t.bindTexture(j,M.__webglTexture,n.TEXTURE0+L);const xe=i.get(Q);if(Q.version!==xe.__version||Z===!0){t.activeTexture(n.TEXTURE0+L);const ce=rt.getPrimaries(rt.workingColorSpace),Se=y.colorSpace===mi?null:rt.getPrimaries(y.colorSpace),ke=y.colorSpace===mi||ce===Se?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ke);let fe=v(y.image,!1,s.maxTextureSize);fe=ee(y,fe);const pe=r.convert(y.format,y.colorSpace),be=r.convert(y.type);let Ne=b(y.internalFormat,pe,be,y.colorSpace,y.isVideoTexture);_e(j,y);let ge;const Ie=y.mipmaps,Oe=y.isVideoTexture!==!0,$e=xe.__version===void 0||Z===!0,q=Q.dataReady,Ae=P(y,fe);if(y.isDepthTexture)Ne=_(y.format===pr,y.type),$e&&(Oe?t.texStorage2D(n.TEXTURE_2D,1,Ne,fe.width,fe.height):t.texImage2D(n.TEXTURE_2D,0,Ne,fe.width,fe.height,0,pe,be,null));else if(y.isDataTexture)if(Ie.length>0){Oe&&$e&&t.texStorage2D(n.TEXTURE_2D,Ae,Ne,Ie[0].width,Ie[0].height);for(let oe=0,ue=Ie.length;oe<ue;oe++)ge=Ie[oe],Oe?q&&t.texSubImage2D(n.TEXTURE_2D,oe,0,0,ge.width,ge.height,pe,be,ge.data):t.texImage2D(n.TEXTURE_2D,oe,Ne,ge.width,ge.height,0,pe,be,ge.data);y.generateMipmaps=!1}else Oe?($e&&t.texStorage2D(n.TEXTURE_2D,Ae,Ne,fe.width,fe.height),q&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,fe.width,fe.height,pe,be,fe.data)):t.texImage2D(n.TEXTURE_2D,0,Ne,fe.width,fe.height,0,pe,be,fe.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Oe&&$e&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ae,Ne,Ie[0].width,Ie[0].height,fe.depth);for(let oe=0,ue=Ie.length;oe<ue;oe++)if(ge=Ie[oe],y.format!==xn)if(pe!==null)if(Oe){if(q)if(y.layerUpdates.size>0){const Ee=Xu(ge.width,ge.height,y.format,y.type);for(const Re of y.layerUpdates){const je=ge.data.subarray(Re*Ee/ge.data.BYTES_PER_ELEMENT,(Re+1)*Ee/ge.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,oe,0,0,Re,ge.width,ge.height,1,pe,je)}y.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,oe,0,0,0,ge.width,ge.height,fe.depth,pe,ge.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,oe,Ne,ge.width,ge.height,fe.depth,0,ge.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Oe?q&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,oe,0,0,0,ge.width,ge.height,fe.depth,pe,be,ge.data):t.texImage3D(n.TEXTURE_2D_ARRAY,oe,Ne,ge.width,ge.height,fe.depth,0,pe,be,ge.data)}else{Oe&&$e&&t.texStorage2D(n.TEXTURE_2D,Ae,Ne,Ie[0].width,Ie[0].height);for(let oe=0,ue=Ie.length;oe<ue;oe++)ge=Ie[oe],y.format!==xn?pe!==null?Oe?q&&t.compressedTexSubImage2D(n.TEXTURE_2D,oe,0,0,ge.width,ge.height,pe,ge.data):t.compressedTexImage2D(n.TEXTURE_2D,oe,Ne,ge.width,ge.height,0,ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Oe?q&&t.texSubImage2D(n.TEXTURE_2D,oe,0,0,ge.width,ge.height,pe,be,ge.data):t.texImage2D(n.TEXTURE_2D,oe,Ne,ge.width,ge.height,0,pe,be,ge.data)}else if(y.isDataArrayTexture)if(Oe){if($e&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ae,Ne,fe.width,fe.height,fe.depth),q)if(y.layerUpdates.size>0){const oe=Xu(fe.width,fe.height,y.format,y.type);for(const ue of y.layerUpdates){const Ee=fe.data.subarray(ue*oe/fe.data.BYTES_PER_ELEMENT,(ue+1)*oe/fe.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ue,fe.width,fe.height,1,pe,be,Ee)}y.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,fe.width,fe.height,fe.depth,pe,be,fe.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ne,fe.width,fe.height,fe.depth,0,pe,be,fe.data);else if(y.isData3DTexture)Oe?($e&&t.texStorage3D(n.TEXTURE_3D,Ae,Ne,fe.width,fe.height,fe.depth),q&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,fe.width,fe.height,fe.depth,pe,be,fe.data)):t.texImage3D(n.TEXTURE_3D,0,Ne,fe.width,fe.height,fe.depth,0,pe,be,fe.data);else if(y.isFramebufferTexture){if($e)if(Oe)t.texStorage2D(n.TEXTURE_2D,Ae,Ne,fe.width,fe.height);else{let oe=fe.width,ue=fe.height;for(let Ee=0;Ee<Ae;Ee++)t.texImage2D(n.TEXTURE_2D,Ee,Ne,oe,ue,0,pe,be,null),oe>>=1,ue>>=1}}else if(Ie.length>0){if(Oe&&$e){const oe=B(Ie[0]);t.texStorage2D(n.TEXTURE_2D,Ae,Ne,oe.width,oe.height)}for(let oe=0,ue=Ie.length;oe<ue;oe++)ge=Ie[oe],Oe?q&&t.texSubImage2D(n.TEXTURE_2D,oe,0,0,pe,be,ge):t.texImage2D(n.TEXTURE_2D,oe,Ne,pe,be,ge);y.generateMipmaps=!1}else if(Oe){if($e){const oe=B(fe);t.texStorage2D(n.TEXTURE_2D,Ae,Ne,oe.width,oe.height)}q&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,pe,be,fe)}else t.texImage2D(n.TEXTURE_2D,0,Ne,pe,be,fe);g(y)&&p(j),xe.__version=Q.version,y.onUpdate&&y.onUpdate(y)}M.__version=y.version}function re(M,y,L){if(y.image.length!==6)return;const j=Ue(M,y),Z=y.source;t.bindTexture(n.TEXTURE_CUBE_MAP,M.__webglTexture,n.TEXTURE0+L);const Q=i.get(Z);if(Z.version!==Q.__version||j===!0){t.activeTexture(n.TEXTURE0+L);const xe=rt.getPrimaries(rt.workingColorSpace),ce=y.colorSpace===mi?null:rt.getPrimaries(y.colorSpace),Se=y.colorSpace===mi||xe===ce?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se);const ke=y.isCompressedTexture||y.image[0].isCompressedTexture,fe=y.image[0]&&y.image[0].isDataTexture,pe=[];for(let ue=0;ue<6;ue++)!ke&&!fe?pe[ue]=v(y.image[ue],!0,s.maxCubemapSize):pe[ue]=fe?y.image[ue].image:y.image[ue],pe[ue]=ee(y,pe[ue]);const be=pe[0],Ne=r.convert(y.format,y.colorSpace),ge=r.convert(y.type),Ie=b(y.internalFormat,Ne,ge,y.colorSpace),Oe=y.isVideoTexture!==!0,$e=Q.__version===void 0||j===!0,q=Z.dataReady;let Ae=P(y,be);_e(n.TEXTURE_CUBE_MAP,y);let oe;if(ke){Oe&&$e&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ae,Ie,be.width,be.height);for(let ue=0;ue<6;ue++){oe=pe[ue].mipmaps;for(let Ee=0;Ee<oe.length;Ee++){const Re=oe[Ee];y.format!==xn?Ne!==null?Oe?q&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ee,0,0,Re.width,Re.height,Ne,Re.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ee,Ie,Re.width,Re.height,0,Re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Oe?q&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ee,0,0,Re.width,Re.height,Ne,ge,Re.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ee,Ie,Re.width,Re.height,0,Ne,ge,Re.data)}}}else{if(oe=y.mipmaps,Oe&&$e){oe.length>0&&Ae++;const ue=B(pe[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ae,Ie,ue.width,ue.height)}for(let ue=0;ue<6;ue++)if(fe){Oe?q&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,0,0,pe[ue].width,pe[ue].height,Ne,ge,pe[ue].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,Ie,pe[ue].width,pe[ue].height,0,Ne,ge,pe[ue].data);for(let Ee=0;Ee<oe.length;Ee++){const je=oe[Ee].image[ue].image;Oe?q&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ee+1,0,0,je.width,je.height,Ne,ge,je.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ee+1,Ie,je.width,je.height,0,Ne,ge,je.data)}}else{Oe?q&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,0,0,Ne,ge,pe[ue]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,Ie,Ne,ge,pe[ue]);for(let Ee=0;Ee<oe.length;Ee++){const Re=oe[Ee];Oe?q&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ee+1,0,0,Ne,ge,Re.image[ue]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ee+1,Ie,Ne,ge,Re.image[ue])}}}g(y)&&p(n.TEXTURE_CUBE_MAP),Q.__version=Z.version,y.onUpdate&&y.onUpdate(y)}M.__version=y.version}function de(M,y,L,j,Z,Q){const xe=r.convert(L.format,L.colorSpace),ce=r.convert(L.type),Se=b(L.internalFormat,xe,ce,L.colorSpace),ke=i.get(y),fe=i.get(L);if(fe.__renderTarget=y,!ke.__hasExternalTextures){const pe=Math.max(1,y.width>>Q),be=Math.max(1,y.height>>Q);Z===n.TEXTURE_3D||Z===n.TEXTURE_2D_ARRAY?t.texImage3D(Z,Q,Se,pe,be,y.depth,0,xe,ce,null):t.texImage2D(Z,Q,Se,pe,be,0,xe,ce,null)}t.bindFramebuffer(n.FRAMEBUFFER,M),k(y)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,j,Z,fe.__webglTexture,0,F(y)):(Z===n.TEXTURE_2D||Z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,j,Z,fe.__webglTexture,Q),t.bindFramebuffer(n.FRAMEBUFFER,null)}function le(M,y,L){if(n.bindRenderbuffer(n.RENDERBUFFER,M),y.depthBuffer){const j=y.depthTexture,Z=j&&j.isDepthTexture?j.type:null,Q=_(y.stencilBuffer,Z),xe=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ce=F(y);k(y)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ce,Q,y.width,y.height):L?n.renderbufferStorageMultisample(n.RENDERBUFFER,ce,Q,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,Q,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,xe,n.RENDERBUFFER,M)}else{const j=y.textures;for(let Z=0;Z<j.length;Z++){const Q=j[Z],xe=r.convert(Q.format,Q.colorSpace),ce=r.convert(Q.type),Se=b(Q.internalFormat,xe,ce,Q.colorSpace),ke=F(y);L&&k(y)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,ke,Se,y.width,y.height):k(y)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ke,Se,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,Se,y.width,y.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ce(M,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,M),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=i.get(y.depthTexture);j.__renderTarget=y,(!j.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),$(y.depthTexture,0);const Z=j.__webglTexture,Q=F(y);if(y.depthTexture.format===fr)k(y)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Z,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Z,0);else if(y.depthTexture.format===pr)k(y)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Z,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function Te(M){const y=i.get(M),L=M.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==M.depthTexture){const j=M.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),j){const Z=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,j.removeEventListener("dispose",Z)};j.addEventListener("dispose",Z),y.__depthDisposeCallback=Z}y.__boundDepthTexture=j}if(M.depthTexture&&!y.__autoAllocateDepthBuffer){if(L)throw new Error("target.depthTexture not supported in Cube render targets");Ce(y.__webglFramebuffer,M)}else if(L){y.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[j]),y.__webglDepthbuffer[j]===void 0)y.__webglDepthbuffer[j]=n.createRenderbuffer(),le(y.__webglDepthbuffer[j],M,!1);else{const Z=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Q=y.__webglDepthbuffer[j];n.bindRenderbuffer(n.RENDERBUFFER,Q),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,Q)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=n.createRenderbuffer(),le(y.__webglDepthbuffer,M,!1);else{const j=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Z=y.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,Z),n.framebufferRenderbuffer(n.FRAMEBUFFER,j,n.RENDERBUFFER,Z)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function De(M,y,L){const j=i.get(M);y!==void 0&&de(j.__webglFramebuffer,M,M.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),L!==void 0&&Te(M)}function Ge(M){const y=M.texture,L=i.get(M),j=i.get(y);M.addEventListener("dispose",T);const Z=M.textures,Q=M.isWebGLCubeRenderTarget===!0,xe=Z.length>1;if(xe||(j.__webglTexture===void 0&&(j.__webglTexture=n.createTexture()),j.__version=y.version,o.memory.textures++),Q){L.__webglFramebuffer=[];for(let ce=0;ce<6;ce++)if(y.mipmaps&&y.mipmaps.length>0){L.__webglFramebuffer[ce]=[];for(let Se=0;Se<y.mipmaps.length;Se++)L.__webglFramebuffer[ce][Se]=n.createFramebuffer()}else L.__webglFramebuffer[ce]=n.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){L.__webglFramebuffer=[];for(let ce=0;ce<y.mipmaps.length;ce++)L.__webglFramebuffer[ce]=n.createFramebuffer()}else L.__webglFramebuffer=n.createFramebuffer();if(xe)for(let ce=0,Se=Z.length;ce<Se;ce++){const ke=i.get(Z[ce]);ke.__webglTexture===void 0&&(ke.__webglTexture=n.createTexture(),o.memory.textures++)}if(M.samples>0&&k(M)===!1){L.__webglMultisampledFramebuffer=n.createFramebuffer(),L.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,L.__webglMultisampledFramebuffer);for(let ce=0;ce<Z.length;ce++){const Se=Z[ce];L.__webglColorRenderbuffer[ce]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,L.__webglColorRenderbuffer[ce]);const ke=r.convert(Se.format,Se.colorSpace),fe=r.convert(Se.type),pe=b(Se.internalFormat,ke,fe,Se.colorSpace,M.isXRRenderTarget===!0),be=F(M);n.renderbufferStorageMultisample(n.RENDERBUFFER,be,pe,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ce,n.RENDERBUFFER,L.__webglColorRenderbuffer[ce])}n.bindRenderbuffer(n.RENDERBUFFER,null),M.depthBuffer&&(L.__webglDepthRenderbuffer=n.createRenderbuffer(),le(L.__webglDepthRenderbuffer,M,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Q){t.bindTexture(n.TEXTURE_CUBE_MAP,j.__webglTexture),_e(n.TEXTURE_CUBE_MAP,y);for(let ce=0;ce<6;ce++)if(y.mipmaps&&y.mipmaps.length>0)for(let Se=0;Se<y.mipmaps.length;Se++)de(L.__webglFramebuffer[ce][Se],M,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Se);else de(L.__webglFramebuffer[ce],M,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0);g(y)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(xe){for(let ce=0,Se=Z.length;ce<Se;ce++){const ke=Z[ce],fe=i.get(ke);t.bindTexture(n.TEXTURE_2D,fe.__webglTexture),_e(n.TEXTURE_2D,ke),de(L.__webglFramebuffer,M,ke,n.COLOR_ATTACHMENT0+ce,n.TEXTURE_2D,0),g(ke)&&p(n.TEXTURE_2D)}t.unbindTexture()}else{let ce=n.TEXTURE_2D;if((M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(ce=M.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ce,j.__webglTexture),_e(ce,y),y.mipmaps&&y.mipmaps.length>0)for(let Se=0;Se<y.mipmaps.length;Se++)de(L.__webglFramebuffer[Se],M,y,n.COLOR_ATTACHMENT0,ce,Se);else de(L.__webglFramebuffer,M,y,n.COLOR_ATTACHMENT0,ce,0);g(y)&&p(ce),t.unbindTexture()}M.depthBuffer&&Te(M)}function I(M){const y=M.textures;for(let L=0,j=y.length;L<j;L++){const Z=y[L];if(g(Z)){const Q=S(M),xe=i.get(Z).__webglTexture;t.bindTexture(Q,xe),p(Q),t.unbindTexture()}}}const U=[],E=[];function ae(M){if(M.samples>0){if(k(M)===!1){const y=M.textures,L=M.width,j=M.height;let Z=n.COLOR_BUFFER_BIT;const Q=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,xe=i.get(M),ce=y.length>1;if(ce)for(let Se=0;Se<y.length;Se++)t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Se,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Se,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,xe.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,xe.__webglFramebuffer);for(let Se=0;Se<y.length;Se++){if(M.resolveDepthBuffer&&(M.depthBuffer&&(Z|=n.DEPTH_BUFFER_BIT),M.stencilBuffer&&M.resolveStencilBuffer&&(Z|=n.STENCIL_BUFFER_BIT)),ce){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,xe.__webglColorRenderbuffer[Se]);const ke=i.get(y[Se]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ke,0)}n.blitFramebuffer(0,0,L,j,0,0,L,j,Z,n.NEAREST),l===!0&&(U.length=0,E.length=0,U.push(n.COLOR_ATTACHMENT0+Se),M.depthBuffer&&M.resolveDepthBuffer===!1&&(U.push(Q),E.push(Q),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,E)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,U))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ce)for(let Se=0;Se<y.length;Se++){t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Se,n.RENDERBUFFER,xe.__webglColorRenderbuffer[Se]);const ke=i.get(y[Se]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Se,n.TEXTURE_2D,ke,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,xe.__webglMultisampledFramebuffer)}else if(M.depthBuffer&&M.resolveDepthBuffer===!1&&l){const y=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[y])}}}function F(M){return Math.min(s.maxSamples,M.samples)}function k(M){const y=i.get(M);return M.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function V(M){const y=o.render.frame;u.get(M)!==y&&(u.set(M,y),M.update())}function ee(M,y){const L=M.colorSpace,j=M.format,Z=M.type;return M.isCompressedTexture===!0||M.isVideoTexture===!0||L!==As&&L!==mi&&(rt.getTransfer(L)===ut?(j!==xn||Z!==ni)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",L)),y}function B(M){return typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement?(c.width=M.naturalWidth||M.width,c.height=M.naturalHeight||M.height):typeof VideoFrame<"u"&&M instanceof VideoFrame?(c.width=M.displayWidth,c.height=M.displayHeight):(c.width=M.width,c.height=M.height),c}this.allocateTextureUnit=N,this.resetTextureUnits=Y,this.setTexture2D=$,this.setTexture2DArray=G,this.setTexture3D=X,this.setTextureCube=O,this.rebindTextures=De,this.setupRenderTarget=Ge,this.updateRenderTargetMipmap=I,this.updateMultisampleRenderTarget=ae,this.setupDepthRenderbuffer=Te,this.setupFrameBufferTexture=de,this.useMultisampledRTT=k}function tS(n,e){function t(i,s=mi){let r;const o=rt.getTransfer(s);if(i===ni)return n.UNSIGNED_BYTE;if(i===dc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===fc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Ad)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Ed)return n.BYTE;if(i===Td)return n.SHORT;if(i===hr)return n.UNSIGNED_SHORT;if(i===hc)return n.INT;if(i===Wi)return n.UNSIGNED_INT;if(i===Qn)return n.FLOAT;if(i===cn)return n.HALF_FLOAT;if(i===Cd)return n.ALPHA;if(i===Rd)return n.RGB;if(i===xn)return n.RGBA;if(i===Pd)return n.LUMINANCE;if(i===Dd)return n.LUMINANCE_ALPHA;if(i===fr)return n.DEPTH_COMPONENT;if(i===pr)return n.DEPTH_STENCIL;if(i===Ld)return n.RED;if(i===pc)return n.RED_INTEGER;if(i===Id)return n.RG;if(i===mc)return n.RG_INTEGER;if(i===gc)return n.RGBA_INTEGER;if(i===co||i===uo||i===ho||i===fo)if(o===ut)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===co)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===uo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ho)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===fo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===co)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===uo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ho)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===fo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ll||i===cl||i===ul||i===hl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===ll)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===cl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ul)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===hl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===dl||i===fl||i===pl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===dl||i===fl)return o===ut?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===pl)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===ml||i===gl||i===vl||i===_l||i===xl||i===yl||i===Ml||i===Sl||i===bl||i===wl||i===El||i===Tl||i===Al||i===Cl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===ml)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===gl)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===vl)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===_l)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===xl)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===yl)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ml)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Sl)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===bl)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===wl)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===El)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Tl)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Al)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Cl)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===po||i===Rl||i===Pl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===po)return o===ut?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Rl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Pl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Ud||i===Dl||i===Ll||i===Il)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===po)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Dl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ll)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Il)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===dr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const nS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,iS=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class sS{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const s=new Gt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!==i.depthNear||t.depthFar!==i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Zt({vertexShader:nS,fragmentShader:iS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new W(new hn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class rS extends Yi{constructor(e,t){super();const i=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,d=null,f=null,m=null;const v=new sS,g=t.getContextAttributes();let p=null,S=null;const b=[],_=[],P=new ve;let C=null;const T=new un;T.viewport=new dt;const R=new un;R.viewport=new dt;const w=[T,R],x=new bv;let D=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(te){let re=b[te];return re===void 0&&(re=new ba,b[te]=re),re.getTargetRaySpace()},this.getControllerGrip=function(te){let re=b[te];return re===void 0&&(re=new ba,b[te]=re),re.getGripSpace()},this.getHand=function(te){let re=b[te];return re===void 0&&(re=new ba,b[te]=re),re.getHandSpace()};function N(te){const re=_.indexOf(te.inputSource);if(re===-1)return;const de=b[re];de!==void 0&&(de.update(te.inputSource,te.frame,c||o),de.dispatchEvent({type:te.type,data:te.inputSource}))}function H(){s.removeEventListener("select",N),s.removeEventListener("selectstart",N),s.removeEventListener("selectend",N),s.removeEventListener("squeeze",N),s.removeEventListener("squeezestart",N),s.removeEventListener("squeezeend",N),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",$);for(let te=0;te<b.length;te++){const re=_[te];re!==null&&(_[te]=null,b[te].disconnect(re))}D=null,Y=null,v.reset(),e.setRenderTarget(p),f=null,d=null,h=null,s=null,S=null,Ue.stop(),i.isPresenting=!1,e.setPixelRatio(C),e.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(te){r=te,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(te){a=te,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(te){c=te},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(te){if(s=te,s!==null){if(p=e.getRenderTarget(),s.addEventListener("select",N),s.addEventListener("selectstart",N),s.addEventListener("selectend",N),s.addEventListener("squeeze",N),s.addEventListener("squeezestart",N),s.addEventListener("squeezeend",N),s.addEventListener("end",H),s.addEventListener("inputsourceschange",$),g.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(P),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let de=null,le=null,Ce=null;g.depth&&(Ce=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,de=g.stencil?pr:fr,le=g.stencil?dr:Wi);const Te={colorFormat:t.RGBA8,depthFormat:Ce,scaleFactor:r};h=new XRWebGLBinding(s,t),d=h.createProjectionLayer(Te),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),S=new Ft(d.textureWidth,d.textureHeight,{format:xn,type:ni,depthTexture:new jd(d.textureWidth,d.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,de),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const de={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,de),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new Ft(f.framebufferWidth,f.framebufferHeight,{format:xn,type:ni,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Ue.setContext(s),Ue.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function $(te){for(let re=0;re<te.removed.length;re++){const de=te.removed[re],le=_.indexOf(de);le>=0&&(_[le]=null,b[le].disconnect(de))}for(let re=0;re<te.added.length;re++){const de=te.added[re];let le=_.indexOf(de);if(le===-1){for(let Te=0;Te<b.length;Te++)if(Te>=_.length){_.push(de),le=Te;break}else if(_[Te]===null){_[Te]=de,le=Te;break}if(le===-1)break}const Ce=b[le];Ce&&Ce.connect(de)}}const G=new z,X=new z;function O(te,re,de){G.setFromMatrixPosition(re.matrixWorld),X.setFromMatrixPosition(de.matrixWorld);const le=G.distanceTo(X),Ce=re.projectionMatrix.elements,Te=de.projectionMatrix.elements,De=Ce[14]/(Ce[10]-1),Ge=Ce[14]/(Ce[10]+1),I=(Ce[9]+1)/Ce[5],U=(Ce[9]-1)/Ce[5],E=(Ce[8]-1)/Ce[0],ae=(Te[8]+1)/Te[0],F=De*E,k=De*ae,V=le/(-E+ae),ee=V*-E;if(re.matrixWorld.decompose(te.position,te.quaternion,te.scale),te.translateX(ee),te.translateZ(V),te.matrixWorld.compose(te.position,te.quaternion,te.scale),te.matrixWorldInverse.copy(te.matrixWorld).invert(),Ce[10]===-1)te.projectionMatrix.copy(re.projectionMatrix),te.projectionMatrixInverse.copy(re.projectionMatrixInverse);else{const B=De+V,M=Ge+V,y=F-ee,L=k+(le-ee),j=I*Ge/M*B,Z=U*Ge/M*B;te.projectionMatrix.makePerspective(y,L,j,Z,B,M),te.projectionMatrixInverse.copy(te.projectionMatrix).invert()}}function ne(te,re){re===null?te.matrixWorld.copy(te.matrix):te.matrixWorld.multiplyMatrices(re.matrixWorld,te.matrix),te.matrixWorldInverse.copy(te.matrixWorld).invert()}this.updateCamera=function(te){if(s===null)return;let re=te.near,de=te.far;v.texture!==null&&(v.depthNear>0&&(re=v.depthNear),v.depthFar>0&&(de=v.depthFar)),x.near=R.near=T.near=re,x.far=R.far=T.far=de,(D!==x.near||Y!==x.far)&&(s.updateRenderState({depthNear:x.near,depthFar:x.far}),D=x.near,Y=x.far),T.layers.mask=te.layers.mask|2,R.layers.mask=te.layers.mask|4,x.layers.mask=T.layers.mask|R.layers.mask;const le=te.parent,Ce=x.cameras;ne(x,le);for(let Te=0;Te<Ce.length;Te++)ne(Ce[Te],le);Ce.length===2?O(x,T,R):x.projectionMatrix.copy(T.projectionMatrix),he(te,x,le)};function he(te,re,de){de===null?te.matrix.copy(re.matrixWorld):(te.matrix.copy(de.matrixWorld),te.matrix.invert(),te.matrix.multiply(re.matrixWorld)),te.matrix.decompose(te.position,te.quaternion,te.scale),te.updateMatrixWorld(!0),te.projectionMatrix.copy(re.projectionMatrix),te.projectionMatrixInverse.copy(re.projectionMatrixInverse),te.isPerspectiveCamera&&(te.fov=mr*2*Math.atan(1/te.projectionMatrix.elements[5]),te.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(te){l=te,d!==null&&(d.fixedFoveation=te),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=te)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(x)};let me=null;function _e(te,re){if(u=re.getViewerPose(c||o),m=re,u!==null){const de=u.views;f!==null&&(e.setRenderTargetFramebuffer(S,f.framebuffer),e.setRenderTarget(S));let le=!1;de.length!==x.cameras.length&&(x.cameras.length=0,le=!0);for(let De=0;De<de.length;De++){const Ge=de[De];let I=null;if(f!==null)I=f.getViewport(Ge);else{const E=h.getViewSubImage(d,Ge);I=E.viewport,De===0&&(e.setRenderTargetTextures(S,E.colorTexture,E.depthStencilTexture),e.setRenderTarget(S))}let U=w[De];U===void 0&&(U=new un,U.layers.enable(De),U.viewport=new dt,w[De]=U),U.matrix.fromArray(Ge.transform.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale),U.projectionMatrix.fromArray(Ge.projectionMatrix),U.projectionMatrixInverse.copy(U.projectionMatrix).invert(),U.viewport.set(I.x,I.y,I.width,I.height),De===0&&(x.matrix.copy(U.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),le===!0&&x.cameras.push(U)}const Ce=s.enabledFeatures;if(Ce&&Ce.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&h){const De=h.getDepthInformation(de[0]);De&&De.isValid&&De.texture&&v.init(e,De,s.renderState)}}for(let de=0;de<b.length;de++){const le=_[de],Ce=b[de];le!==null&&Ce!==void 0&&Ce.update(le,re,c||o)}me&&me(te,re),re.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:re}),m=null}const Ue=new rf;Ue.setAnimationLoop(_e),this.setAnimationLoop=function(te){me=te},this.dispose=function(){}}}const Ui=new Dn,oS=new ft;function aS(n,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function i(g,p){p.color.getRGB(g.fogColor.value,Gd(n)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,S,b,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),h(g,p)):p.isMeshPhongMaterial?(r(g,p),u(g,p)):p.isMeshStandardMaterial?(r(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,_)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),v(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?l(g,p,S,b):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===tn&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===tn&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const S=e.get(p),b=S.envMap,_=S.envMapRotation;b&&(g.envMap.value=b,Ui.copy(_),Ui.x*=-1,Ui.y*=-1,Ui.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Ui.y*=-1,Ui.z*=-1),g.envMapRotation.value.setFromMatrix4(oS.makeRotationFromEuler(Ui)),g.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,S,b){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*S,g.scale.value=b*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function h(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,S){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===tn&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=S.texture,g.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function v(g,p){const S=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(S.matrixWorld),g.nearDistance.value=S.shadow.camera.near,g.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function lS(n,e,t,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,b){const _=b.program;i.uniformBlockBinding(S,_)}function c(S,b){let _=s[S.id];_===void 0&&(m(S),_=u(S),s[S.id]=_,S.addEventListener("dispose",g));const P=b.program;i.updateUBOMapping(S,P);const C=e.render.frame;r[S.id]!==C&&(d(S),r[S.id]=C)}function u(S){const b=h();S.__bindingPointIndex=b;const _=n.createBuffer(),P=S.__size,C=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,_),n.bufferData(n.UNIFORM_BUFFER,P,C),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,b,_),_}function h(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){const b=s[S.id],_=S.uniforms,P=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,b);for(let C=0,T=_.length;C<T;C++){const R=Array.isArray(_[C])?_[C]:[_[C]];for(let w=0,x=R.length;w<x;w++){const D=R[w];if(f(D,C,w,P)===!0){const Y=D.__offset,N=Array.isArray(D.value)?D.value:[D.value];let H=0;for(let $=0;$<N.length;$++){const G=N[$],X=v(G);typeof G=="number"||typeof G=="boolean"?(D.__data[0]=G,n.bufferSubData(n.UNIFORM_BUFFER,Y+H,D.__data)):G.isMatrix3?(D.__data[0]=G.elements[0],D.__data[1]=G.elements[1],D.__data[2]=G.elements[2],D.__data[3]=0,D.__data[4]=G.elements[3],D.__data[5]=G.elements[4],D.__data[6]=G.elements[5],D.__data[7]=0,D.__data[8]=G.elements[6],D.__data[9]=G.elements[7],D.__data[10]=G.elements[8],D.__data[11]=0):(G.toArray(D.__data,H),H+=X.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,Y,D.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(S,b,_,P){const C=S.value,T=b+"_"+_;if(P[T]===void 0)return typeof C=="number"||typeof C=="boolean"?P[T]=C:P[T]=C.clone(),!0;{const R=P[T];if(typeof C=="number"||typeof C=="boolean"){if(R!==C)return P[T]=C,!0}else if(R.equals(C)===!1)return R.copy(C),!0}return!1}function m(S){const b=S.uniforms;let _=0;const P=16;for(let T=0,R=b.length;T<R;T++){const w=Array.isArray(b[T])?b[T]:[b[T]];for(let x=0,D=w.length;x<D;x++){const Y=w[x],N=Array.isArray(Y.value)?Y.value:[Y.value];for(let H=0,$=N.length;H<$;H++){const G=N[H],X=v(G),O=_%P,ne=O%X.boundary,he=O+ne;_+=ne,he!==0&&P-he<X.storage&&(_+=P-he),Y.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),Y.__offset=_,_+=X.storage}}}const C=_%P;return C>0&&(_+=P-C),S.__size=_,S.__cache={},this}function v(S){const b={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(b.boundary=4,b.storage=4):S.isVector2?(b.boundary=8,b.storage=8):S.isVector3||S.isColor?(b.boundary=16,b.storage=12):S.isVector4?(b.boundary=16,b.storage=16):S.isMatrix3?(b.boundary=48,b.storage=48):S.isMatrix4?(b.boundary=64,b.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),b}function g(S){const b=S.target;b.removeEventListener("dispose",g);const _=o.indexOf(b.__bindingPointIndex);o.splice(_,1),n.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function p(){for(const S in s)n.deleteBuffer(s[S]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}class cS{constructor(e={}){const{canvas:t=ng(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=o;const m=new Uint32Array(4),v=new Int32Array(4);let g=null,p=null;const S=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=xi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const _=this;let P=!1;this._outputColorSpace=_n;let C=0,T=0,R=null,w=-1,x=null;const D=new dt,Y=new dt;let N=null;const H=new ze(0);let $=0,G=t.width,X=t.height,O=1,ne=null,he=null;const me=new dt(0,0,G,X),_e=new dt(0,0,G,X);let Ue=!1;const te=new Sc;let re=!1,de=!1;const le=new ft,Ce=new ft,Te=new z,De=new dt,Ge={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let I=!1;function U(){return R===null?O:1}let E=i;function ae(A,J){return t.getContext(A,J)}try{const A={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${cc}`),t.addEventListener("webglcontextlost",ue,!1),t.addEventListener("webglcontextrestored",Ee,!1),t.addEventListener("webglcontextcreationerror",Re,!1),E===null){const J="webgl2";if(E=ae(J,A),E===null)throw ae(J)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let F,k,V,ee,B,M,y,L,j,Z,Q,xe,ce,Se,ke,fe,pe,be,Ne,ge,Ie,Oe,$e,q;function Ae(){F=new xy(E),F.init(),Oe=new tS(E,F),k=new dy(E,F,e,Oe),V=new QM(E,F),k.reverseDepthBuffer&&d&&V.buffers.depth.setReversed(!0),ee=new Sy(E),B=new kM,M=new eS(E,F,V,B,k,Oe,ee),y=new py(_),L=new _y(_),j=new Cv(E),$e=new uy(E,j),Z=new yy(E,j,ee,$e),Q=new wy(E,Z,j,ee),Ne=new by(E,k,M),fe=new fy(B),xe=new zM(_,y,L,F,k,$e,fe),ce=new aS(_,B),Se=new GM,ke=new YM(F),be=new cy(_,y,L,V,Q,f,l),pe=new JM(_,Q,k),q=new lS(E,ee,k,V),ge=new hy(E,F,ee),Ie=new My(E,F,ee),ee.programs=xe.programs,_.capabilities=k,_.extensions=F,_.properties=B,_.renderLists=Se,_.shadowMap=pe,_.state=V,_.info=ee}Ae();const oe=new rS(_,E);this.xr=oe,this.getContext=function(){return E},this.getContextAttributes=function(){return E.getContextAttributes()},this.forceContextLoss=function(){const A=F.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=F.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return O},this.setPixelRatio=function(A){A!==void 0&&(O=A,this.setSize(G,X,!1))},this.getSize=function(A){return A.set(G,X)},this.setSize=function(A,J,ie=!0){if(oe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=A,X=J,t.width=Math.floor(A*O),t.height=Math.floor(J*O),ie===!0&&(t.style.width=A+"px",t.style.height=J+"px"),this.setViewport(0,0,A,J)},this.getDrawingBufferSize=function(A){return A.set(G*O,X*O).floor()},this.setDrawingBufferSize=function(A,J,ie){G=A,X=J,O=ie,t.width=Math.floor(A*ie),t.height=Math.floor(J*ie),this.setViewport(0,0,A,J)},this.getCurrentViewport=function(A){return A.copy(D)},this.getViewport=function(A){return A.copy(me)},this.setViewport=function(A,J,ie,se){A.isVector4?me.set(A.x,A.y,A.z,A.w):me.set(A,J,ie,se),V.viewport(D.copy(me).multiplyScalar(O).round())},this.getScissor=function(A){return A.copy(_e)},this.setScissor=function(A,J,ie,se){A.isVector4?_e.set(A.x,A.y,A.z,A.w):_e.set(A,J,ie,se),V.scissor(Y.copy(_e).multiplyScalar(O).round())},this.getScissorTest=function(){return Ue},this.setScissorTest=function(A){V.setScissorTest(Ue=A)},this.setOpaqueSort=function(A){ne=A},this.setTransparentSort=function(A){he=A},this.getClearColor=function(A){return A.copy(be.getClearColor())},this.setClearColor=function(){be.setClearColor(...arguments)},this.getClearAlpha=function(){return be.getClearAlpha()},this.setClearAlpha=function(){be.setClearAlpha(...arguments)},this.clear=function(A=!0,J=!0,ie=!0){let se=0;if(A){let K=!1;if(R!==null){const Me=R.texture.format;K=Me===gc||Me===mc||Me===pc}if(K){const Me=R.texture.type,Le=Me===ni||Me===Wi||Me===hr||Me===dr||Me===dc||Me===fc,Fe=be.getClearColor(),Be=be.getClearAlpha(),Xe=Fe.r,We=Fe.g,He=Fe.b;Le?(m[0]=Xe,m[1]=We,m[2]=He,m[3]=Be,E.clearBufferuiv(E.COLOR,0,m)):(v[0]=Xe,v[1]=We,v[2]=He,v[3]=Be,E.clearBufferiv(E.COLOR,0,v))}else se|=E.COLOR_BUFFER_BIT}J&&(se|=E.DEPTH_BUFFER_BIT),ie&&(se|=E.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),E.clear(se)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ue,!1),t.removeEventListener("webglcontextrestored",Ee,!1),t.removeEventListener("webglcontextcreationerror",Re,!1),be.dispose(),Se.dispose(),ke.dispose(),B.dispose(),y.dispose(),L.dispose(),Q.dispose(),$e.dispose(),q.dispose(),xe.dispose(),oe.dispose(),oe.removeEventListener("sessionstart",Tr),oe.removeEventListener("sessionend",Ar),pn.stop()};function ue(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function Ee(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const A=ee.autoReset,J=pe.enabled,ie=pe.autoUpdate,se=pe.needsUpdate,K=pe.type;Ae(),ee.autoReset=A,pe.enabled=J,pe.autoUpdate=ie,pe.needsUpdate=se,pe.type=K}function Re(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function je(A){const J=A.target;J.removeEventListener("dispose",je),gt(J)}function gt(A){yt(A),B.remove(A)}function yt(A){const J=B.get(A).programs;J!==void 0&&(J.forEach(function(ie){xe.releaseProgram(ie)}),A.isShaderMaterial&&xe.releaseShaderCache(A))}this.renderBufferDirect=function(A,J,ie,se,K,Me){J===null&&(J=Ge);const Le=K.isMesh&&K.matrixWorld.determinant()<0,Fe=Lc(A,J,ie,se,K);V.setMaterial(se,Le);let Be=ie.index,Xe=1;if(se.wireframe===!0){if(Be=Z.getWireframeAttribute(ie),Be===void 0)return;Xe=2}const We=ie.drawRange,He=ie.attributes.position;let nt=We.start*Xe,ot=(We.start+We.count)*Xe;Me!==null&&(nt=Math.max(nt,Me.start*Xe),ot=Math.min(ot,(Me.start+Me.count)*Xe)),Be!==null?(nt=Math.max(nt,0),ot=Math.min(ot,Be.count)):He!=null&&(nt=Math.max(nt,0),ot=Math.min(ot,He.count));const St=ot-nt;if(St<0||St===1/0)return;$e.setup(K,se,Fe,ie,Be);let xt,st=ge;if(Be!==null&&(xt=j.get(Be),st=Ie,st.setIndex(xt)),K.isMesh)se.wireframe===!0?(V.setLineWidth(se.wireframeLinewidth*U()),st.setMode(E.LINES)):st.setMode(E.TRIANGLES);else if(K.isLine){let Ve=se.linewidth;Ve===void 0&&(Ve=1),V.setLineWidth(Ve*U()),K.isLineSegments?st.setMode(E.LINES):K.isLineLoop?st.setMode(E.LINE_LOOP):st.setMode(E.LINE_STRIP)}else K.isPoints?st.setMode(E.POINTS):K.isSprite&&st.setMode(E.TRIANGLES);if(K.isBatchedMesh)if(K._multiDrawInstances!==null)mo("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),st.renderMultiDrawInstances(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount,K._multiDrawInstances);else if(F.get("WEBGL_multi_draw"))st.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{const Ve=K._multiDrawStarts,Ut=K._multiDrawCounts,at=K._multiDrawCount,Mn=Be?j.get(Be).bytesPerElement:1,Ki=B.get(se).currentProgram.getUniforms();for(let nn=0;nn<at;nn++)Ki.setValue(E,"_gl_DrawID",nn),st.render(Ve[nn]/Mn,Ut[nn])}else if(K.isInstancedMesh)st.renderInstances(nt,St,K.count);else if(ie.isInstancedBufferGeometry){const Ve=ie._maxInstanceCount!==void 0?ie._maxInstanceCount:1/0,Ut=Math.min(ie.instanceCount,Ve);st.renderInstances(nt,St,Ut)}else st.render(nt,St)};function tt(A,J,ie){A.transparent===!0&&A.side===kt&&A.forceSinglePass===!1?(A.side=tn,A.needsUpdate=!0,Vt(A,J,ie),A.side=Mi,A.needsUpdate=!0,Vt(A,J,ie),A.side=kt):Vt(A,J,ie)}this.compile=function(A,J,ie=null){ie===null&&(ie=A),p=ke.get(ie),p.init(J),b.push(p),ie.traverseVisible(function(K){K.isLight&&K.layers.test(J.layers)&&(p.pushLight(K),K.castShadow&&p.pushShadow(K))}),A!==ie&&A.traverseVisible(function(K){K.isLight&&K.layers.test(J.layers)&&(p.pushLight(K),K.castShadow&&p.pushShadow(K))}),p.setupLights();const se=new Set;return A.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;const Me=K.material;if(Me)if(Array.isArray(Me))for(let Le=0;Le<Me.length;Le++){const Fe=Me[Le];tt(Fe,ie,K),se.add(Fe)}else tt(Me,ie,K),se.add(Me)}),p=b.pop(),se},this.compileAsync=function(A,J,ie=null){const se=this.compile(A,J,ie);return new Promise(K=>{function Me(){if(se.forEach(function(Le){B.get(Le).currentProgram.isReady()&&se.delete(Le)}),se.size===0){K(A);return}setTimeout(Me,10)}F.get("KHR_parallel_shader_compile")!==null?Me():setTimeout(Me,10)})};let It=null;function fn(A){It&&It(A)}function Tr(){pn.stop()}function Ar(){pn.start()}const pn=new rf;pn.setAnimationLoop(fn),typeof self<"u"&&pn.setContext(self),this.setAnimationLoop=function(A){It=A,oe.setAnimationLoop(A),A===null?pn.stop():pn.start()},oe.addEventListener("sessionstart",Tr),oe.addEventListener("sessionend",Ar),this.render=function(A,J){if(J!==void 0&&J.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),J.parent===null&&J.matrixWorldAutoUpdate===!0&&J.updateMatrixWorld(),oe.enabled===!0&&oe.isPresenting===!0&&(oe.cameraAutoUpdate===!0&&oe.updateCamera(J),J=oe.getCamera()),A.isScene===!0&&A.onBeforeRender(_,A,J,R),p=ke.get(A,b.length),p.init(J),b.push(p),Ce.multiplyMatrices(J.projectionMatrix,J.matrixWorldInverse),te.setFromProjectionMatrix(Ce),de=this.localClippingEnabled,re=fe.init(this.clippingPlanes,de),g=Se.get(A,S.length),g.init(),S.push(g),oe.enabled===!0&&oe.isPresenting===!0){const Me=_.xr.getDepthSensingMesh();Me!==null&&Ls(Me,J,-1/0,_.sortObjects)}Ls(A,J,0,_.sortObjects),g.finish(),_.sortObjects===!0&&g.sort(ne,he),I=oe.enabled===!1||oe.isPresenting===!1||oe.hasDepthSensing()===!1,I&&be.addToRenderList(g,A),this.info.render.frame++,re===!0&&fe.beginShadows();const ie=p.state.shadowsArray;pe.render(ie,A,J),re===!0&&fe.endShadows(),this.info.autoReset===!0&&this.info.reset();const se=g.opaque,K=g.transmissive;if(p.setupLights(),J.isArrayCamera){const Me=J.cameras;if(K.length>0)for(let Le=0,Fe=Me.length;Le<Fe;Le++){const Be=Me[Le];Is(se,K,A,Be)}I&&be.render(A);for(let Le=0,Fe=Me.length;Le<Fe;Le++){const Be=Me[Le];Cr(g,A,Be,Be.viewport)}}else K.length>0&&Is(se,K,A,J),I&&be.render(A),Cr(g,A,J);R!==null&&T===0&&(M.updateMultisampleRenderTarget(R),M.updateRenderTargetMipmap(R)),A.isScene===!0&&A.onAfterRender(_,A,J),$e.resetDefaultState(),w=-1,x=null,b.pop(),b.length>0?(p=b[b.length-1],re===!0&&fe.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,S.pop(),S.length>0?g=S[S.length-1]:g=null};function Ls(A,J,ie,se){if(A.visible===!1)return;if(A.layers.test(J.layers)){if(A.isGroup)ie=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(J);else if(A.isLight)p.pushLight(A),A.castShadow&&p.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||te.intersectsSprite(A)){se&&De.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Ce);const Le=Q.update(A),Fe=A.material;Fe.visible&&g.push(A,Le,Fe,ie,De.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||te.intersectsObject(A))){const Le=Q.update(A),Fe=A.material;if(se&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),De.copy(A.boundingSphere.center)):(Le.boundingSphere===null&&Le.computeBoundingSphere(),De.copy(Le.boundingSphere.center)),De.applyMatrix4(A.matrixWorld).applyMatrix4(Ce)),Array.isArray(Fe)){const Be=Le.groups;for(let Xe=0,We=Be.length;Xe<We;Xe++){const He=Be[Xe],nt=Fe[He.materialIndex];nt&&nt.visible&&g.push(A,Le,nt,ie,De.z,He)}}else Fe.visible&&g.push(A,Le,Fe,ie,De.z,null)}}const Me=A.children;for(let Le=0,Fe=Me.length;Le<Fe;Le++)Ls(Me[Le],J,ie,se)}function Cr(A,J,ie,se){const K=A.opaque,Me=A.transmissive,Le=A.transparent;p.setupLightsView(ie),re===!0&&fe.setGlobalState(_.clippingPlanes,ie),se&&V.viewport(D.copy(se)),K.length>0&&wi(K,J,ie),Me.length>0&&wi(Me,J,ie),Le.length>0&&wi(Le,J,ie),V.buffers.depth.setTest(!0),V.buffers.depth.setMask(!0),V.buffers.color.setMask(!0),V.setPolygonOffset(!1)}function Is(A,J,ie,se){if((ie.isScene===!0?ie.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[se.id]===void 0&&(p.state.transmissionRenderTarget[se.id]=new Ft(1,1,{generateMipmaps:!0,type:F.has("EXT_color_buffer_half_float")||F.has("EXT_color_buffer_float")?cn:ni,minFilter:ki,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:rt.workingColorSpace}));const Me=p.state.transmissionRenderTarget[se.id],Le=se.viewport||D;Me.setSize(Le.z*_.transmissionResolutionScale,Le.w*_.transmissionResolutionScale);const Fe=_.getRenderTarget();_.setRenderTarget(Me),_.getClearColor(H),$=_.getClearAlpha(),$<1&&_.setClearColor(16777215,.5),_.clear(),I&&be.render(ie);const Be=_.toneMapping;_.toneMapping=xi;const Xe=se.viewport;if(se.viewport!==void 0&&(se.viewport=void 0),p.setupLightsView(se),re===!0&&fe.setGlobalState(_.clippingPlanes,se),wi(A,ie,se),M.updateMultisampleRenderTarget(Me),M.updateRenderTargetMipmap(Me),F.has("WEBGL_multisampled_render_to_texture")===!1){let We=!1;for(let He=0,nt=J.length;He<nt;He++){const ot=J[He],St=ot.object,xt=ot.geometry,st=ot.material,Ve=ot.group;if(st.side===kt&&St.layers.test(se.layers)){const Ut=st.side;st.side=tn,st.needsUpdate=!0,Rr(St,ie,se,xt,st,Ve),st.side=Ut,st.needsUpdate=!0,We=!0}}We===!0&&(M.updateMultisampleRenderTarget(Me),M.updateRenderTargetMipmap(Me))}_.setRenderTarget(Fe),_.setClearColor(H,$),Xe!==void 0&&(se.viewport=Xe),_.toneMapping=Be}function wi(A,J,ie){const se=J.isScene===!0?J.overrideMaterial:null;for(let K=0,Me=A.length;K<Me;K++){const Le=A[K],Fe=Le.object,Be=Le.geometry,Xe=Le.group;let We=Le.material;We.allowOverride===!0&&se!==null&&(We=se),Fe.layers.test(ie.layers)&&Rr(Fe,J,ie,Be,We,Xe)}}function Rr(A,J,ie,se,K,Me){A.onBeforeRender(_,J,ie,se,K,Me),A.modelViewMatrix.multiplyMatrices(ie.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),K.onBeforeRender(_,J,ie,se,A,Me),K.transparent===!0&&K.side===kt&&K.forceSinglePass===!1?(K.side=tn,K.needsUpdate=!0,_.renderBufferDirect(ie,J,se,K,A,Me),K.side=Mi,K.needsUpdate=!0,_.renderBufferDirect(ie,J,se,K,A,Me),K.side=kt):_.renderBufferDirect(ie,J,se,K,A,Me),A.onAfterRender(_,J,ie,se,K,Me)}function Vt(A,J,ie){J.isScene!==!0&&(J=Ge);const se=B.get(A),K=p.state.lights,Me=p.state.shadowsArray,Le=K.state.version,Fe=xe.getParameters(A,K.state,Me,J,ie),Be=xe.getProgramCacheKey(Fe);let Xe=se.programs;se.environment=A.isMeshStandardMaterial?J.environment:null,se.fog=J.fog,se.envMap=(A.isMeshStandardMaterial?L:y).get(A.envMap||se.environment),se.envMapRotation=se.environment!==null&&A.envMap===null?J.environmentRotation:A.envMapRotation,Xe===void 0&&(A.addEventListener("dispose",je),Xe=new Map,se.programs=Xe);let We=Xe.get(Be);if(We!==void 0){if(se.currentProgram===We&&se.lightsStateVersion===Le)return Wo(A,Fe),We}else Fe.uniforms=xe.getUniforms(A),A.onBeforeCompile(Fe,_),We=xe.acquireProgram(Fe,Be),Xe.set(Be,We),se.uniforms=Fe.uniforms;const He=se.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(He.clippingPlanes=fe.uniform),Wo(A,Fe),se.needsLights=yf(A),se.lightsStateVersion=Le,se.needsLights&&(He.ambientLightColor.value=K.state.ambient,He.lightProbe.value=K.state.probe,He.directionalLights.value=K.state.directional,He.directionalLightShadows.value=K.state.directionalShadow,He.spotLights.value=K.state.spot,He.spotLightShadows.value=K.state.spotShadow,He.rectAreaLights.value=K.state.rectArea,He.ltc_1.value=K.state.rectAreaLTC1,He.ltc_2.value=K.state.rectAreaLTC2,He.pointLights.value=K.state.point,He.pointLightShadows.value=K.state.pointShadow,He.hemisphereLights.value=K.state.hemi,He.directionalShadowMap.value=K.state.directionalShadowMap,He.directionalShadowMatrix.value=K.state.directionalShadowMatrix,He.spotShadowMap.value=K.state.spotShadowMap,He.spotLightMatrix.value=K.state.spotLightMatrix,He.spotLightMap.value=K.state.spotLightMap,He.pointShadowMap.value=K.state.pointShadowMap,He.pointShadowMatrix.value=K.state.pointShadowMatrix),se.currentProgram=We,se.uniformsList=null,We}function Ei(A){if(A.uniformsList===null){const J=A.currentProgram.getUniforms();A.uniformsList=go.seqWithValue(J.seq,A.uniforms)}return A.uniformsList}function Wo(A,J){const ie=B.get(A);ie.outputColorSpace=J.outputColorSpace,ie.batching=J.batching,ie.batchingColor=J.batchingColor,ie.instancing=J.instancing,ie.instancingColor=J.instancingColor,ie.instancingMorph=J.instancingMorph,ie.skinning=J.skinning,ie.morphTargets=J.morphTargets,ie.morphNormals=J.morphNormals,ie.morphColors=J.morphColors,ie.morphTargetsCount=J.morphTargetsCount,ie.numClippingPlanes=J.numClippingPlanes,ie.numIntersection=J.numClipIntersection,ie.vertexAlphas=J.vertexAlphas,ie.vertexTangents=J.vertexTangents,ie.toneMapping=J.toneMapping}function Lc(A,J,ie,se,K){J.isScene!==!0&&(J=Ge),M.resetTextureUnits();const Me=J.fog,Le=se.isMeshStandardMaterial?J.environment:null,Fe=R===null?_.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:As,Be=(se.isMeshStandardMaterial?L:y).get(se.envMap||Le),Xe=se.vertexColors===!0&&!!ie.attributes.color&&ie.attributes.color.itemSize===4,We=!!ie.attributes.tangent&&(!!se.normalMap||se.anisotropy>0),He=!!ie.morphAttributes.position,nt=!!ie.morphAttributes.normal,ot=!!ie.morphAttributes.color;let St=xi;se.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(St=_.toneMapping);const xt=ie.morphAttributes.position||ie.morphAttributes.normal||ie.morphAttributes.color,st=xt!==void 0?xt.length:0,Ve=B.get(se),Ut=p.state.lights;if(re===!0&&(de===!0||A!==x)){const Wt=A===x&&se.id===w;fe.setState(se,A,Wt)}let at=!1;se.version===Ve.__version?(Ve.needsLights&&Ve.lightsStateVersion!==Ut.state.version||Ve.outputColorSpace!==Fe||K.isBatchedMesh&&Ve.batching===!1||!K.isBatchedMesh&&Ve.batching===!0||K.isBatchedMesh&&Ve.batchingColor===!0&&K.colorTexture===null||K.isBatchedMesh&&Ve.batchingColor===!1&&K.colorTexture!==null||K.isInstancedMesh&&Ve.instancing===!1||!K.isInstancedMesh&&Ve.instancing===!0||K.isSkinnedMesh&&Ve.skinning===!1||!K.isSkinnedMesh&&Ve.skinning===!0||K.isInstancedMesh&&Ve.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&Ve.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&Ve.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&Ve.instancingMorph===!1&&K.morphTexture!==null||Ve.envMap!==Be||se.fog===!0&&Ve.fog!==Me||Ve.numClippingPlanes!==void 0&&(Ve.numClippingPlanes!==fe.numPlanes||Ve.numIntersection!==fe.numIntersection)||Ve.vertexAlphas!==Xe||Ve.vertexTangents!==We||Ve.morphTargets!==He||Ve.morphNormals!==nt||Ve.morphColors!==ot||Ve.toneMapping!==St||Ve.morphTargetsCount!==st)&&(at=!0):(at=!0,Ve.__version=se.version);let Mn=Ve.currentProgram;at===!0&&(Mn=Vt(se,J,K));let Ki=!1,nn=!1,Us=!1;const vt=Mn.getUniforms(),mn=Ve.uniforms;if(V.useProgram(Mn.program)&&(Ki=!0,nn=!0,Us=!0),se.id!==w&&(w=se.id,nn=!0),Ki||x!==A){V.buffers.depth.getReversed()?(le.copy(A.projectionMatrix),sg(le),rg(le),vt.setValue(E,"projectionMatrix",le)):vt.setValue(E,"projectionMatrix",A.projectionMatrix),vt.setValue(E,"viewMatrix",A.matrixWorldInverse);const Kt=vt.map.cameraPosition;Kt!==void 0&&Kt.setValue(E,Te.setFromMatrixPosition(A.matrixWorld)),k.logarithmicDepthBuffer&&vt.setValue(E,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(se.isMeshPhongMaterial||se.isMeshToonMaterial||se.isMeshLambertMaterial||se.isMeshBasicMaterial||se.isMeshStandardMaterial||se.isShaderMaterial)&&vt.setValue(E,"isOrthographic",A.isOrthographicCamera===!0),x!==A&&(x=A,nn=!0,Us=!0)}if(K.isSkinnedMesh){vt.setOptional(E,K,"bindMatrix"),vt.setOptional(E,K,"bindMatrixInverse");const Wt=K.skeleton;Wt&&(Wt.boneTexture===null&&Wt.computeBoneTexture(),vt.setValue(E,"boneTexture",Wt.boneTexture,M))}K.isBatchedMesh&&(vt.setOptional(E,K,"batchingTexture"),vt.setValue(E,"batchingTexture",K._matricesTexture,M),vt.setOptional(E,K,"batchingIdTexture"),vt.setValue(E,"batchingIdTexture",K._indirectTexture,M),vt.setOptional(E,K,"batchingColorTexture"),K._colorsTexture!==null&&vt.setValue(E,"batchingColorTexture",K._colorsTexture,M));const gn=ie.morphAttributes;if((gn.position!==void 0||gn.normal!==void 0||gn.color!==void 0)&&Ne.update(K,ie,Mn),(nn||Ve.receiveShadow!==K.receiveShadow)&&(Ve.receiveShadow=K.receiveShadow,vt.setValue(E,"receiveShadow",K.receiveShadow)),se.isMeshGouraudMaterial&&se.envMap!==null&&(mn.envMap.value=Be,mn.flipEnvMap.value=Be.isCubeTexture&&Be.isRenderTargetTexture===!1?-1:1),se.isMeshStandardMaterial&&se.envMap===null&&J.environment!==null&&(mn.envMapIntensity.value=J.environmentIntensity),nn&&(vt.setValue(E,"toneMappingExposure",_.toneMappingExposure),Ve.needsLights&&xf(mn,Us),Me&&se.fog===!0&&ce.refreshFogUniforms(mn,Me),ce.refreshMaterialUniforms(mn,se,O,X,p.state.transmissionRenderTarget[A.id]),go.upload(E,Ei(Ve),mn,M)),se.isShaderMaterial&&se.uniformsNeedUpdate===!0&&(go.upload(E,Ei(Ve),mn,M),se.uniformsNeedUpdate=!1),se.isSpriteMaterial&&vt.setValue(E,"center",K.center),vt.setValue(E,"modelViewMatrix",K.modelViewMatrix),vt.setValue(E,"normalMatrix",K.normalMatrix),vt.setValue(E,"modelMatrix",K.matrixWorld),se.isShaderMaterial||se.isRawShaderMaterial){const Wt=se.uniformsGroups;for(let Kt=0,Xo=Wt.length;Kt<Xo;Kt++){const Ti=Wt[Kt];q.update(Ti,Mn),q.bind(Ti,Mn)}}return Mn}function xf(A,J){A.ambientLightColor.needsUpdate=J,A.lightProbe.needsUpdate=J,A.directionalLights.needsUpdate=J,A.directionalLightShadows.needsUpdate=J,A.pointLights.needsUpdate=J,A.pointLightShadows.needsUpdate=J,A.spotLights.needsUpdate=J,A.spotLightShadows.needsUpdate=J,A.rectAreaLights.needsUpdate=J,A.hemisphereLights.needsUpdate=J}function yf(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(A,J,ie){const se=B.get(A);se.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,se.__autoAllocateDepthBuffer===!1&&(se.__useRenderToTexture=!1),B.get(A.texture).__webglTexture=J,B.get(A.depthTexture).__webglTexture=se.__autoAllocateDepthBuffer?void 0:ie,se.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,J){const ie=B.get(A);ie.__webglFramebuffer=J,ie.__useDefaultFramebuffer=J===void 0};const Mf=E.createFramebuffer();this.setRenderTarget=function(A,J=0,ie=0){R=A,C=J,T=ie;let se=!0,K=null,Me=!1,Le=!1;if(A){const Be=B.get(A);if(Be.__useDefaultFramebuffer!==void 0)V.bindFramebuffer(E.FRAMEBUFFER,null),se=!1;else if(Be.__webglFramebuffer===void 0)M.setupRenderTarget(A);else if(Be.__hasExternalTextures)M.rebindTextures(A,B.get(A.texture).__webglTexture,B.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const He=A.depthTexture;if(Be.__boundDepthTexture!==He){if(He!==null&&B.has(He)&&(A.width!==He.image.width||A.height!==He.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");M.setupDepthRenderbuffer(A)}}const Xe=A.texture;(Xe.isData3DTexture||Xe.isDataArrayTexture||Xe.isCompressedArrayTexture)&&(Le=!0);const We=B.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(We[J])?K=We[J][ie]:K=We[J],Me=!0):A.samples>0&&M.useMultisampledRTT(A)===!1?K=B.get(A).__webglMultisampledFramebuffer:Array.isArray(We)?K=We[ie]:K=We,D.copy(A.viewport),Y.copy(A.scissor),N=A.scissorTest}else D.copy(me).multiplyScalar(O).floor(),Y.copy(_e).multiplyScalar(O).floor(),N=Ue;if(ie!==0&&(K=Mf),V.bindFramebuffer(E.FRAMEBUFFER,K)&&se&&V.drawBuffers(A,K),V.viewport(D),V.scissor(Y),V.setScissorTest(N),Me){const Be=B.get(A.texture);E.framebufferTexture2D(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_CUBE_MAP_POSITIVE_X+J,Be.__webglTexture,ie)}else if(Le){const Be=B.get(A.texture),Xe=J;E.framebufferTextureLayer(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0,Be.__webglTexture,ie,Xe)}else if(A!==null&&ie!==0){const Be=B.get(A.texture);E.framebufferTexture2D(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_2D,Be.__webglTexture,ie)}w=-1},this.readRenderTargetPixels=function(A,J,ie,se,K,Me,Le){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Fe=B.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Le!==void 0&&(Fe=Fe[Le]),Fe){V.bindFramebuffer(E.FRAMEBUFFER,Fe);try{const Be=A.texture,Xe=Be.format,We=Be.type;if(!k.textureFormatReadable(Xe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!k.textureTypeReadable(We)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}J>=0&&J<=A.width-se&&ie>=0&&ie<=A.height-K&&E.readPixels(J,ie,se,K,Oe.convert(Xe),Oe.convert(We),Me)}finally{const Be=R!==null?B.get(R).__webglFramebuffer:null;V.bindFramebuffer(E.FRAMEBUFFER,Be)}}},this.readRenderTargetPixelsAsync=async function(A,J,ie,se,K,Me,Le){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Fe=B.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Le!==void 0&&(Fe=Fe[Le]),Fe)if(J>=0&&J<=A.width-se&&ie>=0&&ie<=A.height-K){V.bindFramebuffer(E.FRAMEBUFFER,Fe);const Be=A.texture,Xe=Be.format,We=Be.type;if(!k.textureFormatReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!k.textureTypeReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const He=E.createBuffer();E.bindBuffer(E.PIXEL_PACK_BUFFER,He),E.bufferData(E.PIXEL_PACK_BUFFER,Me.byteLength,E.STREAM_READ),E.readPixels(J,ie,se,K,Oe.convert(Xe),Oe.convert(We),0);const nt=R!==null?B.get(R).__webglFramebuffer:null;V.bindFramebuffer(E.FRAMEBUFFER,nt);const ot=E.fenceSync(E.SYNC_GPU_COMMANDS_COMPLETE,0);return E.flush(),await ig(E,ot,4),E.bindBuffer(E.PIXEL_PACK_BUFFER,He),E.getBufferSubData(E.PIXEL_PACK_BUFFER,0,Me),E.deleteBuffer(He),E.deleteSync(ot),Me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,J=null,ie=0){const se=Math.pow(2,-ie),K=Math.floor(A.image.width*se),Me=Math.floor(A.image.height*se),Le=J!==null?J.x:0,Fe=J!==null?J.y:0;M.setTexture2D(A,0),E.copyTexSubImage2D(E.TEXTURE_2D,ie,0,0,Le,Fe,K,Me),V.unbindTexture()};const Sf=E.createFramebuffer(),bf=E.createFramebuffer();this.copyTextureToTexture=function(A,J,ie=null,se=null,K=0,Me=null){Me===null&&(K!==0?(mo("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Me=K,K=0):Me=0);let Le,Fe,Be,Xe,We,He,nt,ot,St;const xt=A.isCompressedTexture?A.mipmaps[Me]:A.image;if(ie!==null)Le=ie.max.x-ie.min.x,Fe=ie.max.y-ie.min.y,Be=ie.isBox3?ie.max.z-ie.min.z:1,Xe=ie.min.x,We=ie.min.y,He=ie.isBox3?ie.min.z:0;else{const gn=Math.pow(2,-K);Le=Math.floor(xt.width*gn),Fe=Math.floor(xt.height*gn),A.isDataArrayTexture?Be=xt.depth:A.isData3DTexture?Be=Math.floor(xt.depth*gn):Be=1,Xe=0,We=0,He=0}se!==null?(nt=se.x,ot=se.y,St=se.z):(nt=0,ot=0,St=0);const st=Oe.convert(J.format),Ve=Oe.convert(J.type);let Ut;J.isData3DTexture?(M.setTexture3D(J,0),Ut=E.TEXTURE_3D):J.isDataArrayTexture||J.isCompressedArrayTexture?(M.setTexture2DArray(J,0),Ut=E.TEXTURE_2D_ARRAY):(M.setTexture2D(J,0),Ut=E.TEXTURE_2D),E.pixelStorei(E.UNPACK_FLIP_Y_WEBGL,J.flipY),E.pixelStorei(E.UNPACK_PREMULTIPLY_ALPHA_WEBGL,J.premultiplyAlpha),E.pixelStorei(E.UNPACK_ALIGNMENT,J.unpackAlignment);const at=E.getParameter(E.UNPACK_ROW_LENGTH),Mn=E.getParameter(E.UNPACK_IMAGE_HEIGHT),Ki=E.getParameter(E.UNPACK_SKIP_PIXELS),nn=E.getParameter(E.UNPACK_SKIP_ROWS),Us=E.getParameter(E.UNPACK_SKIP_IMAGES);E.pixelStorei(E.UNPACK_ROW_LENGTH,xt.width),E.pixelStorei(E.UNPACK_IMAGE_HEIGHT,xt.height),E.pixelStorei(E.UNPACK_SKIP_PIXELS,Xe),E.pixelStorei(E.UNPACK_SKIP_ROWS,We),E.pixelStorei(E.UNPACK_SKIP_IMAGES,He);const vt=A.isDataArrayTexture||A.isData3DTexture,mn=J.isDataArrayTexture||J.isData3DTexture;if(A.isDepthTexture){const gn=B.get(A),Wt=B.get(J),Kt=B.get(gn.__renderTarget),Xo=B.get(Wt.__renderTarget);V.bindFramebuffer(E.READ_FRAMEBUFFER,Kt.__webglFramebuffer),V.bindFramebuffer(E.DRAW_FRAMEBUFFER,Xo.__webglFramebuffer);for(let Ti=0;Ti<Be;Ti++)vt&&(E.framebufferTextureLayer(E.READ_FRAMEBUFFER,E.COLOR_ATTACHMENT0,B.get(A).__webglTexture,K,He+Ti),E.framebufferTextureLayer(E.DRAW_FRAMEBUFFER,E.COLOR_ATTACHMENT0,B.get(J).__webglTexture,Me,St+Ti)),E.blitFramebuffer(Xe,We,Le,Fe,nt,ot,Le,Fe,E.DEPTH_BUFFER_BIT,E.NEAREST);V.bindFramebuffer(E.READ_FRAMEBUFFER,null),V.bindFramebuffer(E.DRAW_FRAMEBUFFER,null)}else if(K!==0||A.isRenderTargetTexture||B.has(A)){const gn=B.get(A),Wt=B.get(J);V.bindFramebuffer(E.READ_FRAMEBUFFER,Sf),V.bindFramebuffer(E.DRAW_FRAMEBUFFER,bf);for(let Kt=0;Kt<Be;Kt++)vt?E.framebufferTextureLayer(E.READ_FRAMEBUFFER,E.COLOR_ATTACHMENT0,gn.__webglTexture,K,He+Kt):E.framebufferTexture2D(E.READ_FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_2D,gn.__webglTexture,K),mn?E.framebufferTextureLayer(E.DRAW_FRAMEBUFFER,E.COLOR_ATTACHMENT0,Wt.__webglTexture,Me,St+Kt):E.framebufferTexture2D(E.DRAW_FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_2D,Wt.__webglTexture,Me),K!==0?E.blitFramebuffer(Xe,We,Le,Fe,nt,ot,Le,Fe,E.COLOR_BUFFER_BIT,E.NEAREST):mn?E.copyTexSubImage3D(Ut,Me,nt,ot,St+Kt,Xe,We,Le,Fe):E.copyTexSubImage2D(Ut,Me,nt,ot,Xe,We,Le,Fe);V.bindFramebuffer(E.READ_FRAMEBUFFER,null),V.bindFramebuffer(E.DRAW_FRAMEBUFFER,null)}else mn?A.isDataTexture||A.isData3DTexture?E.texSubImage3D(Ut,Me,nt,ot,St,Le,Fe,Be,st,Ve,xt.data):J.isCompressedArrayTexture?E.compressedTexSubImage3D(Ut,Me,nt,ot,St,Le,Fe,Be,st,xt.data):E.texSubImage3D(Ut,Me,nt,ot,St,Le,Fe,Be,st,Ve,xt):A.isDataTexture?E.texSubImage2D(E.TEXTURE_2D,Me,nt,ot,Le,Fe,st,Ve,xt.data):A.isCompressedTexture?E.compressedTexSubImage2D(E.TEXTURE_2D,Me,nt,ot,xt.width,xt.height,st,xt.data):E.texSubImage2D(E.TEXTURE_2D,Me,nt,ot,Le,Fe,st,Ve,xt);E.pixelStorei(E.UNPACK_ROW_LENGTH,at),E.pixelStorei(E.UNPACK_IMAGE_HEIGHT,Mn),E.pixelStorei(E.UNPACK_SKIP_PIXELS,Ki),E.pixelStorei(E.UNPACK_SKIP_ROWS,nn),E.pixelStorei(E.UNPACK_SKIP_IMAGES,Us),Me===0&&J.generateMipmaps&&E.generateMipmap(Ut),V.unbindTexture()},this.copyTextureToTexture3D=function(A,J,ie=null,se=null,K=0){return mo('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,J,ie,se,K)},this.initRenderTarget=function(A){B.get(A).__webglFramebuffer===void 0&&M.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?M.setTextureCube(A,0):A.isData3DTexture?M.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?M.setTexture2DArray(A,0):M.setTexture2D(A,0),V.unbindTexture()},this.resetState=function(){C=0,T=0,R=null,V.reset(),$e.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ei}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=rt._getDrawingBufferColorSpace(e),t.unpackColorSpace=rt._getUnpackColorSpace()}}const gh={type:"change"},Pc={type:"start"},uf={type:"end"},ro=new Bo,vh=new fi,uS=Math.cos(70*Ul.DEG2RAD),Tt=new z,Qt=2*Math.PI,ht={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Fa=1e-6;class hS extends Tv{constructor(e,t=null){super(e,t),this.state=ht.NONE,this.target=new z,this.cursor=new z,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ms.ROTATE,MIDDLE:Ms.DOLLY,RIGHT:Ms.PAN},this.touches={ONE:gs.ROTATE,TWO:gs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new z,this._lastQuaternion=new Xi,this._lastTargetPosition=new z,this._quat=new Xi().setFromUnitVectors(e.up,new z(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Wu,this._sphericalDelta=new Wu,this._scale=1,this._panOffset=new z,this._rotateStart=new ve,this._rotateEnd=new ve,this._rotateDelta=new ve,this._panStart=new ve,this._panEnd=new ve,this._panDelta=new ve,this._dollyStart=new ve,this._dollyEnd=new ve,this._dollyDelta=new ve,this._dollyDirection=new z,this._mouse=new ve,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=fS.bind(this),this._onPointerDown=dS.bind(this),this._onPointerUp=pS.bind(this),this._onContextMenu=MS.bind(this),this._onMouseWheel=vS.bind(this),this._onKeyDown=_S.bind(this),this._onTouchStart=xS.bind(this),this._onTouchMove=yS.bind(this),this._onMouseDown=mS.bind(this),this._onMouseMove=gS.bind(this),this._interceptControlDown=SS.bind(this),this._interceptControlUp=bS.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(gh),this.update(),this.state=ht.NONE}update(e=null){const t=this.object.position;Tt.copy(t).sub(this.target),Tt.applyQuaternion(this._quat),this._spherical.setFromVector3(Tt),this.autoRotate&&this.state===ht.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=Qt:i>Math.PI&&(i-=Qt),s<-Math.PI?s+=Qt:s>Math.PI&&(s-=Qt),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Tt.setFromSpherical(this._spherical),Tt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Tt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Tt.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new z(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new z(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Tt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(ro.origin.copy(this.object.position),ro.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ro.direction))<uS?this.object.lookAt(this.target):(vh.setFromNormalAndCoplanarPoint(this.object.up,this.target),ro.intersectPlane(vh,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Fa||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Fa||this._lastTargetPosition.distanceToSquared(this.target)>Fa?(this.dispatchEvent(gh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Qt/60*this.autoRotateSpeed*e:Qt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Tt.setFromMatrixColumn(t,0),Tt.multiplyScalar(-e),this._panOffset.add(Tt)}_panUp(e,t){this.screenSpacePanning===!0?Tt.setFromMatrixColumn(t,1):(Tt.setFromMatrixColumn(t,0),Tt.crossVectors(this.object.up,Tt)),Tt.multiplyScalar(e),this._panOffset.add(Tt)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Tt.copy(s).sub(this.target);let r=Tt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=e-i.left,r=t-i.top,o=i.width,a=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Qt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Qt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),r=.5*(e.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Qt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Qt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new ve,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function dS(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function fS(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function pS(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(uf),this.state=ht.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function mS(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Ms.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=ht.DOLLY;break;case Ms.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ht.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ht.ROTATE}break;case Ms.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ht.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ht.PAN}break;default:this.state=ht.NONE}this.state!==ht.NONE&&this.dispatchEvent(Pc)}function gS(n){switch(this.state){case ht.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case ht.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case ht.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function vS(n){this.enabled===!1||this.enableZoom===!1||this.state!==ht.NONE||(n.preventDefault(),this.dispatchEvent(Pc),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(uf))}function _S(n){this.enabled!==!1&&this._handleKeyDown(n)}function xS(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case gs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=ht.TOUCH_ROTATE;break;case gs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=ht.TOUCH_PAN;break;default:this.state=ht.NONE}break;case 2:switch(this.touches.TWO){case gs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=ht.TOUCH_DOLLY_PAN;break;case gs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=ht.TOUCH_DOLLY_ROTATE;break;default:this.state=ht.NONE}break;default:this.state=ht.NONE}this.state!==ht.NONE&&this.dispatchEvent(Pc)}function yS(n){switch(this._trackPointer(n),this.state){case ht.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case ht.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case ht.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case ht.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=ht.NONE}}function MS(n){this.enabled!==!1&&n.preventDefault()}function SS(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function bS(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const In=new vv;function Ji(){const n=new we({color:16091243}),e=n,t=new we({color:15263976}),i=In.load("./textures/floor/parquet_diffuse.jpg"),s=In.load("./textures/floor/parquet_normal.jpg"),r=In.load("./textures/floor/parquet_roughness.jpg");i.wrapS=i.wrapT=an,s.wrapS=s.wrapT=an,r.wrapS=r.wrapT=an,i.repeat.set(3,3),s.repeat.set(3,3),r.repeat.set(3,3);const o=new we({map:i,normalMap:s,roughnessMap:r,roughness:.8,metalness:.1}),a=In.load("./textures/wood/hardwood2_diffuse.jpg"),l=In.load("./textures/wood/hardwood2_roughness.jpg"),c=In.load("./textures/wood/hardwood2_roughness.jpg");a.wrapS=a.wrapT=an,l.wrapS=l.wrapT=an,c.wrapS=c.wrapT=an;const u=In.load("./textures/wood/Wood_027_basecolor.jpg"),h=In.load("./textures/wood/Wood_027_normal.jpg"),d=In.load("./textures/wood/Wood_027_roughness.jpg");u.wrapS=u.wrapT=an,h.wrapS=h.wrapT=an,d.wrapS=d.wrapT=an;const f=new we({map:a,normalMap:l,roughnessMap:c,roughness:.7,metalness:.2}),m=new we({map:u,normalMap:h,roughnessMap:d,roughness:.75,metalness:.05,color:13218457}),v=In.load("./textures/paper/Paper001_1K-JPG_Color.jpg");v.wrapS=v.wrapT=an,v.repeat.set(1,1);const g=new we({map:v,roughness:.5,metalness:.1}),p=new we({color:16777215,roughness:.7,metalness:.1});return{frontWallMaterial:e,floorMaterial:o,woodMaterial:f,tableWoodMaterial:m,paperMaterial:g,whitePlankMaterial:p,sideWallMaterial:t,carpetMaterial:n}}function wS(n,e){const{width:t,height:i,depth:s,wallThickness:r}=e,{frontWallMaterial:o,sideWallMaterial:a,floorMaterial:l}=Ji(),c=new ye(t,r,s),u=new W(c,l);u.position.y=-r/2,n.add(u);const h=new ye(t,i,r),d=new W(h,o);d.position.z=-(s-r)/2,d.position.y=i/2,n.add(d);const f=new ye(r,i,s),m=new W(f,a);return m.position.x=-(t-r)/2,m.position.y=i/2,n.add(m),{floor:u,frontWall:d,leftWall:m}}function ES(n,e){const{width:t,wallThickness:i}=e,{tableWoodMaterial:s,whitePlankMaterial:r}=Ji();function o(de=!1,le=0,Ce){const Te=Ce.clone();return Te.map&&(Te.map=Te.map.clone(),Te.map.rotation=le,Te.map.repeat.set(de?1:2,de?2:1),Te.map.needsUpdate=!0),Te.normalMap&&(Te.normalMap=Te.normalMap.clone(),Te.normalMap.rotation=le,Te.normalMap.repeat.set(de?1:2,de?2:1),Te.normalMap.needsUpdate=!0),Te.roughnessMap&&(Te.roughnessMap=Te.roughnessMap.clone(),Te.roughnessMap.rotation=le,Te.roughnessMap.repeat.set(de?1:2,de?2:1),Te.roughnessMap.needsUpdate=!0),Te}const a=s.clone(),l=2,c=1.2,u=.05,h=.75,d=new Ye,f=new ye(c,u,l),m=o(!1,Math.PI/2,a),v=new W(f,m);v.position.y=h,v.position.x=-.02,d.add(v);const g=c,p=h-.025,S=c*.45,b=c*.45,_=.02,P=new W(new ye(b,p,g),r);P.position.set(-.02,p/2,-.5-b/2+.04),P.rotation.y=Math.PI/2,d.add(P);const C=new Ye,T=b*.95,R=p*.9,w=new ye(T,R,.02),x=r.clone();x.color.set(16316664),x.roughness=.3;const D=new W(w,x);D.position.set(-.02,p/2,.38);const Y=new ye(.15,.03,.02),N=new we({color:15658734,roughness:.2,metalness:.7}),H=new W(Y,N);H.position.set(-.02,p*.55,.39);const $=new ye(.02,.02,.025),G=new W($,N),X=new W($,N);G.position.set(-.02-.05,p*.55,.38),X.position.set(-.02+.05,p*.55,.38),C.add(H),C.add(G),C.add(X),C.add(D),C.position.set(.21,0,-.75),C.rotation.y=Math.PI/2,d.add(C);const O=new Ye,ne=new ye(S,p,g),he=r,me=new W(ne,he);me.position.x=-.6+S/2,me.position.y=p/2,me.position.z=-.27+.04,O.add(me);const _e=p/3.2,Ue=S-.04,te=[_e/2+.02,p/2,p-_e/2-.02],re=r.clone();re.color.set(16448250),re.roughness=.2,re.metalness=.05;for(let de=0;de<3;de++){const le=te[de],Ce=new ye(Ue,_e-_,.02),Te=new W(Ce,re);Te.position.set(-.6+.27,le,.38),O.add(Te);const De=new ye(Ue*.25,.012,.025),Ge=new we({color:1118481,roughness:.95,metalness:0}),I=new W(De,Ge);I.position.set(-.6+.27,le+_e/2-.025,.39),O.add(I)}return O.position.set(.21,0,.4),O.rotation.y=Math.PI/2,d.add(O),d.position.x=-(t-i)/2+c/2+.1,d.position.z=-(t-i)/6,n.add(d),{tableGroup:d,tableTop:v}}class hf{static generateReadingActivities(){return[{objectId:"book_0",objectTitle:"Leyendo El Señor de los Anillos",type:"reading",category:"Literatura Fantástica",date:"2025-04-01",hours:1.5,notes:"Capítulo sobre La Comarca",timestamp:"2025-04-01T18:00:00.000Z",completed:!0},{objectId:"book_1",objectTitle:"Lectura de Dune",type:"reading",category:"Ciencia Ficción",date:"2025-04-02",hours:2,notes:"Capítulos iniciales",timestamp:"2025-04-02T19:00:00.000Z",completed:!0},{objectId:"book_2",objectTitle:"Leyendo una novela de Haruki Murakami",type:"reading",category:"Novela Contemporánea",date:"2025-04-03",hours:1.2,notes:"Norwegian Wood",timestamp:"2025-04-03T17:00:00.000Z",completed:!0},{objectId:"book_3",objectTitle:"Leyendo La Odisea",type:"reading",category:"Literatura Clásica",date:"2025-04-04",hours:1.7,notes:"Capítulo sobre Polifemo",timestamp:"2025-04-04T18:30:00.000Z",completed:!0},{objectId:"book_4",objectTitle:"Lectura sobre física cuántica",type:"reading",category:"Divulgación Científica",date:"2025-04-05",hours:1.5,notes:"Capítulo de 'El universo elegante'",timestamp:"2025-04-05T16:00:00.000Z",completed:!0},{objectId:"book_5",objectTitle:"Leyendo un cuento infantil",type:"reading",category:"Literatura Infantil",date:"2025-04-06",hours:.8,notes:"Cuento para dormir",timestamp:"2025-04-06T20:00:00.000Z",completed:!0},{objectId:"book_6",objectTitle:"Lectura de 'Meditaciones' de Marco Aurelio",type:"reading",category:"Ensayo",date:"2025-04-07",hours:1.3,notes:"Reflexiones filosóficas",timestamp:"2025-04-07T19:30:00.000Z",completed:!0},{objectId:"book_7",objectTitle:"Lectura de textos diversos",type:"reading",category:"Otros",date:"2025-04-08",hours:1.1,notes:"Artículos online",timestamp:"2025-04-08T21:00:00.000Z",completed:!0}]}static generateWorkActivities(){return[{objectId:"folder_2_0",objectTitle:"Implementar funcionalidad de pago",type:"work",category:"Desarrollo",date:"2025-04-01",hours:4,notes:"Integración con Stripe",timestamp:"2025-04-01T09:00:00.000Z",completed:!0},{objectId:"folder_2_1",objectTitle:"Reunión con el equipo de marketing",type:"work",category:"Reuniones",date:"2025-04-02",hours:1,notes:"Definición de estrategia de lanzamiento",timestamp:"2025-04-02T10:00:00.000Z",completed:!0},{objectId:"folder_2_2",objectTitle:"Redactar documento técnico",type:"work",category:"Documentación",date:"2025-04-03",hours:2,notes:"Especificaciones del API",timestamp:"2025-04-03T11:00:00.000Z",completed:!0},{objectId:"folder_2_3",objectTitle:"Planificar roadmap Q2",type:"work",category:"Planificación",date:"2025-04-04",hours:1.5,notes:"Definición de objetivos y KPIs",timestamp:"2025-04-04T12:00:00.000Z",completed:!0},{objectId:"folder_2_4",objectTitle:"Analizar tecnologías Web3",type:"work",category:"Investigación",date:"2025-04-05",hours:3,notes:"Comparación entre Layer 2",timestamp:"2025-04-05T13:00:00.000Z",completed:!0},{objectId:"folder_2_5",objectTitle:"Evaluación de rendimiento del equipo",type:"work",category:"Evaluación",date:"2025-04-06",hours:2,notes:"Feedback individualizado",timestamp:"2025-04-06T14:00:00.000Z",completed:!0},{objectId:"folder_2_6",objectTitle:"Seguimiento del proyecto X",type:"work",category:"Gestión de Proyectos",date:"2025-04-07",hours:1.8,notes:"Revisión de hitos",timestamp:"2025-04-07T15:00:00.000Z",completed:!0},{objectId:"folder_2_7",objectTitle:"Soporte técnico a cliente",type:"work",category:"Otros",date:"2025-04-08",hours:1.2,notes:"Resolución de bug urgente",timestamp:"2025-04-08T16:00:00.000Z",completed:!0}]}static generateSportActivities(){return[{objectId:"dumbbell_0",objectTitle:"Sesión de fuerza en el gimnasio",type:"sport",category:"Gimnasio",date:"2025-04-02",hours:1.2,notes:"Trabajo de piernas y espalda con pesas",timestamp:"2025-04-02T18:00:00.000Z",completed:!0},{objectId:"dumbbell_1",objectTitle:"Entrenamiento funcional al aire libre",type:"sport",category:"Entrenamiento funcional",date:"2025-04-03",hours:1,notes:"Circuito de HIIT con peso corporal",timestamp:"2025-04-03T07:30:00.000Z",completed:!0},{objectId:"dumbbell_2",objectTitle:"Partido de fútbol con amigos",type:"sport",category:"Deportes de equipo",date:"2025-04-04",hours:1.5,notes:"Partido semanal, buen ritmo y trabajo en equipo",timestamp:"2025-04-04T20:00:00.000Z",completed:!0},{objectId:"dumbbell_3",objectTitle:"Yoga para flexibilidad",type:"sport",category:"Flexibilidad",date:"2025-04-05",hours:.8,notes:"Sesión enfocada en estiramientos de cadera y espalda",timestamp:"2025-04-05T09:00:00.000Z",completed:!0},{objectId:"dumbbell_4",objectTitle:"Sesión de bici estática de resistencia",type:"sport",category:"Resistencia",date:"2025-04-06",hours:1.3,notes:"Sesión moderada de 60 minutos + calentamiento y estiramientos",timestamp:"2025-04-06T17:00:00.000Z",completed:!0},{objectId:"dumbbell_5",objectTitle:"Carrera de 5 km por el parque",type:"sport",category:"Correr",date:"2025-04-07",hours:.9,notes:"Buenos tiempos, mejora de ritmo respecto a la semana pasada",timestamp:"2025-04-07T08:00:00.000Z",completed:!0},{objectId:"dumbbell_6",objectTitle:"Entrenamiento de natación estilo crol",type:"sport",category:"Natación",date:"2025-04-08",hours:1.1,notes:"Series de 50 m y técnica de respiración",timestamp:"2025-04-08T19:30:00.000Z",completed:!0},{objectId:"dumbbell_7",objectTitle:"Salida en bicicleta de montaña",type:"sport",category:"Ciclismo",date:"2025-04-09",hours:2.5,notes:"Ruta por el parque natural con desnivel considerable",timestamp:"2025-04-09T10:00:00.000Z",completed:!0},{objectId:"dumbbell_8",objectTitle:"Escalada indoor",type:"sport",category:"Otros",date:"2025-04-10",hours:1.7,notes:"Práctica de bloques de dificultad media",timestamp:"2025-04-10T18:00:00.000Z",completed:!0}]}static generateCleaningActivities(){return[{objectId:"broom_0",objectTitle:"Limpieza general",type:"cleaning",category:"Mantenimiento hogar",date:"2025-04-04",hours:2,notes:"Limpieza general de todo el apartamento",timestamp:"2025-04-04T10:00:00.000Z",completed:!0},{objectId:"broom_1",objectTitle:"Organización de armario",type:"cleaning",category:"Organización",date:"2025-04-09",hours:1.5,notes:"Reorganización y limpieza del armario",timestamp:"2025-04-09T16:00:00.000Z",completed:!0},{objectId:"broom_0",objectTitle:"Limpieza área de estudio",type:"cleaning",category:"Espacio de trabajo",date:"2025-04-13",hours:.75,notes:"Reorganización y limpieza del escritorio",timestamp:"2025-04-13T11:30:00.000Z",completed:!0},{objectId:"broom_1",objectTitle:"Limpieza profunda de cocina",type:"cleaning",category:"Cocina",date:"2025-04-19",hours:2.25,notes:"Limpieza a fondo de la cocina y electrodomésticos",timestamp:"2025-04-19T09:45:00.000Z",completed:!0},{objectId:"broom_0",objectTitle:"Lavandería y plancha",type:"cleaning",category:"Ropa",date:"2025-04-23",hours:1.25,notes:"Lavar y planchar la ropa de la semana",timestamp:"2025-04-23T14:00:00.000Z",completed:!0}]}static generateLeisureActivities(){return[{objectId:"tv_0",objectTitle:"Maratón de serie",type:"leisure",category:"Series",date:"2025-04-01",hours:3.5,notes:"Maratón de la nueva temporada de The Office",timestamp:"2025-04-01T20:00:00.000Z",completed:!0},{objectId:"tv_1",objectTitle:"Sesión de cine",type:"leisure",category:"Películas",date:"2025-04-02",hours:2,notes:"Vimos 'Dune' en el cine",timestamp:"2025-04-02T19:00:00.000Z",completed:!0},{objectId:"tv_2",objectTitle:"Escuchar álbum nuevo",type:"leisure",category:"Música",date:"2025-04-03",hours:1,notes:"Primera escucha del último disco de Coldplay",timestamp:"2025-04-03T17:00:00.000Z",completed:!0},{objectId:"tv_3",objectTitle:"Partida de videojuegos",type:"leisure",category:"Videojuegos",date:"2025-04-04",hours:2.5,notes:"Sesión cooperativa en Zelda: Tears of the Kingdom",timestamp:"2025-04-04T21:00:00.000Z",completed:!0},{objectId:"tv_4",objectTitle:"Documental sobre ciencia",type:"leisure",category:"Documentales",date:"2025-04-05",hours:1.5,notes:"Nueva serie de Netflix sobre el espacio",timestamp:"2025-04-05T18:00:00.000Z",completed:!0},{objectId:"tv_5",objectTitle:"Salida al cine",type:"leisure",category:"Cine",date:"2025-04-06",hours:2,notes:"Cine con amigos para ver 'Barbie'",timestamp:"2025-04-06T19:30:00.000Z",completed:!0},{objectId:"tv_6",objectTitle:"Leer por placer",type:"leisure",category:"Lectura por placer",date:"2025-04-07",hours:1.2,notes:"Capítulos finales de 'El Principito'",timestamp:"2025-04-07T22:00:00.000Z",completed:!0},{objectId:"tv_7",objectTitle:"Relax con podcast",type:"leisure",category:"Otros",date:"2025-04-08",hours:.8,notes:"Escuchando un podcast de filosofía por la tarde",timestamp:"2025-04-08T20:30:00.000Z",completed:!0}]}static generateStudyActivities(){return[{objectId:"study_0_0",objectTitle:"Diseño Centrado en el Usuario",type:"study",category:"Factores Humanos",date:"2025-04-03",hours:2.5,notes:"Análisis de interacción persona-ordenador y principios de usabilidad",timestamp:"2025-04-03T14:00:00.000Z",completed:!0},{objectId:"study_0_1",objectTitle:"Transformadas y Series",type:"study",category:"Análisis Complejo",date:"2025-04-07",hours:3,notes:"Estudio de transformadas de Fourier y series complejas",timestamp:"2025-04-07T10:30:00.000Z",completed:!0},{objectId:"study_0_2",objectTitle:"Desarrollo Web",type:"study",category:"Programación",date:"2025-04-11",hours:2.75,notes:"Prácticas con React y Node.js para aplicaciones web",timestamp:"2025-04-11T15:45:00.000Z",completed:!0},{objectId:"study_1_0",objectTitle:"Alemán B1",type:"study",category:"Idiomas",date:"2025-04-14",hours:1.5,notes:"Práctica de gramática y vocabulario para el examen oficial",timestamp:"2025-04-14T18:00:00.000Z",completed:!0},{objectId:"study_1_1",objectTitle:"Historia Contemporánea",type:"study",category:"Historia",date:"2025-04-18",hours:2,notes:"Revisión de los acontecimientos clave del siglo XX",timestamp:"2025-04-18T17:15:00.000Z",completed:!0},{objectId:"study_1_2",objectTitle:"Física Cuántica",type:"study",category:"Ciencias",date:"2025-04-21",hours:3.25,notes:"Principios fundamentales y mecánica cuántica básica",timestamp:"2025-04-21T09:00:00.000Z",completed:!0},{objectId:"study_2_0",objectTitle:"Estadística Avanzada",type:"study",category:"Matemáticas",date:"2025-04-23",hours:2.5,notes:"Modelos probabilísticos y análisis multivariante",timestamp:"2025-04-23T13:30:00.000Z",completed:!0},{objectId:"study_2_1",objectTitle:"Técnicas de Estudio",type:"study",category:"Otros",date:"2025-04-25",hours:1,notes:"Mejora de metodologías de aprendizaje y gestión del tiempo",timestamp:"2025-04-25T16:00:00.000Z",completed:!0}]}static addAllMockActivities(){const e=this.generateReadingActivities(),t=this.generateWorkActivities(),i=this.generateSportActivities(),s=this.generateCleaningActivities(),r=this.generateLeisureActivities(),o=this.generateStudyActivities();localStorage.setItem("readingActivities",JSON.stringify(e)),localStorage.setItem("workActivities",JSON.stringify(t)),localStorage.setItem("sportActivities",JSON.stringify(i)),localStorage.setItem("cleaningActivities",JSON.stringify(s)),localStorage.setItem("leisureActivities",JSON.stringify(r)),localStorage.setItem("studyActivities",JSON.stringify(o));const a=[...e,...t,...i,...s,...r,...o];return localStorage.setItem("userActivities",JSON.stringify(a)),console.log(`Se han añadido ${a.length} actividades simuladas: 
      - ${e.length} lectura
      - ${t.length} trabajo
      - ${i.length} deporte
      - ${s.length} limpieza
      - ${r.length} ocio
      - ${o.length} estudio`),a}static ensureMockActivitiesExist(){const e=JSON.parse(localStorage.getItem("userActivities"))||[];return e.length===0?this.addAllMockActivities():(console.log(`Ya existen ${e.length} actividades, no se añadirán simuladas`),e)}}class ui{static showProgressAnimation(e,t,i=null){const s=document.createElement("div");s.className="progress-animation-container";const o=`hsl(${this.getHueFromString(e)}, 70%, 50%)`,l=i||(t==="cleaning"?"Limpieza registrada correctamente":t==="reading"?"Lectura registrada correctamente":"Tarea registrada correctamente");s.innerHTML=`
        <div class="progress-animation-content">
          <div class="progress-animation-header">
            <h3>¡Actividad añadida!</h3>
            <p>${l}</p>
          </div>
          
          <div class="progress-item">
            <div class="progress-label">
              <span class="progress-category">${e}</span>
              <span class="progress-percentage">0%</span>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar" style="width: 0%; background-color: ${o}"></div>
            </div>
          </div>
          
          <div class="progress-message">Actualizando progreso...</div>
        </div>
      `,document.body.appendChild(s),setTimeout(()=>{s.classList.add("active"),setTimeout(()=>{const c=s.querySelector(".progress-bar"),u=s.querySelector(".progress-percentage"),h=s.querySelector(".progress-message");let d=0;const f=setInterval(()=>{d>=100?(clearInterval(f),h.textContent="¡Completado!",setTimeout(()=>{s.classList.remove("active"),setTimeout(()=>document.body.removeChild(s),300)},800)):(d+=2,c.style.width=d+"%",u.textContent=d+"%")},15)},300)},10)}static getHueFromString(e){let t=0;for(let i=0;i<e.length;i++)t=e.charCodeAt(i)+((t<<5)-t);return t%360}}if(!document.getElementById("progress-animation-styles")){const n=document.createElement("style");n.id="progress-animation-styles",n.textContent=`
      .progress-animation-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        opacity: 0;
        transform: scale(0.9);
        transition: opacity 0.3s, transform 0.3s;
        pointer-events: none;
        font-family: 'Nunito', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }
      
      .progress-animation-container.active {
        opacity: 1;
        transform: scale(1);
        pointer-events: all;
      }
      
      .progress-animation-content {
        background-color: white;
        border-radius: 12px;
        padding: 24px;
        width: 400px;
        max-width: 90%;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      }
      
      .progress-animation-header {
        text-align: center;
        margin-bottom: 20px;
      }
      
      .progress-animation-header h3 {
        margin: 0 0 8px;
        font-size: 1.5rem;
        color: #2c3e50;
        font-weight: 600;
      }
      
      .progress-animation-header p {
        margin: 0;
        color: #7f8c8d;
        font-size: 1rem;
      }
      
      .progress-item {
        margin-bottom: 20px;
      }
      
      .progress-label {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        font-weight: 500;
      }
      
      .progress-category {
        font-weight: 600;
        color: #2c3e50;
      }
      
      .progress-percentage {
        color: #3498db;
        font-weight: 600;
      }
      
      .progress-bar-container {
        height: 16px;
        background-color: #f5f5f5;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05) inset;
      }
      
      .progress-bar {
        height: 100%;
        border-radius: 8px;
        transition: width 0.1s ease-in-out;
        width: 0%;
      }
      
      .progress-message {
        text-align: center;
        font-size: 14px;
        color: #7f8c8d;
        font-style: italic;
        height: 20px;
      }
    `,document.head.appendChild(n)}class Dc{constructor(){this.modal=null,this.formModal=null,this.currentObject=null,this.onSave=null,this.init(),this.addMockActivities(),document.addEventListener("calendar-task-completed",()=>{this.currentObject&&this.loadObjectStats(this.currentObject.userData.activityType||"reading"),this.loadCategoryStats()}),document.addEventListener("calendar-task-uncompleted",()=>{this.currentObject&&this.loadObjectStats(this.currentObject.userData.activityType||"reading"),this.loadCategoryStats()}),document.addEventListener("study-activity-added",e=>{console.log("[DEBUG] Actividad de estudio añadida:",e.detail.activity),this.currentObject&&this.currentObject.userData.activityType==="study"&&(this.loadObjectStats("study"),this.loadCategoryStats("study"))}),document.addEventListener("study-activity-updated",e=>{console.log("[DEBUG] Actividad de estudio actualizada:",e.detail.activity),this.currentObject&&this.currentObject.userData.activityType==="study"&&(this.loadObjectStats("study"),this.loadCategoryStats("study"))}),document.addEventListener("study-activity-deleted",e=>{console.log("[DEBUG] Actividad de estudio eliminada:",e.detail.activity),this.currentObject&&this.currentObject.userData.activityType==="study"&&(this.loadObjectStats("study"),this.loadCategoryStats("study"))}),document.addEventListener("leisure-activity-added",e=>{console.log("[DEBUG] Actividad de ocio añadida:",e.detail.activity),this.currentObject&&this.currentObject.userData.activityType==="leisure"&&(this.loadObjectStats("leisure"),this.loadCategoryStats("leisure"))}),document.addEventListener("leisure-activity-updated",e=>{console.log("[DEBUG] Actividad de ocio actualizada:",e.detail.activity),this.currentObject&&this.currentObject.userData.activityType==="leisure"&&(this.loadObjectStats("leisure"),this.loadCategoryStats("leisure"))}),document.addEventListener("leisure-activity-deleted",e=>{console.log("[DEBUG] Actividad de ocio eliminada:",e.detail.activity),this.currentObject&&this.currentObject.userData.activityType==="leisure"&&(this.loadObjectStats("leisure"),this.loadCategoryStats("leisure"))}),document.addEventListener("work-activity-added",e=>{console.log("[DEBUG] Actividad de trabajo añadida:",e.detail.activity),this.currentObject&&this.currentObject.userData.activityType==="work"&&(this.loadObjectStats("work"),this.loadCategoryStats("work"))}),document.addEventListener("work-activity-updated",e=>{console.log("[DEBUG] Actividad de trabajo actualizada:",e.detail.activity),this.currentObject&&this.currentObject.userData.activityType==="work"&&(this.loadObjectStats("work"),this.loadCategoryStats("work"))}),document.addEventListener("work-activity-deleted",e=>{console.log("[DEBUG] Actividad de trabajo eliminada:",e.detail.activity),this.currentObject&&this.currentObject.userData.activityType==="work"&&(this.loadObjectStats("work"),this.loadCategoryStats("work"))})}init(){this.modal=document.createElement("div"),this.modal.className="activity-modal hidden",this.modal.setAttribute("role","dialog"),this.modal.setAttribute("aria-modal","true"),this.modal.setAttribute("aria-labelledby","activity-title"),this.modal.innerHTML=`
      <div class="modal-content stats-modal">
        <span class="close-button" aria-label="Cerrar">&times;</span>
        <h2 id="activity-title">Actividad</h2>
        
        <!-- Sección de actividad reciente -->
        <div class="activity-stats">
          <h3>Actividad reciente</h3>
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-value" id="total-hours">0</div>
              <div class="stat-label">Horas totales</div>
            </div>
            <div class="stat-item">
              <div class="stat-value" id="last-session">-</div>
              <div class="stat-label">Última sesión</div>
            </div>
            <div class="stat-item">
              <div class="stat-value" id="sessions-count">0</div>
              <div class="stat-label">Sesiones</div>
            </div>
          </div>
        </div>
        
        <!-- Sección para mostrar las categorías y el progreso -->
        <div class="category-stats">
          <h3>Distribución por categorías</h3>
          <div id="categories-progress" class="categories-container">
            <!-- Aquí se insertarán las barras de progreso -->
            <div class="loading-categories">Cargando datos de categorías...</div>
          </div>
        </div>
        
        <div class="modal-actions">
          <button id="view-history" class="secondary-button">Ver historial</button>
          <button id="add-activity" class="primary-button">Añadir actividad</button>
        </div>
      </div>
    `,document.body.appendChild(this.modal),this.formModal=document.createElement("div"),this.formModal.className="activity-modal hidden",this.formModal.setAttribute("role","dialog"),this.formModal.setAttribute("aria-modal","true"),this.formModal.setAttribute("aria-labelledby","form-title"),this.formModal.setAttribute("aria-describedby","modal-description"),this.formModal.innerHTML=`
        <div class="modal-content">
        <span class="close-button" aria-label="Cerrar">&times;</span>
        <h2 id="form-title">Registrar actividad</h2>
        
        <!-- Contenedor específico para los detalles del objeto para evitar superposición -->
        <div class="object-details-container">
          <p id="form-object-title" class="object-form-title"></p>
          <p id="form-activity-type" class="activity-type-indicator"></p>
        </div>
        
        <div id="modal-description" class="visually-hidden">Formulario para registrar horas de actividad</div>
        
        <div class="activity-form">
          <div class="form-group">
            <label for="activity-category">Categoría:</label>
            <select id="activity-category" aria-required="true" aria-label="Categoría de la actividad">
              <!-- Las opciones se llenarán dinámicamente según el tipo de actividad -->
            </select>
          </div>
          
          <!-- Nuevo campo de texto personalizado, inicialmente oculto -->
          <div class="form-group custom-category-group hidden" id="custom-category-container">
            <label for="custom-category">Tu categoría:</label>
            <input type="text" id="custom-category" placeholder="Introduce la categoría personalizada" 
              aria-label="Categoría personalizada">
          </div>
          
          <div class="form-group">
            <label for="activity-date">Fecha:</label>
            <input type="date" id="activity-date" aria-required="true" aria-label="Fecha de la actividad">
          </div>
          <div class="form-group">
            <label for="activity-hour">Hora:</label>
            <select id="activity-hour" aria-label="Hora de la actividad">
              <option value="0">00:00</option>
              <option value="1">01:00</option>
              <option value="2">02:00</option>
              <option value="3">03:00</option>
              <option value="4">04:00</option>
              <option value="5">05:00</option>
              <option value="6">06:00</option>
              <option value="7">07:00</option>
              <option value="8">08:00</option>
              <option value="9">09:00</option>
              <option value="10">10:00</option>
              <option value="11">11:00</option>
              <option value="12">12:00</option>
              <option value="13">13:00</option>
              <option value="14">14:00</option>
              <option value="15">15:00</option>
              <option value="16">16:00</option>
              <option value="17">17:00</option>
              <option value="18">18:00</option>
              <option value="19">19:00</option>
              <option value="20">20:00</option>
              <option value="21">21:00</option>
              <option value="22">22:00</option>              
              <option value="23">23:00</option>
            </select>
          </div>
          <div class="form-group">
            <label for="activity-time">Horas de actividad:</label>
            <input type="number" id="activity-time" min="0.25" max="24" step="0.25" value="1" aria-required="true" aria-label="Horas de actividad">
          </div>
          <div class="form-group">
            <label for="activity-notes">Notas:</label>
            <textarea id="activity-notes" rows="3" aria-label="Notas sobre la actividad"></textarea>
          </div>
          
          <!-- Botón para mostrar/ocultar campos adicionales -->
          <button type="button" id="show-more-activity-fields" class="secondary-button">Añadir más datos</button>
          
          <!-- Sección adicional inicialmente oculta -->
          <div id="additional-activity-fields" class="additional-fields" style="display: none;">
            <div class="form-group">
              <label for="activity-location">Ubicación:</label>
              <input type="text" id="activity-location" placeholder="Dirección o ubicación" aria-label="Ubicación de la actividad">
            </div>
            <div class="form-group">
              <label for="activity-urgency">Nivel de urgencia:</label>
              <select id="activity-urgency" aria-label="Nivel de urgencia de la actividad">
                <option value="baixa">Baja</option>
                <option value="normal" selected>Normal</option>
                <option value="alta">Alta</option>
                <option value="urgent">Urgente</option>
              </select>
            </div>
            <div class="form-group">
              <label for="activity-url">URL relacionado:</label>
              <input type="url" id="activity-url" placeholder="https://..." aria-label="URL relacionado con la actividad">
            </div>
            <div class="form-group">
              <label for="activity-guests">Invitados:</label>
              <input type="text" id="activity-guests" placeholder="Nombres separados por comas" aria-label="Personas invitadas a la actividad">
            </div>
          </div>
          
          <button id="save-activity" class="save-button">Guardar actividad</button>
        </div>
      </div>
    `,document.body.appendChild(this.formModal),this.modal.querySelector(".close-button").addEventListener("click",()=>this.hide()),this.modal.querySelector("#view-history").addEventListener("click",()=>this.showHistory()),this.modal.querySelector("#add-activity").addEventListener("click",()=>this.showActivityForm()),this.formModal.querySelector(".close-button").addEventListener("click",()=>{this.formModal.classList.add("hidden"),this.modal.classList.remove("hidden")}),this.formModal.querySelector("#save-activity").addEventListener("click",()=>this.saveActivity()),document.addEventListener("keydown",m=>{m.key==="Escape"&&(this.formModal.classList.contains("hidden")?this.modal.classList.contains("hidden")||this.hide():(this.formModal.classList.add("hidden"),this.modal.classList.remove("hidden")))});const o=this.formModal.querySelector("#show-more-activity-fields"),a=this.formModal.querySelector("#additional-activity-fields");o.addEventListener("click",()=>{a.style.display==="none"?(a.style.display="block",a.style.maxHeight="0",a.style.overflow="hidden",a.style.transition="max-height 0.5s ease-in-out, opacity 0.4s ease-in-out",a.style.opacity="0",a.offsetHeight,a.style.maxHeight="800px",a.style.opacity="1",o.textContent="Mostrar menos datos",setTimeout(()=>{a.scrollIntoView({behavior:"smooth",block:"nearest"})},100)):(a.style.maxHeight="0",a.style.opacity="0",setTimeout(()=>{a.style.display="none"},400),o.textContent="Añadir más datos")});const l=this.formModal.querySelector("#activity-date"),u=new Date().toISOString().split("T")[0];l.value=u,l.setAttribute("max",u);const h=l.closest(".form-group"),d=document.createElement("div");d.className="date-limit-indicator",d.style.color="#616161",d.innerHTML=`
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" style="fill: #616161;">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
      <span>Solo puedes registrar actividades ya completadas</span>
    `,h.appendChild(d);const f=this.formModal.querySelector("#activity-category");f.addEventListener("change",()=>{const m=this.formModal.querySelector("#custom-category-container");f.value==="Otros"?(m.classList.remove("hidden"),setTimeout(()=>{this.formModal.querySelector("#custom-category").focus()},100)):m.classList.add("hidden")})}show(e){this.currentObject=e;const t=e.userData.type||"item",i=e.userData.activityType||"general";console.log(`Mostrando modal para ${t} (${i})`);const s=this.modal.querySelector("#activity-title");s.textContent=this.getActivityTypeTitle(i)||"Actividad",this.loadObjectStats(i),this.loadCategoryStats(i),this.modal.classList.remove("hidden")}getActivityTypeTitle(e){return{reading:"Lectura",work:"Trabajo",sport:"Actividad física",cleaning:"Limpieza",leisure:"Tiempo libre",study:"Estudio"}[e]||"Actividad"}getCategoriesForActivityType(e){const t=`${e}Activities`,i=JSON.parse(localStorage.getItem(t))||[],s=JSON.parse(localStorage.getItem("calendar-tasks"))||{},r=[];Object.values(s).forEach(c=>{c.forEach(u=>{u.activityType===e&&u.category&&r.push(u.category)})});const o={reading:["Literatura Fantástica","Ciencia Ficción"],work:["Desarrollo","Reuniones"],sport:["Gimnasio","Correr"],cleaning:["Mantenimiento hogar","Organización"],leisure:["Series","Películas"],study:["Programación","Idiomas"]},a=new Set;i.forEach(c=>{c.category&&a.add(c.category)}),r.forEach(c=>a.add(c)),a.size===0&&o[e]&&o[e].forEach(c=>a.add(c));const l=Array.from(a).sort();if(!l.includes("Otros"))l.push("Otros");else{const c=l.indexOf("Otros");l.splice(c,1),l.push("Otros")}return l.length>0?l:["General","Otros"]}hide(){this.modal.classList.add("hidden"),this.formModal.classList.add("hidden"),this.currentObject=null}showActivityForm(){this.modal.classList.add("hidden"),this.currentObject.userData.type;const e=this.currentObject.userData.activityType||"general",t=this.formModal.querySelector("#form-object-title");t.textContent=this.currentObject.userData.title||"Actividad";const i=this.formModal.querySelector("#form-activity-type");i.textContent=`Tipo: ${this.getActivityTypeTitle(e)}`,this.updateCategoryOptions(e);const s=this.formModal.querySelector("#form-title");s.textContent=`Registrar ${this.getActivityTypeTitle(e).toLowerCase()}`,this.formModal.classList.remove("hidden"),setTimeout(()=>{this.formModal.querySelector("#activity-date").focus()},100)}updateCategoryOptions(e){const t=this.formModal.querySelector("#activity-category"),i=this.formModal.querySelector("#custom-category-container");t.innerHTML="";const s=this.getCategoriesForActivityType(e);let r=null;if(s.forEach(o=>{if(o!=="Otros"){const a=document.createElement("option");a.value=o,a.textContent=o,t.appendChild(a)}else r=o}),r){const o=document.createElement("option");o.value=r,o.textContent=r,t.appendChild(o)}this.currentObject.userData.category&&s.includes(this.currentObject.userData.category)&&(t.value=this.currentObject.userData.category),t.value==="Otros"?i.classList.remove("hidden"):i.classList.add("hidden")}showHistory(){const e=this.currentObject.userData.activityType||"reading";this.currentObject.userData.id,console.log(`Mostrando el historial de ${this.currentObject.userData.title} (${e})`);const t=this.getActivitiesByActivityType(e);if(t.length>0){let i=`Historial de actividades para "${this.currentObject.userData.title}":

`;t.forEach((s,r)=>{const o=new Date(s.date).toLocaleDateString("es-ES");i+=`${r+1}. ${o}: ${s.hours} horas - ${s.category}
`,s.notes&&(i+=`   Notas: ${s.notes}
`)}),alert(i)}else alert(`Aún no hay actividades registradas para "${this.currentObject.userData.title}".`)}loadObjectStats(e){const t=new Date;t.setHours(0,0,0,0);const i=this.getActivitiesByActivityType(e);console.log(`[DEBUG] Total actividades ${e} encontradas:`,i.length),console.log("[DEBUG] Primeras 3 actividades:",i.slice(0,3));const s=i.filter(c=>{const u=new Date(c.date||c.timestamp);return u.setHours(0,0,0,0),u<=t&&c.completed!==!1}),r=this.modal.querySelector("#total-hours"),o=this.modal.querySelector("#last-session"),a=this.modal.querySelector("#sessions-count"),l=s.reduce((c,u)=>{const h=parseFloat(u.hours||u.duration||0);return console.log(`[DEBUG] Actividad ${u.category}, horas: ${h} (original: ${u.hours||u.duration})`),c+(isNaN(h)?0:h)},0);if(console.log(`[DEBUG] Total horas calculadas: ${l}`),r&&(r.textContent=l.toFixed(1)),a&&(a.textContent=s.length),o&&s.length>0){const u=[...s].sort((d,f)=>new Date(f.date||f.timestamp)-new Date(d.date||d.timestamp))[0],h=new Date(u.date||u.timestamp).toLocaleDateString("es-ES",{day:"numeric",month:"short"});o.textContent=h}else o&&(o.textContent="-");this._objectActivities=s,this._totalActivitiesHours=l,this._activitiesSessions=s.length}loadCategoryStats(e){const t=e||this.currentObject&&this.currentObject.userData.activityType||"reading",i=`${t}Activities`,s=JSON.parse(localStorage.getItem(i))||[],r=JSON.parse(localStorage.getItem("calendar-tasks"))||{},o=[];Object.entries(r).forEach(([d,f])=>{f.forEach(m=>{(m.completed&&m.activityType===t||m.sourceType===t)&&o.push({category:m.category||"Otros",hours:m.duration||1,timestamp:m.createdAt||new Date().toISOString()})})});const a=[...s,...o];if(a.length===0){const d=this.modal.querySelector("#categories-progress");d.innerHTML=`
        <p class="no-data-message">Aún no hay actividades registradas.</p>
      `;return}const l={};let c=0;a.forEach(d=>{const f=d.category||"Otros";l[f]||(l[f]=0);const m=parseFloat(d.hours||d.duration||0);l[f]+=isNaN(m)?0:m,c+=isNaN(m)?0:m});const u=Math.max(...Object.values(l)),h=this.modal.querySelector("#categories-progress");h.innerHTML="",Object.entries(l).sort((d,f)=>f[1]-d[1]).forEach(([d,f])=>{const m=c>0?(f/c*100).toFixed(1):"0.0",v=u>0?Math.round(f/u*100):0,g=f.toFixed(1),p=document.createElement("div");p.className="category-item";const b=`hsl(${this.getHueFromString(d)}, 70%, 50%)`;p.innerHTML=`
          <div class="category-label">
            <span class="category-name">${d}</span>
            <span class="category-percentage">${m}%</span>
          </div>
          <div class="progress-container">
            <div class="progress-bar" style="width: ${v}%; background-color: ${b}"></div>
          </div>
          <div class="category-hours">${g} horas</div>
        `,h.appendChild(p)})}getHueFromString(e){let t=0;for(let i=0;i<e.length;i++)t=e.charCodeAt(i)+((t<<5)-t);return t%360}getActivitiesByActivityType(e){const t=`${e}Activities`,i=JSON.parse(localStorage.getItem(t))||[];console.log(`[DEBUG] Actividades directas de tipo ${e}:`,i.length);const s=JSON.parse(localStorage.getItem("calendar-tasks"))||{},r=[];Object.entries(s).forEach(([a,l])=>{l.forEach(c=>{if(c.sourceType===e){const[u,h,d]=a.split("-").map(Number),f=parseFloat(c.duration||c.hours||1);r.push({category:c.category||"Otros",date:`${u}-${h.toString().padStart(2,"0")}-${d.toString().padStart(2,"0")}`,hours:f,duration:f,timestamp:c.createdAt,completed:c.completed||!1})}})}),console.log(`[DEBUG] Actividades de calendario de tipo ${e}:`,r.length);const o=[...i,...r];if(o.length>0){const a=o[0];console.log(`[DEBUG] Ejemplo de actividad ${e}:`,{category:a.category,hours:a.hours,duration:a.duration})}return o}setOnSave(e){this.onSave=e}saveActivity(){if(!this.currentObject)return;const e=this.currentObject.userData.activityType||"reading",t=this.formModal.querySelector("#activity-category"),i=this.formModal.querySelector("#custom-category"),s=this.formModal.querySelector("#activity-date"),r=this.formModal.querySelector("#activity-hour"),o=this.formModal.querySelector("#activity-time"),a=this.formModal.querySelector("#activity-notes"),l=parseFloat(o.value);this.currentObject.userData.type;let c=t.value;c==="Otros"&&i.value.trim()&&(c=i.value.trim());const u=new Date(s.value);u.setHours(parseInt(r.value,10),0,0);const h=u.toISOString(),d={objectId:this.currentObject.userData.id,objectTitle:this.currentObject.userData.title,type:e,category:c,date:s.value,hour:parseInt(r.value,10),hours:l,duration:l,notes:a.value,timestamp:h,completed:!0,sourceType:e};console.log(`[DEBUG] Guardando actividad ${e}:`,d);const f=this.formModal.querySelector("#additional-activity-fields");f&&f.style.display!=="none"&&(locationInput&&(d.location=locationInput.value),urgencySelect&&(d.urgency=urgencySelect.value),urlInput&&(d.url=urlInput.value),guestsInput&&(d.guests=guestsInput.value));const m=`${e}Activities`,v=JSON.parse(localStorage.getItem(m))||[];v.push(d),localStorage.setItem(m,JSON.stringify(v));const g=JSON.parse(localStorage.getItem("userActivities"))||[];g.push(d),localStorage.setItem("userActivities",JSON.stringify(g));const p=new CustomEvent(`${e}-activity-added`,{detail:{activity:d}});document.dispatchEvent(p);const S=new CustomEvent(`${e}-object-update-needed`,{detail:{type:e,activity:d}});document.dispatchEvent(S);const b=new CustomEvent("activity-added",{detail:{type:e,activity:d}});document.dispatchEvent(b),this.loadObjectStats(e),this.loadCategoryStats(e),this.formModal.classList.add("hidden"),ui.showProgressAnimation(d.category,e),setTimeout(()=>{this.loadObjectStats(e),this.loadCategoryStats(e),this.modal.classList.remove("hidden")},2800)}addMockActivities(){hf.ensureMockActivitiesExist()}}function df(n,e,t,i){const{shelfX:s,shelfY:r,shelfZ:o,shelfWidth:a,shelfDepth:l,isParallelToWall:c=!1,shelfIndex:u=0}=e,h=[];if(!c||u>=2)return h;n.traverse(P=>{P.userData&&P.userData.type==="book"&&P.userData.shelfIndex===u&&(n.remove(P),P.geometry&&P.geometry.dispose(),P.material&&P.material.dispose&&P.material.dispose())});const f=["#314823","#a68d53","#a63b15","#2F4F6E","#7B2D26","#3A6F68","#444444","#F4F1E6"].map(P=>new we({color:new ze(P),roughness:.8,metalness:.1})),m=l*.99,v=.05,g=.005,p=Math.floor(m/(v+g)),S=Math.min(p,i);if(S<=0)return h;const b=-m/2+v/2,_=new Ye;_.userData={id:`bookshelf_${u}`,type:"bookCollection",title:"Col·lecció de llibres de lectura"},_.position.set(s,r,o);for(let P=0;P<S;P++){const C=t[P],T=v*(.8+Math.random()*.4),R=.3+Math.random()*.05,w=a*.75*(.7+Math.random()*.3);let x=0;const D=C.objectId||C.objectTitle||`book_${P}`;for(let O=0;O<D.length;O++)x=(x<<5)-x+D.charCodeAt(O),x=x&x;const Y=Math.abs(x)%f.length,N=f[Y],H=new ye(w,R,T),$=new W(H,N);$.userData={id:C.objectId,title:C.objectTitle||`Llibre: ${C.category||"General"}`,type:"book",category:C.category||"Lectura General",activityType:"reading",shelfIndex:u,colorIndex:Y},$.isInteractive=!0;const G=b+P*(v+g)+T/2;$.position.set((a-w)*(.1+Math.random()*.3),R/2,G);const X=x%100/1e3;$.rotation.y=X*.08,$.rotation.x=X*.5*.03,_.add($),h.push($)}return n.add(_),h}function TS(n,e,t=[],i){const{shelfX:s,shelfY:r,shelfZ:o,shelfWidth:a,shelfDepth:l,isParallelToWall:c=!1,shelfIndex:u=0}=e,h=[];if(!c||u<2)return h;n.traverse(T=>{T.userData&&T.userData.type==="folder"&&T.userData.shelfIndex===u&&(n.remove(T),T.geometry&&T.geometry.dispose(),T.material&&T.material.dispose&&T.material.dispose())}),console.log(`Creant carpetes basades en ${t.length} activitats de treball`);let d=t;d.length===0&&u===2&&(d=[{objectId:`sample_folder_${u}_0`,objectTitle:"Carpeta de mostra",type:"work",category:"Documents",date:new Date().toISOString(),hours:0}]);const f=new we({color:new ze("#111111"),roughness:.7,metalness:.05}),v=["#FFFFFF","#FFDDCC","#DDFFDD","#CCDDFF","#FFFFCC","#CCFFFF","#FFCCFF","#EEEEDD"].map(T=>new we({color:new ze(T),roughness:.6,metalness:0})),g=l*.99,p=.06,S=.005,b=Math.floor(g/(p+S)),_=Math.min(b,i);if(_<=0)return h;const P=-1.4849999999999999/2+p/2,C=new Ye;C.userData={id:`foldershelf_${u}`,type:"folderCollection",title:"Col·lecció de carpetes de treball"},C.position.set(s,r,o),n.add(C);for(let T=0;T<_;T++){const R=d[T],w=.4,x=a*.675,D=new Ye,Y=new ye(x,w,p),N=new W(Y,f);N.isInteractive=!0,N.userData={id:R.objectId,type:"folder",title:R.objectTitle||`Carpeta: ${R.category||"Documents"}`,category:R.category||"Documents",activityType:"work",shelfIndex:u,onClick:te=>{new Dc().show(te)}},D.add(N);let H=0;const $=R.objectId||R.objectTitle||`folder_${T}`;for(let te=0;te<$.length;te++)H=(H<<5)-H+$.charCodeAt(te),H=H&H;const G=Math.abs(H)%v.length,X=v[G],O=x*.2,ne=w*.5,he=.005,me=new ye(O,ne,he),_e=new W(me,X);_e.position.set(x/2,w/8,0),_e.rotation.y=Math.PI/2,D.add(_e),D.position.set((a-x)*.2,w/2,P+T*(p+S));const Ue=H%100/1e3;D.rotation.y=Ue*.05,D.userData={id:`folder_group_${R.objectId}`,type:"folderWithLabel",isInteractiveGroup:!0,labelColorIndex:G},C.add(D),h.push(D)}return h}function _h(n,e,t=!1){t&&n.traverse(G=>{G.userData&&(G.userData.type==="book"||G.userData.type==="folder"||G.userData.type==="bookCollection")&&(n.remove(G),G.geometry&&G.geometry.dispose(),G.material&&G.material.dispose&&G.material.dispose())});const{width:i,wallThickness:s}=e,{tableWoodMaterial:r}=Ji(),o=1.6,a=2.5,l=.35,c=.025,u=-(i-s)/2+l/2,h=a/2,d=-(i-s)/3+2.8,f=new ye(c,a,o),m=new W(f,r);m.position.set(u-l/2+c/2,h,d),n.add(m);const v=new ye(l,a,c),g=new W(v,r);g.position.set(u,h,d+o/2-c/2),n.add(g);const p=new W(v,r);p.position.set(u,h,d-o/2+c/2),n.add(p);const S=[],b=4,_=new ye(l,c,o-2*c),P=a/(b+1),C=new W(_,r);C.position.set(u,h+a/2-c/2,d),n.add(C),S.push(C);const T=JSON.parse(localStorage.getItem("readingActivities"))||[],R=JSON.parse(localStorage.getItem("workActivities"))||[];console.log(`Creant estanteria amb ${T.length} activitats de lectura i ${R.length} activitats de treball`);let w=T.length,x=R.length;const D=.05,Y=.06,N=.005,H=Math.floor(o*.99/(D+N)),$=Math.floor(o*.99/(Y+N));for(let G=0;G<b;G++){const X=new W(_,r),O=h-a/2+P*(G+1);X.position.set(u,O,d),n.add(X),S.push(X);const ne={shelfX:u,shelfY:O+c,shelfZ:d,shelfWidth:l-.05,shelfDepth:o-2*c-.05,isParallelToWall:!0,shelfIndex:G};G<=1?(df(n,ne,T,w),w=Math.max(0,w-H)):(TS(n,ne,R,x),x=Math.max(0,x-$))}return{shelves:S}}function AS(n){const e=new Sv(16769202,1);n.add(e);const t=new Mv(16772829,1.2);t.position.set(2,4,-2),t.castShadow=!0,t.shadow.mapSize.width=2048,t.shadow.mapSize.height=2048,t.shadow.camera.near=.5,t.shadow.camera.far=20,t.shadow.normalBias=.05,n.add(t);const i=new zl(16768409,2,8,2);i.position.set(2,1.5,2),i.castShadow=!0,i.shadow.mapSize.width=1024,i.shadow.mapSize.height=1024,n.add(i);const s=new zl(16770244,.5,10,2);s.position.set(-2,2,-2),n.add(s);const r=new _v(16775393,526368,.3);return n.add(r),{ambientLight:e,mainLight:t,deskLight:i,accentLight:s,hemiLight:r}}function CS(n,e){const{width:t,wallThickness:i}=e;Ji();const s=.5,r=.7,o=.03,a=RS(),l=-(t-i)/6-1,c=1.8,u=-2.33,h=new ye(o,r,s),d=[new At({map:a}),new At({color:13421772}),new At({color:13421772}),new At({color:13421772}),new At({color:13421772}),new At({color:13421772})],f=new W(h,d);return f.position.set(l,c,u),f.rotation.y=-Math.PI/2,f.userData.type="calendar",f.userData.isInteractive=!0,f.userData.title="Calendario",n.add(f),f}function RS(){const n=document.createElement("canvas");n.width=512,n.height=724;const e=n.getContext("2d");e.fillStyle="#FFFFFF",e.fillRect(0,0,n.width,n.height);const t=new Date,i=t.getFullYear(),s=t.getMonth(),r=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];e.fillStyle="#FF5733",e.fillRect(0,0,n.width,100),e.font="bold 40px Arial",e.fillStyle="#FFFFFF",e.textAlign="center",e.fillText(`${r[s]} ${i}`,n.width/2,60);const o=new Date(i,s+1,0).getDate(),a=new Date(i,s,1).getDay(),l=["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];e.font="24px Arial",e.fillStyle="#333333";const c=n.width/7,u=140;for(let g=0;g<7;g++)e.fillText(l[g],g*c+c/2,u);e.font="30px Arial";const h=180,d=(n.height-h)/6;let f=1,m=t.getDate();for(let g=0;g<6&&f<=o;g++)for(let p=0;p<7&&f<=o;p++){if(g===0&&p<a)continue;const S=p*c+c/2,b=h+g*d+30;f===m?(e.fillStyle="#FF5733",e.beginPath(),e.arc(S,b-15,20,0,Math.PI*2),e.fill(),e.fillStyle="#FFFFFF"):e.fillStyle="#333333",e.fillText(f.toString(),S,b),f++}const v=new qd(n);return v.needsUpdate=!0,v}function xh(n,e={}){const{position:t={x:0,y:0,z:0},weight:i=5,color:s=3355443,barColor:r=11053224,isDetailed:o=!0,type:a="dumbbell"}=e,l=new Ye,c=1.3,u=Math.min(.8,i/15),h=.08*(1+u*.4)*c,d=.025*(1+u*.2)*c,f=.4*c,m=.015*c,v=.02*c,g=new we({color:s,roughness:.6,metalness:.3}),p=new we({color:r,roughness:.2,metalness:.8}),S=new we({color:2236962,roughness:.9,metalness:.1});function b(x){x.isMesh&&(x.userData={type:a,isInteractive:!0,activityType:"sport",title:"Deporte",description:`Una mancuerna de ${i} kilogramos`,action:"examine"})}const _=new qe(m,m,f,16);_.rotateX(Math.PI/2);const P=new W(_,p);if(b(P),l.add(P),o){const x=new qe(v,v,f*.4,16);x.rotateX(Math.PI/2);const D=new W(x,S);b(D),l.add(D)}const C=new qe(h,h,d,32);C.rotateX(Math.PI/2);const T=new W(C,g);T.position.z=-.52/2+d/2,b(T),l.add(T);const R=new qe(h,h,d,32);R.rotateX(Math.PI/2);const w=new W(R,g);if(w.position.z=f/2-d/2,b(w),l.add(w),o){const x=h*.8,D=d*.5,Y=new qe(x,x,D,32);Y.rotateX(Math.PI/2);const N=new W(Y,g);N.position.z=-.52/2+d+D/2,b(N),l.add(N);const H=new qe(x,x,D,32);H.rotateX(Math.PI/2);const $=new W(H,g);$.position.z=f/2-d-D/2,b($),l.add($)}return l.userData={isInteractiveGroup:!0,type:a},l.position.set(t.x,t.y,t.z),n.add(l),l}function PS(n,e={}){let{position:t={x:0,y:0,z:0},size:i={width:1.2,height:.7,depth:.025},screenColor:s=0,frameColor:r=1118481,isOn:o=!0,standType:a="modern"}=e;const l=new Ye,c=new Kn({color:r,roughness:.3,metalness:.7,clearcoat:.5,clearcoatRoughness:.2}),u=new Kn({color:s,roughness:.05,metalness:.9,clearcoat:1,clearcoatRoughness:.03,reflectivity:1,emissive:o?2236979:0,emissiveIntensity:o?.15:0}),h=new Kn({color:r,roughness:.2,metalness:.8,clearcoat:.3}),d=i.width,f=i.height,m=i.depth*1.2,v=.015,g=new wr;g.moveTo(v,0),g.lineTo(d-v,0),g.quadraticCurveTo(d,0,d,v),g.lineTo(d,f-v),g.quadraticCurveTo(d,f,d-v,f),g.lineTo(v,f),g.quadraticCurveTo(0,f,0,f-v),g.lineTo(0,v),g.quadraticCurveTo(0,0,v,0);const p={depth:m,bevelEnabled:!0,bevelThickness:.008,bevelSize:.006,bevelSegments:3},S=new zo(g,p);function b(B){B.isMesh&&(B.userData={type:"tv",isInteractive:!0,title:"Oci",activityType:"leisure",description:"Una televisió moderna",action:"toggleTV"})}const _=new W(S,c);_.position.x=-d/2,_.position.y=-f/2,_.position.z=-m/2,b(_),l.add(_);const P=.018,C=d-P*2,T=f-P*2,R=new ko(Math.min(C,T)*.995*.5,Math.min(C,T)*.5,64),w=new At({color:0,transparent:!0,opacity:.8,side:kt}),x=new W(R,w);x.rotation.x=-Math.PI/2,x.position.z=m/2+.001,b(x),l.add(x);const D=32,Y=new hn(C,T,D,D),N=.003,H=Y.attributes.position.array;for(let B=0;B<H.length;B+=3){const M=H[B];H[B+2]=N*(M*M)}const $=new W(Y,u);b($),$.position.z=m/2-.002,l.add($);const G=C+.004,X=T+.004,O=new hn(G,X),ne=new Kn({color:328965,roughness:.1,metalness:.9,clearcoat:.8}),he=new W(O,ne);he.position.z=m/2-.001,b(he),l.add(he);const me=d*.4,_e=.01,Ue=.3,te=new ye(me,_e,Ue),re=new W(te,h);re.position.y=-f/2-.08,re.position.z=m,b(re),l.add(re);const de=.08,le=.02,Ce=.02,Te=new ye(le,de,Ce),De=new W(Te,h);De.position.y=-f/2-de/2,De.position.z=-m/2,b(De),l.add(De);const Ge=.005,I=new Fn(Ge,16),U=new At({color:o?4521796:3355443,transparent:!0,opacity:o?.8:.3}),E=new W(I,U);E.position.set(0,-f/2+.004,m/2+.015),b(E),l.add(E);const ae=.03,F=new hn(ae,ae/3),k=new At({color:13421772,transparent:!0,opacity:.2}),V=new W(F,k);V.position.set(0,-f/2+.03,m/2+.015),b(V),l.add(V),l.userData={isInteractiveGroup:!0,type:"tv"},l.position.set(t.x,t.y,t.z);const ee=()=>{if(o=!o,o){const B=new ze(17);u.emissive=B;let M=0;const y=.15,L=800,j=Date.now();U.color.set(4521796),U.opacity=.8;const Z=()=>{const Q=Date.now()-j,xe=Math.min(Q/L,1);M=xe*y,u.emissiveIntensity=M,xe<1?requestAnimationFrame(Z):u.emissive.set(2236979)};Z()}else u.emissive.set(0),u.emissiveIntensity=0,U.color.set(3355443),U.opacity=.3};return n.add(l),{tvGroup:l,togglePower:ee}}function DS(n,e={}){let{position:t={x:2,y:0,z:2},color:i=14540253,height:s=1.5,intensity:r=1,isOn:o=!0}=e;const a=new Ye,l=new qe(.15,.18,.05,32),c=new we({color:3355443,roughness:.5,metalness:.7}),u=new W(l,c),h=new qe(.025,.025,s-.3,16),d=new we({color:2236962,roughness:.5,metalness:.8}),f=new W(h,d);f.position.y=(s-.3)/2;const m=new we({color:i,roughness:.5,emissive:o?16777198:0,emissiveIntensity:o?.5:0,side:kt}),v=new qe(.2,.3,.4,32,1,!0),g=new W(v,m);g.position.y=s-.2;const p=new zl(16777198,o?r:0,4,2);return p.position.y=s-.2,p.castShadow=!0,p.shadow.mapSize.width=512,p.shadow.mapSize.height=512,a.add(u),a.add(f),a.add(g),a.add(p),a.position.set(t.x,t.y,t.z),n.add(a),{lampGroup:a,toggle:()=>{o=!o,m.emissiveIntensity=o?.5:0,p.intensity=o?r:0}}}function LS(n,e={}){const{position:t={x:0,y:0,z:0},size:i="medium",type:s="indoor"}=e,r=new Ye,o=new we({color:13336165,roughness:.8}),a=new we({color:3877153,roughness:1}),l=new we({color:s==="succulent"?8368255:5868620,roughness:.8,metalness:.1});let c,u,h;switch(i){case"small":c=.12,u=.15,h=.3;break;case"large":c=.25,u=.3,h=.8;break;case"medium":default:c=.18,u=.22,h=.5}const d=new qe(c,c*.8,u,16),f=new W(d,o);r.add(f);const m=new qe(c*.95,c*.95,u*.1,16),v=new W(m,a);if(v.position.y=u*.45,r.add(v),s==="indoor"){const g=i==="small"?4:i==="medium"?6:8;for(let p=0;p<g;p++){const S=h*(.5+Math.random()*.5),b=new qe(.01,.01,S,8),_=new W(b,new we({color:5868620})),P=p*Math.PI*2/g,C=c*.5;_.position.x=Math.sin(P)*C,_.position.z=Math.cos(P)*C,_.position.y=u*.5+S*.5,_.rotation.x=(Math.random()-.5)*.3,_.rotation.z=(Math.random()-.5)*.3;const T=c*(.8+Math.random()*.4),R=new Mt(T,8,8),w=new W(R,l);w.scale.set(1,.2,1),w.position.y=S*.5,_.add(w),r.add(_)}}else if(s==="succulent"){const g=i==="small"?2:i==="medium"?3:4;for(let p=0;p<g;p++){const S=c*(1-p*.2),b=u*.5+p*(h/g),_=6+p*2;for(let P=0;P<_;P++){const C=P*Math.PI*2/_,T=new Mt(S*.4,8,8),R=new W(T,l);R.scale.set(.7,.5,1.5),R.position.x=Math.sin(C)*S*.8,R.position.z=Math.cos(C)*S*.8,R.position.y=b,R.rotation.y=C,R.rotation.x=Math.PI/4,r.add(R)}}}else if(s==="tall"){const g=new qe(.03,.04,h,8),p=new W(g,new we({color:6111287}));p.position.y=u*.5+h*.5,r.add(p);for(let S=0;S<3;S++){const b=u*.5+h*(.5+S*.15),_=h*(.4-S*.1);for(let P=0;P<4;P++){const C=P*Math.PI/2+S*Math.PI/6,T=new Ye,R=new qe(.01,.01,_,8);R.translate(0,_/2,0),R.rotateX(Math.PI/2);const w=new W(R,new we({color:8217415}));for(let x=0;x<3;x++){const D=new Mt(.08,8,8),Y=new W(D,l);Y.scale.set(1,.2,1),Y.position.set(0,0,_*(.2+x*.3)),w.add(Y)}T.add(w),T.position.y=b,T.rotation.y=C,p.add(T)}}}return r.position.set(t.x,t.y,t.z),n.add(r),r}function IS(n,e={}){let{position:t={x:0,y:0,z:0},type:i="gaming",isOn:s=!0,rotation:r=0,screenColor:o=26316,hasRGB:a=!0}=e;const l=new Ye;function c(h){h.isMesh&&(h.userData={type:"computer",isInteractive:!0,title:"Estudis",activityType:"study",description:"Un ordinador potent",action:"toggleComputer",onClick:d=>{new Dc().show(d)}})}if(i==="desktop"||i==="gaming"){const h=new Ye,d=.9,f=.5,m=.05,v=new we({color:1118481,roughness:.2,metalness:.8}),g=new we({color:s?o:1118481,roughness:.1,metalness:.5,emissive:s?o:0,emissiveIntensity:s?.4:0}),p=new ye(d,f,m),S=new W(p,v);c(S);const b=.03,_=d-b*2,P=f-b*2,C=new hn(_,P),T=new W(C,g);T.position.z=m/2+.001,c(T),S.add(T);const R=new hn(.1,.02),w=new we({color:13421772,roughness:.3,metalness:.8}),x=new W(R,w);x.position.y=-.5/2+.02,x.position.z=m/2+.001,c(x),S.add(x);const D=new we({color:2236962,roughness:.3,metalness:.7}),Y=.4,N=new ye(Y,.02,.25);N.translate(0,-.01,0);const H=new W(N,D);c(H);const $=new ye(.05,.4,.05);$.translate(0,.2,0);const G=new W($,D);c(G),H.add(G);const X=new ye(.2,.1,.05),O=new W(X,D);O.position.y=.4,c(O),G.add(O),S.position.y=.05,O.add(S);const ne=new Ye;let he=new we({color:2236962,roughness:.3,metalness:.8});if(i==="gaming"){const j=new ye(.3,.5,.45),Z=new W(j,he);c(Z);const Q=new hn(.3-.01,.5-.01),xe=new we({color:1118481,roughness:.2,metalness:.9}),ce=new W(Q,xe);if(ce.position.z=.45/2+.001,c(ce),Z.add(ce),a){const pe=new hn(.01,.45),be=new we({color:16711935,emissive:16711935,emissiveIntensity:1,transparent:!0,opacity:.9}),Ne=new W(pe,be);Ne.position.x=-.15+.03,Ne.position.z=.45/2+.002,c(Ne),Z.add(Ne);const ge=.08,Ie=new Fn(ge,16),Oe=new we({color:3355443,transparent:!0,opacity:.7});for(let $e=0;$e<2;$e++){const q=new W(Ie,Oe);q.position.z=.45/2+.002,q.position.y=.1-$e*.25,q.position.x=.05,c(q);const Ae=new W(new Fn(ge*.2,16),new we({color:2236962,roughness:.5}));Ae.position.z=.001,c(Ae),q.add(Ae);const oe=new ko(ge-.01,ge,32),ue=new we({color:65535,emissive:65535,emissiveIntensity:.8,transparent:!0,opacity:.9,side:kt}),Ee=new W(oe,ue);Ee.position.z=.002,c(Ee),q.add(Ee),Z.add(q)}}const Se=new Fn(.015,16),ke=new we({color:3407667,emissive:s?3407667:3355443,emissiveIntensity:s?.8:0}),fe=new W(Se,ke);fe.position.z=.45/2+.002,fe.position.y=.5/2-.05,fe.position.x=.3/2-.05,c(fe),Z.add(fe),ne.add(Z)}else{const j=new ye(.2,.4,.4),Z=new W(j,he);c(Z);const Q=new ye(.2-.02,.02,.01),xe=new we({color:3355443,roughness:.5}),ce=new W(Q,xe);ce.position.z=.4/2+.002,ce.position.y=.4/2-.05,c(ce),Z.add(ce);const Se=new Fn(.01,16),ke=new we({color:3407667,emissive:s?3407667:3355443,emissiveIntensity:s?.8:0}),fe=new W(Se,ke);fe.position.z=.4/2+.002,fe.position.y=.4/2-.1,c(fe),Z.add(fe),ne.add(Z)}const me=new Ye,_e=.4,Ue=.02,te=.15,re=new ye(_e,Ue,te),de=new we({color:2236962,roughness:.4}),le=new W(re,de);c(le);const Ce=.02,Te=.005,De=15,Ge=5,I=new ye(Ce,.004,Ce),U=new we({color:i==="gaming"&&a?11193599:12303291,roughness:.6,emissive:i==="gaming"&&a?11193599:0,emissiveIntensity:i==="gaming"&&a?.5:0});for(let M=0;M<Ge;M++)for(let y=0;y<De;y++){const L=new W(I,U);L.position.x=(y-De/2+.5)*(Ce+Te),L.position.z=(M-Ge/2+.5)*(Ce+Te),L.position.y=Ue/2+.002,c(L),le.add(L)}me.add(le);const E=new Ye,ae=new we({color:2236962,roughness:.4}),F=new ye(.06,.03,.1);F.translate(0,.015,0);const k=new W(F,ae);c(k);const V=new qe(.006,.006,.02,16),ee=new we({color:5592405,roughness:.2}),B=new W(V,ee);if(B.rotation.x=Math.PI/2,B.position.y=.03,B.position.z=-.01,c(B),k.add(B),i==="gaming"&&a){const M=new W(new hn(.05,.02),new we({color:16711935,emissive:16711935,emissiveIntensity:.8,transparent:!0,opacity:.8}));M.position.y=.016,M.position.z=-.04,M.rotation.x=-Math.PI/2,c(M),k.add(M)}E.add(k),h.position.set(0,.25,0),l.add(h),l.add(H),ne.position.set(.7,.25,.1),l.add(ne),me.position.set(0,.01,.3),l.add(me),E.position.set(.3,.01,.3),l.add(E)}return l.userData={isInteractiveGroup:!0,type:"computer"},l.position.set(t.x,t.y,t.z),l.rotation.y=r,n.add(l),{computerGroup:l,toggle:()=>{s=!s,l.traverse(h=>{h instanceof W&&h.material.emissive&&(h.material.color.getHex()===3407667?(h.material.emissive.set(s?3407667:3355443),h.material.emissiveIntensity=s?.8:0):h.material.color.getHex()===o&&(h.material.emissive.set(s?o:0),h.material.emissiveIntensity=s?.4:0))})}}}function US(n,e={}){const{position:t={x:0,y:0,z:0},color:i=3355443,accentColor:s=16777215,type:r="gaming",rotation:o=0}=e,a=new Ye;let l,c,u,h;if(r==="wooden"?(l=new we({color:10506797,roughness:.7,metalness:.1}),c=l,u=l):r==="office"?(l=new we({color:i,roughness:.5,metalness:.2}),c=new we({color:2236962,roughness:.2,metalness:.8}),u=l,h=new we({color:16777215,roughness:.3,metalness:.5})):r==="modern"?(l=new we({color:i,roughness:.3,metalness:.5}),c=new we({color:14540253,roughness:.2,metalness:.9}),u=l):r==="gaming"&&(l=new we({color:i,roughness:.4,metalness:.1}),h=new we({color:s,roughness:.3,metalness:.2}),c=new we({color:1118481,roughness:.2,metalness:.8}),u=l),r==="gaming"){const d=new W(new qe(.06,.06,.4,8),c);d.position.y=.2,a.add(d);const f=new W(new qe(.08,.1,.05,8),c);f.position.y=.38,a.add(f);const m=new Ye,v=new W(new qe(.12,.12,.03,16),c);v.position.y=.015,m.add(v);for(let Ue=0;Ue<5;Ue++){const te=Ue/5*Math.PI*2,re=new W(new ye(.05,.03,.28),c);re.position.x=Math.sin(te)*.14,re.position.z=Math.cos(te)*.14,re.position.y=.015,re.rotation.y=te,m.add(re);const de=new W(new qe(.04,.04,.06,8),c);de.rotation.x=Math.PI/2,de.position.x=Math.sin(te)*.28,de.position.z=Math.cos(te)*.28,de.position.y=.02,m.add(de);const le=new W(new qe(.035,.035,.02,16),new we({color:3355443,roughness:.7,metalness:.3}));le.rotation.x=Math.PI/2,le.position.x=Math.sin(te)*.28,le.position.z=Math.cos(te)*.28,le.position.y=-.005,m.add(le)}a.add(m);const g=new W(new ye(.48,.08,.48),l);g.position.y=.45,a.add(g);const p=new W(new ye(.44,.06,.44),l);p.position.y=.52,a.add(p);const S=new W(new ye(.44,.03,.06),l);S.position.y=.51,S.position.z=.22,a.add(S);for(let Ue=-1;Ue<=1;Ue+=2){const te=new W(new ye(.44,.01,.05),h);te.position.y=.55,te.position.z=Ue*.1,a.add(te)}const b=new W(new ye(.06,.1,.44),l);b.position.x=-.22,b.position.y=.52,a.add(b);const _=new W(new ye(.06,.1,.44),l);_.position.x=.22,_.position.y=.52,a.add(_);const P=new W(new ye(.25,.08,.06),l);P.position.y=.47,P.position.z=-.22,a.add(P);const C=new W(new ye(.44,.7,.08),u);C.position.y=.85,C.position.z=-.22,a.add(C);const T=new W(new ye(.3,.15,.03),l);T.position.y=.65,T.position.z=-.18,a.add(T);const R=new W(new ye(.08,.6,.12),l);R.position.x=-.2,R.position.y=.85,R.position.z=-.22,a.add(R);const w=new W(new ye(.08,.6,.12),l);w.position.x=.2,w.position.y=.85,w.position.z=-.22,a.add(w);const x=new W(new ye(.38,.18,.12),l);x.position.y=1.24,x.position.z=-.22,a.add(x);const D=new W(new ye(.18,.18,.02),new we({color:1118481,roughness:.8,metalness:.1}));D.position.y=.98,D.position.z=-.17,a.add(D);const Y=new W(new ye(.18,.18,.02),new we({color:1118481,roughness:.8,metalness:.1}));Y.position.y=.7,Y.position.z=-.17,a.add(Y);for(let Ue=-1;Ue<=1;Ue+=2){const te=new W(new ye(.03,.7,.01),h);te.position.x=Ue*.15,te.position.y=.85,te.position.z=-.17,a.add(te)}const N=new W(new ye(.44,.02,.01),h);N.position.y=1.15,N.position.z=-.17,a.add(N);const H=new W(new ye(.02,.25,.01),h);H.position.x=-.1,H.position.y=.85,H.position.z=-.17,H.rotation.z=.2,a.add(H);const $=new W(new ye(.02,.25,.01),h);$.position.x=.1,$.position.y=.85,$.position.z=-.17,$.rotation.z=-.2,a.add($);const G=new W(new ye(.06,.15,.06),c);G.position.x=-.25,G.position.y=.52,G.position.z=0,a.add(G);const X=new W(new ye(.08,.04,.3),c);X.position.x=-.25,X.position.y=.61,X.position.z=-.05,a.add(X);const O=new W(new ye(.08,.02,.2),l);O.position.x=-.25,O.position.y=.64,O.position.z=-.05,a.add(O);const ne=new W(new ye(.06,.15,.06),c);ne.position.x=.25,ne.position.y=.52,ne.position.z=0,a.add(ne);const he=new W(new ye(.08,.04,.3),c);he.position.x=.25,he.position.y=.61,he.position.z=-.05,a.add(he);const me=new W(new ye(.08,.02,.2),l);me.position.x=.25,me.position.y=.64,me.position.z=-.05,a.add(me);const _e=new W(new ye(.04,.01,.04),h);_e.position.x=.25,_e.position.y=.52,_e.position.z=.08,a.add(_e)}return a.position.set(t.x,t.y,t.z),a.rotation.y=o,n.add(a),a}function NS(n,e={}){const{carpetMaterial:t}=Ji(),{position:i={x:.2,y:.01,z:2},size:s={width:3,height:.02,depth:2},color:r=16091243,pattern:o="ornate"}=e,a=new Ye,l=new ye(s.width,s.height,s.depth),c=new W(l,t);if(a.add(c),o!=="simple"){const u=new ze(r).multiplyScalar(.8),h=new we({color:u,roughness:.9,metalness:0});if(o==="geometric")for(let d=0;d<3;d++){const f=new W(new ye(s.width-.1,s.height+.002,.05),h);f.position.y=s.height/2+.001,f.position.z=(d-1)*(s.depth/4),a.add(f);const m=new W(new ye(.05,s.height+.002,s.depth-.1),h);m.position.y=s.height/2+.001,m.position.x=(d-1)*(s.width/4),a.add(m)}else if(o==="ornate"){const d=new W(new Fn(s.width*.3,32),h);d.rotation.x=-Math.PI/2,d.position.y=s.height/2+.001,a.add(d);const f=s.width*.15;for(let m=0;m<4;m++){const v=(m%2*2-1)*(s.width/2-f),g=(m<2?1:-1)*(s.depth/2-f),p=new W(new Fn(f,32),h);p.rotation.x=-Math.PI/2,p.position.set(v,s.height/2+.001,g),a.add(p)}}}return a.position.set(i.x,i.y,i.z),n.add(a),a}function OS(n,e={}){const{position:t={x:0,y:0,z:0},rotation:i={x:0,y:0,z:0},scale:s=1}=e,r=new Ye,o=new Ye,a=new Kn({color:1184274,roughness:.3,metalness:.2,clearcoat:.3,clearcoatRoughness:.2}),l=new Kn({color:3158064,roughness:.2,metalness:.5}),c=new Kn({color:5263440,roughness:.4,metalness:.1}),u=new Kn({color:2201331,emissive:1668818,emissiveIntensity:.2,roughness:.4,metalness:.3}),h=new Kn({color:0,roughness:.05,metalness:0,clearcoat:1,clearcoatRoughness:.1,reflectivity:1}),d=.06,f=.01,m=.18,v=.015,g=-.001,p=.03,S=new wr;S.moveTo(v,0),S.lineTo(d-v,0),S.quadraticCurveTo(d,0,d,v),S.lineTo(d,m-v),S.quadraticCurveTo(d,m,d-v,m),S.lineTo(v,m),S.quadraticCurveTo(0,m,0,m-v),S.lineTo(0,v),S.quadraticCurveTo(0,0,v,0);const b={steps:2,depth:f,bevelEnabled:!0,bevelThickness:.005,bevelSize:.004,bevelOffset:0,bevelSegments:5},_=new zo(S,b),P=new W(_,a);P.position.set(-.06/2,0,-.18/2),P.rotation.set(Math.PI/2,0,0),r.add(P),o.position.set(0,f+g,p),r.add(o);const C=new ye(d*.6,.001,m*.1),T=new W(C,h);T.position.set(0,5e-4,-.18*.2),o.add(T);const R=new Ye;o.add(R);const w=d*.35,x=new qe(w,w,.001,32),D=new W(x,l);D.rotation.x=Math.PI,D.position.set(0,5e-4,0),R.add(D);const Y=new qe(w*.4,w*.4,.002,32),N=new W(Y,u);N.rotation.x=Math.PI,N.position.set(0,.001,0),R.add(N),[{x:0,z:-.020999999999999998*.7,symbol:"↑"},{x:0,z:w*.7,symbol:"↓"},{x:-.020999999999999998*.7,z:0,symbol:"←"},{x:w*.7,z:0,symbol:"→"}].forEach(re=>{const de=new qe(w*.15,w*.15,.002,16),le=new W(de,c);le.rotation.x=Math.PI,le.position.set(re.x,.001,re.z),R.add(le)});const $=-.18*.2,G=.006,X=.018;for(let re=0;re<3;re++){const de=new qe(G,G,.002,16),le=new W(de,re===1?u:c);le.rotation.x=Math.PI,le.position.set((re-1)*X,.001,$),o.add(le)}const O=m*.35;for(let re=0;re<2;re++){const de=new ye(.012,.002,.012),le=new W(de,c);le.position.set(-.06*.25,.001,O+(re===0?-.035:-.015)),o.add(le)}for(let re=0;re<2;re++){const de=new ye(.012,.002,.012),le=new W(de,c);le.position.set(d*.25,.001,O+(re===0?-.035:-.015)),o.add(le)}const ne=.005,he=m*.45,me=.018,_e=.016;for(let re=0;re<3;re++)for(let de=0;de<3;de++){const le=new qe(ne,ne,.002,12),Ce=new W(le,c);Ce.rotation.x=Math.PI,Ce.position.set((de-1)*me,.001,he+re*_e),o.add(Ce)}const Ue=new qe(ne,ne,.002,12),te=new W(Ue,c);return te.rotation.x=Math.PI,te.position.set(0,.001,he-_e),o.add(te),o.position.z-=.07,o.position.y-=.004,r.scale.set(s,s,s),r.position.set(t.x,t.y,t.z),r.rotation.set(i.x,i.y,i.z),r.userData={type:"accessory",name:"Control remoto de TV",interactive:!0},n.add(r),r}const ff=(n,e={})=>{const{position:t={x:0,y:0,z:0},handleColor:i=12887172,bristleColor:s=13808780,ringColor:r=16711680,cleanliness:o=0}=e,a=new Ye;function l(H){H.isMesh&&(H.userData={type:"broom",isInteractive:!0,title:"Actividades del hogar",description:"Una escombra màgica",action:"examine",activityType:"cleaning"})}const c=new we({color:i,roughness:.7,metalness:.1}),u=1.4,h=new qe(.02,.02,u,8),d=new W(h,c);l(d),a.add(d);const f=(H,$)=>{if($<10)return new ze(3355443);if($<50){const G=($-10)/40,X=new ze(3355443),O=new ze(4469538);return X.lerp(O,G)}else if($<80){const G=($-50)/30,X=new ze(4469538),O=new ze(9333586);return X.lerp(O,G)}else{const G=($-80)/20,X=new ze(9333586),O=new ze(i);return X.lerp(O,G)}},m=new we({color:9127187,roughness:.8,metalness:.1}),v=new qe(.04,.04,.05,8),g=new W(v,m);g.position.set(0,-1.4/2,0),l(g),a.add(g);const p=f(s,o),S=new we({color:p,roughness:.9-o/200,metalness:0}),b=new qe(.05,.2,.4,32,1,!1),_=new W(b,S);_.position.set(0,-1.4/2-.2,0),l(_),a.add(_);const P=new bc({color:p.getHex()}),C=new Ye,T=128,R=.05,w=.2,x=.4;for(let H=0;H<T;H++){const $=H/T*Math.PI*2,G=Math.cos($)*R,X=Math.sin($)*R,O=Math.cos($)*w,ne=Math.sin($)*w,he=[new z(G,x/2,X),new z(O,-.4/2,ne)],me=new Et().setFromPoints(he),_e=new Xd(me,P);C.add(_e)}if(C.position.set(0,-1.4/2-.2,0),a.add(C),o<10){const H=20+Math.floor(Math.random()*15),$=new Mt(.01,4,4),G=new At({color:0,transparent:!0,opacity:.95,emissive:2236962,emissiveIntensity:.5}),X=new Ye;for(let O=0;O<H;O++){const ne=new W($,G),he=Math.random()*Math.PI*2,me=.1+Math.random()*.3,_e=-.1+Math.random()*.7;ne.position.set(Math.cos(he)*me,_e,Math.sin(he)*me),ne.scale.multiplyScalar(.6+Math.random()*.5),X.add(ne)}X.position.set(0,-1.4/2-.2,0),a.add(X)}else if(o<80){const H=Math.floor(60*(1-o/100));if(H>0){const $=new Mt(.015,4,4),G=new At({color:3809558,transparent:!0,opacity:.9});for(let X=0;X<H;X++){const O=new W($,G),ne=Math.random()*Math.PI*2,he=Math.random()*.2+.05,me=Math.random()*.5-.25;O.position.set(Math.cos(ne)*he,me,Math.sin(ne)*he),O.scale.multiplyScalar(.4+Math.random()*.8),C.add(O)}}}const D=new we({color:r,roughness:.3,metalness:.6,emissive:new ze(16711680).multiplyScalar(.3)}),Y=new Ho(.09,.01,16,100),N=new W(Y,D);return N.rotation.x=Math.PI/2,N.position.set(0,-1.4/2-.1,0),l(N),a.add(N),a.userData={isInteractiveGroup:!0,type:"broom"},a.position.set(t.x,t.y,t.z),n.add(a),{group:a,updateCleanliness:H=>{console.log("Actualizando limpieza de la escoba a:",H),n.remove(a);const $={...e,position:a.position,cleanliness:H};return ff(n,$)},cleanliness:o}};function FS(n,e={}){const{position:t={x:0,y:0,z:0},rotation:i=0,tableWidth:s=1.4,tableHeight:r=.4,tableDepth:o=1.2}=e,{whitePlankMaterial:a,tableWoodMaterial:l}=Ji(),c=new Ye,u=.05,h=.1,d=.2,f=.05,m=new W(new ye(s,u,o),a);m.position.y=r-u/2,c.add(m);const v=new W(new ye(f,r-1.5*h,o),a);v.position.set(-s/2+f/2,2*r/3,0),c.add(v);const g=new W(new ye(f,r-1.5*h,o),a);g.position.set(s/2-f/2,2*r/3,0),c.add(g);const p=new W(new ye(s,u,o),a);p.position.set(0,d-1.5*f,0),c.add(p);const S=new Ye,b=new W(new ye(s-f*2,d,o-f*2),l);b.position.set(0,d/2,0),S.add(b),S.position.y=h+f,c.add(S);const _=.05;return[[-s/2+_,0,-o/2+_],[s/2-_,0,-o/2+_],[-s/2+_,0,o/2-_],[s/2-_,0,o/2-_]].forEach(C=>{const T=new W(new ye(_,h,_),a);T.position.set(C[0],h/2,C[2]),c.add(T)}),c.position.set(t.x,t.y,t.z),c.rotation.y=i,c.userData={type:"furniture",name:"Mesa central"},n.add(c),c}function BS(n,e={}){const{position:t={x:0,y:0,z:0},rotation:i=0,color:s=8363191,accentColor:r=6982092,type:o="modern",cornerSide:a="right"}=e,l=new Ye,c=new we({color:s,roughness:.85,metalness:.05}),u=new we({color:r,roughness:.8,metalness:.1}),h=new we({color:3420205,roughness:.6,metalness:.2}),d=o==="sectional"||o==="corner"?2.2:2,f=.2,m=.9,v=.15,g=.2,p=.5,S=.25,b=new ye(d,f,m),_=new W(b,c);_.position.y=v+f/2,l.add(_),[{x:d/2-.15,z:m/2-.15},{x:d/2-.15,z:-.9/2+.15},{x:-d/2+.15,z:m/2-.15},{x:-d/2+.15,z:-.9/2+.15}].forEach(X=>{const O=new qe(.035,.02,v,8),ne=new W(O,h);ne.position.set(X.x,v/2,X.z),l.add(ne)});const C=2,T=(d-.1)/C;for(let X=0;X<C;X++){const O=(X*2-(C-1))*(T/2),ne=new ye(T-.05,g,m-.15),he=new W(ne,c);he.position.set(O,v+f+g/2,0),l.add(he);const me=new ye(.01,g-.05,m-.2),_e=new W(me,u);_e.position.set(O,v+f+g/2,0),l.add(_e)}const R=d-.1,w=new ye(R,p,.15),x=new W(w,c);x.position.set(0,v+f+p/2,-.9/2+.075),l.add(x);const D=2,Y=R/D;for(let X=0;X<D;X++){const O=(X*2-(D-1))*(Y/2),ne=new ye(Y-.1,p-.15,.18),he=new W(ne,c);he.position.set(O,v+f+p/2,-.9/2+.15),l.add(he);const me=new ye(Y-.15,.02,.01),_e=new W(me,u);_e.position.set(O,v+f+p/2,-.9/2+.25),l.add(_e)}const N=new ye(S,p-.1,m-.05),H=new W(N,c);H.position.set(-d/2+S/2,v+f+(p-.1)/2,0),l.add(H);const $=new ye(S,p-.1,m-.05),G=new W($,c);if(G.position.set(d/2-S/2,v+f+(p-.1)/2,0),l.add(G),o==="sectional"||o==="corner"){const O=a==="right"?d/2+.45-S/2:-d/2-.45+S/2,ne=new ye(.9,f,m),he=new W(ne,c);he.position.set(O,v+f/2,0),l.add(he);const me=a==="right"?d/2+.9-.15:-d/2-.9+.15,_e=new qe(.035,.02,v,8),Ue=new W(_e,h);Ue.position.set(me,v/2,m/2-.15),l.add(Ue);const te=new qe(.035,.02,v,8),re=new W(te,h);re.position.set(me,v/2,-.9/2+.15),l.add(re);const de=new ye(.9-.1,g,m-.15),le=new W(de,c);if(le.position.set(O,v+f+g/2,0),l.add(le),o==="corner"){const Ce=new ye(.15,p,m-S),Te=new W(Ce,c);a==="right"?Te.position.set(d/2+.9-.075,v+f+p/2,-.9/2+(m-S)/2):Te.position.set(-d/2-.9+.075,v+f+p/2,-.9/2+(m-S)/2),l.add(Te);const De=new ye(.18,p-.15,m-S-.1),Ge=new W(De,c);a==="right"?Ge.position.set(d/2+.9-.1,v+f+p/2,-.9/2+(m-S)/2):Ge.position.set(-d/2-.9+.1,v+f+p/2,-.9/2+(m-S)/2),l.add(Ge)}}return l.position.set(t.x,t.y,t.z),l.rotation.y=i,n.add(l),l}function zS(n,e={}){const{position:t={x:0,y:0,z:0},baseColor:i=1118481,accentColor:s=16711680,barColor:r=2236962,micColor:o=0,isOn:a=!0}=e,l=new Ye;function c(E){E.isMesh&&(E.userData={isInteractive:!1})}function u(E){E.isMesh&&(E.userData={isInteractive:!1,title:"Micròfon",description:"Un micròfon professional",action:"toggleMicrophone"})}const h=new we({color:i,roughness:.3,metalness:.7}),d=new we({color:s,emissive:a?s:0,emissiveIntensity:a?.5:0}),f=new we({color:r,roughness:.4,metalness:.6}),m=new we({color:o,roughness:.1,metalness:.9}),v=new we({color:3355443,roughness:.2,metalness:.8}),g=new Ye;l.add(g);const p=new qe(.1,.12,.03,32),S=new W(p,h);S.position.y=.015,c(S),g.add(S);const b=new Ho(.11,.01,16,32),_=new W(b,d);_.position.y=.025,_.rotation.x=Math.PI/2,c(_),g.add(_);const P=new Ye;g.add(P);const C=new qe(.015,.015,.3,16),T=new W(C,f);T.position.y=.17,c(T),P.add(T);const R=new Mt(.025,16,16),w=new W(R,v);w.position.y=.33,c(w),P.add(w);const x=new Ye;x.position.y=.33,P.add(x);const D=.35,Y=new qe(.012,.012,D,16),N=new W(Y,f);N.position.y=D/2,c(N),x.add(N),x.rotation.y=Math.PI/4,x.rotation.z=-Math.PI/2;const H=new Mt(.022,16,16),$=new W(H,v);$.position.y=D,c($),x.add($);const G=new Ye;G.position.y=D,x.add(G);const X=.22,O=new qe(.01,.01,X,16),ne=new W(O,f);ne.position.y=X/2,c(ne),G.add(ne),G.rotation.z=Math.PI/4,G.rotation.x=Math.PI/6;const he=new Mt(.02,16,16),me=new W(he,v);me.position.y=X,c(me),G.add(me);const _e=new Ye;_e.position.y=X,G.add(_e);const Ue=new qe(.03,.03,.12,32),te=new W(Ue,m);te.rotation.z=Math.PI/2,te.position.x=.06,c(te),_e.add(te);const re=new Mt(.04,32,32),de=new W(re,m);de.position.x=.14,u(de),_e.add(de);const le=new qe(.035,.035,.01,32),Ce=new we({color:4473924,roughness:.6,metalness:.4,wireframe:!0}),Te=new W(le,Ce);Te.rotation.z=Math.PI/2,Te.position.x=.16,c(Te),_e.add(Te);const De=new Fn(.01,16),Ge=new At({color:a?65280:13056,emissive:a?65280:0,emissiveIntensity:a?1:0}),I=new W(De,Ge);return I.position.y=.04,I.position.x=.06,I.rotation.y=Math.PI/2,c(I),_e.add(I),l.userData={isInteractiveGroup:!1},l.position.set(t.x,t.y,t.z),n.add(l),{microphoneGroup:l,togglePower:()=>{e.isOn=!e.isOn,d.emissive.set(e.isOn?s:0),d.emissiveIntensity=e.isOn?.5:0,Ge.color.set(e.isOn?65280:13056),Ge.emissive.set(e.isOn?65280:0),Ge.emissiveIntensity=e.isOn?1:0}}}const kS=(n,e={})=>{var Se,ke,fe;const t=new Ye;t.position.set(((Se=e.position)==null?void 0:Se.x)||-1.8,((ke=e.position)==null?void 0:ke.y)||0,((fe=e.position)==null?void 0:fe.z)||1.8),t.scale.set(.15,.15,.15),t.userData={type:"assistant",interactive:!0,name:"TimeBuddy",onClick:()=>{ce()}};const i=new we({color:14725271,roughness:.6,metalness:.1}),s=new we({color:2366480,roughness:.7,metalness:.1}),r=new we({color:2899536,roughness:.6,metalness:.1}),o=new we({color:16777215,roughness:.4,metalness:.2}),a=new Ye,l=new W(new ye(1.8,1.9,1.8,4,4,4),i);l.geometry.translate(0,0,0);for(let pe=0;pe<l.geometry.attributes.position.array.length;pe+=3){const be=l.geometry.attributes.position.array[pe],Ne=l.geometry.attributes.position.array[pe+1],ge=l.geometry.attributes.position.array[pe+2],Ie=Math.sqrt(be*be+Ne*Ne+ge*ge),Oe=Math.sqrt(.9*.9+.95*.95+.9*.9);Ie>Oe*.9&&(l.geometry.attributes.position.array[pe]=be/Ie*Oe*.9,l.geometry.attributes.position.array[pe+1]=Ne/Ie*Oe*.9,l.geometry.attributes.position.array[pe+2]=ge/Ie*Oe*.9)}a.add(l);const c=new W(new Mt(.95,32,16,0,Math.PI*2,0,Math.PI/3.5),s);c.position.y=.5,c.scale.x=.95,c.scale.z=.95,a.add(c);const u=new W(new qe(.9,.7,.4,16),s);u.position.set(0,-.7,.1),u.scale.z=.8,u.material=new we({color:2366480,roughness:.9,metalness:0,transparent:!0,opacity:.7}),a.add(u);const h=new Mt(.15,24,24),d=new we({color:16777215,roughness:.2,metalness:0}),f=new W(h,d);f.position.set(-.35,.05,.85),a.add(f);const m=new W(h,d);m.position.set(.35,.05,.85),a.add(m);const v=new dv({color:3956363,shininess:90,specular:3355443}),g=new At({color:0}),p=new At({color:16777215}),S=new W(new Mt(.09,24,24),v);S.position.set(-.35,.05,.95),a.add(S);const b=new W(new Mt(.04,16,16),g);b.position.set(-.35,.05,.99),a.add(b);const _=new W(new Mt(.02,8,8),p);_.position.set(-.38,.08,1.01),a.add(_);const P=new W(new Mt(.09,24,24),v);P.position.set(.35,.05,.95),a.add(P);const C=new W(new Mt(.04,16,16),g);C.position.set(.35,.05,.99),a.add(C);const T=new W(new Mt(.02,8,8),p);T.position.set(.38,.08,1.01),a.add(T);const R=new W(new ye(.2,.3,.2),i);R.position.set(0,-.2,.9);for(let pe=0;pe<R.geometry.attributes.position.array.length;pe+=3){const be=R.geometry.attributes.position.array[pe+2];be>0&&(R.geometry.attributes.position.array[pe+2]=Math.min(.15,be))}R.geometry.attributes.position.needsUpdate=!0,a.add(R);const x=new vr(0,-.55,.3,.05,0,Math.PI,!1,0).getPoints(20),D=new Et().setFromPoints(x),Y=new bc({color:3355443,linewidth:2}),N=new Xd(D,Y);N.position.z=.9,N.position.y=-1,N.rotation.z=Math.PI,a.add(N);const $=new vr(0,0,.15,.03,0,Math.PI,!0,0).getPoints(10);new Et().setFromPoints($);const G=new At({color:2366480}),X=new W(new ye(.3,.05,.05),G);X.position.set(-.35,.35,.9),X.rotation.z=.1,a.add(X);const O=new W(new ye(.3,.05,.05),G);O.position.set(.35,.35,.9),O.rotation.z=-.1,a.add(O),a.position.y=2.5,t.add(a);const ne=new Ye,he=new W(new sr(1,1.5,8,16),r);he.position.y=.4,ne.add(he);const me=new W(new qe(.55,.7,.5,16),o);me.position.y=1.15,me.position.z=.1,ne.add(me);const _e=new W(new qe(.1,.15,.3,16),new we({color:10167330}));_e.position.y=1.15,_e.position.z=.25,ne.add(_e);const Ue=new W(new qe(.15,.2,.7,16),new we({color:10167330}));Ue.position.y=.7,Ue.position.z=.3,ne.add(Ue);const te=new W(new qe(1.01,1.01,.15,16),new we({color:0,roughness:.4,metalness:.5}));te.position.y=-.5,ne.add(te);const re=new W(new ye(.3,.12,.1),new we({color:13938487,metalness:.8,roughness:.2}));re.position.set(0,-.5,1.02),ne.add(re);const de=new W(new Mt(.4,16,16),r);de.scale.set(1.2,1,1),de.position.set(-1,1,0),ne.add(de);const le=de.clone();le.position.set(1,1,0),ne.add(le);const Ce=new sr(.25,1.3,8,12),Te=new W(Ce,r);Te.position.set(-1.2,.3,0),Te.rotation.z=-.2,ne.add(Te);const De=new W(Ce,r);De.position.set(1.2,.3,0),De.rotation.z=.2,ne.add(De);const Ge=new Mt(.25,16,16),I=new W(Ge,i);I.position.set(-1.4,-.5,0),ne.add(I);const U=new W(Ge,i);U.position.set(1.4,-.5,0),ne.add(U);const E=new sr(.35,1.8,8,12),ae=new we({color:1713721,roughness:.7,metalness:.1}),F=new W(E,ae);F.position.set(-.4,-1.5,0),ne.add(F);const k=new W(E,ae);k.position.set(.4,-1.5,0),ne.add(k);const V=new ye(.5,.25,.8),ee=new we({color:0,roughness:.5,metalness:.2});for(let pe=0;pe<V.attributes.position.array.length;pe+=3){const be=V.attributes.position.array[pe+2];if(be>.3){const Ne=.3/be;V.attributes.position.array[pe+2]=be*Ne}}V.attributes.position.needsUpdate=!0;const B=new W(V,ee);B.position.set(-.4,-2.5,.15),ne.add(B);const M=new W(V,ee);M.position.set(.4,-2.5,.15),ne.add(M),t.add(ne);const y=()=>{var be;const pe=Date.now()*.001;t.position.y=((be=e.position)==null?void 0:be.y)||0,b.position.x=-.35+Math.sin(pe*.6)*.02,C.position.x=.35+Math.sin(pe*.6)*.02,Math.sin(pe*3)>.97?(f.scale.y=.1,m.scale.y=.1):(f.scale.y=1,m.scale.y=1),he.scale.x=1+Math.sin(pe*1.5)*.01,he.scale.z=1+Math.sin(pe*1.5)*.01,Te.rotation.x=Math.sin(pe*.5)*.05,De.rotation.x=-Math.sin(pe*.5)*.05,requestAnimationFrame(y)};y();let L=null,j=null;const Z=["¡Hola! Soy tu asistente, bienvenido a tu organizador interactivo de tareas","Los objetos interactivos son: la TV, el calendario, las mancuernas, los libros, las carpetas, la escoba y el PC","Desde los diferentes objetos interactivos puedes añadir tareas completadas a tu calendario.","Desde el calendario puedes añadir tareas no completadas de cualquier tipo"],Q=pe=>{console.log("Creando bocadillo:",pe),L&&(n.remove(L),L=null,clearTimeout(j));const be=new Ye;be.position.set(t.position.x+.8,t.position.y+.9,t.position.z-.25);const Ne=pe.length,ge=Math.min(1.5,Math.max(1,Ne*.01)),Ie=Math.min(.8,Math.max(.5,Ne*.01)),Oe=new wr,$e=.1;Oe.moveTo(ge/2-$e,-Ie/2),Oe.quadraticCurveTo(ge/2,-Ie/2,ge/2,-Ie/2+$e),Oe.lineTo(ge/2,Ie/2-$e),Oe.quadraticCurveTo(ge/2,Ie/2,ge/2-$e,Ie/2),Oe.lineTo(-ge/2+$e,Ie/2),Oe.quadraticCurveTo(-ge/2,Ie/2,-ge/2,Ie/2-$e),Oe.lineTo(-ge/2,-Ie/2+$e),Oe.lineTo(-ge/2,-Ie/2+.2),Oe.lineTo(-ge/2-.15,-Ie/2),Oe.lineTo(-ge/2,-Ie/2+.1),Oe.lineTo(-ge/2+$e,-Ie/2),Oe.quadraticCurveTo(-ge/2+$e*2,-Ie/2,-ge/2+$e*3,-Ie/2),Oe.lineTo(ge/2-$e,-Ie/2);const q=new At({color:16316922,side:kt,transparent:!0,opacity:.95}),Ae=new Tc(Oe),oe=new W(Ae,q);be.add(oe);const ue=document.createElement("canvas");ue.width=1024,ue.height=512;const Ee=ue.getContext("2d");Ee.clearRect(0,0,ue.width,ue.height);const Re=45;Ee.font=`bold ${Re}px Arial, sans-serif`,Ee.fillStyle="#000000",Ee.textAlign="center";const je=ue.width*.1,gt=ue.width-je*2,yt=pe.split(" ");let tt=[],It=yt[0];for(let Vt=1;Vt<yt.length;Vt++){const Ei=It+" "+yt[Vt];Ee.measureText(Ei).width>gt*.8?(tt.push(It),It=yt[Vt]):It=Ei}tt.push(It);const fn=Re*2,Tr=tt.length*fn,Ar=(ue.height-Tr)/2+Re/2;tt.forEach((Vt,Ei)=>{Ee.fillText(Vt,ue.width/2,Ar+Ei*fn,gt)});const pn=new qd(ue);pn.minFilter=en,pn.magFilter=en,pn.anisotropy=16;const Ls=new At({map:pn,transparent:!0,side:kt}),Cr=new hn(ge*.95,Ie*.95),Is=new W(Cr,Ls);Is.position.z=.01,be.add(Is),be.lookAt(5,1.5,4),be.scale.set(1,1,1),n.add(be),L=be;const wi=()=>{if(L){try{const Vt=camera.position.clone();Vt.y=L.position.y,L.lookAt(Vt)}catch{}requestAnimationFrame(wi)}};wi();const Rr=Math.max(5e3,Math.min(1e4,pe.length*100));j=setTimeout(()=>{n.remove(be),L=null},Rr)};setTimeout(()=>{let pe=0;const be=()=>{Q(Z[pe]),pe=(pe+1)%Z.length,setTimeout(be,12e3)};be()},2e3);const ce=()=>{Q("Estoy escuchando... ¿En qué puedo ayudarte?"),setTimeout(()=>{Q("¡Entendido! Te ayudaré con eso.")},4e3)};return n.add(t),t};class HS{constructor(e,t,i,s){this.camera=e,this.scene=t,this.renderer=i,this.domElement=s||i.domElement,this.raycaster=new Ev,this.mouse=new ve,this.selectedObject=null,this.domElement.addEventListener("click",this.onClick.bind(this)),this.domElement.addEventListener("mousemove",this.onMouseMove.bind(this)),this.onObjectClick=null}setOnObjectClick(e){this.onObjectClick=e}setOnObjectHover(e){this.onHoverCallback=e}onClick(e){this.updateMousePosition(e),this.raycaster.setFromCamera(this.mouse,this.camera);const t=this.raycaster.intersectObjects(this.scene.children,!0).filter(i=>i.object.isInteractive||i.object.userData&&i.object.userData.type);if(t.length>0){const i=t[0].object;this.onObjectClick&&this.onObjectClick(i)}}onMouseMove(e){this.updateMousePosition(e),this.raycaster.setFromCamera(this.mouse,this.camera);const t=this.raycaster.intersectObjects(this.scene.children,!0).filter(i=>i.object.isInteractive||i.object.userData&&i.object.userData.type);t.length>0?(this.domElement.style.cursor="pointer",(!this.selectedObject||this.selectedObject!==t[0].object)&&(this.selectedObject&&this.highlightObject(this.selectedObject,!1),this.selectedObject=t[0].object,this.highlightObject(this.selectedObject,!0))):(this.domElement.style.cursor="auto",this.selectedObject&&(this.highlightObject(this.selectedObject,!1),this.selectedObject=null))}highlightObject(e,t){const i=window.matchMedia("(prefers-reduced-motion: reduce)").matches,r=(o=>{let a=o,l=10;for(;a&&a.parent&&l>0;){if(a.parent.userData&&a.parent.userData.isInteractiveGroup)return a.parent;a=a.parent,l--}return null})(e);r?this.highlightGroup(r,t,i):this.highlightSingleObject(e,t,i)}highlightGroup(e,t,i){t&&!e.userData._originalGroupData&&(e.userData._originalGroupData={position:e.position.clone(),rotation:e.rotation.clone(),scale:e.scale.clone()},e.traverse(s=>{s.isMesh&&(s.userData._originalData={position:s.position.clone(),emissive:s.material.emissive?s.material.emissive.clone():new ze(0),emissiveIntensity:s.material.emissiveIntensity||0})})),t?(e.traverse(s=>{s.isMesh&&s.material&&s.material.emissive&&(s.material.emissive.set(2236962),s.material.emissiveIntensity=.3)}),i||(e.scale.set(e.userData._originalGroupData.scale.x*1.03,e.userData._originalGroupData.scale.y*1.03,e.userData._originalGroupData.scale.z*1.03),e.position.y=e.userData._originalGroupData.position.y+.03,e.rotation.y=e.userData._originalGroupData.rotation.y+Ul.degToRad(3))):(e.traverse(s=>{s.isMesh&&s.material&&s.userData._originalData&&s.material.emissive&&(s.material.emissive.copy(s.userData._originalData.emissive),s.material.emissiveIntensity=s.userData._originalData.emissiveIntensity)}),!i&&e.userData._originalGroupData&&(e.position.copy(e.userData._originalGroupData.position),e.scale.copy(e.userData._originalGroupData.scale),e.rotation.copy(e.userData._originalGroupData.rotation)))}highlightSingleObject(e,t,i){t?(e.material&&e.material.emissive&&(e.material.emissive=new ze(2236962),e.material.emissiveIntensity=.3),e.userData._originalPosition||(e.userData._originalPosition=e.position.clone(),e.userData._originalScale=e.scale.clone(),e.userData._originalRotation=e.rotation.clone()),i||(e.scale.set(e.userData._originalScale.x*1.03,e.userData._originalScale.y*1.03,e.userData._originalScale.z*1.03),e.rotation.y+=Ul.degToRad(3),e.position.y=e.userData._originalPosition.y+.03)):(e.material&&e.material.emissive&&(e.material.emissive=new ze(0),e.material.emissiveIntensity=0),e.userData._originalPosition&&e.userData._originalScale&&(e.position.copy(e.userData._originalPosition),e.scale.copy(e.userData._originalScale),!i&&e.userData._originalRotation&&e.rotation.copy(e.userData._originalRotation)))}updateMousePosition(e){const t=this.domElement.getBoundingClientRect();this.mouse.x=(e.clientX-t.left)/t.width*2-1,this.mouse.y=-((e.clientY-t.top)/t.height)*2+1}}const pf={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Er{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const GS=new Cc(-1,1,1,-1,0,1);class VS extends Et{constructor(){super(),this.setAttribute("position",new it([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new it([0,2,0,0,2,0],2))}}const WS=new VS;class mf{constructor(e){this._mesh=new W(WS,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,GS)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class gf extends Er{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Zt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Mc.clone(e.uniforms),this.material=new Zt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new mf(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class yh extends Er{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class XS extends Er{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class qS{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new ve);this._width=i.width,this._height=i.height,t=new Ft(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:cn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new gf(pf),this.copyPass.material.blending=Rn,this.clock=new wv}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),o.needsSwap){if(i){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}yh!==void 0&&(o instanceof yh?i=!0:o instanceof XS&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new ve);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class jS extends Er{constructor(e,t,i=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new ze}render(e,t,i){const s=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=s}}class gi extends Er{constructor(e,t,i,s){super(),this.renderScene=t,this.renderCamera=i,this.selectedObjects=s!==void 0?s:[],this.visibleEdgeColor=new ze(1,1,1),this.hiddenEdgeColor=new ze(.1,.04,.02),this.edgeGlow=0,this.usePatternTexture=!1,this.patternTexture=null,this.edgeThickness=1,this.edgeStrength=3,this.downSampleRatio=2,this.pulsePeriod=0,this._visibilityCache=new Map,this._selectionCache=new Set,this.resolution=e!==void 0?new ve(e.x,e.y):new ve(256,256);const r=Math.round(this.resolution.x/this.downSampleRatio),o=Math.round(this.resolution.y/this.downSampleRatio);this.renderTargetMaskBuffer=new Ft(this.resolution.x,this.resolution.y),this.renderTargetMaskBuffer.texture.name="OutlinePass.mask",this.renderTargetMaskBuffer.texture.generateMipmaps=!1,this.depthMaterial=new nf,this.depthMaterial.side=kt,this.depthMaterial.depthPacking=Nd,this.depthMaterial.blending=Rn,this.prepareMaskMaterial=this._getPrepareMaskMaterial(),this.prepareMaskMaterial.side=kt,this.prepareMaskMaterial.fragmentShader=u(this.prepareMaskMaterial.fragmentShader,this.renderCamera),this.renderTargetDepthBuffer=new Ft(this.resolution.x,this.resolution.y,{type:cn}),this.renderTargetDepthBuffer.texture.name="OutlinePass.depth",this.renderTargetDepthBuffer.texture.generateMipmaps=!1,this.renderTargetMaskDownSampleBuffer=new Ft(r,o,{type:cn}),this.renderTargetMaskDownSampleBuffer.texture.name="OutlinePass.depthDownSample",this.renderTargetMaskDownSampleBuffer.texture.generateMipmaps=!1,this.renderTargetBlurBuffer1=new Ft(r,o,{type:cn}),this.renderTargetBlurBuffer1.texture.name="OutlinePass.blur1",this.renderTargetBlurBuffer1.texture.generateMipmaps=!1,this.renderTargetBlurBuffer2=new Ft(Math.round(r/2),Math.round(o/2),{type:cn}),this.renderTargetBlurBuffer2.texture.name="OutlinePass.blur2",this.renderTargetBlurBuffer2.texture.generateMipmaps=!1,this.edgeDetectionMaterial=this._getEdgeDetectionMaterial(),this.renderTargetEdgeBuffer1=new Ft(r,o,{type:cn}),this.renderTargetEdgeBuffer1.texture.name="OutlinePass.edge1",this.renderTargetEdgeBuffer1.texture.generateMipmaps=!1,this.renderTargetEdgeBuffer2=new Ft(Math.round(r/2),Math.round(o/2),{type:cn}),this.renderTargetEdgeBuffer2.texture.name="OutlinePass.edge2",this.renderTargetEdgeBuffer2.texture.generateMipmaps=!1;const a=4,l=4;this.separableBlurMaterial1=this._getSeparableBlurMaterial(a),this.separableBlurMaterial1.uniforms.texSize.value.set(r,o),this.separableBlurMaterial1.uniforms.kernelRadius.value=1,this.separableBlurMaterial2=this._getSeparableBlurMaterial(l),this.separableBlurMaterial2.uniforms.texSize.value.set(Math.round(r/2),Math.round(o/2)),this.separableBlurMaterial2.uniforms.kernelRadius.value=l,this.overlayMaterial=this._getOverlayMaterial();const c=pf;this.copyUniforms=Mc.clone(c.uniforms),this.materialCopy=new Zt({uniforms:this.copyUniforms,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader,blending:Rn,depthTest:!1,depthWrite:!1}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new ze,this.oldClearAlpha=1,this._fsQuad=new mf(null),this.tempPulseColor1=new ze,this.tempPulseColor2=new ze,this.textureMatrix=new ft;function u(h,d){const f=d.isPerspectiveCamera?"perspective":"orthographic";return h.replace(/DEPTH_TO_VIEW_Z/g,f+"DepthToViewZ")}}dispose(){this.renderTargetMaskBuffer.dispose(),this.renderTargetDepthBuffer.dispose(),this.renderTargetMaskDownSampleBuffer.dispose(),this.renderTargetBlurBuffer1.dispose(),this.renderTargetBlurBuffer2.dispose(),this.renderTargetEdgeBuffer1.dispose(),this.renderTargetEdgeBuffer2.dispose(),this.depthMaterial.dispose(),this.prepareMaskMaterial.dispose(),this.edgeDetectionMaterial.dispose(),this.separableBlurMaterial1.dispose(),this.separableBlurMaterial2.dispose(),this.overlayMaterial.dispose(),this.materialCopy.dispose(),this._fsQuad.dispose()}setSize(e,t){this.renderTargetMaskBuffer.setSize(e,t),this.renderTargetDepthBuffer.setSize(e,t);let i=Math.round(e/this.downSampleRatio),s=Math.round(t/this.downSampleRatio);this.renderTargetMaskDownSampleBuffer.setSize(i,s),this.renderTargetBlurBuffer1.setSize(i,s),this.renderTargetEdgeBuffer1.setSize(i,s),this.separableBlurMaterial1.uniforms.texSize.value.set(i,s),i=Math.round(i/2),s=Math.round(s/2),this.renderTargetBlurBuffer2.setSize(i,s),this.renderTargetEdgeBuffer2.setSize(i,s),this.separableBlurMaterial2.uniforms.texSize.value.set(i,s)}render(e,t,i,s,r){if(this.selectedObjects.length>0){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,r&&e.state.buffers.stencil.setTest(!1),e.setClearColor(16777215,1),this._updateSelectionCache(),this._changeVisibilityOfSelectedObjects(!1);const a=this.renderScene.background,l=this.renderScene.overrideMaterial;if(this.renderScene.background=null,this.renderScene.overrideMaterial=this.depthMaterial,e.setRenderTarget(this.renderTargetDepthBuffer),e.clear(),e.render(this.renderScene,this.renderCamera),this._changeVisibilityOfSelectedObjects(!0),this._visibilityCache.clear(),this._updateTextureMatrix(),this._changeVisibilityOfNonSelectedObjects(!1),this.renderScene.overrideMaterial=this.prepareMaskMaterial,this.prepareMaskMaterial.uniforms.cameraNearFar.value.set(this.renderCamera.near,this.renderCamera.far),this.prepareMaskMaterial.uniforms.depthTexture.value=this.renderTargetDepthBuffer.texture,this.prepareMaskMaterial.uniforms.textureMatrix.value=this.textureMatrix,e.setRenderTarget(this.renderTargetMaskBuffer),e.clear(),e.render(this.renderScene,this.renderCamera),this._changeVisibilityOfNonSelectedObjects(!0),this._visibilityCache.clear(),this._selectionCache.clear(),this.renderScene.background=a,this.renderScene.overrideMaterial=l,this._fsQuad.material=this.materialCopy,this.copyUniforms.tDiffuse.value=this.renderTargetMaskBuffer.texture,e.setRenderTarget(this.renderTargetMaskDownSampleBuffer),e.clear(),this._fsQuad.render(e),this.tempPulseColor1.copy(this.visibleEdgeColor),this.tempPulseColor2.copy(this.hiddenEdgeColor),this.pulsePeriod>0){const c=.625+Math.cos(performance.now()*.01/this.pulsePeriod)*.75/2;this.tempPulseColor1.multiplyScalar(c),this.tempPulseColor2.multiplyScalar(c)}this._fsQuad.material=this.edgeDetectionMaterial,this.edgeDetectionMaterial.uniforms.maskTexture.value=this.renderTargetMaskDownSampleBuffer.texture,this.edgeDetectionMaterial.uniforms.texSize.value.set(this.renderTargetMaskDownSampleBuffer.width,this.renderTargetMaskDownSampleBuffer.height),this.edgeDetectionMaterial.uniforms.visibleEdgeColor.value=this.tempPulseColor1,this.edgeDetectionMaterial.uniforms.hiddenEdgeColor.value=this.tempPulseColor2,e.setRenderTarget(this.renderTargetEdgeBuffer1),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.separableBlurMaterial1,this.separableBlurMaterial1.uniforms.colorTexture.value=this.renderTargetEdgeBuffer1.texture,this.separableBlurMaterial1.uniforms.direction.value=gi.BlurDirectionX,this.separableBlurMaterial1.uniforms.kernelRadius.value=this.edgeThickness,e.setRenderTarget(this.renderTargetBlurBuffer1),e.clear(),this._fsQuad.render(e),this.separableBlurMaterial1.uniforms.colorTexture.value=this.renderTargetBlurBuffer1.texture,this.separableBlurMaterial1.uniforms.direction.value=gi.BlurDirectionY,e.setRenderTarget(this.renderTargetEdgeBuffer1),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.separableBlurMaterial2,this.separableBlurMaterial2.uniforms.colorTexture.value=this.renderTargetEdgeBuffer1.texture,this.separableBlurMaterial2.uniforms.direction.value=gi.BlurDirectionX,e.setRenderTarget(this.renderTargetBlurBuffer2),e.clear(),this._fsQuad.render(e),this.separableBlurMaterial2.uniforms.colorTexture.value=this.renderTargetBlurBuffer2.texture,this.separableBlurMaterial2.uniforms.direction.value=gi.BlurDirectionY,e.setRenderTarget(this.renderTargetEdgeBuffer2),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.overlayMaterial,this.overlayMaterial.uniforms.maskTexture.value=this.renderTargetMaskBuffer.texture,this.overlayMaterial.uniforms.edgeTexture1.value=this.renderTargetEdgeBuffer1.texture,this.overlayMaterial.uniforms.edgeTexture2.value=this.renderTargetEdgeBuffer2.texture,this.overlayMaterial.uniforms.patternTexture.value=this.patternTexture,this.overlayMaterial.uniforms.edgeStrength.value=this.edgeStrength,this.overlayMaterial.uniforms.edgeGlow.value=this.edgeGlow,this.overlayMaterial.uniforms.usePatternTexture.value=this.usePatternTexture,r&&e.state.buffers.stencil.setTest(!0),e.setRenderTarget(i),this._fsQuad.render(e),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=o}this.renderToScreen&&(this._fsQuad.material=this.materialCopy,this.copyUniforms.tDiffuse.value=i.texture,e.setRenderTarget(null),this._fsQuad.render(e))}_updateSelectionCache(){const e=this._selectionCache;function t(i){i.isMesh&&e.add(i)}e.clear();for(let i=0;i<this.selectedObjects.length;i++)this.selectedObjects[i].traverse(t)}_changeVisibilityOfSelectedObjects(e){const t=this._visibilityCache;for(const i of this._selectionCache)e===!0?i.visible=t.get(i):(t.set(i,i.visible),i.visible=e)}_changeVisibilityOfNonSelectedObjects(e){const t=this._visibilityCache,i=this._selectionCache;function s(r){if(r.isMesh||r.isSprite){if(!i.has(r)){const o=r.visible;(e===!1||t.get(r)===!0)&&(r.visible=e),t.set(r,o)}}else(r.isPoints||r.isLine)&&(e===!0?r.visible=t.get(r):(t.set(r,r.visible),r.visible=e))}this.renderScene.traverse(s)}_updateTextureMatrix(){this.textureMatrix.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),this.textureMatrix.multiply(this.renderCamera.projectionMatrix),this.textureMatrix.multiply(this.renderCamera.matrixWorldInverse)}_getPrepareMaskMaterial(){return new Zt({uniforms:{depthTexture:{value:null},cameraNearFar:{value:new ve(.5,.5)},textureMatrix:{value:null}},vertexShader:`#include <morphtarget_pars_vertex>
				#include <skinning_pars_vertex>

				varying vec4 projTexCoord;
				varying vec4 vPosition;
				uniform mat4 textureMatrix;

				void main() {

					#include <skinbase_vertex>
					#include <begin_vertex>
					#include <morphtarget_vertex>
					#include <skinning_vertex>
					#include <project_vertex>

					vPosition = mvPosition;

					vec4 worldPosition = vec4( transformed, 1.0 );

					#ifdef USE_INSTANCING

						worldPosition = instanceMatrix * worldPosition;

					#endif

					worldPosition = modelMatrix * worldPosition;

					projTexCoord = textureMatrix * worldPosition;

				}`,fragmentShader:`#include <packing>
				varying vec4 vPosition;
				varying vec4 projTexCoord;
				uniform sampler2D depthTexture;
				uniform vec2 cameraNearFar;

				void main() {

					float depth = unpackRGBAToDepth(texture2DProj( depthTexture, projTexCoord ));
					float viewZ = - DEPTH_TO_VIEW_Z( depth, cameraNearFar.x, cameraNearFar.y );
					float depthTest = (-vPosition.z > viewZ) ? 1.0 : 0.0;
					gl_FragColor = vec4(0.0, depthTest, 1.0, 1.0);

				}`})}_getEdgeDetectionMaterial(){return new Zt({uniforms:{maskTexture:{value:null},texSize:{value:new ve(.5,.5)},visibleEdgeColor:{value:new z(1,1,1)},hiddenEdgeColor:{value:new z(1,1,1)}},vertexShader:`varying vec2 vUv;

				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;

				uniform sampler2D maskTexture;
				uniform vec2 texSize;
				uniform vec3 visibleEdgeColor;
				uniform vec3 hiddenEdgeColor;

				void main() {
					vec2 invSize = 1.0 / texSize;
					vec4 uvOffset = vec4(1.0, 0.0, 0.0, 1.0) * vec4(invSize, invSize);
					vec4 c1 = texture2D( maskTexture, vUv + uvOffset.xy);
					vec4 c2 = texture2D( maskTexture, vUv - uvOffset.xy);
					vec4 c3 = texture2D( maskTexture, vUv + uvOffset.yw);
					vec4 c4 = texture2D( maskTexture, vUv - uvOffset.yw);
					float diff1 = (c1.r - c2.r)*0.5;
					float diff2 = (c3.r - c4.r)*0.5;
					float d = length( vec2(diff1, diff2) );
					float a1 = min(c1.g, c2.g);
					float a2 = min(c3.g, c4.g);
					float visibilityFactor = min(a1, a2);
					vec3 edgeColor = 1.0 - visibilityFactor > 0.001 ? visibleEdgeColor : hiddenEdgeColor;
					gl_FragColor = vec4(edgeColor, 1.0) * vec4(d);
				}`})}_getSeparableBlurMaterial(e){return new Zt({defines:{MAX_RADIUS:e},uniforms:{colorTexture:{value:null},texSize:{value:new ve(.5,.5)},direction:{value:new ve(.5,.5)},kernelRadius:{value:1}},vertexShader:`varying vec2 vUv;

				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 texSize;
				uniform vec2 direction;
				uniform float kernelRadius;

				float gaussianPdf(in float x, in float sigma) {
					return 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;
				}

				void main() {
					vec2 invSize = 1.0 / texSize;
					float sigma = kernelRadius/2.0;
					float weightSum = gaussianPdf(0.0, sigma);
					vec4 diffuseSum = texture2D( colorTexture, vUv) * weightSum;
					vec2 delta = direction * invSize * kernelRadius/float(MAX_RADIUS);
					vec2 uvOffset = delta;
					for( int i = 1; i <= MAX_RADIUS; i ++ ) {
						float x = kernelRadius * float(i) / float(MAX_RADIUS);
						float w = gaussianPdf(x, sigma);
						vec4 sample1 = texture2D( colorTexture, vUv + uvOffset);
						vec4 sample2 = texture2D( colorTexture, vUv - uvOffset);
						diffuseSum += ((sample1 + sample2) * w);
						weightSum += (2.0 * w);
						uvOffset += delta;
					}
					gl_FragColor = diffuseSum/weightSum;
				}`})}_getOverlayMaterial(){return new Zt({uniforms:{maskTexture:{value:null},edgeTexture1:{value:null},edgeTexture2:{value:null},patternTexture:{value:null},edgeStrength:{value:1},edgeGlow:{value:1},usePatternTexture:{value:0}},vertexShader:`varying vec2 vUv;

				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;

				uniform sampler2D maskTexture;
				uniform sampler2D edgeTexture1;
				uniform sampler2D edgeTexture2;
				uniform sampler2D patternTexture;
				uniform float edgeStrength;
				uniform float edgeGlow;
				uniform bool usePatternTexture;

				void main() {
					vec4 edgeValue1 = texture2D(edgeTexture1, vUv);
					vec4 edgeValue2 = texture2D(edgeTexture2, vUv);
					vec4 maskColor = texture2D(maskTexture, vUv);
					vec4 patternColor = texture2D(patternTexture, 6.0 * vUv);
					float visibilityFactor = 1.0 - maskColor.g > 0.0 ? 1.0 : 0.5;
					vec4 edgeValue = edgeValue1 + edgeValue2 * edgeGlow;
					vec4 finalColor = edgeStrength * maskColor.r * edgeValue;
					if(usePatternTexture)
						finalColor += + visibilityFactor * (1.0 - maskColor.r) * (1.0 - patternColor.r);
					gl_FragColor = finalColor;
				}`,blending:$a,depthTest:!1,depthWrite:!1,transparent:!0})}}gi.BlurDirectionX=new ve(1,0);gi.BlurDirectionY=new ve(0,1);const YS={name:"GammaCorrectionShader",uniforms:{tDiffuse:{value:null}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 tex = texture2D( tDiffuse, vUv );

			gl_FragColor = sRGBTransferOETF( tex );

		}`};function $S(n,e={}){const{position:t={x:0,y:0,z:0},tableWidth:i=2.5,tableHeight:s=.6,tableDepth:r=.8}=e,{whitePlankMaterial:o,tableWoodMaterial:a}=Ji(),l=new Ye,c=.03,u=new ye(i,c,r*.6),h=.12,d=r*.6*.85,f=i*.4,m=new ye(f,h,d),v=new W(u,o);v.position.y=s/2,l.add(v);const g=new W(u,o);g.position.y=v.position.y-.2,l.add(g);const p=new W(m,a);p.position.set(-i/4,g.position.y+c/2+h/2+.01,0),l.add(p);const S=new W(m,a);S.position.set(i/4,g.position.y-h/2-.01,0),l.add(S);const b=new W(u,o);b.position.y=S.position.y-h/2-c/2-.01,l.add(b);const _=new W(m,a);_.position.set(-i/4,b.position.y-h/2-.01,0),l.add(_);const P=new W(u,o);P.position.y=_.position.y-h/2-c/2-.01,l.add(P);const C=new ye(c,s,r*.6),T=new W(C,o);T.position.set(-i/2+c/2,0,0);const R=T.clone();return R.position.x=i/2-c/2,l.add(T,R),l.position.set(t.x,t.y,t.z),n.add(l),l}class ZS{constructor(){this.panel=null,this.isVisible=!1,this.currentDate=new Date,this.selectedDate=new Date,this.currentView="month",this.tasks={},this.loadSavedData(),this.init()}init(){this.panel=document.createElement("div"),this.panel.className="calendar-panel",this.panel.setAttribute("role","dialog"),this.panel.setAttribute("aria-modal","true"),this.panel.setAttribute("aria-labelledby","calendar-title"),this.updatePanelContent(),document.body.appendChild(this.panel),document.addEventListener("keydown",e=>{e.key==="Escape"&&this.isVisible&&this.hide()}),this.panel.style.display="none",document.addEventListener("reading-activity-added",e=>{const t=new Date(e.detail.activity.date),i=this.selectedDate;t.getDate()===i.getDate()&&t.getMonth()===i.getMonth()&&t.getFullYear()===i.getFullYear()&&this.renderDayTasks(),this.currentView==="month"&&t.getMonth()===this.currentDate.getMonth()&&t.getFullYear()===this.currentDate.getFullYear()&&this.renderMonthDays()}),document.addEventListener("cleaning-activity-added",e=>{console.log("Actividad de limpieza registrada:",e.detail.activity),this.isVisible&&(this.currentView==="month"?this.renderMonthDays():this.renderDayTasks())}),document.addEventListener("sport-activity-added",e=>{const t=new Date(e.detail.activity.date),i=this.selectedDate;t.getDate()===i.getDate()&&t.getMonth()===i.getMonth()&&t.getFullYear()===i.getFullYear()&&this.renderDayTasks(),this.currentView==="month"&&t.getMonth()===this.currentDate.getMonth()&&t.getFullYear()===this.currentDate.getFullYear()&&this.renderMonthDays()}),document.addEventListener("study-activity-added",e=>{const t=new Date(e.detail.activity.date),i=this.selectedDate;t.getDate()===i.getDate()&&t.getMonth()===i.getMonth()&&t.getFullYear()===i.getFullYear()&&this.renderDayTasks(),this.currentView==="month"&&t.getMonth()===this.currentDate.getMonth()&&t.getFullYear()===this.currentDate.getFullYear()&&this.renderMonthDays()}),document.addEventListener("leisure-activity-added",e=>{const t=new Date(e.detail.activity.date),i=this.selectedDate;t.getDate()===i.getDate()&&t.getMonth()===i.getMonth()&&t.getFullYear()===i.getFullYear()&&this.renderDayTasks(),this.currentView==="month"&&t.getMonth()===this.currentDate.getMonth()&&t.getFullYear()===this.currentDate.getFullYear()&&this.renderMonthDays()}),document.addEventListener("work-activity-added",e=>{const t=new Date(e.detail.activity.date),i=this.selectedDate;t.getDate()===i.getDate()&&t.getMonth()===i.getMonth()&&t.getFullYear()===i.getFullYear()&&this.renderDayTasks(),this.currentView==="month"&&t.getMonth()===this.currentDate.getMonth()&&t.getFullYear()===this.currentDate.getFullYear()&&this.renderMonthDays()})}updatePanelContent(){this.currentView==="month"?this.renderMonthView():this.renderDayView();const e=this.panel.querySelector(".close-button");e&&e.addEventListener("click",()=>this.hide())}renderMonthView(){const e=["ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"],t=this.currentDate.getFullYear(),i=this.currentDate.getMonth();this.panel.innerHTML=`
      <div class="panel-content">
      <div class="panel-header">
        <div class="header-controls">
          <div class="left-buttons">
            <button class="back-button">←</button>
            <button class="refresh-button">↻</button>
          </div>
          <div class="right-buttons">
            <button class="close-button" aria-label="Cerrar">×</button>
          </div>
        </div>
      </div>
     
        
        <div class="month-view">
          <div class="month-header">
            <button id="prev-month" class="nav-button">&lt;</button>
            <h2>${e[i]} ${t}</h2>
            <button id="next-month" class="nav-button">&gt;</button>
          </div>
          
          <div class="weekdays-header">
            <div>Lu</div><div>Ma</div><div>Mi</div>
            <div>Ju</div><div>Vi</div><div>Sa</div><div>Do</div>
          </div>
          
          <div id="calendar-grid" class="calendar-grid"></div>
          
          <div class="calendar-footer">
            <div></div>
            <div class="search-container">
              <span>Busca una fecha específica:</span>
              <input type="date" id="date-search">
              <button id="search-button">🔍</button>
            </div>
          </div>
        </div>
      </div>
    `,this.renderMonthDays();const s=this.panel.querySelector("#prev-month"),r=this.panel.querySelector("#next-month"),o=this.panel.querySelector(".back-button"),a=this.panel.querySelector(".refresh-button"),l=this.panel.querySelector(".close-button"),c=this.panel.querySelector("#date-search"),u=this.panel.querySelector("#search-button");s.addEventListener("click",()=>this.navigateMonth(-1)),r.addEventListener("click",()=>this.navigateMonth(1)),o&&o.addEventListener("click",()=>this.hide()),a&&a.addEventListener("click",()=>{this.loadSavedData(),this.renderMonthDays()}),l&&l.addEventListener("click",()=>this.hide()),u.addEventListener("click",()=>{if(c.value){const h=new Date(c.value);this.currentDate=new Date(h.getFullYear(),h.getMonth(),1),this.selectedDate=new Date(h),this.switchToDay()}})}renderMonthDays(){const e=this.panel.querySelector("#calendar-grid");if(!e)return;e.innerHTML="";const t=this.currentDate.getFullYear(),i=this.currentDate.getMonth();let s=new Date(t,i,1).getDay();s===0&&(s=7);const r=new Date(t,i+1,0).getDate(),o=new Date(t,i,0).getDate();for(let h=s-1;h>0;h--){const d=o-h+1,f=document.createElement("div");f.className="day prev-month",f.textContent=d,e.appendChild(f)}const a=new Date,l=this.getMonthActivitiesMap(t,i);for(let h=1;h<=r;h++){const d=document.createElement("div");d.className="day";const f=new Date(t,i,h);f.getDate()===a.getDate()&&f.getMonth()===a.getMonth()&&f.getFullYear()===a.getFullYear()&&d.classList.add("today");const m=document.createElement("div");m.className="day-number",m.textContent=h,d.appendChild(m);const v=this.formatDateKey(f),g=l[v]||[];if(g.length>0){const p=document.createElement("div");p.className="day-tasks";const S=g.slice(0,3),b=g.length-S.length;if(S.forEach(_=>{const P=document.createElement("div");P.className="task-item";const C=_.taskId||_.timestamp||"",T=this.getCategoryNumber(_.category,C);_.completed?P.classList.add(`categoria-${T}-completed`):P.classList.add(`categoria-${T}`);const R=_.category||_.title||_.text;if(_.urgency&&_.urgency!=="normal"){const x={baja:"⚪ ",alta:"🟠 ",urgente:"🔴 "}[_.urgency]||"";P.textContent=x+(R.length>13?R.substring(0,11)+"...":R)}else P.textContent=R.length>15?R.substring(0,13)+"...":R;p.appendChild(P)}),b>0){const _=document.createElement("div");_.className="more-tasks",_.textContent=`+${b} más`,p.appendChild(_)}d.appendChild(p)}d.addEventListener("click",()=>{this.selectedDate=new Date(t,i,h),this.switchToDay()}),e.appendChild(d)}const u=42-(s-1)-r;for(let h=1;h<=u;h++){const d=document.createElement("div");d.className="day next-month",d.textContent=h,e.appendChild(d)}}renderDayView(){const e={weekday:"long",day:"numeric",month:"long"},t=this.selectedDate.toLocaleDateString("es-ES",e),i=t.charAt(0).toUpperCase()+t.slice(1);this.panel.innerHTML=`
      <div class="panel-content">
      <div class="panel-header">
        <div class="header-controls">
          <div class="left-buttons">
            <button class="back-button">←</button>
            <button class="refresh-button">↻</button>
          </div>
          <div class="right-buttons">
            <button class="close-button" aria-label="Cerrar">×</button>
          </div>
        </div>
      </div>
        
        <div class="day-view">
          <div class="day-header">
            <h2>${i}</h2>
          </div>
          
          <div class="day-timeline" id="day-timeline"></div>
          
          <div class="day-footer">
            <button id="back-to-month" class="footer-button">Volver</button>
            <button id="add-task-btn" class="primary-button">Añadir Tarea</button>
          </div>
        </div>
      </div>
    `,this.renderDayTimeline();const s=this.panel.querySelector("#back-to-month"),r=this.panel.querySelector("#add-task-btn"),o=this.panel.querySelector(".back-button"),a=this.panel.querySelector(".refresh-button"),l=this.panel.querySelector(".close-button");s&&s.addEventListener("click",()=>this.switchToMonth()),r&&r.addEventListener("click",()=>this.showAddTaskForm()),o&&o.addEventListener("click",()=>this.switchToMonth()),a&&a.addEventListener("click",()=>{this.loadSavedData(),this.renderDayTimeline()}),l&&l.addEventListener("click",()=>this.hide())}renderDayTimeline(){const e=this.panel.querySelector("#day-timeline");if(!e)return;e.innerHTML="";let t=!1,i=null,s=null,r=null;for(let o=0;o<=23;o++){const a=document.createElement("div");a.className="time-slot",a.dataset.hour=o;const l=document.createElement("div");l.className="time-label",l.textContent=`${o}:00`;const c=document.createElement("div");c.className="time-content",a.addEventListener("dblclick",()=>{this.showAddTaskForm(o)}),a.addEventListener("mousedown",u=>{(u.target===c||u.target===a)&&(t=!0,i=o,s=o,r=document.createElement("div"),r.className="drag-time-preview",r.innerHTML=`<span>${o}:00 - ${o+1}:00</span>`,c.appendChild(r),u.preventDefault())}),a.appendChild(l),a.appendChild(c),e.appendChild(a)}e.addEventListener("mousemove",o=>{if(!t||!i)return;const a=document.elementFromPoint(o.clientX,o.clientY),l=a==null?void 0:a.closest(".time-slot");if(l&&l.dataset.hour){const c=parseInt(l.dataset.hour);c!==s&&(s=c,this.updateDragPreview(e,i,s))}}),document.addEventListener("mouseup",o=>{if(t){if(e.querySelectorAll(".drag-time-preview").forEach(l=>l.remove()),i!==null&&s!==null){const l=Math.min(i,s),u=Math.max(i,s)-l+1;this.showAddTaskForm(l,u)}t=!1,i=null,s=null,r=null}}),this.renderDayTasks()}updateDragPreview(e,t,i){e.querySelectorAll(".drag-time-preview").forEach(l=>l.remove());const r=Math.min(t,i),o=Math.max(t,i);for(let l=r;l<=o;l++){const c=e.querySelector(`.time-slot[data-hour="${l}"]`);if(c){const u=c.querySelector(".time-content"),h=document.createElement("div");h.className="drag-time-preview",l===r?h.innerHTML=`<span>Inicio: ${r}:00</span>`:l===o&&(h.innerHTML=`<span>Fin: ${o+1}:00</span>`),u.appendChild(h)}}const a=e.querySelector(`.time-slot[data-hour="${r}"]`);if(a){const l=o-r+1,c=a.querySelector(".drag-time-preview");c&&(c.innerHTML+=`<div class="duration-indicator">Duración: ${l} ${l===1?"hora":"horas"}</div>`)}}renderDayTasks(){this.formatDateKey(this.selectedDate);const t=this.getAllActivityData().filter(s=>{const r=new Date(s.date);return r.getDate()===this.selectedDate.getDate()&&r.getMonth()===this.selectedDate.getMonth()&&r.getFullYear()===this.selectedDate.getFullYear()}),i=this.panel.querySelectorAll(".time-content");i.forEach(s=>{s.innerHTML=""}),t.forEach(s=>{const r=new Date(s.timestamp||s.date);let o=s.hour||r.getHours();const a=parseFloat(s.duration||s.hours||1),l=document.createElement("div");l.className="day-task-item",s.sourceType==="reading"?l.classList.add("reading-activity"):s.sourceType==="cleaning"?l.classList.add("cleaning-activity"):s.sourceType==="sport"?l.classList.add("sport-activity"):s.sourceType==="study"?l.classList.add("study-activity"):l.classList.add("calendar-task");let c=s.taskId||s.timestamp||"";const u=this.getCategoryNumber(s.category,c);l.classList.add(`categoria-${u}`),a>1&&(l.classList.add("multi-hour-task"),l.style.height=`calc(${Math.min(a,24-o)} * 100% - 8px)`);const h=document.createElement("div");if(h.className="task-title",s.sourceType==="reading"){h.textContent=s.bookTitle||"Lectura";const g=document.createElement("span");g.className="activity-type-icon",g.textContent="📚",h.prepend(g)}else if(s.sourceType==="cleaning"){h.textContent=s.type||"Limpieza";const g=document.createElement("span");g.className="activity-type-icon",g.textContent="🧹",h.prepend(g)}else if(s.sourceType==="sport"){h.textContent=s.text||"Deporte";const g=document.createElement("span");g.className="activity-type-icon",g.textContent="🏋️",h.prepend(g)}else if(s.sourceType==="study"){h.textContent=s.text||"Estudio";const g=document.createElement("span");g.className="activity-type-icon",g.textContent="💻",h.prepend(g)}else if(s.sourceType==="leisure"){h.textContent=s.text||"Ocio";const g=document.createElement("span");g.className="activity-type-icon",g.textContent="📺",h.prepend(g)}else if(s.sourceType==="work"){h.textContent=s.text||"Trabajo";const g=document.createElement("span");g.className="activity-type-icon",g.textContent="💼",h.prepend(g)}else h.textContent=s.text||"Tarea";const d=document.createElement("div");if(d.className="task-detail",a){const g=document.createElement("div");if(g.className="task-duration",g.textContent=`⏱️ ${a} hora${a!==1?"s":""}`,a>1){const p=o+Math.floor(a);g.textContent+=` (${o}:00 - ${p}:00)`}d.appendChild(g)}if(s.location||s.url||s.guests){const g=document.createElement("div");if(g.className="task-additional-info",s.location){const p=document.createElement("div");p.className="task-location",p.innerHTML=`📍 ${s.location}`,g.appendChild(p)}if(s.url){const p=document.createElement("div");p.className="task-url",p.innerHTML=`🔗 <a href="${s.url}" target="_blank">Enlace</a>`,g.appendChild(p)}if(s.guests){const p=document.createElement("div");p.className="task-guests",p.innerHTML=`👥 ${s.guests}`,g.appendChild(p)}if(s.urgency&&s.urgency!=="normal"){const p=document.createElement("div");p.className=`task-urgency ${s.urgency}`;const S={baja:"⚪ Baja",alta:"🟠 Alta",urgent:"🔴 Urgente"};p.textContent=S[s.urgency]||s.urgency,g.appendChild(p)}d.appendChild(g)}s.notes&&d.appendChild(document.createTextNode(s.notes)),l.appendChild(h),l.appendChild(d);const f=document.createElement("div");f.className="task-actions",f.innerHTML=`
        <label><input type="checkbox" class="task-done" ${s.completed?"checked":""}> Completado</label>
        <button class="delete-task">Eliminar</button>
      `;const m=f.querySelector(".task-done"),v=f.querySelector(".delete-task");if(m.addEventListener("change",()=>{s.completed=m.checked,this.updateActivity(s),m.checked?l.classList.add("task-completed"):l.classList.remove("task-completed")}),v.addEventListener("click",()=>{this.deleteActivity(s),l.classList.contains("multi-hour-task")?document.querySelectorAll(`[data-task-id="${c}"]`).forEach(p=>p.remove()):l.remove()}),l.appendChild(f),l.dataset.taskId=c,o>=0&&o<i.length&&(i[o].appendChild(l),a>1)){const g=Math.min(Math.floor(a)-1,23-o);for(let p=1;p<=g;p++){const S=o+p;if(S<i.length){const b=document.createElement("div");b.className="hour-occupied-marker",b.dataset.taskId=c,b.dataset.parentHour=o,i[S].appendChild(b)}}}s.completed&&l.classList.add("task-completed")})}showAddTaskForm(e=null,t=1){const i={weekday:"long",year:"numeric",month:"long",day:"numeric"},s=this.selectedDate.toLocaleDateString("es-ES",i),r=document.createElement("div");r.className="task-form-overlay";let o="";for(let g=0;g<=23;g++)o+=`<option value="${g}" ${g===e?"selected":""}>${g}:00</option>`;let a="";for(let g=.5;g<=8;g+=.5)a+=`<option value="${g}" ${g===t?"selected":""}>${g} hora${g!==1?"s":""}</option>`;r.innerHTML=`
      <div class="task-form-container">
      <h3>Nueva tarea para ${s}</h3><br>
      <form id="add-task-form">
        <div class="form-group">
          <label for="task-activity-type">Tipo de actividad:</label>
          <select id="task-activity-type" required>
            <option value="general">General</option>
            <option value="reading">Libro/Lectura</option>
            <option value="cleaning">Escoba/Tareas del hogar</option>
            <option value="sport">Mancuerna/Deporte</option>
            <option value="study">Estudio</option>
            <option value="leisure">Ocio</option>
            <option value="work">Trabajo</option>
          </select>
        </div>

        <div class="form-group">
          <label for="task-category">Categoría:</label>
          <select id="task-category">
            <!-- Las opciones se generarán dinámicamente -->
          </select>
        </div>
        
        <div class="form-group">
          <label for="task-text">Descripción:</label>
          <input type="text" id="task-text" required autofocus>
        </div>
        
        <div class="form-group">
          <label for="task-hour">Hora de inicio:</label>
          <select id="task-hour">
            ${o}
          </select>
        </div>
        
        <div class="form-group">
          <label for="task-duration">Duración:</label>
          <select id="task-duration">
            ${a}
          </select>
        </div>
        
        <!-- Botón para mostrar/ocultar campos adicionales -->
        <button type="button" id="show-more-task-fields" class="secondary-button">Añadir más datos</button>
        
        <!-- Sección adicional inicialmente oculta -->
        <div id="additional-task-fields" class="additional-fields" style="display: none;">
          <hr>
          <div class="form-group">
            <label for="task-location">Ubicación:</label>
            <input type="text" id="task-location" placeholder="Dirección o ubicación">
          </div>
          <div class="form-group">
            <label for="task-urgency">Nivel de urgencia:</label>
            <select id="task-urgency">
              <option value="baja">Baja</option>
              <option value="normal" selected>Normal</option>
              <option value="alta">Alta</option>
              <option value="urgente">Urgente</option>
            </select>
          </div>
          <div class="form-group">
            <label for="task-url">URL relacionada:</label>
            <input type="url" id="task-url" placeholder="https://...">
          </div>
          <div class="form-group">
            <label for="task-guests">Invitados:</label>
            <input type="text" id="task-guests" placeholder="Nombres separados por comas">
          </div>
        </div>
        
        <div class="form-actions">
          <button type="button" id="cancel-task">Cancelar</button>
          <button type="submit">Guardar</button>
        </div>
      </form>
    </div>
    `,document.body.appendChild(r);const l=r.querySelector("#add-task-form"),c=r.querySelector("#cancel-task"),u=l.querySelector("#task-activity-type"),h=l.querySelector("#task-category"),d={general:[{value:"Reunión",text:"Reunión"},{value:"Tarea",text:"Tarea"},{value:"Evento",text:"Evento"},{value:"Otros",text:"Otros"}],cleaning:[{value:"Barrer",text:"Barrer"},{value:"Fregar el suelo",text:"Fregar el suelo"},{value:"Quitar el polvo",text:"Quitar el polvo"},{value:"Limpiar vidrios",text:"Limpiar vidrios"},{value:"Limpieza general",text:"Limpieza general"}],study:[{value:"Estudiar Factores Humanos",text:"Estudiar Factores Humanos"},{value:"Estudiar Análisis Complejo",text:"Estudiar Análisis Complejo"},{value:"Estudiar Programación",text:"Estudiar Programación"},{value:"Estudiar Física",text:"Estudiar Física"},{value:"Estudiar Matemáticas",text:"Estudiar Matemáticas"},{value:"Estudiar Otros",text:"Estudiar Otros"}],reading:[{value:"Leer Fantasía",text:"Leer Fantasía"},{value:"Leer Ensayo",text:"Leer Ensayo"},{value:"Leer Novela",text:"Leer Novela"},{value:"Leer Ciencia Ficción",text:"Leer Ciencia Ficción"},{value:"Leer Biografía",text:"Leer Biografía"},{value:"Leer Otros",text:"Leer Otros"}],sport:[{value:"Gimnasio",text:"Gimnasio"},{value:"Entrenamiento funcional",text:"Entrenamiento funcional"},{value:"Deportes de equipo",text:"Deportes de equipo"},{value:"Flexibilidad",text:"Flexibilidad"},{value:"Resistencia",text:"Resistencia"},{value:"Correr",text:"Correr"},{value:"Natación",text:"Natación"},{value:"Ciclismo",text:"Ciclismo"},{value:"Otros",text:"Otros"}],leisure:[{value:"Ver películas",text:"Ver películas"},{value:"Ver series",text:"Ver series"},{value:"Videojuegos",text:"Videojuegos"},{value:"Redes sociales",text:"Redes sociales"},{value:"Música",text:"Música"},{value:"Otros",text:"Otros"}],work:[{value:"Reunión de trabajo",text:"Reunión de trabajo"},{value:"Proyecto",text:"Proyecto"},{value:"Llamada",text:"Llamada"},{value:"Presentación",text:"Presentación"},{value:"Administración",text:"Administración"},{value:"Planificación",text:"Planificación"},{value:"Documentación",text:"Documentación"},{value:"Email",text:"Email"},{value:"Formación",text:"Formación"},{value:"Otros",text:"Otros"}]};function f(g){h.innerHTML="",(d[g]||d.general).forEach(S=>{const b=document.createElement("option");b.value=S.value,b.textContent=S.text,h.appendChild(b)})}u.addEventListener("change",()=>{f(u.value)}),f("general");const m=r.querySelector("#show-more-task-fields"),v=r.querySelector("#additional-task-fields");m.addEventListener("click",()=>{v.style.display==="none"?(v.style.display="block",m.textContent="Mostrar menos datos"):(v.style.display="none",m.textContent="Añadir más datos")}),c.addEventListener("click",()=>{document.body.removeChild(r)}),l.addEventListener("submit",g=>{g.preventDefault();const p=l.querySelector("#task-activity-type").value,S=l.querySelector("#task-text").value,b=l.querySelector("#task-hour").value,_=l.querySelector("#task-duration").value,P=l.querySelector("#task-category").value,C=l.querySelector("#task-location").value,T=l.querySelector("#task-urgency").value,R=l.querySelector("#task-url").value,w=l.querySelector("#task-guests").value,x=new Date(this.selectedDate.getFullYear(),this.selectedDate.getMonth(),this.selectedDate.getDate(),parseInt(b),0,0),D=`${x.getFullYear()}-${(x.getMonth()+1).toString().padStart(2,"0")}-${x.getDate().toString().padStart(2,"0")}`,Y=x.toISOString();if(p==="cleaning"){const N={type:P,date:D,hours:parseFloat(_),hour:parseInt(b),notes:S,timestamp:Y,completed:!0,sourceType:"cleaning",location:C||null,urgency:T||"normal",url:R||null,guests:w||null},H=JSON.parse(localStorage.getItem("cleaningActivities"))||[];H.push(N),localStorage.setItem("cleaningActivities",JSON.stringify(H)),document.dispatchEvent(new CustomEvent("cleaning-activity-added",{detail:{activity:N}})),ui.showProgressAnimation(P,"cleaning"),setTimeout(()=>{this.renderDayTasks()},2800)}else if(p==="reading"){const N={bookTitle:S,category:P,date:D,hours:parseFloat(_),hour:parseInt(b),notes:"",timestamp:Y,completed:!1,sourceType:"reading",location:C||null,urgency:T||"normal",url:R||null,guests:w||null},H=JSON.parse(localStorage.getItem("readingActivities"))||[];H.push(N),localStorage.setItem("readingActivities",JSON.stringify(H)),document.dispatchEvent(new CustomEvent("reading-activity-added",{detail:{activity:N}})),ui.showProgressAnimation(P,"reading"),setTimeout(()=>{this.renderDayTasks()},2800)}else if(p==="sport"){const N={text:S,category:P,date:D,hours:parseFloat(_),duration:parseFloat(_),hour:parseInt(b),notes:"",timestamp:Y,completed:!1,sourceType:"sport",location:C||null,urgency:T||"normal",url:R||null,guests:w||null},H=JSON.parse(localStorage.getItem("sportActivities"))||[];H.push(N),localStorage.setItem("sportActivities",JSON.stringify(H)),document.dispatchEvent(new CustomEvent("sport-activity-added",{detail:{activity:N}})),ui.showProgressAnimation(P,"sport"),setTimeout(()=>{this.renderDayTasks()},2800)}else if(p==="study"){const N={text:S,category:P,date:D,hours:parseFloat(_),hour:parseInt(b),notes:"",timestamp:Y,completed:!1,sourceType:"study",location:C||null,urgency:T||"normal",url:R||null,guests:w||null},H=JSON.parse(localStorage.getItem("studyActivities"))||[];H.push(N),localStorage.setItem("studyActivities",JSON.stringify(H)),document.dispatchEvent(new CustomEvent("study-activity-added",{detail:{activity:N}})),ui.showProgressAnimation(P,"study"),setTimeout(()=>{this.renderDayTasks()},2800)}else if(p==="leisure"){const N={text:S,category:P,date:D,hours:parseFloat(_),hour:parseInt(b),notes:"",timestamp:Y,completed:!1,sourceType:"leisure",location:C||null,urgency:T||"normal",url:R||null,guests:w||null},H=JSON.parse(localStorage.getItem("leisureActivities"))||[];H.push(N),localStorage.setItem("leisureActivities",JSON.stringify(H)),document.dispatchEvent(new CustomEvent("leisure-activity-added",{detail:{activity:N}})),ui.showProgressAnimation(P,"leisure"),setTimeout(()=>{this.renderDayTasks()},2800)}else if(p==="work"){const N={text:S,category:P,date:D,hours:parseFloat(_),hour:parseInt(b),notes:"",timestamp:Y,completed:!1,sourceType:"work",location:C||null,urgency:T||"normal",url:R||null,guests:w||null},H=JSON.parse(localStorage.getItem("workActivities"))||[];H.push(N),localStorage.setItem("workActivities",JSON.stringify(H)),document.dispatchEvent(new CustomEvent("work-activity-added",{detail:{activity:N}})),ui.showProgressAnimation(P,"work"),setTimeout(()=>{this.renderDayTasks()},2800)}else this.addNewActivity({text:S,category:P,date:D,timestamp:Y,completed:!1,duration:parseFloat(_),sourceType:"calendar",location:C||null,urgency:T||"normal",url:R||null,guests:w||null}),r.style.opacity="0",r.style.pointerEvents="none",ui.showProgressAnimation(P,p),setTimeout(()=>{document.body.removeChild(r),this.renderDayTasks(),setTimeout(()=>{const N=parseInt(b)-8,H=this.panel.querySelectorAll(".time-slot");N>=0&&N<H.length&&H[N].scrollIntoView({behavior:"smooth",block:"center"})},200)},2800);document.body.removeChild(r),this.renderDayTasks(),setTimeout(()=>{const N=parseInt(b)-8,H=this.panel.querySelectorAll(".time-slot");N>=0&&N<H.length&&H[N].scrollIntoView({behavior:"smooth",block:"center"})},3e3)})}switchToDay(){this.currentView="day",this.updatePanelContent()}switchToMonth(){this.currentView="month",this.updatePanelContent()}navigateMonth(e){this.currentDate=new Date(this.currentDate.getFullYear(),this.currentDate.getMonth()+e,1),this.renderMonthView()}getAllActivityData(){const t=(JSON.parse(localStorage.getItem("readingActivities"))||[]).map(m=>{const v=m.hour||9;return{...m,text:m.bookTitle||m.notes||m.category,category:m.category||"Lectura",date:m.date,hour:v,timestamp:m.timestamp||new Date().toISOString(),location:m.location||null,urgency:m.urgency||"normal",url:m.url||null,guests:m.guests||null,sourceType:"reading"}}),s=(JSON.parse(localStorage.getItem("cleaningActivities"))||[]).map(m=>{const v=m.hour||9;return{...m,text:m.type||"Limpieza",category:"Limpieza",date:m.date,hour:v,timestamp:m.timestamp,duration:m.hours,completed:m.completed||!0,location:m.location||null,urgency:m.urgency||"normal",url:m.url||null,guests:m.guests||null,sourceType:"cleaning"}}),o=(JSON.parse(localStorage.getItem("sportActivities"))||[]).map(m=>{const v=m.hour||9;return{...m,text:m.text||"Actividad deportiva",category:m.category||"Deporte",date:m.date,hour:v,timestamp:m.timestamp,duration:m.duration||1,completed:m.completed||!1,location:m.location||null,urgency:m.urgency||"normal",url:m.url||null,guests:m.guests||null,sourceType:"sport"}}),l=(JSON.parse(localStorage.getItem("studyActivities"))||[]).map(m=>{const v=m.hour||9;return{...m,text:m.text||"Actividad de estudio",category:m.category||"Estudio",date:m.date,hour:v,timestamp:m.timestamp,duration:m.duration||m.hours||1,completed:m.completed||!1,location:m.location||null,urgency:m.urgency||"normal",url:m.url||null,guests:m.guests||null,sourceType:"study"}}),u=(JSON.parse(localStorage.getItem("leisureActivities"))||[]).map(m=>{const v=m.hour||9;return{...m,text:m.text||"Actividad de ocio",category:m.category||"Ocio",date:m.date,hour:v,timestamp:m.timestamp,duration:m.duration||m.hours||1,completed:m.completed||!1,location:m.location||null,urgency:m.urgency||"normal",url:m.url||null,guests:m.guests||null,sourceType:"leisure"}}),d=(JSON.parse(localStorage.getItem("workActivities"))||[]).map(m=>{const v=m.hour||9;return{...m,text:m.text||"Actividad de trabajo",category:m.category||"Trabajo",date:m.date,hour:v,timestamp:m.timestamp,duration:m.duration||m.hours||1,completed:m.completed||!1,location:m.location||null,urgency:m.urgency||"normal",url:m.url||null,guests:m.guests||null,sourceType:"work"}}),f=[];return Object.entries(this.tasks).forEach(([m,v])=>{const[g,p,S]=m.split("-").map(Number);v.forEach(b=>{f.push({text:b.text,date:`${g}-${p.toString().padStart(2,"0")}-${S.toString().padStart(2,"0")}`,completed:b.completed||!1,timestamp:b.createdAt||new Date(g,p-1,S,12,0,0).toISOString(),category:b.category,duration:b.duration||1,sourceType:b.sourceType||"calendar",taskId:b.createdAt,sourceId:b.sourceId})})}),[...t,...s,...o,...l,...u,...d,...f]}getMonthActivitiesMap(e,t){const i=this.getAllActivityData(),s={};return i.forEach(r=>{const o=new Date(r.date);if(o.getFullYear()===e&&o.getMonth()===t){const a=this.formatDateKey(o);s[a]||(s[a]=[]),s[a].push(r)}}),s}addNewActivity(e){if(e.bookId||e.sourceType==="reading"){console.warn("Las actividades de lectura deben añadirse desde ActivityModal");return}if(!e.sourceType){const o=["Gimnasio","Entrenamiento funcional","Deportes de equipo","Flexibilidad","Resistencia","Correr","Natación","Ciclismo","Otros"];e.sourceType=o.includes(e.category)?"sport":"calendar"}const t=e.timestamp||new Date().toISOString(),i=new Date(e.date),s=this.formatDateKey(i);this.tasks[s]||(this.tasks[s]=[]);const r={text:e.text,category:e.category,completed:e.completed||!1,createdAt:t,duration:e.duration||1,sourceType:e.sourceType,...e.sourceId&&{sourceId:e.sourceId}};this.tasks[s].push(r),this.saveTasks(),e.sourceType==="sport"&&e.completed&&document.dispatchEvent(new CustomEvent("calendar-task-completed",{detail:{task:r,category:e.category}}))}addTaskToCalendar(e,t){this.tasks[e]||(this.tasks[e]=[]),this.tasks[e].push(t),localStorage.setItem("calendar-tasks",JSON.stringify(this.tasks))}updateActivity(e){if(e.sourceType==="cleaning"){const t=JSON.parse(localStorage.getItem("cleaningActivities"))||[],i=t.findIndex(s=>s.timestamp===e.timestamp);i!==-1&&(t[i].completed=e.completed,localStorage.setItem("cleaningActivities",JSON.stringify(t)),document.dispatchEvent(new CustomEvent("cleaning-activity-updated",{detail:{activity:t[i]}})));return}if(e.sourceType==="reading"||e.bookId){const t=JSON.parse(localStorage.getItem("readingActivities"))||[],i=t.findIndex(s=>s.timestamp===e.timestamp||s.bookId===e.bookId&&s.date===e.date);i!==-1&&(t[i].completed=e.completed,localStorage.setItem("readingActivities",JSON.stringify(t)),document.dispatchEvent(new CustomEvent("reading-activity-updated",{detail:{activity:t[i]}})));return}if(e.sourceType==="sport"){const t=JSON.parse(localStorage.getItem("sportActivities"))||[],i=t.findIndex(s=>s.timestamp===e.timestamp);i!==-1&&(t[i].completed=e.completed,localStorage.setItem("sportActivities",JSON.stringify(t)),document.dispatchEvent(new CustomEvent("sport-activity-updated",{detail:{activity:t[i]}})));return}if(e.sourceType==="study"){const t=JSON.parse(localStorage.getItem("studyActivities"))||[],i=t.findIndex(s=>s.timestamp===e.timestamp);i!==-1&&(t[i].completed=e.completed,localStorage.setItem("studyActivities",JSON.stringify(t)),document.dispatchEvent(new CustomEvent("study-activity-updated",{detail:{activity:t[i]}})));return}if(e.sourceType==="leisure"){const t=JSON.parse(localStorage.getItem("leisureActivities"))||[],i=t.findIndex(s=>s.timestamp===e.timestamp);i!==-1&&(t[i].completed=e.completed,localStorage.setItem("leisureActivities",JSON.stringify(t)),document.dispatchEvent(new CustomEvent("leisure-activity-updated",{detail:{activity:t[i]}})));return}if(e.sourceType==="work"){const t=JSON.parse(localStorage.getItem("workActivities"))||[],i=t.findIndex(s=>s.timestamp===e.timestamp);i!==-1&&(t[i].completed=e.completed,localStorage.setItem("workActivities",JSON.stringify(t)),document.dispatchEvent(new CustomEvent("work-activity-updated",{detail:{activity:t[i]}})));return}if(e.sourceType==="calendar"&&e.taskId){const t=this.formatDateKey(new Date(e.date));if(this.tasks[t]){const i=this.tasks[t].findIndex(s=>s.createdAt===e.taskId);if(i!==-1){const s=this.tasks[t][i].completed,r=e.completed;this.tasks[t][i]={...this.tasks[t][i],text:e.text,completed:e.completed},this.saveTasks(),!s&&r?document.dispatchEvent(new CustomEvent("calendar-task-completed",{detail:{task:this.tasks[t][i],category:this.tasks[t][i].category}})):s&&!r&&document.dispatchEvent(new CustomEvent("calendar-task-uncompleted",{detail:{task:this.tasks[t][i],category:this.tasks[t][i].category}}))}}}}deleteActivity(e){if(e.sourceType==="cleaning"){const i=(JSON.parse(localStorage.getItem("cleaningActivities"))||[]).filter(s=>s.timestamp!==e.timestamp);localStorage.setItem("cleaningActivities",JSON.stringify(i)),document.dispatchEvent(new CustomEvent("cleaning-activity-deleted",{detail:{activity:e}}));return}if(e.sourceType==="reading"||e.bookId){const i=(JSON.parse(localStorage.getItem("readingActivities"))||[]).filter(s=>s.timestamp!==e.timestamp&&!(s.bookId===e.bookId&&s.date===e.date));localStorage.setItem("readingActivities",JSON.stringify(i)),document.dispatchEvent(new CustomEvent("reading-activity-deleted",{detail:{activity:e}}));return}if(e.sourceType==="sport"){const i=(JSON.parse(localStorage.getItem("sportActivities"))||[]).filter(s=>s.timestamp!==e.timestamp);localStorage.setItem("sportActivities",JSON.stringify(i)),document.dispatchEvent(new CustomEvent("sport-activity-deleted",{detail:{activity:e}}));return}if(e.sourceType==="study"){const i=(JSON.parse(localStorage.getItem("studyActivities"))||[]).filter(s=>s.timestamp!==e.timestamp);localStorage.setItem("studyActivities",JSON.stringify(i)),document.dispatchEvent(new CustomEvent("study-activity-deleted",{detail:{activity:e}}));return}if(e.sourceType==="leisure"){const i=(JSON.parse(localStorage.getItem("leisureActivities"))||[]).filter(s=>s.timestamp!==e.timestamp);localStorage.setItem("leisureActivities",JSON.stringify(i)),document.dispatchEvent(new CustomEvent("leisure-activity-deleted",{detail:{activity:e}}));return}if(e.sourceType==="work"){const i=(JSON.parse(localStorage.getItem("workActivities"))||[]).filter(s=>s.timestamp!==e.timestamp);localStorage.setItem("workActivities",JSON.stringify(i)),document.dispatchEvent(new CustomEvent("work-activity-deleted",{detail:{activity:e}}));return}if(e.sourceType==="calendar"||e.taskId){const t=this.formatDateKey(new Date(e.date));if(this.tasks[t]){const i=this.tasks[t].filter(s=>s.createdAt!==(e.taskId||e.timestamp));i.length!==this.tasks[t].length&&(this.tasks[t]=i,this.saveTasks())}}}formatDateKey(e){return`${e.getFullYear()}-${e.getMonth()+1}-${e.getDate()}`}getCategoryColor(e){return{"Estudiar Factores Humanos":"#f39c12","Estudiar Análisis Complejo":"#FF6633","Estudiar Programación":"#2ecc71","Estudiar Física":"#3498db","Estudiar Matemáticas":"#9b59b6","Estudiar Otros":"#e74c3c","Leer Fantasía":"#9b59b6","Leer Ensayo":"#e74c3c","Leer Novela":"#1abc9c","Leer Ciencia Ficción":"#FF9800","Leer Biografía":"#27ae60","Leer Otros":"#95a5a6",Reunión:"#1abc9c",Tarea:"#3498db",Evento:"#FF9800","Limpieza general":"#27ae60",Barrer:"#8e44ad","Fregar el suelo":"#2980b9","Quitar el polvo":"#c0392b","Limpiar vidrios":"#16a085",Limpieza:"#27ae60",Otros:"#95a5a6",Gimnasio:"#d35400",Correr:"#16a085","Deportes de equipo":"#8e44ad",Flexibilidad:"#2980b9",Resistencia:"#27ae60",Natación:"#3498db",Ciclismo:"#c0392b","Entrenamiento funcional":"#e74c3c",Otros:"#95a5a6"}[e]||"#95a5a6"}getCategoryClass(e){return{"Estudiar Factores Humanos":"category-factors-humans","Estudiar Análisis Complejo":"category-analysis-complex","Estudiar Programación":"category-programming","Estudiar Física":"category-physics","Estudiar Matemáticas":"category-mathematics","Estudiar Otros":"category-study-others","Leer Fantasía":"category-fantasy","Leer Ensayo":"category-essay","Leer Novela":"category-novel","Leer Ciencia Ficción":"category-science-fiction","Leer Biografía":"category-biography","Leer Otros":"category-reading-others",Reunión:"category-meeting",Tarea:"category-task",Evento:"category-event","Limpieza general":"category-general-cleaning",Barrer:"category-sweeping","Fregar el suelo":"category-mopping","Quitar el polvo":"category-dusting","Limpiar vidrios":"category-window-cleaning",Limpieza:"category-cleaning",Otros:"category-others"}[e]||null}getCategoryNumber(e,t=""){let i=0;if(t)for(let r=0;r<t.length;r++)i+=t.charCodeAt(r);else for(let r=0;r<e.length;r++)i+=e.charCodeAt(r);return i%6+1}loadSavedData(){const e=localStorage.getItem("calendar-tasks");e&&(this.tasks=JSON.parse(e))}saveTasks(){localStorage.setItem("calendar-tasks",JSON.stringify(this.tasks))}show(e){this.panel.style.display="block",this.isVisible=!0,this.currentDate=new Date(new Date().getFullYear(),new Date().getMonth(),1),this.selectedDate=new Date,this.currentView="month",this.updatePanelContent(),setTimeout(()=>{this.panel.classList.add("active")},10)}hide(){this.panel.classList.remove("active"),setTimeout(()=>{this.panel.style.display="none",this.isVisible=!1},300)}}function JS(n){const e=new Rg;e.background=new ze(0);let t;const i={width:5,height:3,depth:5,wallThickness:.15};wS(e,i),ES(e,i),hf.ensureMockActivitiesExist();const s=_h(e,i);for(const T of s.shelves)df(e,{shelfX:T.position.x,shelfY:T.position.y,shelfZ:T.position.z,shelfWidth:T.width,shelfDepth:T.depth,isParallelToWall:T.isParallelToWall||!1},R=>{console.log(`Llibre clicat: ${R.userData.title} a l'estanteria ${T.userData.id}`)});CS(e,i),AS(e),DS(e,{position:{x:2.1,y:0,z:-2},color:16772812,height:1.5,intensity:1,isOn:!0}),LS(e,{position:{x:1.45,y:.72,z:-2.03},size:"medium",type:"indoor"}),xh(e,{position:{x:1.85,y:.135,z:1.8},weight:8,color:2236962}),localStorage.setItem("lastDumbbellPosX","1.85"),localStorage.setItem("dumbbellsCreated","1"),setTimeout(()=>{document.dispatchEvent(new Event("check-dumbbells"))},1e3);const r=PS(e,{position:{x:.35,y:1.1,z:-2.15},size:{width:1.5,height:.8,depth:.005},screenColor:0,frameColor:3355443,isOn:!0,standType:"simple"});OS(e,{position:{x:.5,y:.415,z:-.7},rotation:{x:0,y:Math.PI,z:0},scale:1}),zS(e,{position:{x:-1.8,y:.77,z:0},baseColor:1118481,accentColor:16711680,isOn:!0}),BS(e,{position:{x:.95,y:0,z:1},rotation:Math.PI,color:13420970,type:"sectional",cornerSide:"right"}),t=ff(e,{position:{x:-2.1,y:1.1,z:2.25},handleColor:12887172,bristleColor:13808780,cleanliness:0}),$S(e,{position:{x:.5,y:.3,z:-2.15},tableWidth:2.5,tableHeight:.6,tableDepth:1}),FS(e,{position:{x:.5,y:0,z:-.7},rotation:0});const a={width:window.innerWidth,height:window.innerHeight};IS(e,{position:{x:-2,y:.78,z:-.8},type:"gaming",isOn:!0,rotation:Math.PI/2,screenColor:0,hasRGB:!0}),kS(e,{position:{x:2.1,y:.4,z:-1.3}}),US(e,{position:{x:-1,y:0,z:-1},color:2899536,type:"gaming",rotation:5*Math.PI/3}),NS(e,{position:{x:.5,y:0,z:1.2}});const l=new un(75,a.width/a.height,.1,100);l.position.set(i.width/2+1,2,i.depth/2+1),l.lookAt(0,1,0),e.add(l);const c=new hS(l,n);c.enableDamping=!0,c.target.set(0,1,0);const u=new cS({canvas:n,antialias:!0});u.setSize(a.width,a.height),u.setPixelRatio(Math.min(window.devicePixelRatio,2)),u.outputEncoding=void 0,u.toneMapping=bd,u.toneMappingExposure=1.2;const h=()=>{a.width=window.innerWidth,a.height=window.innerHeight,l.aspect=a.width/a.height,l.updateProjectionMatrix(),u.setSize(a.width,a.height),u.setPixelRatio(Math.min(window.devicePixelRatio,2)),d&&d.setSize(a.width,a.height),f&&f.resolution.set(a.width,a.height)};window.addEventListener("resize",h);let d,f;function m(){const T=new Ft(window.innerWidth*window.devicePixelRatio,window.innerHeight*window.devicePixelRatio,{minFilter:en,magFilter:en,format:xn,encoding:void 0,samples:u.capabilities.isWebGL2?4:0,type:cn});d=new qS(u,T);const R=new jS(e,l);d.addPass(R),f=new gi(new ve(window.innerWidth,window.innerHeight),e,l),f.edgeStrength=2.5,f.edgeGlow=.7,f.edgeThickness=1,f.pulsePeriod=0,f.visibleEdgeColor.set("#FF6633"),f.hiddenEdgeColor.set("#256ea5"),f.overlayMaterial.blending=Gi,d.addPass(f);const w=new gf(YS);d.addPass(w),h(),d.setPixelRatio(u.getPixelRatio())}function v(){if(!n||!l||!e||!u){console.error("No s'han inicialitzat els elements necessaris per a les interaccions");return}const T=new HS(l,e,u,n);T.outlinePass=f;const R=new Dc,w=new ZS;T.setOnObjectClick(x=>{x.userData&&x.userData.type==="assistant"&&x.userData.onClick&&x.userData.onClick(x),x.userData.onClick?x.userData.onClick(x):x.userData&&x.userData.type==="book"?R.show(x):x.userData&&x.userData.type==="calendar"?w.show(x):x.userData&&x.userData.type==="tv"?(R.show(x),r.togglePowerFunction&&r.togglePowerFunction()):(x.userData&&x.userData.type==="dumbbell"||x.userData&&x.userData.type==="remote-controller"||x.userData&&x.userData.type==="microphone"||x.userData&&x.userData.type==="broom")&&R.show(x)}),T.setOnObjectHover(x=>{x?f&&(f.selectedObjects=[x]):f&&(f.selectedObjects=[])}),R.setOnSave(x=>{S(x)}),document.addEventListener("create-new-dumbbells",x=>{const{count:D,totalCount:Y}=x.detail;console.log(`Creando ${D} nuevas mancuernas. Total: ${Y}`);const N={x:1.85,y:.14,z:1.8};let H=parseFloat(localStorage.getItem("lastDumbbellPosX"))||N.x;const $=.3;for(let G=0;G<D;G++){const X=Y-D+G,O=8;X===0?H=N.x-$:H=H-$,xh(e,{position:{x:H,y:N.y,z:N.z},weight:O,color:2236962}),console.log(`Mancuerna ${X+1} creada con peso ${O}kg en posición X: ${H}`),localStorage.setItem("lastDumbbellPosX",H.toString())}}),document.addEventListener("cleaning-activity-added",x=>{const D=x.detail.activity;console.log("Actividad de limpieza registrada:",D),w.isVisible&&(w.currentView==="month"?w.renderMonthDays():w.renderDayTasks())}),document.addEventListener("cleanliness-level-changed",x=>{const D=x.detail.level;console.log("Nivel de limpieza actualizado:",D),t&&t.updateCleanliness&&(t=t.updateCleanliness(D))}),setTimeout(()=>{JSON.parse(localStorage.getItem("cleaningActivities"))},500)}function g(){const R=(JSON.parse(localStorage.getItem("sportActivities"))||[]).reduce((D,Y)=>D+(parseFloat(Y.hours)||0),0);console.log("Total horas de ejercicio acumuladas:",R);const w=1+Math.floor(R/5),x=parseInt(localStorage.getItem("dumbbellsCreated"))||1;if(console.log(`Mancuernas: necesarias=${w}, actuales=${x}, horas=${R}`),localStorage.setItem("dumbbellsCreated",x.toString()),w>x){const D=w-x;console.log(`Creando ${D} mancuernas nuevas`),document.dispatchEvent(new CustomEvent("create-new-dumbbells",{detail:{count:D,totalCount:w}})),localStorage.setItem("dumbbellsCreated",w.toString())}}document.addEventListener("sport-activity-added",T=>{const R=T.detail.activity;console.log("Actividad deportiva registrada:",R),setTimeout(()=>g(),500)});function p(){document.addEventListener("bookshelf-update-needed",T=>{const{type:R}=T.detail;b.bookshelf&&b.bookshelf(),console.log(`Actualitzant estanteria després d'afegir activitat de tipus ${R}`);const w=_h(e,i);b.bookshelf=()=>{w&&w.shelves&&w.shelves.forEach(x=>{e.remove(x),x.geometry&&x.geometry.dispose(),x.material&&x.material.dispose()})}}),document.addEventListener("cleaning-activity-added",T=>{const R=T.detail.activity;console.log("Actividad de limpieza registrada:",R),calendarPanel.isVisible&&(calendarPanel.currentView==="month"?calendarPanel.renderMonthDays():calendarPanel.renderDayTasks())}),document.addEventListener("cleanliness-level-changed",T=>{const R=T.detail.level;console.log("Nivel de limpieza actualizado:",R),t&&t.updateCleanliness&&(t=t.updateCleanliness(R))})}function S(T){const R=JSON.parse(localStorage.getItem("readingActivities"))||[];R.push(T),localStorage.setItem("readingActivities",JSON.stringify(R)),console.log("Activitat reading desada:",T)}const b={};function _(){console.log("Iniciant postprocessing..."),m(),console.log("Iniciant interaccions..."),console.log("Objectes a l'escena:",e.children.length),v(),g(),p(),console.log("init done")}_();let P=null;const C=()=>{c.update(),d.render(),P=window.requestAnimationFrame(C)};return C(),()=>{window.removeEventListener("resize",h),window.cancelAnimationFrame(P),e.traverse(T=>{T instanceof W&&(T.geometry.dispose(),T.material.map&&T.material.map.dispose(),T.material.dispose())}),u.dispose()}}const vf=(n,e)=>{const t=n.__vccOpts||n;for(const[i,s]of e)t[i]=s;return t},KS={name:"Room3D",setup(){const n=ap(null);let e=null;return Yh(()=>{n.value&&(e=JS(n.value))}),$h(()=>{e&&e()}),{canvas:n}}},QS={class:"scene-container"},eb={ref:"canvas",class:"webgl"};function tb(n,e,t,i,s,r){return md(),fm("div",QS,[oc("canvas",eb,null,512)])}const nb=vf(KS,[["render",tb]]),ib={name:"App",components:{Room3D:nb}};function sb(n,e,t,i,s,r){const o=Up("Room3D");return md(),pm(o)}const rb=vf(ib,[["render",sb]]),_f=Km(rb);_f.config.devtools=!1;_f.mount("#app");
