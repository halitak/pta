import React from 'react'
import { connect } from 'react-redux'

import Badge from '../../components/Badge'

const Home = ({ teams }) => {
  return (
    <React.Fragment>
      <h1>Home Page</h1>
      <div className="collection">
        {teams.map((team) => {
          return (
            <div className="card" key={team.id}>
              <div className="card__header">
                <h3>{team.name}</h3>
              </div>
              <div className="card__body">
                {team.members.map((member) => {
                  return (
                    <p key={member.id}>
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
  const teams = state.team.teams.map((team) => {
    const members = team.members.map((memberId) => {
      const member = state.member.members.find(
        (member) => member.id === memberId
      )
      const role = state.role.roles.find((role) => role.id === member.role)
      return { ...member, role }
    })
    return { ...team, members }
  })
  return {
    teams
  }
}

export default connect(mapStateToProps)(Home)
