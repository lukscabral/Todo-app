
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
