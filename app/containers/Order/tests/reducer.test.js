import { fromJS } from 'immutable';
import orderReducer from '../reducer';

describe('orderReducer', () => {
  it('returns the initial state', () => {
    expect(orderReducer(undefined, {})).toEqual(fromJS({}));
  });
});
