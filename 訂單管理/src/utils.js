export const getRecords = async reqBody => {
  try {
    const url = kintone.api.url('/k/v1/records')
    const res = await kintone.api(url, 'GET', reqBody)
    const { records } = res
    
    return records
    
  } catch (err) {
    console.error(err)
  }
}

export const getFieldValueArray = (records, fieldCode) => {
  if (!fieldCode) throw new Error('getFieldValueArray: params "fieldCode" is required')
  if (!records || records.length === 0) throw new Error('getFieldValueArray: params "records" cannot be an empty array')
  
  return records.map(record => record[fieldCode].value)
}

export const generateDropdownConfig = (values, title = 'Dropdown') => {
  const items = values.map(value => {
    return {
      label: value,
      value
    }
  })

  const config = {
    label: title,
    items
  }

  return config
}