// src/DOM.js
class DOMHandler {
    static manager;

    static initialize(manager) {   
        DOMHandler.manager = manager;    
        const app = document.getElementById('app');
        
        const title = document.createElement('h1');
        title.textContent = 'Gerenciador de Projetos';
        
        const create_project_btn = document.getElementById("criar");

        create_project_btn.addEventListener('click', () => {
            this.openCreateDialog();
        });
        
        const projectList = document.createElement('ul');
        projectList.id = 'project-list';
        
        app.appendChild(title);
        app.appendChild(projectList);
        
        manager.getProjects().forEach(project => this.renderProject(project, manager));

        const dialog_proj = document.getElementById("project-edit-dialog");
        const form_proj = document.getElementById("project-edit-form");
        const input_name_proj = document.getElementById("input-project-edit-name");
        const input_form_id_proj = document.getElementById("project-edit-form-id");
        
        form_proj.addEventListener('submit', (event) => {
            event.preventDefault();
            const newName = input_name_proj.value;
            const project_id = input_form_id_proj.value;
            if (newName && project_id) {
                manager.editProject(project_id, newName);
                dialog_proj.close();
            }
        });

        const dialog_task = document.getElementById("task-edit-dialog");
        const form_task = document.getElementById("task-edit-form");
        const input_name_task = document.getElementById("input-task-edit-name");
        const input_form_id_task = document.getElementById("task-edit-form-id");

        form_task.addEventListener("submit", (event) => {
            event.preventDefault();
            const newName = input_name_task.value;
            const task_id = input_form_id_task.value;
            if (newName && task_id) {
                manager.editTaskFromProject(task_id, newName);
                dialog_task.close();
            }
        });
    }

    static renderProject(project, manager) {
        const projectList = document.getElementById('project-list');
        const li = document.createElement('li');

        li.id = `project-${project.id}`;
        li.textContent = `Projeto: ${project.name} (Criado em: ${project.createdAt})`;
        
        const addTaskButton = document.createElement("button");
        addTaskButton.textContent = "Adicionar tarefa";
        addTaskButton.onclick = () => this.openTaskDialog(project.id);

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.onclick = () => this.openEditDialog(project);
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.onclick = () => manager.deleteProject(project.id);
        
        const taskList = document.createElement("ul");
        taskList.id = `task-list-${project.id}`;

        const showButton = document.createElement("button");
        showButton.textContent = "Mostrar tarefas";
        showButton.onclick = () => {
            const taskContainer = document.getElementById("task");
            if (taskContainer) {
                taskContainer.innerHTML = "";
            
                project.tasks.forEach(task => {
                    this.renderTask(task, project.id, manager, taskContainer); 
                });
            }
        };

        li.appendChild(addTaskButton);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        li.appendChild(showButton);
        li.appendChild(taskList);
        projectList.appendChild(li);
    }
    static openCreateDialog(){
        
        const dialog = document.getElementById("project-create-dialog");
        dialog.showModal();
        
        const cancel = document.getElementById("cancelar-projeto-create");
        const form_create = document.getElementById("project-create-form");

        form_create.addEventListener("submit", (event) => {
            event.preventDefault();
            const input_name = document.getElementById("input-project-create-name");
            const projectName = input_name.value;
            if(projectName){
                DOMHandler.manager.addProject(projectName);
                input_name.value = '';
                dialog.close();
            } 
        });
        cancel.addEventListener("click", () => {
            dialog.close();
        });
    }

    static openEditDialog(project) {
        const dialog = document.getElementById("project-edit-dialog");
        const input_name = document.getElementById("input-project-edit-name");
        const input_id = document.getElementById("project-edit-form-id");
        const cancel = document.getElementById("cancelar-projeto");
        input_name.value = project.name;
        input_id.value = project.id.toString();

        dialog.showModal();

        cancel.addEventListener("click", () => {
            dialog.close();
        });
    }

    static removeProject(id) {
        const projectElement = document.getElementById(`project-${id}`);
        if (projectElement) projectElement.remove();
    }

    static updateProject(project, manager) {
        const projectElement = document.getElementById(`project-${project.id}`);

        if (projectElement) {
            projectElement.textContent = `Projeto: ${project.name} (Criado em: ${project.createdAt})`;

            const addTaskButton = document.createElement("button");
            addTaskButton.textContent = "Adicionar tarefa";
            addTaskButton.onclick = () => this.openTaskDialog(project.id);

            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.onclick = () => this.openEditDialog(project);
    
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.onclick = () => manager.deleteProject(project.id);
            
            const taskList = document.createElement("ul");
            taskList.id = `task-list-${project.id}`;

            const showButton = document.createElement("button");
            showButton.textContent = "Mostrar tarefas";
            showButton.onclick = () => {
                const taskContainer = document.getElementById("task");
                if (taskContainer) {
                    taskContainer.innerHTML = "";
               
                    project.tasks.forEach(task => {
                        this.renderTask(task, project.id, manager, taskContainer); 
                    });
                }
            };

            projectElement.appendChild(addTaskButton);
            projectElement.appendChild(editButton);
            projectElement.appendChild(deleteButton);
            projectElement.appendChild(showButton);
            projectElement.appendChild(taskList);
        }
    }

    static renderTask(task, project_id, manager, container){
        const taskList = document.getElementById(`task-list-${project_id}`);
        
        if(taskList) {
            const li = document.createElement('li');
            li.id = `task-${task.id}`;
            li.textContent = `Task - ${task.name} (Criado em: ${task.createdAt})`;

            const edit_btn = document.createElement('button');
            edit_btn.textContent = 'Editar';
            edit_btn.onclick = () => this.openEditTaskDialog(task, project_id, manager);
            
            const del_btn = document.createElement('button');
            del_btn.textContent = 'Excluir';
            del_btn.onclick = () => {
                manager.deleteTaskFromProject(project_id, task.id);
                this.removeTask(task.id);
            };

            li.appendChild(edit_btn);
            li.appendChild(del_btn);
            container.appendChild(li);
        }
    }

    static removeTask(task_id) {
        const task_element = document.getElementById(`task-${task_id}`);
        if(task_element) task_element.remove();
    }

    static openTaskDialog(project_id){
        const dialog = document.getElementById("task-create-dialog");

        dialog.dataset.projectId = project_id;

        dialog.showModal();
        const input_name = document.getElementById("input-task-create-name");
        const cancel = document.getElementById("cancelar-tarefa");
        const confirm = document.getElementById("confirmar-tarefa");

        cancel.addEventListener("click", ()=> {
            dialog.close();
        });

        confirm.addEventListener("click", () => {
            const task_name = input_name.value;

            if(task_name) {

                const project_id = Number(dialog.dataset.projectId);
                const task = DOMHandler.manager.addTaskToProject(project_id, task_name);

                if(task) {
                    input_name.value = "";
                    dialog.close();
                } else {
                console.error("A tarefa não foi criada.");
                }
            } else {
                console.error("O nome da tarefa está vazio.");
            }
        });
    }

    static openEditTaskDialog(task, project_id, manager){
        const dialog = document.getElementById("task-edit-dialog");
        const input_name = document.getElementById("input-task-edit-name");
        const task_id = document.getElementById("task-edit-form-id");
        const cancel = document.getElementById("cancelar-tarefa-edit");
        const confirm = document.getElementById("confirmar-tarefa-edit");

        input_name.value = task.name;
        task_id.value = task.id.toString();

        dialog.showModal();

        confirm.addEventListener("click", () => {
            const new_name = input_name.value;
            
            if (new_name) {
                manager.editTaskFromProject(project_id, task.id, { name: new_name });
                dialog.close();
            }   
        });
        cancel.addEventListener("click", ()=>{
            dialog.close();
        });
    }

    static updateTask(project, task, manager) {
        const taskElement = document.getElementById(`task-${task.id}`);

        if (taskElement){
            taskElement.textContent = `Task - ${task.name} (criado em: ${task.createdAt})`;

            const edit_btn = document.createElement("button");
            edit_btn.textContent = "Editar";
            edit_btn.onclick = () => this.openEditTaskDialog(task);

            const del_btn = document.createElement("button");
            del_btn.textContent = "Excluir";
            del_btn.onclick = () => manager.deleteTaskFromProject(project.id, task.id);

            taskElement.appendChild(edit_btn);
            taskElement.appendChild(del_btn);
        }
    }
}

export default DOMHandler;