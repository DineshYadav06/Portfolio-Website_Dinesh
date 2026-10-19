/**
 * Lightweight local JSON data service for PortfolioAPI.
 * Loads skills, projects, and experience dynamically from local JSON files.
 */
(function () {
  const base = (document.body && document.body.dataset.base) || "./";
  const SOURCES = {
    skills: base + "skills.json",
    projects: base + "projects/projects.json",
    experience: base + "experience/experience.json"
  };

  async function fromJson(name) {
    const res = await fetch(SOURCES[name]);
    if (!res.ok) throw new Error("Failed to load " + name);
    const data = await res.json();
    return Array.isArray(data) ? data : data.items || [];
  }

  window.PortfolioAPI = {
    async load(name) {
      return fromJson(name);
    }
  };
})();
