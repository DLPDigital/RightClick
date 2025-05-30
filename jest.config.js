// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom"],

  moduleNameMapper: {
    // IMPORTANT CHANGE HERE:
    // This rule was too broad and was catching your Vanilla Extract '.css.ts'
    // files (imported as '.css').
    // We remove '.css' from this rule.
    // If you use CSS Modules (e.g., styles.module.css), you can add a specific rule for them:
    // "\\.module\\.css$": "identity-obj-proxy",
    // If you have other static CSS files (SASS/LESS), keep those:
    "\\.(less|scss|sass)$": "identity-obj-proxy",

    // If you have actual static image/font assets imported in components,
    // you might need to mock them as well:
    // "\\.(jpg|jpeg|png|gif|webp|svg|eot|otf|ttf|woff|woff2)$": "<rootDir>/__mocks__/fileMock.js",
    // (You would need to create a simple __mocks__/fileMock.js, e.g., module.exports = 'test-file-stub';)

    // Add your path aliases here if you have them in tsconfig.json
    // Example from your previous file structure:
    // "^@/components/(.*)$": "<rootDir>/app/components/$1", // Adjust as needed
  },

  transform: {
    // This rule correctly tells Jest to use @vanilla-extract/jest-transform
    // for any file that actually ends with .css.ts.
    "\\.css\\.ts$": "@vanilla-extract/jest-transform",

    // This rule processes your other TypeScript and TSX files.
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: {
          // This ensures JSX is transformed correctly, especially since
          // your tsconfig.json has "jsx": "preserve".
          jsx: "react-jsx",
        },
      },
    ],
  },

  // Optional: If you encounter issues with ES Modules in node_modules
  // (e.g., from @vanilla-extract packages themselves if they ship ESM),
  // you might need to un-ignore them for transformation.
  // transformIgnorePatterns: [
  //   "/node_modules/(?!(@vanilla-extract)/)", // Allow transforming @vanilla-extract packages
  // ],
};