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
  // Don't forget to handle those cases where data is not available.
  /*
    // Sorry JSON, You are absolutely dope, but I can do this with array also, so I'll go with that, love you.
  let requiredDataStructure = {}

  for (let i = 0; i < data.length; i++) {
    requiredDataStructure[data[i]["Date"].slice(0, 10)] = {
      "confirmedCase": data[i]["Confirmed"],
      "activeCase": data[i]["Active"],
      "death": data[i]["Deaths"],
      "recovered": data[i]["Recovered"],
    };
  };
  console.log(requiredDataStructure["2020-10-02"]);
  */
  if (!data) {
    console.log("No Data Found");
  }
  else {
    let dates = []
    let confirmedCases = []
    let activeCases = []
    let deaths = []
    let recoveredPatients = []

    for (let i = 0; i < data.length; i++) {
      dates.push([data[i]["Date"].slice(0, 10)])
      confirmedCases.push(data[i]["Confirmed"])
      activeCases.push(data[i]["Active"])
      deaths.push(data[i]["Deaths"])
      recoveredPatients.push(data[i]["Recovered"])
    };

    // To clear the canvas if there is any chart available there.
    document.querySelector("#chartReport").innerHTML = "<canvas id='canvas'></canvas>";

    const ctx = document.getElementById('canvas');

    new Chart(ctx, {
      type: 'line',
      data: {
        // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        labels: dates,
        datasets: [{
          label: 'Confirmed Cases',
          // data: [2, 4, 6, 8, 16, 32],
          data: confirmedCases,
          backgroundColor: 'transparent',
          borderColor: 'darkRed',
          borderWidth: 0.5
        },
        {
          label: 'Active Cases',
          // data: [13, 20, 6, 8, 1, 9],
          data: activeCases,
          backgroundColor: 'transparent',
          borderColor: 'purple',
          borderWidth: 0.5
        },
        {
          label: 'Recovered',
          // data: [2, 3, 4, 5, 6, 7],
          data: recoveredPatients,
          backgroundColor: 'transparent',
          borderColor: 'lightGreen',
          borderWidth: 0.5
        },
        {
          label: 'Deaths',
          // data: [12, 19, 3, 5, 2, 3],
          data: deaths,
          backgroundColor: 'transparent',
          borderColor: 'red',
          borderWidth: 0.5
        }
        ]
      },
      options: {
        elemenst: {
          line: {
            tension: 0
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
