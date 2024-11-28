import promptComposer from '../prompt_composer';
import { UserProfile } from '../../actors/user_profile';
import { getArtifactSchema } from '../../artifacts/artifact_metadata';
import ceo from '../../actors/team/ceo/profile';


describe('promptComposer', () => {
    let mockRequesterProfile: UserProfile;
    let mockActorProfile: UserProfile;

    beforeEach(() => {
        // Setup mock profiles
        mockRequesterProfile = ceo;

        mockActorProfile = ceo;
    });

    test('should include actor profile attributes correctly', () => {
        const result = promptComposer(
            'organize these tasks, brush teeth, make coffee, write code',
            'requester context',
            'TaskList',
            'TaskList',
            mockRequesterProfile,
            mockActorProfile,
            "JSON"
        );

        expect(result).toContain('CEO');
        expect(result).toContain('TaskList');
    });

    test('should compose a complete prompt with all required sections', () => {
        const result = promptComposer(
            'writing a function to calculate the sum of two numbers',
            'requester context',
            'Code',
            'Code',
            mockRequesterProfile,
            mockActorProfile,
            "JSON"
        );


        // Check if all required sections are present
        expect(result).toContain('<INFORMATION ABOUT THE REQUESTER>');
        expect(result).toContain('<AGENT PROFILE>');
        expect(result).toContain('<TASK>');
        expect(result).toContain('<TASK FRAMEWORK>');
        expect(result).toContain('<ERROR HANDLING>');
    });



}); 