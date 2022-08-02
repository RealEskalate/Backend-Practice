import { profileDestructure } from '../../helpers/profileHelpers';

describe('profile Helpers test', () => {
    describe('profile Destructure function test', () => {
        it('should return the same object', async () => {
            var body = {
                username: "username",
                fullname: "user name",
                bio: "bio about user",
                phone: "+251923456789",
            }
            var returned = profileDestructure(body);
            expect(returned).toBeDefined();
            expect(returned).toEqual(body);
        });

        it('should return an object that has only the nescessary parts, and matches with the body', async () => {
            var body = {
                username: "username",
                fullname: "user name",
                bio: "bio about user",
                phone: "+251923456789",
                useless: "hello",
                useless2: "hello2",
                useless3: 'hello3'
            }
            const nescessary = {
                username: body.username,
                fullname: body.fullname,
                bio: body.bio,
                phone: body.phone
            }
            var returned = profileDestructure(body);
            expect(returned).toBeDefined();
            expect(returned).toEqual(nescessary);
        });
    })
})