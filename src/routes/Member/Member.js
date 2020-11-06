import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { addMember, removeMember } from '../../actions/memberActions'

import Notification from '../../components/Notification'
import Badge from '../../components/Badge'

const Member = ({ members, roles, addMember, removeMember }) => {
  const [notify, setNotify] = useState({
    active: false,
    success: false,
    message: ''
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    const name = e.target.member.value
    const role = e.target.role.value
    if (name === '')
      setNotify({
        active: true,
        success: false,
        message: 'Member name is required'
      })
    else {
      if (members.find((member) => member.name === name))
        setNotify({
          active: true,
          success: false,
          message: 'Member name already added'
        })
      else {
        addMember({ name, role, teams: [] })
        setNotify({ active: true, success: true, message: 'Member added' })
      }
    }
  }
  const handleRemove = (member) => {
    if (member.teams.length > 0)
      setNotify({
        active: true,
        success: false,
        message: 'Member already in use, not removed'
      })
    else {
      removeMember(member._id)
      setNotify({ active: true, success: true, message: 'Member removed' })
    }
  }
  useEffect(() => {
    if (notify.active === true) {
      const timer = setTimeout(() => {
        setNotify({ ...notify, active: false, success: false })
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [notify])

  return (
    <React.Fragment>
      <Notification active={notify.active} success={notify.success}>
        {notify.message}
      </Notification>
      <h1>Member Page</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__input">
          <label htmlFor="member">Member Name</label>
          <input id="member" />
        </div>
        <div className="form__input">
          <label htmlFor="role">Role</label>
          <select id="role">
            {roles.map((role) => (
              <option key={role._id} value={role._id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form__input">
          <button>Add Member</button>
        </div>
      </form>
      <div className="card">
        <div className="card__header">
          <h3>Member List</h3>
        </div>
        <div className="card__body">
          {members.map((member) => {
            const role = roles.find((role) => role._id === member.role)
            return (
              <p key={member._id}>
                <span>{member.name}</span>
                <Badge color={role.color}>{role.name}</Badge>
                <button onClick={() => handleRemove(member)}>Remove</button>
              </p>
            )
          })}
        </div>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    members: state.member.members,
    roles: state.role.roles
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addMember: (member) => {
      dispatch(addMember(member))
    },
    removeMember: (memberId) => {
      dispatch(removeMember(memberId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Member)
