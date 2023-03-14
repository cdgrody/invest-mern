import sendRequest from "./send-request"
const BASE_URL = '/api/holdings'

export async function manageHolding(formData, holdings) {
    let createHolding = true
    for (let holding in holdings) {
        if(holdings[holding].asset.key === parseInt(formData.asset)) createHolding = false
    }
    if (createHolding) {
        return sendRequest(BASE_URL, 'POST', formData)        
    } else {
        return sendRequest(`${BASE_URL}/${formData._id}`, 'PUT', formData)
    }
}

export async function getHoldings() {
    return sendRequest(BASE_URL, 'GET')
}


