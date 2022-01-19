import {
  BrowserRouter as Router,
  Route,
  Switch,
  RouteComponentProps,
  Redirect,
} from "react-router-dom";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import MainBody from "./pages/Main";
import "./styles/universal.css";
import "./styles/forms.css"
import "./styles/badges.css"
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route
            exact
            path='/login'
            render={(routerProps: RouteComponentProps) => (
              <LoginPage {...routerProps} />
            )}
          />
          <Route
            exact
            path='/register'
            render={(routerProps: RouteComponentProps) => (
              <RegisterPage {...routerProps} />
            )}
          />
          <Route exact path='/'>
            <Redirect to='/dash' />
          </Route>
          <Route
            exact
            path='/dash'
            render={(routerProps: RouteComponentProps) => (
              <MainBody {...routerProps} />
            )}
          />
          <Route
            exact
            path='/tasks'
            render={(routerProps: RouteComponentProps) => (
              <MainBody {...routerProps} />
            )}
          />
          <Route
            exact
            path='/user-settings'
            render={(routerProps: RouteComponentProps) => (
              <MainBody {...routerProps} />
            )}
          />
          <Route
            render={(routerProps: RouteComponentProps) => (
              <MainBody {...routerProps} />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
