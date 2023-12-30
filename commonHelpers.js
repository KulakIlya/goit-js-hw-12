var y=(r,e,t)=>{if(!e.has(r))throw TypeError("Cannot "+t)};var n=(r,e,t)=>(y(r,e,"read from private field"),t?t.call(r):e.get(r)),l=(r,e,t)=>{if(e.has(r))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(r):e.set(r,t)},P=(r,e,t,s)=>(y(r,e,"write to private field"),s?s.call(r,t):e.set(r,t),t),S=(r,e,t,s)=>({set _(o){P(r,e,o,t)},get _(){return n(r,e,s)}});import{a as v,i as C,S as k}from"./assets/vendor-328ced67.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const u of i.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function t(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerpolicy&&(i.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?i.credentials="include":o.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=t(o);fetch(o.href,i)}})();const c={currentSearchQuery:"",currentPage:1,isLastPage:!1},E="39057867-f9b54f51581e5f2d5762c62b3",q="https://pixabay.com/api/?",w=40;class _{constructor(){}async fetchCards(e,t){try{const s=await v.get(q,{params:{key:E,q:e,per_page:w,page:t,_image_type:"photo",_orientation:"horizontal",_safesearch:!0}});return s.data.totalHits<=t*w&&(c.isLastPage=!0,C.info({message:"We're sorry, but you've reached the end of search results."})),s.data}catch(s){console.error(s.message)}}}const b=new _;var m,h,f,d,g,p,L;class T{constructor(){l(this,m,document.querySelector(".search-form"));l(this,h,document.querySelector(".card-list"));l(this,f,document.querySelector(".loader"));l(this,d,document.querySelector(".load-more-btn"));l(this,g,"");l(this,p,1);l(this,L,new k(".card-item a",{captionsData:"alt",captionDelay:250}))}setSearchFormSubmitListener(e){n(this,m).addEventListener("submit",e)}setLoadMoreBtnClickListener(e){n(this,d).addEventListener("click",e)}onLoadMoreBtnClick(){fetchCards(n(this,g),++S(this,p)._).then(this.renderCards.bind(this))}renderCards({hits:e}){if(!e.length)return C.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});const t=this.getMarkup(e);n(this,h).insertAdjacentHTML("beforeend",t),n(this,L).refresh()}getMarkup(e){return e.map(({webformatURL:t,largeImageURL:s,tags:o,likes:i,views:u,comments:M,downloads:B})=>`<li class="card-item">
    <a href=${s}
      ><img src=${t} alt="${o}" height="200"/>
      <ul class="card-info">
        <li>
          Likes
          <p>${i}</p>
        </li>
        <li>
          Views
          <p>${u}</p>
        </li>
        <li>
          Comments
          <p>${M}</p>
        </li>
        <li>
          Downloads
          <p>${B}</p>
        </li>
      </ul></a
    >
  </li>`).join("")}toggleLoader(){n(this,f).classList.toggle("is-hidden")}showLoadMoreBtn(){n(this,d).classList.remove("is-hidden")}clearCardsList(){n(this,h).innerHTML=""}hideLoadMoreBtn(){n(this,d).classList.add("is-hidden")}scrollToNewCards(){const e=document.querySelector(".card-item").getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}}m=new WeakMap,h=new WeakMap,f=new WeakMap,d=new WeakMap,g=new WeakMap,p=new WeakMap,L=new WeakMap;const a=new T;async function $(r){if(r.preventDefault(),c.currentSearchQuery=r.currentTarget.elements.search.value,!c.currentSearchQuery.trim())return;c.currentPage=1,r.currentTarget.elements.search.value="",a.clearCardsList(),a.toggleLoader(),a.hideLoadMoreBtn(),c.isLastPage=!1;const e=await b.fetchCards(c.currentSearchQuery);a.renderCards(e),a.showLoadMoreBtn(),a.toggleLoader()}async function Q(){a.hideLoadMoreBtn(),a.toggleLoader();const r=await b.fetchCards(c.currentSearchQuery,++c.currentPage);a.toggleLoader(),a.renderCards(r),a.scrollToNewCards(),c.isLastPage||a.showLoadMoreBtn()}function x(){a.setSearchFormSubmitListener($),a.setLoadMoreBtnClickListener(Q)}x();
//# sourceMappingURL=commonHelpers.js.map
