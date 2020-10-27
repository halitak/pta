import { combineReducers } from 'redux'

import roleReducer from './roleReducer'
import memberReducer from './memberReducer'
import teamReducer from './teamReducer'

const rootReducer = combineReducers({
  role: roleReducer,
  member: memberReducer,
  team: teamReducer
})

export default rootReducer
