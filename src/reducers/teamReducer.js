const initState = []

const teamReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_TEAMS':
      return action.teams
    case 'ADD_TEAM':
      return [...state, action.team]
    case 'REMOVE_TEAM':
      return state.filter((team) => team._id !== action.teamId)
    case 'ERROR':
      return state
    default:
      break
  }
  return state
}

export default teamReducer
