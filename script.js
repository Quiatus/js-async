'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = (data, className = '') => {
    const html = `
        <article class="country ${className}">
              <img class="country__img" src="${data.flag}" />
              <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(2)} M</p>
                <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
              </div>
        </article>`
    
        countriesContainer.insertAdjacentHTML('beforeend', html)
}

const renderError = (msg) => {
    countriesContainer.insertAdjacentText('beforeend', msg)
}

// old way
// const getCountryData = (country) => {
//     const req = new XMLHttpRequest()
//     req.open('GET', `https://countries-api-836d.onrender.com/countries/name/${country}`)
//     req.send()
    
//     req.addEventListener('load', function() {
//         const [res] = JSON.parse(this.responseText)
//         renderCountry(res)
//         // const neighbour = res.borders

//         // if (!neighbour) return

//         // neighbour.forEach(country => {
//         //     const req2 = new XMLHttpRequest()
//         //     req2.open('GET', `https://countries-api-836d.onrender.com/countries/alpha/${country}`)
//         //     req2.send()

//         //     req2.addEventListener('load', function() {
//         //         const res2 = JSON.parse(this.responseText)
//         //         renderCountry(res2, 'neighbour')
//         //     })
//         // })
//     })
// }

// getCountryData('germany')


// promises + chaining promises (then)

const url = 'https://countries-api-836d.onrender.com/countries/name/'
const nburl = 'https://countries-api-836d.onrender.com/countries/alpha/'

const getJSON = (url, errorMsg = 'Something went wrong') => {
    return fetch(url).then(res => {
        if (!res.ok) throw new Error(errorMsg)
        return res.json()
    })
}

const getCountryData = (country) => {
    getJSON(url+country, 'Country not found')
        .then((data) => {
            renderCountry(data[0])
            const nb = data[0].borders?.[0]
            return getJSON(nburl + nb, 'No neighbouring country found')
        })
        .then((data) => renderCountry(data, 'neighbour'))
        .catch(err => renderError(err.message))
        .finally(() => {
            btn.textContent = 'Where am I?'
            countriesContainer.style.opacity = 1
        })
}

btn.addEventListener('click', () => {
    countriesContainer.innerHTML = ''
    btn.textContent = 'Loading...'
    getCountryData('netherlands')
})