import ingredientsReducer from './ingredients-state-manager';

describe('ingredients async flow (extraReducers)', () => {
  it('sets isLoading true on pending', () => {
    const action = { type: 'ingredientsState/fetchAll/pending' };
    const state = ingredientsReducer(undefined, action as any);
    expect(state.isLoading).toBe(true);
    expect(state.hasError).toBe(false);
  });

  it('writes ingredients on fulfilled and sets isLoading false', () => {
    const mock = [{ _id: 'i1', name: 'X' } as any];
    const action = { type: 'ingredientsState/fetchAll/fulfilled', payload: mock };
    const state = ingredientsReducer(undefined, action as any);
    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(mock);
  });

  it('sets hasError true and isLoading false on rejected', () => {
    const action = { type: 'ingredientsState/fetchAll/rejected' };
    const state = ingredientsReducer(undefined, action as any);
    expect(state.isLoading).toBe(false);
    expect(state.hasError).toBe(true);
  });
});
