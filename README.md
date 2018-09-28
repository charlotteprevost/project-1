# project-1

---------------------------------------------------------------------------------------------------------------
-------------------------------------------------- RUSH HOUR --------------------------------------------------
---------------------------------------------------------------------------------------------------------------

A game where the user is able to shift cars on a grid, horizontally and vertically depending on their length/direction. The goal of the game is to shift the cars in an order/way for the "master" car to be able to escape the traffic jam.


---------------------------------------------------------------------------------------------------------------
-------------------------------------------------- USER STORY -------------------------------------------------

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


---------------------------------------------------------------------------------------------------------------

Possible movements:

• If car is vertical, up 1, down 1
• If car is horizontal, left 1, right 1
• Cannot traverse other cars
• Cannot traverse walls


---------------------------------------------------------------------------------------------------------------

Example:

• The walls of the grid are shown with #
• Empty spaces are shown with .
• Cars' size and direction are shown with letters (YYY is a vertical car of length 3, PP is a horizontal car of length 2)
• The car that must be moved in order to win is @@
• The only opening in the wall (and only place @@ need to occupy to win is (7, -3))


Car with length two:
- If one P is clicked, all Ps will be selected
- Check x and y
- Since both Ps have the same y-coord, get their x-coord
- P with lowest x-coord, check x - 1
- If empty, will be selectable
- P with highest x-coord, check x + 1
- If empty, will be selectable
- Once move area selected, update coordinates of each letter (x - 1 if x - 1 selected, x + 1 if x + 1 selected)


  0 1 2 3 4 5 6 7						 
0 # # # # # # # #						 # # # # # # # #
1 # . . Q Q Q Y #						 # . . R Q Q Q #
2 # . . R . . Y #						 # . . R . . . #
3 # @ @ R . . Y   <--- Exit for @@		 # . . . . . @ @ <--- WIN!  
4 # . . . . . . #						 # . . . . . Y #
5 # . . P P G G #						 # . P P G G Y #
6 # . . . . . . #						 # . . . . . Y #
7 # # # # # # # #						 # # # # # # # #


In this example, a move order would be:
	- PP 	left 1
	- GG 	left 1
	- YYY 	down 3
	- QQQ 	right 1
	- RR 	up 1
	- @@	right 5 







































