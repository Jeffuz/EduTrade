export const set = (search, location) => {
  return {
    type: 'SET',
    payload: {search, location}
  }
}
export const clear = () => {
  return {
    type: 'CLEAR'
  }
}
export const clearProductList = () => {
  return {
    type: 'CLEARPRODUCTLIST'
  }
}

export const addImage = (image) => {
  return {
    type: 'ADDIMAGE',
    payload: image
  }
}

export const addItem = (item) => {
  return {
    type: 'ADDITEM',
    payload: item
  }
}