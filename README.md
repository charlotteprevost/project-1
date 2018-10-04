~~~~~~
~~~~~~
---------------------------------------------------------------------------------------------------------------
# ///// P R O J E C T - 1 /////

---
## ///// RUSH HOUR /////

---


A puzzle game where the user is able to shift cars on a grid, horizontally and vertically depending on their length/direction. 
The goal of the game is to shift the cars in an order/way for the "master" car to be able to escape the traffic jam.


-----------------> GAME LINK --> https://charlotteprevost.github.io/project-1/ <-- GAME LINK <-----------------


~~~~~~
~~~~~~
---------------------------------------------------------------------------------------------------------------
### ///// USER STORY /////

---

• User arrives on page
• Reads a flavor welcome text
• Sees empty grid in center of page
• Sees Start Game button

1.	--> Clicks Start <--
• Cars appear on grid
• Instructions on the page

2.	--> Clicks Car <--
• Car appears to be selected

3.	--> Clicks Empty Space <--
• Car moves if possible

4.	--> Clicks Wall or Car <--
• Nothing happens

5.	--> Clicks/Moves Car to Exit

6. Win!

~~~~~~
~~~~~~

-->	Would ideally also like to implement:

1. Next levels with increased difficulty		// DONE
2. A Reset button 								// DONE
3. Adding sound effects with possibility to mute
4. A move count (including the number of minimum possible moves one can use to solve the puzzles)

~~~~~~
~~~~~~
---------------------------------------------------------------------------------------------------------------
### ///// CODE PRELIMINARIES /////

---

1. 'Grid' loads on screen
	• Level will be generated from an array containing arrays of strings
	• Strings each have their own UNIQUE coordinates in the arrays
	• Some strings share values
	• Strings that share that value make up ONE car that will be stored in a cars array

2. One square:
	• class Square {}
	• string value (will be rendered with colour)
	• x
	• y
	• makeSquare(){}
	• makeCar(){squares with same value will be objects pushed into an array, into an array of cars}

3. One car
	• One car = one array of squares, one square = one object

4. Move car
	• To move a car, click on the car to select it (if change of mind, click on car again to deselect it)
	• Check direction (are cars' squares x equal or y equal?)
	• Check occupied (is there a car that has a square that is on that position?)
	• If free, car moveable
	• When valid area is clicked, car 'moves' in the selected area
		--> car's squares' coordinates are updated

5. Possible movements:
	• If one P is clicked, all Ps will be selected
	• Check x and y
	• Since both Ps have the same y-coord, get their x-coord
	• P with lowest x-coord, check x - 1
	• If empty, will be selectable
	• P with highest x-coord, check x + 1
	• If empty, will be selectable
	• Once move area selected, update coordinates of each letter (x - 1 if x - 1 selected, x + 1 if x + 1 selected)

6. Level Maps:
	• The walls of the grid are shown with #
	• Empty spaces are shown with .
	• Cars' size and direction are shown with letters (YYY is a vertical car of length 3, PP is a horizontal car of length 2)
	• The car that must be moved in order to win is @@
	• The only opening in the wall (and only place @@ need to occupy to win is (7, -3))

```
  0 1 2 3 4 5 6 7						 
0 # # # # # # # #						 # # # # # # # #				In this example, a possible move order would be:
1 # . . Q Q Q Y #						 # . . R Q Q Q #				- PP 	left 1
2 # . . R . . Y #						 # . . R . . . #				- GG 	left 1
3 # @ @ R . . Y   <--- Exit for @@		 # . . . . . @ @ <--- WIN!  	- YYY 	down 3
4 # . . . . . . #						 # . . . . . Y #				- QQQ 	right 1
5 # . . P P G G #						 # . P P G G Y #				- RR 	up 1
6 # . . . . . . #						 # . . . . . Y #				- @@	right 5
7 # # # # # # # #						 # # # # # # # #
```
~~~~~~
~~~~~~
---------------------------------------------------------------------------------------------------------------
### ///// WIREFRAMES /////

---

```
<--------------- USER SCREEN --------------->
+-------------------------------------------+ +------------------------------------------+
|                                           | |                                          |
|                                           | |                                          |
|                    TITLE                  | |                  TITLE                   |
|              +--------------+             | |  Toggle    +--------------+  +-----+     |
|              |              |             | |  Instructº |              |  |Reset|     |
|    Flavour   |              |   +-----+   | |  - - -     |    Cars      |  +-----+     |
|    Text      |    Empty     |   |START|   | |  | | |     |     on       |              |
|              |    Grid      |   |GAME |   | |  - - -     |    Grid      |  +--------+  |
|              |              |   +-----+   | |            |              |  |Next Lvl|  |
|              |              |             | |            |              |  +--------+  |
|              +--------------+             | |            +--------------+              |
|                                           | |                                          |
|                                           | |                                          |
+-------------------------------------------+ +------------------------------------------+
```



























