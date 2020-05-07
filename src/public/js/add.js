const covidForm = document.getElementById('covid-form')
const countyCode = document.getElementById('countyCode')
const address = document.getElementById('address')



async function addCovid(e) {
    e.preventDefault()

    if (countyCode.value === '' || address.value === '') {
        alert("Please fill in the fields")
    } 
    
    const sendBody = {
        countyCode: countyCode.value,
        address: address.value
    }
    
    try {
        const response = await fetch('/covid', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendBody)
        })

        if (response.status === 400) {
            throw Error("Case already Exists")
        }

        alert("Case added")
        window.location.href= '/index.html'

    } catch (e) {
        alert(e)
        return
    }
    

}

covidForm.addEventListener('submit', addCovid)