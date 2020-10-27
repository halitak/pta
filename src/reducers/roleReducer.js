import data from '../constant/data.json'

const initState = {
  roles: data.roles
}

const roleReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_ROLE':
      return {
        ...state,
        roles: [...state.roles, action.role]
      }
    default:
      break
  }
  return state
}

export default roleReducer
