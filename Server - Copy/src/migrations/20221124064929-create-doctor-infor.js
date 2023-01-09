'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Doctor_Infors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      doctorId: {
        type: Sequelize.INTEGER,
        allowNull: false,

      },
      priceId: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      provinceId: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      paymentId: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      specialtyId: {
        type: Sequelize.INTEGER,
        allowNull: false,

      },
      note: {
        type: Sequelize.STRING
      },
      count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      clinicId: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      addressClinic: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      nameClinic: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Doctor_Infors');
  }
};