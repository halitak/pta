const initState = {
  roles: []
}

const roleReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_ROLES':
      return { ...state, roles: action.roles }
    case 'ADD_ROLE':
      return { ...state, roles: [...state.roles, action.role] }
    case 'REMOVE_ROLE':
      return {
        ...state,
        roles: state.roles.filter((role) => role._id !== action.roleId)
      }
    case 'ERROR':
      return {
        ...state
      }
    default:
      break
  }
  return state
}

export default roleReducer
