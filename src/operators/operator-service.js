const Operator = require('./operator-model');

const registerNewOperatorOnDatabase = operator => Operator(operator).save();

const searchAllOperatorsOnDatabase = () => Operator.find();

const ignoreAccentsOnString = (string) => {
  return string.replace(/a/g, '[a,á,à,ä,â]')
    .replace(/e/g, '[e,é,ë,è]')
    .replace(/i/g, '[i,í,ï,ì]')
    .replace(/o/g, '[o,ó,ö,ò]')
    .replace(/u/g, '[u,ü,ú,ù]');
};

const searchOperatorByRegisterOnDatabase = filter => Operator.find({ ansRegister: filter });

const searchOperatorByCityOnDatabase = async (filter, page, limit) => {
  const operators = await Operator.find(
    {
      city: { $regex: ignoreAccentsOnString(filter), $options: 'i' },
    },
  ).limit(limit * 1).skip((page - 1) * limit);
  return operators;
};

const searchOperatorByRepresentativeOnDatabase = async (filter, page, limit) => {
  const operators = await Operator.find(
    {
      representative: { $regex: ignoreAccentsOnString(filter), $options: 'i' },
    },
  ).limit(limit * 1).skip((page - 1) * limit);
  return operators;
};

const searchOperatorOnDatase = (searchBy, filter, page, limit) => {
  switch (searchBy) {
    case 'register':
      return searchOperatorByRegisterOnDatabase(filter, page, limit);
    case 'city':
      return searchOperatorByCityOnDatabase(filter, page, limit);
    case 'representative':
      return searchOperatorByRepresentativeOnDatabase(filter, page, limit);
    default:
      return searchAllOperatorsOnDatabase(page, limit);
  };
};

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
  searchOperatorOnDatase,
};