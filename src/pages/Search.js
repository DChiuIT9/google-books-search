import React, { Component } from "react";
import SaveBtn from "../components/SaveBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

class Search extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    description: "",
    image: "",
    link: ""
  };

  componentDidMount() {
    // this.loadBooks();
  }

  loadBooks = (books) => {
    API.getBooks(books)
      .then(res => {
        console.log("React Res Data: " + JSON.stringify(res.data.items));
        this.setState({
          books: res.data.items, title: "", author: "", description: "", image: "", link: ""

        })
        // this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      })
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state.title);
    if (this.state.title) {
      this.loadBooks(this.state.title)
      // API.getBooks(this.state.title).then(res => {
      //   console.log(res);
      //   this.setState ({books: res.data});
      // })
      //  )
      //   .then(res => this.loadBooks())
      //   .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="lg-12 md-12">
            <div style={{marginTop: 30}}></div>
            <Jumbotron>
              <h2>(React) Google Books Search</h2>
              <h5>Search for and Save Books of Interest</h5>
            </Jumbotron>
            <div style={{backgroundColor: "#e9ecef", padding: 20}}>
              <p>Book Search</p>
              <form style={{paddingBottom: 40}}>
                <Input
                  value={this.state.title}
                  onChange={this.handleInputChange}
                  name="title"
                  placeholder="Book (required)"
                />
                {/* <TextArea
                  value={this.state.synopsis}
                  onChange={this.handleInputChange}
                  name="synopsis"
                  placeholder="Synopsis (Optional)"
                /> */}
                <div>
                <FormBtn
                  disabled={!(this.state.title)}
                  onClick={this.handleFormSubmit}
                >
                  Search
                </FormBtn>
                </div>
              </form>
            </div>
          </Col>
          <br />
          <Col size="lg-12 md-12 sm-12">
            <div style={{backgroundColor: "#e9ecef", padding: 20, marginTop: 30}}>
              <p>Results</p>
            
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link target= "_blank" to={"/books/" + book._id}>
                      <strong>
                        {book.volumeInfo.title}
                      </strong>
                    </Link>
                    <p>Written by {book.volumeInfo.authors.join(", ")}</p>
                    
                    <img style={{float: "left"}} src={book.volumeInfo.imageLinks.smallThumbnail} alt="" />
                    
                    {/* <div style={{float: "left"}}> */}
                      <p style={{float: "left"}}>{book.volumeInfo.description}</p>
                    {/* </div> */}
                    <SaveBtn className="btn btn-info" style={{ float: "right", marginBottom: 10 }} onClick={() => this.saveBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Search;
