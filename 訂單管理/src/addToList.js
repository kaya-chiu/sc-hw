import { getSpaceElement } from 'kchelper'

const spaceId = 'add-btn'
const fieldCode = {
  productName: '商品名稱',
  productId: '商品型號',
  price: '商品售價',
  amount: '數量',
  table: '訂單明細',
  list: {
    productName: '訂單明細商品名稱',
    productId: '訂單明細商品型號',
    price: '訂單明細單價',
    amount: '訂單明細數量',
    subtotal: '訂單明細金額小計'
  }
}

// ** MAIN FUNCTION **
export const addToList = {
  events: [
    'app.record.create.show',
    'app.record.edit.show',
    'mobile.app.record.create.show',
    'mobile.app.record.edit.show'
  ],

  handler: event => {
    try {
      // 隱藏 lookup 帶入用的「商品型號」欄位
      kintone.app.record.setFieldShown(fieldCode.productId, false)
      kintone.mobile.app.record.setFieldShown(fieldCode.productId, false)

      // 建立「新增按鈕」
      const space = getSpaceElement(event, spaceId)
      const addButton = new Kuc.Button({
        text: 'Add',
        type: 'submit',
        id: 'add-button',
      })
      space.appendChild(addButton)

      // 「新增按鈕」點擊事件
      addButton.addEventListener('click', e => {
        // 取得欄位資訊
        const record = kintone.app.record.get().record
        const productId = record[fieldCode.productId]
        const productName = record[fieldCode.productName]
        const price = record[fieldCode.price]
        const amount = record[fieldCode.amount]

        // 資訊不完整時報錯
        if (!productId.value || !productName.value || !price.value) {
          const errMsg = '請輸入商品資訊'
          const notification = new Kuc.Notification({
            text: errMsg,
            type: 'danger',
            duration: 2000
          })
          notification.open()
          throw new Error(errMsg)           
        }
        if (!amount.value) {
          const errMsg = '請輸入數量'
          const notification = new Kuc.Notification({
            text: errMsg,
            type: 'danger',
            duration: 2000
          })
          notification.open()
          throw new Error(errMsg)
        }

        // 彙整新的一筆表格資料
        const listItem = { value: {}}
        listItem.value[fieldCode.list.productId] = productId
        listItem.value[fieldCode.list.productName] = productName
        listItem.value[fieldCode.list.price] = price
        listItem.value[fieldCode.list.amount] = amount
        listItem.value[fieldCode.list.subtotal] = {
          type: 'CALC',
          value: Number(price.value) * Number(amount.value)
        }

        // 去除預設的空白欄
        if (!record[fieldCode.table].value[0].value[fieldCode.list.productId].value) {
          record[fieldCode.table].value.shift()
        }

        // 新增表格資料
        record[fieldCode.table].value.push(listItem)
        kintone.app.record.set({ record })
      })
      return event
      
    } catch (err) {
      console.err(err)
      return event
    }
  }
}