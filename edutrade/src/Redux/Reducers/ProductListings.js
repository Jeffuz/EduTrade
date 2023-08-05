const  ProductListings = (state = [], action) => {
  switch(action.type) {
    case 'ADDITEM':
      return state = state.concat(action.payload)
    case 'CLEAR':
      return state = []
    default:
      return state
  }
}

export default ProductListings;