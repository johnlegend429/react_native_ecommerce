import { call, put, select } from 'redux-saga/effects';
import api from '~/services/api';

import ProductActions from '~/store/ducks/products';

function* loadProducts(categoryId) {
  const response = yield call(api.get, `/category_products/${categoryId}`);

  if (response) {
    yield put(ProductActions.setProductsSuccess(response.data, categoryId));
  } else {
    yield put(ProductActions.setError('Oh, something is wrong now, try again!'));
  }
}

export function* setProducts() {
  const currentId = yield select(state => state.products.categoryId);
  yield loadProducts(currentId);
}

export function* setCategoryId({ categoryId }) {
  yield loadProducts(categoryId);
}
