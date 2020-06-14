import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AddWrestler from './AddWrestler';

const Factions = ({ factions, setFactionView }) => {
  const factionList = factions.sort().map((faction, i) => {
    if (faction && faction.type === 'Faction') {
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
            <img src={faction.image} className="factionThumbnail" />
            <h5>{faction.name}</h5>
          </li>
        </Link>
      );
    }
  });
  const tagteamList = factions.sort().map((faction, i) => {
    if (faction && faction.type === 'Tag Team') {
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
            <img src={faction.image} className="factionThumbnail" />
            <h5>{faction.name}</h5>
          </li>
        </Link>
      );
    }
  });

  return (
    <div id="factions">
      <h1>Factions &amp; Teams</h1>
      <h2>Factions</h2>
      <ul id="factionList">{factionList}</ul>
      <h2>Tag Teams</h2>
      <ul id="tagteamList">{tagteamList}</ul>
    </div>
  );
};

export default Factions;
