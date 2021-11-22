import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  RouteComponentProps,
  Redirect,
} from "react-router-dom";
import MainBody from "./pages/MainBody";
import LoginPage from "./pages/Page_Login";
import RegisterPage from "./pages/Page_Register";
import SettingsPage from "./pages/Page_Settings";
import LogoutPage from "./pages/Page_Logout";
import LandingPage from "./pages/Landing";

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route
            exact
            path='/register'
            render={(routerProps: RouteComponentProps) => (
              <RegisterPage {...routerProps} />
            )}
          />
          <Route
            exact
            path='/login'
            render={(routerProps: RouteComponentProps) => (
              <LoginPage {...routerProps} />
            )}
          />
           <Route
            exact
            path='/session-closed'
            render={(routerProps: RouteComponentProps) => (
              <LogoutPage {...routerProps} />
            )}
          />
          {/* "/" PATH REDIRECTS TO "/dash" */}
          <Route exact path='/'>
            <Redirect to='/landing-page' />
          </Route>
          <Route
            exact
            path='/landing-page'
            render={(routerProps: RouteComponentProps) => (
              <LandingPage {...routerProps} />
            )}
          />
          <Route
            exact
            path='/dash'
            render={(routerProps: RouteComponentProps) => (
              <MainBody {...routerProps} />
            )}
          />
          {/* WORK FLOWS */}
          {/* <Route
            exact
            path='/flow'
            render={(routerProps: RouteComponentProps) => (
              <MainPageTemplate {...routerProps} />
            )}
          /> */}
          {/* STATS */}
          {/* <Route
            exact
            path='/stats'
            render={(routerProps: RouteComponentProps) => (
              <MainPageTemplate {...routerProps} />
            )}
          /> */}
          {/* TASKS */}
          <Route
            exact
            path='/tasks'
            render={(routerProps: RouteComponentProps) => (
              <MainBody {...routerProps} />
            )}
          />
          {/* SETTINGS */}
          <Route
            exact
            path='/user-settings'
            render={(routerProps: RouteComponentProps) => (
              <MainBody {...routerProps} />
            )}
          />
          {/* <Route
            exact
            path='/tasks-schedule'
            render={(routerProps: RouteComponentProps) => (
              <MainPageTemplate {...routerProps} />
            )}
          /> */}
          {/* CHALLENGES */}
          {/* <Route
            exact
            path='/challenges'
            render={(routerProps: RouteComponentProps) => (
              <MainPageTemplate {...routerProps} />
            )}
          /> */}
          {/* INVENTORY */}
          {/* <Route
            exact
            path='/inventory'
            render={(routerProps: RouteComponentProps) => (
              <MainPageTemplate {...routerProps} />
            )}
          /> */}
          {/* FOLLOWING */}
          {/* <Route
            exact
            path='/following'
            render={(routerProps: RouteComponentProps) => (
              <MainPageTemplate {...routerProps} />
            )}
          /> */}
          {/* ALL OTHER ROUTES POINT TO ERRORPAGE */}
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
