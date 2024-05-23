import { getDateString } from 'kchelper'

const APP_ID = 49
const orderId = '訂單編號'
const createTime = '建立時間'

// ** 取得當日的最新一筆記錄 **
const getLastRecord = async () => {
  try {
    // 取得當天的開始與結束時間
    const now = new Date()
    const midnight = new Date(now.setHours(0, 0, 0, 0)).toISOString()
    const tomorrowMidnight = new Date(now.setHours(24, 0, 0, 0)).toISOString()

    // 以 query 篩選當日（0點～24點）最後一筆記錄
    const query = `
        ${createTime} >= "${midnight}" and ${createTime} < "${tomorrowMidnight}"
        order by ${createTime} desc limit 1
      `
    const url = kintone.api.url('/k/v1/records')
    console.log(url)
    const body = {
      app: APP_ID,
      query
    }

    const res = await kintone.api(url, 'GET', body)
    const record = res.records[0] || null

    return record

  } catch (err) {
    console.log(err)
  }
}

// ** 自動編號 **
const autoId = record => {
  const dateString = getDateString()

  // 若記錄不存在，回傳序號 yyyymmdd-000001
  if (!record) return `${dateString}-000001`

  // 若記錄存在，取最後一筆記錄的自動編碼 +1 後回傳
  const lastNum = Number(record[orderId].value.slice(9, 15))
  const newNum = (lastNum + 1).toString().padStart(6, '0')
  const newId = `${dateString}-${newNum}`

  return newId
}

// ** MAIN FUNCTION **
export const autoOrderId = {
  events: [
    'app.record.create.submit',
    'mobile.record.create.submit'
  ],

  handler: async event => {
    const lastRecord = await getLastRecord()
    const newId = autoId(lastRecord)

    event.record[orderId].value = newId

    return event
  }
}