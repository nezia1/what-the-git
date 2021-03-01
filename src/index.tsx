import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import App from './App'
import Article from './components/Article'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/'>
            <App />
          </Route>
          <Route path='/articles/:article'>
            <Article />
          </Route>
        </Switch>
      </Router>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
)
