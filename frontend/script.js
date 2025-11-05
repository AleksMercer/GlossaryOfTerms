const isLocalhost = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';
const USE_BACKEND = isLocalhost;
const API_URL = 'http://127.0.0.1:8000/terms';
const LOCAL_URL = 'data/terms.json';

const DATA_URL = USE_BACKEND ? API_URL : LOCAL_URL;

fetch(DATA_URL)
  .then((res) => {
    if (!res.ok) throw new Error(`Ошибка HTTP ${res.status}`);
    return res.json();
  })
  .then((terms) => {
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
      <strong>${term.term}:</strong> ${term.definition}
      ${term.source ? `<a href="${term.source}" target="_blank">[Источник]</a>` : ""}
    `;
    list.appendChild(li);
  });
}

function drawMindMap(terms) {
  const nodes = new vis.DataSet(
    terms.map((term) => ({ id: term.id, label: term.term }))
  );

  const edges = new vis.DataSet(
    terms.slice(1).map((term) => ({ from: terms[0].id, to: term.id }))
  );

  const container = document.getElementById("network");
  const data = { nodes, edges };
  const options = {
    layout: { improvedLayout: true },
    physics: { stabilization: true },
  };

  new vis.Network(container, data, options);
}
