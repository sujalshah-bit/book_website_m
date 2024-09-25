import Nav from '../landing_section/Nav'
import BookDetailComponent from './BookDetailComponent'

export const BookDetail = () => {
  return (
    <section className='bg-grey'>
        <Nav/>
    <section className='w-lg'>
        <BookDetailComponent/>
    </section>
    </section>
  )
}

export default BookDetail
