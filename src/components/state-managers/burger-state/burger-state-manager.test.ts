import burgerReducer, {
  addConstructorItem,
  removeConstructorItem,
  moveItemUp,
  moveItemDown,
  clearOrderData
} from './burger-state-manager';

// initialBurgerState is not exported from the slice; use expected reset shape
const expectedInitialState = {
  constructorItems: { bun: null, ingredients: [] },
  orderRequest: false,
  orderModalData: null,
  orderError: null,
  isLoading: false
};
import { TIngredient } from '@utils-types';

// Minimal ingredient mock
const bun: TIngredient = { _id: 'bun1', name: 'Bun', type: 'bun', price: 100 } as any;
const meat: TIngredient = { _id: 'm1', name: 'Meat', type: 'main', price: 200 } as any;

describe('burgerState reducer', () => {
  it('should add bun and ingredient', () => {
    let state = burgerReducer(undefined, { type: 'UNKNOWN' });
    expect(state.constructorItems.bun).toBeNull();

    // add bun
    state = burgerReducer(state, addConstructorItem(bun as any));
    expect(state.constructorItems.bun).not.toBeNull();
    expect(state.constructorItems.bun?.name).toBe('Bun');

    // add main ingredient
    state = burgerReducer(state, addConstructorItem(meat as any));
    expect(state.constructorItems.ingredients.length).toBe(1);
  });

  it('should remove ingredient by id', () => {
    let state = burgerReducer(undefined, { type: 'UNKNOWN' });
    state = burgerReducer(state, addConstructorItem(meat as any));
    const id = state.constructorItems.ingredients[0].id as string;
    state = burgerReducer(state, removeConstructorItem(id));
    expect(state.constructorItems.ingredients.length).toBe(0);
  });

  it('should move items up and down', () => {
    let state = burgerReducer(undefined, { type: 'UNKNOWN' });
    // add two mains
    state = burgerReducer(state, addConstructorItem({ ...meat, _id: 'm1' } as any));
    state = burgerReducer(state, addConstructorItem({ ...meat, _id: 'm2' } as any));
    expect(state.constructorItems.ingredients.length).toBe(2);
    const firstId = state.constructorItems.ingredients[0].id as string;
    // move second up (index 1 -> up)
    state = burgerReducer(state, moveItemUp(1));
    expect(state.constructorItems.ingredients[0].id).not.toBe(firstId);
    // move first down
    state = burgerReducer(state, moveItemDown(0));
    expect(state.constructorItems.ingredients.length).toBe(2);
  });

  it('should clear order data', () => {
    let state = burgerReducer(undefined, { type: 'UNKNOWN' });
    state = burgerReducer(state, addConstructorItem(bun as any));
  state = burgerReducer(state, clearOrderData());
  expect(state).toEqual(expectedInitialState);
  });
});
