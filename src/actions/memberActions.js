import { get, post, remove, put } from '../helpers/fetch'
const API_URI = `${process.env.REACT_APP_API_URI}/api/members`

export const getMembers = () => {
  return (dispatch, getState) => {
    get(API_URI)
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
    post(API_URI, member)
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
    put(`${API_URI}/${member._id}`, member)
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
    remove(`${API_URI}/${memberId}`)
      .then((json) => {
        dispatch({ type: 'REMOVE_MEMBER', memberId: json._id })
      })
      .catch((err) => {
        dispatch({ type: 'ERROR', err })
      })
  }
}
