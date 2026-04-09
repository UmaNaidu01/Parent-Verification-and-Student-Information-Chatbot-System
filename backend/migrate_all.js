const mongoose = require('mongoose');
const Models = require('./database');

const semesterSubjects = {
  1: ['Mathematics I', 'Physics I', 'Chemistry', 'Engineering Graphics', 'Computer Programming'],
  2: ['Mathematics II', 'Physics II', 'Data Structures', 'Basic Electrical', 'Environmental Science'],
  3: ['DBMS', 'Discrete Math', 'DLD', 'Web Technologies', 'Software Engineering'],
  4: ['Algorithms', 'Operating Systems', 'Computer Networks', 'Automata Theory', 'Microprocessors'],
  5: ['Machine Learning', 'Compiler Design', 'Cyber Security', 'Cloud Computing', 'Data Analytics'],
  6: ['Artificial Intelligence', 'Blockchain', 'Deep Learning', 'Software Testing', 'IOT']
};

async function migrateAll() {
  try {
    const students = await Models.Student.find({});
    console.log(`Found ${students.length} students to migrate...`);

    for (const student of students) {
      const regNumber = student.regNumber;
      console.log(`Migrating ${regNumber}...`);

      const studentData = {
        subjects: [],
        semCGPA: [],
        attendance: 0
      };

      let overallAttendanceSum = 0;
      let totalSubjects = 0;

      for (let sem = 1; sem <= 6; sem++) {
        let semSgpaSum = 0;
        const subs = semesterSubjects[sem];
        
        subs.forEach(sub => {
          const att = Math.floor(Math.random() * 30) + 70; 
          const marks = Math.floor(Math.random() * 40) + 60; 
          let grade = 'C';
          if (marks >= 90) grade = 'O';
          else if (marks >= 80) grade = 'A';
          else if (marks >= 70) grade = 'B';
          
          studentData.subjects.push({
            subject: sub,
            semester: sem,
            attendance: att,
            marks: marks,
            grade: grade,
            m1: Math.floor(marks * 0.4),
            m2: Math.floor(marks * 0.4)
          });
          
          semSgpaSum += (marks / 10);
          overallAttendanceSum += att;
          totalSubjects++;
        });
        
        studentData.semCGPA.push({
          semester: sem,
          sgpa: parseFloat((semSgpaSum / 5).toFixed(2))
        });
      }

      const finalAttendance = (overallAttendanceSum / totalSubjects).toFixed(2);
      const currentCGPA = (studentData.semCGPA.reduce((acc, curr) => acc + curr.sgpa, 0) / studentData.semCGPA.length).toFixed(2);

      // Update collections
      await Models.Student.updateOne({ regNumber }, { $set: { semester: 6, attendance: finalAttendance, cgpa: currentCGPA } });

      await Models.Attendance.findOneAndUpdate(
        { regNumber },
        {
          regNumber,
          overallPercentage: finalAttendance,
          subjectWise: studentData.subjects.map(s => ({ subject: s.subject, attendance: s.attendance })),
          semesterWise: studentData.semCGPA.map(s => ({ semester: s.semester, attendance: 80 + Math.random() * 15 })),
          lowAttendanceAlerts: finalAttendance < 75 ? [`Low overall attendance: ${finalAttendance}%`] : []
        },
        { upsert: true }
      );

      await Models.AcademicPerformance.findOneAndUpdate(
        { regNumber },
        {
          regNumber,
          currentCGPA,
          yearWiseCGPA: [
            { year: 1, cgpa: ((studentData.semCGPA[0].sgpa + studentData.semCGPA[1].sgpa) / 2).toFixed(2) },
            { year: 2, cgpa: ((studentData.semCGPA[2].sgpa + studentData.semCGPA[3].sgpa) / 2).toFixed(2) },
            { year: 3, cgpa: ((studentData.semCGPA[4].sgpa + studentData.semCGPA[5].sgpa) / 2).toFixed(2) }
          ],
          semesterWiseCGPA: studentData.semCGPA,
          subjectWiseMarks: studentData.subjects.map(s => ({ subject: s.subject, grade: s.grade, marks: s.marks }))
        },
        { upsert: true }
      );

      await Models.IntraSemesterMarks.findOneAndUpdate(
        { regNumber },
        {
          regNumber,
          marks: studentData.subjects.map(s => ({
            subject: s.subject,
            m1: s.m1,
            m2: s.m2,
            t1: Math.floor(s.marks * 0.4) - Math.floor(Math.random() * 3),
            total: s.marks
          }))
        },
        { upsert: true }
      );
    }

    console.log("Migration complete!");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
}

mongoose.connection.once('open', migrateAll);
