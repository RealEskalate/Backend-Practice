/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js", "json"],
  roots: ["<rootDir>/src"],
  testMatch: ["**/*__test__/**/*.[ts]s?(x)", "**/?(*.)+(spec|test).[ts]s?(x)"],
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
  },
};
