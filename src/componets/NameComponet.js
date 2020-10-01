import React from 'react'

function ShowName(props){
    return ( <div>
         <p> hello {props.name} </p>
         <form onSubmit={props.change}>
            <input></input>
            <button> edit name </button>
         </form>
   </div>
    )  
}

export default ShowName