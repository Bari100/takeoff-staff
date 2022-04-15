import { call, CallEffect, select, SelectEffect, takeEvery } from 'redux-saga/effects';
import { selectUser } from './authSlice';

interface User {
	email: string
	password: string
}

interface ResponseObject {
	token: string
	user: User		
}

function* login(): Generator<
		SelectEffect | CallEffect | Promise<ResponseObject>,
		void,
		Response
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
		console.log(data);
	} catch (e) {
		console.log(e);
	}
}

function* watchLogin() {
	yield takeEvery('TOKEN_REQUESTED', login)
}

export default watchLogin;
