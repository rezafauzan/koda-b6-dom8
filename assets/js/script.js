let index = 0

let histories = JSON.parse(window.localStorage.getItem('convert-histories'))
if (histories === null) {
    histories = []
} else {
    histories.forEach(
        history => {
            $("#convert-history tbody").append(`<tr><td>${index + 1}°</td><td>${history.celcius}°</td><td>${ history.fahrenheit }°</td><td>${history.reamur}°</td><td>${ history.kelvin }°</td></tr>`)
            index++
        }
    )
}

$('#celcius-converter-form').on('submit',
    e => {
        e.preventDefault()
        const temp = parseInt(new FormData(e.target).get('temp'))
        if (typeof temp === 'number' && !isNaN(temp)) {
            histories.push(
                {
                    celcius: temp,
                    fahrenheit:  (temp * 9 / 5) + 32 ,
                    reamur: temp * 4 / 5,
                    kelvin:  temp + 273.15
                }
            )

            
            $("#convert-history tbody").append(`<tr><td>${index+1}°</td><td>${temp}°</td><td>${ (temp * 9 / 5) + 32 }°</td><td>${temp * 4 / 5}°</td><td>${ temp + 273.15 }°</td></tr>`)
            
            window.localStorage.setItem('convert-histories', JSON.stringify(histories))
            index++
        } else {
            alert("Input suhu harus berupa angka")
        }
    }
)

$('#reset').on('click', 
    ()=>{
        $("#convert-history tbody").html('')
        index = 0
        window.localStorage.removeItem('convert-histories')
    }
)