import React from 'react'

function Teststuff(props){
    return <img
    className={props.class} 
    onClick={props.testFunction}
    alt="" src={props.prop1} />
}

export default Teststuff