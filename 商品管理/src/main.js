import { disabledAll } from './disabledField'
import { autoProductId } from './autoProductId'
import { hideAll } from './hideField'

(() => {
  'use strict'
	
  kintone.events.on(disabledAll.events, disabledAll.handler)
  kintone.events.on(hideAll.events, hideAll.handler)
  kintone.events.on(autoProductId.events, autoProductId.handler)
  
})()