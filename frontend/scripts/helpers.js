document.addEventListener("DOMContentLoaded", function () {
  const glossary = document.getElementById("glossary");
  const glossaryButton = document.getElementById("glossary-btn");
  const mindmap = document.getElementById("mindmap");
  const mindmapButton = document.getElementById("mindmap-btn");

  function switchToGlossary() {
    glossaryButton.classList.toggle("active", true);
    mindmapButton.classList.toggle("active", false);
    glossary.classList.toggle("active", true);
    mindmap.classList.toggle("active", false);
  }

  function switchToMindmap() {
    glossaryButton.classList.toggle("active", false);
    mindmapButton.classList.toggle("active", true);
    glossary.classList.toggle("active", false);
    mindmap.classList.toggle("active", true);
  }

  glossaryButton.addEventListener("click", switchToGlossary);
  mindmapButton.addEventListener("click", switchToMindmap);

  switchToGlossary();
});
