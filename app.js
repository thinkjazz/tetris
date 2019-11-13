"use strict";
import Game from './src/game.js';
import View from './src/view.js';
import Controller from './src/controller.js';

const tetris = document.querySelector('#tetris');

const game = new Game();
const view = new View(tetris, 480, 640, 20, 10);
const controller = new Controller(game, view);

window.game = game;
window.view = view;
window.controller = controller;
// const music = new Audio();
// const pop = new Audio();

// music.src = "./src/music.ogg"
// pop.src = "./src/pop.ogg"
 

// music.play();

// console.log(game);
// view.render(game.getState());

// view.renderPlayfield(game.getState());
