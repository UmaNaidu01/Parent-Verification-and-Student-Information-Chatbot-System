const { NlpManager } = require('node-nlp');
const fs = require('fs');

async function trainNLP() {
    const manager = new NlpManager({ languages: ['en', 'hi', 'te'], forceNER: true });

    // Load existing model if it exists to build upon it
    if (fs.existsSync('./model.nlp')) {
        await manager.load('./model.nlp');
        console.log('Existing model loaded for enhancement.');
    }

    // --- 1. attendance_query ---
    const attendanceQueries = [
        { lang: 'en', u: "Does my child attend classes regularly?" },
        { lang: 'en', u: "Is my son going to college daily?" },
        { lang: 'en', u: "Can you tell me the attendance status?" },
        { lang: 'en', u: "How is his presence in class?" },
        { lang: 'hi', u: "क्या मेरा बच्चा नियमित रूप से क्लास में जाता है?" },
        { lang: 'hi', u: "उपस्थिति की जांच करें" },
        { lang: 'te', u: "నా పిల్లవాడు రోజూ కాలేజీకి వెళ్తున్నాడా?" },
        { lang: 'te', u: "అటెండెన్స్ చెక్ చేయండి" }
    ];
    attendanceQueries.forEach(q => manager.addDocument(q.lang, q.u, 'attendance_query'));

    // --- 2. cgpa_query ---
    const cgpaQueries = [
        { lang: 'en', u: "What is my child's current CGPA?" },
        { lang: 'en', u: "how is his academic performance" },
        { lang: 'en', u: "tell me about his grades" },
        { lang: 'hi', u: "मेरे बच्चे का सीजीपीए कितना है?" },
        { lang: 'hi', u: "उसका अकादमिक प्रदर्शन कैसा है" },
        { lang: 'te', u: "నా పిల్లల CGPA ఎంత?" },
        { lang: 'te', u: "అతని అకడమిక్ పెర్ఫార్మెన్స్ ఎలా ఉంది" }
    ];
    cgpaQueries.forEach(q => manager.addDocument(q.lang, q.u, 'cgpa_query'));

    // --- 3. fees_query ---
    const feesQueries = [
        { lang: 'en', u: "What is the fee payment status?" },
        { lang: 'en', u: "is there any fee balance" },
        { lang: 'hi', u: "फीस की स्थिति क्या है?" },
        { lang: 'hi', u: "क्या कोई फीस बकाया है" },
        { lang: 'te', u: "ఫీజు స్థితి ఏమిటి?" },
        { lang: 'te', u: "ఫీజు బ్యాలెన్స్ ఉందా" }
    ];
    feesQueries.forEach(q => manager.addDocument(q.lang, q.u, 'fees_query'));

    // --- 4. backlog_query ---
    const backlogQueries = [
        { lang: 'en', u: "Does my child have any backlogs?" },
        { lang: 'en', u: "check for failed subjects" },
        { lang: 'hi', u: "क्या कोई बैकलॉग है?" },
        { lang: 'hi', u: "क्या वह सभी विषयों में पास है" },
        { lang: 'te', u: "ఏమైనా బ్యాక్లాగ్స్ ఉన్నాయా?" },
        { lang: 'te', u: "అన్ని సబ్జెక్టులు క్లియర్ అయ్యాయా" }
    ];
    backlogQueries.forEach(q => manager.addDocument(q.lang, q.u, 'backlog_query'));

    // --- 5. dashboard_query (Explain Graphs) ---
    const dashboardQueries = [
        { lang: 'en', u: "what is graphs are saying" },
        { lang: 'en', u: "explain the charts" },
        { lang: 'en', u: "what do the visual graphs show" },
        { lang: 'hi', u: "ग्राफ क्या कह रहे हैं" },
        { lang: 'hi', u: "चार्ट का विश्लेषण करें" },
        { lang: 'te', u: "గ్రాఫ్‌లు ఏమి చెబుతున్నాయి" },
        { lang: 'te', u: "చార్ట్‌లను వివరించండి" }
    ];
    dashboardQueries.forEach(q => manager.addDocument(q.lang, q.u, 'dashboard_query'));

    // --- 6. navigation_query (Where to find features) ---
    const navQueries = [
        { lang: 'en', u: "where is the dashboard" },
        { lang: 'en', u: "how to check attendance in dashboard" },
        { lang: 'en', u: "where can i find the performance report" },
        { lang: 'hi', u: "डैशबोर्ड कहां है" },
        { lang: 'hi', u: "अटेंडेंस शीट कहाँ मिलेगी" },
        { lang: 'te', u: "డ్యాష్‌బోర్డ్ ఎక్కడ ఉంది" },
        { lang: 'te', u: "అటెండెన్స్ షీట్ ఎక్కడ దొరుకుతుంది" }
    ];
    navQueries.forEach(q => manager.addDocument(q.lang, q.u, 'navigation_query'));

    // --- 7. summary_query (Overall Status) ---
    const summaryQueries = [
        { lang: 'en', u: "How is my child performing overall?" },
        { lang: 'en', u: "give me a summary of my child" },
        { lang: 'hi', u: "कुल मिलाकर मेरा बच्चा कैसा प्रदर्शन कर रहा है?" },
        { lang: 'hi', u: "सारांश दिखाओ" },
        { lang: 'te', u: "నా బిడ్డ పనితీరు ఎలా ఉంది?" },
        { lang: 'te', u: "మొత్తం సారాంశం చూపించు" }
    ];
    summaryQueries.forEach(q => manager.addDocument(q.lang, q.u, 'summary_query'));

    // Greeting & Thanks
    manager.addDocument('en', 'hi', 'greeting');
    manager.addDocument('en', 'hello', 'greeting');
    manager.addDocument('hi', 'नमस्ते', 'greeting');
    manager.addDocument('te', 'నమస్తే', 'greeting');
    manager.addDocument('en', 'thank you', 'thanks_query');
    manager.addDocument('en', 'thanks', 'thanks_query');
    manager.addDocument('hi', 'धन्यवाद', 'thanks_query');
    manager.addDocument('te', 'ధన్యవాదాలు', 'thanks_query');

    console.log('--- Standardized NLP Training Started ---');
    await manager.train();
    manager.save();
    console.log('--- Standardized NLP Model Saved (model.nlp) ---');
}

trainNLP();
