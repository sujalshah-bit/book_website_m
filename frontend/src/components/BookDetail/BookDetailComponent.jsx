import Button from "../Button";
import "../../styles/BookDetailComponent.css";
import useStore from "../../store/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentsSection from './Comment'


const BookDetailComponent = () => {
  const { id } = useParams();
  const { fetchBook, book } = useStore((state) => ({
    fetchBook: state.fetchBook,
    book: state.book,
  }));

  // Fetch book details when the component mounts or when id changes
  useEffect(() => {
    if (id) {
      fetchBook(id);
    }
  }, [id, fetchBook]);
  return (
    <>
      {book && Object.keys(book).length > 0 ? (
        <section className="book_detail_component">
          <img src={`${book.image_url}`} alt={book.title} />
          <div className="info">
            <h1>{book.title}</h1>
            <p className="author">{book.author || "Unknown Author"}</p>
            <p className="ratings">{book.ratings || "No ratings available"}</p>
            <p className="price">₹{book.price || "Price not available"}</p>
            <p className="description">
              {book.description || "Description not available."}
            </p>
            <p className="mb-10">
              Categories: <span>{book.categories?.join(", ") || "No categories available"}</span>
            </p>
            <div className="btn_container">
              <Button text={"Add to wishlist"} />
              <Button text={"Go to book"} url={`${book.url}`}/>
            </div>
          </div>
        </section>
      ) : (
        <div>Loading...</div>
      )}
      <CommentsSection/>
    </>
  );
};

export default BookDetailComponent;