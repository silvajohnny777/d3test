let country_search = document.querySelector('#country-search');
const region = document.querySelector('#dropdown');

setTimeout(() => {
    CountrySearch(null);
}, 1);

async function getByApi(apiURL) {
    try {
        const fApi = await fetch(apiURL);
        if(!fApi.ok) {
            return false
        }
        return await fApi.json();
    } catch(e) {
       return false
    }
}

async function CountrySearch(country_search) {
    //console.log('TESTE' ,country_search);
    let el = $('#countrieslist');
    el.html('');
    let apiURL = 'https://restcountries.eu/rest/v2/all';

    if(country_search == '') { // Show all countries
        apiURL = 'https://restcountries.eu/rest/v2/all';
    } else if(country_search != null && region == null) { // Show specific country
        apiURL = 'https://restcountries.eu/rest/v2/name/'+country_search+'';
    } else if (region != null) { // Show countries based on the region
       apiURL = 'https://restcountries.eu/rest/v2/region/'+region+'';
    }

    const apiGet = await getByApi(apiURL);
    apiGet.forEach(function(country){         
        const elAppend = `
            <a id="click" class="a" onclick="countryInfo('${country.alpha2Code}')" href="#">
            <div id="card" class="card" style="width: 18rem;">
            <img class="card-img-top" src="${country.flag}"alt="Card image cap">
            <div class="card-body"><h5 id="countryName" class="card-title">${country.name}</h5> 
            <div class="card-description">
            <p class="info"><span class="card-text">Population: </span>${country.population.toLocaleString('en-US') }
            </p><p class="info"><span class="card-text">Region: </span>${country.region }
            </p><p class="info"><span class="card-text">Capital: </span>${country.capital }
            </p></div></div></a>`  
        el.append(elAppend);
    }) 
}

    async function countryInfo(alpha2Code) {
        console.log('alpha2Code',alpha2Code);
        const apiURL = `https://restcountries.eu/rest/v2/alpha/${alpha2Code}`
        const fApi = await fetch(apiURL);
        const country = await fApi.json();

        console.log(country);

        console.log('borders', (country.borders).length);

        let el = $('#countrieslist');
        el.html('');

        let na = $('#content-search');
        na.html(`<div class="content-search">
            <a href="./index.html"><button id="btnFA" class="btn2 btn-primary">
            <i class="fas fa-arrow-left"></i>
                Back
            </button>
            </a>
            </div>`);

            const elAppend = `
            <div id="countryInfo" class="infoContainer container-fluid">
            <div class="row">
            <div class="container-col col-sm-6">
            <img src="${country.flag}" alt="..." class="countryInfoImage">
            </div>    
            <div class="container-col col-sm-6">
            <div class="searchInfo">        
            <h1 class="searchTitle">${country.name}</h1><div class="SearchInfoItens"><ul><li><span class="card-text">Native Name: </span>${country.nativeName}</li>
            <li><span class="card-text">Population: </span>${country.population.toLocaleString('en-US')}</li><li><span class="card-text">Region: </span>${country.region}</li>
            <li><span class="card-text">Sub Region: </span>${country.subregion}</li><li><span class="card-text">Capital: </span>${country.capital}</li></ul>
            <div class="rigthItens col-sm"><ul><li><span class="card-text">Top Level Domain: </span>${country.topLevelDomain}</li>
            <li><span class="card-text">Currencies: </span>${country.currencies[0].name}</li><li><span class="card-text">Languages: </span>${country.languages[0].name}</li></ul>
            </div></div>
            <div class="searchBottom"><span class="card-text">Border Countries: <button class="btnCountries btn-primary" onclick="borderSearch('${country.borders[0].alpha2Code}')">${country.borders[0]}</button></span></div>
         
            
            </div>
          </div></div>`  

            //<div class="searchBottom"><span class="card-text">Border Countries: <button class="btnCountries btn-primary" onclick="borderSearch('${country.borders[0].alpha2Code}')">${country.borders[0]}</button></span></div>
         
          
            el.html(elAppend); //prepend
    }

    
