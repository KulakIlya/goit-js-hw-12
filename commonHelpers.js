var y=(t,e,r)=>{if(!e.has(t))throw TypeError("Cannot "+r)};var n=(t,e,r)=>(y(t,e,"read from private field"),r?r.call(t):e.get(t)),l=(t,e,r)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,r)},P=(t,e,r,s)=>(y(t,e,"write to private field"),s?s.call(t,r):e.set(t,r),r),S=(t,e,r,s)=>({set _(o){P(t,e,o,r)},get _(){return n(t,e,s)}});import{a as k,i as M,S as v}from"./assets/vendor-328ced67.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const u of i.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function r(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerpolicy&&(i.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?i.credentials="include":o.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=r(o);fetch(o.href,i)}})();const c={currentSearchQuery:"",currentPage:1,isLastPage:!1},E="39057867-f9b54f51581e5f2d5762c62b3",q="https://pixabay.com/api/?",w=40;class _{constructor(){}async fetchCards(e,r){try{const s=await k.get(q,{params:{key:E,q:e,per_page:w,page:r,_image_type:"photo",_orientation:"horizontal",_safesearch:!0}});return s.data.totalHits<=r*w&&(c.isLastPage=!0,M.info({message:"We're sorry, but you've reached the end of search results."})),s.data}catch(s){console.error(s.message)}}}const C=new _;var m,h,g,d,f,L,p;class T{constructor(){l(this,m,document.querySelector(".search-form"));l(this,h,document.querySelector(".card-list"));l(this,g,document.querySelector(".loader"));l(this,d,document.querySelector(".load-more-btn"));l(this,f,"");l(this,L,1);l(this,p,new v(".card-item a",{captionsData:"alt",captionDelay:250}))}setSearchFormSubmitListener(e){n(this,m).addEventListener("submit",e)}setLoadMoreBtnClickListener(e){n(this,d).addEventListener("click",e)}onLoadMoreBtnClick(){fetchCards(n(this,f),++S(this,L)._).then(this.renderCards.bind(this))}renderCards({hits:e}){if(!e.length)return M.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});const r=this.getMarkup(e);n(this,h).insertAdjacentHTML("beforeend",r),n(this,p).refresh()}getMarkup(e){return e.map(({webformatURL:r,largeImageURL:s,tags:o,likes:i,views:u,comments:b,downloads:B})=>`<li class="card-item">
    <a href=${s}
      ><img src=${r} alt="${o}" height="200"/>
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
          <p>${b}</p>
        </li>
        <li>
          Downloads
          <p>${B}</p>
        </li>
      </ul></a
    >
  </li>`).join("")}toggleLoader(){n(this,g).classList.toggle("is-hidden")}showLoadMoreBtn(){n(this,d).classList.remove("is-hidden")}clearCardsList(){n(this,h).innerHTML=""}hideLoadMoreBtn(){n(this,d).classList.add("is-hidden")}scrollToNewCards(){const e=document.querySelector(".card-item").getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}}m=new WeakMap,h=new WeakMap,g=new WeakMap,d=new WeakMap,f=new WeakMap,L=new WeakMap,p=new WeakMap;const a=new T;class ${constructor(){a.setSearchFormSubmitListener(this.onSearchFormSubmit),a.setLoadMoreBtnClickListener(this.onLoadMoreBtnClick)}async onSearchFormSubmit(e){if(e.preventDefault(),c.currentSearchQuery=e.currentTarget.elements.search.value,!c.currentSearchQuery.trim())return;c.currentPage=1,e.currentTarget.elements.search.value="",a.clearCardsList(),a.toggleLoader(),a.hideLoadMoreBtn(),c.isLastPage=!1;const r=await C.fetchCards(c.currentSearchQuery);a.renderCards(r),a.showLoadMoreBtn(),a.toggleLoader()}async onLoadMoreBtnClick(){a.hideLoadMoreBtn(),a.toggleLoader();const e=await C.fetchCards(c.currentSearchQuery,++c.currentPage);a.toggleLoader(),a.renderCards(e),a.scrollToNewCards(),c.isLastPage||a.showLoadMoreBtn()}}new $;
//# sourceMappingURL=commonHelpers.js.map
