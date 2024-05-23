import { addToList } from './addToList'
import { autoOrderId } from './autoOrderId'
import { hideProductSearch } from './hideProductSearch'
import { productSearch } from './productSearch'

(() => {
  'use strict'
  const Kuc = Kucs['1.17.0']

  kintone.events.on(productSearch.events, productSearch.handler)
  kintone.events.on(addToList.events, addToList.handler)
  kintone.events.on(hideProductSearch.events, hideProductSearch.handler)
  kintone.events.on(autoOrderId.events, autoOrderId.handler)
  
})()