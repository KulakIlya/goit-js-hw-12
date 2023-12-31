var w=(a,e,r)=>{if(!e.has(a))throw TypeError("Cannot "+r)};var c=(a,e,r)=>(w(a,e,"read from private field"),r?r.call(a):e.get(a)),l=(a,e,r)=>{if(e.has(a))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(a):e.set(a,r)};import{a as M,i as y,S as C}from"./assets/vendor-328ced67.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();const n={currentSearchQuery:"",currentPage:1,isLastPage:!1},v="39057867-f9b54f51581e5f2d5762c62b3",B="https://pixabay.com/api/?",p=40;class P{constructor(){}async fetchCards(e,r){try{const i=await M.get(B,{params:{key:v,q:e,per_page:p,page:r,_image_type:"photo",_orientation:"horizontal",_safesearch:!0}});return i.data.totalHits<=r*p&&(n.isLastPage=!0,y.info({message:"We're sorry, but you've reached the end of search results."})),i.data}catch(i){console.error(i.message)}}}const L=new P;var m,h,g,d,f;class k{constructor(){l(this,m,document.querySelector(".search-form"));l(this,h,document.querySelector(".card-list"));l(this,g,document.querySelector(".loader"));l(this,d,document.querySelector(".load-more-btn"));l(this,f,new C(".card-item a",{captionsData:"alt",captionDelay:250}))}setSearchFormSubmitListener(e){c(this,m).addEventListener("submit",e)}setLoadMoreBtnClickListener(e){c(this,d).addEventListener("click",e)}renderCards({hits:e}){if(!e.length)return y.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});const r=this.getMarkup(e);c(this,h).insertAdjacentHTML("beforeend",r),c(this,f).refresh()}getMarkup(e){return e.map(({webformatURL:r,largeImageURL:i,tags:t,likes:o,views:u,comments:S,downloads:b})=>`<li class="card-item">
    <a href=${i}
      ><img src=${r} alt="${t}" height="200"/>
      <ul class="card-info">
        <li>
          Likes
          <p>${o}</p>
        </li>
        <li>
          Views
          <p>${u}</p>
        </li>
        <li>
          Comments
          <p>${S}</p>
        </li>
        <li>
          Downloads
          <p>${b}</p>
        </li>
      </ul></a
    >
  </li>`).join("")}toggleLoader(){c(this,g).classList.toggle("is-hidden")}showLoadMoreBtn(){c(this,d).classList.remove("is-hidden")}clearCardsList(){c(this,h).innerHTML=""}hideLoadMoreBtn(){c(this,d).classList.add("is-hidden")}scrollToNewCards(){const e=document.querySelector(".card-item").getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}}m=new WeakMap,h=new WeakMap,g=new WeakMap,d=new WeakMap,f=new WeakMap;const s=new k;class E{constructor(){s.setSearchFormSubmitListener(this.onSearchFormSubmit.bind(this)),s.setLoadMoreBtnClickListener(this.onLoadMoreBtnClick)}async onSearchFormSubmit(e){if(e.preventDefault(),n.currentSearchQuery=e.currentTarget.elements.search.value,!n.currentSearchQuery.trim())return;n.currentPage=1,e.currentTarget.elements.search.value="",s.clearCardsList(),s.toggleLoader(),s.hideLoadMoreBtn(),n.isLastPage=!1;const r=await L.fetchCards(n.currentSearchQuery,n.currentPage);s.renderCards(r),n.isLastPage||s.showLoadMoreBtn(),s.toggleLoader()}async onLoadMoreBtnClick(){s.hideLoadMoreBtn(),s.toggleLoader();const e=await L.fetchCards(n.currentSearchQuery,++n.currentPage);s.toggleLoader(),s.renderCards(e),s.scrollToNewCards(),n.isLastPage||s.showLoadMoreBtn()}createObserver(){const e=new IntersectionObserver((i,t)=>{i.forEach(o=>{o.isIntersecting&&(this.onLoadMoreBtnClick(),t.disconnect())})},{root:null,rootMargin:"0px",threshold:.2}),r=document.querySelector(".card-item:last-of-type");e.observe(r)}}new E;
//# sourceMappingURL=commonHelpers.js.map
