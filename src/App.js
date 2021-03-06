import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import Poster from './Poster';
import SearchBar from './SearchBar'

class App extends Component {
  constructor(props) {
    // console.log(props)
    super(props);
    // in order to define a state variable, we put it in the constructor
    // we define it as an object on this.state. 
    // This replaces getInitialState() {
    this.state = {
      moviePosters: []
    }
    this.handleSearch = this.handleSearch.bind(this)
  }
  // componentDidMount runs AFTER the frist render
	componentDidMount() {
    console.log("I'm in the DOM");
    var url = 'http://api.themoviedb.org/3/movie/now_playing?api_key=fec8b5ab27b292a68294261bb21b04a5'
    $.getJSON(url, (movieData)=>{
        console.log(movieData);
        // Changing state will trigger a re-render (i.e., render will run again)
        this.setState({
          moviePosters:movieData.results
        })
        // NEVER EVER change state directly
        // this.state.moviePosters = movieData.resuls ---- BAD!!!!!
    });
    console.log("Waiting on AJAX...")
  }

  handleSearch(value){
    // console.dir(value);
    var url = 'https://api.themoviedb.org/3/search/movie?api_key=fec8b5ab27b292a68294261bb21b04a5&query='+value
    $.getJSON(url, (movieData)=>{
        console.log(movieData);
        // Changing state will trigger a re-render (i.e., render will run again)
        this.setState({
          moviePosters:movieData.results
        })
        // NEVER EVER change state directly
        // this.state.moviePosters = movieData.resuls ---- BAD!!!!!
    });
  }  

  // EVERY component must have a render member method
	render() {
    var postersArray = [];

    // First time through render, this will be an empty array
    // SEcond time through (after componentDidMount), it wont be empty
    this.state.moviePosters.map((poster,index)=>{
      // console.log(poster);
      postersArray.push(<Poster poster={poster} key={index} />)
      return
    });

		return (
			<div className="App">

				<h1>This is the movie app (again...)</h1>
        <SearchBar searchFunction={this.handleSearch} />
        {postersArray}
			</div>
		);
	}
}

export default App;
