function onLoad() {

    const form = document.querySelector('#regForm')
    const titleText = document.querySelector('#title-text')
    const detail = document.querySelector('#detail')
    const submitBtn = document.querySelector('#submit-btn')

    const WELCOME_TEXT = "Join Upay"
    const THANKS_TEXT = "Thank You!"
    const WELCOME_DETAIL = "We are glad to see your interest towards helping children from underprivileged and marginalized sections of the society. Kindly provide more details about you."
    const THANKS_DETAIL = "Thank you for your interest in volunteering for Upay. We will get in touch with you soon. In the mean time you can visit our <a href=\"https://www.upay.org.in\">website</a> to know more about us or follow us on <a href=\"https://www.facebook.com/upayngo/\">facebook</a>."
    const ERROR_TEXT = "Oops"
    const ERROR_DETAIL = "We faced some problem in submitting your details. Please try again. If the issue persists please reach out to us at  infoupay@gmail.com"
    const SERVICE_URL = "https://volreg.herokuapp.com"
    
    titleText.textContent = WELCOME_TEXT
    detail.innerHTML = WELCOME_DETAIL
    
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        disableForm()
        sendData()
    })

    function sendData() {
        var FD = new FormData(form)
        var data = {}
        FD.forEach((value,key) => {
            if(!data.hasOwnProperty(key)) {
                // todo: remove hardcoded check
                if (key == "contributionMethod") {
                    data[key] = [value]
                } 
                else {
                    data[key] = value
                }
                return
            }
            if(!Array.isArray(data[key])) {
                data[key] = [data[key]]
            }
            data[key].push(value)
        })
        
        disableTags("input", "select", "textarea")

        fetch(SERVICE_URL, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then((data) => {
            if (data.status!=200) {
                throw new Error("Response not ok")
            }
            form.classList.add("hide")
                detail.innerHTML = THANKS_DETAIL
                titleText.textContent = THANKS_TEXT
        }).catch((err) => {
            form.classList.add("hide")
            detail.innerHTML = ERROR_DETAIL
            titleText.textContent = ERROR_TEXT
        })
    
    }
    
    function disableForm() {
        submitBtn.classList.add("disabled")
        submitBtn.value = "SUBMITTING..."
    }
}



function disableTags(...tagNames) {
    tagNames.forEach(tagName => Array.from(document.getElementsByTagName(tagName)).forEach(elem => elem.disabled = true))
}




// {"name":"PiyushSingh","email":"piyushranjan95@gmail.com","mobile":"878988","qualification":"BE","cityName":"delhi","contributionMethod":["teaching","Operations"],"whyUpay":"hjkml","experienced":"yes"}