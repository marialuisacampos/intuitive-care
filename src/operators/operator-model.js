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
    type: String,
    required: true
  },
  cnpj: {
    type: String,
    required: true
  },
  corporateName: {
    type: String,
    required: true
  },
  fantasyName: {
    type: String,
    required: true
  },
  modality: {
    type: String,
    required: true
  },
  adress: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  cep: {
    type: String,
    required: true
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
    type: String,
    required: true
  },
  representativeJob: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    default: registerDate(current),
  }
});

module.exports = mongoose.model('Operadoras', operatorSchema);