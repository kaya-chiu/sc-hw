(()=>{"use strict";const e="系列序號",r="商品系列";kintone.events.on(["app.record.create.show","app.record.edit.show","app.record.index.edit.show","mobile.app.record.create.show","mobile.app.record.edit.show"],(e=>(["商品型號","系列序號"].forEach((r=>{e.record[r].disabled=!0})),e))),kintone.events.on(["app.record.create.submit","app.record.edit.submit"],(async o=>{const{record:t}=o,a=t[r].value,n=(r=>r?(Number(r[e].value)+1).toString().padStart(4,"0"):"0001")(await(async e=>{if(!e)return;const o=kintone.api.url("/k/v1/records"),t={app:48,query:`\n      ${r} in ("${e}")\n      order by 建立時間 limit 1\n    `};return(await kintone.api(o,"GET",t)).records[0]||null})(a)),i=`${a}${n}`;return t[e].value=n,t["商品型號"].value=i,o}))})();