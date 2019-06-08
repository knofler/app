import { fromJS } from 'immutable';
import chefReducer from '../reducer';

describe('chefReducer', () => {
  it('returns the initial state', () => {
    expect(chefReducer(undefined, {})).toEqual(fromJS({}));
  });
});
