const mongoose = require('mongoose');
const Models = require('./database');

const studentsData = [
  {
    regNumber: '231fa04g25',
    phone: '8709870656',
    name: 'Ujjwal Kriti',
    branch: 'Computer Science and Engineering',
    semester: 6,
    attendance: 85.5,
    subjects: [
      { subject: 'Data Structures', attendance: 88, marks: 85, grade: 'A' },
      { subject: 'Operating Systems', attendance: 76, marks: 72, grade: 'B' },
      { subject: 'Computer Networks', attendance: 92, marks: 95, grade: 'O' },
      { subject: 'Artificial Intelligence', attendance: 80, marks: 82, grade: 'A' }
    ],
    semCGPA: [
      { semester: 1, sgpa: 8.6 }, { semester: 2, sgpa: 8.4 }, 
      { semester: 3, sgpa: 7.8 }, { semester: 4, sgpa: 8.0 }, 
      { semester: 5, sgpa: 8.2 }
    ],
    fees: 25000,
    backlogs: 1
  },
  {
    regNumber: '231fa04g26',
    phone: '9876543210',
    name: 'Amit Kumar',
    branch: 'Information Technology',
    semester: 4,
    attendance: 78.2,
    subjects: [
      { subject: 'Database Management', attendance: 82, marks: 78, grade: 'B+' },
      { subject: 'Software Engineering', attendance: 70, marks: 65, grade: 'C' },
      { subject: 'Python Programming', attendance: 85, marks: 88, grade: 'A' },
      { subject: 'Discrete Math', attendance: 75, marks: 70, grade: 'B' }
    ],
    semCGPA: [
      { semester: 1, sgpa: 7.5 }, { semester: 2, sgpa: 7.8 }, 
      { semester: 3, sgpa: 8.1 }
    ],
    fees: 12000,
    backlogs: 0
  },
  {
    regNumber: '231fa04g27',
    phone: '9123456789',
    name: 'Priya Singh',
    branch: 'Electronics and Communication',
    semester: 2,
    attendance: 92.1,
    subjects: [
      { subject: 'Digital Electronics', attendance: 95, marks: 92, grade: 'O' },
      { subject: 'Network Analysis', attendance: 88, marks: 85, grade: 'A' },
      { subject: 'Signals & Systems', attendance: 90, marks: 80, grade: 'A' },
      { subject: 'Engineering Physics', attendance: 94, marks: 88, grade: 'A' }
    ],
    semCGPA: [
      { semester: 1, sgpa: 8.9 }
    ],
    fees: 0,
    backlogs: 0
  },
  {
    regNumber: '231fa04g28',
    phone: '8888877777',
    name: 'Rahul Verma',
    branch: 'Mechanical Engineering',
    semester: 8,
    attendance: 62.5,
    subjects: [
      { subject: 'Thermodynamics', attendance: 65, marks: 45, grade: 'D' },
      { subject: 'Heat Transfer', attendance: 55, marks: 38, grade: 'F' },
      { subject: 'Fluid Mechanics', attendance: 70, marks: 52, grade: 'C' },
      { subject: 'Kinematics', attendance: 60, marks: 40, grade: 'E' }
    ],
    semCGPA: [
      { semester: 1, sgpa: 6.5 }, { semester: 2, sgpa: 6.8 }, 
      { semester: 3, sgpa: 7.1 }, { semester: 4, sgpa: 6.2 }, 
      { semester: 5, sgpa: 6.5 }, { semester: 6, sgpa: 6.0 }, 
      { semester: 7, sgpa: 6.3 }
    ],
    fees: 45000,
    backlogs: 3
  },
  {
    regNumber: '231fa04g29',
    phone: '7777766666',
    name: 'Sarah Khan',
    branch: 'Biotechnology',
    semester: 3,
    attendance: 96.5,
    subjects: [
      { subject: 'Genetics', attendance: 98, marks: 95, grade: 'O' },
      { subject: 'Microbiology', attendance: 95, marks: 92, grade: 'O' }
    ],
    semCGPA: [{ semester: 1, sgpa: 9.2 }, { semester: 2, sgpa: 9.4 }],
    fees: 0,
    backlogs: 0
  },
  {
    regNumber: '231fa04g30',
    phone: '6666655555',
    name: 'Arjun Reddy',
    branch: 'Computer Science and Engineering',
    semester: 5,
    attendance: 82.0,
    subjects: [
      { subject: 'Algorithms', attendance: 85, marks: 78, grade: 'B+' },
      { subject: 'Web Technologies', attendance: 80, marks: 82, grade: 'A' }
    ],
    semCGPA: [{ semester: 1, sgpa: 7.8 }, { semester: 2, sgpa: 8.0 }, { semester: 3, sgpa: 8.2 }, { semester: 4, sgpa: 7.5 }],
    fees: 15000,
    backlogs: 0
  }
];

async function seedData() {
  try {
    for (const data of studentsData) {
      const { regNumber, phone, name, branch, semester } = data;

      // 1. Insert Student
      await Models.Student.findOneAndUpdate(
        { regNumber },
        { regNumber, parentPhone: phone, name, branch, semester },
        { upsert: true, new: true }
      );

      // 2. Insert Attendance
      await Models.Attendance.findOneAndUpdate(
        { regNumber },
        {
          regNumber,
          overallPercentage: data.attendance,
          subjectWise: data.subjects.map(s => ({ subject: s.subject, attendance: s.attendance })),
          semesterWise: data.semCGPA.map(s => ({ semester: s.semester, attendance: 80 + Math.random() * 15 })),
          lowAttendanceAlerts: data.attendance < 75 ? [`Low overall attendance: ${data.attendance}%`] : []
        },
        { upsert: true, new: true }
      );

      // 3. Insert Academic Status
      await Models.AcademicStatus.findOneAndUpdate(
        { regNumber },
        {
          regNumber,
          numberOfBacklogs: data.backlogs,
          repeatedSubjects: data.backlogs > 0 ? ['Example Subject'] : [],
          incompleteSubjects: [],
          courseCompletionStatus: 'In Progress'
        },
        { upsert: true, new: true }
      );

      // 4. Insert Academic Performance
      const currentCGPA = (data.semCGPA.reduce((acc, curr) => acc + curr.sgpa, 0) / data.semCGPA.length).toFixed(2);
      await Models.AcademicPerformance.findOneAndUpdate(
        { regNumber },
        {
          regNumber,
          currentCGPA,
          yearWiseCGPA: [{ year: 1, cgpa: currentCGPA }],
          semesterWiseCGPA: data.semCGPA,
          subjectWiseMarks: data.subjects.map(s => ({ subject: s.subject, grade: s.grade, marks: s.marks }))
        },
        { upsert: true, new: true }
      );

      // 5. Insert Notifications
      await Models.Notification.deleteMany({ regNumber });
      await Models.Notification.create({
        regNumber,
        upcomingExams: [`Final exam for ${data.subjects[0].subject} on Dec 20`],
        assignmentDeadlines: [`Assignment for ${data.subjects[1].subject} due in 3 days`],
        academicCalendarUpdates: ['Winter vacation starts from Dec 25']
      });

      // 6. Insert Financials
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

      // 7. Insert Communication
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

      // 8. Insert Insights
      await Models.Insight.findOneAndUpdate(
        { regNumber },
        {
          regNumber,
          strongSubjects: [data.subjects[0].subject],
          weakSubjects: data.backlogs > 0 ? [data.subjects[1].subject] : [],
          improvementSuggestions: ['Keep up the consistent effort!']
        },
        { upsert: true, new: true }
      );
    }

    console.log(`Successfully seeded ${studentsData.length} student records into MongoDB!`);
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    mongoose.connection.close();
  }
}

mongoose.connection.once('open', () => {
  seedData();
});
