import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { removeTeam } from '../../actions/teamActions'
import { updateMember } from '../../actions/memberActions'
import Badge from '../../components/Badge'
import Notification from '../../components/Notification'

const Home = ({ members, teams, removeTeam, updateMember }) => {
  const [notify, setNotify] = useState({
    active: false,
    success: false,
    message: ''
  })
  const handleRemove = (team) => {
    removeTeam(team._id)
    team.members.forEach((member) => {
      const _member = members.find((_member) => _member._id === member._id)
      _member.teams = _member.teams.filter((teamId) => teamId !== team._id)
      updateMember(_member)
    })
    setNotify({
      active: true,
      success: true,
      message: 'Team removed'
    })
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
      <h1>Home Page</h1>
      <div className="collection">
        {teams.map((team) => {
          return (
            <div className="card" key={team._id}>
              <div className="card__header">
                <h3>{team.name}</h3>
                <button onClick={() => handleRemove(team)}>Remove</button>
              </div>
              <div className="card__body">
                {team.members.map((member) => {
                  return (
                    <p key={member._id}>
                      <span>{member.name}</span>
                      <Badge color={member.role.color}>
                        {member.role.name}
                      </Badge>
                    </p>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  const teams = state.teams.map((team) => {
    const members = team.members.map((memberId) => {
      const member = state.members.find((member) => member._id === memberId)
      const role = state.roles.find((role) => role._id === member.role)
      return { ...member, role }
    })
    return { ...team, members }
  })
  return {
    teams,
    members: state.members
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeTeam: (teamId) => {
      dispatch(removeTeam(teamId))
    },
    updateMember: (member) => {
      dispatch(updateMember(member))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
