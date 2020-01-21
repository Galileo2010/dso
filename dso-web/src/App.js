import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'no response'
        }
    }

    getInfo() {
        fetch('/api')
            .then(response => response.text())
            .then(value => this.setState({
                value
            }));
    };

    render() {
        return (
            <div className="App">
                <button onClick={ this.getInfo.bind(this) }>get information</button>
                <p>{ this.state.value }</p>
            </div>
        );
    }
}

export default App;
