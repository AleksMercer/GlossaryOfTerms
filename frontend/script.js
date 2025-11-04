fetch("data/terms.json")
  .then((response) => response.json())
  .then((terms) => {
    displayTerms(terms);
    drawMindMap(terms);
  })
  .catch((err) => console.error("Ошибка при загрузке терминов:", err));


  function displayTerms(terms) {
  const list = document.getElementById("term-list");
  terms.forEach((term) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${term.term}:</strong> ${term.definition} <a href="${term.source}" target="_blank">[Источник]</a>`;
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
