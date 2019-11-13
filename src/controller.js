export default class Controller {
    constructor(game, view) {
        this.game = game;
        this.view = view;
        this.isPlaying = false;
        this.intervalId = null;


        document.addEventListener('keydown', this.hanlerKeyDown.bind(this));
        document.addEventListener('keyup', this.hanlerKeyUp.bind(this));

        this.view.renderStartScreen();
    }

    update() {
        this.game.movePieceDown();
        this.updateView();
    }
    play() {
        this.isPlaying = true;
        this.startTimer();
        this.updateView();
    }
    pause() {
        this.isPlaying = false;
        this.stopTimer();
        this.updateView();

    }
    reset() {
        this.game.reset();
        this.play();
    }
    updateView() {
        const state = this.game.getState();

        if (state.isGameOver) {
            this.view.renderGameOverScreen(state);
        } else if (!this.isPlaying) {

            this.view.renderPauseScreen();

        } else {

            this.view.renderMainScreen(state);

        }

    }

    startTimer() {
        const speed = 1000 - this.game.getState().level * 100;


        if (!this.intervalId) {
            this.intervalId = setInterval(() => {
                this.update();
            }, speed > 0 ? speed : 100);
        }

    }
    stopTimer() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }

    }

    hanlerKeyDown(event) {
        const state = this.game.getState();
        switch (event.keyCode) {
            case 13: //ENTER
                if (state.isGameOver) {
                    this.reset();
                }
              else if (this.isPlaying) {
                    this.pause();
                } else {
                    this.play();
                }
                break;
            case 37: // Left arrow keyboard
                this.game.movePieceLeft();
                this.updateView();
                break;
            case 39: //Right key arrow keyboard
                this.game.movePieceRight();
                this.updateView();
                break;
            case 38: // Up key arrow keyboard
                this.game.rotatePeace();
                this.updateView();
                break;
            case 40: //Down key arrow keyboard
                this.stopTimer();
                this.game.movePieceDown();
                this.updateView();
                break;
        }
    }
    hanlerKeyUp(event) {
        switch (event.keyCode) {

            case 40: //Down key arrow keyboard
                this.startTimer();
                break;
        }
    }
}