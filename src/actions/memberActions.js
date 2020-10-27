export const addMember = (member) => {
  return {
    type: 'ADD_MEMBER',
    member
  }
}

export const updateMember = (members) => {
  return {
    type: 'UPDATE_MEMBER',
    members
  }
}
