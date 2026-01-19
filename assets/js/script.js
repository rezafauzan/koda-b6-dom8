function elementor(element, attribute = [['', '']], content, parrent) {
    const e = document.createElement(element)
    attribute.forEach(
        item => {
            e.setAttribute(item[0], item[1])
        }
    )
    if (typeof content === "string" || typeof content === "number") {
        const textNode = document.createTextNode(content)
        e.appendChild(textNode)
    }

    if (parrent) {
        parrent.appendChild(e)
    }
    return e
}

const tempInput = document.getElementById('temp')
const convertHistory = document.getElementById('convert-history')
const celciusConverterForm = document.getElementById('celcius-converter-form')
const tbodyHistory = document.querySelector("#convert-history tbody")

let index = 0

let histories = JSON.parse(window.localStorage.getItem('convert-histories'))
if (histories === null) {
    histories = []
} else {
    histories.forEach(
        history => {
            const trow = elementor('tr', [], undefined, undefined)
            const tdIndex = elementor('td', [], index + 1, trow)
            const tdCelcius = elementor('td', [], `${history.celcius}°`, trow)
            const tdFahrenheit = elementor('td', [], `${history.fahrenheit}°`, trow)
            const tdReamur = elementor('td', [], `${history.reamur}°`, undefined)
            const tdKelvin = elementor('td', [], `${history.kelvin}°`, undefined)
        
            trow.append(tdIndex, tdCelcius, tdFahrenheit, tdReamur, tdKelvin)
        
            tbodyHistory.appendChild(trow)
        
            index++
        }
    )
}



celciusConverterForm.addEventListener('submit',
    e => {
        e.preventDefault()

        const temp = parseInt(new FormData(e.target).get('temp'))
        if (typeof temp === 'number' && !isNaN(temp)) {
            const fahrenheit = (temp * 9 / 5) + 32
            const reamur = temp * 4 / 5
            const kelvin = temp + 273.15
            histories.push(
                {
                    celcius: temp,
                    fahrenheit: fahrenheit,
                    reamur: reamur,
                    kelvin: kelvin
                }
            )
            window.localStorage.setItem('convert-histories', JSON.stringify(histories))
            const trow = elementor('tr', [], undefined, undefined)
            const tdIndex = elementor('td', [], index + 1, trow)
            const tdCelcius = elementor('td', [], `${temp}°`, trow)
            const tdFahrenheit = elementor('td', [], `${fahrenheit}°`, trow)
            const tdReamur = elementor('td', [], `${reamur}°`, undefined)
            const tdKelvin = elementor('td', [], `${kelvin}°`, undefined)

            trow.append(tdIndex, tdCelcius, tdFahrenheit, tdReamur, tdKelvin)

            tbodyHistory.appendChild(trow)

            index++
        } else {
            alert("Input suhu harus berupa angka")
        }
    }
)

const btnReset = document.getElementById('reset')

btnReset.addEventListener('click', 
    ()=>{
        tbodyHistory.innerHTML = ''
        index = 0
        window.localStorage.removeItem('convert-histories')
    }
)