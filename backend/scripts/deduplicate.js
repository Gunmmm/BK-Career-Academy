const mongoose = require('mongoose');
const uri = 'mongodb://bkgroupofeducation_db_user:bkcareeracademy123@ac-yfliemj-shard-00-00.mlevefo.mongodb.net:27017,ac-yfliemj-shard-00-01.mlevefo.mongodb.net:27017,ac-yfliemj-shard-00-02.mlevefo.mongodb.net:27017/integrated_portal_db?ssl=true&replicaSet=atlas-9zf25h-shard-0&authSource=admin&retryWrites=true&w=majority';

async function deduplicate() {
  try {
    console.log('Connecting to Atlas...');
    await mongoose.connect(uri);
    console.log('Connected.');
    
    const collection = mongoose.connection.db.collection('portal_web_content');
    const items = await collection.find({}).sort({ createdAt: -1 }).toArray();
    
    console.log(`Found ${items.length} total items.`);
    
    const seen = new Set();
    const toDelete = [];
    
    for (const item of items) {
      // Create a unique key for grouping
      const section = item.section || 'unknown';
      const category = (item.category || '').trim();
      const subCategory = (item.subCategory || '').trim();
      
      const key = `${section}|${category}|${subCategory}`;
      
      if (seen.has(key)) {
        toDelete.push(item._id);
      } else {
        seen.add(key);
      }
    }
    
    if (toDelete.length > 0) {
      console.log(`Identified ${toDelete.length} duplicates to remove.`);
      const res = await collection.deleteMany({ _id: { $in: toDelete } });
      console.log(`Successfully deleted ${res.deletedCount} items.`);
    } else {
      console.log('No duplicates found. Database is already clean.');
    }
    
    process.exit(0);
  } catch (err) {
    console.error('ERROR:', err);
    process.exit(1);
  }
}

deduplicate();
