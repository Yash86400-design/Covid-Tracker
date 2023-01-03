function data() {
  fetch("https://api.covid19api.com/countries")
    .then((response) => (response.json())
      .then(function (data) {
        let countries = []
        for (let country = 0; country < data.length; country++) {
          countries.push(data[country]["Country"]);
        };
        countries.sort()
        return countries;
      })
    )
};

export { data }