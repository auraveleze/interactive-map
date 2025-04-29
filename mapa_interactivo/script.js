const authorData = {
  CO: [
    {
      city: "Medellín",
      authors: 5,
      locations: ["Sabaneta", "Itagüí"]
    },
    {
      city: "Bogotá",
      authors: 8,
      locations: ["Suba", "Usaquén"]
    }
  ],
  MX: [
    {
      city: "CDMX",
      authors: 12,
      locations: ["Coyoacán", "Tlalpan"]
    },
    {
      city: "Guadalajara",
      authors: 4,
      locations: ["Zapopan", "Tlaquepaque"]
    }
  ],

  US: [
      {
        city: "New York",
        authors: 33,
        locations: ["Prigstone", "oklahomma"]
      },
      {
        city: "Chicago",
        authors: 4,
        locations: ["Bruklin", "BelAir"]
      }
    ],
  
};

document.addEventListener("DOMContentLoaded", () => {
  const svgObject = document.getElementById("svgmap");

  svgObject.addEventListener("load", () => {
    const svgDoc = svgObject.contentDocument;

    /* color base - mapa */
    const allPaths = svgDoc.querySelectorAll("path");
    allPaths.forEach(path => {
      path.style.fill = "#798086";
    });

    /* interacciones de países con datos */
    for (let code in authorData) {
      const country = svgDoc.getElementById(code);
      if (country) {
        country.style.fill = "#FF6B6B"; /*hover*/
        country.style.cursor = "pointer";

        // Hover
        country.addEventListener("mouseenter", () => {
          country.style.fill = "#D00000"; //* verde oscuro */
        });

        country.addEventListener("mouseleave", () => {
          country.style.fill = "#FF6B6B"; //* volver a verde normal */
        });

        // Click para mostrar tooltip
        country.addEventListener("click", (e) => {
          const mapBox = svgObject.getBoundingClientRect();
          showTooltip(code, e.pageX - mapBox.left, e.pageY - mapBox.top);
        });
      }
    }
  });
});

function showTooltip(code, x, y) {
  const tooltip = document.getElementById("tooltip");
  const info = authorData[code] || [];

  let html = `<strong>Autores en ${code}</strong><br>`;
  info.forEach(city => {
    html += `
      <div style="margin-top: 8px">
        📍 <strong>${city.city}</strong><br>
        Autores: ${city.authors}<br>
        Municipios: ${city.locations.join(", ")}
      </div>
    `;
  });

  tooltip.innerHTML = html;
  tooltip.style.display = "block"; // Necesario para que tenga dimensiones

  // Esperar un frame para que el DOM mida bien
  requestAnimationFrame(() => {
    const tooltipRect = tooltip.getBoundingClientRect();
    const containerRect = document.getElementById("map-container").getBoundingClientRect();

    let left = x + 30;
    let top = y;

    // Correcciones para que no se salga del contenedor
    if (left + tooltipRect.width > containerRect.width) {
      left = containerRect.width - tooltipRect.width - 10;
    }

    if (top + tooltipRect.height > window.innerHeight) {
      top = window.innerHeight - tooltipRect.height - 20;
    }

    if (top < 0) top = 10;
    if (left < 0) left = 10;

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  });
}
