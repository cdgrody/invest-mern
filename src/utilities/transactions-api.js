import sendRequest from "./send-request"
const BASE_URL = '/api/transactions'

export async function addTransaction(formData) {
    return sendRequest(BASE_URL, 'POST', formData)
}

export async function getTransactions() {
    return sendRequest(BASE_URL, 'GET')
}