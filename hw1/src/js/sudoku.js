export class Sudoku {
	constructor(gb){
		// init gameboard if empty
		if(gb == undefined){
			this.gameBoard =[];
			this.gameBoard.length=81;
			this.gameBoard.fill({num:0,type:"none"},0,81);
			//this.testInit();
		}
		else{
			//console.log("got set");
			//console.log("not undefined was called");
			//set gameBoard
			this.gameBoard = gb;
			// win condition
		}
	}

	printBoard(){
		for(var i =0;i <81;i++){
			document.write(this.gameBoard[i] + "  ");
			if((i+1) %9 ==0)
				document.write("<br>");
		}
		document.write("numEmpty: " + this.emptySquares);
		document.write("<br>");
		document.write("<br>");

	}

	// example initial state
	testInit(){
		/*
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
		*/

		
		//this.move(3,0,0);
		this.move(9,0,1);
		this.move(1,0,2);
		//this.move(2,0,3);
		this.move(8,0,4);
		//this.move(6,0,5);
		//this.move(5,0,6);
		//this.move(7,0,7);
		//this.move(4,0,8);

		//this.move(4,1,0);
		//this.move(8,1,1);
		//this.move(7,1,2);
		//this.move(3,1,3);
		//this.move(5,1,4);
		//this.move(9,1,5);
		//this.move(1,1,6);
		//this.move(2,1,7);
		//this.move(6,1,8);

		//this.move(6,2,0);
		//this.move(5,2,1);
		//this.move(2,2,2);
		//this.move(7,2,3);
		//this.move(1,2,4);
		//this.move(4,2,5);
		this.move(8,2,6);
		this.move(3,2,7);
		this.move(9,2,8);

		this.move(8,3,0);
		this.move(7,3,1);
		this.move(5,3,2);
		//this.move(4,3,3);
		this.move(3,3,4);
		this.move(1,3,5);
		//this.move(9,3,7);

		this.move(2,4,0);
		this.move(1,4,1);
		//this.move(3,4,2);
		this.move(9,4,3);
		this.move(6,4,4);
		this.move(7,4,5);
		//this.move(4,4,6);
		this.move(8,4,7);
		this.move(5,4,8);

		this.move(9,5,0);
		//this.move(6,5,1);
		this.move(4,5,2);
		this.move(5,5,3);
		//this.move(2,5,4);
		this.move(8,5,5);
		//this.move(7,5,6);
		this.move(1,5,7);
		//this.move(3,5,8);

		//this.move(1,6,0);
		//this.move(6,6,3);
		//this.move(3,6,5);
		//this.move(5,6,7);

		//this.move(5,7,0);
		//this.move(3,7,1);
		//this.move(1,7,3);
		//this.move(2,7,5);
		//this.move(6,7,7);

		//this.move(7,8,0);
		//this.move(2,8,1);
		this.move(6,8,2);
		//this.move(8,8,3);
		//this.move(9,8,4);
		//this.move(5,8,5);
		this.move(3,8,6);
		//this.move(4,8,7);
		//this.move(1,8,8);

		//this.move(2,3,8);
		//this.move(6,3,6);

		//this.move(2,6,6);

		this.move(4,7,4);
		//this.move(7,7,8);
		this.move(8,7,2);
		this.move(9,7,6);

		this.move(4,6,1);
		this.move(7,6,4);
		

	}

	//give row i and column j return 3x3 box row and col is in
	findBox(val,i,j){
		var start_row = Math.floor(i/3)*3;
		var start_col = Math.floor(j/3)*3;
		//copy 3x3 box values into a 1-d array
		var ret = [];
		for(var x=start_row;x < start_row+3;x++)
			for(var y=start_col;y<start_col+3;y++){
				if(this.gameBoard[(x*9) +y].num == val)
					return false;
			}

		return true;
	}

	// returns true if value x can be placed at row i, column j
	validMove(x,i,j){
		// invalid number
		if(!this.checkRow(x,i)){
			return false;
		}
		if(!this.checkCol(x,j)){
			return false;
		}
		if(!this.findBox(x,i,j)){
			return false;
		}
		return true;
	}

	//returns true if value x is not in row i
	checkRow(x,i){
		var start = i*9;
		for(var j = start;j < (start +9);j++){
			if(this.gameBoard[j].num==x)
				return false;
		}
		return true;

	}

	//returns true if value x is not in col j
	checkCol(x,j){
		var i = 0;
		var idx = j;
		while(i <9){
			if(this.gameBoard[idx].num ==x)
				return false;
			idx+=9;
			i++;


		}
		return true;


	}


	//return a list of all possible moves for every open cell
	possibleMoves(){
		var ret = [];
		for(var i =0;i<9;i++){
			for(var j=0;j<9;j++){
				//if its blank, calc all possible moves
				if(this.gameBoard[(i*9) +j].num ==0){
					var moves = [];
					//try to place 1-9 into empty square
					for(var k =1;k<10;k++){
						if(this.validMove(k,i,j))
							moves.push(k);
					}
					if(moves.length!=0)
						ret.push({
							row: i,
							col: j,
							availMoves: moves
						});
				}
			}
		}
		return ret;
	}

	// attempts to place value x at row i, column j
	move(x,i,j){
		if(this.validMove(x,i,j)){
			this.gameBoard[(i *9) +j] = {num: x,
										 type:"start"};
		}
	}

	nextState(x,i,j){
		var n = this.gameBoard.slice();
		n[(i *9) +j] = {num:x,type:"solution"};
		return n;
	}



	// game is finished if no more empty squares
	isFinished(){
		for(var i =0;i<81;i++){
			if(this.gameBoard[i].num==0)
				return false;
		}
		return true;
	}

}

