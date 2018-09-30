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

	makeWalls(){

		for (i = 0; i < game.squares.length; i++){

			if (game.squares[i].string === "#"){							// push() to walls
				game.squares[i].occupied = true;
				game.walls.push(square);
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

			for (j = 0; j < game.cars[i].carSquares.length; j++){

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

	toggleSelect(xValue, yValue){

		// When a car is selected it must be all squares that become selected
		for (let i = 0; i < game.cars.length; i++){			

				game.cars[i].selected = false;
			for (j = 0; j < game.cars[i].carSquares.length; j++){


				if ((game.cars[i].carSquares[j].x == xValue) 
					&& (game.cars[i].carSquares[j].y == yValue)
					&& (game.cars[i].selected === false)){

					console.log(`x: ${xValue}, y: ${yValue} --> clicked`);
					game.cars[i].selected = true; 					// make selected true AND ALL ELSE FALSE

				} else if ((game.cars[i].carSquares[j].x == xValue) 
					&& (game.cars[i].carSquares[j].y == yValue)
					&& (game.cars[i].selected === true)){
					
					console.log(`x: ${xValue}, y: ${yValue} --> clicked`);
					game.cars[i].selected = false;

				} else {

					// console.log(`x: ${game.cars[i].carSquares[j].x}, y: ${game.cars[i].carSquares[j].y} --> not clicked`);

				}

				// Now change highlight of the divs with function
				// game.colourSelect();
			}
		}
						console.log(game.cars);

	},

	colourSelect(){

		for (let i = 0; i < game.cars.length; i++){

			if (game.cars[i].selected === true){

			const $selectedCar = $('game.cars[i]');

				console.log(game.cars);
		
				$selectedCar.css("border-color", "2px solid black");
			}

		}

	}







};

game.makeSquares(0);
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

	game.toggleSelect(x, y);

	// Once selected maybe have a CSS effect? like a border gradient?

})









