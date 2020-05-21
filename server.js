// import mongoose from 'mongoose';

// import app from './index';
// // import { clearCollection, initCollection } from './services/collectionService';

// const db = mongoose.connection;

// db.on('error', console.error);

// db.once('open', async () => {
//   console.log('Connected to mongod server');
//   // await clearCollection();
//   // await initCollection();
// });

// mongoose.connect(process.env.MONGODB_URL,
//   {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   }
// ).catch(err => console.error(err));

// app.listen(process.env.PORT, () => {
//   console.log(`Listening on port ${process.env.PORT}`);
// });
