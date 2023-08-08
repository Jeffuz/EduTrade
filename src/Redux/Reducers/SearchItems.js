const SearchItems = (state = null, action) => {
  switch(action.type) {
    case 'SET':
      return state = action.payload
    case 'CLEAR':
      return state = null
    default:
      return state
  }
}

export default SearchItems;