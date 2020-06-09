import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import moment from 'moment';
import qs from 'qs';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Wrestlers from './components/Wrestlers.js';
import Matches from './components/Matches.js';
import FactionView from './components/FactionView.js';
import Factions from './components/Factions.js';
import WrestlerView from './components/WrestlerView.js';
import MatchView from './components/MatchView.js';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const headers = () => {
  const token = window.localStorage.getItem('token');
  return {
    headers: {
      authorization: token,
    },
  };
};

const App = () => {
  const [wrestlers, setWrestlers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [factions, setFactions] = useState([]);
  const [auth, setAuth] = useState();

  useEffect(() => {
    axios.get('/api/wrestlers').then((response) => {
      setWrestlers(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get('/api/matches').then((response) => {
      setMatches(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get('/api/factions').then((response) => {
      setFactions(response.data);
    });
  }, []);

  const login = async (credentials) => {
    setAuth(true);
  };

  const logout = async () => {
    setAuth(false);
  };

  const [wrestlerView, setWrestlerView] = useState({});
  const [matchView, setMatchView] = useState({});
  const [factionView, setFactionView] = useState({});

  const [sortedMatches, setSortedMatches] = useState([]);
  useEffect(() => {
    setSortedMatches(matches.sort((a, b) => (a.date > b.date ? 1 : -1)));
  }, [matches]);

  return (
    <div className="App">
      <Router>
        <div>
          <div id="navDiv">
            <nav>
              <li className="nav-icon">
                <Link className="link" to="/">
                  <img
                    id="navLogo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/AEW_Logo_%28simplified%29.svg/1200px-AEW_Logo_%28simplified%29.svg.png"
                  />
                </Link>
              </li>
              <li className="nav-icon">
                <Link className="link" to="/wrestlers">
                  Wrestlers
                </Link>
              </li>
              <li className="nav-icon">
                <Link className="link" to="/matches">
                  Matches
                </Link>
              </li>
              <li className="nav-icon">
                <Link className="link" to="/factions">
                  Factions
                </Link>
              </li>
              <li className="nav-icon">
                <Link className="link" to="/login">
                  Auth
                </Link>
              </li>
            </nav>
          </div>
          <div id="viewDiv">
            <Switch>
              <Route exact path="/">
                <Home
                  matches={matches}
                  wrestlers={wrestlers}
                  setWrestlerView={setWrestlerView}
                />
              </Route>
              <Route exact path={`/wrestlers/${wrestlerView.id}`}>
                <WrestlerView
                  auth={auth}
                  wrestlerView={wrestlerView}
                  setWrestlerView={setWrestlerView}
                  matches={matches}
                  wrestlers={wrestlers}
                  setWrestlers={setWrestlers}
                />
              </Route>
              <Route path="/wrestlers">
                <Wrestlers
                  auth={auth}
                  wrestlers={wrestlers}
                  setWrestlers={setWrestlers}
                  wrestlerView={wrestlerView}
                  setWrestlerView={setWrestlerView}
                  matches={matches}
                />
              </Route>
              <Route exact path={`/matches/${matchView.id}`}>
                <MatchView
                  auth={auth}
                  matchView={matchView}
                  setMatchView={setMatchView}
                  matches={matches}
                  wrestlers={wrestlers}
                  setMatches={setMatches}
                  setWrestlerView={setWrestlerView}
                  sortedMatches={sortedMatches}
                />
              </Route>
              <Route exact path="/matches">
                <Matches
                  auth={auth}
                  matches={matches}
                  setMatches={setMatches}
                  wrestlers={wrestlers}
                  setMatchView={setMatchView}
                />
              </Route>
              <Route exact path={`/factions/${factionView.id}`}>
                <FactionView factionView={factionView} />
              </Route>
              <Route exact path="/factions">
                <Factions factions={factions} setFactionView={setFactionView} />
              </Route>
              <Route exact path="/login">
                <Login login={login} auth={auth} logout={logout} />
              </Route>
            </Switch>
          </div>
          <div id="footer"></div>
        </div>
      </Router>
    </div>
  );
};

export default App;

//maybe add to improve user experience: upon page load, if user is NOT on mobile, alert and say "this site is best viewable on a mobile device but proceed as everything should still work"
