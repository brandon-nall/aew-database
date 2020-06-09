import React from 'react';

const Home = ({ matches }) => {
  const worldChampionMatch = matches
    .filter((match) => match.championship === 'World Championship')
    .sort((a, b) => (a.date < b.date ? 1 : -1))[0];

  const womensChampionMatch = matches
    .filter((match) => match.championship === "Women's World Championship")
    .sort((a, b) => (a.date < b.date ? 1 : -1))[0];

  const tntChampionMatch = matches
    .filter((match) => match.championship === 'TNT Championship')
    .sort((a, b) => (a.date < b.date ? 1 : -1))[0];

  return (
    <div id="home">
      <img className="beltImg" src="https://i.imgur.com/5OOLdK7.png" />
      <h1>World Champion</h1>

      {worldChampionMatch && <h1>{worldChampionMatch.winner}</h1>}

      <img
        className="beltImg"
        src="https://upload.wikimedia.org/wikipedia/en/0/0e/AEW_Women%27s_World_Championship.jpg"
      />

      <h1>Women's World Champion</h1>
      {womensChampionMatch && <h1>{womensChampionMatch.winner}</h1>}

      <img
        className="beltImg"
        src="https://cdn.sescoops.com/wp-content/uploads/2019/10/aew-tag-titles-696x392.jpg"
      />
      <h1>Tag Team World Champions</h1>

      <img
        className="beltImg"
        src="https://vignette.wikia.nocookie.net/prowrestling/images/d/dc/AEW_TNT_Championship.png"
      />
      <h1>TNT Champion</h1>
      {tntChampionMatch && <h1>{tntChampionMatch.winner}</h1>}
    </div>
  );
};

export default Home;
