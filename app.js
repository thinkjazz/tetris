"use strict";
import Game from './src/game.js';
import View from './src/view.js';

const tetris = document.querySelector('#tetris');

const game = new Game();
const view = new View(tetris, 320, 640, 20, 10);

window.game = game;
window.view = view;

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


// console.log(game);
