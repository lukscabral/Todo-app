
// src/armazenamento.js
class Storage {
    static load() {
        const data = localStorage.getItem('projects');
        if (data) {
            const projects = JSON.parse(data);
            // Garante que cada projeto tenha a propriedade `tasks`
            return projects.map(project => ({
                ...project,
                tasks: project.tasks || [] 
            }));
        }
        return []; // Retorna uma lista vazia se não houver dados
    }

    static save(projects) {
        localStorage.setItem('projects', JSON.stringify(projects));
    }
}

export default Storage;
