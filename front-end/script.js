const colorInputEl = document.getElementById("colorInput");
const yearInputEl = document.getElementById("yearInput");
const getAllCarsEl = document.getElementById("getAllCars");
const container = document.getElementById("container");
const searchBtn = document.getElementById("search");
const BASE_URL = "http://localhost:3000";

getAllCarsEl.addEventListener("click", getAllCars);
searchBtn.addEventListener("click", searchCarColor);

async function getAllCars() {
  container.innerHTML = "";
  const r = await fetch(`${BASE_URL}/cars`);
  const data = await r.json();

  data.forEach((el) => {
    const divEl1 = document.createElement("div");
    const span = document.createElement("span");
    const span1 = document.createElement("span");
    const span2 = document.createElement("span");
    const span3 = document.createElement("span");

    divEl1.classList.add("elDiv");
    span.innerHTML = `Id: ${el.id}`;
    span1.innerHTML = `Color: ${el.color}`;
    span2.innerHTML = `Year: ${el.year}`;
    span3.innerHTML = `brandName: ${el.brand_Id}`;

    divEl1.append(span);
    divEl1.append(span1);
    divEl1.append(span2);
    divEl1.append(span3);
    container.append(divEl1);
  });
}

async function searchCarColor() {
  container.innerHTML = "";
  const value = colorInputEl.value;
  const valueYear = yearInputEl.value;

  console.log(typeof valueYear);
  const r = await fetch(`${BASE_URL}/cars?filter=${value}`);
  const res = await fetch(`${BASE_URL}/cars?filter=${valueYear}`);
  const data = (await r.json()) && (await res.json());
  const result = data.filter((el) =>
    valueYear !== "" && value !== ""
      ? el.color === value && el.year === +valueYear
      : el.color === value || el.year === +valueYear
  );
  result.forEach((el) => {
    const divEl1 = document.createElement("div");

    const span = document.createElement("span");
    const span1 = document.createElement("span");
    const span2 = document.createElement("span");
    const span3 = document.createElement("span");

    divEl1.classList.add("elDiv");

    span.innerHTML = `Id: ${el.id}`;
    span1.innerHTML = `Color: ${el.color}`;
    span2.innerHTML = `Year: ${el.year}`;
    span3.innerHTML = `brandName: ${el.brand_Id}`;

    divEl1.append(span);
    divEl1.append(span1);
    divEl1.append(span2);
    divEl1.append(span3);
    container.append(divEl1);
  });
}
