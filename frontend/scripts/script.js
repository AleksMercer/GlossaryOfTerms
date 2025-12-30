const API_CONFIG = window.API_CONFIG || {
  mode: "auto",
  backendUrl: "http://localhost:8000/terms",
  localUrl: "data/terms.json",
};

let USE_BACKEND = false;
let DATA_URL = API_CONFIG.localUrl;

if (
  API_CONFIG.mode === "backend" ||
  (API_CONFIG.mode === "auto" &&
    (window.location.hostname === "127.0.0.1" ||
      window.location.hostname === "localhost"))
) {
  USE_BACKEND = true;
  DATA_URL = API_CONFIG.backendUrl;
}

fetch(DATA_URL)
  .then((res) => {
    if (!res.ok) throw new Error(`Ошибка HTTP ${res.status}`);
    return res.json();
  })
  .then((terms) => {
    if (DATA_URL !== LOCAL_URL) {
      terms.forEach((term) => {
        if (term.related) {
          term.related = term.related
            .split(",")
            .map((id) => parseInt(id.trim()))
            .filter((id) => !isNaN(id));
        } else {
          term.related = [];
        }
      });
    }

    displayTerms(terms);
    drawMindMap(terms);
  })
  .catch((err) => {
    console.error("Ошибка при загрузке терминов:", err);
    if (USE_BACKEND && DATA_URL !== API_CONFIG.localUrl) {
      console.log("Пробуем загрузить локальные данные...");
      DATA_URL = API_CONFIG.localUrl;
      USE_BACKEND = false;
      fetch(DATA_URL)
        .then((res) => res.json())
        .then((terms) => {
          displayTerms(terms);
          drawMindMap(terms);
        })
        .catch((e) => console.error("Не удалось загрузить данные:", e));
    }
  });
function displayTerms(terms) {
  const list = document.getElementById("term-list");
  list.innerHTML = "";
  terms.forEach((term) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <p class="title">${term.term}</p>
      <p class="description">${term.definition}</p>
      <a href="${term.source}" class="source" target="_blank" rel="noopener noreferrer">Источник</a>
    `;
    list.appendChild(li);
  });
}

function drawMindMap(terms) {
  const nodes = new vis.DataSet(
    terms.map((term) => ({
      id: term.id,
      label: term.term,
    }))
  );

  const edgesArray = [];
  terms.forEach((term) => {
    if (term.related && Array.isArray(term.related)) {
      term.related.forEach((targetId) => {
        edgesArray.push({ from: term.id, to: targetId });
      });
    }
  });

  const edges = new vis.DataSet(edgesArray);

  const data = { nodes, edges };

  const container = document.getElementById("network");
  const options = {
    layout: { improvedLayout: true },
    physics: { stabilization: true },
  };

  const network = new vis.Network(container, data, options);

  network.once("afterDrawing", function () {
    network.fit();
  });
}
