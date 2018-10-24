import React from 'react'
import ReactDOM from 'react-dom'

class Registration extends React.Component{
    render(){
        return <div>Nuevo Component</div>;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<Registration/>,document.getElementById("react-container"));
})