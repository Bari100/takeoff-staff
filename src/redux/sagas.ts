import { AnyAction } from '@reduxjs/toolkit';
import {
  all, call, CallEffect, put, PutEffect, takeEvery,
} from 'redux-saga/effects';
import { setResponseData } from './authSlice';
import { setContacts } from './contactsSlice';

interface User {
  email: string
  password: string
}

interface AuthResponse {
  accessToken: string
  user: User
}

interface Contact {
  firstName: string
  lastName: string
  id: number
}

type ContactsResponse = Contact[]

function* login({ user }: AnyAction): Generator<
  CallEffect | Promise<AuthResponse> | PutEffect,
  void,
  Response & AuthResponse
> {
  try {
    const response = yield call(() => fetch(
      'http://localhost:3000/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(user),
      },
    ));
    const data = yield response.json();
    yield put(setResponseData(data));
    localStorage.setItem('token', data.accessToken);
  } catch (e) {
    console.log(e);
  }
}

function* getContacts(): Generator<
  CallEffect | Promise<ContactsResponse> | PutEffect,
  void,
  Response & ContactsResponse
  > {
  try {
    const response = yield call(() => fetch(
      'http://localhost:3004/contacts',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      },
    ));
    const data = yield response.json();
    yield put(setContacts(data));
  } catch (e) {
    console.log(e);
  }
}

function* addContact({ contact }: AnyAction): Generator<CallEffect> {
  try {
    yield call(() => fetch(
      'http://localhost:3004/contacts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(contact),
      },
    ));
    yield call(getContacts);
  } catch (e) {
    console.log(e);
  }
}

function* removeContact({ contactId }: AnyAction): Generator<CallEffect> {
  try {
    yield call(() => fetch(
      `http://localhost:3004/contacts/${contactId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      },
    ));
    yield call(getContacts);
  } catch (e) {
    console.log(e);
  }
}

function* editContact({ payload }: AnyAction): Generator<CallEffect> {
  const { contact, contactId } = payload;
  try {
    yield call(() => fetch(
      `http://localhost:3004/contacts/${contactId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(contact),
      },
    ));
    yield call(getContacts);
  } catch (e) {
    console.log(e);
  }
}

function* rootSaga() {
  yield all([
    takeEvery('LOGIN', login),
    takeEvery('GET_CONTACTS', getContacts),
    takeEvery('ADD_CONTACT', addContact),
    takeEvery('REMOVE_CONTACT', removeContact),
    takeEvery('EDIT_CONTACT', editContact),
  ]);
}

export default rootSaga;
