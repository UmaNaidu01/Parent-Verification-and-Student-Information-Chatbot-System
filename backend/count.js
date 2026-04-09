const xlsx = require('xlsx');

const workbook = xlsx.readFile('../Student_Profile_System.xlsx');
console.log('Student count:', xlsx.utils.sheet_to_json(workbook.Sheets['Student_Profile']).length);
