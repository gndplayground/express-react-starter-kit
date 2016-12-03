import auth from './auth';
export function* rootSaga() {
    yield [
        auth.sagaWatchAuth(),
    ];
}

