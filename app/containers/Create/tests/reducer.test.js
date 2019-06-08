import { fromJS } from 'immutable';
import createReducer from '../reducer';

describe('createReducer', () => {
  it('returns the initial state', () => {
    expect(createReducer(undefined, {})).toEqual(fromJS({}));
  });
});
