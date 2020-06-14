import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const Home = ({
  matches,
  wrestlers,
  setWrestlerView,
  factions,
  setFactionView,
}) => {
  const worldChampionMatch = matches
    .filter((match) => match.championship === 'World Championship')
    .sort((a, b) => (a.date < b.date ? 1 : -1))[0];

  const worldChampion = wrestlers.find((wrestler) => {
    if (worldChampionMatch) {
      return wrestler.name === worldChampionMatch.winner;
    }
  });

  const womensChampionMatch = matches
    .filter((match) => match.championship === "Women's World Championship")
    .sort((a, b) => (a.date < b.date ? 1 : -1))[0];

  const womensChampion = wrestlers.find((wrestler) => {
    if (womensChampionMatch) {
      return wrestler.name === womensChampionMatch.winner;
    }
  });

  const tagteamChampionMatch = matches
    .filter((match) => match.championship === 'Tag Team World Championship')
    .sort((a, b) => (a.date < b.date ? 1 : -1))[0];

  const tagteamChampion = factions.find((faction) => {
    if (tagteamChampionMatch) {
      return faction.name === tagteamChampionMatch.winner;
    }
  });

  const tntChampionMatch = matches
    .filter((match) => match.championship === 'TNT Championship')
    .sort((a, b) => (a.date < b.date ? 1 : -1))[0];

  const tntChampion = wrestlers.find((wrestler) => {
    if (tntChampionMatch) {
      return wrestler.name === tntChampionMatch.winner;
    }
  });

  return (
    <div id="home">
      {worldChampionMatch && (
        <div className="championship">
          <Link
            to={`/wrestlers/${worldChampion.id}`}
            onClick={(e) => {
              setWrestlerView(worldChampion);
            }}
          >
            <img className="beltImg" src="https://i.imgur.com/5OOLdK7.png" />
            <img className="wrestlerBeltImg" src={worldChampion.image} />
            <h1>World Champion</h1>
            <h1>{worldChampionMatch.winner}</h1>
          </Link>
        </div>
      )}

      {womensChampionMatch && (
        <div className="championship">
          <Link
            to={`/wrestlers/${womensChampion.id}`}
            onClick={(e) => {
              setWrestlerView(womensChampion);
            }}
          >
            <img
              className="beltImg"
              src="https://upload.wikimedia.org/wikipedia/en/0/0e/AEW_Women%27s_World_Championship.jpg"
            />

            <img className="wrestlerBeltImg" src={womensChampion.image} />
            <h1>Women's World Champion</h1>
            <h1>{womensChampionMatch.winner}</h1>
          </Link>
        </div>
      )}

      {tagteamChampionMatch && tagteamChampion && (
        <div className="championship">
          <Link
            to={`/factions/${tagteamChampion.id}`}
            onClick={(e) => {
              setFactionView(tagteamChampion);
            }}
          >
            <img
              className="beltImg"
              src="https://cdn.sescoops.com/wp-content/uploads/2019/10/aew-tag-titles-696x392.jpg"
            />

            <h1>Tag Team World Champions</h1>
            <h1>{tagteamChampionMatch.winner}</h1>
          </Link>
        </div>
      )}

      {tntChampionMatch && (
        <div className="championship">
          <Link
            to={`/wrestlers/${tntChampion.id}`}
            onClick={(e) => {
              setWrestlerView(tntChampion);
            }}
          >
            <img
              className="beltImg"
              src="https://vignette.wikia.nocookie.net/prowrestling/images/d/dc/AEW_TNT_Championship.png"
            />

            <img className="wrestlerBeltImg" src={tntChampion.image} />
            <h1>TNT Champion</h1>
            <h1>{tntChampionMatch.winner}</h1>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
