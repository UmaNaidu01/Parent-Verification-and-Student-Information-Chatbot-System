const mongoose = require('mongoose');
const Models = require('./database');

async function fixEmails() {
  try {
    const students = await Models.Student.find({});
    let updatedCount = 0;

    for (const student of students) {
      if (student.email && student.email.includes('@mail.com')) {
        const newEmail = student.email.replace('@mail.com', '@gmail.com');
        await Models.Student.updateOne({ _id: student._id }, { $set: { email: newEmail } });
        updatedCount++;
      }
    }

    console.log(`Successfully updated ${updatedCount} student emails to @gmail.com`);
  } catch (err) {
    console.error('Error updating emails:', err);
  } finally {
    mongoose.connection.close();
  }
}

mongoose.connection.once('open', fixEmails);
