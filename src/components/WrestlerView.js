import React from 'react';
import Axios from 'axios';
import EditWrestler from './EditWrestler';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const WrestlerView = ({
  auth,
  wrestlerView,
  setWrestlerView,
  wrestlers,
  setWrestlers,
  matches,
}) => {
  const wrestlerMatches = matches.filter((match) =>
    match.participants.includes(wrestlerView.name)
  );
  const matches2019 = wrestlerMatches.filter(
    (match) => match.date >= '2019-00-00' && match.date < '2020-00-00'
  );
  const matches2020 = wrestlerMatches.filter(
    (match) => match.date >= '2020-00-00' && match.date < '2021-00-00'
  );

  const previousWrestler = wrestlers[wrestlers.indexOf(wrestlerView) - 1];
  const nextWrestler = wrestlers[wrestlers.indexOf(wrestlerView) + 1];

  return (
    <div id="wrestlerView">
      <div className="prevnextButtons">
        {' '}
        {wrestlers.indexOf(wrestlerView) !== 0 && (
          <Link
            to={`/wrestlers/${previousWrestler.id}`}
            onClick={(e) => {
              setWrestlerView(previousWrestler);
            }}
          >
            <button>{'<'}</button>
          </Link>
        )}
        {nextWrestler && wrestlers.indexOf(wrestlerView) < wrestlers.length && (
          <Link
            to={`/wrestlers/${nextWrestler.id}`}
            onClick={(e) => {
              setWrestlerView(nextWrestler);
            }}
          >
            <button>{'>'}</button>
          </Link>
        )}
      </div>

      <img className="wrestlerImage" src={wrestlerView.image} />
      <h1>{wrestlerView.name}</h1>
      <h5>Debut: {wrestlerView.debut}</h5>
      {matches
        .filter((match) => match.championship === 'World Championship')
        .sort((a, b) => (a.date < b.date ? 1 : -1))[0].winner ===
        wrestlerView.name && <h3>WORLD CHAMPION</h3>}

      {matches
        .filter((match) => match.championship === "Women's World Championship")
        .sort((a, b) => (a.date < b.date ? 1 : -1))[0].winner ===
        wrestlerView.name && <h3>WOMEN'S WORLD CHAMPION</h3>}
      {matches
        .filter((match) => match.championship === 'TNT Championship')
        .sort((a, b) => (a.date < b.date ? 1 : -1))[0].winner ===
        wrestlerView.name && <h3>TNT CHAMPION</h3>}
      <h2>Stats</h2>
      <h4>2020</h4>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Matches</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Ties</th>
            <th>Disqualifications</th>
          </tr>
          <tr>
            <th>Total</th>
            <td>{matches2020.length}</td>
            <td>
              {
                matches2020.filter(
                  (match) => match.winner === wrestlerView.name
                ).length
              }
            </td>
            <td>
              {
                matches2020.filter(
                  (match) => match.winner !== wrestlerView.name
                ).length
              }
            </td>
          </tr>
          <tr>
            <th>Singles</th>
            <td>
              {
                matches2020.filter(
                  (match) =>
                    match.winner === wrestlerView.name &&
                    match.type === 'Singles'
                ).length
              }
            </td>
          </tr>
        </tbody>
      </table>
      <h4>2019</h4>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Matches</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Ties</th>
            <th>Disqualifications</th>
          </tr>
          <tr>
            <th>Total</th>
            <td>{matches2019.length}</td>
            <td>
              {
                matches2019.filter(
                  (match) => match.winner === wrestlerView.name
                ).length
              }
            </td>
            <td>
              {
                matches2019.filter(
                  (match) => match.winner !== wrestlerView.name
                ).length
              }
            </td>
          </tr>
          <tr>
            <th>Singles</th>
            <td>
              {matches2019.filter((match) => match.type === 'Singles').length}
            </td>
          </tr>
        </tbody>
      </table>
      {auth && (
        <EditWrestler
          wrestlers={wrestlers}
          setWrestlers={setWrestlers}
          wrestlerView={wrestlerView}
          setWrestlerView={setWrestlerView}
        />
      )}
    </div>
  );
};

export default WrestlerView;
