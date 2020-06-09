import React from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const FactionView = ({ factionView }) => {
  console.log(factionView);
  const memberList = factionView.members.map((member, i) => {
    return <li key={i}>{member}</li>;
  });
  console.log(memberList);
  return (
    <div id="factionView">
      <h1>{factionView.name}</h1>
      <ul>{memberList}</ul>
    </div>
  );
};

export default FactionView;
