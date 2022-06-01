const {
  registerNewOperatorOnDatabase,
  verifyExistentOperatorOnDatabase,
  deleteOperatorOnDatabase,
  searchAllOperatorsOnDatabase,
  updateOperatorOnDatabase,
  searchOperatorOnDatase,
} = require('./operator-service');
const operatorsCsvFile = require('../csv/operators.json');

const registerNewOperator = async (req, res) => {
  try {
    const newOperator = req.body;
    const { ansRegister } = newOperator;
    const verifyExistenceOfOperator = await verifyExistentOperatorOnDatabase(ansRegister);

    if (verifyExistenceOfOperator.length !== 0) {
      return res.status(400).json({ message: `ANS Register ${ansRegister} already exists` });
    } else {
      const operatorRegistered = await registerNewOperatorOnDatabase(newOperator);

      return res.status(200).json({
        message: "Operator registered.",
        operator: operatorRegistered
      });
    };
  } catch (error) {
    return res.status(404).json({
      message: 'Error registering operator',
      error
    });
  };
};

const registerOperatorsFromCsvFileOnDatabase = async (req, res) => {
  try {
    let i = 0;
    let ansRegistered = [];
    while (i < operatorsCsvFile.length) {
      const ans = operatorsCsvFile[i].ansRegister;
      const validation = await verifyExistentOperatorOnDatabase(ans)
      if (ans !== "" && validation.length === 0) {
        await registerNewOperatorOnDatabase(operatorsCsvFile[i])
        ansRegistered.push(ans)
      }
      i++
    }

    if(ansRegistered.length === 0) {
      return res.status(200).json({ message: 'All operators were already registered' })
    }
    return res.status(200).json({
      message: 'New operators registered',
      ans: ansRegistered
    })
  } catch (error) {
    return res.status(404).json({
      message: 'Error registering operators.',
      error,
    });
  };
};

const searchAllOperators = async (req, res) => {
  try {
    const operators = await searchAllOperatorsOnDatabase();

    if (operators.length === 0) {
      return res.status(400).json({ message: 'There is no operators on database.' });
    }
    return res.status(200).json(operators);
  } catch (error) {
    return res.status(404).json({ 
      message: 'Error finding operators',
      error,
     });
  };
};

const searchOperatorByFilter = async (req, res) => {
  try {
    const { searchBy, filter, page, limit } = req.query;
    const operators = await searchOperatorOnDatase(searchBy, filter, page, limit);

    if(operators.length === 0) {
      return res.status(400).json({ message: `There is no operator with this ${searchBy}: ${filter}` });
    }
    return res.status(200).json(operators);
  } catch(error) {
    res.status(404).json({
      message: 'Error finding operators.',
      error,
    });
  };
};

const updateOperator = async (req, res) => {
  try {
    const ansRegisterToUpdate = req.params.ansRegister;
    const operatorToUpdate = req.body;
    const verifyExistenceOfOperator = await verifyExistentOperatorOnDatabase(ansRegisterToUpdate);

    if(verifyExistenceOfOperator.length !== 0) {
      await updateOperatorOnDatabase(ansRegisterToUpdate, operatorToUpdate);
      return res.status(200).json({ message: `Operator with ANS Register ${ansRegisterToUpdate} updated.` });
    }
    return res.status(400).json({ message: `ANS Register ${ansRegisterToUpdate} does not exist.` });
  } catch (error) {
    return res.status(404).json({
      message: 'Error updating operators.',
      error,
    });
  };
};

const deleteOperator = async (req, res) => {
  try {
    const { ansRegister } = req.params;

    const verifyExistenceOfOperator = await verifyExistentOperatorOnDatabase(ansRegister);

    if(verifyExistenceOfOperator.length !== 0)  {
      await deleteOperatorOnDatabase(ansRegister);
      return res.status(200).json({ message: `Operator with ANS Register ${ansRegister} deleted` });
    } else {
      return res.status(400).json({ message: 'ANS Register does not exist.' });
    };
  } catch(error) {
    return res.status(404).json({
      message: 'Error deleting operator.',
      error,
    });
  };
};

module.exports = {
  registerNewOperator,
  deleteOperator,
  searchAllOperators,
  updateOperator,
  searchOperatorByFilter,
  registerOperatorsFromCsvFileOnDatabase,
};