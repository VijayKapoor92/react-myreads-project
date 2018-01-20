import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {update} from "./BooksAPI";
class Read extends Component {

    static propTypes = {
        books : PropTypes.array.isRequired
    }

    updateShelf = (book, shelf) => {
        update(book, shelf).then((res) => console.log(res))
    }

    render() {

        const { books } = this.props;

        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                        <div className="book-shelf-changer">
                                            <select onChange={(event) => this.updateShelf(book, event.target.value)}>
                                                <option value="none" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors}</div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Read