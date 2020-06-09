import React from 'react';
import Axios from 'axios';

const EditWrestler = ({
  wrestlers,
  setWrestlers,
  wrestlerView,
  setWrestlerView,
}) => {
  const updatedWrestler = { ...wrestlerView };
  const submitUpdatedWrestler = async (e) => {
    e.preventDefault();
    const wrestlersCopy = [...wrestlers];
    const wrestlerIndex = wrestlers.indexOf(wrestlerView);
    Axios.put(`/api/wrestlers/${wrestlerView.id}`, updatedWrestler).then(
      (response) => {
        wrestlersCopy.splice(wrestlerIndex, 1, response.data);

        setWrestlers(wrestlersCopy);
        setWrestlerView(response.data);
      }
    );
  };

  return (
    <div id="updateWrestlerDiv">
      <h1>Edit Wrestler</h1>
      <form id="updateWrestlerForm" onSubmit={submitUpdatedWrestler}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => {
            updatedWrestler.name = e.target.value;
          }}
        ></input>
        <input
          type="date"
          onChange={(e) => {
            updatedWrestler.debut = e.target.value;
          }}
        ></input>
        <input
          type="text"
          placeholder="Image URL"
          onChange={(e) => {
            updatedWrestler.image = e.target.value;
          }}
        ></input>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditWrestler;
