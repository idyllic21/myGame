//http://speckyboy.com/demo/windmill-demo/index.html
require(
    [],
    function () {
            
        console.log("yo, I'm alive!");

        var paper = new Raphael(document.getElementById("mySVGCanvas"));
        var counter = 0;    // counts clicks on target object    
        var starttime;      // keeps track of when the game starts  
        var totaltime;      // computed when the game ends (Date.now() - starttime)
        var intervalTime;   // sets time taken for rect1 to move in each level
        var rectWidth;      // width of rect1 (which will differ depending on the level)
        var rectHeight;     // height of rect1 (which will differ depending on the level)

        // Start button with text on top
        var startButton = paper.circle(300, 200, 40);
        var startText= paper.text(300, 200, "START");        
        startButton.attr({
            stroke: "white", fill: "cyan"
        });

        // Hide for now, show it only when we are ready
        startButton.hide();
        startText.hide();

        // unhides the start button
        var ready = function(){
            startButton.show();
            startText.show();
            rect1.hide();
        }

        //Prompts user to indicate their desired level of difficulty and converts the level to a number (1, 2 or 3). 
        var userChoice= prompt("Click the moving rectangle as many times as you can within 10 seconds! Choose your level of difficulty: Easy, Medium, Difficult (Case sensitive).");

            if (userChoice === "Easy") {
               userChoice= 1;       
               intervalTime=3000; 
               rectWidth=100; 
               rectHeight=100;
               console.log("You chose Easy")
            }
            else if (userChoice === "Medium") {
               userChoice= 2;
               intervalTime=2000; // rect1 moves in a short time interval than "Easy" level
               rectWidth=80; // rect1 has smaller width than "Easy" level
               rectHeight=80; // rect1 has smaller height than "Easy" level
               console.log("You chose Medium")
             }
            else if (userChoice === "Difficult") {
                userChoice= 3;
                intervalTime=1000; 
                rectWidth=50; 
                rectHeight=50; 
                console.log("You chose Difficult")
             }

             // if the user entered an invalid option, the user will be prompted to re-enter his/her desired stage. 
            else {
                 userChoice = prompt("Error, please type again. Choose your stage: Easy, Medium or Difficult (Case sensitive)");   
                    if (userChoice === "Easy") {
                   userChoice= 1;
                   console.log("You chose Easy")
                     }
                   else if (userChoice === "Medium") {
                       userChoice= 2;
                       console.log("You chose Medium")
                     }
                    else if (userChoice === "Difficult") {
                    userChoice= 3;
                   console.log("You chose Difficult")
                   }
             };
          

        // Called when the start button is clicked to hide the startButton and begin the game
        var start = function (){
            console.log("Game is starting.");
            startButton.hide();
            startText.hide();
            rect1.show();

            // a small box on the top left corner of the game.
            var levelRect = paper.rect(8, 8, 80, 20);
                levelRect.attr({
                 'fill': "hsl(84, 100, 58)",
                 'stroke': '#3b4449',
                 'stroke-width': 2,
                  'stroke-linejoin': 'round',
                 'opacity': .75
                });

            // Indicates the level that the user had chosen on the top left corner of the game.
            var levelText = paper.text(38, 18, "Level " + userChoice);
                levelText.attr({"font-family": "arial", "font-size": 16});

            counter = 0; // sets counter to 0
            starttime = Date.now();
            console.log("time = " + starttime); // shows starting time of game on the console in ms

            //moves the target rect in a set interval time (depending on the difficulty level chosen)
            var moveSquareInterval= setInterval(moveSquare,intervalTime);

            //ends the game in 10 seconds after starting. 
            var timer1 = setTimeout( function(){
                  console.log("End game");
                  confirm("Time's up! You scored " + counter + " points!"); // a pop up will show the points the user scored. 
                  ready(); //shows the start button again.
               }, 10000);
        }
    
        // Listens for click on the start button, which will start the game. 
        startButton.node.addEventListener('click', start);

        // Create the target rect and put it "off screen" where it can't be seen until the game starts
        var rect1 = paper.rect(-100,-100, rectWidth, rectHeight);
        rect1.attr({
            'fill': "hsl(177, 61, 50)",
            'stroke': '#3b4449',
            'stroke-width': 7,
            'stroke-linejoin': 'round',
            'opacity': .75
        });

        // Return a random integer between m and n inclusive
         var randInt = function( m, n ) {
            var range = n-m+1;
            var frand = Math.random()*range;
            return m+Math.floor(frand);
        }

        // The number of clicks on the target rect
        var clickCounter = function () {
          counter ++;
          console.log("Your square count is now " + counter);
        };

        // moves the target rect randomly during the game
        var moveSquare = function(){
          var posX, posY; // temp vars to hold the new rect position indexes
          posX = randInt(0,5);  // get the (random) positions
          posY = randInt(0,3);
          // Use the positions to move the target rect
          rect1.attr({
              x: posX*100,    
              y: posY*100 
           })
        };

        // Listens for clicks on the target rect, clickCounter increases the no of counts after each click. 
        rect1.node.addEventListener('click', clickCounter);
  
        // Put the start button on the screen as this module loads so we are ready to play
        ready(); 
    }
);