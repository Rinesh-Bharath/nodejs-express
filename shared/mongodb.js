import mongoose from 'mongoose';
mongoose.Promise = Promise;

let connection;

const get_mongodb_resource = async () => {
  try {
    console.log(`get_mongodb_resource started`);
    const options = { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true };
    await mongoose.connect(process.env.MONGO_DB_URI, options);
    mongoose.set('debug', true);
    console.info('get_mongodb_resource connected');
    connection = mongoose.connection;
    return mongoose.connection;
  } catch (err) {
    console.log(`Connection to MongoDB failed: ${err.message}`);
    throw Error(err);
  }
};

export async function fetch_one_from_db (logging_key, collection_name = '', filter = {}, project = {}, options = { limit: 0, skip: 0 }) {
  try {
    if (!connection) {
      await get_mongodb_resource();
    }
    console.log(`${logging_key} - fetch_one_from_db initializing`);
    console.log(`${logging_key} - fetch_one_from_db params - ${JSON.stringify({ collection_name, filter, project, options })}`);
    const collection = await connection.db.collection(collection_name);
    const result = await collection.findOne(filter);
    console.log(`${logging_key} - fetch_one_from_db query succeeded`);
    return result;
  } catch (err) {
    console.log(`Query error with MongoDB: ${err.message}`);
    throw new Error(err.message);
  }
};

// exports.fetch_from_db = async (logging_key, collection_name = '', filter = {}, project = {}, options = { limit: 0, skip: 0 }) => {
//   try {
//     if (!connection) {
//       await get_mongodb_resource();
//     }
//     console.log(logging_key + ' = fetch_from_db initializing ...');
//     console.log(logging_key + ' = fetch_from_db params = ' + JSON.stringify({ collection_name, filter, project, options }));
//     const collection = await connection.db.collection(collection_name);
//     const resultset_array = await collection
//       .find(filter)
//       .project(project)
//       .limit(options.limit)
//       .skip(options.skip)
//       .toArray();
//     console.log(logging_key + ' = fetch_from_db query succeeded');
//     return resultset_array;
//   } catch (error) {
//     throw Error('Query error with MongoDB');
//   }
// };

// exports.aggregate_from_db = async (logging_key, collection_name = '', query = [], project = {}, options = { limit: 0, skip: 0 }) => {
//   try {
//     if (!connection) {
//       await get_mongodb_resource();
//     }
//     console.log(logging_key + ' = aggregate_from_db initializing ...');
//     console.log(logging_key + ' = aggregate_from_db params = ' + JSON.stringify({ collection_name, query, project, options }));
//     const collection = await connection.db.collection(collection_name);
//     const resultset_array = await collection
//       .aggregate(query).toArray();
//     console.log(logging_key + ' = aggregate_from_db query succeeded');
//     return resultset_array;
//   } catch (error) {
//     throw Error('Query error with MongoDB');
//   }
// };

// exports.insert_into_db = async (logging_key, collection_name = '', data = {}) => {
//   try {
//     if (!connection) {
//       await get_mongodb_resource();
//     }
//     console.log(logging_key + ' = insert_into_db initializing ...');
//     console.log(logging_key + ' = insert_into_db params = ' + JSON.stringify({ collection_name, data }));
//     const collection = await connection.db.collection(collection_name);
//     const result = await collection.insertOne(data);
//     console.log(logging_key + ' = insert_into_db query succeeded!');
//     return result && result.ops[0];
//   } catch (error) {
//     throw Error('Query error with MongoDB');
//   }
// };

// exports.insert_many_into_db = async (logging_key, collection_name = '', data = []) => {
//   try {
//     if (!connection) {
//       await get_mongodb_resource();
//     }
//     console.log(logging_key + ' = insert_many_into_db initializing ...');
//     console.log(logging_key + ' = insert_many_into_db params = ' + JSON.stringify({ collection_name, data }));
//     const collection = await connection.db.collection(collection_name);
//     const result = await collection.insertMany(data);
//     console.log(logging_key + ' = insert_many_into_db query succeeded!');
//     return result && result.ops;
//   } catch (error) {
//     throw Error('Query error with MongoDB');
//   }
// };

// exports.update_into_db = async (logging_key, collection_name = '', filter = {}, update = {}, options = { returnOriginal: false }) => {
//   try {
//     if (!connection) {
//       await get_mongodb_resource();
//     }
//     console.log(logging_key + ' = update_into_db initializing ...');
//     console.log(logging_key + ' = update_into_db params = ' + JSON.stringify({ collection_name, filter, update, options }));
//     const collection = await connection.db.collection(collection_name);
//     const result = await collection.findOneAndUpdate(filter, update, options);
//     console.log(logging_key + ' = update_into_db query succeeded!');
//     return result;
//   } catch (error) {
//     throw Error('Query error with MongoDB');
//   }
// };

// exports.update_many_into_db = async (logging_key, collection_name = '', filter = {}, update = {}, options = { multi: true, returnOriginal: false }) => {
//   try {
//     if (!connection) {
//       await get_mongodb_resource();
//     }
//     console.log(logging_key + ' = update_into_db initializing ...');
//     console.log(logging_key + ' = update_into_db params = ' + JSON.stringify({ collection_name, filter, update, options }));
//     const collection = await connection.db.collection(collection_name);
//     const result = await collection.updateMany(filter, update, options);
//     console.log(logging_key + ' = update_into_db query succeeded!');
//     return result;
//   } catch (error) {
//     throw Error('Query error with MongoDB');
//   }
// };

// exports.delete_many_from_db = async (logging_key, collection_name = '', filter = {}, options = { multi: true, returnOriginal: false }) => {
//   try {
//     if (!connection) {
//       await get_mongodb_resource();
//     }
//     console.log(logging_key + ' = delete_many_from_db initializing ...');
//     console.log(logging_key + ' = delete_many_from_db params = ' + JSON.stringify({ collection_name, filter, options }));
//     const collection = await connection.db.collection(collection_name);
//     const result = await collection.deleteMany(filter, options);
//     console.log(logging_key + ' = delete_many_from_db query succeeded!');
//     return result;
//   } catch (error) {
//     throw Error('Query error with MongoDB');
//   }
// };

// exports.remove_from_db = async (logging_key, collection_name = '', filter = {}) => {
//   try {
//     if (!connection) {
//       await get_mongodb_resource();
//     }
//     console.log(logging_key + ' = remove_from_db initializing ...');
//     console.log(logging_key + ' = remove_from_db params = ' + JSON.stringify({ collection_name, filter }));
//     const collection = await connection.db.collection(collection_name);
//     const result = await collection.deleteMany(filter);
//     console.log(logging_key + ' = remove_from_db query succeeded!');
//     return result;
//   } catch (error) {
//     throw Error('Query error with MongoDB');
//   }
// };
