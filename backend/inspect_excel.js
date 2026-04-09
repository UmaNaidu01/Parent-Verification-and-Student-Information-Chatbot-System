const xlsx = require('xlsx');

const workbook = xlsx.readFile('../Student_Profile_System.xlsx');
const sheetNames = workbook.SheetNames;

sheetNames.forEach(sheetName => {
    console.log(`\n--- Sheet: ${sheetName} ---`);
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);
    
    if (data.length > 0) {
        console.log('Headers:', Object.keys(data[0]));
        console.log('First Row Data:', JSON.stringify(data[0], null, 2));
    } else {
        console.log('Sheet is empty');
    }
});
