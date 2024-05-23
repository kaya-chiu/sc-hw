import { productSearch } from './productSearch'

(() => {
  'use strict'
  const Kuc = Kucs['1.17.0']

  kintone.events.on(productSearch.events, productSearch.handler)
  
})()