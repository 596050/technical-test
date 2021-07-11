import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { Container } from '@material-ui/core'
import Users from './components/User/Users'
import NavBar from './components/NavBar/NavBar'

const App = () => {
  return (
    <>
      <NavBar title="Pride In London" />
      <Container maxWidth="sm">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Users} />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </Container>
    </>
  )
}

export default App
