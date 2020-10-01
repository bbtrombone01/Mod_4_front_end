import React from 'react'
import MakeLand from './LandsAdd&Remove'
import Showname from '../componets/NameComponet'
import View from "./ViewCollection"

class Mainpage extends React.Component {

    constructor(){
        super()
        this.state = {
        user_id: 0,
        isLoggedin: false,
        seeMe: false,
        seeView: false,
        islands: 0,
        user_name: "",
        viewLands: false
        }

        this.changeName = this.changeName.bind(this)
        this.postCall = this.postCall.bind(this)
        this.seeMe = this.seeMe.bind(this)
        this.showView = this.showView.bind(this)
    }
    
    componentDidMount(){
        this.setState({
            user_id: this.props.location.id,
            isLoggedin: this.props.location.isLoggedin,
            user_name: this.props.location.username})
    }

    changeName(event){ 
        event.preventDefault()
        this.setState({user_name: event.target[0].value}, this.postCall)
    }

    postCall(){
        let data = {user_name: this.state.user_name}
        fetch(`http://localhost:3000/users/${this.state.user_id}`,{
        method: "PATCH",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
        })
    }

    seeMe(event){
        event.preventDefault()
        this.setState({
            islands: parseInt(event.target[0].value),
            seeMe: true})
    }


    showView(){
        this.setState({
            seeView: true
        })
    }

    
    render(){
        let newLands = this.state.seeMe 
        let showLands = this.state.seeView

        let names = <Showname key={1} name={this.state.user_name} change={this.changeName} />
        
        let landsButton ;
        let viewButton;

        if(newLands){
           landsButton = <MakeLand props={this.state} />
        }

        if(showLands){
            viewButton = <View  key={"view"} props={this.state}/>
        }

      return ( 
       <div>
           {names}
        <p> pick a number get a random asscorment of islands</p>
        <form onSubmit={this.seeMe}>
            <input className="islands" type="number"></input>
            <button>submit</button>
         </form>
         {landsButton}
         <p> or view your current collections</p>
          <button onClick={this.showView}> view</button>
          {viewButton}
       </div>
      )
    }
}

export default Mainpage
