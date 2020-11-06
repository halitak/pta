const initState = []

const memberReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_MEMBERS':
      return action.members
    case 'ADD_MEMBER':
      return [...state, action.member]
    case 'UPDATE_MEMBER':
      return state.map((member) =>
        member._id === action.member._id ? action.member : member
      )
    case 'REMOVE_MEMBER':
      return state.filter((member) => member._id !== action.memberId)
    case 'ERROR':
      return state
    default:
      break
  }
  return state
}

export default memberReducer
