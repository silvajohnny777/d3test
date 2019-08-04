let country_search = document.querySelector('#country-search');
const region = document.querySelector('#dropRegion');

setTimeout(() => {
    CountrySearch(null);
}, 1);

// API
async function getByApi(apiURL) {
    try {
        const fApi = await fetch(apiURL);
            if(!fApi.ok) { // If result is not okay, notify!
                let el = $('#countrieslist');
                el.html('');                   
                    const elAppend = `
                    <h1>Something is wrong... :(</h1><p>`  
                    el.html(elAppend);
            } else { // else, return api
                return await fApi.json();
            }
    } catch(e) {
       return false;
    }
}

// Define which URL the system is going to use based on the sorting options
async function CountrySearch(country_search) {
    let el = $('#countrieslist');
    el.html('');
    let apiURL = 'https://restcountries.eu/rest/v2/all';

    if(country_search == '') { // Show all countries
        apiURL = 'https://restcountries.eu/rest/v2/all';
    } else if(country_search != null && region == null) { // Show specific country - Search area
        apiURL = 'https://restcountries.eu/rest/v2/name/'+country_search+'';
    } else if (region != null) { // Show countries based on the region - Dropdown value
       apiURL = 'https://restcountries.eu/rest/v2/region/'+region+'';
    }

    // Function bellow prints all the cards
    const apiGet = await getByApi(apiURL);
    apiGet.forEach(function(country){  
        const elAppend = `
            <a id="click" class="a" onclick="countryInfo('${country.alpha2Code}')" href="#">
            <div id="card" class="card" style="width: 18rem;">
            <img class="card-img-top" src="${country.flag}"alt="Card image cap">
            <div class="card-body"><h5 id="countryName" class="card-title">${country.name}</h5> 
            <div id="card-description" class="card-description">
            <p class="info"><span class="card-text">Population: </span>${country.population.toLocaleString('en-US') }
            </p><p class="info"><span class="card-text">Region: </span>${country.region }
            </p><p class="info"><span class="card-text">Capital: </span>${country.capital }
            </p></div></div></a>`  
        el.append(elAppend);
    }) 
}

    //Executed when a card is clicked
    async function countryInfo(alpha2Code) {
        const apiURL = `https://restcountries.eu/rest/v2/alpha/${alpha2Code}`;
        const fApi = await fetch(apiURL);
        const country = await fApi.json();

        console.log(country);

        console.log('borders', (country.borders).length);
        console.log('languages', (country.languages).length);

        let currency = []; // Saving languages into an array
        for (let i = 0 ; i < (country.currencies).length ; i++) {
            currency.push(country.currencies[i].name);
        }

        let languages = []; // Saving languages into an array
        for (let i = 0 ; i < (country.languages).length ; i++) {
            languages.push(country.languages[i].name);
        }
        
        let bordersName = []; // Saving all botders into an array
        for (let i = 0 ; i < (country.borders).length ; i++) {
            let code2 = country.borders[i];
            console.log(code2);
            bordersName.push(`<button class="btnCountries btn-primary" onclick="countryInfo('`+code2 +`')"> `+country.borders[i] +`</button>`);
        }
        

        let el = $('#countrieslist');
        el.html('');
        let na = $('#content-search');
        na.html(`
            <div id="content-search" class="content-search">
                <a href="./"><button id="btnFA" class="btn2 btn-primary">
                <i class="icon fas fa-arrow-left"></i>
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
            <div id="searchInfo" class="searchInfo">        
            <h1 class="searchTitle">${country.name}</h1><div class="SearchInfoItens"><ul><li><span class="card-text">Native Name: </span>${country.nativeName}</li>
            <li><span class="card-text">Population: </span>${country.population.toLocaleString('en-US')}</li><li><span class="card-text">Region: </span>${country.region}</li>
            <li><span class="card-text">Sub Region: </span>${country.subregion}</li><li><span class="card-text">Capital: </span>${country.capital}</li></ul>
            <div class="rigthItens col-sm"><ul><li><span class="card-text">Top Level Domain: </span>${country.topLevelDomain}</li>
            <li><span class="card-text">Currencies: </span>${currency.join(", ")}</li><li><span class="card-text">Languages: </span>${languages.join(", ")}</li></ul>
            </div></div>            
            <div id="newbottomtest" class="searchBottom"><span class="card-text">Border Countries: ${bordersName.join(" ")}</span></div>
            </div>
            </div></div>`  
            el.html(elAppend); //prepend
             
    }

    // Change the theme to dark
    function dark() {

        // Cleaning navbar content to set a different one
        let el = $('#navbar');
        el.html(''); 
        el.html(` 
        <div class="nav-container container-fluid">
            <a class="navbar-icon">Where in the world?</a>
            <span onclick="ligh()" class="navbar-dark-mode">
            <i class="icon fas fa-moon"></i>Dark Mode
            </span>
        </div>`);

        // Changing the color of each element
        var searchback = document.getElementsByClassName('content-search');
        for(var i = 0; i < searchback.length; i++){
            searchback[i].style.backgroundColor = "hsl(207, 26%, 17%)";
        }

        var elements = document.getElementsByClassName('card'); 
        for(var i = 0; i < elements.length; i++){
            elements[i].style.backgroundColor = "hsl(209, 23%, 22%)";
            elements[i].style.color = "hsl(0, 0%, 100%)";
        }

        var elements = document.getElementsByClassName('btn'); 
        for(var i = 0; i < elements.length; i++){
            elements[i].style.backgroundColor = "hsl(209, 23%, 22%)";
            elements[i].style.color = "hsl(0, 0%, 100%)";
        }

        var elements = document.getElementsByClassName('btn2'); 
        for(var i = 0; i < elements.length; i++){
            elements[i].style.backgroundColor = "hsl(209, 23%, 22%)";
            elements[i].style.color = "hsl(0, 0%, 100%)";
        }

        var elements = document.getElementsByClassName('dropdown-menu'); 
        for(var i = 0; i < elements.length; i++){
            elements[i].style.backgroundColor = "hsl(209, 23%, 22%)";
        }

        var elements = document.getElementsByClassName('dropdown-item');
        for(var i = 0; i < elements.length; i++){
            elements[i].style.backgroundColor = "hsl(209, 23%, 22%)";
            elements[i].style.color = "hsl(0, 0%, 100%)";
        }

        var elements = document.getElementsByClassName('searchInfo'); 
        for(var i = 0; i < elements.length; i++){
            elements[i].style.color = "hsl(0, 0%, 100%)";
        }

        var elements = document.getElementsByClassName('btnCountries'); 
        for(var i = 0; i < elements.length; i++){
            elements[i].style.backgroundColor = "hsl(209, 23%, 22%)";
            elements[i].style.color = "hsl(0, 0%, 100%)";
        }

        // Changing the color of the elements by its id
        document.body.style.backgroundColor = "hsl(207, 26%, 17%)";
        document.getElementById('countrieslist').style.backgroundColor = "hsl(207, 26%, 17%)";  
        document.getElementById('content-search').style.backgroundColor = "hsl(207, 26%, 17%)";   
        document.getElementById('navbar').style.backgroundColor = "hsl(209, 23%, 22%)";  
        document.getElementById('navbar').style.color = "hsl(0, 0%, 100%)";  
        document.getElementById('country-search').style.backgroundColor = "hsl(209, 23%, 22%)";  
        document.getElementById('btnFA').style.backgroundColor = "hsl(209, 23%, 22%)";  
        
    }

    // Change the theme back to light
    function ligh() {

        // Cleaning and setting a new navbar
        let el = $('#navbar');
        el.html('');
        el.html(` 
        <div class="nav-container container-fluid">
            <a class="navbar-icon">Where in the world?</a>
            <span onclick="dark()" class="navbar-dark-mode">
            <i class="icon far fa-moon"></i>Dark Mode
            </span>
        </div>`);

        // Changing the color of each element
        var searchback = document.getElementsByClassName('content-search');
        for(var i = 0; i < searchback.length; i++){
            searchback[i].style.backgroundColor = "hsl(0, 0%, 98%)";
        }

        var elements = document.getElementsByClassName('card'); 
        for(var i = 0; i < elements.length; i++){
            elements[i].style.backgroundColor = "hsl(0, 0%, 100%)";
            elements[i].style.color = "black";
        }

        var elements = document.getElementsByClassName('btn');
        for(var i = 0; i < elements.length; i++){
            elements[i].style.backgroundColor = "hsl(0, 0%, 100%)";
            elements[i].style.color = "black";
        }

        var elements = document.getElementsByClassName('btn2');
        for(var i = 0; i < elements.length; i++){
            elements[i].style.backgroundColor = "hsl(0, 0%, 100%)";
            elements[i].style.color = "black";
        }

        var elements = document.getElementsByClassName('dropdown-menu');
        for(var i = 0; i < elements.length; i++){
            elements[i].style.backgroundColor = "hsl(0, 0%, 100%)";
        }

        var elements = document.getElementsByClassName('dropdown-item');
        for(var i = 0; i < elements.length; i++){
            elements[i].style.backgroundColor = "hsl(0, 0%, 100%)";
            elements[i].style.color = "black";
        }

        var elements = document.getElementsByClassName('searchInfo');
        for(var i = 0; i < elements.length; i++){
            elements[i].style.color = "black";
        }

        var elements = document.getElementsByClassName('btnCountries'); 
        for(var i = 0; i < elements.length; i++){
            elements[i].style.backgroundColor = "hsl(0, 0%, 100%)";
            elements[i].style.color = "black";
        }

        document.body.style.backgroundColor = "hsl(0, 0%, 98%)";
        document.getElementById('countrieslist').style.backgroundColor = "hsl(0, 0%, 98%)";     
        document.getElementById('content-search').style.backgroundColor = "hsl(0, 0%, 98%)";   
        document.getElementById('navbar').style.backgroundColor = "hsl(0, 0%, 100%)";  
        document.getElementById('navbar').style.color = "black";  
        document.getElementById('country-search').style.backgroundColor = "hsl(0, 0%, 100%)";  

    }

    
