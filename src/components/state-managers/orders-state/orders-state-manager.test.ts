import ordersReducer, { setUserOrders } from './orders-state-manager';

describe('orders state reducer', () => {
  it('should set user orders with setUserOrders', () => {
    const mock = [{ _id: 'o1', number: 1 } as any];
    const state = ordersReducer(undefined, setUserOrders(mock));
    expect(state.orders).toEqual(mock);
  });

  it('should set isLoading on pending and write payload on fulfilled', () => {
    const pending = { type: 'ordersState/fetchUserOrderHistory/pending' } as any;
    let state = ordersReducer(undefined, pending);
    expect(state.isLoading).toBe(true);

    const mock = [{ _id: 'o1', number: 1 } as any];
    const fulfilled = { type: 'ordersState/fetchUserOrderHistory/fulfilled', payload: mock } as any;
    state = ordersReducer(state, fulfilled);
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mock);
  });

  it('should set error on rejected', () => {
    const rejected = { type: 'ordersState/fetchUserOrderHistory/rejected', error: { message: 'err' } } as any;
    const state = ordersReducer(undefined, rejected);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('err');
  });
});
