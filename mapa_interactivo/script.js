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
  
      for (let code in authorData) {
        const country = svgDoc.getElementById(code);
        if (country) {
          country.style.cursor = "pointer";
  
          country.addEventListener("click", (e) => {
            const box = country.getBoundingClientRect();
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
    tooltip.style.left = `${x + 30}px`;
    tooltip.style.top = `${y}px`;
    tooltip.style.display = "block";
  }
  