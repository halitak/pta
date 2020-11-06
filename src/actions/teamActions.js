export const getTeams = () => {
  return (dispatch, getState) => {
    fetch('http://localhost:4000/api/teams')
      .then((res) => res.json())
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
    fetch('http://localhost:4000/api/teams', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(team)
    })
      .then((res) => res.json())
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
    fetch(`http://localhost:4000/api/teams/${teamId}`, {
      method: 'DELETE'
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch({ type: 'REMOVE_TEAM', teamId: json._id })
      })
      .catch((err) => {
        dispatch({ type: 'ERROR', err })
      })
  }
}
