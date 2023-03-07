import sendRequest from "./send-request"
const BASE_URL = '/api/holdings'

export async function addHolding(formData) {
    return sendRequest(BASE_URL, 'POST', formData)
}

export async function getHoldings() {
    return sendRequest(BASE_URL, 'GET')
}
