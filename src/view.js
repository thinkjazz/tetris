export default class View {
    //  FLAT UI AMERICAN PALETTE https://flatuicolors.com/palette/us
    static colors = {
        '1' : "#1abc9c", //ELECTRON BLUE COLOR 
        '2' : "#2ecc71", //PICO-PICE
        '3' : "#3498db", //Bright Yarrow
        '4' : "#9b59b6", //CHI-GONG
        '5' : "#f1c40f", //MINT LEAF
        '6' : "#e67e22", //PINK
        '7' : "#e74c3c", //ORANGEVILLE
    };
    constructor(element, width, height, rows, columns) {
        this.element = element;
        this.width = width;
        this.height = height;
        this.rows = rows;
        this.columns = columns;
        // работаем с холстом хтмл5 через экземпляр класса
        this.canvas = document.createElement('canvas');


        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext('2d');
        
        this.playfieldBorderWidth = 4;
        this.playfieldX = this.playfieldBorderWidth;
        this.playfieldY = this.playfieldBorderWidth; // Ширина игрвого поля начинаться будет с 4=х
        this.playfieldWidth = this.width * 2 / 3;    // Две трети от общей ширины
        this.playfieldHeight = this.height;          // Две трети от общей ширины

        // Вычитаем из ширины всего поля ширину внутреннего поля, сначала левое поле, потом правое, потом сверху и снизу
        this.playfieldInnerWidth = this.playfieldWidth - this.playfieldBorderWidth * 2;   // Отнимаем слева и справа
        this.playfieldInnerHeight = this.playfieldHeight  - this.playfieldBorderWidth * 2;   // Отнимаем свеху и снизу


        this.blockWidth = this.playfieldInnerWidth / columns;
        this.blockHeight = this.playfieldInnerHeight / rows;

        this.panelX = this.playfieldWidth + 10;
        this.panelY = 0;

        this.panelWidth = this.width / 3; //1\3 ширины
        this.penelHeight = this.height;




        this.element.appendChild(this.canvas);
    }
    // Отрисовка поля создаем метод
    renderMainScreen(state) {
        this.clearScreen();
        this.renderPlayfield(state);
        this.renderPanel(state);
    }

 
    renderStartScreen() {
        this.context.fillStyle = 'white';
        this.context.font = '18px "Press Start 2P"';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('Press ENTER to Start', this.width / 2, this.height / 2);
    }

    renderPauseScreen() {
        this.context.fillStyle = 'rgba(0, 0,0,0.75)';
        this.context.fillRect = (0, 0, this.width, this.height);
        this.context.fillStyle = 'white';
        this.context.font = '18px "Press Start 2P"';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('Press ENTER to Resume', this.width / 2, this.height / 2);
    }

    renderGameOverScreen() {
        this.clearScreen();

        this.context.fillStyle = 'white';
        this.context.font = '18px "Press Start 2P"';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('GAME OVER', this.width / 2, this.height / 2 - 48);
        this.context.fillText(`Scores: ${scores}`, this.width / 2, this.height / 2);
    }

    // Чистим экран
    clearScreen() {

        this.context.clearRect(0, 0, this.width, this.height);

    }
    renderPlayfield({ playfield }) {
        for (let y = 0; y < playfield.length; y++) {
            const line = playfield[y];

            for (let x = 0; x < line.length; x++) {
                const block = line[x];

                if (block) {
                    this.renderBlock(
                    this.playfieldX +  (x * this.blockWidth), 
                    this.playfieldY +  (y * this.blockHeight), 
                        this.blockWidth, 
                        this.blockHeight, 
                        View.colors[block]
                        );
                }
            }
        }

        this.context.strokeStyle = '#f5cd79';
        this.context.lineWidth = this.playfieldBorderWidth;
        this.context.strokeRect(0, 0, this.playfieldWidth, this.playfieldHeight);



    }
    // Создание панели с рендером надписей уровень линии следующая фигура итд
    renderPanel({ level, scores, lines, nextPiece }){
        this.context.textAlign = 'start';
        this.context.textBaseline = 'top';
        this.context.fillStyle = 'white';
        this.context.font = '14px "Press Start 2P"';
        this.context.fillText(`Score: ${scores}`, this.panelX, this.panelY +  0);
        this.context.fillText(`Lines: ${lines}`,  this.panelX, this.panelY + 24);
        this.context.fillText(`Level: ${level}`,  this.panelX, this.panelY + 48);
        this.context.fillText("Next:",  this.panelX, this.panelY + 96);

    // Используем два цикла for для отрисовки следующей фигуры
    for (let y = 0; y < nextPiece.blocks.length; y++) {
            for (let x = 0; x < nextPiece.blocks[y].length; x++) {
                const block = nextPiece.blocks[y][x];

                if (block) {
                    this.renderBlock(
                        this.panelX + (x * this.blockWidth),  // * 0.5 уменьшает размер
                        this.panelY + 100 + (y * this.blockHeight),  //Сдвиг в отобрапжении след. фигуры, а 0.5 уменьшает размер фигуры
                            this.blockWidth,
                            this.blockHeight,
                            View.colors[block]

                    );
                }
            }
        }
    }

    renderBlock(x, y, width, height, color) {
        this.context.fillStyle = color;
        this.context.strokeStyle = '#1c1d1d';
        this.context.lineWidth = 2;

        this.context.fillRect(x, y, width, height);
        this.context.strokeRect(x, y, width, height);
    }
}