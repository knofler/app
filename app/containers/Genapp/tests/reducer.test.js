import { fromJS } from 'immutable';
import genappReducer from '../reducer';

describe('genappReducer', () => {
  it('returns the initial state', () => {
    expect(genappReducer(undefined, {})).toEqual(fromJS({}));
  });
});
