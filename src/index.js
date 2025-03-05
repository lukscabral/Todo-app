// src/index.js
import './styles/styles.css';
import ProjectManager from './modulos/gerenciador_projeto.js';

document.addEventListener('DOMContentLoaded', () => {
    new ProjectManager();
});

//renderizar tasks ao carregar
//consertar botoes do projeto apos update nao mostram addtask
//add botao para abrir projeto e mostrar tasks
//add descriçao e vencimento as tasks


