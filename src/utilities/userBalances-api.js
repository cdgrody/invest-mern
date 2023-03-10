import sendRequest from "./send-request"
const BASE_URL = '/api/userBalances'

export async function createBalance(userBalanceData) {
    return sendRequest(BASE_URL, 'POST', userBalanceData)
}


export async function getUserBalances() {
    return sendRequest(BASE_URL, 'GET')
}