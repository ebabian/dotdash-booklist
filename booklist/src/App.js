import './App.css';
import React from 'react';
import axios from 'axios';

// let term = '';
// const apiUrl = `https://goodreads-server-express--dotdash.repl.co/search/${term}`;


class App extends React.Component {
  state = {
    data: [],
    searchTerm: ''
  }

  componentDidMount = () => {
    // event.preventDefault()
    axios.get(`https://goodreads-server-express--dotdash.repl.co/search/$%7Bterm%7D`).then(
      (response) => {
        // console.log(response);
        this.setState({
          data: response.data.list
        })
      }
    ).catch(error => {
      console.log(error);
    })
  }

  render = () => {
    return (
      <div className="App">
        <h1>Book List</h1>
        <form>
          <input type="text" placeholder="Search for a book"/>
          <input type="submit" value="Search"/>
        </form>
        <div className="book-container">
          <ul>
          {this.state.data.map(
            (books) => {
              return <li>
              <img src={books.imageUrl}/>
              {books.title}
              {books.author}
              </li>
            }
          )}
          </ul>
        </div>
      </div>
    );
  }
}
export default App;
