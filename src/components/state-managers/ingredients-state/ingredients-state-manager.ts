import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
export const fetchAllIngredients = createAsyncThunk(
  'ingredientsState/fetchAll',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);
interface IngredientsStateManager {
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  ingredients: TIngredient[];
  selectedIngredient: TIngredient | null;
  isLoading: boolean;
  hasError: boolean;
}

// add jest and e2e compatibility aliases
export interface IngredientsState extends IngredientsStateManager {}

export const initialIngredientsState: IngredientsStateManager = {
  buns: [],
  mains: [],
  sauces: [],
  ingredients: [],
  selectedIngredient: null,
  isLoading: false,
  hasError: false
};

// add jest and e2e compatibility aliases
export const initialState: IngredientsState = initialIngredientsState;
const ingredientsStateManager = createSlice({
  name: 'ingredientsState',
  initialState: initialIngredientsState,
  reducers: {
    setBunItems: (state, action: PayloadAction<TIngredient[]>) => {
      state.buns = action.payload;
    },
    setMainItems: (state, action: PayloadAction<TIngredient[]>) => {
      state.mains = action.payload;
    },
    setSauceItems: (state, action: PayloadAction<TIngredient[]>) => {
      state.sauces = action.payload;
    },
    setSelectedIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.selectedIngredient = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setHasError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllIngredients.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchAllIngredients.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(fetchAllIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  },
  selectors: {
    getIngredientsSelector: (state) => state.ingredients,
    getIsLoading: (state) => state.isLoading
  }
});
export const {
  setBunItems,
  setHasError,
  setSauceItems,
  setMainItems,
  setIsLoading,
  setSelectedIngredient
} = ingredientsStateManager.actions;

// add jest and e2e compatibility aliases for actions and thunk
export const setBuns = setBunItems;
export const setMains = setMainItems;
export const setSauces = setSauceItems;
export const getIngredients = fetchAllIngredients;
export const { getIngredientsSelector, getIsLoading } =
  ingredientsStateManager.selectors;
export default ingredientsStateManager.reducer;
