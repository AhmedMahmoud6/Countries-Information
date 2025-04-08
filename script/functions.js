function createCountries(countriesContainer, name, flag, population, region, capital) {
    let countryName = document.createElement("div");
    countryName.setAttribute("id", name);

    let countryATag = document.createElement("a");
    countryATag.href = "country.html";

    let imageCont = document.createElement("div");
    imageCont.setAttribute("class", "image-container");

    let countryFlag = document.createElement("img");
    countryFlag.src = flag;
    
    let countryInfo = document.createElement("div");
    countryInfo.setAttribute("class", "info");

    let infoH2 = document.createElement("h2");
    infoH2.textContent = name;

    let populationP = document.createElement("p");
    let populationSpan = document.createElement("span");
    populationSpan.textContent = "Population:";

    populationP.innerHTML = `${populationSpan.outerHTML} ${population}`;

    let RegionP = document.createElement("p");
    let RegionSpan = document.createElement("span");
    RegionSpan.textContent = "Region:";

    RegionP.innerHTML = `${RegionSpan.outerHTML} ${region}`;

    if (typeof capital != "undefined") {
        let capitalP = document.createElement("p");
        let CapitalSpan = document.createElement("span");
        CapitalSpan.textContent = "Capital:";
    
        capitalP.innerHTML = `${CapitalSpan.outerHTML} ${capital}`;

        countryInfo.append(infoH2, populationP, RegionP, capitalP);
        
    } else {
        countryInfo.append(infoH2, populationP, RegionP);
    }

    imageCont.appendChild(countryFlag)

    countryName.append(countryATag, imageCont, countryInfo)

    countriesContainer.appendChild(countryName)
}

function displayCountry(countrySect, data) {

    for (let obj of data) {

        if (obj.name === JSON.parse(localStorage.getItem("currentCountry"))) { // the provided country
            let languages = obj.languages.map(element => element.name).join(", ");
            let currencies = typeof obj.currencies == "undefined" ? "" : obj.currencies.map(element => element.code).join(", ");
            
            const myDetails = `
            <img src="${obj.flags.svg}" alt="">

            <div class="details">
                <div class="title">
                    <h1>${obj.name}</h1>
                </div>

                <div class="desc">
                    <div class="part-1">
                        <p><span>Native Name:</span> ${obj.nativeName}</p>
                        <p><span>Population:</span> ${obj.population}</p>
                        <p><span>Region:</span> ${obj.region}</p>
                        <p><span>Sub Region:</span> ${obj.subregion}</p>
                        ${typeof obj.capital == "undefined" ? "" : `<p><span>Capital:</span> ${obj.capital}</p>`}
                    </div>
                    <div class="part-2">
                        <p><span>Top Level Domain:</span> ${obj.topLevelDomain}</p>
                        ${typeof obj.currencies == "undefined" ? "" : `<p><span>Currencies:</span> ${currencies}</p>`}
                        
                        <p><span>Languages:</span> ${languages}</p>
                    </div>
                </div>

                <div class="borders">
                    ${typeof obj.borders == "undefined" ? "" : `<p><strong>Border Countries:</strong></p>`}
                    
                </div>

            </div>
            `
            countrySect.innerHTML += myDetails;

            let bordersP = document.querySelector(".borders p");
            typeof obj.borders == "undefined" ? "" : obj.borders.forEach(element => {
                for (let i of data) {
                    if (element === i.alpha3Code) {
                        let currBorder = `<span>${i.name}</span>`
                        bordersP.innerHTML += currBorder;
                    }
                }
             });
        }
    }


}


async function getCountries() {
    try {
        let myResponse = await fetch("data.json");

        if (!myResponse.ok) {
            throw new Error(myResponse.statusText)
        }
        let myData = await myResponse.json();
        return myData;
    } catch(error) {
        throw error;
    }
}



function darkMode() {
    localStorage.setItem("theme", "dark");
    
    document.documentElement.style.setProperty('--background-color', '#202d36');
    document.documentElement.style.setProperty('--nav-color', '#2b3743');
    document.documentElement.style.setProperty('--nav-text-color', "white")


}

function lightMode(moonImg, filterArrow) {
    localStorage.setItem("theme", "light");
    document.documentElement.style.setProperty('--background-color', '#fafafa');
    document.documentElement.style.setProperty('--nav-color', 'white');
    document.documentElement.style.setProperty('--nav-text-color', "black")

}