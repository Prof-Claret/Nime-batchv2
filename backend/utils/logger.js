import morgan from "morgan";

// export a morgan middleware and a simple console logger
export const requestLogger = morgan('combined');

export function errorLogger(err) {
  console.error('[ERROR]', err);
}
