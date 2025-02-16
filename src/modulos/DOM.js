
// src/DOM.js
class DOMHandler {
    static initialize(manager) {
        
        const app = document.getElementById('app');
        
        const title = document.createElement('h1');
        title.textContent = 'Gerenciador de Projetos';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'project-name';
        input.placeholder = 'Nome do Projeto';
        
        const button = document.createElement('button');
        button.id = 'add-project';
        button.textContent = 'Adicionar Projeto';
        button.addEventListener('click', () => {
            const projectName = input.value;
            if (projectName) {
                manager.addProject(projectName);
                input.value = '';
            }
        });
        
        const projectList = document.createElement('ul');
        projectList.id = 'project-list';
        
        app.appendChild(title);
        app.appendChild(input);
        app.appendChild(button);
        app.appendChild(projectList);
        
        manager.getProjects().forEach(project => this.renderProject(project, manager));
    }

    static renderProject(project, manager) {
        const projectList = document.getElementById('project-list');
        const li = document.createElement('li');
        li.id = `project-${project.id}`;
        li.textContent = `${project.name} (Criado em: ${project.createdAt})`;
        
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.onclick = () => {
            const newName = prompt('Novo nome:', project.name);
            if (newName) manager.editProject(project.id, newName);
        };
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.onclick = () => manager.deleteProject(project.id);
        
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        projectList.appendChild(li);
    }

    static removeProject(id) {
        const projectElement = document.getElementById(`project-${id}`);
        if (projectElement) projectElement.remove();
    }

    static updateProject(project, manager) {
        const projectElement = document.getElementById(`project-${project.id}`);
        if (projectElement) {
            projectElement.textContent = `${project.name} (Criado em: ${project.createdAt})`;
            
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.onclick = () => {
                const newName = prompt('Novo nome:', project.name);
                if (newName) manager.editProject(project.id, newName);
            };
    
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.onclick = () => manager.deleteProject(project.id);
    
            projectElement.appendChild(editButton);
            projectElement.appendChild(deleteButton);
        }
    }
}

export default DOMHandler;