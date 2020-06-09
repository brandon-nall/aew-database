import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AddMatch from './AddMatch';

const Matches = ({ auth, matches, setMatches, wrestlers, setMatchView }) => {
  const matchList = matches
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((match, i) => {
      if (match) {
        return (
          <Link
            key={i}
            className="matchListItem"
            to={`/matches/${match.id}`}
            onClick={(e) => {
              setMatchView(match);
            }}
          >
            <li>
              <h6>{match.date}</h6>
              <h6>{match.event}</h6>
              <h6>{match.type}</h6>
              <h6>{match.winner}</h6>
            </li>
          </Link>
        );
      }
    });
  return (
    <div id="matches">
      <h1>Matches</h1>
      <h2>{matches.length}</h2>
      <li>
        <h5>Date</h5>
        <h5>Event</h5>
        <h5>Type</h5>
        <h5>Winner</h5>
      </li>
      <ul id="matchList">{matchList}</ul>
      {auth && (
        <AddMatch
          matches={matches}
          setMatches={setMatches}
          wrestlers={wrestlers}
        />
      )}
    </div>
  );
};

export default Matches;
