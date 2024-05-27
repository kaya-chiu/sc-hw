import { hideField, isMobile } from 'kchelper'

export const hideAll = {
  events: [
    'app.record.detail.show',
    'app.record.create.show',
    'app.record.edit.show',
    'mobile.app.record.detail.show',
    'mobile.app.record.create.show',
    'mobile.app.record.edit.show'
  ],

  handler: event => {
    const hideFieldCodes = ['原商品系列']

    hideFieldCodes.forEach(fieldCode => {
      hideField(fieldCode, isMobile(event))
    })

    return event
  }
}