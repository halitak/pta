import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { addRole, removeRole } from '../../actions/roleActions'

import Notification from '../../components/Notification'
import Badge from '../../components/Badge'

const Role = ({ roles, members, addRole, removeRole }) => {
  const [notify, setNotify] = useState({
    active: false,
    success: false,
    message: ''
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    const name = e.target.role.value
    const color = e.target.color.value
    if (name === '')
      setNotify({
        active: true,
        success: false,
        message: 'Role name is required'
      })
    else {
      if (roles.find((role) => role.name === name))
        setNotify({
          active: true,
          success: false,
          message: 'Role name already added'
        })
      else {
        addRole({
          name,
          color: color === '#000000' ? '#ddd' : color
        })
        setNotify({ active: true, success: true, message: 'Role added' })
      }
    }
  }
  const handleRemove = (roleId) => {
    if (members.some((member) => member.role === roleId))
      setNotify({
        active: true,
        success: false,
        message: 'Role already in use, not removed'
      })
    else {
      removeRole(roleId)
      setNotify({ active: true, success: true, message: 'Role removed' })
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
      <h1>Role Page</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__input">
          <label htmlFor="role">Role Name</label>
          <input id="role" />
        </div>
        <div className="form__input">
          <label htmlFor="color">Color</label>
          <input type="color" id="color" />
        </div>
        <div className="form__input">
          <button>Add Role</button>
        </div>
      </form>
      <div className="card">
        <div className="card__header">
          <h3>Role List</h3>
        </div>
        <div className="card__body">
          {roles.map((role) => (
            <p key={role._id}>
              <Badge color={role.color} size={16}>
                {role.name}
              </Badge>
              <button onClick={() => handleRemove(role._id)}>Remove</button>
            </p>
          ))}
        </div>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return { roles: state.role.roles, members: state.member.members }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addRole: (role) => {
      dispatch(addRole(role))
    },
    removeRole: (roleId) => {
      dispatch(removeRole(roleId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Role)
