
// src/armazenamento.js
class Storage {
    static load() {
        return JSON.parse(localStorage.getItem('projects')) || [];
    }

    static save(projects) {
        localStorage.setItem('projects', JSON.stringify(projects));
    }
}

export default Storage;

/*function loadProjects() {
    const projects = localStorage.getItem("projects");
    return projects ? JSON.parse(projects) : [];
}*/
