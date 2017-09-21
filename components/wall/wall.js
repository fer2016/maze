import React from 'react'
import BrickWall from './brick-wall.svg'
import BlankWall from './empty-wall.svg'
import Corner from '../corner/brick.svg'
import Flag from '../goal/flag.svg'

const style = {
	width: 50,
	height: 50
}

export default class Wall extends React.Component {
	constructor(props){
		super(props)
	}

	loadIcon(){
		switch(this.props.icon){
			case 'wall':
				return BrickWall
			case 'blank':
				return BlankWall
			case 'corner':
				return Corner
			case 'flag' :
				return Flag
		}
	}

	render(){
		return(
			<div style={style} dangerouslySetInnerHTML={{ __html: this.loadIcon()}}>	   
		  </div>
		)
	}
}