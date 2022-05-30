const {
  registerNewOperatorOnDatabase,
  verifyExistentOperatorOnDatabase,
} = require('./operator-service');

const registerNewOperator = async (req, res) => {
  try {
    const newOperator = req.body;
    const { ansRegister } = newOperator;
    const verifyExistenceOfOperator = await verifyExistentOperatorOnDatabase(ansRegister);

    if (verifyExistenceOfOperator) {
      return res.status(400).json({ message: `ANS Register ${ansRegister} already exists` });
    } else {
      const operatorRegistered = await registerNewOperatorOnDatabase(newOperator);

      return res.status(200).json({
        message: "Operator registered.",
        operator: operatorRegistered
      });
    };
  } catch (error) {
    return res.status(500).send(error);
  };
};

module.exports = {
  registerNewOperator,
};