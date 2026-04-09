const mongoose = require('mongoose');
const Models = require('./database');

async function checkGSeries() {
  try {
    const students = await Models.Student.find({ regNumber: /^231/i });
    console.log(`Found ${students.length} students in G series (starting with 231)`);
    
    for (const student of students) {
      const attendance = await Models.Attendance.findOne({ regNumber: student.regNumber });
      const performance = await Models.AcademicPerformance.findOne({ regNumber: student.regNumber });
      
      console.log(`Student: ${student.regNumber} | Subjects in attendance: ${attendance ? attendance.subjectWise.length : 0} | Subjects in performance: ${performance ? performance.subjectWiseMarks.length : 0}`);
    }
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
}

mongoose.connection.once('open', checkGSeries);
