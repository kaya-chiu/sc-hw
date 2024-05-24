(()=>{"use strict";var e={958:e=>{var r={isMobile:e=>{try{const r=e?.type||null;return e&&r?"mobile"===r.slice(0,6):(console.warn("kchelper isMobile: Failed to get kintone event type. Return default value (false)."),!1)}catch(e){console.error(`kchelper isMobile: ${e}`)}}},t={getFieldElement:(e,r)=>{try{return!0===r?kintone.mobile.app.record.getFieldElement(e):kintone.app.record.getFieldElement(e)}catch(e){console.error(`kchelper getFieldElement: ${e}`)}},getFieldElements:(e,r)=>{try{return!0===r?kintone.mobile.app.getFieldElements(e):kintone.app.getFieldElements(e)}catch(e){console.error(`kchelper getFieldElements: ${e}`)}}},o={getRecord:e=>{try{return!0===e?kintone.mobile.app.record.get().record:kintone.app.record.get().record}catch(e){console.error(`kchelper getRecord: ${e}`)}},setRecord:(e,r)=>{try{return!0===r?kintone.mobile.app.record.set({record:e}):kintone.app.record.set({record:e})}catch(e){console.error(`kchelper setRecord: ${e}`)}}};const{isMobile:n}=r,{getFieldElement:a,getFieldElements:c}=t,{getRecord:i,setRecord:l}=o;var d={isMobile:n,getFieldElement:a,getFieldElements:c,getSpaceElement:(e,r)=>{try{return!0===r?kintone.mobile.app.record.getSpaceElement(e):kintone.app.record.getSpaceElement(e)}catch(e){console.error(`kchelper getSpaceElement: ${e}`)}},getDateString:(e,r=new Date)=>{try{const t=r.getFullYear().toString(),o=(r.getMonth()+1).toString().padStart(2,"0"),n=r.getDate().toString().padStart(2,"0");let a;switch(e){case"yyyymmdd":default:a=`${t}${o}${n}`;break;case"yymmdd":a=`${t.slice(2,4)}${o}${n}`;break;case"yyyy-mm-dd":a=`${t}-${o}-${n}`;break;case"yyyymm":a=`${t}${o}`;break;case"yymm":a=`${t.slice(2,4)}${o}`}return a}catch(e){console.error(`kchelper getDateString: ${err}`)}},hideField:(e,r)=>{try{return!0===r?kintone.mobile.app.record.setFieldShown(e,!1):kintone.app.record.setFieldShown(e,!1)}catch(e){console.error(`kchelper hideField: ${e}`)}},getRecord:i,setRecord:l};e.exports=d}},r={};function t(o){var n=r[o];if(void 0!==n)return n.exports;var a=r[o]={exports:{}};return e[o](a,a.exports,t),a.exports}(()=>{var e=t(958);const r="商品型號",o="訂單明細",n="訂單明細商品名稱",a="訂單明細商品型號",c="訂單明細單價",i="訂單明細數量",l="訂單明細金額小計",d=["app.record.create.show","app.record.edit.show","mobile.app.record.create.show","mobile.app.record.edit.show"],s=t=>{try{(0,e.hideField)(r,(0,e.isMobile)(t));const d=(0,e.getSpaceElement)("add-btn",(0,e.isMobile)(t)),s=new Kuc.Button({text:"Add",type:"submit",id:"add-button"});return d.appendChild(s),s.addEventListener("click",(d=>{const s=(0,e.getRecord)((0,e.isMobile)(t)),p=s[r],u=s["商品名稱"],h=s["商品售價"],g=s["數量"];if(!p.value||!u.value||!h.value){const e="請輸入商品資訊";throw new Kuc.Notification({text:e,type:"danger",duration:2e3}).open(),new Error(e)}if(!g.value){const e="請輸入數量";throw new Kuc.Notification({text:e,type:"danger",duration:2e3}).open(),new Error(e)}const m={value:{}};m.value[a]=p,m.value[n]=u,m.value[c]=h,m.value[i]=g,m.value[l]={type:"CALC",value:Number(h.value)*Number(g.value)},s[o].value[0].value[a].value||s[o].value.shift(),s[o].value.push(m),(0,e.setRecord)(s,(0,e.isMobile)(t))})),t}catch(e){return console.err(e),t}},p="訂單編號",u="建立時間",h=["app.record.create.submit","mobile.record.create.submit"],g=async r=>{const t=(r=>{const t=(0,e.getDateString)();return r?`${t}-${(Number(r[p].value.slice(9,15))+1).toString().padStart(6,"0")}`:`${t}-000001`})(await(async()=>{try{const e=new Date,r=new Date(e.setHours(0,0,0,0)).toISOString(),t=new Date(e.setHours(24,0,0,0)).toISOString(),o=`\n        ${u} >= "${r}" and ${u} < "${t}"\n        order by ${u} desc limit 1\n      `,n=kintone.api.url("/k/v1/records");console.log(n);const a={app:49,query:o};return(await kintone.api(n,"GET",a)).records[0]||null}catch(e){console.log(e)}})());return r.record[p].value=t,r},m=["app.record.create.show","app.record.edit.show","app.record.index.edit.show","mobile.app.record.create.show","mobile.app.record.edit.show"],y=e=>(["訂單編號"].forEach((r=>{e.record[r].disabled=!0})),e),v=["商品名稱","商品型號","商品售價","數量"],b=["app.record.detail.show","mobile.app.record.detail.show"],w=r=>(v.forEach((t=>{(0,e.hideField)(t,(0,e.isMobile)(r))})),r),k=async e=>{try{const r=kintone.api.url("/k/v1/records"),t=await kintone.api(r,"GET",e),{records:o}=t;return o}catch(e){console.error(e)}},$=(e,r)=>{if(!r)throw new Error('getFieldValueArray: params "fieldCode" is required');if(!e||0===e.length)throw new Error('getFieldValueArray: params "records" cannot be an empty array');return e.map((e=>e[r].value))},E=(e,r="Dropdown")=>({label:r,items:e.map((e=>({label:e,value:e})))}),S="商品系列",F="商品型號",f="商品名稱",M={series:{app:50,query:`\n      啟用狀態 in ("啟用")\n      order by ${S} asc\n    `},product:{app:48}},D=["app.record.create.show","app.record.edit.show"],R=async r=>{try{const t=await k(M.series),o=$(t,S),n=E(o,"選擇商品系列"),a=new Kuc.Dropdown(n),c=(0,e.getSpaceElement)("product-series",(0,e.isMobile)(r)),i=(0,e.getSpaceElement)("product-id",(0,e.isMobile)(r));return c.appendChild(a),a.addEventListener("change",(async e=>{const r=e.target.value;M.product.query=`\n          ${S} in ("${r}")\n          order by ${F} asc\n        `;const t=await k(M.product),o=$(t,F),n=E(o,"選擇商品型號"),a=new Kuc.Dropdown(n);i.innerHTML="",i.appendChild(a),a.addEventListener("change",(async e=>{const r=e.target.value;M.product.query=`\n            ${F} = "${r}"\n          `;const t=(await k(M.product))[0][f].value,o=kintone.app.record.get();o.record[f].value=t,o.record[f].lookup=!0,kintone.app.record.set(o)}))})),r}catch(e){return console.error(e),r.error="Something wrong!",r}};Kucs["1.17.0"],kintone.events.on(m,y),kintone.events.on(D,R),kintone.events.on(d,s),kintone.events.on(b,w),kintone.events.on(h,g)})()})();