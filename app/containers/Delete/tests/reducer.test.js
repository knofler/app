import { fromJS } from 'immutable';
import deleteReducer from '../reducer';

describe('deleteReducer', () => {
  it('returns the initial state', () => {
    expect(deleteReducer(undefined, {})).toEqual(fromJS({}));
  });
});
