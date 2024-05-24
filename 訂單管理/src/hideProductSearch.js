import { hideField, isMobile } from 'kchelper'

const fieldCodes = [
  '商品名稱',
  '商品型號',
  '商品售價',
  '數量'
]

// ** MAIN FUNCTION **
export const hideProductSearch = {
  events: [
    'app.record.detail.show',
    'mobile.app.record.detail.show'
  ],

  handler: event => {
    fieldCodes.forEach(fieldCode => {
      hideField(fieldCode, isMobile(event))
    })
    return event
  }
}