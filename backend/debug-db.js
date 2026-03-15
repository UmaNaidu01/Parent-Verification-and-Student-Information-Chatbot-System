const mongoose = require('mongoose');

async function debugDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/chatboat');
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log('\nCollections found:', collections.map(c => c.name));

    for (const col of collections) {
      const count = await db.collection(col.name).countDocuments();
      console.log(`\nCollection: ${col.name} (${count} documents)`);
      const sample = await db.collection(col.name).findOne();
      console.log('Sample document:', JSON.stringify(sample, null, 2));
    }

  } catch (err) {
    console.error('Debug Error:', err);
  } finally {
    await mongoose.connection.close();
  }
}

debugDB();
