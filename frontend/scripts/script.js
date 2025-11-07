const isLocalhost =
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname === "localhost";
const USE_BACKEND = isLocalhost;
const API_URL = "http://127.0.0.1:8000/terms";
const LOCAL_URL = "data/terms.json";

// const DATA_URL = USE_BACKEND ? API_URL : LOCAL_URL;
const DATA_URL = LOCAL_URL;

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
  .catch((err) => console.error("Ошибка при загрузке терминов:", err));

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
  // создаём узлы
  const nodes = new vis.DataSet(
    terms.map((term) => ({
      id: term.id,
      label: term.term,
    }))
  );

  // создаём массив связей
  const edgesArray = [];
  terms.forEach((term) => {
    if (term.related && Array.isArray(term.related)) {
      term.related.forEach((targetId) => {
        edgesArray.push({ from: term.id, to: targetId });
      });
    }
  });

  // превращаем массив связей в DataSet
  const edges = new vis.DataSet(edgesArray);

  // создаём объект данных для сети
  const data = { nodes, edges };

  // отрисовываем граф
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
