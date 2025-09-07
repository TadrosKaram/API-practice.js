'use strict';

const btn = document.querySelector('.btn-country');
const btnSearch = document.querySelector('.btn-search');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////

function getCountryData(country) {

const request = new XMLHttpRequest();
request.open('GET', `https://restcountries.com/v2/name/${country}`);
request.send();

request.addEventListener('load', function () {
  const [data] = JSON.parse(this.responseText);
      const imgSearchUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(data.name + ' country')}`;

    const html = `        <a href="${imgSearchUrl}" target="_blank" rel="noopener noreferrer" title="Click to search images of ${data.name}" style="text-decoration:none; color:inherit">

      <article class="country">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}M people</p>
          <p class="country__row"><span>🗣️</span>${data.languages.map(lang => lang.name).join(', ')}</p>
          <p class="country__row"><span>💰</span>${data.currencies.map(cur => cur.name).join(', ')}</p>
        </div>
      </article>
        </a>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
});
};
countriesContainer.insertAdjacentHTML('beforebegin', '<h1 style="margin-bottom:50px; font-size:30px">Countries Info search</h1>');

getCountryData('portugal');

btnSearch.addEventListener('click', function () {
  const inputCountry = prompt('Enter a country name:');

  if (inputCountry) {
    getCountryData(inputCountry.trim());
  };
});
btn.addEventListener('click', function () {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by this browser.');
        return;
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude);

        // Reverse geocoding to get country name
        const request = new XMLHttpRequest();
        request.open('GET', `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`);
        request.send();

        request.addEventListener('load', function () {
            const data = JSON.parse(this.responseText);
            console.log(data);
            const country = data.countryName;
            if (country) {
                getCountryData(country);
            } else {
                alert('Could not determine country from location.');
            }
        });

        request.addEventListener('error', function () {
            alert('Failed to fetch location data.');
        });
    }, function (error) {
        alert(`Geolocation error: ${error.message}`);
    });
});