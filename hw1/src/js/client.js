import {Sudoku} from './sudoku';
import{Driver} from './driver';
import React from 'react';
import ReactDOM from 'react-dom';
import '../css/table.css';
import FileReaderInput from 'react-file-reader-input';


//this component will render the initial sudoku and completed sudoku. 
class Input extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			solutionBoard: [],
			driver: new Driver(),
			
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.d = [];
	}

	handleSubmit(event){
		var s = this.state.driver.dfs();
		this.setState({solutionBoard: s});
		console.log("submit called");1
		event.preventDefault();
	}

	handleChange(event){
		var filetoLoad = document.getElementById("inputFile").files[0];
		var reader = new FileReader();
		reader.onload =  (e)=>{
			// read into this
			var x =[];
			var text = e.target.result;
			//split each line of text into array
			var j =0;
			if(text.length !=89)
				document.write("ERROR IN INPUT FILE. Expect 9 numbers then a new line. Please make sure"+ 
					"no extra spaces or new lines. length of file should == 89");
			for(var i=0;i <89;i++){
				if(text[i] =="\n")
					continue;
				x[j] = {num:text[i],type:"start"};
				j++;
			}
			this.setState({driver:new Driver(x)});

		}
		reader.readAsText(filetoLoad,"UTF-8");	
		event.preventDefault();

	}
	
	shouldComponentUpdate(nextProps,nextState){
		if(nextState.solutionBoard != this.state.solutionBoard){
			console.log("SHOULD UPDATE");
			return true;
			}
		if(nextState.driver.sudoku.gameBoard != this.state.driver.sudoku.gameBoard){
			console.log("driver changed");
			return true;
		}
		if(nextState.driver.sudoku.gameBoard.length ==0 || this.state.driver.sudoku.gameBoard.length ==0){
			console.log("driver len 0");
			return false;
		}
		return true;
	}
	

	render(){
		console.log("RENDER: " + this.state.driver.sudoku.gameBoard.length);
		return(
			<div>
				<form>
					<label htmlFor="my-file-input">Upload Input File:</label>
					<input type="file" onChange = {this.handleChange} id="inputFile"></input>
				</form>
				<br></br>
				<form onSubmit ={this.handleSubmit}>
					<input type="submit" value = "PRESS ME TO SOLVE AFTER UPLOADING INPUT FILE" />
				</form>

				<SudokuTable initialBoard = {this.state.driver.sudoku.gameBoard} />
				<SudokuTable initialBoard = {this.state.solutionBoard} />
			</div>
			
			);
		}
}


function SudokuTable(props){
	return(	
		<table>
			<tbody>
			{
				split(props.initialBoard).map(function(row,rowidx){
					return <TableRow data={row} />
				})
			}
			</tbody>
		</table>
	);


}
function split(sudoku_array){
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



function TableRow(props){
	var data = props.data;
	return(
		<tr>
	{	data.map(function(x,idx){
			if(x.num ==0)
				return <td key ={idx}></td>;
			return(<td key={idx} className={x.type}>{x.num}</td>);
		})
	}
		</tr>
		);
}

var app = document.getElementById('app');
ReactDOM.render(<Input />,app);


