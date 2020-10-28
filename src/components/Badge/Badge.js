import React from 'react'

import './Badge.css'

const Badge = ({ color, size = 14, children, ...props }) => {
  return (
    <span className="badge" style={{ backgroundColor: color, fontSize: size }}>
      {children}
    </span>
  )
}

export default Badge
