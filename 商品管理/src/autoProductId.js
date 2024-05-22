// ** VARIABLES **
const APP_ID = 48
const seriesNum = '系列序號'
const productSeries = '商品系列'
const productId = '商品型號'
const createTime = '建立時間'

// ** 取得指定「商品系列」的最新一筆記錄 **
const getLastRecord = async seriesName => {
  if (!seriesName) return

  const url = kintone.api.url('/k/v1/records')
  const body = {
    app: APP_ID,
    query: `
      ${productSeries} in ("${seriesName}")
      order by ${createTime} limit 1
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
    'app.record.edit.submit'
  ],

  handler: async event => {
    const { record } = event
    const selectedSeries = record[productSeries].value
    const lastRecord = await getLastRecord(selectedSeries)
    const newSeriesNum = autoNum(lastRecord)
    const newProuctId = `${selectedSeries}${newSeriesNum}`

    record[seriesNum].value = newSeriesNum
    record[productId].value = newProuctId

    return event
  }
}