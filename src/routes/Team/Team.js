import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { addTeam } from '../../actions/teamActions'
import { updateMember } from '../../actions/memberActions'

import Notification from '../../components/Notification'
import Badge from '../../components/Badge'

import './Team.css'

const MAX_ASSIGN = 3

const Team = ({ roles, members, teams, addTeam, updateMember }) => {
  const [notify, setNotify] = useState({
    active: false,
    success: false,
    message: ''
  })
  const [rules, setRules] = useState({})
  const [teamMembers, setTeamMembers] = useState([])

  const handleRule = (e) => {
    e.preventDefault()
    const role = e.target.role.value
    const limit = parseInt(e.target.limit.value)
    if (!(limit > 0))
      setNotify({
        active: true,
        success: false,
        message: 'Limit must positive'
      })
    else if (rules.hasOwnProperty(role))
      setNotify({ active: true, success: false, message: 'Rule already added' })
    else setRules({ ...rules, [role]: limit })
    e.target.reset()
  }

  const handleMember = (e) => {
    e.preventDefault()
    const memberId = e.target.member.value
    if (Object.keys(rules).length < 1)
      setNotify({ active: true, success: false, message: 'Rules required' })
    else if (teamMembers.indexOf(memberId) !== -1)
      setNotify({
        active: true,
        success: false,
        message: 'Member already added'
      })
    else {
      const member = members.find((member) => member._id === memberId)
      if (member.teams.length === MAX_ASSIGN)
        setNotify({
          active: true,
          success: false,
          message: `Member already assing ${MAX_ASSIGN} times`
        })
      else if (!rules.hasOwnProperty(member.role)) {
        setNotify({
          active: true,
          success: false,
          message: 'Member role not found for the team'
        })
      } else {
        const limit = rules[member.role]
        const count = teamMembers.reduce((pre, crr) => {
          const _member = members.find((_member) => _member._id === crr)
          return _member.role === member.role ? pre + 1 : pre
        }, 0)
        if (count === limit)
          setNotify({
            active: true,
            success: false,
            message: 'Member role is full for the team'
          })
        else setTeamMembers([...teamMembers, memberId])
      }
    }
    e.target.reset()
  }

  const handleTeam = (e) => {
    e.preventDefault()
    const teamName = e.target.team.value
    if (teamName === '')
      setNotify({ active: true, success: false, message: 'Team name required' })
    else if (Object.keys(rules).length < 1)
      setNotify({ active: true, success: false, message: 'Rules required' })
    else if (teamMembers.length < 1)
      setNotify({
        active: true,
        success: false,
        message: 'Team members required'
      })
    else if (teams.find((team) => team.name === teamName))
      setNotify({
        active: true,
        success: false,
        message: 'Team name already added'
      })
    else {
      addTeam({
        name: teamName,
        rules: rules,
        members: teamMembers
      })
      /* members.forEach((member) => {
        teamMembers.forEach((memberId) => {
          if (member._id === memberId) {
            member.teams.push(teamId)
          }
        })
      })*/
      //updateMember(members)
      setNotify({ active: true, success: true, message: 'Team created' })
      setRules({})
      setTeamMembers([])
    }
    e.target.reset()
  }

  useEffect(() => {
    if (notify.active === true) {
      const timer = setTimeout(() => {
        setNotify({ active: false, success: false, message: '' })
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [notify])

  useEffect(() => {
    if (notify.success) {
      const team = teams[teams.length - 1]
      team.members.forEach((memberId) => {
        const member = members.find((_member) => _member._id === memberId)
        member.teams.push(team._id)
        updateMember(member)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teams])

  return (
    <React.Fragment>
      <Notification active={notify.active} success={notify.success}>
        {notify.message}
      </Notification>
      <h1>Team Page</h1>
      <form className="form" onSubmit={handleRule}>
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
          <label htmlFor="limit">Role Limit</label>
          <input type="number" id="limit" min="1" />
        </div>
        <div className="form__input">
          <button>Add Rule</button>
        </div>
      </form>
      {Object.keys(rules).length > 0 && (
        <div className="card">
          <div className="card__header">
            <h4>Team Rule List</h4>
          </div>
          <div className="card__body">
            {Object.keys(rules).map((rule) => {
              const count = teamMembers.reduce((pre, crr) => {
                const member = members.find((member) => member._id === crr)
                return member.role === rule ? pre + 1 : pre
              }, 0)
              return (
                <p key={[rule]} className={count === rules[rule] ? 'full' : ''}>
                  <span>{roles.find((role) => role._id === rule).name}</span>
                  <Badge color={count === rules[rule] && 'lightcoral'}>
                    {count}/{rules[rule]}
                  </Badge>
                </p>
              )
            })}
          </div>
        </div>
      )}
      <form className="form" onSubmit={handleMember}>
        <div className="form__input">
          <label htmlFor="member">Member</label>
          <select id="member">
            {members.map((member) => {
              const teamCount = member.teams.length
              return (
                <option key={member._id} value={member._id}>
                  {member.name} (
                  {roles.find((role) => role._id === member.role).name}) (
                  {teamCount}
                  {teamCount > 1 ? ' teams' : ' team'})
                </option>
              )
            })}
          </select>
        </div>
        <div className="form__input">
          <button>Add Member</button>
        </div>
      </form>
      {teamMembers.length > 0 && (
        <div className="card">
          <div className="card__header">
            <h4>Team Member List</h4>
          </div>
          <div className="card__body">
            {teamMembers.map((teamMember) => {
              const member = members.find((member) => member._id === teamMember)
              const role = roles.find((role) => role._id === member.role)
              const memberTeams = member.teams
                .map((teamId) => teams.find((team) => team._id === teamId).name)
                .join(', ')
              return (
                <p key={member._id}>
                  <span>{member.name}</span>
                  <Badge color={role.color}>{role.name}</Badge>
                  {memberTeams.length > 0 && <Badge>{memberTeams}</Badge>}
                </p>
              )
            })}
          </div>
        </div>
      )}
      <form className="form" onSubmit={handleTeam}>
        <div className="form__input">
          <label htmlFor="team">Team Name</label>
          <input id="team" />
        </div>
        <div className="form__input">
          <button>Create Team</button>
        </div>
      </form>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    members: state.members,
    roles: state.roles,
    teams: state.teams
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTeam: (team) => {
      dispatch(addTeam(team))
    },
    updateMember: (member) => {
      dispatch(updateMember(member))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Team)
