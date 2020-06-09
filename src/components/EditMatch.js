import React from 'react';
import Axios from 'axios';

const EditMatch = ({ matches, setMatches, matchView, setMatchView }) => {
  const updatedMatch = { ...matchView };
  const submitUpdatedMatch = async (e) => {
    e.preventDefault();
    const matchesCopy = [...matches];
    const matchIndex = matches.indexOf(matchView);
    Axios.put(`/api/matches/${matchView.id}`, updatedMatch).then((response) => {
      matchesCopy.splice(matchIndex, 1, response.data);

      setMatches(matchesCopy);
      setMatchView(response.data);
    });
  };

  return (
    <div id="updateWrestlerDiv">
      <h1>Edit Match</h1>
      <form id="updateMatchForm" onSubmit={submitUpdatedMatch}>
        <input
          type="date"
          onChange={(e) => {
            updatedMatch.date = e.target.value;
          }}
        ></input>

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditMatch;
