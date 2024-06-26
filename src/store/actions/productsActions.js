import {
  DISPLAY_ITEMS,
  ERROR,
  LOADING,
  SEARCH_VALUE,
} from '../constants/actionTypes';

const url = process.env.REACT_APP_PRODUCT_API || 'https://dummyjson.com/products';


const setSearchValue = (searchValue) => ({
  type: SEARCH_VALUE,
  payload: searchValue,
});

const fetchProducts = () => async (dispatch, getState) => {
  dispatch({ type: LOADING });
  try {
    const response = await fetch(url);
    const data = await response.json();
    dispatch({ type: DISPLAY_ITEMS, payload: data.products });
  } catch (error) {
    dispatch({ type: ERROR, payload: error });
  }
};

const productsActions = { fetchProducts, setSearchValue };

export default productsActions;
