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
		this.selected = false;
		this.colour = "";
	}


	moveUp(){
		// if square above me is not occupied
		for (let i = 0; i < game.cars.length; i++){
			for (let j = 0; i < game.cars[i].carSquares.length; j++){
				
				if ( ((game.cars[i].direction === "vertical") && (game.cars[i].selected === true))
					&& isSquareFree( (((game.cars[i].carSquares[j].x)-1), (game.cars[i].carSquares[j].y)) )){
						console.log("You can move up!");
				}
			}
		}

	}

	moveDown(){

		for (let i = 0; i < game.cars.length; i++){
			for (let j = 0; i < game.cars[i].carSquares.length; j++){
				
				if (((game.cars[i].direction === "vertical") && (game.cars[i].selected === true))
					&& isSquareFree(	((game.cars[i].carSquares[j].x)+1), (game.cars[i].carSquares[j].y)	)){
						console.log("You can move down!");
				}
			}
		}

	}

	moveLeft(){

		for (let i = 0; i < game.cars.length; i++){
			for (let j = 0; i < game.cars[i].carSquares.length; j++){
				
				if (((game.cars[i].direction === "horizontal") && (game.cars[i].selected === true))
					&& isSquareFree(	((game.cars[i].carSquares[j].y)-1), (game.cars[i].carSquares[j].x)	)){
						console.log("You can move left!");
				}
			}
		}

	}

	moveRight(){

		for (let i = 0; i < game.cars.length; i++){
			for (let j = 0; i < game.cars[i].carSquares.length; j++){
				
				if (((game.cars[i].direction === "horizontal") && (game.cars[i].selected === true))
					&& isSquareFree(	((game.cars[i].carSquares[j].y)-1), (game.cars[i].carSquares[j].x)	)){
						console.log("You can move right!");
				}
			}
		}
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

	colourString: ["#E74C3C", "#3498DB", "#3498DB", "#A569BD", "#F4D03F", "#F5B041", "#AED6F1", "#FFC0CB", "#1E8449 "], /*red, blue, green, purple, yellow, orange, light blue, pink, dark green*/

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
	

	/***************************************** Assign Cars to $div *************************************/

	assignCarsDiv(){

		for (let i = 0; i < game.squares.length; i++){

		}
	},


	/****************************************** Store walls coordinates **************************************/

	makeWalls(){														// WALLS NEVER CHANGE

		for (let i = 0; i < game.squares.length; i++){

			if (game.squares[i].string === "#"){						// push() to walls
				// game.squares[i].occupied = true;
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
					// game.squares[j].occupied = true;
					car.carSquares.push(game.squares[j]);				//Push() squares into new Car according to its letter
				}															
			}	
			game.cars.push(car);
		}
	},


	/************************************* Assign each car a colour *********************************/

	colourCars(){
		
		for (let i = 0; i < game.cars.length; i++){

			for (let j = 0; j < game.colourString.length; j++){

				game.cars[i].colour = game.colourString[j];

			}
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

	/***************************************** Set/Reset CSS when car selected/unselected *************************************/

	colourSelect(){

		$(".square").css("border", "");
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

	/***************************************** When click on a square, check if free *************************************/

	isSquareFree(x, y) {
		// loop over cars
		for (let i = 0; i < game.cars.length; i++){
			
			// 	loop over this car's squares
			for (let j = 0; j < game.cars[i].carSquares.length; j++){
			
				// If this squares x and this squares y are eq to x and y param
				if ((game.cars[i].carSquares[j].x == x) && (game.cars[i].carSquares[j].y == y)){
					console.log(`This square is occupied!`);
					return false;
				}
			}
		}
		return true;
	},

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


	// /***************************************** Check for car/wall up/down/left/right *************************************/
	// /*********** MUST DRY THIS UP!!! ***********/

	// checkForCarAndWall(carX, carY, axis){

	// 	const arrayToCheckX = [];
	// 	const arrayToCheckY = [];

	// 	/* * * * * * * * * * * * * * * * * * * * If the Car is Horizontal * * * * * * * * * * * * * * * * * * * * */

	// 	if (axis === "horizontal"){		// only one X to check, two Ys to check
			
	// 		arrayToCheckY.push(carY[0]-1);
	// 		arrayToCheckY.push(carY[carY.length-1]+1);
	// 		arrayToCheckX.push(carX);

	// 		console.log("Check X: " + arrayToCheckX + ". \nCheck Ys: " + arrayToCheckY);

	// 		/* - - - - - - - - - - Check for Cars Left and Right - - - - - - - - - - */

	// 		for (let i = 0; i < game.cars.length; i++){			
	// 			for (let j = 0; j < game.cars[i].carSquares.length; j++){
	// 				for (let k = 0; k < arrayToCheckY.length; k++){
	
	// 					// Is there a car with same x and same y as the spots to check
	// 					if ((arrayToCheckX[0] === game.cars[i].carSquares[j].x) 
	// 						&& (arrayToCheckY[0] === game.cars[i].carSquares[j].y)){
								
	// 							// game.cars[i].carLeft = true;

	// 					} else if ((arrayToCheckX[0] === game.cars[i].carSquares[j].x) 
	// 						&& (arrayToCheckY[arrayToCheckY.length-1] === game.cars[i].carSquares[j].y)){
								
	// 							// game.cars[i].carRight = true;
	// 					}
	// 				}
	// 			}
	// 		}

	// 		/* - - - - - - - - - - Check for Walls Left and Right - - - - - - - - - - */

	// 		for (let i = 0; i < game.walls.length; i++){
	// 			for (let k = 0; k < arrayToCheckY.length; k++){

	// 				if ((arrayToCheckX[0] === game.walls[i].x) 
	// 					&& (arrayToCheckY[0] === game.walls[i].y)){

	// 						// game.cars[i].wallUp = true;
					
	// 				} else if ((arrayToCheckX[0] === game.walls[i].x) 
	// 					&& (arrayToCheckY[arrayToCheckY.length-1] === game.walls[i].y)){

	// 						// game.cars[i].wallDown = true;
	// 				}
					
	// 			}
	// 		}

	// 	/* * * * * * * * * * * * * * * * * * * * If the Car is Vertical * * * * * * * * * * * * * * * * * * * * */

	// 	} else if (axis === "vertical"){	// only one Y to check, two Xs to check

	// 		arrayToCheckX.push(carX[0]-1);
	// 		arrayToCheckX.push(carX[carX.length-1]+1);
	// 		arrayToCheckY.push(carY);

	// 		console.log("Check Xs: " + arrayToCheckX + ". \nCheck Y: " + arrayToCheckY);

	// 		/* - - - - - - - - - - Check for Cars Up and Down - - - - - - - - - - */
			
	// 		for (let i = 0; i < game.cars.length; i++){			
	// 			for (let j = 0; j < game.cars[i].carSquares.length; j++){
	// 				for (let k = 0; k < arrayToCheckX.length; k++){
	
	// 					if ((arrayToCheckY[0] === game.cars[i].carSquares[j].y) 
	// 						&& (arrayToCheckX[0] === game.cars[i].carSquares[j].x)){

	// 						// game.cars[i].carUp = true;
						
	// 					} else if ((arrayToCheckY[0] === game.cars[i].carSquares[j].y) 
	// 						&& (arrayToCheckX[arrayToCheckX.length-1] === game.cars[i].carSquares[j].x)){

	// 						// game.cars[i].carDown = true;
	// 					}
	// 				}	
	// 			}
	// 		}

	// 		/* - - - - - - - - - - Check for Walls Up and Down - - - - - - - - - - */

	// 		for (let i = 0; i < game.walls.length; i++){
	// 			for (let k = 0; k < arrayToCheckX.length; k++){

	// 				if ((arrayToCheckY[0] === game.walls[i].y) 
	// 					&& (arrayToCheckX[0] === game.walls[i].x)){

	// 						// game.cars[i].wallUp = true;

	// 				} else if ((arrayToCheckY[0] === game.walls[i].y) 
	// 					&& (arrayToCheckX[arrayToCheckX.length-1] === game.walls[i].x)){

	// 						// game.cars[i].wallDown = true;
	// 				}
	// 			}
	// 		}
	// 	}
	// },


	// storeSelectedCarSquaresCoord(){

	// 	/*............... Gather Xs and Ys of squares making up selected car and store them in arrays ...............*/
	// 	/*............... Arrays will be used to find out if there is a wall or car around the car ...............*/
	// 	const selectedCarCoord = []
	// 	let carX = [];
	// 	let carY = [];
				
	// 	for (let i = 0; i < game.cars.length; i++){			

	// 		// if horizontal
	// 		if ((game.cars[i].direction === "horizontal") && (game.cars[i].selected === true)){

	// 			// Get car's X and Ys
	// 			for (let j = 0; j < game.cars[i].carSquares.length; j++){
	// 				carX = game.cars[i].carSquares[j].x;
	// 				carY.push(game.cars[i].carSquares[j].y);
	// 			}
	// 			console.log("Horizontal car: " + game.cars[i].carLetter + ".\nThe X: " + carX + ". \nThe Ys: " + carY + ".");

	// 			game.checkForCarAndWall(carX, carY, "horizontal");

	// 		// if vertical
	// 		} else if ((game.cars[i].direction === "vertical") && (game.cars[i].selected === true)){

	// 			console.log(game.cars[i]);

	// 			// Get car's X and Ys
	// 			for (let j = 0; j < game.cars[i].carSquares.length; j++){
	// 				carY = game.cars[i].carSquares[j].y;
	// 				carX.push(game.cars[i].carSquares[j].x);
	// 			}
	// 			console.log("Vertical car: " + game.cars[i].carLetter + ".\nThe Xs: " + carX + ". \nThe Y:" + carY + ".");

	// 			game.checkForCarAndWall(carX, carY, "vertical");
	// 		}
	// 	}
	// }






};

game.makeSquares(0);
game.assignSquaresDiv();
game.makeWalls();
game.makeCars();
game.colourCars();
game.setDirection();

console.log($('div.square')[2]);
console.log(game.squares);

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

	// game.storeSelectedCarSquaresCoord();

	console.log(game.cars);
	
	// for (let i = 0; i < game.cars.length; i++){
	// 	if (game.cars[i].selected){
	// 		game.cars[i].moveUp();
	// 		game.cars[i].moveDown();
	// 		game.cars[i].moveLeft();
	// 		game.cars[i].moveRight();
	// 	}
	// }
});








