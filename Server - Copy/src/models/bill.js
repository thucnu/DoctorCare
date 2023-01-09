'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Bill.belongsTo(models.Booking, {foreignKey:'billId', targetKey:'id', as:'billData'});
    }
  };
  Bill.init({
    keyMap: DataTypes.STRING,
    stripe_payment_id: DataTypes.STRING,
    total: DataTypes.INTEGER,
    bookingId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bill',
  });
  return Bill;
};