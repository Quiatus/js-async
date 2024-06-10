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
        countriesContainer.style.opacity = 1
}

// old way
const getCountryData = (country) => {
    const req = new XMLHttpRequest()
    req.open('GET', `https://countries-api-836d.onrender.com/countries/name/${country}`)
    req.send()
    
    req.addEventListener('load', function() {
        const [res] = JSON.parse(this.responseText)
        renderCountry(res)
        // const neighbour = res.borders

        // if (!neighbour) return

        // neighbour.forEach(country => {
        //     const req2 = new XMLHttpRequest()
        //     req2.open('GET', `https://countries-api-836d.onrender.com/countries/alpha/${country}`)
        //     req2.send()

        //     req2.addEventListener('load', function() {
        //         const res2 = JSON.parse(this.responseText)
        //         renderCountry(res2, 'neighbour')
        //     })
        // })
    })
}

getCountryData('germany')