import { data } from "./countriesList.js";

const countries = data;

const button = document.querySelector("#submitButton");
button.addEventListener("click", dataGather)

function dataGather (event) {
  event.preventDefault()
  const country = document.querySelector("#country").value;
  const firstDate = document.querySelector("#firstDate").value;
  const lastDate = document.querySelector("#lastDate").value;

  console.log(country, firstDate, lastDate);
}