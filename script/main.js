let countriesContainer = document.querySelector(".countries");
let theme = document.querySelector(".theme");
let moonImg = document.querySelector(".theme img")
let filterArrow = document.querySelector(".cont img");
let searchCountry = document.querySelector(".search input");
let regionFilter = document.querySelector(".region");
let regionText = document.querySelector(".region p");
let regionContent = document.querySelector(".region-content");
let displayed = false;

if (localStorage.getItem("theme")) {
    if (localStorage.getItem("theme") === "light") {
        lightMode()
        moonImg.src = "../dark_mode.svg";
        filterArrow.src = "../arrow_down.svg";

    } else {
        darkMode()
        moonImg.src = "../light_mode.svg";
        filterArrow.src = "../arrow_down_light.svg";
    }
} else {
    localStorage.setItem("theme", "light");
    lightMode()
}

getCountries().then(data => {
    // display all countries
    data.forEach(element => {
        createCountries(countriesContainer, element.name, element.flags.svg, element.population, element.region, element.capital);
    });

    // search country
    searchCountry.addEventListener("input", _ => {
        regionText.textContent = "Filter by Region"
        if (searchCountry.value != "") {
            countriesContainer.innerHTML = "";
            for (let ele of data) {
                if (ele.name.toLowerCase().startsWith(searchCountry.value.toLowerCase())) {
                    createCountries(countriesContainer, ele.name, ele.flags.svg, ele.population, ele.region, ele.capital);
                }
            }
        } else {
            countriesContainer.innerHTML = "";
            for (let ele of data) {
                createCountries(countriesContainer, ele.name, ele.flags.svg, ele.population, ele.region, ele.capital);
            }
        }
    });
    

})



theme.addEventListener("click", _ => {

    if (localStorage.getItem("theme") === "light") {
        darkMode()
        moonImg.src = "../light_mode.svg";
        filterArrow.src = "../arrow_down_light.svg";
    } else {
        lightMode()
        moonImg.src = "../dark_mode.svg";
        filterArrow.src = "../arrow_down.svg";
    }
})

document.addEventListener("click", e => {
    // close the region menu
    if (!(e.target.classList[0] === "cont" || e.target.parentElement.classList[0] === "cont")) {
        regionContent.style = "display: none";
        displayed = false;
    }

    // filter by region
    if (e.target.localName === "li") {
        regionText.textContent = e.target.textContent;
        getCountries().then(data => {
            countriesContainer.innerHTML = "";
            data.forEach(obj => {
                if (obj.region === e.target.textContent) {
                    createCountries(countriesContainer, obj.name, obj.flags.svg, obj.population, obj.region, obj.capital);
                }
            })
        })
    }

    // update the country details page with the clicked one
    if (e.target.localName === "a") {
        let currentCountry = e.target.parentElement.id;
        localStorage.setItem("currentCountry", JSON.stringify(currentCountry));
    }
});

// region menu open and closure
regionFilter.addEventListener("click", _ => {
    displayed = !displayed;

    if (displayed) {
        regionContent.style = "display: block";
    } else {
        regionContent.style = "display: none";
    }
})
