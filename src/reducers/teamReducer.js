const initState = {
  teams: []
}

const teamReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_TEAMS':
      return { ...state, teams: action.teams }
    case 'ADD_TEAM':
      return { ...state, teams: [...state.teams, action.team] }
    case 'REMOVE_TEAM':
      return {
        ...state,
        teams: state.teams.filter((team) => team._id !== action.teamId)
      }
    default:
      break
  }
  return state
}

export default teamReducer
