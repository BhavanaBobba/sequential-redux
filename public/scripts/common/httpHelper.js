import request from "superagent";

import {select, put, call} from "redux-saga/effects";

export function getErrorMessage(exception) {
    return (exception.response && exception.response.text) || exception.message;
}

export function* fetch(endpoint, successAction, failureAction, query) {

    try {
        const result = yield call(fetchPromise, endpoint, query);
        yield put({type: successAction, body: result.body});
    } catch (exception) {
        yield put({type: failureAction, errorMessage: getErrorMessage(exception)});
    }
}

export function* fetchPromise(endpoint, query) {
    const baseUrl = yield select(baseUrlSelector);
    const result = yield call(()=>(
        request.get(baseUrl + endpoint)
            .query(query)
            .withCredentials()
            .then()
    ));

    if (!result.body) {
        throw new Error("Received invalid response");
    }
    return result;
}

export function* putPromise(endpoint, payload) {
    const baseUrl = yield select(baseUrlSelector);
    return yield call(()=>(
        request.put(baseUrl + endpoint, payload)
            .withCredentials()
            .then()
    ));
}

export function* postPromise(endpoint, payload) {
    const baseUrl = yield select(baseUrlSelector);
    return yield call(()=>(
        request.post(baseUrl + endpoint, payload)
            .withCredentials()
            .then()
    ));
}


function baseUrlSelector(state) {
    console.log(window.velocity.serviceBindings['designAnalysisSvc'])
    return window.velocity.serviceBindings['designAnalysisSvc'];
}