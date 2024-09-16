import { useState } from "react";
import "../../styles/Admin.css";

const Admin = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    id: "",
    ISBN10: "",
    title: "",
    author: "",
    price: "",
    rating: "",
    availability: "",
    reviews_count: "",
    image_url: "",
    url: "",
    categories: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Add a new book
  const handleAddBook = (e) => {
    e.preventDefault();
    if (
      form.title &&
      form.author &&
      form.price &&
      form.rating &&
      form.availability &&
      form.ISBN10 &&
      form.reviews_count &&
      form.image_url &&
      form.url &&
      form.categories
    ) {
      setBooks([...books, { ...form, id: books.length + 1 }]);
      setForm({
        id: "",
        ISBN10: "",
        title: "",
        author: "",
        price: "",
        rating: "",
        availability: "",
        reviews_count: "",
        image_url: "",
        url: "",
        categories: "",
      });
    }
  };

  // Set book data to the form for editing
  const handleEditBook = (book) => {
    setForm(book);
    setIsEditing(true);
  };

  // Update book details
  const handleUpdateBook = (e) => {
    e.preventDefault();
    setBooks(books.map((b) => (b.id === form.id ? form : b)));
    setForm({
      id: "",
      ISBN10: "",
      title: "",
      author: "",
      price: "",
      rating: "",
      availability: "",
      reviews_count: "",
      image_url: "",
      url: "",
      categories: "",
    });
    setIsEditing(false);
  };

  // Delete a book
  const handleDeleteBook = (id) => {
    setBooks(books.filter((b) => b.id !== id));
  };

  return (
    <div className="admin-container">
      <h2>Admin Panel - Manage Books</h2>

      <form className="admin-form" onSubmit={isEditing ? handleUpdateBook : handleAddBook}>
        <input
          type="text"
          name="title"
          value={form.title}
          placeholder="Book Title"
          onChange={handleChange}
        />
        <input
          type="text"
          name="author"
          value={form.author}
          placeholder="Author"
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          value={form.price}
          placeholder="Price"
          onChange={handleChange}
        />
        <input
          type="text"
          name="ISBN10"
          value={form.ISBN10}
          placeholder="ISBN-10"
          onChange={handleChange}
        />
        <input
          type="number"
          name="reviews_count"
          value={form.reviews_count}
          placeholder="Reviews Count"
          onChange={handleChange}
        />
        <input
          type="text"
          name="image_url"
          value={form.image_url}
          placeholder="Image URL"
          onChange={handleChange}
        />
        <input
          type="text"
          name="url"
          value={form.url}
          placeholder="Amazon URL"
          onChange={handleChange}
        />
        <input
          type="text"
          name="categories"
          value={form.categories}
          placeholder="Categories (comma-separated)"
          onChange={handleChange}
        />
        <input
          type="number"
          name="rating"
          value={form.rating}
          placeholder="Rating"
          min="0"
          max="5"
          step="0.1"
          onChange={handleChange}
        />
        <select name="availability" value={form.availability} onChange={handleChange}>
          <option value="">Select Availability</option>
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
          <option value="Only 13 left in stock - order soon.">
            Only 13 left in stock - order soon.
          </option>
        </select>

        <button type="submit" className="submit-btn">
          {isEditing ? "Update Book" : "Add Book"}
        </button>
      </form>

      <h3>Books Added</h3>
      {books.length > 0 ? (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Price</th>
              <th>ISBN-10</th>
              <th>Reviews</th>
              <th>Rating</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>${book.price}</td>
                <td>{book.ISBN10}</td>
                <td>{book.reviews_count}</td>
                <td>{book.rating}</td>
                <td>{book.availability}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEditBook(book)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDeleteBook(book.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No books added yet.</p>
      )}
    </div>
  );
};

export default Admin;
