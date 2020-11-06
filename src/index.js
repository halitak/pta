import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { getRoles } from './actions/roleActions'
import { getTeams } from './actions/teamActions'
import { getMembers } from './actions/memberActions'

import 'normalize.css/normalize.css'
import './index.css'

import App from './App'
import rootReducer from './reducers/rootReducer'

const store = createStore(rootReducer, applyMiddleware(thunk))
store.dispatch(getRoles())
store.dispatch(getMembers())
store.dispatch(getTeams())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
