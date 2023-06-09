

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

fetch("https://restcountries.com/v3.1/all", requestOptions)
    .then(response => response.json())
    .then(result => renderCountries(result))
    .catch(error => console.log('error', error));



function renderCountries(data) {
    let output = '';

    for (let country of data) {

        output += `<div onclick="makeSearchCountryRequest('${country.ccn3}')" class="country-container">
        <img class="country-flag" src="${country.flags.png}"></img>
        <p class="region-text">${country.region}</p>
        <p class="common-name">${country.name.common}</p>

        </div>
        `
    }

    document.getElementById('countries-container').innerHTML = output;


}

function makeSearchCountryRequest(id) {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://restcountries.com/v3.1/alpha/" + id, requestOptions)
        .then(response => response.json())
        .then(result => renderCountryPage(result))
        .catch(error => console.log('error', error));
}



function renderCountryPage(data) {

    let output = '';
   
    document.getElementById('search-form').innerHTML = '';
    document.getElementById('dropdown-container').innerHTML = '';
    for (let country of data) {
        
        const nativeNameKey = Object.keys(country.name.nativeName)[0];
        const nativeName = country.name.nativeName[nativeNameKey].common;


        const translationList = country.translations;
        const translationKeys = Object.keys(translationList);
        const translations = [];

        for (let i = 0; i < translationKeys.length; i++) {
            const translationKey = translationKeys[i];
            const translation = translationList[translationKey];
            
            translations.push(`<li class="translation-item">${translation.common} (${translationKey})</li>`);
           
        }

        const currencyKey = Object.keys(country.currencies)[0];
        const currencyName = country.currencies[currencyKey].name;
        const currencySymbol = country.currencies[currencyKey].symbol;

        const languages = Object.entries(country.languages)
            .map(([code, name]) => `${name} (${code})`)
            .join(", ");

        output += `<div class="country-page-container">
        <img class="country-flag" src="${country.flags.png}"></img></br>
        <img class="coat-of-arms" src="${country.coatOfArms.png}"></img>
        <p class="region-text">Region: ${country.region}</p>
        <p class="region-text">Subregion: ${country.subregion}</p>
        <p class="common-name">${country.name.common} | ${country.name.official} | ${nativeName}</p>
        <p>Capital: ${country.capital} </p>
        <p>Currency: ${currencyName} | ${currencySymbol}</p>
        <p>Languages: ${languages}</p>
        <p>Population: ${country.population}</p>
        <p>Area: ${country.area} km²</p>
        <p>Timezones: ${country.timezones}</p>
        <p>Traffic: ${country.car.side}-hand traffic</p>
        <div id="maps-container">
        <div id="canvas-for-googlemap" style="height:100%; width:100%;max-width:100%;"><iframe
                style="height:100%;width:100%;border:0;" frameborder="0"
                src="https://www.google.com/maps/embed/v1/place?q=${country.name.common}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"></iframe>
        </div>
        </div>
        
        <ul class="translations-container">
        <p class="translations-header">Translations</p>
        ${translations.join("")}
        </ul>

        </div>
        `
    }

    document.getElementById('countries-container').innerHTML = output;

}



function searchCountry(name){
    console.log(name);
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://restcountries.com/v3.1/name/" + name, requestOptions)
        .then(response => response.json())
        .then(result => renderCountries(result))
        .catch(error => console.log('error', error));
}

function getCountriesByRegion(region){
    console.log(region);
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://restcountries.com/v3.1/region/" + region, requestOptions)
        .then(response => response.json())
        .then(result => renderCountries(result))
        .catch(error => console.log('error', error));
}
