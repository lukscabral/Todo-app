// src/index.js
import './styles/styles.css';
import ProjectManager from './modulos/gerenciador_projeto.js';

document.addEventListener('DOMContentLoaded', () => {
    new ProjectManager();
});
// refatorar index para os botoes abrirem modais
//ou seja: remover o form de add projeto do js
//criar novo dialog para criar tasks invocadas direto de projeto ja existente
// resetar dialog apos submit