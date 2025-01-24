var n=Object.defineProperty;var c=(l,e,s)=>e in l?n(l,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):l[e]=s;var i=(l,e,s)=>c(l,typeof e!="symbol"?e+"":e,s);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();class u{constructor(){i(this,"selectors",{root:"[data-js-header]",overlay:"[data-js-header-overlay]",burgerButton:"[data-js-header-burger-button]",menuLink:"[data-js-header-menu-link]"});i(this,"stateClasses",{isActive:"is-active",isLock:"is-lock"});i(this,"onBurgerButtonClick",()=>{this.burgerButtonElement.classList.toggle(this.stateClasses.isActive),this.overlayElement.classList.toggle(this.stateClasses.isActive),document.documentElement.classList.toggle(this.stateClasses.isLock)});i(this,"onMenuLinkClick",()=>{this.stateClasses.isActive in this.overlayElement.classList||(this.burgerButtonElement.classList.remove(this.stateClasses.isActive),this.overlayElement.classList.remove(this.stateClasses.isActive),document.documentElement.classList.remove(this.stateClasses.isLock))});this.rootElement=document.querySelector(this.selectors.root),this.overlayElement=this.rootElement.querySelector(this.selectors.overlay),this.burgerButtonElement=this.rootElement.querySelector(this.selectors.burgerButton),this.menuLinksElements=this.rootElement.querySelectorAll(this.selectors.menuLink),this.bindEvents()}bindEvents(){this.burgerButtonElement.addEventListener("click",this.onBurgerButtonClick),this.menuLinksElements.forEach(e=>{e.addEventListener("click",this.onMenuLinkClick)})}}class h{constructor(){i(this,"selectors",{root:"[data-js-story]",playButton:"[data-js-story-play-button]",overlay:"[data-js-story-overlay]",exitButton:"[data-js-story-exit-button]"});i(this,"stateClasses",{isActive:"is-active",isLock:"is-lock"});i(this,"onPlayButtonClick",()=>{this.overlayElement.classList.add(this.stateClasses.isActive),document.documentElement.classList.add(this.stateClasses.isLock)});i(this,"onOverlayExit",()=>{this.overlayElement.classList.remove(this.stateClasses.isActive),document.documentElement.classList.remove(this.stateClasses.isLock),this.playerElement.contentWindow.postMessage(JSON.stringify({type:"player:pause",data:{}}),"*")});this.rootElement=document.querySelector(this.selectors.root),this.playButtonElement=this.rootElement.querySelector(this.selectors.playButton),this.overlayElement=this.rootElement.querySelector(this.selectors.overlay),this.playerElement=document.getElementById("rutube-iframe"),this.exitButtonElement=this.rootElement.querySelector(this.selectors.exitButton),this.bindEvents()}bindEvents(){this.exitButtonElement.addEventListener("click",e=>{this.onOverlayExit(),e.stopPropagation()}),this.overlayElement.addEventListener("click",e=>{e.target===e.currentTarget&&(this.onOverlayExit(),e.stopPropagation())},!0),this.playButtonElement.addEventListener("click",this.onPlayButtonClick)}}class d{constructor(){i(this,"defaultIndex",2);i(this,"selectors",{root:"[data-js-reviews]",carousel:"[data-js-reviews-carousel]",controls:"[data-js-reviews-controls]"});i(this,"stateClasses",{isActive:"is-active"});i(this,"hideReviews",()=>{this.carouselElements.forEach(e=>{e.classList.remove("is-active"),e.style.classList}),this.controlElements.forEach(e=>{e.classList.remove("is-active")})});i(this,"showReview",e=>{this.carouselElements[e].classList.add("is-active"),this.controlElements[e].classList.add("is-active")});i(this,"calcReviewMaxHeight",()=>{let e=0,s=0;this.reviewTexts.forEach((o,t)=>{this.carouselElements[t].classList.add("is-active"),o.style.height="auto",s=parseFloat(getComputedStyle(o,null).height),this.carouselElements[t].classList.remove("is-active"),e<s&&(e=s)}),this.reviewTexts.forEach(o=>{o.style.height=`${e}px`}),this.showReview(this.defaultIndex)});this.rootElement=document.querySelector(this.selectors.root),this.carouselElements=this.rootElement.querySelector(this.selectors.carousel).querySelectorAll(".reviews__carousel-item"),this.reviewTexts=this.rootElement.querySelector(this.selectors.carousel).querySelectorAll(".reviews__review-wrapper"),this.controlElements=this.rootElement.querySelector(this.selectors.controls).querySelectorAll(".reviews__controls-item"),this.bindEvents()}bindEvents(){this.hideReviews(),this.calcReviewMaxHeight(),this.showReview(this.defaultIndex),this.controlElements.forEach((e,s)=>e.addEventListener("click",()=>{this.hideReviews(),this.showReview(s),this.defaultIndex=s})),window.addEventListener("resize",this.calcReviewMaxHeight)}}class m{constructor(){i(this,"selectors",{form:"[data-js-form]",fieldErrors:"[data-js-form-field-errors]"});i(this,"errorMessages",{valueMissing:()=>"Поле обязательно для заполнения",patternMismatch:({title:e})=>e||"Данные не соответствуют формату",tooShort:({minLength:e})=>`Слишком короткое значение (минимум символов – ${e})`,tooLong:({maxLength:e})=>`Слишком длинное значение (максимум символов – ${e})`});i(this,"manageErrors",(e,s)=>{const o=e.parentElement.querySelector(this.selectors.fieldErrors),t=e.parentElement.querySelector("input")||e.parentElement.querySelector("textarea");o.innerHTML=s.map(r=>`<span class="field__error">${r}</span>`).join(""),t.style.borderColor=s.length>0?"#ff5500":"rgba(0, 0, 0, 0.1)"});i(this,"validateField",e=>{const s=e.validity,o=[];Object.entries(this.errorMessages).forEach(([r,a])=>{s[r]&&o.push(a(e))}),this.manageErrors(e,o);const t=o.length===0;return e.areaInvalid=!t,t});i(this,"onBlur",e=>{const{target:s}=e,o=s.closest(this.selectors.form);s.required&&o&&this.validateField(s)});i(this,"onSubmit",e=>{if(e.preventDefault(),!e.target.matches(this.selectors.form))return;const o=[...e.target.elements].filter(a=>a.required);let t=!0,r=null;o.forEach(a=>{this.validateField(a)||(t=!1,r||(r=a))}),t||r.focus()});i(this,"bindEvents",()=>{document.addEventListener("blur",this.onBlur,!0),document.addEventListener("submit",this.onSubmit)});this.bindEvents()}}class v{constructor(){i(this,"data",{team_card_list:[{number:"1",image_path:"/images/team/1.jpg",name:"Mickey Pearson",position:"CEO & Founder"},{number:"2",image_path:"/images/team/2.jpg",name:"Raymond Smith",position:"Engineering"},{number:"3",image_path:"/images/team/3.jpg",name:"Coach",position:"Designer"},{number:"4",image_path:"/images/team/4.jpg",name:"Fletcher",position:"Marketing"}]});i(this,"fillTemplate",()=>{var e=Handlebars.compile(document.querySelector("#template").innerHTML),s=e(this.data);document.querySelector(".team__list").innerHTML=s});i(this,"bindEvents",()=>{document.addEventListener("DOMContentLoaded",()=>{this.fillTemplate()})});this.bindEvents()}}new u;new h;new v;new d;new m;
