$(document).ready(function () {
  $("#act").on("click", function () {
    obtenerClima();
  });
});

function obtenerClima() {
  const API_KEY = WEATHER_API_KEY; // Usar variable global de config.js
  if (!API_KEY) {
    $("#ver").html(
      '<div style="color: red;">API key no encontrada. Verifica tu archivo config.js</div>'
    );
    return;
  }
  const ciudad = "Montevideo";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric`;

  const $ver = $("#ver");
  $ver.html('<div class="loading">Cargando datos del clima...</div>');

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod !== 200) {
        $ver.html(`<div style="color: red;">Error: ${data.message}</div>`);
        return;
      }
      const t = Math.round(data.main.temp);
      const tmax = Math.round(data.main.temp_max);
      const tmin = Math.round(data.main.temp_min);
      const des = data.weather[0].description;
      const icon = data.weather[0].icon;
      const pais = data.sys.country;

      const urlIcono = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      $ver.html(`
        <div class="weather-info">
          <img src="${urlIcono}" alt="Icono del clima" class="weather-icon">
          <div class="temp-main">${t}°C</div>
          <div><strong>Descripción:</strong> ${des}</div>
          <div><strong>Máxima:</strong> ${tmax}°C</div>
          <div><strong>Mínima:</strong> ${tmin}°C</div>
          <div><strong>País:</strong> ${pais}</div>
        </div>
      `);
    })
    .catch((err) => {
      $ver.html(`<div style="color: red;">Error: ${err.message}</div>`);
      console.error("Error:", err);
    });
}
// ...no pongas alert(obtenerClima());
