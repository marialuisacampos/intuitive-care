const Operator = require('./operator-model');

const registerNewOperatorOnDatabase = (operator) => Operator(operator).save();

const verifyExistentOperatorOnDatabase = async (ansRegister) => Operator.findOne({ ansRegister });

module.exports = {
  registerNewOperatorOnDatabase,
  verifyExistentOperatorOnDatabase
};