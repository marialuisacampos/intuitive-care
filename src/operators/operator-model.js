const mongoose = require('mongoose');

const current = new Date();
const registerDate = (current) => {
  const day = current.getDate().toString();
  const registerDay = (day.length == 1) ? '0' + day : day;
  const month = (current.getMonth() + 1).toString();
  const registerMonth = (month.length == 1) ? '0' + month : month;
  const registerYear = (current.getFullYear());
  return registerDay + '/' + registerMonth + '/' + registerYear;
}

const operatorSchema = mongoose.Schema({
  ansRegister: {
    type: String
  },
  cnpj: {
    type: String
  },
  corporateName: {
    type: String
  },
  fantasyName: {
    type: String
  },
  modality: {
    type: String
  },
  adress: {
    type: String
  },
  district: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  cep: {
    type: String
  },
  telephone: {
    type: String
  },
  fax: {
    type: String
  },
  email: {
    type: String
  },
  representative: {
    type: String
  },
  representativeJob: {
    type: String
  },
  createdAt: {
    type: String,
    default: registerDate(current),
  }
});

module.exports = mongoose.model('Operadoras', operatorSchema);