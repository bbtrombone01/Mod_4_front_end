import React from "react"
import Teststuff from "../componets/prosLand"

class MakeLand extends React.Component {
    
    constructor(){
        super()
        this.state = {
            islands: 0,
            cardCount: 0,
            data: [],
            randomNi: [],
            propsData: []
        }
        this.getRandomNums = this.getRandomNums.bind(this)
        this.setPropsData = this.setPropsData.bind(this)
        this.cycleThrough= this.cycleThrough.bind(this)
        this.fetchCollections = this.fetchCollections.bind(this)
        this.deleteCard = this.deleteCard.bind(this)
    }

    componentDidMount(){
        fetch('http://localhost:3000/cards')
        .then (res => res.json())
        .then( landList=> this.setState({
            cardCount: landList.length,
            data: landList,
            islands: this.props["props"]["islands"]
        },this.getRandomNums))
    }

   getRandomNums(){
        let holdArray = []
        for(let i=0; i < this.state.islands; i++){
          let pushNum = Math.floor((Math.random() * this.state.cardCount) + 1)
          holdArray.push(pushNum)
        }
        this.setState({randomNi: holdArray},this.setPropsData)
    }

    setPropsData(){
        let newData = []
        this.state.randomNi.forEach(element => newData.push(this.state.data[element]))
        this.setState({propsData: newData },this.test)
    }

    cycleThrough(){
        this.state.propsData.forEach( card => this.fetchCollections(card) )
    }

    fetchCollections(card){
        let data = {
            card_id: card.id,
            user_id: this.props.props.user_id
        }
        fetch(`http://localhost:3000/collections`,{
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(data)
        })
    }

    deleteCard(event){
        let pop = parseInt(event.target.className)
        this.setState({propsData: this.state.propsData.filter( card => card.id !== pop)})
        fetch(`http://localhost:3000/collections/${this.props.props.user_id}`,{
            method: `DELETE`,
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(pop)

        })
        
    }
    
    render(){
        // debugger
        const propsInfo = this.state.propsData.map(card =><Teststuff key={card.id} testFunction={this.deleteCard} prop1={card.img_url} class={card.id}  />)

    return (
        <div>
            {propsInfo}
        </div>
    )
    }

}


export default MakeLand