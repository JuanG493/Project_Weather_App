import "./style.css";
// const apiKey = process.env.WATHER_KEY;

function mkingElmnt(data) {
  let father = document.querySelector("#container");
  let icon = data.current.condition.icon
  let relativeDir = icon.replace(/\/\/cdn.weatherapi.com/g, '../src')

  father.innerHTML = `<div>
        <div>
            <div>
                <h2 class="city_name">${data.location.name}</h2>
                <h3 class="region"> ${data.location.region}</h3>
                <h5 class="country">${data.location.country}</h5>
            </div>            <div>
                <h2 class="temp_c">${data.current.temp_c}</h2>
                <h5 class="feelslike_c">feels like: ${data.current.feelslike_c} </h5>
            </div>
            <img class="iconCondition" src="${relativeDir}"></img>
            <h5 class="textCondition">${data.current.condition.text} </h5>
        </div>
        <div>
            <h2>Wind: ${data.current.wind_kph} </h2>
            <h2>Humidity: ${data.current.humidity} </h2>
            <h2>Time:${data.location.localtime} </h2>
        </div>
    </div>`;

}


function requestInfo(city) {
  let url = `http://api.weatherapi.com/v1/current.json?key=71d53f52951d418fa6c151801230509&q=${city}&aqi=no`;
  getData(url);
  async function getData(direction) {
    try {
      let data = await fetch(direction, { mode: "cors" });
      let infoJs = await data.json();
      mkingElmnt(infoJs);
    } catch (error) {
      console.error("Error fetching JSON data:", error);
    }
  }
}

const btnSearch = document.querySelector(".btnSearch");
btnSearch.addEventListener("click", () => {
  const city = document.querySelector("#searchCity");
  requestInfo(city.value);
});