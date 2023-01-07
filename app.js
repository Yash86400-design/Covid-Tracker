window.onload = function () {
  if ("array" in localStorage && "object" in localStorage) {
    const countriesArray = JSON.parse(localStorage.getItem("array"))
    const countriesObject = JSON.parse(localStorage.getItem("object"))
    createSelectItem(countriesArray, countriesObject)
  } else {
    fetchCountries()
    // console.log("I Hope You Are not get called");
  }
  currentDateForSecondDate()
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
  graphDraw(country, firstDate, lastDate)
};

function fetchCountries() {
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
  if (content === "India") {
    option.textContent = content;
    option.value = value;
    option.selected = true;
  }
  option.textContent = content;
  option.value = value;
  return option;
};

function graphDraw(country, firstDate, lastDate) {
  const requiredFirstDate = firstDate + "T00:00:00Z"
  const requiredLastDate = lastDate + "T00:00:00Z"

  fetch(`https://api.covid19api.com/country/${country}?from=${requiredFirstDate}&to=${requiredLastDate}`)
    .then((response) => response.json())
    .then((data) => draw(data))
}

function currentDateForSecondDate() {
  // We'll do it later just before production.
}

function draw(data) {
  console.log(data);
  // Don't forget to handle those cases where data is not available.

  let requiredDataStructure = {}

  for (let i = 0; i < data.length; i++) {
    requiredDataStructure[data[i]["Date"].slice(0, 10)] = {
      "confirmedCase": data[i]["Confirmed"],
      "activeCase": data[i]["Active"],
      "death": data[i]["Deaths"],
      "recovered": data[i]["Recovered"],
    };
  };

  // console.log(countryName);
  console.log(requiredDataStructure);

}
