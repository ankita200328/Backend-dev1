const levels = {
  debug: 0,
  info: 1,
  error: 2,
};

const currentLevel = process.env.LOG_LEVEL || "info";

export const logger = (level, message) => {
  if (levels[level] >= levels[currentLevel]) {
    console.log(`[${level.toUpperCase()}]: ${message}`);
  }
};