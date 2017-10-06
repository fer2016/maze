import React , { Component } from 'react'

const style = {
	position: 'relative',
	textAlign: 'center',
	fontFamily: 'Anton',
	fontSize: '3em'
}

export default class Title extends Component {
	constructor(props){
		super(props)
	}

	setTitle(){
		let propsText = this.props.text
		if(propsText === 'middle'){
			return 'HURRY UP, TRUMP WANTS TO WIN!'
		}
		else if(propsText === 'notMiddle'){
			return 'GET TRUMP TO THE GOAL!'
		}
		else if(propsText === 'winner'){
			return 'VICTORY, YES! RESTARTING IN ... '
		}
	}

	render(){
		let time = ''
		if(this.props.timer < 6 && this.props.timer > 0){
			time= this.props.timer 
		}
		return(
			<div>
				<h1 style={style}> 
					{this.setTitle()} {time}
				</h1>
			</div>
		)
	}
}