const { MongoClient } = require('mongodb');

const uris = [
    "mongodb+srv://wildacademy4_db_user:wild2345@cluster0.nnip6sq.mongodb.net/?appName=Cluster0",
    "mongodb+srv://wildacademy4_db_user:wild2345@cluster0.nnip6sq.mongodb.net/school-management?appName=Cluster0",
    "mongodb://wildacademy4_db_user:wild2345@cluster0-shard-00-00.nnip6sq.mongodb.net:27017,cluster0-shard-00-01.nnip6sq.mongodb.net:27017,cluster0-shard-00-02.nnip6sq.mongodb.net:27017/school-management?ssl=true&replicaSet=atlas-xyz&authSource=admin"
];

async function test(uri) {
    try {
        console.log('Testing URI:', uri.replace(/:[^:@]+@/, ':****@'));
        console.log('Connecting...');
        const client = new MongoClient(uri);
        await client.connect();
        console.log('✅ Connected successfully!');
        
        const db = client.db('school-management');
        const collections = await db.listCollections().toArray();
        console.log('Collections:', collections.map(c => c.name));
        
        await client.close();
        console.log('✅ Connection closed successfully');
        return true;
    } catch (error) {
        console.error('❌ Connection failed:', error.message);
        console.error('Error code:', error.code);
        return false;
    }
}

async function testAll() {
    for (const uri of uris) {
        console.log('\n' + '='.repeat(50));
        const success = await test(uri);
        if (success) {
            console.log('\n✅ This URI works! Use it in your .env file');
            break;
        }
    }
}

testAll();
