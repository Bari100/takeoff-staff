import { Action, AnyAction } from '@reduxjs/toolkit';
import { runSaga, Saga } from 'redux-saga';
import * as FetchAPI from '../../utils/fetchAPI';
import { login } from '../sagas';

describe('sagas testing', () => {
  it('should call login api with login route, POST method and user fristName lastName object', async () => {
    const dispatched: Action[] = [];
    const userMock = { user: { firstName: '', lastName: '' } } as unknown as AnyAction;
    const fetchAPISpy = jest.spyOn(FetchAPI, 'fetchAPI').mockResolvedValueOnce({ json: () => ({ accessToken: '' }) } as unknown as Response);
    await runSaga({
      dispatch: (action: Action) => dispatched.push(action),
      getState: () => ({ email: '', password: '' }),
    }, (() => login(userMock)) as Saga, { payload: 'payload' }).toPromise();
    expect(fetchAPISpy).toBeCalledWith('login', 'POST', userMock.user);
  });
});
