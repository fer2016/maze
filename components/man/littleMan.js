import React from 'react'
import Trump from './trump.gif'
import TrumpWin from './trump-win.gif'

const style = {
	width: 50,
	height: 50
}

export default class LittleMan extends React.Component {
	constructor(props){
		super(props)
	}

	loadIcon(){
		return this.props.icon === 'trump' ? Trump : TrumpWin
	}

	render(){
		return <img style={style} src={this.loadIcon()} />
	}
}