
(() => {
  'use strict'
	
  kintone.events.on('app.record.index.show', event => {
    console.log('Hello kintone!')
    
    return event
  })
  
})()