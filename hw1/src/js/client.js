import {Sudoku} from './sudoku';
import{Driver} from './driver';
import React from 'react';
import ReactDOM from 'react-dom';
import '../css/table.css';


	
class SudokuTable extends React.Component{
	constructor(props){
		super(props);
		this.sudoku = new Sudoku();
		
	}

	/*
	given a sudoku 1-d array, split into 2d array to draw the table
	*/
	split(sudoku_array){
		var ret = [];
		var i =0;
		var j =0;
		while(i <9){
			ret.push([]);
			ret[i] = sudoku_array.slice(j,j+9);
			i++;
			j+=9;
		}
		return ret;
	
	}

	render(){
	return(
		<table>
			<tbody>
			{
				this.split(this.sudoku.gameBoard).map(function(row,rowidx){
					return <TableRow data={row} />
				})
			}
			</tbody>
			
		


		</table>

	);

	}
}


function TableRow(props){
	var data = props.data;
	return(
		<tr>
	{	data.map(function(x,idx){
			if(x ==0)
				return <td key ={idx}></td>;
			return(<td key={idx}>{x}</td>);
		})
	}
		</tr>
		);
}

var app = document.getElementById('app');
ReactDOM.render(<SudokuTable />,app);


