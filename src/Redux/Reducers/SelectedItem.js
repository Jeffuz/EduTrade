const SelectedItem = (state = null, action) => {
  switch(action.type) {
    case 'SETSELECTED':
      return state = action.payload
    case 'CLEARSELECTED':
      return state = null
    default:
      return state
  }
}

export default SelectedItem;