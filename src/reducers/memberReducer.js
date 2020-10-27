import data from '../constant/data.json'

const initState = {
  members: data.members
}

const memberReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_MEMBER':
      return { ...state, members: [...state.members, action.member] }
    case 'UPDATE_MEMBER':
      return { ...state, members: action.members }
    default:
      break
  }
  return state
}

export default memberReducer
