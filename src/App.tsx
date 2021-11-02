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

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          {/* <Route
            exact
            path='/register'
            render={(routerProps: RouteComponentProps) => (
              <RegistrationPage {...routerProps} />
            )}
          /> */}
          {/* <Route
            exact
            path='/login'
            render={(routerProps: RouteComponentProps) => (
              <LoginPage {...routerProps} />
            )}
          /> */}
          {/* "/" PATH REDIRECTS TO "/dash" */}
          <Route exact path='/'>
            <Redirect to='/dash' />
          </Route>
          {/* DASHBOARD */}
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
          {/* TASKS BY TASKS */}
          {/* <Route
            exact
            path='/tasks'
            render={(routerProps: RouteComponentProps) => (
              <MainPageTemplate {...routerProps} />
            )}
          /> */}
          {/* TASKS BY SCHEDULE */}
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
          {/* <Route
            render={(routerProps: RouteComponentProps) => (
              <MainPageTemplate {...routerProps} />
            )}
          /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;