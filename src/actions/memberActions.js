export const getMembers = () => {
  return (dispatch, getState) => {
    fetch('http://localhost:4000/api/members')
      .then((res) => res.json())
      .then((json) => {
        dispatch({ type: 'GET_MEMBERS', members: json })
      })
      .catch((err) => {
        dispatch({ type: 'ERROR', err })
      })
  }
}
export const addMember = (member) => {
  return (dispatch, getState) => {
    fetch('http://localhost:4000/api/members', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(member)
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch({ type: 'ADD_MEMBER', member: json })
      })
      .catch((err) => {
        dispatch({ type: 'ERROR', err })
      })
  }
}

export const updateMember = (member) => {
  return (dispatch, getState) => {
    fetch(`http://localhost:4000/api/members/${member._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(member)
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch({ type: 'UPDATE_MEMBER', member })
      })
      .catch((err) => {
        dispatch({ type: 'ERROR', err })
      })
  }
}

export const removeMember = (memberId) => {
  return (dispatch, getState) => {
    fetch(`http://localhost:4000/api/members/${memberId}`, {
      method: 'DELETE'
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch({ type: 'REMOVE_MEMBER', memberId: json._id })
      })
      .catch((err) => {
        dispatch({ type: 'ERROR', err })
      })
  }
}
