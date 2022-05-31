const { readFile } = require('fs/promises');

const readFileCsv = async () => {
  const fileName = '../Relatorio_cadop.csv';
  const file = await readFile(fileName, (err) => `Error reading file csv: ${err}`);
  convertFileToJson(file);
};

const convertFileToJson = async (file) => {
  const fileToArray = file.toString().split('\r\n');
  const [ title, space, header, ...itemsArray ] = fileToArray;
  console.log(itemsArray[0]);
};

const execute = async () => {
  readFileCsv();
};

execute();