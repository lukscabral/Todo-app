
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

        const dialog_proj = document.getElementById("project-dialog");
        const form_proj = document.getElementById("project-form");
        const input_name_proj = document.getElementById("input-project-name");
        const input_form_id_proj = document.getElementById("project-form-id");
        
        form_proj.addEventListener('submit', (event) => {
            event.preventDefault();
            const newName = input_name_proj.value;
            const project_id = input_form_id_proj.value;
            if (newName && project_id) {
                manager.editProject(project_id, newName);
                dialog_proj.close();
            }
        });
    }

    static renderProject(project, manager) {
        const projectList = document.getElementById('project-list');
        const li = document.createElement('li');
        li.id = `project-${project.id}`;
        li.textContent = `${project.name} (Criado em: ${project.createdAt})`;
        
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.onclick = () => this.openEditDialog(project);
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.onclick = () => manager.deleteProject(project.id);
        
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        projectList.appendChild(li);
    }
    static openEditDialog(project) {
        const dialog = document.getElementById("project-dialog");
        const input_name = document.getElementById("input-project-name");
        const input_id = document.getElementById("project-form-id");
        const cancel = document.getElementById("cancelar-projeto");
        input_name.value = project.name;
        input_id.value = project.id.toString();

        dialog.showModal();

        cancel.addEventListener("click", () => {
            dialog.close();
        })
        
        
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
            editButton.onclick = () => this.openEditDialog(project);
    
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.onclick = () => manager.deleteProject(project.id);
    
            projectElement.appendChild(editButton);
            projectElement.appendChild(deleteButton);
        }
    }
}

export default DOMHandler;