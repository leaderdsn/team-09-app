const { Sequelize } = require('sequelize');

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env;

const sequelizeOptions = {
  host: 'localhost',
  port: parseInt(POSTGRES_PORT ?? '5432'),
  username: POSTGRES_USER ?? 'postgres',
  password: POSTGRES_PASSWORD ?? 'postgres',
  database: POSTGRES_DB ?? 'postgres',
  dialect: 'postgres',
};

const sequelize = new Sequelize(sequelizeOptions);

sequelize.sync();

module.exports = { sequelize };
