module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom"],

  moduleNameMapper: {
    "\\.(less|scss|sass)$": "identity-obj-proxy",
  },

  transform: {
    "\\.css\\.ts$": "@vanilla-extract/jest-transform",

    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react-jsx",
        },
      },
    ],
  },
}
