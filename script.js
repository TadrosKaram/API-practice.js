'use strict';

const btn = document.querySelector('.btn-country');
const btnSearch = document.querySelector('.btn-search');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////

// // function getCountryData(country) {

// // const request = new XMLHttpRequest();
// // request.open('GET', `https://restcountries.com/v2/name/${country}`);
// // request.send();

// // request.addEventListener('load', function () {
// //   const [data] = JSON.parse(this.responseText);
// //       const imgSearchUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(data.name + ' country')}`;

// //     const html = `        <a href="${imgSearchUrl}" target="_blank" rel="noopener noreferrer" title="Click to search images of ${data.name}" style="text-decoration:none; color:inherit">

// //       <article class="country">
// //         <img class="country__img" src="${data.flags.svg}" />
// //         <div class="country__data">
// //           <h3 class="country__name">${data.name}</h3>
// //           <h4 class="country__region">${data.region}</h4>
// //           <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}M people</p>
// //           <p class="country__row"><span>🗣️</span>${data.languages.map(lang => lang.name).join(', ')}</p>
// //           <p class="country__row"><span>💰</span>${data.currencies.map(cur => cur.name).join(', ')}</p>
// //         </div>
// //       </article>
// //         </a>
// //     `;
// //     countriesContainer.insertAdjacentHTML('beforeend', html);
// //     countriesContainer.style.opacity = 1;
// // });
// // };
// // countriesContainer.insertAdjacentHTML('beforebegin', '<h1 style="margin-bottom:50px; font-size:30px">Countries Info search</h1>');

// // getCountryData('portugal');



// ///////////////////////////////////////////

// //* AJAX call country function

// function getCountryAndNeighbour(country) {

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v2/name/${country}`);
// request.send();

// request.addEventListener('load', function () {
//   const [data] = JSON.parse(this.responseText);
//     //   
//         renderCountry(data);

//         const neighbours = data.borders?.[0];
//         if (!neighbours) return;

//         // AJAX call for neighbour country
//         const request2 = new XMLHttpRequest();
//         request2.open('GET', `https://restcountries.com/v2/alpha/${neighbours}`);
//         request2.send();
        
//         request2.addEventListener('load', function () {
//             const data2 = JSON.parse(this.responseText);
//             renderCountry(data2, 'neighbour');
//         });

// });
// };
// getCountryAndNeighbour('portugal');

// //////////////////////////////////


///////////////////////////////////////
//! Promises and Fetch API [the modern way of AJAX]

function getCountryDataUsingFetch(country) {
    // Country 1
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => {
    
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
        if (!neighbour) return;
// Country 2
      fetch(`https://restcountries.com/v2/alpha/${neighbour}`)
        .then(response => response.json())
        .then(data => {
          renderCountry(data, 'neighbour');
        });
    })
  
}
//* Rendering country card
//  function

function renderCountry(data, className = '') {
    
    const html = `        
      <article class="country ${className}">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}M people</p>
          <p class="country__row"><span>🗣️</span>${data.languages.map(lang => lang.name).join(', ')}</p>
          <p class="country__row"><span>💰</span>${data.currencies.map(cur => cur.name).join(', ')}</p>
        </div>
      </article>
       
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
};

//* Buttons

btnSearch.addEventListener('click', function () {
  const inputCountry = prompt('Enter a country name:');

  if (inputCountry) {
    getCountryDataUsingFetch(inputCountry.trim());
  };
});
btn.addEventListener('click', function () {
   navigator.geolocation.getCurrentPosition(position => {
    const { latitude: lat, longitude: lng } = position.coords;

    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
      .then(response => response.json())
      .then(data => {
        getCountryDataUsingFetch(data.countryName);
      });
});
});

getCountryDataUsingFetch('sudan');
