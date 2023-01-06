window.onload = function insertingCountryList() {
  if ("array" in localStorage && "object" in localStorage) {
    const countriesArray = JSON.parse(localStorage.getItem("array"))
    const countriesObject = JSON.parse(localStorage.getItem("object"))
    createSelectItem(countriesArray, countriesObject)
  } else {
    fetchListOfCountries()
    // console.log("I Hope You Are not get called");
  }
}

const button = document.querySelector("#submitButton");
button.addEventListener("click", dataGather);

const countryList = document.querySelector("#country");

function dataGather(event) {
  event.preventDefault()
  const country = document.querySelector("select").value;
  const firstDate = document.querySelector("#firstDate").value;
  const lastDate = document.querySelector("#lastDate").value;

  console.log(country, firstDate, lastDate);
};

function fetchListOfCountries() {
  fetch("https://api.covid19api.com/countries")
    .then((response) => response.json())
    .then(function (responseData) {
      let countriesAndSlugObject = {}
      let countries = []

      for (let country = 0; country < responseData.length; country++) {
        countriesAndSlugObject[responseData[country]["Country"]] = responseData[country]["Slug"]
        countries.push(responseData[country]["Country"])
      }
      countries = countries.sort()
      localStorage.setItem("array", JSON.stringify(countries))
      localStorage.setItem("object", JSON.stringify(countriesAndSlugObject))
      // createSelectItem(countries);
    });
};

function createSelectItem(data, objectOfSlug) {
  data = data.sort()
  const select = document.querySelector("select")
  for (let i = 0; i < data.length; i++) {
    select.appendChild(createOptionItem(data[i], objectOfSlug[data[i]]))
  }
}

function createOptionItem(content, value) {
  let option = document.createElement("option");
  option.textContent = content;
  option.value = value;
  return option;
};