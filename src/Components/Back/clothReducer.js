function clothReducer(state, action) {
  let newState;

  switch (action.type) {
    case 'cloth_list':
      newState = action.payload.map((k, i) => ({ ...k, row: i }));
      break;
    case 'price_asc':
      newState = [...state].sort((a, b) => a.price - b.price);
      break;
    case 'price_desc':
      newState = [...state].sort((a, b) => b.price - a.price);
      break;
    case 'default':
      newState = [...state].sort((a, b) => a.id - b.id);
      break;
    case 'date_asc':
      newState = [...state].sort((x, y) => {
        let a = new Date(x.date);
        let b = new Date(y.date);
        return a - b;
      });
      break;
    case 'sort_date_desc':
      newState = [...state].sort((x, y) => {
        let a = new Date(x.date);
        let b = new Date(y.date);
        return b - a;
      });
      break;
    default:
      newState = state;
      break;
  }
  return newState;
}

export default clothReducer;
