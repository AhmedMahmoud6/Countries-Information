let countrySection = document.querySelector(".country-section");
let moonImg = document.querySelector(".theme img")
let filterArrow = document.querySelector(".back-btn img");
let theme = document.querySelector(".theme");

getCountries().then(data => {
    displayCountry(countrySection, data)
})

if (localStorage.getItem("theme")) {
    if (localStorage.getItem("theme") === "light") {
        lightMode();
        moonImg.src = "dark_mode.svg";
        filterArrow.src = "arrow_left.svg"
    } else {
        darkMode();
        moonImg.src = "light_mode.svg";
        filterArrow.src = "keyboard_light.svg"
    }
} else {
    localStorage.setItem("theme", "light");
    lightMode()
}

theme.addEventListener("click", _ => {

    if (localStorage.getItem("theme") === "light") {
        darkMode()
        moonImg.src = "light_mode.svg";
        filterArrow.src = "keyboard_light.svg"
    } else {
        lightMode()
        moonImg.src = "dark_mode.svg";
        filterArrow.src = "arrow_left.svg"
    }
})