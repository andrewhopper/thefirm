import { getArtifactSchema } from '../artifact_metadata';
import * as fs from 'fs';
import { jest } from '@jest/globals';

jest.mock('fs');
const mockFs = fs as jest.Mocked<typeof fs>;

describe('Artifact Metadata', () => {

    describe('getArtifactSchema', () => {
        test('should throw an error if the artifact name is not found', () => {
            expect(() => getArtifactSchema('NonExistentArtifact')).toThrow('No type information found for artifact: NonExistentArtifact');
        });

        test('should return the schema for a valid artifact', () => {
            const schema = getArtifactSchema('Task');
            expect(schema).toBeDefined();
        });

        test('should return the schema for a valid artifact', () => {
            const schema = getArtifactSchema('TaskList');
            console.log(schema);
            expect(schema).toContain('urgency');
            expect(schema).toBeDefined();
        });
    });
});