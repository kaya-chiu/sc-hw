import { getSpaceElement, isMobile } from 'kchelper'
import { generateDropdownConfig, getFieldValueArray, getRecords } from './utils'

const fieldCode = {
  seriesName: '商品系列',
  enabledStatus: '啟用狀態',
  productId: '商品型號',
  productName: '商品名稱'
}
const spaceId = {
  series: 'product-series',
  productId: 'product-id'
}

const reqBody = {
  series: {
    app: 50,
    query: `
      ${fieldCode.enabledStatus} in ("啟用")
      order by ${fieldCode.seriesName} asc
    `
  },
  product: {
    app: 48
  }
}

// ** MAIN FUNCTION **
export const productSearch = {
  events: [
    'app.record.create.show',
    'app.record.edit.show'
  ],

  handler: async event => {
    try {
      const seriesRecords = await getRecords(reqBody.series)
      const seriesNames = getFieldValueArray(seriesRecords, fieldCode.seriesName)
      const seriesDropdownConfig = generateDropdownConfig(seriesNames, '選擇商品系列')
      const SeriesDropdown = new Kuc.Dropdown(seriesDropdownConfig)
      
      const space1 = getSpaceElement(spaceId.series, isMobile(event))
      const space2 = getSpaceElement(spaceId.productId, isMobile(event))

      space1.appendChild(SeriesDropdown)

      SeriesDropdown.addEventListener('change', async e => {
        const series = e.target.value

        // 根據選取的商品系列，從【商品管理】取得商品型號
        reqBody.product.query = `
          ${fieldCode.seriesName} in ("${series}")
          order by ${fieldCode.productId} asc
        `
        const productRecords = await getRecords(reqBody.product)
        const productIds = getFieldValueArray(productRecords, fieldCode.productId)
        const productIdDropdownConfig = generateDropdownConfig(productIds, '選擇商品型號')
        const ProductIdDropdown = new Kuc.Dropdown(productIdDropdownConfig)
        
        space2.innerHTML = '' // 清空元素內容避免重複產生下拉選單
        space2.appendChild(ProductIdDropdown)

        ProductIdDropdown.addEventListener('change', async e => {
          const productId = e.target.value
          
          // 根據商品型號，從【商品管理】取得商品名稱
          reqBody.product.query = `
            ${fieldCode.productId} = "${productId}"
          `
          const productRecords = await getRecords(reqBody.product)
          const productName = productRecords[0][fieldCode.productName].value
          
          // 將取得的商品名稱自動帶入 LOOKUP
          const setRecord = kintone.app.record.get()
          setRecord.record[fieldCode.productName].value = productName
          setRecord.record[fieldCode.productName].lookup = true
          kintone.app.record.set(setRecord)
        })
      })

      return event

    } catch (err) {
      console.error(err)
      event.error = 'Something wrong!'
      return event
    }
  }
}