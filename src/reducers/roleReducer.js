const initState = {
  roles: []
}

const roleReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_ROLES':
      return {
        roles: action.roles
      }
    case 'ADD_ROLE':
      return {
        ...state,
        roles: [...state.roles, action.role]
      }
    case 'REMOVE_ROLE':
      return {
        ...state,
        roles: state.roles.filter((role) => role._id !== action.roleId)
      }
    default:
      break
  }
  return state
}

export default roleReducer
