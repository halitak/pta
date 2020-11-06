import { get, post, remove } from '../helpers/fetch'
const API_URI = `${process.env.REACT_APP_API_URI}/api/teams`

export const getTeams = () => {
  return (dispatch, getState) => {
    get(API_URI)
      .then((json) => {
        dispatch({ type: 'GET_TEAMS', teams: json })
      })
      .catch((err) => {
        dispatch({ type: 'ERROR', err })
      })
  }
}

export const addTeam = (team) => {
  return (dispatch, getState) => {
    post(API_URI, team)
      .then((json) => {
        dispatch({ type: 'ADD_TEAM', team: json })
      })
      .catch((err) => {
        dispatch({ type: 'ERROR', err })
      })
  }
}

export const removeTeam = (teamId) => {
  return (dispatch, getState) => {
    remove(`${API_URI}/${teamId}`)
      .then((json) => {
        dispatch({ type: 'REMOVE_TEAM', teamId: json._id })
      })
      .catch((err) => {
        dispatch({ type: 'ERROR', err })
      })
  }
}
