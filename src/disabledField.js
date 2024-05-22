const fieldCodes = [
  '商品型號',
  '系列序號'
]

export const disabledField = {
  events: [
    'app.record.create.show',
    'app.record.edit.show',
    'app.record.index.edit.show',
    'mobile.app.record.create.show',
    'mobile.app.record.edit.show'
  ],

  handler: event => {
    fieldCodes.forEach(fieldCode => {
      event.record[fieldCode].disabled = true
    })

    return event
  }
}