export function set_environment (logging_key = 'nodejs-express', environment = 'development') {
  console.log(`${logging_key} setting environment variables for local run`);

  process.env.NODE_ENV = 'development';
  process.env.NODE_PORT = '3000';
  process.env.ENVIRONMENT = environment;
  process.env.DB_REGION = 'us-east-1';
  process.env.TABLE_USER = `user_${environment}`;
  process.env.MONGO_DB_URI = `mongodb+srv://rinesh:mCq6e48TcV6ngQd1@cluster0.4rm65.mongodb.net/${environment}?retryWrites=true`;
};
