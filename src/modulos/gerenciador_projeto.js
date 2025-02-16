// gerenciador_projeto.js
import { format } from 'date-fns';
import Storage from './armazenamento.js';
import DOMHandler from './DOM.js';

class ProjectManager {
    constructor() {
        this.projects = Storage.load();
    }

    addProject(name) {
        const newProject = {
            id: Date.now(),
            name,
            createdAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
        };
        this.projects.push(newProject);
        Storage.save(this.projects);
        DOMHandler.renderProject(newProject, this);
    }

    deleteProject(id) {
        this.projects = this.projects.filter(project => project.id !== id);
        Storage.save(this.projects);
        DOMHandler.removeProject(id);
    }

    editProject(id, newName) {
        const project = this.projects.find(proj => proj.id === id);
        if (project) {
            project.name = newName;
            Storage.save(this.projects);
            DOMHandler.updateProject(project, this);
        } else {
            console.error("Projeto não encontrado!");
        }
    
    }
    getProjects() {
        return this.projects;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const manager = new ProjectManager();
    DOMHandler.initialize(manager);
});

export default ProjectManager;