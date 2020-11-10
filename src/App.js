import './App.css';
import React from 'react';
import axios from 'axios';


class App extends React.Component {
  state = {
    data: [],
    searchTerm: '',
    errorExists: false,
    errorMessage: ''
  }

  // get request to access api with search term
  accessApiData = (term) => {
    axios.get(`https://goodreads-server-express--dotdash.repl.co/search/${term}`).then(
      (response) => {
        console.log(response);
        // save all response data in an array
        this.setState({
          data: response.data.list
        })
      }
    ).catch(error => {
      console.log(error);
      this.setState({
        // if there's an error save errormessage with searched term
        errorExists: true,
        errorMessage: `${this.state.searchTerm} Does not exist`,
        data: []
      })
    })
  }

  // set search term to event target value
  userSearchTerm = (event) => {
    this.setState({
      searchTerm: event.target.value,
      data: [],
      errorMessage: ''
    })
    console.log(this.state.searchTerm);
  }

  // if search exists, then set search term as parameter for access api function
  searchExists = (event) => {
    event.preventDefault();
    this.accessApiData(this.state.searchTerm);
    console.log('Search Button clicked');
  }

  render = () => {
    return (
      <div className="App">
        <h1>Book List</h1>
        <form>
          <input
          id="search-bar"
          onChange={this.userSearchTerm}
          value={this.state.searchTerm}
          type="text"
          placeholder="Search for a book"/>
          <input
          id="search-btn"
          onClick={this.searchExists}
          type="submit"
          value="Search"/>
        </form>
        { this.state.errorExists ? <h2 id="error-msg">{this.state.errorMessage}</h2> : ('') }
        <div className="book-container">
        {this.state.data ?
          (<ul>
          {this.state.data.map(
            (books, index) => {
              return   <li key={index}>
              <img id="book-img" alt={books.title} src={books.imageUrl}/>
              <div className="text-container">
                <h3 id="book-title">{books.title}</h3>
                <h5 id="book-author">By: {books.authorName}</h5>
              </div>
              </li>
            }
          )}
          </ul>) : ('')}
        </div>

      </div>
    );
  }
}
export default App;
