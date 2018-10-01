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
		this.occupied = false;
	}


}
// console.log(Square);


/**************************************** Car ****************************************/


class Car {

	constructor(carLetter){
		this.carLetter = carLetter;
		this.carSquares = [];
		this.direction = "null";
		this.selected = false;
	}



	moveUp(){

	}

	moveDown(){

	}

	moveLeft(){

	}

	moveRight(){

	}
}


/****************************************************************************************************

											GAME OBJECT

*****************************************************************************************************/

const game = {
	
	wallString: "#",		//

	emptyString: ".",		//		<== For clarity
	
	exitString: "$",		// 

	carString: ["A","B","C","D","E","F","G","H","I","J","K","L","M",
				"N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],

	squares: [],

	walls: [],
 
	cars: [],

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


	/****************************************** Store walls coordinates **************************************/

	makeWalls(){														// WALLS NEVER CHANGE

		for (let i = 0; i < game.squares.length; i++){

			if (game.squares[i].string === "#"){						// push() to walls
				game.squares[i].occupied = true;
				game.walls.push(game.squares[i]);
			};
		}
	},


	/************************************* Instantiate and store cars with their squares *********************************/

	makeCars(){

			for (let i = 0; i < game.carString.length; i++){				// A, B, C, D, etc.

				const car = new Car(game.carString[i]);						// Instantiate new Car with the alphabet letter

				for (let j = 0; j < game.squares.length; j++){				

					if (car.carLetter === game.squares[j].string){
						game.squares[j].occupied = true;
						car.carSquares.push(game.squares[j]);				//Push() squares into new Car according to its letter
					}															
				}	
				game.cars.push(car);
			}
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
		console.log(game.cars);
	},


	/*********************************************** Select/Deselect Car *******************************************/

	toggleSelect(xValue, yValue, $square){

		// When a car is selected it must be all squares that become selected
		for (let i = 0; i < game.cars.length; i++){			

			game.cars[i].selected = false;

			for (let j = 0; j < game.cars[i].carSquares.length; j++){

				if ((game.cars[i].carSquares[j].x == xValue) 
					&& (game.cars[i].carSquares[j].y == yValue)
					&& (game.cars[i].selected === false)){

					console.log(`x: ${xValue}, y: ${yValue} --> clicked`);
					game.cars[i].selected = true; 					// make selected true AND ALL ELSE FALSE
					// game.colourSelect();

				} else if ((game.cars[i].carSquares[j].x == xValue) 
					&& (game.cars[i].carSquares[j].y == yValue)
					&& (game.cars[i].selected === true)){
					
					console.log(`x: ${xValue}, y: ${yValue} --> clicked`);
					game.cars[i].selected = false;
				} 
				// else {
				// 	console.log(`x: ${game.cars[i].carSquares[j].x}, y: ${game.cars[i].carSquares[j].y} --> not clicked`);
				// }
			}
		}
	},


	colourSelect(){

		$(".square").css("border", "");												// Set/Reset CSS as car is selected
		$(".square").attr("selected", false);

		for (let i = 0; i < game.cars.length; i++){			

			for (let j = 0; j < game.cars[i].carSquares.length; j++){

				let xValue = game.cars[i].carSquares[j].x;
				let yValue = game.cars[i].carSquares[j].y;
				let $theSquare = $(".square[x=" + xValue + "][y=" + yValue + "]");

				if (game.cars[i].selected === true){

					console.log("x: " + xValue + ", y: " + yValue);

					$theSquare.attr("selected", true);
					$theSquare.css("border", "1px solid black");
				}
			}
		}
	},


	checkForCarAndWall(carX, carY, axis){

		let arrayToCheckX = [];
		let arrayToCheckY = [];
		let wallX = "";
		let wallY = "";


		if (axis === "horizontal"){
			
			arrayToCheckY.push(carY[0]-1);
			arrayToCheckY.push(carY[carY.length-1]+1);
			arrayToCheckX.push(carX);

			console.log("Check Ys: " + arrayToCheckY + ". Check X: " + arrayToCheckX);

			for (let i = 0; i < game.cars.length; i++){			
				for (let j = 0; j < game.cars[i].carSquares.length; j++){
					for (let k = 0; k < arrayToCheckY.length; k++){
	
						if ((arrayToCheckX[0] === game.cars[i].carSquares[j].x) 
							&& (arrayToCheckY[k] === game.cars[i].carSquares[j].y)){
							console.log("Car in x: " + game.cars[i].carSquares[j].x + ", y: " + game.cars[i].carSquares[j].y);
						}
					}
				}
			}
			// CHECK FOR WALL
			for (let i = 0; i < game.walls.length; i++){
				for (let k = 0; k < arrayToCheckY.length; k++){
					if ((arrayToCheckX[0] === game.walls[i].x) 
						&& (arrayToCheckY[k] === game.walls[i].y)){
						wallX = game.walls[i].x;
						wallY = game.walls[i].y;
						console.log(`Wall in x: ${wallX}, y: ${wallY}`);
					}
					
				}
			}
		} else if (axis === "vertical"){

			arrayToCheckX.push(carX[0]-1);
			arrayToCheckX.push(carX[carX.length-1]+1);
			arrayToCheckY.push(carY);

			console.log("Check Xs: " + arrayToCheckX + ". Check Y: " + arrayToCheckY);
			
			for (let i = 0; i < game.cars.length; i++){			
				for (let j = 0; j < game.cars[i].carSquares.length; j++){
					for (let k = 0; k < arrayToCheckX.length; k++){
	
						if ((arrayToCheckY[0] === game.cars[i].carSquares[j].y) 
							&& (arrayToCheckX[k] === game.cars[i].carSquares[j].x)){
							console.log("Car in x: " + game.cars[i].carSquares[j].x + ", y: " + game.cars[i].carSquares[j].y);
						}
						// CHECK FOR WALL
					}	
				}
			}
			// CHECK FOR WALL
			for (let i = 0; i < game.walls.length; i++){
				for (let k = 0; k < arrayToCheckX.length; k++){
					if ((arrayToCheckY[0] === game.walls[i].y) 
						&& (arrayToCheckX[k] === game.walls[i].x)){
						wallX = game.walls[i].x;
						wallY = game.walls[i].y;
						console.log(`Wall in x: ${wallX}, y: ${wallY}`);
					}
					
				}
			}
		}



		// 		for (let k = 0; k < carX.length; k++){
		// 			if (carX[k] === game.cars[i].carSquares[j].x){
		// 				console.log("There is another car in x: " + game.cars[i].carSquares[j].x);




						// for (let l = 0; l < carY.length; l++){
						// 	if (carY[l] === game.cars[i].carSquares[j].y)
						// 		console.log("And that other car is in y: " + );
						// }
				// 	}
				// }		



				// If there is another car to the left (y-1) that has selected car's value
				// if (((game.cars[i].carSquares[j].valueAxis === low1) || (game.cars[i].carSquares[j].valueAxis === high1)) && (game.cars[i].carSquares[j].sameValueAxis === sameValue)){
				// 	console.log("theres a car here!");
				// }
	},


	checkMovement(){
		/*............... First get all Xs and Ys of selected and store in arrays ...............*/
		let carX = [];
		let carY = [];
				
		for (let i = 0; i < game.cars.length; i++){			

			// if horizontal
			if ((game.cars[i].direction === "horizontal") && (game.cars[i].selected === true)){

				console.log(game.cars[i]);

				// Get car's X and Ys
				for (let j = 0; j < game.cars[i].carSquares.length; j++){
					carX = game.cars[i].carSquares[j].x;
					carY.push(game.cars[i].carSquares[j].y);
				}
				console.log("horizontal car: " + game.cars[i].carLetter + ".\n The X: " + carX + ". \n The Ys: " + carY + ".");
				
				// Lowest Y-1
				// carY[0]-1
				// Highest Y+1
				// carY[carY.length-1]+1
				//(carY[0]-1), (carY[carY.length-1]+1), "y", carX, "x"
				game.checkForCarAndWall(carX, carY, "horizontal");


			// if vertical
			} else if ((game.cars[i].direction === "vertical") && (game.cars[i].selected === true)){

				console.log(game.cars[i]);

				// Get car's X and Ys
				for (let j = 0; j < game.cars[i].carSquares.length; j++){
					carY = game.cars[i].carSquares[j].y;
					carX.push(game.cars[i].carSquares[j].x);
				}
				console.log("vertical car: " + game.cars[i].carLetter + ".\n The Xs: " + carX + ". \n The Y: " + carY + ".");
				game.checkForCarAndWall(carX, carY, "vertical");

			}
		}
	}






};

game.makeSquares(0);
game.makeWalls();
game.makeCars();
game.setDirection();

// console.log(game.cars[1].carSquares[0].x);
// console.log(game.cars[1].carSquares[1].x);
// console.log(game.squares);
// console.log(game.cars);

/****************************************************************************************************
*****************************************************************************************************/







/****************************************************************************************************
										EVENT LISTENERS
*****************************************************************************************************/


// Each div will have a .square, a .carLetter, a x="", and a y=""




$('.square').on('click', (e) => {

	const $square = $(e.currentTarget)

	const x = $square.attr("x");

	const y = $square.attr("y");

	game.toggleSelect(x, y, $square);

	game.colourSelect();

	game.checkMovement();

	// console.log(game.squares);
	// console.log(game.walls);
	// console.log(game.cars);
})









