const mongoose = require('mongoose');
const Models = require('./database');

async function check() {
    const data = await Models.Attendance.findOne();
    console.log(data.semesterWise);
    process.exit(0);
}

mongoose.connection.once('open', check);
