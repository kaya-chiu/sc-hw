import { getSpaceElement } from 'kchelper'

const fieldCode = {
  seriesName: '商品系列',
  enabledStatus: '啟用狀態',
  spaceId: 'product-series'
}

// ** FUNCTIONS **
// 從【商品系列管理】取得紀錄
const getSeriesRecord = async () => {
  const enabled = '啟用'
  try {
    const url = kintone.api.url('/k/v1/records')
    const body = {
      app: 50,
      query: `
        ${fieldCode.enabledStatus} in ("${enabled}")
        order by ${fieldCode.seriesName} asc
      `
    }
    const res = await kintone.api(url, 'GET', body)
    const { records } = res

    return records

  } catch (err) {
    console.log(err)
  }
}

// 將「商品系列」欄位值整理成 array
const getSeriesNames = records => {
  const seriesNames = records.map(record => record[fieldCode.seriesName].value)
  return seriesNames
}

// 產生 Dropdown 的設定內容
const generateDropdownConfig = values => {
  const items = values.map(value => {
    return {
      label: value,
      value
    }
  })

  const config = {
    label: '選擇商品系列',
    items
  }

  return config
}

// ** MAIN FUNCTION **
export const seriesDropdown = {
  events: [
    'app.record.create.show',
    'app.record.edit.show'
  ],

  handler: async event => {
    try {
      const seriesRecords = await getSeriesRecord()
      const seriesNames = getSeriesNames(seriesRecords)
      const dropdownConfig = generateDropdownConfig(seriesNames)
      const Dropdown = new Kuc.Dropdown(dropdownConfig)
      
      const space = getSpaceElement(event, fieldCode.spaceId)
      space.appendChild(Dropdown)

      return event

    } catch (err) {
      console.log(err)
      event.error = 'Someting wrong!'
    }
  }
}