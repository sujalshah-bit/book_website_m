import Nav from '../landing_section/Nav'
import BookDetailComponent from './BookDetailComponent'
import CommentsSection from './Comment'

export const BookDetail = () => {
  return (
    <section className='bg-grey'>
        <Nav/>
    <section className='w-lg'>
        <BookDetailComponent/>
        <CommentsSection/>
    </section>
    </section>
  )
}

export default BookDetail
