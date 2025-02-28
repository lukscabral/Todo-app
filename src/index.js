// src/index.js
import './styles/styles.css';
import ProjectManager from './modulos/gerenciador_projeto.js';

document.addEventListener('DOMContentLoaded', () => {
    new ProjectManager();
});

// refatorar index para os botoes abrirem modais ok
//ou seja: remover o form de add projeto do js ok
//criar novo dialog para criar tasks invocadas direto de projeto ja existente
// resetar dialog apos submit
//usar html mesmo e nao js pra layout