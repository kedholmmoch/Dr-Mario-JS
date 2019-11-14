# DR. MARIO JS

![Screenshot 2019-11-12 13 23 25](https://user-images.githubusercontent.com/52052943/68712487-af03b600-0550-11ea-8b34-9feb57a93bc0.png)

[live link](https://kedholmmoch.github.io/Dr-Mario-JS/)

Dr. Mario JS is a falling-block puzzle game, a clone of the classic Nintendo game, Dr. Mario.     
The goal of the game is to eliminate all of the colored viruses in any given level
by dropping colored blocks to form a series of four or more pills/viruses of the same color.


### INSTRUCTIONS

In order to start the game, the user must choose a level (between 0 and 20) and a speed
(between 0 and 5), and then click the "START" button.

After the bottle has generated with colored viruses inside, the game will drop one pill
at a time, each pill made up of two different (or similarly) colored doses. The player
may navigate the pill around the board by:

... moving left (`J` key or left arrow key)

... moving right (`L` key or right arrow key)

... flipping pill to left (`S` key)

... flipping pill to right (`F` key)

... speeding the pill's drop (`K` key or down arrow key)


The pill will drop one space on the board at a regular interval, depending on the
speed. 
If the pill hits a virus, another pill, or the bottom of the board, if it
is not moved before the end of the regular drop interval, the pill is frozen in
place. 
When the board has settled, the board introduces a new falling pill.


### TECHNOLOGIES

- JavaScript
- HTML5 Canvas


### FEATURES AND IMPLEMENTATION

All features in this game were implemented using native JavaScript DOM manipulation 
and HTML5 canvas. No additional libraries were used.

Dr. Mario JS has been written with an object-oriented approach in mind; to that end, the game's logic and
code has been separated into a number of classes, each keeping track of their own slices of game logic:

- `Game` (tracks Level, Speed, and Score, as well as individual game objects drawn to the game canvas);
- `Board` (populates grid with `Virus`es and tracks game grid positions of all `Virus`es and `Dose`s (including `Pill`s));

- `Soundboard` (sounds and background music); `Mario` (Dr. Mario sprites and animation);

##### Populating the Board

When the user clicks the start button to begin a new game, an event listener on the button triggers a
function that creates a new game object which takes as its `level` and `speed` arguments the current
`value` displayed on the level-slide and speed-slide range slide elements. 

The game constructor creates a new instance of `Board` (an 8 x 16 grid represented by a 2d array) 
and then calls on it the `Board#populateViruses` method:

```javascript

```


### FUTURE FEATURES

1. Find and add appropriate sounds for flipping pills, dropping pills, disappearing viruses, and point combinations
2. Adjust Board.populateBoard function to put no more than 2 of the same color in a row when populating
3. Have speed of stage automatically increase as time goes on (every 30 sec./1 min. or so)
4. Upon doses and viruses disappearing, display empty pill-square with audio before applyGravity function
5. Animate Dr. Mario to throw pill upon loading next pill into game area
6. Implement local and global high scores


#### LEGAL

Art and music assets used in this project are for educational purposes only. Art and Music assets are property of Nintendo.

The Dr. Mario sprites were ripped courtesy of Black Squirrel and Dr. Nitro via mariouniverse.com.

The Dr. Mario theme and 'Fever' audio files were ripped courtesy of Indogutsu, Slick Mandela, and nensondubois via zophar.net.