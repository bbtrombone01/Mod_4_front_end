import React, { Fragment } from 'react'
import Teststuff from '../componets/prosLand'

class View extends React.Component{
    constructor(){
        super()
        this.state ={
            viewData: [],
            user_id: 0,
            viewCards: []
        }
        this.getCards = this.getCards.bind(this)
        this.stor = this.store.bind(this)
    }
    
    componentDidMount(){

        fetch(`http://localhost:3000/collections/${this.props.props.user_id}`)
        .then( res => res.json())
        .then( state => this.setState({
            user_id: this.props.props.user_id,
            viewData: state
        },this.getCards))

    }

    getCards(){
        // debugger
        this.state.viewData.forEach( x =>
            fetch(`http://localhost:3000/cards/${x.card_id}`)
            .then( res => res.json())
            .then(item => this.store(item))
            )

        // this.setState({viewCards: holding})
    
    }

    store(index){
        this.setState((prevState)=>{
          prevState.viewCards.push(index)
        })
        // debugger
    }
    
    render(){
    let  test = this.state.viewCards.map( x =><Teststuff prop1={x.img_url}/>)
    return<Fragment>
        {test}
        </Fragment>

    }
    
}

export default View