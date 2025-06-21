const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ecommerce_admin_panel', 'root', 'Password@123', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
