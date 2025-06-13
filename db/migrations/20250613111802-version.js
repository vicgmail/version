'use strict';

const tableName = 'Version';
const columnName = 'inProgress';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(tableName, columnName, {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });
  },

  down(queryInterface) {
    return queryInterface.removeColumn(tableName, columnName);
  },
};
