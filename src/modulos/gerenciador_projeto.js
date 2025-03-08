// gerenciador_projeto.js
import { format } from 'date-fns';
import Storage from './armazenamento.js';
import DOMHandler from './DOM.js';

class ProjectManager {
    constructor() {
        this.projects = Storage.load();
        DOMHandler.initialize(this);
    }

    addProject(name) {
        const newProject = {
            id: Date.now(),
            name,
            createdAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            tasks:[]
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
        const project = this.projects.find(proj => proj.id === Number(id));
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

    addTaskToProject(project_id,task_name){
        const project = this.projects.find(project => project.id === project_id);
        //console.log("Projeto Encontrado:", project);
        if(project){
            const new_task = {
                id: Date.now(),
                name: task_name,
                createdAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                completed: false
            };
            project.tasks.push(new_task);
            Storage.save(this.projects);
            DOMHandler.renderTask(new_task, project_id, this);
            //console.log("Tarefa Adicionada:", new_task);
            return new_task;
        } else {
            console.error("Projeto não encontrado.");
        return null;
        }
    }

    deleteTaskFromProject(project_id, task_id) {
        const project = this.projects.find(project => project.id === project_id);
        if(project){
            project.tasks = project.tasks.filter(task => task.id !== task_id);
            Storage.save(this.projects);
            DOMHandler.removeTask(task_id);
        }
    }

    editTaskFromProject(project_id,task_id, new_task){
        const project = this.projects.find(project => project.id === project_id);
        if(project){
            const taskIndex = project.tasks.findIndex(task => task.id === task_id);
            if(taskIndex !== -1){
                project.tasks[taskIndex] = { ...project.tasks[taskIndex], ...new_task };
                Storage.save(this.projects);
                DOMHandler.updateTask(project, project.tasks[taskIndex], this);
                return true;
            }
        }
        return false;
    }
}

export default ProjectManager;