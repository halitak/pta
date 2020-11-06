const initState = []

const roleReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_ROLES':
      return action.roles
    case 'ADD_ROLE':
      return [...state, action.role]
    case 'REMOVE_ROLE':
      return state.filter((role) => role._id !== action.roleId)
    case 'ERROR':
      return state
    default:
      break
  }
  return state
}

export default roleReducer
