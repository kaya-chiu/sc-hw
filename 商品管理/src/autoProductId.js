// ** VARIABLES **
const APP_ID = 48
const seriesNum = '系列序號'
const productSeries = '商品系列'
const previosProductSeries = '原商品系列'
const productId = '商品型號'

// ** 取得指定「商品系列」的最新一筆記錄 **
const getLastRecord = async seriesName => {
  if (!seriesName) return

  const url = kintone.api.url('/k/v1/records')
  const body = {
    app: APP_ID,
    query: `
      ${productSeries} in ("${seriesName}")
      order by ${seriesNum} desc limit 1
    `
  }
  const res = await kintone.api(url, 'GET', body)
  const record = res.records[0] || null

  return record
}

// ** 自動編號 **
const autoNum = record => {
  // 若記錄不存在，回傳序號 0001
  if (!record) return '0001'

  // 若記錄存在，取最後一筆記錄的自動編碼 +1 後回傳
  const lastNum = Number(record[seriesNum].value)
  const newNum = (lastNum + 1).toString().padStart(4, '0')

  return newNum
}

// ** MAIN FUNCTION **
export const autoProductId = {
  events: [
    'app.record.create.submit',
    'app.record.edit.submit',
    'app.record.create.submit.success',
    'app.record.edit.submit.success'
  ],

  handler: async event => {
    try {
      const { record } = event
      const selectedSeries = record[productSeries].value
      const previousSeries = record[previosProductSeries].value

      // 若沒有更改系列，則不重新產生自動編碼
      if (selectedSeries === previousSeries) {
        return event
      } else {
        
        // Submit 前，更新「系列序號」＆「商品型號」
        if (event.type === 'app.record.create.submit' || event.type === 'app.record.edit.submit') {
          const lastRecord = await getLastRecord(selectedSeries)
          const newSeriesNum = autoNum(lastRecord)
          const newProuctId = `${selectedSeries}${newSeriesNum}`

          record[seriesNum].value = newSeriesNum
          record[productId].value = newProuctId
        }      

        // Submit 成功後，更新「原商品系列」
        if (event.type === 'app.record.create.submit.success' || event.type === 'app.record.edit.submit.success') {
          const putRecord = {}
          putRecord[previosProductSeries] = { type: 'SINGLE_LINE_TEXT', value: selectedSeries }
        
          const body = {
            app: APP_ID,
            id: event.record.$id.value,
            record: putRecord
          }
          await kintone.api(kintone.api.url('/k/v1/record'), 'PUT', body)
        }

        return event
      }
    } catch (err) {
      console.error(err)
    }    
  }
}