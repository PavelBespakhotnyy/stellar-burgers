import ingredientsReducer, {
  initialState,
  setIsLoading,
  setBuns,
  setMains,
  setSauces,
  setSelectedIngredient
} from './ingredients-state-manager';

describe('ingredients state reducer', () => {
  it('should set loading true when requested', () => {
    const state = ingredientsReducer(undefined, setIsLoading(true));
    expect(state.isLoading).toBe(true);
  });

  it('should write data on success and set loading false', () => {
    const mockBuns = [{ _id: 'b1', name: 'Bun' } as any];
    let state = ingredientsReducer(undefined, setBuns(mockBuns));
    expect(state.buns).toEqual(mockBuns);
    // set isLoading false
    state = ingredientsReducer(state, setIsLoading(false));
    expect(state.isLoading).toBe(false);
  });

  it('should set selected ingredient', () => {
    const ingredient = { _id: 'i1', name: 'X' } as any;
    const state = ingredientsReducer(undefined, setSelectedIngredient(ingredient));
    expect(state.selectedIngredient).toEqual(ingredient);
  });
});
