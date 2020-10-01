import React from "react"

class LoginPage extends React.Component{

    constructor(){
        super()
        this.state ={
          username: "",
          id: 0,
          isLoggedin: false
        }
        this.test = this.stopEvent.bind(this)
      }

      
      stopEvent(event){
          event.preventDefault()
          this.setState({username: event.target[0].value})
          this.fetchUser()
      }

      fetchUser(){
          fetch('http://localhost:3000/users')
          .then( res => res.json())
          .then( user => this.checkUser(user))
    }

        checkUser(array){
            for( let i=0; i<array.length;i++){
                if (array[i].username === this.state.username){
                    this.loggedIn(array[i])
                }
            }
            if (this.state.isLoggedin ===false){
                this.postUser()
            }
        }

        postUser(){
            let data= { username: this.state.username}
            fetch(`http://localhost:3000/users`,{
                method: "POST",
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then( json => {
                this.loggedIn(json)
            })
        }

        loggedIn(array){
            this.setState( {id: array.id, isLoggedin: true})
             this.props.history.push({
                 pathname: '/mainpage',
                id: this.state.id,
                isLoggedin: this.state.isLoggedin,
                username: this.state.username
            })
        }

    render(){
        return (
            <form onSubmit={this.test}>
                <input type="text" ></input>
                <button>submit</button>
            </form>
        )
    }
}

export default LoginPage