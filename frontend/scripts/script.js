const CONFIG = window.CONFIG || {
  mode: "static",
  backendUrl: "http://localhost:8000/terms",
  staticUrl: "data/terms.json",
};

let DATA_URL;

if (CONFIG.mode === "docker") {
  console.log("Режим: Docker (используется бэкенд)");
  DATA_URL = CONFIG.backendUrl;
} else {
  console.log("Режим: Статический (используется локальный JSON)");
  DATA_URL = CONFIG.staticUrl;
}

function loadData() {
  return fetch(DATA_URL)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Ошибка HTTP ${res.status} при загрузке данных`);
      }
      return res.json();
    })
    .then((terms) => {
      if (CONFIG.mode === "docker") {
        terms.forEach((term) => {
          if (term.related && typeof term.related === "string") {
            term.related = term.related
              .split(",")
              .map((id) => parseInt(id.trim()))
              .filter((id) => !isNaN(id));
          } else if (!term.related) {
            term.related = [];
          }
        });
      }
      return terms;
    });
}

loadData()
  .then((terms) => {
    displayTerms(terms);
    drawMindMap(terms);
  })
  .catch((err) => {
    console.error("Ошибка при загрузке терминов:", err);

    if (CONFIG.mode === "docker") {
      console.log("Пробуем загрузить локальные данные...");
      DATA_URL = CONFIG.staticUrl;
      CONFIG.mode = "static";
      loadData()
        .then((terms) => {
          displayTerms(terms);
          drawMindMap(terms);
        })
        .catch((e) => {
          console.error("Не удалось загрузить данные:", e);
      });
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
