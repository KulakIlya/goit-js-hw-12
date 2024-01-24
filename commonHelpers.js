var w=(o,e,t)=>{if(!e.has(o))throw TypeError("Cannot "+t)};var n=(o,e,t)=>(w(o,e,"read from private field"),t?t.call(o):e.get(o)),l=(o,e,t)=>{if(e.has(o))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(o):e.set(o,t)};import{a as P,S as M,i as p}from"./assets/vendor-1450f39f.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))c(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const u of a.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&c(u)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerpolicy&&(a.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?a.credentials="include":r.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function c(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}})();const i={currentSearchQuery:"",currentPage:1,isLastPage:!1},C="39057867-f9b54f51581e5f2d5762c62b3",B="https://pixabay.com/api/?",y=40;class v{constructor(){}async fetchCards(e,t){try{return(await P.get(B,{params:{key:C,q:e,per_page:y,page:t,_image_type:"photo",_orientation:"horizontal",_safesearch:!0}})).data}catch(c){console.error(c.message)}}}const L=new v;var g,h,m,d,f;class k{constructor(){l(this,g,document.querySelector(".search-form"));l(this,h,document.querySelector(".card-list"));l(this,m,document.querySelector(".loader"));l(this,d,document.querySelector(".load-more-btn"));l(this,f,new M(".card-item a",{captionsData:"alt",captionDelay:250}))}setSearchFormSubmitListener(e){n(this,g).addEventListener("submit",e)}setLoadMoreBtnClickListener(e){n(this,d).addEventListener("click",e)}renderCards({hits:e}){if(!e.length)return p.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});const t=this.getMarkup(e);n(this,h).insertAdjacentHTML("beforeend",t),n(this,f).refresh()}getMarkup(e){return e.map(({webformatURL:t,largeImageURL:c,tags:r,likes:a,views:u,comments:S,downloads:b})=>`<li class="card-item">
    <a href=${c}
      ><img src=${t} alt="${r}" height="200"/>
      <ul class="card-info">
        <li>
          Likes
          <p>${a}</p>
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
  </li>`).join("")}toggleLoader(){n(this,m).classList.toggle("is-hidden")}showLoadMoreBtn(){n(this,d).classList.remove("is-hidden")}clearCardsList(){n(this,h).innerHTML=""}hideLoadMoreBtn(){n(this,d).classList.add("is-hidden")}scrollToNewCards(){const e=document.querySelector(".card-item").getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}}g=new WeakMap,h=new WeakMap,m=new WeakMap,d=new WeakMap,f=new WeakMap;const s=new k;class E{constructor(){s.setSearchFormSubmitListener(this.onSearchFormSubmit.bind(this)),s.setLoadMoreBtnClickListener(this.onLoadMoreBtnClick.bind(this))}async onSearchFormSubmit(e){if(e.preventDefault(),i.currentSearchQuery=e.currentTarget.elements.search.value,!i.currentSearchQuery.trim())return;i.currentPage=1,i.isLastPage=!1,e.currentTarget.elements.search.value="",s.clearCardsList(),s.toggleLoader(),s.hideLoadMoreBtn();const t=await L.fetchCards(i.currentSearchQuery,i.currentPage);this.isLastPage(t),s.renderCards(t),!i.isLastPage&&t.totalHits&&s.showLoadMoreBtn(),s.toggleLoader()}async onLoadMoreBtnClick(){s.hideLoadMoreBtn(),s.toggleLoader();const e=await L.fetchCards(i.currentSearchQuery,++i.currentPage);s.toggleLoader(),this.isLastPage(e),s.renderCards(e),s.scrollToNewCards(),i.isLastPage||s.showLoadMoreBtn()}isLastPage(e){if(e.totalHits<=i.currentPage*y&&e.totalHits){i.isLastPage=!0,p.info({message:"We're sorry, but you've reached the end of search results."});return}}}new E;
//# sourceMappingURL=commonHelpers.js.map
