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

export const addImage = (image) => {
  return {
    type: 'ADDIMAGE',
    payload: image
  }
}