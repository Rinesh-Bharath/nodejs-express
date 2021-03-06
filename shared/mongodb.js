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

export async function create_a_collection (logging_key, collection_name = '', options = { }) {
  try {
    if (!connection) {
      await get_mongodb_resource();
    }
    console.log(`${logging_key} - create_collection initializing`);
    console.log(`${logging_key} - create_collection params - ${JSON.stringify({ collection_name, options })}`);
    const collection = await connection.db.createCollection(collection_name, options);
    console.log(`${logging_key} - create_collection query succeeded`);
    return collection;
  } catch (err) {
    console.log(`Query error with MongoDB: ${err.message}`);
    throw new Error(err.message);
  }
};

export async function create_indexes (logging_key, COLLECTION_INDEXES = []) {
  try {
    if (!connection) {
      await get_mongodb_resource();
    }
    console.log(`${logging_key} - create_indexes initializing`);
    for (const COLLECTION_INDEX of COLLECTION_INDEXES) {
      console.log(`${logging_key} - create_indexes params - ${JSON.stringify(COLLECTION_INDEX)}`);
      const collection = await connection.db.collection(COLLECTION_INDEX.name);
      await collection.createIndexes(COLLECTION_INDEX.index);
    }
    console.log(`${logging_key} - create_indexes query succeeded`);
    return;
  } catch (err) {
    console.log(`Query error with MongoDB: ${err.message}`);
    throw new Error(err.message);
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
    const result = await collection.findOne(filter, project);
    console.log(`${logging_key} - fetch_one_from_db query succeeded`);
    return result;
  } catch (err) {
    console.log(`Query error with MongoDB: ${err.message}`);
    throw new Error(err.message);
  }
};

export async function insert_into_db (logging_key, collection_name = '', data = {}) {
  try {
    if (!connection) {
      await get_mongodb_resource();
    }
    console.log(`${logging_key} - insert_into_db initializing ...`);
    console.log(`${logging_key} - insert_into_db params -  ${JSON.stringify({ collection_name, data })}`);
    const collection = await connection.db.collection(collection_name);
    const result = await collection.insertOne(data);
    console.log(logging_key + ' = insert_into_db query succeeded!');
    return result && result.ops[0];
  } catch (err) {
    console.log(`Query error with MongoDB: ${err.message}`);
    throw new Error(err.message);
  }
};

export async function remove_one_from_db (logging_key, collection_name = '', filter = {}) {
  try {
    if (!connection) {
      await get_mongodb_resource();
    }
    console.log(`${logging_key} - remove_one_from_db initializing ...`);
    console.log(`${logging_key} - remove_one_from_db params -  ${JSON.stringify({ collection_name, filter })}`);
    const collection = await connection.db.collection(collection_name);
    const result = await collection.deleteOne(filter);
    console.log(`${logging_key} - remove_one_from_db query succeeded!`);
    return result;
  } catch (err) {
    console.log(`Query error with MongoDB: ${err.message}`);
    throw new Error(err.message);
  }
};

export async function update_into_db (logging_key, collection_name = '', filter = {}, update = {}, options = { returnOriginal: false }) {
  try {
    if (!connection) {
      await get_mongodb_resource();
    }
    console.log(`${logging_key} - update_into_db initializing ...`);
    console.log(`${logging_key} - update_into_db params - ${JSON.stringify({ collection_name, filter, update, options })}`);
    const collection = await connection.db.collection(collection_name);
    const result = await collection.findOneAndUpdate(filter, update, options);
    console.log(`${logging_key} - update_into_db query succeeded!`);
    return result;
  } catch (err) {
    console.log(`Query error with MongoDB: ${err.message}`);
    throw new Error(err.message);
  }
};

export async function fetch_from_db (logging_key, collection_name = '', filter = {}, project = {}, options = { limit: 0, skip: 0 }) {
  try {
    if (!connection) {
      await get_mongodb_resource();
    }
    console.log(`${logging_key} - fetch_from_db initializing ...`);
    console.log(`${logging_key} - fetch_from_db params - ${JSON.stringify({ collection_name, filter, project, options })}`);
    const collection = await connection.db.collection(collection_name);
    const result = await collection
      .find(filter)
      .project(project)
      .limit(options.limit)
      .skip(options.skip)
      .toArray();
    console.log(`${logging_key} - fetch_from_db query succeeded`);
    return result;
  } catch (err) {
    console.log(`Query error with MongoDB: ${err.message}`);
    throw new Error(err.message);
  }
};

export async function aggregate_from_db (logging_key, collection_name = '', query = [], project = {}, options = { limit: 0, skip: 0 }) {
  try {
    if (!connection) {
      await get_mongodb_resource();
    }
    console.log(`${logging_key} - aggregate_from_db initializing ...`);
    console.log(`${logging_key} - aggregate_from_db params - ${JSON.stringify({ collection_name, query, project, options })}`);
    const collection = await connection.db.collection(collection_name);
    const result = await collection.aggregate(query).toArray();
    console.log(`${logging_key} - aggregate_from_db query succeeded`);
    return result;
  } catch (err) {
    console.log(`Query error with MongoDB: ${err.message}`);
    throw new Error(err.message);
  }
};

export async function insert_many_into_db (logging_key, collection_name = '', data = []) {
  try {
    if (!connection) {
      await get_mongodb_resource();
    }
    console.log(`${logging_key} - insert_many_into_db initializing ...`);
    console.log(`${logging_key} - insert_many_into_db params - ${JSON.stringify({ collection_name, data })}`);
    const collection = await connection.db.collection(collection_name);
    const result = await collection.insertMany(data);
    console.log(`${logging_key} - insert_many_into_db query succeeded!`);
    return result && result.ops;
  } catch (err) {
    console.log(`Query error with MongoDB: ${err.message}`);
    throw new Error(err.message);
  }
};

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
