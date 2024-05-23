import { seriesDropdown } from './seriesDropdown'

(() => {
  'use strict'
  const Kuc = Kucs['1.17.0']

  kintone.events.on(seriesDropdown.events, seriesDropdown.handler)
  
})()