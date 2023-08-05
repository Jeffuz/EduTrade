const ImageList = (state = [], action) => {
  switch(action.type) {
    case 'ADDIMAGE':
      return state = state.concat(action.payload)
    case 'CLEAR':
      return state = []
    default:
      return state
  }
}

export default ImageList;