import { fromJS } from 'immutable';
import foodReducer from '../reducer';

describe('foodReducer', () => {
  it('returns the initial state', () => {
    expect(foodReducer(undefined, {})).toEqual(fromJS({}));
  });
});
