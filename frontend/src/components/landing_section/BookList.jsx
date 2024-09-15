import "../../styles/BookList.css";
import BookCard from '../BookCard'
import data from '../../../util/sample_book.json';
const BookList = () => {
  return (
    <section className="book_list">
        {
            data.map((elem,index)=>{
                const combinedProps = { elem, index };
                return <BookCard {...combinedProps} key={index}/>
            })
        }
        
    </section>
  )
}

export default BookList