import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'],
    testMatch:['**/*.test.ts'],
    verbose: true,// show a lot of data
    collectCoverage:true,
    collectCoverageFrom: ['src/**/*.ts'],
    coverageDirectory: 'coverage',
    coverageThreshold: {
        global: {
            functions: 85,
            statements: 75
        }
    }
}
export default config;


