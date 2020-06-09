import React from 'react';
import Axios from 'axios';

const AddWrestler = ({ wrestlers, setWrestlers }) => {
  const newWrestler = {};
  const submitNewWrestler = async (e) => {
    e.preventDefault();
    Axios.post('/api/wrestlers', newWrestler).then((response) => {
      setWrestlers([...wrestlers, response.data]);
    });
  };

  return (
    <div id="addWrestlerDiv">
      <h1>Add Wrestler</h1>
      <form id="addWrestlerForm" onSubmit={submitNewWrestler}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => {
            newWrestler.name = e.target.value;
          }}
        ></input>
        <input
          type="date"
          onChange={(e) => {
            newWrestler.debut = e.target.value;
          }}
        ></input>
        <input
          type="text"
          placeholder="Image URL"
          onChange={(e) => {
            newWrestler.image = e.target.value;
          }}
        ></input>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddWrestler;
