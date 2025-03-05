const ENV = process.env.APP_ENV || process.env.NODE_ENV;

const config = {
  development: {
    API_CORE_URL: process.env.API_CORE_URL || "https://api-dev.core.nothingproject.io" || "http:///localhost:8080",
    PUBLIC_MAIN_URL: process.env.PUBLIC_MAIN_URL || "https://dev.nothingproject.io" || "http://localhost:3000",
  },
  staging: {
    API_CORE_URL: process.env.API_CORE_URL || "https://api-stage.core.nothingproject.io",
    PUBLIC_MAIN_URL: process.env.PUBLIC_MAIN_URL || "https://stage.nothingproject.io",

  },
  production: {
    API_CORE_URL: process.env.API_CORE_URL || "https://api.core.nothingproject.io",
    PUBLIC_MAIN_URL: process.env.PUBLIC_MAIN_URL || "https://nothingproject.io",

  },
};

export default config[ENV] || config.production;
