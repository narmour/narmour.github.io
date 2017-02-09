export class Sudoku {
	constructor(){
		// init gameboard
		this.gameBoard = [];
		this.gameBoard.length=81;
		this.gameBoard.fill(0,0,81);
		this.testInit();

		// win condition
		this.emptySquares = 81;
	}

	printBoard(){
		for(var i =0;i <81;i++){
			document.write(this.gameBoard[i]);
			if((i+1) %9 ==0)
				document.write("<br>");
		}
	}

	// example initial state
	testInit(){
		this.move(7,0,0);
		this.move(3,0,2);
		this.move(8,0,4);
		this.move(4,0,7);
		this.move(9,1,5);
		this.move(3,1,6);
		this.move(5,1,7);
		this.move(8,1,8);
		this.move(4,2,2);
		this.move(3,2,3);
		this.move(6,2,7);
		this.move(3,3,5);
		this.move(6,3,6);
		this.move(1,3,8);
		this.move(3,4,1);
		this.move(8,4,7);
		this.move(1,5,0);
		this.move(6,5,2);
		this.move(5,5,3);
		this.move(2,6,5);
		this.move(7,6,6);
		this.move(5,7,0);
		this.move(4,7,1);
		this.move(9,7,2);
		this.move(6,7,3);
		this.move(7,8,1);
		this.move(9,8,4);
		this.move(6,8,8);
	}

	//give row i and column j return 3x3 box row and col is in
	findBox(i,j){
		var start_row = Math.floor(i/3)*3;
		var start_col = Math.floor(j/3)*3;

		/*
		console.log("row: " + i + " column: " + j + " start_row: " +
			start_row + " start_col: " + start_col)	;
		*/


		//copy 3x3 box values into a 1-d array
		var ret = [];
		for(var x=start_row;x < start_row+3;x++)
			for(var y=start_col;y<start_col+3;y++){
				ret.push(this.gameBoard[(x*9) +y]);
			}

		//console.log(ret);

		return ret;


	}

	// returns true if value x can be placed at row i, column j
	validMove(x,i,j){
		// invalid number
		if(x <1 || x>9)
			return false;
		if(!this.checkRow(x,i)){
			console.log("INVALID " + x+ " in row " + i);
			return false;
		}
		if(!this.checkCol(x,j)){
			console.log("INVALID " + x+ " in col " + j);
			return false;
		}
		if(this.findBox(i,j).indexOf(x)!=-1){
			console.log("INVALID " + x+ " in same 3x3");
			return false;
		}
		return true;
	}

	//returns true if value x is not in row i
	checkRow(x,i){
		var start = i*9;
		for(var j = start;j < (start +9);j++){
			if(this.gameBoard[j]==x)
				return false;
		}
		return true;

	}

	//returns true if value x is not in col j
	checkCol(x,j){
		var i = 0;
		var idx = j;
		while(i <9){
			//console.log(this.gameBoard[idx]);
			if(this.gameBoard[idx] ==x)
				return false;
			idx+=9;
			i++;


		}
		return true;


	}


	//return a list of all possible moves for every open cell
	possibleMoves(){
		var ret = [];




	}

	// attempts to place value x at row i, column j
	move(x,i,j){
		//console.log("move called");
		if(this.validMove(x,i,j)){
			// reduce empty squares count if filling in an empty
			if(this.gameBoard[(i*9) +j] ==0)
				this.emptySquares-=1;
			this.gameBoard[(i *9) +j] = x;
			//console.log(this.gameBoard);
		}

	}

	// game is finished if no more empty squares
	isFinished(){
		if(this.emptySquares==0)
			return true;
		return false;
	}


	



}

