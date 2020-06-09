import React, { useState } from 'react';
import Axios from 'axios';

const AddMatch = ({ matches, setMatches, wrestlers }) => {
  const [participants, setParticipants] = useState(2);
  const [selectedWrestlers, setSelectedWrestlers] = useState([]);
  const [newMatch, setNewMatch] = useState({});
  const submitNewMatch = async (e) => {
    e.preventDefault();
    newMatch.participants = selectedWrestlers;
    Axios.post('/api/matches', newMatch).then((response) => {
      setMatches([...matches, newMatch]);
    });
  };

  const wrestlersList = wrestlers.map((wrestler, i) => {
    return <option key={i}>{wrestler.name}</option>;
  });
  const wrestlerSelectors = [];
  for (let i = 0; i < participants; i++) {
    wrestlerSelectors.push(
      <select
        key={i}
        defaultValue="Add a Wrestler"
        onChange={async (e) => {
          if (!selectedWrestlers.includes(e.target.value)) {
            setSelectedWrestlers([...selectedWrestlers, e.target.value]);
          }
        }}
      >
        <option disabled>Add a Wrestler</option>
        {wrestlersList}
      </select>
    );
  }

  const winnerSelectorList = selectedWrestlers.map((wrestler, i) => {
    return <option key={i}>{wrestler}</option>;
  });

  return (
    <div id="addMatchDiv">
      <h1>Add Match</h1>
      <form id="addMatchForm" onSubmit={submitNewMatch}>
        <input
          type="date"
          onChange={(e) => {
            setNewMatch({ ...newMatch, date: e.target.value });
          }}
        ></input>
        <select
          defaultValue="Type"
          onChange={(e) => {
            setNewMatch({ ...newMatch, type: e.target.value });
          }}
        >
          <option disabled>Type</option>
          <option>Singles</option>
          <option>Tag Team</option>
          <option>Triple Threat</option>
          <option>Fatal Four Way</option>
        </select>
        <select
          defaultValue="Championship"
          onChange={(e) => {
            setNewMatch({ ...newMatch, championship: e.target.value });
          }}
        >
          <option disabled>Championship</option>
          <option>World Championship</option>
          <option>Women's World Championship</option>
          <option>Tag Team Championship</option>
          <option>TNT Championship</option>
        </select>
        <input
          placeholder="Other Type"
          type="text"
          onChange={(e) => {
            setNewMatch({ ...newMatch, type: e.target.value });
          }}
        ></input>
        Participants: {participants}
        <button
          type="button"
          onClick={() => {
            setSelectedWrestlers([]);
            if (participants > 2) {
              setParticipants(participants - 1);
            }
          }}
        >
          -
        </button>
        <button
          type="button"
          onClick={() => {
            setSelectedWrestlers([]);
            setParticipants(participants + 1);
          }}
        >
          +
        </button>{' '}
        {wrestlerSelectors}
        <select
          defaultValue="Winner"
          onChange={(e) => {
            setNewMatch({ ...newMatch, winner: e.target.value });
          }}
        >
          <option disabled>Winner</option>
          {winnerSelectorList}
        </select>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddMatch;
