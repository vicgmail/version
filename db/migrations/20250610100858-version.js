'use strict';

const tableName = 'Version';
const ENV = ['dev', 'production'];

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      const isExistingTable = await queryInterface
        .describeTable(tableName)
        .then((data) => (Object.entries(data)?.length ? true : false))
        .catch(() => false);

      console.log('isExistingTable:', isExistingTable);

      if (!isExistingTable) {
          await queryInterface.createTable(tableName, {
            id: {
              type: Sequelize.UUID,
              defaultValue: Sequelize.literal('uuid_generate_v4()'),
              unique: true,
              primary: true,
            },
            env: {
              type: Sequelize.ENUM(...ENV),
              allowNull: false,
            },
            major: {
              type: Sequelize.INTEGER,
              defaultValue: 0,
              allowNull: false,
            },
            minor: {
              type: Sequelize.INTEGER,
              defaultValue: 0,
              allowNull: false,
            },
            build: {
              type: Sequelize.INTEGER,
              defaultValue: 0,
              allowNull: false,
            },
            isActive: {
              type: Sequelize.BOOLEAN,
              defaultValue: true,
              allowNull: false,
            },
            createdAt: {
              type: Sequelize.DATE,
              allowNull: false,
              defaultValue: Sequelize.literal('NOW()'),
            },
            updatedAt: {
              type: Sequelize.DATE,
              allowNull: false,
              defaultValue: Sequelize.literal('NOW()'),
            },
          });

        await queryInterface.addIndex(tableName, ['major']);
        await queryInterface.addIndex(tableName, ['minor']);
        await queryInterface.addIndex(tableName, ['build']);

        await queryInterface.bulkInsert(tableName, [
        {
          env: ENV[0],
          major: 1,
          minor: 0,
          build: 1,
        },
        {
          env: ENV[0],
          major: 1,
          minor: 0,
          build: 2,
        },
        {
          env: ENV[1],
          major: 1,
          minor: 0,
          build: 3,
        },

      ]);
      }
    } catch (error) {
      console.log(`Error in CREATE ${tableName} TABLE`, error);
    }
  },

  async down (queryInterface) {
    await queryInterface.dropTable(tableName);
  }
};
