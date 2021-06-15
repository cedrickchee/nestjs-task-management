import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

describe('User entity', () => {
  let user: User;
  let spy;

  beforeEach(() => {
    user = new User();
    user.password = 'testPassword'; // actually a hashed password
    user.salt = 'testSalt';
    // bcrypt.hash = jest.fn();
    spy = jest.spyOn(bcrypt, 'hash');
  });

  describe('validatePassword', () => {
    it('returns true as password is valid', async () => {
      const password = '123456';
      // bcrypt.hash.mockReturnValue('testPassword');
      spy.mockImplementation(() => Promise.resolve('testPassword'));
      expect(bcrypt.hash).not.toHaveBeenCalled();
      const result = await user.validatePassword(password);
      expect(bcrypt.hash).toHaveBeenCalledWith(password, user.salt);
      expect(result).toEqual(true);
    });

    it('returns false as password is invalid', async () => {
      const password = 'abc12345';
      spy.mockImplementation(() => Promise.resolve('wrongPassword'));
      // expect(bcrypt.hash).not.toHaveBeenCalled();
      const result = await user.validatePassword(password);
      expect(bcrypt.hash).toHaveBeenCalledWith(password, user.salt);
      expect(result).toEqual(false);
    });
  });
});
