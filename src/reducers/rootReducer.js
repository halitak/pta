import { combineReducers } from 'redux'

import roleReducer from './roleReducer'
import memberReducer from './memberReducer'
import teamReducer from './teamReducer'

const rootReducer = combineReducers({
  roles: roleReducer,
  members: memberReducer,
  teams: teamReducer
})

export default rootReducer
