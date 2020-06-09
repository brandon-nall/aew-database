const client = require('../client');

const wrestlers = {
  read: async () => {
    const response = await client.query('SELECT * FROM wrestlers');
    return response.rows;
  },

  create: async (wrestler) => {
    const SQL = `INSERT INTO wrestlers (name, debut, image) values($1, $2, $3) returning *`;
    return (
      await client.query(SQL, [wrestler.name, wrestler.debut, wrestler.image])
    ).rows[0];
  },

  update: async (wrestler) => {
    console.log(wrestler);
    const SQL = `UPDATE wrestlers SET name = $1, debut = $2, image = $3 WHERE id = $4 returning *`;
    return (
      await client.query(SQL, [
        wrestler.name,
        wrestler.debut,
        wrestler.image,
        wrestler.id,
      ])
    ).rows[0];
  },
};

module.exports = wrestlers;
