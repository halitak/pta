import { get, post, remove } from '../helpers/fetch'
const API_URI = `${process.env.REACT_APP_API_URI}/api/roles`

export const getRoles = () => {
  return (dispatch, getState) => {
    get(API_URI)
      .then((roles) => {
        console.log(roles)
        dispatch({ type: 'GET_ROLES', roles })
      })
      .catch((err) => {
        dispatch({ type: 'ERROR', err })
      })
  }
}

export const addRole = (role) => {
  return (dispatch, getState) => {
    post(API_URI, role)
      .then((role) => {
        dispatch({ type: 'ADD_ROLE', role })
      })
      .catch((err) => {
        dispatch({ type: 'ERROR', err })
      })
  }
}

export const removeRole = (roleId) => {
  return (dispatch, getState) => {
    remove(`${API_URI}/${roleId}`)
      .then((json) => {
        dispatch({ type: 'REMOVE_ROLE', roleId: json._id })
      })
      .catch((err) => {
        dispatch({ type: 'ERROR', err })
      })
  }
}
