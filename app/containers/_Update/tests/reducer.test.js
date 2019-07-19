import { fromJS } from 'immutable';
import updateReducer from '../reducer';

describe('updateReducer', () => {
  it('returns the initial state', () => {
    expect(updateReducer(undefined, {})).toEqual(fromJS({}));
  });
});
