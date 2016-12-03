import Promise from 'bluebird'
import {APIInternalError, APIUnauthorized, APIError} from './apiErrors'

export function fetchAPI(url, opts) {

    return fetch(url, opts).then(function (response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(new APIError({response: response}));
        }
    })
        .then(function (resp) {
            return resp.json();
        }).then(function (resp) {
            return resp;
        }).catch(function (resp) {

            if (resp instanceof APIError) {

                let apiResponse = resp.response;

                if (apiResponse.status === 401) throw new APIUnauthorized({response: apiResponse});

                else throw new APIInternalError({response: apiResponse});
            }

            throw new APIInternalError({response: resp});

        });

}