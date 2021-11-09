import "./App.scss";
import { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/home/Home";
import LogReg from "./pages/logReg/LogReg";
import Reservations from "./pages/reservations/Reservations";
import Sidebar from "./components/sidebar/Sidebar";
import Profile from "./pages/profile/Profile";
import { AuthContext } from "./context/authContext/AuthContext";
import { ThemeContext } from "./context/themeContext/ThemeContext"

function App() {
  const { user } = useContext(AuthContext);
  const {theme} = useContext(ThemeContext)
  return (
    <Router>
      <Switch>
        <Route path="/login">{user ? <Redirect to="/" /> : <LogReg />}</Route>
        {user ? (
          <>
            <Sidebar />
          <div className={`cont ${theme === "light" ? "light" :""}`}>
              <Route exact path="/">
                <Home />
              </Route>

              <Route path="/reservations">
                <Reservations />
              </Route>
              <Route path="/profile/:id">
                <Profile />
              </Route>
            </div>
          </>
        ) : (
          <Redirect to="/login" />
        )}
      </Switch>
    </Router>
  );
}

export default App;
