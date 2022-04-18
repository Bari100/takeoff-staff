import { call, CallEffect, put, PutEffect, select, SelectEffect, takeEvery } from 'redux-saga/effects';
import { selectUser, setResponseData } from './authSlice';

interface User {
	email: string
	password: string
}

interface ResponseObject {
	accessToken: string
	user: User		
}

function* login(): Generator<
		SelectEffect | CallEffect | Promise<ResponseObject> | PutEffect,
		void,
		Response & ResponseObject
	> {
	const user = yield select(selectUser);
	try {
		const response = yield call(() => fetch(
			'http://localhost:3000/login',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify(user)
    	})
		)
		const data = yield response.json();
		yield put(setResponseData(data));
	} catch (e) {
		console.log(e);
	}
}

function* watchLogin() {
	yield takeEvery('LOGIN', login)
}

export default watchLogin;
