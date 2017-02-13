import {Sudoku} from './sudoku';

export class Driver{
	constructor(gb){
		console.log("made driver");
		this.sudoku = new Sudoku(gb);
		this.openSet = new Array();
		this.openSet.push(this.sudoku);
	}

	// this function performs a dfs on initialState. returns first found goalstate.
	dfs(){

		var current = this.openSet.pop();
		var lastprint = 0;
		while(!current.isFinished()){
		
			
			// if this is the goal state, return it
			//expand if not goal node

			//sort based on possible moves length
			var p = current.possibleMoves();
			p.sort(function(a,b){
				return b.availMoves.length - a.availMoves.length;
			})
		
			//for every possible move add to openSet
			for(var y =0;y < p.length;y++){
				for(var l = 0;l < p[y].availMoves.length;l++){
					var x = p[y].availMoves[l];
					var i = p[y].row;
					var j = p[y].col;
					var nextBoard = current.nextState(x,i,j);
					this.openSet.push(new Sudoku(nextBoard));
				}
			}
			//get child with least amount of possible moves
			current = this.openSet.pop();
			//status printing
			lastprint+=1;
			if(lastprint==500000){
				console.log(this.openSet.length);
				lastprint=0;
			}
		}
		return current.gameBoard;


	}



}