import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AddWrestler from './AddWrestler';

const Factions = ({ factions, setFactionView }) => {
  const factionList = factions.sort().map((faction, i) => {
    if (faction) {
      return (
        <Link
          key={i}
          className="factionListItem"
          to={`/factions/${faction.id}`}
          onClick={(e) => {
            setFactionView(faction);
          }}
        >
          <li>
            <h5>{faction.name}</h5>
          </li>
        </Link>
      );
    }
  });
  return (
    <div id="factions">
      <h1>Factions &amp; Teams</h1>
      <ul id="factionList">{factionList}</ul>
    </div>
  );
};

export default Factions;
