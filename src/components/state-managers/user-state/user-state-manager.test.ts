import userReducer, { authChecked } from './user-state-manager';

describe('user state reducer', () => {
  it('should mark authChecked reducer', () => {
    let state = userReducer(undefined, { type: 'UNKNOWN' } as any);
    expect(state.isAuthChecked).toBe(false);
    state = userReducer(state, authChecked());
    expect(state.isAuthChecked).toBe(true);
  });

  it('should set loginUserRequest true on pending and set user on fulfilled', () => {
    const pending = { type: 'userState/loginUser/pending' } as any;
    let state = userReducer(undefined, pending);
    expect(state.loginUserRequest).toBe(true);

    const user = { name: 'A', email: 'a@a' } as any;
    const fulfilled = { type: 'userState/loginUser/fulfilled', payload: user } as any;
    state = userReducer(state, fulfilled);
    expect(state.loginUserRequest).toBe(false);
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(user);
  });

  it('should set loginUserError on rejected', () => {
    const rejected = { type: 'userState/loginUser/rejected', error: { message: 'fail' } } as any;
    const state = userReducer(undefined, rejected);
    expect(state.loginUserRequest).toBe(false);
    expect(state.loginUserError).toBe('fail');
    expect(state.isAuthChecked).toBe(true);
  });
});
