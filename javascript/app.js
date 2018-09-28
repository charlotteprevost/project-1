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
	- To move a car, click on the car to select it (if change of mind, click on car again to deselect it)
	- Check direction (are cars' squares x equal or y equal?)
	- Check occupied (is there a car that has a square that is on that position?)
	- If free, square(s) highlighted and clickable
	- All other squares except car and highlighted are greyed out and UNclickable
	- When valid area is clicked, car 'moves' in the selected area
		--> car's squares' coordinates are updated


					  0 1 2 3 4 5 6 7						 
					0 # # # # # # # #						 # # # # # # # #
					1 # . . Q Q Q Y #						 # . . R Q Q Q #
					2 # . . R . . Y #						 # . . R . . . #
					3 # @ @ R . . Y E <--- Exit for @@		 # . . . . . @ @ <--- WIN!  
					4 # . . . . . . #						 # . . . . . Y #
					5 # . . P P G G #						 # . P P G G Y #
					6 # . . . . . . #						 # . . . . . Y #
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
		this.clicked = false;
	}

	isOccupied(){
		// if string value is either # or a letter, then this.occupied = true
	}

	isClicked(){

	}
}
console.log(Square);


/**************************************** Car ****************************************/


class Car {

	constructor(carLetter){
		this.carLetter = carLetter;
		this.carSquares = [];
		this.direction = null;
	}

	isSelected(){

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
*****************************************************************************************************/

const game = {
	
	wallString: "#",		//

	emptyString: ".",		//		<== For clarity
	
	exitString: "E",		// 		v== Missing "E" on purpose

	carString: ["A","B","C","D","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],

	squares: [],

	walls: [],
 
	cars: [],


	levels: [
		{	level: 0,//					Y VALUES			
			map: [	//	<-------------------------------------->
						["#", "#", "#", "#", "#", "#", "#", "#"],   //	^
						["#", ".", ".", "C", "C", "C", "D", "#"],	//	|
						["#", ".", ".", "B", ".", ".", "D", "#"],	//	|
						["#", "A", "A", "B", ".", ".", "D", "E"],	//	|
						["#", ".", ".", ".", ".", ".", ".", "#"],	//	|	X VALUES
						["#", ".", ".", "F", "F", "G", "G", "#"],	//	|
						["#", ".", ".", ".", ".", ".", ".", "#"],	//	|
						["#", "#", "#", "#", "#", "#", "#", "#"]	// 	v
			]
		}],


	makeSquares(){
		for (let i = 0; i < game.levels[0].map.length; i++){					// Get x values
			
			for (let j = 0; j < game.levels[0].map[i].length; j++){				// Get y values

				const string = game.levels[0].map[i][j];						// And string value

				const square = new Square(string, i, j);						// Instantiate new Square

				game.squares.push(square);										// Push() new Square into squares[]
			}
		}
	},


	makeWalls(){

		for (i = 0; i < game.squares.length; i++){

			if (game.squares[i].string === "#"){								// push() to walls
				game.squares[i].occupied = true;
				game.walls.push(square);
			};
		}
	},


	makeCars(){

			for (let i = 0; i < game.carString.length; i++){					// A, B, C, D, etc.

				const car = new Car(game.carString[i]);						// Instantiate new Car with the alphabet letter

				for (let j = 0; j < game.squares.length; j++){					// 

					if (car.carLetter === game.squares[j].string){
						car.carSquares.push(game.squares[j].Square);			//Push() squares into new Car according to its letter
					}															
					
				}

			game.cars.push(car);

			}


	}


};

game.makeSquares();
game.makeCars();
console.log(game.squares);
console.log(game.cars);

/****************************************************************************************************
*****************************************************************************************************/



















/****************************************************************************************************
										EVENT LISTENERS
*****************************************************************************************************/

$('.square').on('click', (e) => {

	//If current target Select or deselect

	//

})









