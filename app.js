"use strict";
import Game from './src/game.js';
import View from './src/view.js';

const tetris = document.querySelector('#tetris');

const game = new Game();
const view = new View(tetris, 480, 640, 20, 10);

window.game = game;
window.view = view;

// const music = new Audio();
// const pop = new Audio();

// music.src = "./src/music.ogg"
// pop.src = "./src/pop.ogg"
 

view.renderPlayfield(game.getState());
document.addEventListener('keydown', (e) =>   {
    switch (e.keyCode) {
            case 37: // Left arrow keyboard
            game.movePieceLeft();
            view.render(game.getState());
            break;
            case 39: //Right key arrow keyboard
            game.movePieceRight();
            view.render(game.getState());
            break;
            case 38: // Up key arrow keyboard
            game.rotatePeace();
            view.render(game.getState());
            break;
            case 40: //Down key arrow keyboard
            game.movePieceDown();
            view.render(game.getState());
            break;
    }
});
// music.play();

// console.log(game);
