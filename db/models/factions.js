const client = require('../client');

const factions = {
  read: async () => {
    const response = await client.query('SELECT * FROM factions');
    return response.rows;
  },

  create: async (faction) => {
    const SQL = `INSERT INTO factions (name, members) values($1, $2) returning *`;
    return (await client.query(SQL, [faction.name, faction.members])).rows[0];
  },

  update: async (faction) => {
    const SQL = `UPDATE factions SET name = $1, WHERE id = $2 returning *`;
    return (await client.query(SQL, [faction.name, faction.id])).rows[0];
  },
};

module.exports = factions;
