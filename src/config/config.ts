export default () => ({
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  port: parseInt(process.env.PORT),
});
