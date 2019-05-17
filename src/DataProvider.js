import React, { Component } from 'react';
import axios from "axios"
const { Provider, Consumer } = React.createContext()

class DataProvider extends Component {
    constructor(){
        super()
        this.state={
            artist: []
        }
    }

    getArtist = (artist)=> {
        axios.get(`https://vschool-cors.herokuapp.com?url=https://tastedive.com/api/similar?q=${artist}&k=${process.env.REACT_APP_KEY}`).then(res => {
            this.setState({
                artist: res.data
            })
        }).catch(function (error) { 
            window.location.reload() 
        });
    }

    render() {
        return (
            <Provider value={{
                getArtist: this.getArtist,
                ...this.state
            }}
            >
                {this.props.children}
            </Provider>
        );
    }
}

export default DataProvider;

export function withData(C) {
    return props => <Consumer>{value => <C {...value}{...props} />}</Consumer>
}