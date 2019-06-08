import { fromJS } from 'immutable';
import crudReducer from '../reducer';

describe('crudReducer', () => {
  it('returns the initial state', () => {
    expect(crudReducer(undefined, {})).toEqual(fromJS({}));
  });
});
