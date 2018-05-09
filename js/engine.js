/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 */

var Engine = (function(global) {

    var doc = global.document,  // Predefine the variables we'll be using within this scope
        win = global.window,
        canvas = doc.createElement('canvas'), //create the canvas element
        ctx = canvas.getContext('2d'),  //grab the 2D context for that canvas
        lastTime;                       //used to determine the time delta for the next time this function is called

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);


    //--------------//

    function init() { //This function does some initial setup that should only occur once, particularly setting
                     // the lastTime variable that is required for the game loop
        // reset();
        lastTime = Date.now();
        main();
    }


    //--------------//

    function main() { //This function serves as the kickoff point for the game loop itself
                      // and handles properly calling the update and render methods.

        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        update(dt);
        render();
        lastTime = now;

        win.requestAnimationFrame(main);   /* Use the browser's requestAnimationFrame function to call this
                                             * function again as soon as the browser is able to draw another frame. */
    }

        /* ^^^ Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone.
         */


    //--------------//

    function update(dt) {           //This function is called by main (our game loop) and itself calls all
                                    //of the functions which may need to update entity's data.
        updateEntities(dt);

        allEnemies.forEach(function(enemy) {
            enemy.checkCollisions();
        });

        allGems.forEach(function(gem) {
            gem.checkCollisions();
        });
    }


    //--------------//

    function updateEntities(dt) {

        allEnemies.forEach(function(enemy) {  //loops through all of the objects within allEnemies array
                                              // as defined in app.js and calls their update() methods.
            enemy.update(dt);
        });

        allGems.forEach(function(gem) {

            gem.update(dt);
        });


        player.update();

    }


    //--------------//

    function render() {   //This function initially draws the "game level", it will then call
                          //the renderEntities function.

        var rowImages = [      // This array holds the relative URL to the image used
                                // for that particular row of the game level.

                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;


        ctx.clearRect(0,0,canvas.width,canvas.height)    //Before drawing, clear existing canvas

        for (row = 0; row < numRows; row++) {

            for (col = 0; col < numCols; col++) {

                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }

        /* The drawImage function of the canvas' context element
         * requires 3 parameters: the image to draw, the x coordinate
         * to start drawing and the y coordinate to start drawing.
         * We're using our Resources helpers to refer to our images
         * so that we get the benefits of caching these images, since
         * we're using them over and over.
         */


    //--------------//

    function renderEntities() {     // This function is called by the render function and is called on each game tick.

        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        allGems.forEach(function(gem){
            gem.render();
        });

        scoreboard.render();
        player.render();
    }


    //--------------//

    Resources.load([      // load all of the images we know we're going to need to draw our game level.

        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-pink-girl.png',
        'images/gem-orange.png'
    ]);

    Resources.onReady(init); //set init as the callback method, so when all of images are loaded our game will start.

    global.ctx = ctx;     /* Assign the canvas' context object to the global variable so that developers can use it more easily
                            * from within their app.js files. */


})(this);  //this is the end of 'Engine' function; it calls itself





