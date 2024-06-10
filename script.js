'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// old way
const getCountryData = (country) => {
    const req = new XMLHttpRequest()
    req.open('GET', `https://countries-api-836d.onrender.com/countries/name/${country}`)
    req.send()
    
    req.addEventListener('load', function() {
        const [res] = JSON.parse(this.responseText)
        
        const html = `
        <article class="country">
              <img class="country__img" src="${res.flag}" />
              <div class="country__data">
                <h3 class="country__name">${res.name}</h3>
                <h4 class="country__region">${res.region}</h4>
                <p class="country__row"><span>👫</span>${(+res.population / 1000000).toFixed(2)} M</p>
                <p class="country__row"><span>🗣️</span>${res.languages[0].name}</p>
                <p class="country__row"><span>💰</span>${res.currencies[0].name}</p>
              </div>
        </article>`
    
        countriesContainer.insertAdjacentHTML('beforeend', html)
        countriesContainer.style.opacity = 1
    })
}

getCountryData('slovakia')
getCountryData('usa')