window.onload = function insertingCountryList() {

  // let country = getData();
  // let option = document.createElement("option");

  // const countryList = document.querySelector("#country");
  // countryList.appendChild(createSelectItem());


  // console.log(country);
  insertCountriesInSelectBar()
}

const button = document.querySelector("#submitButton");
button.addEventListener("click", dataGather);

const countryList = document.querySelector("#country");
// dropDown.addEventListener("click", (event) => { console.log(event); })

function dataGather(event) {
  event.preventDefault()
  const country = document.querySelector("#country").value;
  const firstDate = document.querySelector("#firstDate").value;
  const lastDate = document.querySelector("#lastDate").value;

  console.log(country, firstDate, lastDate);
};

function insertCountriesInSelectBar() {
  fetch("https://api.covid19api.com/countries")
    .then((response) => response.json())
    .then(function (responseData) {
      let countries = {}
      // let countries = []

      for (let country = 0; country < responseData.length; country++) {
        countries[responseData[country]["Country"]] = responseData[country]["Slug"]
      }
      createSelectItem(countries);
    });
};

function createSelectItem(data) {
  console.log(typeof (data));
  const select = document.querySelector("select")
  for (const property in data) {
    console.log(`${property}: ${data[property]}`);
    select.appendChild(createOptionItem(property, data[property]))
  }

}

function createOptionItem(content, value) {
  let option = document.createElement("option");
  option.textContent = content;
  option.value = value;
  return option;
};