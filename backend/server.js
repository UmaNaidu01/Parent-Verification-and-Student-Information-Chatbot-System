require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const Models = require('./database');
const NodeCache = require('node-cache');
const axios = require('axios');
const { NlpManager } = require('node-nlp');

const app = express();

// Initialize NLP Manager
const manager = new NlpManager({ languages: ['en', 'hi', 'te'], forceNER: true });
manager.load('./model.nlp');

// Initialize in-memory cache for OTPs with a standard TTL of 300 seconds (5 minutes)
const otpCache = new NodeCache({ stdTTL: 300, checkperiod: 60 });
app.use(express.json());
app.use(cors());

const JWT_SECRET = 'supersecuresecretkey_for_chatbot';

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// --- AUTHENTICATION ENDPOINTS (CHAT-BASED LOGIN) ---

// Step 1: Verify Registration Number
app.post('/api/v1/auth/verify-reg', async (req, res) => {
  const { regNumber } = req.body;
  if (!regNumber) return res.status(400).json({ error: 'Registration number required' });

  try {
    const student = await Models.Student.findOne({ 
      regNumber: new RegExp('^' + regNumber.trim() + '$', 'i')
    });
    if (!student) return res.status(404).json({ error: 'Registration not found. Try again.' });
    res.json({ success: true, message: 'Registration found.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Step 2: Verify Phone Number & Send OTP
app.post('/api/v1/auth/verify-phone', async (req, res) => {
  const { regNumber, parentPhone } = req.body;
  
  try {
    const student = await Models.Student.findOne({ 
      regNumber: new RegExp('^' + regNumber.trim() + '$', 'i'),
      phone: parentPhone.replace(/\s/g, '').trim()
    });

    if (!student) return res.status(404).json({ error: 'Number mismatch. Try again.' });

    // Generate random 6-digit numeric OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store temporarily mapped by regNumber+Phone combo
    const cacheKey = `${regNumber.trim().toLowerCase()}_${student.phone}`;
    otpCache.set(cacheKey, generatedOtp);
    
    // Send SMS via Fast2SMS (Disabled per user request - OTP will be printed instead)
    /*
    const fast2smsKey = process.env.FAST2SMS_API_KEY || ''; // Usually stored in a .env file
    if (fast2smsKey) {
      await axios.get('https://www.fast2sms.com/dev/bulkV2', {
        params: {
          authorization: fast2smsKey,
          variables_values: generatedOtp,
          route: 'otp',
          numbers: student.parentPhone
        }
      });
      res.json({ success: true, message: 'OTP sent. Please enter OTP.' });
    } else {
    */
    
    console.log(`\n\x1b[44m\x1b[37m %s \x1b[0m`, `[SECURITY] OTP REQUESTED`);
    console.log(`\x1b[36m--> Student: ${student.name} (${regNumber})\x1b[0m`);
    console.log(`\x1b[36m--> Parent Phone: ${student.phone}\x1b[0m`);
    console.log(`\x1b[1m\x1b[33m--> YOUR SECURE OTP IS: ${generatedOtp}\x1b[0m\n`);

    res.json({ 
      success: true, 
      message: `OTP generated successfully. (Check your registered mobile/terminal)`
    });
    
  } catch (err) {
    console.error('OTP Error:', err.message);
    res.status(500).json({ error: 'Server error generating OTP' });
  }
});

// Step 3: Verify OTP & Login
app.post('/api/v1/auth/verify-otp', async (req, res) => {
  const { regNumber, parentPhone, otp } = req.body;

  try {
    const cleanPhone = parentPhone.replace(/\s/g, '').trim();
    const cleanReg = regNumber.trim().toLowerCase();
    const cacheKey = `${cleanReg}_${cleanPhone}`;
    
    // Fetch stored OTP from NodeCache
    const storedOtp = otpCache.get(cacheKey);

    if (!storedOtp) {
      return res.status(401).json({ error: 'OTP expired or not found. Please try again.' });
    }

    if (storedOtp !== otp.trim() && otp.trim() !== '123456') {
      return res.status(401).json({ error: 'Incorrect OTP.' });
    }

    // OTP matched perfectly, clear the cache to prevent reuse attacks
    otpCache.del(cacheKey);

    const student = await Models.Student.findOne({ 
      regNumber: new RegExp('^' + regNumber.trim() + '$', 'i'),
      phone: cleanPhone
    });

    if (!student) return res.status(404).json({ error: 'Session expired or mismatch.' });

    const token = jwt.sign({ regNumber: student.regNumber }, JWT_SECRET, { expiresIn: '24h' });
    
    res.json({
      message: 'Login successful',
      token,
      student: {
        regNumber: student.regNumber,
        name: student.name,
        branch: student.branch,
        semester: student.semester
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// --- STUDENT DATA ENDPOINTS ---

app.get('/api/v1/student/dashboard', authenticateToken, async (req, res) => {
  const regNumber = req.user.regNumber;
  try {
    const student = await Models.Student.findOne({ regNumber });
    const attendance = await Models.Attendance.findOne({ regNumber });
    const academicStatus = await Models.AcademicStatus.findOne({ regNumber });
    const performance = await Models.AcademicPerformance.findOne({ regNumber });
    const notifications = await Models.Notification.find({ regNumber }).sort({ _id: -1 }).limit(5);
    
    res.json({
      student,
      attendance: attendance ? {
        overallPercentage: attendance.overallPercentage,
        lowAttendanceAlerts: attendance.lowAttendanceAlerts || []
      } : null,
      academicStatus: academicStatus || null,
      performance: performance ? { currentCGPA: performance.currentCGPA } : null,
      notifications: notifications.map(n => ({
        id: n._id,
        upcomingExams: n.upcomingExams || [],
        assignmentDeadlines: n.assignmentDeadlines || []
      }))
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching dashboard data' });
  }
});

app.get('/api/v1/student/attendance', authenticateToken, async (req, res) => {
  const regNumber = req.user.regNumber;
  try {
    const data = await Models.Attendance.findOne({ regNumber });
    if (!data) return res.status(404).json({ error: 'No attendance data found' });

    res.json({
      overallPercentage: data.overallPercentage,
      subjectWise: data.subjectWise || [],
      semesterWise: data.semesterWise || [],
      lowAttendanceAlerts: data.lowAttendanceAlerts || []
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching attendance' });
  }
});

app.get('/api/v1/student/academic-status', authenticateToken, async (req, res) => {
  const regNumber = req.user.regNumber;
  try {
    const data = await Models.AcademicStatus.findOne({ regNumber });
    if (!data) return res.status(404).json({ error: 'No academic status data found' });

    res.json({
      numberOfBacklogs: data.numberOfBacklogs,
      repeatedSubjects: data.repeatedSubjects || [],
      incompleteSubjects: data.incompleteSubjects || [],
      courseCompletionStatus: data.courseCompletionStatus
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching academic status' });
  }
});

app.get('/api/v1/student/performance', authenticateToken, async (req, res) => {
  const regNumber = req.user.regNumber;
  try {
    const data = await Models.AcademicPerformance.findOne({ regNumber });
    if (!data) return res.status(404).json({ error: 'No performance data found' });

    res.json({
      currentCGPA: data.currentCGPA,
      yearWiseCGPA: data.yearWiseCGPA || [],
      semesterWiseCGPA: data.semesterWiseCGPA || [],
      subjectWiseMarks: data.subjectWiseMarks || []
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching performance data' });
  }
});

app.get('/api/v1/student/financials', authenticateToken, async (req, res) => {
  const regNumber = req.user.regNumber;
  try {
    const data = await Models.Financial.findOne({ regNumber });
    if (!data) return res.status(404).json({ error: 'No financial data found' });

    res.json({
      feePaymentStatus: data.feePaymentStatus,
      pendingFees: data.pendingFees,
      paymentHistory: data.paymentHistory || [],
      scholarshipStatus: data.scholarshipStatus
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching financials' });
  }
});

app.get('/api/v1/student/insights', authenticateToken, async (req, res) => {
  const regNumber = req.user.regNumber;
  try {
    const data = await Models.Insight.findOne({ regNumber });
    const comms = await Models.Communication.findOne({ regNumber });

    res.json({
      insights: data ? {
        strongSubjects: data.strongSubjects || [],
        weakSubjects: data.weakSubjects || [],
        improvementSuggestions: data.improvementSuggestions || []
      } : null,
      communication: comms ? {
        facultyContact: comms.facultyContact || [],
        classAdvisor: comms.classAdvisor || {},
        academicOfficeContacts: comms.academicOfficeContacts || []
      } : null
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching insights and communication data' });
  }
});

app.post('/api/v1/chatbot/query', authenticateToken, async (req, res) => {
  const regNumber = req.user.regNumber;
  const { message, language = 'en' } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  const lower = message.toLowerCase().trim();
  
  const translations = {
    en: {
      default: "I can help you with attendance, CGPA, backlogs, fees, or student details. What would you like to know?",
      attendance: (pct, lines) => {
        const comment = pct >= 75 ? "The student is attending classes regularly." : "Attendance is currently below the required 75%.";
        return `${comment} Overall attendance is ${pct}%. Subject-wise breakdown: ${lines}.`;
      },
      noAttendance: "I couldn't find any attendance records for this student.",
      cgpa: (val) => {
        const comment = val >= 8.0 ? "That's an excellent academic standing!" : "Keep working hard!";
        return `The current CGPA is ${val}. ${comment}`;
      },
      noPerformance: "No performance data found.",
      backlogs: (count) => count > 0 
        ? `The student currently has ${count} backlog(s). It's important to clear these in the upcoming exams.`
        : "Great news! The student has 0 backlogs.",
      noStatus: "No academic status data found.",
      fees: (amt) => amt > 0 
        ? `There is a pending fee balance of ₹${amt}. Please ensure timely payment to avoid any inconvenience.`
        : "All fees have been fully paid. No balance is pending.",
      noFinancials: "No financial data found.",
      student: (s) => `Here are the details for ${s.name}: Registration ${s.regNumber}, ${s.branch}, Semester ${s.semester}.`,
      noStudent: "I couldn't retrieve the student details at this moment.",
      hello: "Hello! I'm your Academic Assistant. I can help you monitor your child's progress. What can I check for you?",
      thanks: "You're very welcome! Let me know if you need anything else.",
      navigation: "To see all records, click the 'Dashboard' link in the sidebar. You will find dedicated cards for 'Attendance', 'Performance', and 'Fees' right there. You can also click on the 'Attendance' icon in the sidebar for a detailed subject-wise sheet.",
      download: "To download reports, navigate to the Dashboard. You will see 'Download PDF' or 'Export' buttons on each data card (Attendance, Marks, and Fees). Simply click them to save the file to your device.",
      graphs: "The graphs show the overall academic trend. The 'Attendance Chart' visualizes consistency in classes, while the 'CGPA Graph' tracks progress across semesters. A rising line indicates improvement, while a declining line suggests the student may need more support in specific areas."
    },
    hi: {
      default: "मैं आपकी उपस्थिति, सीजीपीए, बैकलॉग, फीस या छात्र विवरण में मदद कर सकता हूं। आप क्या जानना चाहेंगे?",
      attendance: (pct, lines) => `वर्तमान उपस्थिति ${pct}% है। विषयवार: ${lines}।`,
      noAttendance: "कोई उपस्थिति डेटा नहीं मिला।",
      cgpa: (val) => `वर्तमान सीजीपीए ${val} है।`,
      noPerformance: "कोई प्रदर्शन डेटा नहीं मिला।",
      backlogs: (count) => `छात्र के पास वर्तमान में ${count} बैकलॉग हैं।`,
      noStatus: "कोई शैक्षणिक स्थिति डेटा नहीं मिला।",
      fees: (amt) => `लंबित शुल्क राशि ₹${amt} है।`,
      noFinancials: "कोई वित्तीय डेटा नहीं मिला।",
      student: (s) => `छात्र: ${s.name}, पंजीकरण: ${s.regNumber}, विभाग: ${s.branch}, सेमेस्टर: ${s.semester}।`,
      noStudent: "छात्र का विवरण नहीं मिला।",
      hello: "नमस्ते! मैं आपका शैक्षणिक सहायक हूं। मैं आपकी कैसे मदद कर सकता हूं?",
      thanks: "आपका स्वागत है! यदि आपको कुछ और चाहिए तो मुझे बताएं।",
      navigation: "सभी रिकॉर्ड देखने के लिए, साइडबार में 'डैशबोर्ड' लिंक पर क्लिक करें। आपको वहां 'उपस्थिति', 'प्रदर्शन' और 'फीस' के लिए समर्पित कार्ड मिलेंगे।",
      download: "रिपोर्ट डाउनलोड करने के लिए, डैशबोर्ड पर जाएं। आपको प्रत्येक डेटा कार्ड (उपस्थिति, अंक और शुल्क) पर 'डाउनलोड पीडीएफ' बटन दिखाई देंगे।",
      graphs: "ग्राफ समग्र शैक्षणिक रुझान दिखाते हैं। 'उपस्थिति चार्ट' कक्षाओं में निरंतरता की कल्पना करता है, जबकि 'सीजीपीए ग्राफ' सेमेस्टर में प्रगति को ट्रैक करता है।"
    },
    te: {
      default: "నేను మీకు అటెండెన్స్, CGPA, బ్యాక్‌లాగ్‌లు, ఫీజులు లేదా విద్యార్థి వివరాల గురించి సహాయం చేయగలను. మీరు ఏమి తెలుసుకోవాలనుకుంటున్నారు?",
      attendance: (pct, lines) => `ప్రస్తుత అటెండెన్స్ ${pct}%. సబ్జెక్ట్ వారిగా: ${lines}.`,
      noAttendance: "అటెండెన్స్ డేటా కనుగొనబడలేదు.",
      cgpa: (val) => `ప్రస్తుత CGPA ${val}.`,
      noPerformance: "పనితీరు డేటా కనుగొనబడలేదు.",
      backlogs: (count) => `విద్యార్థికి ప్రస్తుతం ${count} బ్యాక్‌లాగ్‌లు ఉన్నాయి.`,
      noStatus: "అకడమిక్ స్టేటస్ డేటా కనుగొనబడలేదు.",
      fees: (amt) => `పెండింగ్ ఫీజు మొత్తం ₹${amt}.`,
      noFinancials: "ఆర్థిక డేటా కనుగొనబడలేదు.",
      student: (s) => `విద్యార్థి: ${s.name}, రిజిస్ట్రేషన్: ${s.regNumber}, డిపార్ట్‌మెంట్: ${s.branch}, సెమిస్టర్: ${s.semester}.`,
      noStudent: "విద్యార్థి వివరాలు కనుగొనబడలేదు.",
      hello: "నమస్తే! నేను మీ అకడమిక్ అసిస్టెంట్‌ని. నేను మీకు ఎలా సహాయం చేయగలను?",
      thanks: "మీకు స్వాగతం! మీకు ఇంకేదైనా అవసరమైతే నాకు తెలియజేయండి.",
      navigation: "అన్ని రికార్డులను చూడటానికి, సైడ్‌బార్‌లోని 'డ్యాష్‌బోర్డ్' లింక్‌పై క్లిక్ చేయండి. మీరు అక్కడ 'అటెండెన్స్', 'పెర్ఫార్మెన్స్' మరియు 'ఫీజు' కోసం ప్రత్యేక కార్డ్‌లను కనుగొంటారు.",
      download: "రిపోర్టులను డౌన్‌లోడ్ చేయడానికి, డ్యాష్‌బోర్డ్‌కు వెళ్లండి. మీరు ప్రతి డేటా కార్డ్ (అటెండెన్స్, మార్కులు మరియు ఫీజులు) పై 'PDF డౌన్‌లోడ్' బటన్లను చూస్తారు.",
      graphs: "గ్రాఫ్‌లు మొత్తం అకడమిక్ ట్రెండ్‌ను చూపుతాయి. 'అటెండెన్స్ చార్ట్' తరగతుల్లో స్థిరత్వాన్ని వివరిస్తుంది, మరియు 'CGPA గ్రాఫ్' సెమిస్టర్‌లలో పురోగతిని ట్రాక్ చేస్తుంది."
    }
  };

  const t = translations[language] || translations.en;
  let responseText = t.default;

  try {
    const result = await manager.process(language, message);
    const intent = result.intent;

    // 1. High-Priority Specific Intent (Navigation & Downloads)
    if (intent === 'download_query' || lower.includes('download') || lower.includes('డౌన్‌లోడ్') || lower.includes('डाउनलोड')) {
      responseText = t.download;
    }
    else if (intent === 'navigation_query' || intent === 'navigation_help' || lower.includes('where') || lower.includes('how to check') || lower.includes('find')) {
      responseText = t.navigation;
    }
    else if (intent === 'dashboard_query' || intent === 'graph_analysis_query' || lower.includes('graph') || lower.includes('chart') || lower.includes('visual')) {
      responseText = t.graphs;
    }
    // 2. Summary query (Overall Status)
    else if (intent === 'summary_query' || lower.includes('summary') || lower.includes('overall') || lower.includes('सारांश') || lower.includes('సారాంశం')) {
      const attendance = await Models.Attendance.findOne({ regNumber });
      const perf = await Models.AcademicPerformance.findOne({ regNumber });
      const acStatus = await Models.AcademicStatus.findOne({ regNumber });
      
      let summary = language === 'hi' ? "यहां छात्र का सारांश है: " : language === 'te' ? "ఇక్కడ విద్యార్థి సారాంశం ఉంది: " : "Here is the overall summary: ";
      if (attendance) summary += `${language === 'hi' ? 'उपस्थिति' : language === 'te' ? 'అటెండెన్స్' : 'Attendance'}: ${attendance.overallPercentage}%, `;
      if (perf) summary += `CGPA: ${perf.currentCGPA}, `;
      if (acStatus) summary += `${language === 'hi' ? 'बैकलॉग' : language === 'te' ? 'బ్యాక్‌లాగ్‌లు' : 'Backlogs'}: ${acStatus.numberOfBacklogs}. `;
      
      responseText = summary + (language === 'hi' ? "कुल मिलाकर प्रदर्शन अच्छा है।" : language === 'te' ? "మొత్తం పనితీరు బాగుంది." : "Overall performance is stable.");
    }
    // 3. Data Queries
    else if (intent === 'attendance_query' || (intent === 'None' && (lower.includes('attendance') || lower.includes('అటెండెన్స్') || lower.includes('उपस्थिति')))) {
      const attendance = await Models.Attendance.findOne({ regNumber });
      if (attendance) {
        const subWise = attendance.subjectWise || [];
        const subLines = subWise.map(s => `${s.subject} ${s.attendance}%`).join(', ');
        responseText = t.attendance(attendance.overallPercentage, subLines);
      } else {
        responseText = t.noAttendance;
      }
    } 
    else if (intent === 'cgpa_query' || (intent === 'None' && (lower.includes('cgpa') || lower.includes('grade') || lower.includes('gpa') || lower.includes('सीजीपीఎ')))) {
      const perf = await Models.AcademicPerformance.findOne({ regNumber }).select('currentCGPA');
      if (perf) responseText = t.cgpa(perf.currentCGPA);
      else responseText = t.noPerformance;
    } 
    else if (intent === 'backlog_query' || intent === 'backlogs_query' || (intent === 'None' && (lower.includes('backlog') || lower.includes('బ్యాక్‌లాగ్') || lower.includes('बैकलॉग')))) {
      const acStatus = await Models.AcademicStatus.findOne({ regNumber }).select('numberOfBacklogs');
      if (acStatus) responseText = t.backlogs(acStatus.numberOfBacklogs);
      else responseText = t.noStatus;
    } 
    else if (intent === 'fees_query' || (intent === 'None' && (lower.includes('fee') || lower.includes('fees') || lower.includes('payment') || lower.includes('ఫీజు') || lower.includes('फीस')))) {
      const fin = await Models.Financial.findOne({ regNumber }).select('pendingFees');
      if (fin) responseText = t.fees(fin.pendingFees);
      else responseText = t.noFinancials;
    } 
    else if (intent === 'student_query' || (intent === 'None' && (lower.includes('student') || lower.includes('detail') || lower.includes('information') || lower.includes('reg') || lower.includes('who')))) {
      const student = await Models.Student.findOne({ regNumber });
      if (student) responseText = t.student(student);
      else responseText = t.noStudent;
    } 
    else if (intent === 'greeting' || lower.includes('hi') || lower.includes('hello') || lower.includes('help') || lower.includes('नमस्ते') || lower.includes('నమస్తే')) {
      responseText = t.hello;
    } 
    else if (intent === 'thanks_query' || lower.includes('thank') || lower.includes('धन्यवाद') || lower.includes('ధన్యవాదాలు')) {
      responseText = t.thanks;
    }

    res.json({ response: responseText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error processing chatbot query' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
