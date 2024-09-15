import Button from "../Button";
import "../../styles/BookDetailComponent.css";
const BookDetailComponent = () => {
  return (
    <section className="book_detail_component">
      <img src="/src/assets/book-demo.png" alt="" />
      <div className="info">
        <h1>Chain of Gold: The Last Hours #1</h1>
        <p className="author">Cassandra Clare</p>
        <p className="ratings">4.7 out of 5</p>
        <p className="price">$12.49</p>
        <p className="description">
          From #1 New York Times and USA TODAY bestselling author Cassandra
          Clare comes the first novel in a brand-new trilogy where evil hides in
          plain sight and love cuts deeper than any blade. Chain of Gold is a
          Shadowhunters novel.
        </p>
        <p className="mb-10">
          Categories: <span>Books, Action, Children Books</span>
        </p>
        <div className="btn_container">
          <Button text={"Add to cart"} />
          <Button text={"Go to book"} />
        </div>
      </div>
    </section>
  );
};

export default BookDetailComponent;
