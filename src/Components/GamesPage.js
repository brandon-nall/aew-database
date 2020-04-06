import React, { useState, useEffect } from 'react';

const GamesPage = ({ allGames }) => {
  const greentext = { color: 'rgb(0, 200, 0)' };
  const [searchInput, setSearchInput] = useState('');
  return (
    <div id='gamesPage'>
      <form id='searchGamesForm'>
        <h3>Games</h3>
        <input
          type='text'
          placeholder='Search for a Game'
          value={searchInput}
          onChange={(ev) => setSearchInput(ev.target.value)}
        />
        {/*
          INPUT NEEDS AUTO-SUGGEST/COMPLETE DROPDOWN OPTIONS BASED ON ALL GAME NAMES THAT MATCH FIELD INPUT
          AS USER TYPES, LIST OF GAMES NARROWS BASED ON MATCHING TITLE
          WHEN DROPDOWN OPTION IS CLICKED, LINKS TO GAME PAGE
          IF NO INPUT, LIST IS TOP GAMES BY POPULARITY
          */}
        <h6>
          <a href=''>Advanced Search</a>
        </h6>
        {/*
          ADVANCED SEARCH FORM DISPLAYS WHEN PROMPT IS CLICKED
          FORM CONTAINS VARIOUS SELECTORS, CHECKBOXES, RADIOS, ETC TO ALLOW THE USER TO ADJUST SEARCH PARAMETERS BASED ON GAME TYPE, GENRE, PLAYER NUMBERS, ETC
          */}
        <button className='searchButton'>
          <h5>Search</h5>
        </button>
        <h6>
          <i>Is your favorite game unsupported?</i>
        </h6>
        <h6>
          <a href='' style={greentext}>
            Contact Us!
          </a>
        </h6>
      </form>
      <ul id='gamesList'>
        {allGames.map((game) => {
          return (
            <li key={game.id} className='gamesListItem'>
              <img className='gameListItemImage' src={game.image_url} />
              <p>{game.name}</p>
            </li>
          );
        })}
        {/*
          LIST OF GAMES THAT MATCH SEARCH PARAMETERS
           INCLUDES COVER IMAGE, TITLE, NUMBER OF USERS, FRIENDS THAT PLAY, AVERAGE RATING, AND 'ADD FAVORITE GAME' BUTTON
           LIST ITEMS LINK TO GAME PAGES
          */}
      </ul>
    </div>
  );
};

export default GamesPage;