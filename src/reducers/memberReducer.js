const initState = {
  members: []
}

const memberReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_MEMBERS':
      return { ...state, members: action.members }
    case 'ADD_MEMBER':
      return { ...state, members: [...state.members, action.member] }
    case 'UPDATE_MEMBER':
      return {
        ...state,
        members: [
          ...state.members.map((member) =>
            member._id === action.member._id ? action.member : member
          )
        ]
      }
    case 'REMOVE_MEMBER':
      return {
        ...state,
        members: state.members.filter(
          (member) => member._id !== action.memberId
        )
      }
    default:
      break
  }
  return state
}

export default memberReducer
