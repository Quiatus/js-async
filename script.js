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

// console.log('test start')  // 1.
// setTimeout(() => console.log('0 sec timer'), 0)  // 5.
// Promise.resolve('resolved promise 1').then(res => console.log(res)) // 3.
// Promise.resolve('resolved promise 2').then(res => {  // 4.
//     for (let i = 0; i < 1000000000; i++) {}
//     console.log(res)
// })

// console.log('test end') // 2.


// Create a new promise

// const lot = new Promise((resolve, reject) => {
//     console.log('Draw...')
//     setTimeout(() => Math.random() >= 0.5 ? resolve('You won!') : reject(new Error ('You lost!')), 2000)
// })

// lot.then(res => console.log(res)).catch(err => console.error(err))

// promisifying (convert callback async to promise)

// const wait = (sec) => new Promise((res) => setTimeout(() => res(`${sec} sec`), sec * 1000))

// wait(2).then((res) => {
//     console.log(res)
//     return wait(1)
// }).then((res) => console.log(res))



// const getPosition = () => new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject))

// getPosition().then(pos => console.log(pos))

// async / await

const whereAmI = async (country) => {
    try {
        const res = await fetch(url + country)
        const data = await res.json()
        //return data[0].population
        return data
    } catch (err) {
    }
}

// getting data from async function

// whereAmI('netherslands').then(pop => pop ? console.log(pop) : null).catch(err => err).finally(() => console.log('Done!'))

(async () => {
    console.log('Retrieving population data...')
    try {
        // const popNl = await whereAmI('netherlands')
        // const popSk = await whereAmI('slovakia')
        // const popDe = await whereAmI('germany')

        // parallel promises
        const data = await Promise.all([whereAmI('netherlands'), whereAmI('slovakia'), whereAmI('germany')])//.then(res => console.log(res))
        console.log(data.map(data => data[0].population))
        //console.log([popNl, popSk, popDe])
    } catch(err) {
        console.error(err)
    }
    console.log('Done!')
})()