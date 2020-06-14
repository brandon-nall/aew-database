import React from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const FactionView = ({ factionView, wrestlers, setWrestlerView }) => {
  console.log(factionView);

  const memberList = factionView.members.map((member, i) => {
    const wrestler = wrestlers.find((wrestler) => wrestler.name === member);
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
          </li>
        </Link>
      );
    } else {
      return (
        <h5 key={i} className="participantsListItem">
          {member}
        </h5>
      );
    }
  });

  return (
    <div id="factionView">
      <h1>{factionView.name}</h1>
      <img src={factionView.image} id="factionImage" />
      <ul id="participantsList">{memberList}</ul>
    </div>
  );
};

export default FactionView;
