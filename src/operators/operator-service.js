const Operator = require('./operator-model');

const registerNewOperatorOnDatabase = operator => Operator(operator).save();

const searchAllOperatorsOnDatabase = () => Operator.find();

const updateOperatorOnDatabase = (operatorRegister, operatorToUpdate) => {
  return Operator.findOneAndUpdate({ ansRegister: operatorRegister }, operatorToUpdate);
};

const deleteOperatorOnDatabase = operatorRegister => Operator.findOneAndDelete({ ansRegister: operatorRegister });

const verifyExistentOperatorOnDatabase = ansRegister => Operator.findOne({ ansRegister });

module.exports = {
  registerNewOperatorOnDatabase,
  deleteOperatorOnDatabase,
  verifyExistentOperatorOnDatabase,
  searchAllOperatorsOnDatabase,
  updateOperatorOnDatabase,
};