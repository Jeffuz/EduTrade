const  ProductListings = (state = [], action) => {
  switch(action.type) {
    case 'ADDITEM':
      return state = state.concat(action.payload)
    case 'CLEARPRODUCTLIST':
      return state = []
    default:
      return state
  }
}

export default ProductListings;