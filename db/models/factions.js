const client = require('../client');

const factions = {
  read: async () => {
    const response = await client.query('SELECT * FROM factions');
    return response.rows;
  },

  create: async (faction) => {
    const SQL = `INSERT INTO factions (name, type, members, image) values($1, $2, $3, $4) returning *`;
    return (
      await client.query(SQL, [
        faction.name,
        faction.type,
        faction.members,
        faction.image,
      ])
    ).rows[0];
  },

  update: async (faction) => {
    const SQL = `UPDATE factions SET name = $1, WHERE id = $2 returning *`;
    return (await client.query(SQL, [faction.name, faction.id])).rows[0];
  },
};

module.exports = factions;
