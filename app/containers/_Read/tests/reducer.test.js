import { fromJS } from 'immutable';
import readReducer from '../reducer';

describe('readReducer', () => {
  it('returns the initial state', () => {
    expect(readReducer(undefined, {})).toEqual(fromJS({}));
  });
});
