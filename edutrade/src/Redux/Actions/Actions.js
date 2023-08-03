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