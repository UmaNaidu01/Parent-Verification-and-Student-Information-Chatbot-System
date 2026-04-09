const mongoose = require('mongoose');
const Models = require('./database');
const bcrypt = require('bcryptjs');
const xlsx = require('xlsx');
const path = require('path');

const semesterSubjects = {
  1: ['Mathematics I', 'Physics I', 'Chemistry', 'Engineering Graphics', 'Computer Programming'],
  2: ['Mathematics II', 'Physics II', 'Data Structures', 'Basic Electrical', 'Environmental Science'],
  3: ['DBMS', 'Discrete Math', 'DLD', 'Web Technologies', 'Software Engineering'],
  4: ['Algorithms', 'Operating Systems', 'Computer Networks', 'Automata Theory', 'Microprocessors'],
  5: ['Machine Learning', 'Compiler Design', 'Cyber Security', 'Cloud Computing', 'Data Analytics'],
  6: ['Artificial Intelligence', 'Blockchain', 'Deep Learning', 'Software Testing', 'IOT']
};

async function seedData() {
  try {
    const workbook = xlsx.readFile(path.join(__dirname, '../Student_Profile_System.xlsx'));

    const profileData = xlsx.utils.sheet_to_json(workbook.Sheets['Student_Profile']);
    const financeData = xlsx.utils.sheet_to_json(workbook.Sheets['Finance']);
    const backlogsData = xlsx.utils.sheet_to_json(workbook.Sheets['Backlogs']);
    const marksData = xlsx.utils.sheet_to_json(workbook.Sheets['Internal_Marks']);
    const academicsData = xlsx.utils.sheet_to_json(workbook.Sheets['Academics']);
    const attendanceData = xlsx.utils.sheet_to_json(workbook.Sheets['Attendance']);

    const studentsMap = {};

    profileData.forEach(row => {
      studentsMap[row.registerno] = {
        regNumber: row.registerno,
        phone: row.ParentPhone?.toString(),
        name: row.name,
        branch: row.Branch,
        semester: 6, // Forced to 6 as requested
        email: row.studentmailid,
        attendance: 0,
        subjects: [],
        semCGPA: [],
        fees: 0,
        backlogs: 0,
        repeatedSubjects: []
      };
    });

    financeData.forEach(row => {
      if (studentsMap[row.registerno]) {
        studentsMap[row.registerno].fees = row.PendingAmount || 0;
      }
    });

    backlogsData.forEach(row => {
      if (studentsMap[row.registerno]) {
        studentsMap[row.registerno].backlogs = row.TotalBacklogs || 0;
        if (row.Subjects) {
          studentsMap[row.registerno].repeatedSubjects = row.Subjects.split(',').map(s => s.trim());
        }
      }
    });

    // Populate students with 6 semesters and 5 subjects each
    for (const reg in studentsMap) {
      let overallAttendanceSum = 0;
      let totalSubjects = 0;
      const student = studentsMap[reg];

      for (let sem = 1; sem <= 6; sem++) {
        let semSgpaSum = 0;
        const subs = semesterSubjects[sem];

        subs.forEach(sub => {
          // generate random marks and attendance
          const att = Math.floor(Math.random() * 30) + 70; // 70 to 99
          const marks = Math.floor(Math.random() * 40) + 60; // 60 to 99
          let grade = 'C';
          if (marks >= 90) grade = 'O';
          else if (marks >= 80) grade = 'A';
          else if (marks >= 70) grade = 'B';

          student.subjects.push({
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

        student.semCGPA.push({
          semester: sem,
          sgpa: parseFloat((semSgpaSum / 5).toFixed(2))
        });
      }

      student.attendance = totalSubjects > 0 ? parseFloat((overallAttendanceSum / totalSubjects).toFixed(2)) : 80;
    }

    const studentsData = Object.values(studentsMap);

    for (const data of studentsData) {
      const { regNumber, phone, name, branch, semester } = data;

      let currentCGPA = 0;
      if (data.semCGPA.length > 0) {
        currentCGPA = (data.semCGPA.reduce((acc, curr) => acc + curr.sgpa, 0) / data.semCGPA.length).toFixed(2);
      }

      await Models.Student.findOneAndUpdate(
        { regNumber },
        {
          regNumber,
          phone: phone || '0000000000',
          name: name || 'Unknown',
          branch: branch || 'General',
          semester: semester || 1,
          email: data.email || `${regNumber}@example.com`,
          attendance: data.attendance || 0,
          cgpa: currentCGPA || 0,
          fees: data.fees || 0,
          backlogs: data.backlogs || 0
        },
        { upsert: true, new: true }
      );

      await Models.Attendance.findOneAndUpdate(
        { regNumber },
        {
          regNumber,
          overallPercentage: data.attendance || 0,
          subjectWise: data.subjects.map(s => ({ subject: s.subject, attendance: s.attendance })),
          semesterWise: data.semCGPA.map(s => ({ semester: s.semester, attendance: 80 + Math.random() * 15 })),
          lowAttendanceAlerts: data.attendance < 75 ? [`Low overall attendance: ${data.attendance || 0}%`] : []
        },
        { upsert: true, new: true }
      );

      await Models.AcademicStatus.findOneAndUpdate(
        { regNumber },
        {
          regNumber,
          numberOfBacklogs: data.backlogs,
          repeatedSubjects: data.repeatedSubjects || [],
          incompleteSubjects: [],
          courseCompletionStatus: semester >= 6 ? 'Completed' : 'In Progress'
        },
        { upsert: true, new: true }
      );

      await Models.AcademicPerformance.findOneAndUpdate(
        { regNumber },
        {
          regNumber,
          currentCGPA,
          yearWiseCGPA: [
            { year: 1, cgpa: ((data.semCGPA[0].sgpa + data.semCGPA[1].sgpa) / 2).toFixed(2) },
            { year: 2, cgpa: ((data.semCGPA[2].sgpa + data.semCGPA[3].sgpa) / 2).toFixed(2) },
            { year: 3, cgpa: ((data.semCGPA[4].sgpa + data.semCGPA[5].sgpa) / 2).toFixed(2) }
          ],
          semesterWiseCGPA: data.semCGPA,
          subjectWiseMarks: data.subjects.map(s => ({ subject: s.subject, grade: s.grade, marks: s.marks, semester: s.semester }))
        },
        { upsert: true, new: true }
      );

      await Models.Notification.deleteMany({ regNumber });
      if (data.subjects.length > 0) {
        await Models.Notification.create({
          regNumber,
          upcomingExams: [`Final exam for ${data.subjects[0].subject} on Dec 20`],
          assignmentDeadlines: data.subjects.length > 1 ? [`Assignment for ${data.subjects[1].subject} due in 3 days`] : [],
          academicCalendarUpdates: ['Winter vacation starts from Dec 25']
        });
      }

      await Models.Financial.findOneAndUpdate(
        { regNumber },
        {
          regNumber,
          feePaymentStatus: data.fees > 0 ? 'Pending' : 'Paid',
          pendingFees: data.fees,
          paymentHistory: [{ date: '2023-01-15', amount: 40000, receipt: 'REC-999' }],
          scholarshipStatus: 'General'
        },
        { upsert: true, new: true }
      );

      await Models.Communication.findOneAndUpdate(
        { regNumber },
        {
          regNumber,
          facultyContact: [{ role: 'Professor', name: 'Dr. Smith', email: 'smith@college.edu' }],
          classAdvisor: { name: 'Prof. Johnson', email: 'johnson@college.edu', phone: '9000000000' },
          academicOfficeContacts: [{ department: 'Admin', email: 'admin@college.edu' }]
        },
        { upsert: true, new: true }
      );

      await Models.Insight.findOneAndUpdate(
        { regNumber },
        {
          regNumber,
          strongSubjects: data.subjects.length > 0 ? [data.subjects[0].subject] : [],
          weakSubjects: data.backlogs > 0 && data.subjects.length > 1 ? [data.subjects[1].subject] : [],
          improvementSuggestions: ['Keep up the consistent effort!']
        },
        { upsert: true, new: true }
      );

      await Models.IntraSemesterMarks.findOneAndUpdate(
        { regNumber },
        {
          regNumber,
          marks: data.subjects.map(s => ({
            subject: s.subject,
            semester: s.semester,
            m1: s.m1 || 0,
            m2: s.m2 || 0,
            t1: Math.floor(s.marks * 0.4) - Math.floor(Math.random() * 3),
            total: s.marks
          }))
        },
        { upsert: true, new: true }
      );
    }

    const adminEmail = 'admin@college.edu';
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await Models.Admin.findOneAndUpdate(
      { email: adminEmail },
      { email: adminEmail, password: hashedPassword, name: 'System Admin' },
      { upsert: true, new: true }
    );

    console.log(`Successfully seeded ${studentsData.length} student records and 1 Admin into MongoDB!`);
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    mongoose.connection.close();
  }
}

mongoose.connection.once('open', () => {
  console.log("Connected to DB, running seed data...");
  seedData();
});
