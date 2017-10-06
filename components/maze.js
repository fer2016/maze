import React from 'react'
import ReactDOM from 'react-dom'
import request from 'superagent'
import Wall from './wall/wall'
import LittleMan from './man/littleMan'
import Title from './title/title'

export default class Maze extends React.Component {

	constructor(props){
		super(props)
		this.getTheMaze()
		this.windowTimeout = null

		this.state = {
			matrix: [],
			winner: false,
			inTheMiddle: false,
			newGameTimer: 6
		}
	}

	componentWillUnmount(){
		clearTimeout(this.windowTimeout)
	}

	getTheMaze(){
		request
		  .get('http://52.88.26.79:7000/?type=json&w=6&h=6')
		  .end( (res,err) => {
		    this.setState({
		    	matrix: err.body,
		    	winner: false,
		    	inTheMiddle: false,
		    	newGameTimer: 6
		    })
  		})
  	 clearTimeout(this.windowTimeout)
	}

	handleKeyDown(event){

		let matrix = this.state.matrix
		let res = this.getPlayerPosition(matrix)

		switch(event.key){
			case 'ArrowRight':
				if(this.validateBorder(res[0],res[1]+1)){				
					matrix[res[0]][res[1]] = ' '
					matrix[res[0]][res[1]+1] = 'p'
				}				
				break
		  case 'ArrowLeft':
		  	if(this.validateBorder(res[0],res[1]-1)){
		  		matrix[res[0]][res[1]] = ' '
					matrix[res[0]][res[1]-1] = 'p'	
		  	}				
				break		
			case 'ArrowDown':
				if(this.validateBorder(res[0]+1,res[1])){
					matrix[res[0]][res[1]] = ' '
					matrix[res[0]+1][res[1]] = 'p'
				}
				break
			case 'ArrowUp':
				if(this.validateBorder(res[0]-1,res[1])){
					matrix[res[0]][res[1]] = ' '
					matrix[res[0]-1][res[1]] = 'p'
				}			
				break
		}
		if(!this.state.winner){
			this.setState({
				matrix: matrix
			})
		}	
	}

	getPlayerPosition(ar){
		for(let i=0; i<ar.length;i++){
			for(let j=0; j<19;j++){
				if(ar[i][j] === 'p'){
					return [i,j]
				}
			}	
		}
	}

	validateBorder(x,y){
		let result
		this.state.matrix[x][y] === ' ' || 
		this.state.matrix[x][y] === 'g' ? result=true : result=false 

		if(x > 4 && y > 4){
			this.setState({
				inTheMiddle: true
			})
		}
		if(this.state.matrix[x][y] === 'g'){
				this.setState({
					winner: true
				})
		}
		return result
	}

	getComponent(element){
		if(element === '+' || element === '-'){
			return <Wall icon="wall"/>
		}
		else if(element === ' '){
			return <Wall icon="blank"/>
		} 
		else if(element === 'g'){
			return <Wall icon="flag"/>
		}
		else if(element === 'p'){
			return this.state.winner === true ? 
						<LittleMan icon="trumpWin"/> :
						<LittleMan icon="trump"/>
				}
		else if(element === '|'){
			return <Wall icon="corner"/>
		}
	}

	isMiddle(){
		if(!this.state.winner){
			return this.state.inTheMiddle === true ? 'middle' : 'notMiddle'	
		}
		return 'winner'
	}

	setNumber(){
		let gameTimer = this.state.newGameTimer
		console.log(gameTimer)	
		this.setState({
				newGameTimer: gameTimer-1		
		}, () => {
			if(this.state.newGameTimer > 0){
				this.windowTimeout = setTimeout(this.setNumber.bind(this),1000)
			}
		})
	}

	render(){	
		let cols = 19
		const style = {
			display: 'grid',
			gridTemplateColumns: `repeat(${cols}, 50px)`,
			justifyContent: 'center',
			outline: 'none'
		}

		if(this.state.winner){
			if(this.state.newGameTimer === 0){			
					this.getTheMaze()
			}
			else if(this.state.newGameTimer === 6){
				setTimeout(this.setNumber.bind(this))
			}		
		}
	
		return (
			<div>
				<Title text={this.isMiddle()} timer={this.state.newGameTimer}/>
					<div style={style} onKeyDown={this.handleKeyDown.bind(this)} tabIndex="1" > {this.state.matrix.map(row => {
						return row.map(col => {
							return (
								<div>
									{this.getComponent(col)}
								</div>
							)
						})	
					})}
			 </div>
			</div>
		)		
	}
}