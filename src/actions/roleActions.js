export const getRoles = () => {
  return (dispatch, getState) => {
    fetch('http://localhost:4000/api/roles')
      .then((res) => res.json())
      .then((json) => {
        dispatch({ type: 'GET_ROLES', roles: json })
      })
      .catch((err) => {
        dispatch({ type: 'GET_ROLES_ERR', err })
      })
  }
}

export const addRole = (role) => {
  return (dispatch, getState) => {
    fetch('http://localhost:4000/api/roles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(role)
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        dispatch({ type: 'ADD_ROLE', role: json })
      })
      .catch((err) => {
        dispatch({ type: 'GET_ROLES_ERR', err })
      })
  }
}

export const removeRole = (roleId) => {
  return (dispatch, getState) => {
    fetch(`http://localhost:4000/api/roles/${roleId}`, {
      method: 'DELETE'
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch({ type: 'REMOVE_ROLE', roleId: json._id })
      })
      .catch((err) => {
        dispatch({ type: 'REMOVE_ROLE_ERR', err })
      })
  }
}
