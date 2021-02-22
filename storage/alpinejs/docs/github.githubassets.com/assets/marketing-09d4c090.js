!function(){"use strict";function e(){if(!(this instanceof e))return new e;this.size=0,this.uid=0,this.selectors=[],this.indexes=Object.create(this.indexes),this.activeIndexes=[]}var t=window.document.documentElement,n=t.matches||t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.msMatchesSelector;e.prototype.matchesSelector=function(e,t){return n.call(e,t)},e.prototype.querySelectorAll=function(e,t){return t.querySelectorAll(e)},e.prototype.indexes=[];var r=/^#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;e.prototype.indexes.push({name:"ID",selector:function(e){var t;if(t=e.match(r))return t[0].slice(1)},element:function(e){if(e.id)return[e.id]}});var o=/^\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;e.prototype.indexes.push({name:"CLASS",selector:function(e){var t;if(t=e.match(o))return t[0].slice(1)},element:function(e){var t=e.className;if(t){if("string"==typeof t)return t.split(/\s/);if("object"==typeof t&&"baseVal"in t)return t.baseVal.split(/\s/)}}});var i,s=/^((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;e.prototype.indexes.push({name:"TAG",selector:function(e){var t;if(t=e.match(s))return t[0].toUpperCase()},element:function(e){return[e.nodeName.toUpperCase()]}}),e.prototype.indexes.default={name:"UNIVERSAL",selector:function(){return!0},element:function(){return[!0]}},i="function"==typeof window.Map?window.Map:function(){function e(){this.map={}}return e.prototype.get=function(e){return this.map[e+" "]},e.prototype.set=function(e,t){this.map[e+" "]=t},e}();var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g;function c(e,t){var n,r,o,i,s,c,l=(e=e.slice(0).concat(e.default)).length,u=t,d=[];do{if(a.exec(""),(o=a.exec(u))&&(u=o[3],o[2]||!u))for(n=0;n<l;n++)if(s=(c=e[n]).selector(o[1])){for(r=d.length,i=!1;r--;)if(d[r].index===c&&d[r].key===s){i=!0;break}i||d.push({index:c,key:s});break}}while(o);return d}function l(e,t){var n,r,o;for(n=0,r=e.length;n<r;n++)if(o=e[n],t.isPrototypeOf(o))return o}function u(e,t){return e.id-t.id}e.prototype.logDefaultIndexUsed=function(){},e.prototype.add=function(e,t){var n,r,o,s,a,u,d,m,f=this.activeIndexes,g=this.selectors;if("string"==typeof e){for(n={id:this.uid++,selector:e,data:t},d=c(this.indexes,e),r=0;r<d.length;r++)s=(m=d[r]).key,(a=l(f,o=m.index))||((a=Object.create(o)).map=new i,f.push(a)),o===this.indexes.default&&this.logDefaultIndexUsed(n),(u=a.map.get(s))||(u=[],a.map.set(s,u)),u.push(n);this.size++,g.push(e)}},e.prototype.remove=function(e,t){if("string"==typeof e){var n,r,o,i,s,a,l,u,d=this.activeIndexes,m={},f=1===arguments.length;for(n=c(this.indexes,e),o=0;o<n.length;o++)for(r=n[o],i=d.length;i--;)if(a=d[i],r.index.isPrototypeOf(a)){if(l=a.map.get(r.key))for(s=l.length;s--;)(u=l[s]).selector!==e||!f&&u.data!==t||(l.splice(s,1),m[u.id]=!0);break}this.size-=Object.keys(m).length}},e.prototype.queryAll=function(e){if(!this.selectors.length)return[];var t,n,r,o,i,s,a,c,l={},d=[],m=this.querySelectorAll(this.selectors.join(", "),e);for(t=0,r=m.length;t<r;t++)for(i=m[t],n=0,o=(s=this.matches(i)).length;n<o;n++)l[(c=s[n]).id]?a=l[c.id]:(a={id:c.id,selector:c.selector,data:c.data,elements:[]},l[c.id]=a,d.push(a)),a.elements.push(i);return d.sort(u)},e.prototype.matches=function(e){if(!e)return[];var t,n,r,o,i,s,a,c,l,d,m,f=this.activeIndexes,g={},h=[];for(t=0,o=f.length;t<o;t++)if(c=(a=f[t]).element(e))for(n=0,i=c.length;n<i;n++)if(l=a.map.get(c[n]))for(r=0,s=l.length;r<s;r++)!g[m=(d=l[r]).id]&&this.matchesSelector(e,d.selector)&&(g[m]=!0,h.push(d));return h.sort(u)};var d=null,m=null,f=[];function g(e,t){var n=[];function r(){var e=n;n=[],t(e)}return function(){for(var t=arguments.length,o=Array(t),i=0;i<t;i++)o[i]=arguments[i];n.push(o),1===n.length&&h(e,r)}}function h(e,t){m||(m=new MutationObserver(v)),d||(d=e.createElement("div"),m.observe(d,{attributes:!0})),f.push(t),d.setAttribute("data-twiddle",""+Date.now())}function v(){var e=f;f=[];for(var t=0;t<e.length;t++)try{e[t]()}catch(n){setTimeout((function(){throw n}),0)}}var p=new WeakMap,y=new WeakMap,b=new WeakMap,w=new WeakMap;function j(e,t){for(var n=0;n<t.length;n++){var r=t[n],o=r[0],i=r[1],s=r[2];o===E?(A(s,i),S(s,i)):o===T?L(s,i):o===M&&q(e.observers,i)}}function A(e,t){if(t instanceof e.elementConstructor){var n=p.get(t);if(n||(n=[],p.set(t,n)),-1===n.indexOf(e.id)){var r=void 0;if(e.initialize&&(r=e.initialize.call(void 0,t)),r){var o=y.get(t);o||(o={},y.set(t,o)),o[""+e.id]=r}n.push(e.id)}}}function S(e,t){if(t instanceof e.elementConstructor){var n=w.get(t);if(n||(n=[],w.set(t,n)),-1===n.indexOf(e.id)){e.elements.push(t);var r=y.get(t),o=r?r[""+e.id]:null;if(o&&o.add&&o.add.call(void 0,t),e.subscribe){var i=e.subscribe.call(void 0,t);if(i){var s=b.get(t);s||(s={},b.set(t,s)),s[""+e.id]=i}}e.add&&e.add.call(void 0,t),n.push(e.id)}}}function L(e,t){if(t instanceof e.elementConstructor){var n=w.get(t);if(n){var r=e.elements.indexOf(t);if(-1!==r&&e.elements.splice(r,1),-1!==(r=n.indexOf(e.id))){var o=y.get(t),i=o?o[""+e.id]:null;if(i&&i.remove&&i.remove.call(void 0,t),e.subscribe){var s=b.get(t),a=s?s[""+e.id]:null;a&&a.unsubscribe&&a.unsubscribe()}e.remove&&e.remove.call(void 0,t),n.splice(r,1)}0===n.length&&w.delete(t)}}}function q(e,t){var n=w.get(t);if(n){for(var r=n.slice(0),o=0;o<r.length;o++){var i=e[r[o]];if(i){var s=i.elements.indexOf(t);-1!==s&&i.elements.splice(s,1);var a=y.get(t),c=a?a[""+i.id]:null;c&&c.remove&&c.remove.call(void 0,t);var l=b.get(t),u=l?l[""+i.id]:null;u&&u.unsubscribe&&u.unsubscribe(),i.remove&&i.remove.call(void 0,t)}}w.delete(t)}}var x=null;function k(e){return"matches"in e||"webkitMatchesSelector"in e||"mozMatchesSelector"in e||"oMatchesSelector"in e||"msMatchesSelector"in e}var E=1,T=2,M=3;function O(e,t,n){for(var r=0;r<n.length;r++){var o=n[r];"childList"===o.type?(C(e,t,o.addedNodes),I(e,t,o.removedNodes)):"attributes"===o.type&&N(e,t,o.target)}(function(e){if(null===x){var t=e.createElement("div"),n=e.createElement("div"),r=e.createElement("div");t.appendChild(n),n.appendChild(r),t.innerHTML="",x=r.parentNode!==n}return x})(e.ownerDocument)&&function(e,t){for(var n=0;n<e.observers.length;n++){var r=e.observers[n];if(r)for(var o=r.elements,i=0;i<o.length;i++){var s=o[i];s.parentNode||t.push([M,s])}}}(e,t)}function C(e,t,n){for(var r=0;r<n.length;r++){var o=n[r];if(k(o))for(var i=e.selectorSet.matches(o),s=0;s<i.length;s++){var a=i[s].data;t.push([E,o,a])}if("querySelectorAll"in o)for(var c=e.selectorSet.queryAll(o),l=0;l<c.length;l++)for(var u=c[l],d=u.data,m=u.elements,f=0;f<m.length;f++)t.push([E,m[f],d])}}function I(e,t,n){for(var r=0;r<n.length;r++){var o=n[r];if("querySelectorAll"in o){t.push([M,o]);for(var i=o.querySelectorAll("*"),s=0;s<i.length;s++)t.push([M,i[s]])}}}function N(e,t,n){if(k(n))for(var r=e.selectorSet.matches(n),o=0;o<r.length;o++){var i=r[o].data;t.push([E,n,i])}if("querySelectorAll"in n){var s=w.get(n);if(s)for(var a=0;a<s.length;a++){var c=e.observers[s[a]];c&&(e.selectorSet.matchesSelector(n,c.selector)||t.push([T,n,c]))}}}var F="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},D=0;function $(t){this.rootNode=9===t.nodeType?t.documentElement:t,this.ownerDocument=9===t.nodeType?t:t.ownerDocument,this.observers=[],this.selectorSet=new e,this.mutationObserver=new MutationObserver(z.bind(this,this)),this._scheduleAddRootNodes=g(this.ownerDocument,P.bind(this,this)),this._handleThrottledChangedTargets=g(this.ownerDocument,H.bind(this,this)),this.rootNode.addEventListener("change",B.bind(this,this),!1),function(e,t){var n=e.readyState;"interactive"===n||"complete"===n?h(e,t):e.addEventListener("DOMContentLoaded",h(e,t))}(this.ownerDocument,W.bind(this,this))}function W(e){e.mutationObserver.observe(e.rootNode,{childList:!0,attributes:!0,subtree:!0}),e._scheduleAddRootNodes()}function P(e){var t=[];C(e,t,[e.rootNode]),j(e,t)}function z(e,t){var n=[];O(e,n,t),j(e,n)}function B(e,t){e._handleThrottledChangedTargets(t.target)}function H(e,t){var n=[];!function(e,t,n){for(var r=0;r<n.length;r++)for(var o=n[r],i=o.form?o.form.elements:e.rootNode.querySelectorAll("input"),s=0;s<i.length;s++)N(e,t,i[s])}(e,n,t),j(e,n)}$.prototype.disconnect=function(){this.mutationObserver.disconnect()},$.prototype.observe=function(e,t){var n=void 0;"function"==typeof t?n={selector:e,initialize:t}:"object"===(void 0===t?"undefined":F(t))?(n=t).selector=e:n=e;var r=this,o={id:D++,selector:n.selector,initialize:n.initialize,add:n.add,remove:n.remove,subscribe:n.subscribe,elements:[],elementConstructor:n.hasOwnProperty("constructor")?n.constructor:this.ownerDocument.defaultView.Element,abort:function(){r._abortObserving(o)}};return this.selectorSet.add(o.selector,o),this.observers[o.id]=o,this._scheduleAddRootNodes(),o},$.prototype._abortObserving=function(e){for(var t=e.elements,n=0;n<t.length;n++)L(e,t[n]);this.selectorSet.remove(e.selector,e),delete this.observers[e.id]},$.prototype.triggerObservers=function(e){var t=[];!function(e,t,n){if("querySelectorAll"in n){N(e,t,n);for(var r=n.querySelectorAll("*"),o=0;o<r.length;o++)N(e,t,r[o])}}(this,t,e),j(this,t)};var R=void 0;function _(){return R||(R=new $(window.document)),R}function U(){var e;return(e=_()).observe.apply(e,arguments)}const V="build-in-animate",X=.01;U(".js-build-in-trigger[data-build-in-stagger], .js-build-in-group[data-build-in-stagger]",(e=>{const t=parseInt(e.getAttribute("data-build-in-stagger")),n=e.querySelectorAll(".js-build-in-item");for(let r=0;r<n.length;r++)n[r].style.transitionDelay=r*t+"ms"}));const Y=new IntersectionObserver(G,{rootMargin:"-0% 0% -30% 0%",threshold:X});function G(e){for(const t of e)if(t.target.classList.toggle(V,t.isIntersecting),t.target.classList.contains("js-build-in-trigger"))for(const e of t.target.querySelectorAll(".js-build-in-item"))e.classList.toggle(V,t.isIntersecting)}function J(e){const t=Number(e.getAttribute("data-build-margin-bottom")||30),n=Number(e.getAttribute("data-build-margin-top")||0),r=Number(e.getAttribute("data-build-threshold")||X);return{marginBottom:t,marginTop:n,threshold:r,isDefault:30===t&&0===n&&r===X}}let K,Q,Z;U(".js-build-in, .js-build-in-trigger",(e=>{const t=J(e);if(t.isDefault)return Y.observe(e);new IntersectionObserver(G,{rootMargin:`-${t.marginTop}% 0% -${t.marginBottom}% 0%`,threshold:t.threshold}).observe(e)})),U(".js-viewport-aware-video",{constructor:HTMLMediaElement,add(e){const t=e.getAttribute("data-threshold")||"0.2";new IntersectionObserver((t=>{for(const n of t)n.isIntersecting?e.play():e.pause()}),{threshold:Number(t)}).observe(e)}});let ee=null;function te(e){if(!e)return;const t=e.querySelectorAll("img"),n=e.querySelectorAll("img.diversity-current-avatar");if(t.length)if(n.length){if(!(t.length<2))for(let r=0;r<t.length;r++){const e=t[r];if(e.matches(".diversity-current-avatar")){e.classList.remove("diversity-current-avatar");let n=r+1;n=n>=t.length?0:n,t[n].classList.add("diversity-current-avatar");break}}}else t[0].classList.add("diversity-current-avatar")}function ne(e){if(window.clearInterval(K),window.clearInterval(Q),window.clearTimeout(undefined),e&&e.length)for(let t=0;t<e.length;t++){const n=e[t].querySelector("img.diversity-current-avatar");n&&n.classList.remove("diversity-current-avatar")}}function re(e){const t=Number(e.getAttribute("data-avatar-swap-setup-delay")||250),n=Number(e.getAttribute("data-avatar-swap-delay")||3e3);if(Z=e.querySelectorAll(".diversity-avatar-stack"),!Z||!Z.length)return;let r=0;Q=window.setInterval((()=>{te(Z[r]),r+=1,r>=Z.length&&(window.clearInterval(Q),r=0,K=window.setInterval((()=>{te(Z[r]),r+=1,r=r>=Z.length?0:r}),n))}),t)}function oe(e){for(const t of e)t.isIntersecting?(ee=t.target,re(t.target)):Z&&ee&&ee.isEqualNode(t.target)&&ne(Z)}U(".js-diversity-avatar-stacks",(e=>{const t=J(e);new IntersectionObserver(oe,{rootMargin:`-${t.marginTop}% 0% -${t.marginBottom}% 0%`,threshold:t.threshold}).observe(e)}));U(".js-type-in, .js-type-in-item",(e=>ae(e)));const ie=new IntersectionObserver(se,{rootMargin:"-0% 0% -30% 0%",threshold:X});function se(e){for(const t of e)if(t.isIntersecting?ce(t.target):ae(t.target),t.target.classList.contains("js-type-in-trigger"))for(const e of t.target.querySelectorAll(".js-type-in-item"))t.isIntersecting?ce(e):ae(e)}function ae(e){const t=e.querySelectorAll(".js-type-row, .js-type-letters");for(const n of t)n.style.visibility="hidden";e.classList.remove(V)}function ce(e){if(e.classList.contains(V))return;e.classList.add(V);const t=e.querySelectorAll(".js-type-row, .js-type-letters"),n=Number(e.getAttribute("data-type-delay")||20),r=Number(e.getAttribute("data-type-row-delay")||200);setTimeout((()=>le(e,t,0,"",r)),n)}function le(e,t,n,r,o){if(n>=t.length)return;const i=t[n];if(e.classList.contains(V)){if(i.classList.contains("js-type-row"))return i.style.visibility="visible",n++,void setTimeout((()=>le(e,t,n,"",o)),o);"hidden"===i.style.visibility&&null!=i.textContent&&(r=i.textContent,i.textContent="",i.style.visibility="visible",i.classList.add("animation-is-typing")),null!=i.textContent&&r.length>i.textContent.length?i.textContent=r.substr(0,i.textContent.length+1):++n<t.length&&i.classList.remove("animation-is-typing"),setTimeout((()=>le(e,t,n,r,o)),20)}else""!==r&&(i.textContent=r)}U(".js-type-in, .js-type-in-trigger",(e=>{const t=J(e);if(t.isDefault)return ie.observe(e);new IntersectionObserver(se,{rootMargin:`-${t.marginTop}% 0% -${t.marginBottom}% 0%`,threshold:t.threshold}).observe(e)})),U(".js-section-codespaces-develop",(e=>{setInterval((()=>{e.classList.toggle("section-codespaces-develop-night")}),7100)}));const ue=["Update the headers","Tweak the spacing","Clean up unused selectors"],de=["c9de5ce","2cde51f","b6d9310"];let me=0;function fe(e){const t=e.textContent;if(null===t)return;if(me<ue.length&&t.length<ue[me].length){e.textContent=ue[me].slice(0,t.length+1);const n=t.length===ue[me].length-1?200:0;return void setTimeout((()=>fe(e)),45+n)}e.textContent="";const n=document.querySelector(".js-codespaces-notif");n.classList.add("codespaces-notif-visible"),document.querySelector(".js-codespaces-notif-hash").textContent=de[me],me=me===ue.length-1?0:me+1,setTimeout((()=>{n.classList.remove("codespaces-notif-visible"),fe(e)}),3700)}U(".js-codespaces-illo-commit-msg",(e=>{setTimeout((()=>fe(e)),45)}));var ge={},he={},ve=new WeakMap,pe=new WeakMap,ye=new WeakMap,be=Object.getOwnPropertyDescriptor(Event.prototype,"currentTarget");function we(e,t,n){var r=e[t];return e[t]=function(){return n.apply(e,arguments),r.apply(e,arguments)},e}function je(){ve.set(this,!0)}function Ae(){ve.set(this,!0),pe.set(this,!0)}function Se(){return ye.get(this)||null}function Le(e,t){be&&Object.defineProperty(e,"currentTarget",{configurable:!0,enumerable:!0,get:t||be.get})}function qe(e){if(function(e){try{return e.eventPhase,!0}catch(t){return!1}}(e)){var t=(1===e.eventPhase?he:ge)[e.type];if(t){var n=function(e,t,n){var r=[],o=t;do{if(1!==o.nodeType)break;var i=e.matches(o);if(i.length){var s={node:o,observers:i};n?r.unshift(s):r.push(s)}}while(o=o.parentElement);return r}(t,e.target,1===e.eventPhase);if(n.length){we(e,"stopPropagation",je),we(e,"stopImmediatePropagation",Ae),Le(e,Se);for(var r=0,o=n.length;r<o&&!ve.get(e);r++){var i=n[r];ye.set(e,i.node);for(var s=0,a=i.observers.length;s<a&&!pe.get(e);s++)i.observers[s].data.call(i.node,e)}ye.delete(e),Le(e)}}}}function xe(t,n,r){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},i=!!o.capture,s=i?he:ge,a=s[t];a||(a=new e,s[t]=a,document.addEventListener(t,qe,i)),a.add(n,r)}const ke="active";function Ee(e){const t=document.getElementsByClassName("customer-story");for(const o of t)o.classList.remove(ke);t[e].classList.add(ke);const n=document.getElementsByClassName("js-customer-story-offset")[0],r=function(e,t){const n=Math.round(e.length/2)-1;return 50*(n-t)-75}(t,e);n.setAttribute("style",`transform: translateX(${r}%)`)}xe("click",".js-customer-stories-toggle-right",(()=>{const e=document.getElementsByClassName("customer-story"),t=document.querySelectorAll(".customer-story.active")[0],n=Array.from(e).indexOf(t);n===e.length-1?Ee(0):Ee(n+1)})),xe("click",".js-customer-stories-toggle-left",(()=>{const e=document.getElementsByClassName("customer-story"),t=document.querySelectorAll(".customer-story.active")[0],n=Array.from(e).indexOf(t);Ee(0===n?e.length-1:n-1)})),xe("click",".js-customer-story",(e=>{const t=e.currentTarget,n=document.getElementsByClassName("customer-story"),r=Array.from(n).indexOf(t);t.classList.contains("active")||(e.preventDefault(),Ee(r))}));const Te=new WeakMap;U(".js-insights-hero-block",{add(e){Te.set(e,setTimeout((function t(){const n=Array.from(document.querySelectorAll(".js-insights-hero-chart")),r=document.querySelector(".js-insights-hero-chart.js-show"),o=n.indexOf(r)+1,i=n[o===n.length?0:o];for(const e of n)e.classList.toggle("js-show",i===e);Te.set(e,setTimeout(t,4e3))}),4e3))},remove(e){const t=Te.get(e);clearTimeout(t)}});let Me,Oe,Ce,Ie,Ne,Fe;function De(e){const t=function(e){return Array.from(document.querySelectorAll(".js-pricing-plan-card")).indexOf(e)}(e);return Array.from(document.querySelectorAll(".js-pricing-plan-tab"))[t]}function $e(){const e=window.innerWidth/2;let t=document.querySelector(".js-pricing-plan-card"),n=window.innerWidth;for(const r of Ie){const o=r.getBoundingClientRect().left+r.getBoundingClientRect().width/2,i=Math.abs(e-o);o>0&&o<window.innerWidth&&i<n&&(t=r,n=i)}document.querySelector(".pricing-plan-tab-active").classList.remove("pricing-plan-tab-active");De(t).classList.add("pricing-plan-tab-active")}function We(e){const t=e.currentTarget;if(!(t instanceof HTMLElement))return;if(t.classList.contains("pricing-testimonial-logo-active"))return;const n=function(e){const t=Pe(e);return Array.from(document.querySelectorAll(".js-pricing-testimonial-quote"))[t]}(t),r=function(e){const t=Pe(e);return Array.from(document.querySelectorAll(".js-pricing-testimonial-img"))[t]}(t);document.querySelector(".pricing-testimonial-logo-active").classList.remove("pricing-testimonial-logo-active"),t.classList.add("pricing-testimonial-logo-active");for(const o of document.querySelectorAll(".pricing-testimonial-content-active"))o.classList.remove("pricing-testimonial-content-active");n.classList.add("pricing-testimonial-content-active"),r.classList.add("pricing-testimonial-content-active")}function Pe(e){return Array.from(document.querySelectorAll(".js-pricing-testimonial-logo")).indexOf(e)}U(".js-packages-video-1",(()=>{Me=document.querySelector(".js-packages-video-1"),Me.play(),Me.classList.remove("packages-video-hidden"),Me.addEventListener("timeupdate",(()=>{Me.currentTime>1.4&&(Oe.play(),Oe.classList.remove("packages-video-hidden"))}))})),U(".js-packages-video-2",(()=>{Oe=document.querySelector(".js-packages-video-2"),Oe.pause(),Oe.addEventListener("timeupdate",(()=>{Oe.currentTime>2.8&&(Ce.play(),Ce.classList.remove("packages-video-hidden"))}))})),U(".js-packages-video-3",(()=>{Ce=document.querySelector(".js-packages-video-3"),Ce.pause(),Ce.addEventListener("timeupdate",(()=>{Ce.currentTime>4.5&&(Me.currentTime=0,Me.play(),Ce.classList.add("packages-video-hidden"),Ce.pause(),Ce.currentTime=0,setTimeout((()=>{Oe.classList.add("packages-video-hidden"),Oe.pause(),Oe.currentTime=0}),160))}))})),xe("click",".js-launch-sales-chat",(function(e){const t=window.screenX,n=window.screenY,r=440,o=500,i=["width="+r,"height="+o,"location=no","resizable=yes","scrollbars=yes","left="+(window.innerWidth+t-(r+16)),"top="+(window.innerHeight+n-(o-64))],s=window.location.pathname.split("/").filter((function(e){return""!==e})).slice(-1)[0];window.open("https://sales-chat.github.com/"+s,"Sales_Chat",i.join(",")),e.preventDefault()})),xe("click",".js-pricing-plan-tab",(function(e){const t=e.currentTarget;if(!(t instanceof HTMLElement))return;document.querySelector(".pricing-plan-tab-active").classList.remove("pricing-plan-tab-active"),t.classList.add("pricing-plan-tab-active");const n=function(e){const t=function(e){return Array.from(document.querySelectorAll(".js-pricing-plan-tab")).indexOf(e)}(e);return Array.from(document.querySelectorAll(".js-pricing-plan-card"))[t]}(t),r=n.offsetLeft-(window.innerWidth-n.clientWidth)/2;document.querySelector(".js-pricing-plans-container").scrollTo({top:0,left:r,behavior:"smooth"})})),U(".js-pricing-plans-container",(()=>{document.querySelector(".js-pricing-plans-container").addEventListener("wheel",$e,{capture:!1,passive:!0}),"ontouchstart"in window&&document.querySelector(".js-pricing-plans-container").addEventListener("scroll",$e,{capture:!1})})),U(".js-pricing-plans-container .js-pricing-plan-card",(()=>{Ie=Array.from(document.querySelectorAll(".js-pricing-plans-container .js-pricing-plan-card"))})),xe("click",".js-pricing-learn-more-gh1",(function(){for(const e of document.querySelectorAll(".js-pricing-github-one-container"))e.classList.remove("pricing-github-one-container-hidden");for(const e of document.querySelectorAll(".js-pricing-learn-more-container"))e.classList.add("pricing-learn-more-container-collapsed");for(const e of document.querySelectorAll(".js-pricing-github-one-details"))e.classList.remove("pricing-github-one-details-collapsed")})),U(".js-pricing-testimonial-logo",(()=>{for(const e of document.querySelectorAll(".js-pricing-testimonial-logo"))e.addEventListener("mouseenter",We)})),xe("click",".js-pricing-testimonial-logo",(e=>{We(e)})),xe("click",".js-toggle-pricing-details",(e=>{e.stopPropagation();const t=e.currentTarget.closest(".js-pricing-matrix-row");t.querySelector(".js-pricing-matrix-details").classList.toggle("pricing-matrix-details-visible"),t.querySelector(".js-pricing-expand-arrow").classList.toggle("pricing-expand-arrow-open")}));let ze=0,Be=0,He=1,Re=1;let _e,Ue=0,Ve=0;const Xe="data-skew-x",Ye="data-skew-y",Ge="data-skew-target-x",Je="data-skew-target-y";function Ke(){Ue+=.2*(ze-Ue),Ve+=.2*(Be-Ve);const e=Math.floor(Ue+.5)-ze,t=Math.floor(Ve+.5)-Be;He+=.1*(.3*e-He),Re+=.1*(.3*t-Re),Fe.style.transform=`translate(${Ue}px, ${Ve}px) perspective(1000px) rotateX(${Re}deg) rotateY(${-He}deg)`,_e=window.requestAnimationFrame(Ke)}function Qe(e){const t=function(e){const t=e.getAttribute(Xe)||"0",n=e.getAttribute(Ye)||"0",r=e.getAttribute(Ge)||"0",o=e.getAttribute(Je)||"0";return{x:parseFloat(t),y:parseFloat(n),targetX:parseFloat(r),targetY:parseFloat(o)}}(e);if(0===t.x&&0===t.y&&0===t.targetX&&0===t.targetY)return void e.setAttribute("data-animation-is-running","false");let n=t.x+.1*(t.targetX-t.x),r=t.y+.1*(t.targetY-t.y);n=Math.round(1e3*(n+Number.EPSILON))/1e3,r=Math.round(1e3*(r+Number.EPSILON))/1e3,n*n<.005&&(n=0),r*r<.005&&(r=0),e.setAttribute(Xe,""+n),e.setAttribute(Ye,""+r),e.style.transform=`perspective(1000px) rotateX(${-n}deg) rotateY(${r}deg)`,window.requestAnimationFrame((()=>Qe(e)))}U(".js-readme-tracker-container",(()=>{Ne=document.querySelector(".js-readme-tracker-container"),Fe=document.querySelector(".js-readme-tracker-stalker"),Ne.addEventListener("mousemove",(e=>{ze=e.pageX-Ne.offsetLeft-.3*Fe.clientWidth,Be=e.pageY-Ne.offsetTop-.3*Fe.clientHeight})),Ne.addEventListener("mouseleave",(()=>{window.cancelAnimationFrame(_e)})),Ne.addEventListener("mouseenter",(()=>{_e=window.requestAnimationFrame(Ke)}))})),U(".js-readme-story-list",(()=>{const e=Array.from(document.querySelectorAll(".js-readme-story-list-item"));for(const t of e){const n=e.indexOf(t);t.addEventListener("mouseenter",(()=>{const e=document.querySelector(`.js-readme-story-list-img:nth-of-type(${n+1})`),t=document.querySelector(".readme-story-list-img-container--animate-out");t instanceof HTMLElement&&t.classList.remove("readme-story-list-img-container--animate-out");const r=document.querySelector(".readme-story-list-img-container--visible");r instanceof HTMLElement&&(r.classList.remove("readme-story-list-img-container--visible"),r.classList.add("readme-story-list-img-container--animate-out")),e.classList.add("readme-story-list-img-container--visible")}))}document.querySelector(".js-readme-story-list").addEventListener("mouseleave",(()=>{const e=document.querySelector(".readme-story-list-img-container--visible");e instanceof HTMLElement&&(e.classList.remove("readme-story-list-img-container--visible"),e.classList.add("readme-story-list-img-container--animate-out"))}))})),U(".js-readme-rotate",(e=>{const t=e;t.addEventListener("mousemove",(e=>{const t=e,n=t.target;if(null===n)return;const r=n.getBoundingClientRect(),o=t.x-r.left,i=t.y-r.top,s=o/r.width;let a=4*(i/r.height-.5),c=4*(s-.5);a=Math.round(1e3*(a+Number.EPSILON))/1e3,c=Math.round(1e3*(c+Number.EPSILON))/1e3,n.setAttribute(Ge,""+a),n.setAttribute(Je,""+c)})),t.addEventListener("mouseleave",(e=>{const t=e.target;null!==t&&(t.setAttribute(Ge,"0"),t.setAttribute(Je,"0"))})),t.addEventListener("mouseenter",(()=>{"true"!==t.getAttribute("data-animation-is-running")&&(t.setAttribute("data-animation-is-running","true"),window.requestAnimationFrame((()=>Qe(t))))}))})),U(".readme-story-body blockquote p",(e=>{if(null==(e=e).textContent)return;const t=document.querySelector("meta[name=maintainer-name]");if(null==t||!(t instanceof HTMLMetaElement))throw new Error("could not find maintainer-name on document");const n=document.createElement("a");n.classList.add("readme-story-blockquote-tweet");const r=`“${e.textContent}” — ${t.content}`;n.href=`https://twitter.com/intent/tweet?url=${encodeURI(window.location.href)}&text=${encodeURI(r)}`,n.setAttribute("aria-label","Tweet: "+e.textContent),n.setAttribute("target","_blank"),n.setAttribute("rel","noopener"),e.appendChild(n)}));const Ze=new IntersectionObserver((function(e){for(const t of e)if(t.isIntersecting)for(const e of document.querySelectorAll(".js-scrollnav-item"))e.classList.toggle("selected",e.getAttribute("href")==="#"+t.target.id)}),{root:null,rootMargin:"0px",threshold:.1});U(".js-section",(e=>Ze.observe(e)));class VideoAnimationElement extends HTMLElement{connectedCallback(){const e=this.querySelectorAll("video"),t=e[0],n=e[1];if(!t||!n)return;new IntersectionObserver((function(e){for(const r of e)r.isIntersecting?t.play():(t.pause(),t.currentTime=0,n.hidden=!0,t.hidden=!1)}),{root:null,rootMargin:"0px",threshold:this.threshold}).observe(this),t.addEventListener("ended",(function(){t.hidden=!0,n.hidden=!1,n.play()}))}get threshold(){let e=this.getAttribute("data-threshold");return null==e&&(e="0.2"),Number(e)}set threshold(e){e?this.setAttribute("threshold",e.toString()):this.removeAttribute("threshold")}}function et(e){e.removeEventListener("wheel",tt,!1),"ontouchstart"in window&&e.removeEventListener("scroll",tt,!1)}function tt(e){const t=e.currentTarget,n=document.querySelector(".js-horizontal-scroll-to-end");et(t),null==n||n.remove()}window.customElements.get("video-animation")||(window.VideoAnimationElement=VideoAnimationElement,window.customElements.define("video-animation",VideoAnimationElement)),U(".js-features-nav-container",(()=>{document.querySelector(".js-features-nav-container").addEventListener("wheel",tt,{capture:!1,passive:!0}),"ontouchstart"in window&&document.querySelector(".js-features-nav-container").addEventListener("scroll",tt,{capture:!1})})),xe("click",".js-horizontal-scroll-to-end",(function(e){const t=e.currentTarget,n=document.querySelector(".js-features-nav-container"),r=n.querySelector("nav").lastElementChild,o=r.offsetLeft+r.clientWidth-n.clientWidth;et(n),null==t||t.remove(),n.scrollTo({top:0,left:o,behavior:"smooth"})})),xe("click",".js-features-category-items-unveil",(function(e){e.preventDefault();const t=e.currentTarget,n=t.closest(".js-features-category-items");if(!n)return;t.remove();const r=n.querySelectorAll(".features-category-item");for(const o of r)o.classList.add("js-features-category-item-visible");if(r.length>3){const e=r[3].querySelector("[tabindex], a");null==e||e.focus()}})),xe("click",".js-features-page-nav .js-scrollnav-item",(function(e){e.currentTarget.closest(".js-features-page-nav").classList.remove("on")})),xe("click",".js-toggler-target-off",(e=>{if(0!==e.button)return;const t=e.currentTarget.closest(".js-toggler-container");t&&t.classList.remove("on")}));const nt=new IntersectionObserver((e=>{for(const t of e)t.isIntersecting?t.target.removeAttribute("tabindex"):t.target.setAttribute("tabindex","-1")}),{rootMargin:"0% 0% 0% 0%",threshold:0});U(".js-home-repo-card",(e=>{nt.observe(e)}))}();
//# sourceMappingURL=marketing-9095eba1.js.map