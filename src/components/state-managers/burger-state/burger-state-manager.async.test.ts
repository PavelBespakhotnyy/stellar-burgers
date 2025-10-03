import burgerReducer from './burger-state-manager';

describe('burger createOrder async flow (extraReducers)', () => {
  it('sets orderRequest true and isLoading true on pending', () => {
    const action = { type: 'burgerState/createOrder/pending' };
    const state = burgerReducer(undefined, action as any);
    expect(state.orderRequest).toBe(true);
    expect(state.isLoading).toBe(true);
    expect(state.orderError).toBeNull();
  });

  it('sets orderModalData on fulfilled and clears constructor', () => {
    const mockOrder = { number: 123 } as any;
    const action = { type: 'burgerState/createOrder/fulfilled', payload: { order: mockOrder } };
    const state = burgerReducer(undefined, action as any);
    expect(state.orderRequest).toBe(false);
    expect(state.isLoading).toBe(false);
    expect(state.orderModalData).toEqual(mockOrder);
    expect(state.constructorItems.ingredients.length).toBe(0);
    expect(state.constructorItems.bun).toBeNull();
  });

  it('sets orderError and orderRequest false on rejected', () => {
    const action = { type: 'burgerState/createOrder/rejected', payload: 'err' };
    const state = burgerReducer(undefined, action as any);
    expect(state.orderRequest).toBe(false);
    expect(state.isLoading).toBe(false);
    expect(state.orderError).toBe('err');
  });
});
