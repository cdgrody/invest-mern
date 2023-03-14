import sendRequest from "./send-request"
const BASE_URL = '/api/holdings'

export async function manageHolding(formData, holdings) {
    let createHolding = true
    for (let holding in holdings) {
        console.log('holdings loop', holding, formData, formData.shares)
        if(holdings[holding].asset.key === parseInt(formData.asset)) createHolding = false
    }
    console.log('result', createHolding ? 'create holding' : 'update holding')
    if (createHolding) {
        return sendRequest(BASE_URL, 'POST', formData)        
    } else {
        return sendRequest(`${BASE_URL}/${formData._id}`, 'PUT', formData)
    }
}

export async function getHoldings() {
    return sendRequest(BASE_URL, 'GET')
}


