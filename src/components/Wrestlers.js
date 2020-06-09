import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AddWrestler from './AddWrestler';

const Wrestlers = ({
  wrestlers,
  setWrestlers,
  wrestlerView,
  setWrestlerView,
  auth,
}) => {
  const wrestlerList = wrestlers.map((wrestler, i) => {
    if (wrestler) {
      return (
        <Link
          key={i}
          className="wrestlerListItem"
          to={`/wrestlers/${wrestler.id}`}
          onClick={(e) => {
            setWrestlerView(wrestler);
          }}
        >
          <li>
            <img className="wrestlerThumbnail" src={wrestler.image} />
            <h5>{wrestler.name}</h5>
          </li>
        </Link>
      );
    }
  });
  return (
    <div id="wrestlers">
      <h1>Wrestlers</h1>
      <h2>{wrestlers.length}</h2>
      <ul id="wrestlerList">{wrestlerList}</ul>
      {auth && (
        <AddWrestler wrestlers={wrestlers} setWrestlers={setWrestlers} />
      )}
    </div>
  );
};

export default Wrestlers;
