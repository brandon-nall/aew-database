const client = require('../client');

const matches = {
  read: async () => {
    const response = await client.query('SELECT * FROM matches');
    return response.rows;
  },

  create: async (match) => {
    const SQL = `INSERT INTO matches (date, type, championship, participants, winner) values($1, $2, $3, $4, $5) returning *`;
    return (
      await client.query(SQL, [
        match.date,
        match.type,
        match.championship,
        match.participants,
        match.winner,
      ])
    ).rows[0];
  },

  update: async (match) => {
    const SQL = `UPDATE matches SET date = $1 WHERE id = $2 returning *`;
    return (await client.query(SQL, [match.date, match.id])).rows[0];
  },
};

module.exports = matches;
