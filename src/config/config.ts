export default () => ({
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  port: parseInt(process.env.PORT),
  mailerUser: process.env.MAILER_USER,
  mailerPassword: process.env.MAILER_PASSWORD,
  geminiAiApiKey: process.env.GEMINI_AI_API_KEY,
});
