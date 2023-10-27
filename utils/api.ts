/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */

const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(
    url: URL,
    options: Object,
    onCancel?: Object | Array<Object>
) {
    try {
        const response = await fetch(url, options);

        if (response.status === 204) {
            return null;
        }

        const payload = await response.json();

        if (payload.error) {
            return Promise.reject({ message: payload.error });
        }
        return payload.data;
    } catch (error) {
        let message = "Unknown Error";
        if (error instanceof Error) message = error.message;
        // we'll proceed, but let's report it
        reportError({ message });
        return Promise.resolve(onCancel);
    }
}

export async function listTasks(signal: AbortSignal) {
    const url = new URL(`${API_BASE_URL}/task`);

    return await fetchJson(url, { headers, signal }, []);
}

export async function createTask(
    signal: AbortSignal,
    data: Object | RegExpMatchArray
) {
    const url = new URL(`${API_BASE_URL}/task`);
    const options = {
        method: "POST",
        headers,
        body: JSON.stringify({ data }),
        signal,
    };

    return await fetchJson(url, options, {});
}
