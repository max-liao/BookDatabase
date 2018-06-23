import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import API from "../../utils/API";

class Books extends Component {
  // Initialize this.state.books as an empty array
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  // Add code here to get all books from the database and save them to this.state.books
  handleFormSubmit = event => {
    // When the form is submitted, prevent its default behavior, get recipes update the recipes state
    event.preventDefault();
    var title = document.getElementById("title").value;
    var author = document.getElementById("author").value;
    var synopsis = document.getElementById("synopsis").value;

    var bookdata = {
      title: title,
      author: author,
      synopsis: synopsis
    }
    API.saveBook(bookdata).then(res => {
        console.log(res.data);
        this.setState({ 
          title: title,
          author: author,
          synopsis: synopsis
        });
      })
      .catch(err => console.log(err));

      this.loadBooks();
  };

  handleDelete = (id) => {
    // console.log(id);
    API.deleteBook(id).then(res => {
        // console.log(res.data)";
        console.log("DELETE");
      })
      .catch(err => console.log(err));
      this.loadBooks();
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input id = "title" name="title" placeholder="Title (required)" />
              <Input id = "author" name="author" placeholder="Author (required)" />
              <TextArea  id = "synopsis" name="synopsis" placeholder="Synopsis (Optional)" />
              <FormBtn onClick={this.handleFormSubmit}>Submit Book</FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <a href={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </a>
                    <DeleteBtn onClick={() => this.handleDelete(book._id)}/>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
