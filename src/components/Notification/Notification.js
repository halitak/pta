import React from 'react'

import './Notification.css'

const Notification = ({ active = false, success = false, children }) => {
  const activeClass = active ? 'notification-active' : ''
  const successClass = success ? 'notification-success' : ''
  const className = ['notification', activeClass, successClass]
  return <div className={className.join(' ')}>{children}</div>
}

export default Notification
