import http from 'http';

import app from './app.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';

const server = http.createServer(app);

const start = async () => {
  try {
    await connectDB();

    server.listen(env.port, () => {
      console.log(
        `🚀 Server ready on port ${env.port} in ${env.nodeEnv} mode`.trim()
      );
    });
  } catch (error) {
    console.error('Server failed to start', error);
    process.exit(1);
  }
};

start();

const gracefulShutdown = (signal) => {
  process.on(signal, () => {
    console.log(`Received ${signal}, closing server...`);
    server.close(() => {
      console.log('HTTP server closed');
      process.exit(0);
    });
  });
};

['SIGINT', 'SIGTERM'].forEach(gracefulShutdown);

