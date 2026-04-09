const cron = require('node-cron');
const Models = require('./database');
const { sendEmailNotification } = require('./emailService');

/**
 * Task 1: Check for pending fees and send reminders
 */
async function checkPendingFees() {
  console.log('[CRON] Checking pending fees...');
  try {
    const financialRecords = await Models.Financial.find({ 
      pendingFees: { $gt: 0 },
      feePaymentStatus: { $ne: 'Paid' } 
    });

    for (const record of financialRecords) {
      const student = await Models.Student.findOne({ regNumber: record.regNumber });
      if (student && student.email) {
        const subject = 'Action Required: Pending Fee Notification';
        const text = `Dear Parent/Student,\n\nThis is a friendly reminder that you have a pending fee balance of ₹${record.pendingFees}. Please clear it at the earliest to avoid any late fees or administrative issues.\n\nRegards,\nAcademic Administration`;
        
        await sendEmailNotification(student.email, subject, text);
      }
    }
  } catch (error) {
    console.error('Error in checkPendingFees cron:', error);
  }
}

/**
 * Task 2: Check for upcoming exams and send reminders
 */
async function checkUpcomingExams() {
  console.log('[CRON] Checking upcoming exams...');
  try {
    const notifications = await Models.Notification.find({});

    for (const notification of notifications) {
      // For this demo, if there's any upcoming exam listed, we send a reminder.
      // In a real system, you'd compare dates.
      if (notification.upcomingExams && notification.upcomingExams.length > 0) {
        const student = await Models.Student.findOne({ regNumber: notification.regNumber });
        if (student && student.email) {
          const examDetails = notification.upcomingExams.join(', ');
          const subject = 'Reminder: Upcoming Academic Examinations';
          const text = `Dear Parent/Student,\n\nThis is to notify you regarding upcoming examinations: ${examDetails}. Please ensure thorough preparation. Good luck!\n\nRegards,\nAcademic Office`;
          
          await sendEmailNotification(student.email, subject, text);
        }
      }
    }
  } catch (error) {
    console.error('Error in checkUpcomingExams cron:', error);
  }
}

// Schedule tasks
// Runs every day at 9:00 AM
// Format: minute hour day-of-month month day-of-week
function initCronJobs() {
  // '0 9 * * *'
  // For testing, we can set it to run every hour: '0 * * * *'
  // Or even more frequent for immediate demonstration if triggered, 
  // but let's stick to a logical daily schedule.
  
  cron.schedule('0 9 * * *', () => {
    checkPendingFees();
    checkUpcomingExams();
  });

  console.log('Cron Jobs Initialized (Scheduled for 9:00 AM daily)');
}

module.exports = { initCronJobs };
