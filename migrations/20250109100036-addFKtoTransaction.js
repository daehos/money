'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Transactions', 'UserId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users', 
        key: 'id', 
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE', 
    });
    await queryInterface.addColumn('Transactions', 'CategoryId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Categories', 
        key: 'id', 
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE', 
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Transactions', 'UserId');
    await queryInterface.removeColumn('Transactions', 'CategoryId');
  }
};
