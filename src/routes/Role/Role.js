import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { addRole } from '../../actions/roleActions'
import Notification from '../../components/Notification'

const Role = ({ roles, addRole }) => {
  const [notify, setNotify] = useState({
    active: false,
    success: false,
    message: ''
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    const name = e.target.role.value
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
        addRole({ id: `role${roles.length + 1}`, name })
        setNotify({ active: true, success: true, message: 'Role added' })
      }
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
          <button>Add Role</button>
        </div>
      </form>
      <div className="card">
        <div className="card__header">
          <h3>Role List</h3>
        </div>
        <div className="card__body">
          {roles.map((role) => (
            <p key={role.id}>
              <span>{role.name}</span>
            </p>
          ))}
        </div>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return { roles: state.role.roles }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addRole: (role) => {
      dispatch(addRole(role))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Role)
