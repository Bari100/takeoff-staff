import { AnyAction } from '@reduxjs/toolkit';
import { call, CallEffect, put, PutEffect, select, SelectEffect, takeEvery } from 'redux-saga/effects';
import { selectUser, setResponseData } from './authSlice';
import { selectContact, setContacts } from './contactsSlice';

interface User {
	email: string
	password: string
}

interface ResponseObject {
	accessToken: string
	user: User		
}

function* login({ user }: AnyAction): Generator<
		SelectEffect | CallEffect | Promise<ResponseObject> | PutEffect,
		void,
		Response & ResponseObject
	> {
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
		);
		const data = yield response.json();
		yield put(setResponseData(data));
		localStorage.setItem('token', data.accessToken);
	} catch (e) {
		console.log(e);
	}
}

function* getContacts(): any {
	try {
		const response = yield call(() => fetch(
			'http://localhost:3004/contacts',
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
    	})
		);
		const data = yield response.json();
		yield put(setContacts(data));
	} catch (e) {
		console.log(e);
	}
}

function* addContact({ contact }: AnyAction): any {
	try {
		yield call(() => fetch(
			'http://localhost:3004/contacts',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify(contact),
    	})
		);
		yield call(getContacts);
	} catch (e) {
		console.log(e);
	}
}

function* removeContact({ id }: AnyAction): any {
	try {
		yield call(() => fetch(
			`http://localhost:3004/contacts/${id}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
    	})
		);
		yield call(getContacts);
	} catch (e) {
		console.log(e);
	}
}

function* watchLogin() {
	yield takeEvery('LOGIN', login);
	yield takeEvery('GET_CONTACTS', getContacts);
	yield takeEvery('ADD_CONTACT', addContact);
	yield takeEvery('REMOVE_CONTACT', removeContact);
}

export default watchLogin;
