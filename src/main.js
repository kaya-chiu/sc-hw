import { disabledAll } from './disabledField'
import { autoProductId } from './autoProductId'

(() => {
  'use strict'
	
  kintone.events.on(disabledAll.events, disabledAll.handler)
  kintone.events.on(autoProductId.events, autoProductId.handler)
  
})()