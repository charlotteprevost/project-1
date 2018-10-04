console.log("JS IS RUNNING");

/*****************************************************************************************************

• 'Grid' loads on screen
	- Level will be generated from an array containing arrays of strings
	- Strings each have their own UNIQUE coordinates in the arrays
	- Some strings share values
	- Strings that share that value make up ONE car that will be stored in a cars array

• One square:
	- class Square {}
	- string value (will be rendered with colour)
	- x
	- y
	- makeSquare(){}
	- makeCar(){squares with same value will be objects pushed into an array, into an array of cars}

• One car
	- One car = one array of squares, one square = one object

• Move car
	- To move a car, click on the car to select it 
	- If change of mind, click on other car, previous car will be deselected
	- Check direction (are cars' squares x equal or y equal?)
	- Check occupied (is there a car that has a square that is on that position?)
	- If free, square(s) highlighted and clickable
	- All other squares except car and highlighted are greyed out and UNclickable
	- When valid area is clicked, car 'moves' in the selected area
		--> car's squares' coordinates are updated


					  0 1 2 3 4 5 6 7						 
					0 # # # # # # # #						 # # # # # # # #
					1 # . . C C C D #						 # . . B C C C #
					2 # . . B . . D #						 # . . B . . . #
					3 # A A B . . D E <--- Exit for @@		 # . . . . . @ @ <--- WIN!  
					4 # . . . . . . #						 # . . . . . D #
					5 # . . F F E E #						 # . F F E E D #
					6 # . . . . . . #						 # . . . . . D #
					7 # # # # # # # #						 # # # # # # # #


*****************************************************************************************************/


/****************************************************************************************************
												CLASSES
*****************************************************************************************************/

/**************************************** Square ****************************************/

class Square {

	constructor(string, x, y) {
		this.string = string;
		this.x = x;
		this.y = y;
		// this.occupied = false;
	}

	highlight() {

	}
	unhighlight() {

	}

}
// console.log(Square);


/**************************************** Car ****************************************/


class Car {

	constructor(carLetter){
		this.carLetter = carLetter;
		this.carSquares = [];
		this.direction = "null";
	}

	move(toX, toY) { 

		// --------------- If selected car HORIZONTAL --------------- //
		if (game.selectedCar.direction === "horizontal"){								

			// If empty square to move to is to the RIGHT 	
			if (game.selectedCar.carSquares[game.selectedCar.carSquares.length-1].y < toY && game.isSquareFree(toX, (game.selectedCar.carSquares[game.selectedCar.carSquares.length-1].y+1))){			console.log("Move right");

				for (let i = 0; i < game.selectedCar.carSquares.length; i++){

						// y++ for all squares
						game.selectedCar.carSquares[i].y++;
				}

			// If empty square to move to is to the LEFT
			} else if (game.selectedCar.carSquares[0].y > toY && game.isSquareFree(toX, (game.selectedCar.carSquares[0].y-1))){										console.log("Move left");

				for (let i = 0; i < game.selectedCar.carSquares.length; i++){

					// y-- for all squares
					game.selectedCar.carSquares[i].y--;
				}

			}

		
		// --------------- If selected car VERTICAL --------------- //
		} else if (game.selectedCar.direction === "vertical"){

			// If empty square to move to is ABOVE
			if (game.selectedCar.carSquares[0].x > toX && game.isSquareFree((game.selectedCar.carSquares[0].x-1), toY)){	console.log("Move up");
				for (let i = 0; i < game.selectedCar.carSquares.length; i++){

					// x-- for all squares
					game.selectedCar.carSquares[i].x--;

				}



			// If empty square to move to is BELOW
			} else if (game.selectedCar.carSquares[game.selectedCar.carSquares.length-1].x < toX && game.isSquareFree((game.selectedCar.carSquares[game.selectedCar.carSquares.length-1].x+1), toY)){										console.log("Move down");
				for (let i = 0; i < game.selectedCar.carSquares.length; i++){

					// x++ for all squares
					game.selectedCar.carSquares[i].x++;

				}

			}
			
		}
			console.log("Selected car: " + game.selectedCar.carLetter);
	}

}

/****************************************************************************************************
												
*****************************************************************************************************/

/**************************************************************************************************************

***************************************************************************************************************

											GAME OBJECT

***************************************************************************************************************

***************************************************************************************************************/

const game = {
	
	wallString: "#",		//

	emptyString: ".",		//		<== For clarity
	
	exitString: "$",		// 

	carString: ["A","B","C","D","E","F","G","H","I","J","K","L","M",
				"N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],

	colourString: ["#E74C3C", "#3949AB", "#2ECC71", "#A569BD", "#F4D03F", "#F5B041", "#90CAF9", "#EF9A9A", "#1E8449", "#AFB42B", "#0097A7", "#8E24AA", "#EC407A"], 
					/*red, 		blue, 	   green, 	 purple, 	yellow,    orange,  light blue,    pink,   dark green,  olive,	   teal*/

	squares: [],

	walls: [],
 
	cars: [],

	selectedCar: null,

	currentLevel: 0,

	levels: [
		{	level: 0,//					Y VALUES			
			map: [	//	<-------------------------------------->
						["#", "#", "#", "#", "#", "#", "#", "#"],   //	^
						["#", ".", ".", "C", "C", "C", "D", "#"],	//	|
						["#", ".", ".", "B", ".", ".", "D", "#"],	//	|
						["#", "A", "A", "B", ".", ".", "D", "$"],	//	|
						["#", ".", ".", ".", ".", ".", ".", "#"],	//	|	X VALUES
						["#", ".", ".", "F", "F", "E", "E", "#"],	//	|
						["#", ".", ".", ".", ".", ".", ".", "#"],	//	|
						["#", "#", "#", "#", "#", "#", "#", "#"]	// 	v
			]
		},{	level: 1,//					Y VALUES			
			map: [	//	<-------------------------------------->
						["#", "#", "#", "#", "#", "#", "#", "#"],   //	^
						["#", "C", "C", "C", "D", "E", "F", "#"],	//	|
						["#", ".", ".", "B", "D", "E", "F", "#"],	//	|
						["#", "A", "A", "B", ".", ".", ".", "$"],	//	|
						["#", "H", "H", "H", ".", ".", ".", "#"],	//	|	X VALUES
						["#", "I", "J", "J", "G", "G", "G", "#"],	//	|
						["#", "I", ".", ".", ".", ".", ".", "#"],	//	|
						["#", "#", "#", "#", "#", "#", "#", "#"]	// 	v
			]

		},{	level: 2,//					Y VALUES			
			map: [	//	<-------------------------------------->
						["#", "#", "#", "#", "#", "#", "#", "#"],   //	^
						["#", "B", "B", "C", "C", "D", "E", "#"],	//	|
						["#", "G", ".", "F", "F", "D", "E", "#"],	//	|
						["#", "G", "A", "A", "H", ".", ".", "$"],	//	|
						["#", "G", ".", "L", "H", "I", "I", "#"],	//	|	X VALUES
						["#", ".", ".", "L", "K", "J", "J", "#"],	//	|
						["#", "M", "M", "M", "K", ".", ".", "#"],	//	|
						["#", "#", "#", "#", "#", "#", "#", "#"]	// 	v
			]

		},{	level: 3,//					Y VALUES			
			map: [	//	<-------------------------------------->
						["#", "#", "#", "#", "#", "#", "#", "#"],   //	^
						["#", "B", "B", "D", "E", "F", "F", "#"],	//	|
						["#", "C", "C", "D", "E", "G", "H", "#"],	//	|
						["#", "I", ".", "A", "A", "G", "H", "$"],	//	|
						["#", "I", "J", "J", "J", "K", ".", "#"],	//	|	X VALUES
						["#", "I", ".", ".", ".", "K", ".", "#"],	//	|
						["#", ".", ".", ".", ".", "L", "L", "#"],	//	|
						["#", "#", "#", "#", "#", "#", "#", "#"]	// 	v
			]

		}],


	/****************************************** Set up squares[] according to level **************************************/

	makeSquares(lvlMap){

		for (let i = 0; i < game.levels[lvlMap].map.length; i++){				// Get x values
			
			for (let j = 0; j < game.levels[lvlMap].map[i].length; j++){		// Get y values

				const string = game.levels[lvlMap].map[i][j];					// And string value

				const square = new Square(string, i, j);						// Instantiate new Square

				game.squares.push(square);										// Push() new Square into squares[]
			}
		}
	},


	/************************************* Instantiate and store cars with their squares *********************************/

	makeCars(){

		for (let i = 0; i < game.carString.length; i++){				// A, B, C, D, etc.

			const car = new Car(game.carString[i]);						// Instantiate new Car with the alphabet letter

			for (let j = 0; j < game.squares.length; j++){				

				if (car.carLetter === game.squares[j].string){

					//Push() squares into new Car according to its letter
					car.carSquares.push(game.squares[j]);	
				}															
			}	
			game.cars.push(car);
		}
	},


	// ************************************ Update cars array ********************************

	updateCars(){

		$('.square').css("background-color", "");

		$('.square:not(.wall)').css({"border-radius": "0"});
		// Replace car in the cars array with the selected car with updated coordinates
		for (let i = 0; i < game.cars.length; i++){

			if (game.selectedCar !== null && game.selectedCar.carLetter === game.cars[i].carLetter){

				game.cars[i] = game.selectedCar;
			}
		}

		// Paint the cars again
		game.colourCars();

		// Make sure selectedCar remains "selected" for the user (has a black border)
		if (game.selectedCar !== null) {
		// 	game.toggleSelect();
			game.borderColourSelect(game.selectedCar);
		}
	},

	// ************************************ Assign each car a colour ********************************

	colourCars(){


		for (let i = 0; i < game.cars.length; i++){

			for (let j = 0; j < game.cars[i].carSquares.length; j++){
	
				let xValue = game.cars[i].carSquares[j].x;

				let yValue = game.cars[i].carSquares[j].y;

				let $theSquare = $(".square[data-x=" + xValue + "][data-y=" + yValue + "]");

				$theSquare.css("background-color", game.colourString[i]);



				if ((game.cars[i].direction === "horizontal") && (j === 0)){

					$theSquare.css({"border-top-left-radius": "10px", "border-bottom-left-radius": "10px"});

				} else if ((game.cars[i].direction === "horizontal") && (j === (game.cars[i].carSquares.length)-1)){

					$theSquare.css({"border-top-right-radius": "10px", "border-bottom-right-radius": "10px"});

				} else if ((game.cars[i].direction === "vertical") && (j === 0)){

					$theSquare.css({"border-top-left-radius": "10px", "border-top-right-radius": "10px"});

				 }else if ((game.cars[i].direction === "vertical") && (j === (game.cars[i].carSquares.length)-1)){

					$theSquare.css({"border-bottom-left-radius": "10px", "border-bottom-right-radius": "10px"});
				}
			}
		}
	},

		// ************************************ Clear colours for next game ********************************

	clearColour(){

		for (let i = 0; i < game.cars.length; i++){

			for (let j = 0; j < game.cars[i].carSquares.length; j++){
	
				let xValue = game.cars[i].carSquares[j].x;

				let yValue = game.cars[i].carSquares[j].y;

				let $theSquare = $(".square[data-x=" + xValue + "][data-y=" + yValue + "]");

				$theSquare.css("background-color", "lightgrey");
			}
		}

		// $(".square").css({"border": "", "border-radius": 0});
	},



	/*********************************************** Set car grid direction *******************************************/
	setDirection(){

		
		for (let i = 0; i < game.cars.length; i++){			

			for (let j = 0; j < game.cars[i].carSquares.length; j++){

				if (game.cars[i].carSquares[0].x === game.cars[i].carSquares[1].x){

					game.cars[i].direction = "horizontal";

				} else {

					game.cars[i].direction = "vertical";
				}
			}
		}
	},


	/*********************************************** Select/Deselect Car *******************************************/

	toggleSelect(xValue, yValue){ 

		// When a car is selected it must be all squares that become selected
		for (let i = 0; i < game.cars.length; i++){		

			for (let j = 0; j < game.cars[i].carSquares.length; j++){
			// game.selectedCar = null;

				// If what I clicked on is a car and selectedCar is empty
				if 	((game.cars[i].carSquares[j].x == xValue) 
					&& (game.cars[i].carSquares[j].y == yValue) 
					&& (game.selectedCar === null)){

					console.log(`x: ${xValue}, y: ${yValue} --> clicked`);

					// Then add what I clicked to selectedCar
					game.selectedCar = game.cars[i];
			
					console.log("Selected car: " + game.selectedCar.carLetter);

				// If what I clicked on is a car and is THE SAME as selected
				} else if ((game.cars[i].carSquares[j].x == xValue) 
					&& (game.cars[i].carSquares[j].y == yValue) 
					&& (game.selectedCar === game.cars[i])){

					console.log("Deselected car " + game.selectedCar.carLetter);

					// Reset CSS
					$(".square").css("border", "");

					// Remove car from selectedCar (deselect it)
					game.selectedCar = null;
				}
			}
		}
	},


	/***************************************** Set/Reset CSS when car selected/unselected *************************************/

	borderColourSelect(selectedCar){

		$(".square").css("border", "");

		for (let i = 0; i < selectedCar.carSquares.length; i++){			

			let xValue = selectedCar.carSquares[i].x;							// Assign car's squares' coord to divs
			let yValue = selectedCar.carSquares[i].y;
			let $theSquare = $(".square[data-x=" + xValue + "][data-y=" + yValue + "]");

			console.log("x: " + xValue + ", y: " + yValue);

			// $theSquare.attr("selected", true);
			$theSquare.css("border", "1px solid black");
		}
	},


	/***************************************** When click on a square, check if free *************************************/

	isSquareFree(x, y) {

		// Figure out distance between car and square

		// Check if there's a car
		for (let i = 0; i < game.cars.length; i++){
			
			for (let j = 0; j < game.cars[i].carSquares.length; j++){
			
				// If this squares x and this squares y are eq to x and y param
				if ((game.cars[i].carSquares[j].x == x) && (game.cars[i].carSquares[j].y == y)){
					console.log(`This square is occupied!`);
					return false;
				}
			}
		}

		// Check if theres a wall
		if ((x == 0) || (y == 0) || (x == 7) || ((y == 7) && (x != 3))){
			$('#message').html("<p>Hmmm. . . <br/>That . . . is a wall.<br/><br/><br/>&#x28;&#xFF89;&#x25D5;&#x30EE;&#x25D5;&#x29;&#xFF89;&#x2A;&#x3A;&#xFF65;&#xFF9F;&#x2727;</p>").css("text-align", "center");

			return false;
		}

		console.log(`This square is free!`);
		return true;
	},


	/***************************************** Move the selected car *************************************/

	moveSelectedCar(x, y){

		if ((game.selectedCar.direction === "horizontal") && (x == game.selectedCar.carSquares[0].x)) {

			console.log("moveSelectedCar");
			game.selectedCar.move(x, y);
		
		} else if ((game.selectedCar.direction === "vertical") && (y == game.selectedCar.carSquares[0].y)){

			console.log("moveSelectedCar");
			game.selectedCar.move(x, y);

		}
	},

	/***************************************** Move the selected car *************************************/

	youWin(){

		if (game.selectedCar.carSquares[1].y === 7){
			$('#message').html("<p>You win !<br/><br/> &#xFF3C;&#xFF3C;&#x5C;&#x5C;&#x20;&#x669;&#x28;&#x25D5;&#x30EE;&#x25D5;&#x29;&#x648;&#x20;&#x2F;&#x2F;&#xFF0F;&#xFF0F;</p>").css("text-align", "center");
			return true;
		}
	},

	/************************************** Highlight available squares when car is selected **********************************/
						/***************************************** Optional *************************************/

	showAvailSq(car) {
		// if horiz
			// isSquareFree(that square on the left)
				// highlight(that square)
			// isSquareFree(that square on the right)
				// highlight(that square)

		// if vertical
			// if isSquareFree(that square on the top)
				// highlight(that square)
			// isSquareFree(that square on the bottom)
				// highlight(that square)

	},



};


/****************************************************************************************************
*****************************************************************************************************/







/****************************************************************************************************
										EVENT LISTENERS
*****************************************************************************************************/

/************************************** Start Game **********************************/

$('#start').on('click', () => {

	/********************************* Make the Board *****************************/

	game.makeSquares(0);			
	game.makeCars();
	game.setDirection();
	game.colourCars();

	/********************************* Show Level *****************************/

	$('#level p').html("Tutorial Level.<br/>Let's warm up!")	// Update screen

	/********************************* Hide/Show Instructions *****************************/

	let click = 1;

	$('#message').html("<button id='instructions'>Hide Instructions</button>");		// Make instructions button

	const $instructionsText = $("<p>&#x2022; Click on car &#x2192; select car<br/>&#x2022; Click on empty spot &#x2192; move car<br/>&#x2022; Click on car again &#x2192; deselect car<br/>&#x2022; Horizontal cars can only move left/right<br/>&#x2022; Vertical cars can only move up/down<br/><br/>Get your <span>red</span> ride out of this traffic jam!</p>")

	$('#message').append($instructionsText);		// Add instructions

	$('#message p').css("font-size", "19px");	

	$('#instructions').on('click', () => {			// Toggle Show/Hide Instructions
		console.log("clickyckicl");

		if (click % 2 === 0){
			$('#message p').show();
			$('#message button').text("Hide Instructions");
		} else {
			$('#message p').hide();
			$('#message button').text("Show Instructions");
		}

		click++;

	});


	$('#start').remove();

	/********************************* Reset Game *****************************/

	$('#level').prepend("<button id='reset'>Reset</button>");

	$('#reset').on('click', () => {

			// Clear the board
			game.clearColour();

			if (game.currentLevel === 0){
				$('#level p').html("Tutorial Level.<br/><br/>Let's warm up!")	// Update screen
	
			} else {		
				$('#level p').text("Level: " + game.currentLevel)
			}

			game.squares = [];
			game.cars = [];
			game.selectedCar = null;

			game.makeSquares(game.currentLevel);			
			game.makeCars();				
			game.setDirection();
			game.colourCars();

	});
});



/************************************** Play Game **********************************/

$('.square').on('click', (e) => {

	// Check out HTML dataset - Vanilla/MDN, jQuery .data() (getter and setter)
	const x = e.currentTarget.dataset.x;
	const y = e.currentTarget.dataset.y;

	game.toggleSelect(x, y);
	if (game.selectedCar !== null){game.borderColourSelect(game.selectedCar);};

	
	if (game.selectedCar !== null && game.isSquareFree(x, y)) {

		game.borderColourSelect(game.selectedCar);

		// Move selected car if possible
		game.moveSelectedCar(x, y);
		game.updateCars();	
	}

	game.youWin();
});


/************************************** Next Level **********************************/

$('#nextLevel').on('click', () => {

	if (game.youWin()){										// If player beat this level
		console.log("Click");

		$('#message p').hide();								// Remove Instructions

		game.clearColour();									// Clear the board

		game.currentLevel++;								// Level UP!

		$('#level p').text("Level: " + game.currentLevel)	// 

		game.squares = [];
		game.cars = [];
		game.selectedCar = null;

		game.makeSquares(game.currentLevel);			
		game.makeCars();				
		game.setDirection();
		game.updateCars();
		game.borderColourSelect();
	}

});

// <div id="car-sq" data-x="3" data-y="6">
// e.currentTarget.dataset.x = 7
// $(e.currentTarget).data('x', 6)













































