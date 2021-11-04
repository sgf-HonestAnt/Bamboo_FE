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
import Login from "./pages/Page_Login";
import Register from "./pages/Page_Register";

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route
            exact
            path='/register'
            render={(routerProps: RouteComponentProps) => (
              <Register {...routerProps} />
            )}
          />
          <Route
            exact
            path='/login'
            render={(routerProps: RouteComponentProps) => (
              <Login {...routerProps} />
            )}
          />
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
          <Route
            exact
            path='/tasks'
            render={(routerProps: RouteComponentProps) => (
              <MainBody {...routerProps} />
            )}
          />
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
