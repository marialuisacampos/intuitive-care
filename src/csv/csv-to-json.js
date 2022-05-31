const { json } = require('express/lib/response');
const { readFile, appendFile, writeFile } = require('fs/promises');

const readFileCsv = async () => {
  const fileName = '../Relatorio_cadop.csv';
  const file = await readFile(fileName, (error) => `Error reading file csv: ${error}`);
  convertFileToJson(file);
};

const convertFileToJson = async (file) => {
  const fileToArray = file.toString().split('\r\n');
  const [ title, space, header, ...itemsArray ] = fileToArray;
  const operatorsArray = itemsArray.map(register => register.split(';'));
  jsonRegisterOrganizer(operatorsArray);
};

const jsonRegisterOrganizer = (operatorsArray) => {
  const arrayWithRegistersObjects = operatorsArray.map(operator => {
    const ansRegister = operator[0];
    const cnpj = operator[1];
    const corporateName = operator[2];
    const fantasyName = operator[3];
    const modality = operator[4];
    const adress = `${operator[5]}, ${operator[6]}, ${operator[7]}`;
    const district = operator[8];
    const city = operator[9];
    const state = operator[10];
    const cep = operator[11];
    const telephone = `${operator[12]}${operator[13]}`;
    const fax = operator[14];
    const email = operator[15];
    const representative = operator[16];
    const createdAt = operator[16];

    return register = {
      ansRegister,
      cnpj,
      corporateName,
      fantasyName,
      modality,
      adress,
      district,
      city,
      state,
      cep,
      telephone,
      fax,
      email,
      representative,
      createdAt
    }
  });

  writeRegistersOnJsonFile(arrayWithRegistersObjects);
};

const writeRegistersOnJsonFile = (register) => {
  const jsonFile = './operators.json';
  if(jsonFile.length !== 0) {
    const file = JSON.stringify(register).replaceAll('},', '},\n');
    appendFile(jsonFile, file, error => console.log(`Error writing json file: ${error}`));
  }
}

readFileCsv();