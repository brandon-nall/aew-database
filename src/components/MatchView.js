import React from 'react';
import Axios from 'axios';
import EditMatch from './EditMatch';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const MatchView = ({
  auth,
  matchView,
  setMatchView,
  matches,
  setMatches,
  wrestlers,
  setWrestlerView,
  sortedMatches,
}) => {
  const participantsList = matchView.participants.map((participant, i) => {
    const wrestler = wrestlers.find(
      (wrestler) => wrestler.name === participant
    );
    if (wrestler) {
      return (
        <Link
          key={i}
          className="participantsListItem"
          to={`/wrestlers/${wrestler.id}`}
          onClick={(e) => {
            setWrestlerView(wrestler);
          }}
        >
          <li>
            <img className="wrestlerThumbnail" src={wrestler.image} />

            <h5>{wrestler.name}</h5>
            {matchView.winner === wrestler.name && <h4>WINNER</h4>}
          </li>
        </Link>
      );
    } else {
      return (
        <h5 key={i} className="participantsListItem">
          {participant}
        </h5>
      );
    }
  });
  const previousMatch = sortedMatches[sortedMatches.indexOf(matchView) - 1];
  const nextMatch = sortedMatches[sortedMatches.indexOf(matchView) + 1];

  return (
    <div id="matchView">
      <div className="prevnextButtons">
        {nextMatch && sortedMatches.indexOf(matchView) < sortedMatches.length && (
          <Link
            to={`/matches/${nextMatch.id}`}
            onClick={(e) => {
              setMatchView(nextMatch);
            }}
          >
            <button>{'<'}</button>
          </Link>
        )}

        {previousMatch && sortedMatches.indexOf(matchView) !== 0 && (
          <Link
            to={`/matches/${previousMatch.id}`}
            onClick={(e) => {
              setMatchView(previousMatch);
            }}
          >
            <button>{'>'}</button>
          </Link>
        )}
      </div>
      <h4>{matchView.date}</h4>
      <h4>{matchView.event}</h4>
      <ul id="participantsList">{participantsList}</ul>
      {matchView.championship && <h3>{matchView.championship} Title Match</h3>}
      <h4>{matchView.type}</h4>

      {auth && (
        <EditMatch
          matches={matches}
          setMatches={setMatches}
          matchView={matchView}
          setMatchView={setMatchView}
        />
      )}
    </div>
  );
};

export default MatchView;
