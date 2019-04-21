import React, { Component } from 'react';
import "./App.css"
import { withData } from './DataProvider';

class App extends Component {
  constructor(){
    super()
    this.state={
      search: ""
    }
  }

  componentWillMount(){
    this.props.getArtist()
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      search: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.getArtist(this.state.search)
    this.setState({
      search: ""
    })
  }

  render() {
    const styles={
      box:{
        textAlign:"center",
        width: 300,
        display:"block",
        margin:"auto",
        height: 350,
        overflowY:'scroll',
        marginTop: 30,
        border:"white solid",
        borderRadius: 10
      },
      form:{
        textAlign:"center",
        zoom: 2.3,
        marginTop: 5
      },
      button:{
        display: "block",
        margin: "auto",
        marginTop:"1em",
        zoom: 1.2,
        border:"white solid",
        borderRadius: 5,
        outline: "none"
      },
      title:{
        textAlign:"center", 
        width: "90%", 
        display:"block",
        margin:"auto",
        
      }
    }
    const mappedArtist = this.props.artist.Similar && this.props.artist.Similar.Results.map(person => {
      if (this.props.artist.Similar.Info[0].Name === 'Undefined' || this.props.artist.Similar.Results === 'unknown'){
        return null
      }else{
        return (
          <div>
            <h1>{person.Name}</h1>
            <hr/>
          </div>
        )
      }
    })
    return (
      <div>
        <h1 className="title" style={styles.title}>Find a new artist with familiar music!</h1>
        <form style={styles.form} onSubmit={this.handleSubmit} action="">
          <input 
            style={{outline:"none", borderRadius: 2, border: "white", textAlign:"center"}}
            type="text" 
            name="search" 
            value={this.state.search}
            onChange={this.handleChange}
            autoFocus
            autoComplete='off'
            placeholder="Search a favorite artist"
            required
          />
        <br/>
          <button className='button' style={styles.button}>Search</button>
        </form>
        <div style={styles.box}>
          {mappedArtist}
        </div>
      </div>
    );
  }
}

export default withData(App);