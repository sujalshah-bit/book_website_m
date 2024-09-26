import { useEffect, useState } from 'react';
// import booksData from "../../../util/sample_book.json";
import BookCard from '../BookCard';
import "../../styles/FilterBookView.css"
import Nav from '../landing_section/Nav';
import useSearchStore from '../../store/searchStore';
import useStore from '../../store/store';

// Sample predefined categories
const predefinedCategories = [
  "Books",
  "Literature & Fiction",
  "Genre Fiction",
  "Historical Fiction",
  "Short Stories & Anthologies"
];

function BookFilters() {
  const { books, fetchBooks } = useStore();
  const [filters, setFilters] = useState({
    availability: "",
    brand: "",
    minPrice: null, 
    maxPrice: null, 
    minRating: null,
    categories: ""
  });
  const query = useSearchStore((state) => state.query);
  // Filter function
  const filteredBooks = books.filter(book => {
    const withinPriceRange = (filters.minPrice === null || book.final_price >= filters.minPrice) &&
                             (filters.maxPrice === null || book.final_price <= filters.maxPrice);
    const matchesAvailability = filters.availability ? book.availability === filters.availability : true;
    const matchesRating = (filters.minRating === null || parseFloat(book.rating) >= filters.minRating);
    const matchesCategory = filters.categories ? book.categories.includes(filters.categories) : true;
    const matchesQuery = query ? book.title.toLowerCase().includes(query.toLowerCase()) : true;
    return withinPriceRange && matchesAvailability  && matchesRating && matchesCategory&& matchesQuery;;
  });
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);
  // Update filter state
  const updateFilter = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="filter-container">
    <Nav show_input={true}/>
      {/* Filter Controls */}
      <div className="filter-bar">
        <div className="filter-item">
          <label>Availability</label>
          <select onChange={e => updateFilter('availability', e.target.value)}>
            <option value="">All</option>
            <option value="In Stock.">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Price Range</label>
          <input
            type="number"
            placeholder="Min Price"
            onChange={e => updateFilter('minPrice', e.target.value ? parseFloat(e.target.value) : null)}
          />
          <input
            type="number"
            placeholder="Max Price"
            onChange={e => updateFilter('maxPrice', e.target.value ? parseFloat(e.target.value) : null)}
          />
        </div>

        <div className="filter-item">
          <label>Min Rating</label>
          <select onChange={e => updateFilter('minRating', e.target.value ? parseFloat(e.target.value) : null)}>
            <option value="">All Ratings</option>
            {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((rating, index) => (
              <option key={index} value={rating}>{rating}</option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label>Categories</label>
          <select onChange={e => updateFilter('categories', e.target.value)}>
            <option value="">All Categories</option>
            {predefinedCategories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Filtered Books */}
      <div>
        {filteredBooks.length > 0 ? (
          <div className='books_container'>
            {filteredBooks.map((elem, index) => {
                const combinedProps = { elem, index };
                return <BookCard {...combinedProps} key={index}/>
            }
            //   <li key={index}>
            //     <h4>{book.title}</h4>
            //     <p>Price: ${book.final_price}</p>
            //     <p>Rating: {book.rating}</p>
            //     <p>Availability: {book.availability}</p>
            //   </li>
            )}
          </div>
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
}

export default BookFilters;
