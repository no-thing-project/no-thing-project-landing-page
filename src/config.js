const ENV = process.env.APP_ENV || process.env.NODE_ENV;

const config = {
  development: {
    API_URL: process.env.API_URL || "",
    PUBLIC_URL: process.env.PUBLIC_URL || "http://localhost:3000",
  },
  staging: {
    API_URL: process.env.API_URL || "",
    PUBLIC_URL: process.env.PUBLIC_URL || "https://no-thing-project.github.io/website.landing/",

  },
  production: {
    API_URL: process.env.API_URL || "",
    PUBLIC_URL: process.env.PUBLIC_URL || "https://nothingproject.io",

  },
};

export default config[ENV] || config.production;