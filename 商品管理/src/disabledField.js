// ** 新增、編輯時皆 disabled
export const disabledAll = {
  events: [
    'app.record.create.show',
    'app.record.edit.show',
    'app.record.index.edit.show',
    'mobile.app.record.create.show',
    'mobile.app.record.edit.show'
  ],

  handler: event => {
    const fieldCodes = [
      '商品型號',
      '系列序號',
      '原商品系列'
    ]

    fieldCodes.forEach(fieldCode => {
      event.record[fieldCode].disabled = true
    })

    return event
  }
}

// ** 編輯時 disabled
export const disabledEdit = {
  events: [
    'app.record.edit.show',
    'app.record.index.edit.show',
    'mobile.app.record.edit.show'
  ],

  handler: event => {
    const fieldCodes = []

    fieldCodes.forEach(fieldCode => {
      event.record[fieldCode].disabled = true
    })

    return event
  }
}