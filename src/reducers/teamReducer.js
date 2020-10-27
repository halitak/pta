import data from '../constant/data.json'

const initState = {
  teams: data.teams
}

const teamReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_TEAM':
      return { ...state, teams: [...state.teams, action.team] }
    default:
      break
  }
  return state
}

export default teamReducer
