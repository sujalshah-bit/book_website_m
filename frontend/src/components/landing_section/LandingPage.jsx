// import HeroSection from './HeroSection'
import Nav from './Nav'
import HeroSection from './HeroSection'
import Footer from '../Footer'

import BookList from './BookList'

function LandingPage() {
  return (
    <section>
        <Nav/>
        {/* <HeroSection/> */}
        <BookList/>
        <Footer/>
    </section>
  )
}

export default LandingPage