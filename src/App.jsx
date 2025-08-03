import { CircleArrowRight, CircleArrowLeft } from 'lucide-react';
import Card from './components/Card';
import { fetchMoments } from './lib/contentful'
import { useState, useEffect, useRef } from 'react'; 
function App() {
  const [moments, setMoments] = useState([])
  const [loading, setLoading] = useState(true)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const scrollContainerRef = useRef(null)

  useEffect(() => {
    const loadMoments = async () => {
      const data = await fetchMoments()    
      setMoments(data)                     
      setLoading(false)                   
    }
    loadMoments()
  }, [])

  const checkScrollability = () => {
    const container = scrollContainerRef.current
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container
      
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10) 
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      checkScrollability()
      container.addEventListener('scroll', checkScrollability)
      
      return () => container.removeEventListener('scroll', checkScrollability)
    }
  }, [moments])

  const scrollLeft = () => {
    const container = scrollContainerRef.current
    if (container) {
      container.scrollBy({
        left: -300,
        behavior: 'smooth'
      })
    }
  }

  const scrollRight = () => {
    const container = scrollContainerRef.current
    if (container) {
      container.scrollBy({
        left: 300, 
        behavior: 'smooth'
      })
    }
  }

  if (loading) return <div className="flex justify-center items-center h-screen">Loading moments...</div>

  return (
    <>
      <main className="w-[90%] h-screen flex flex-col justify-center items-center bg-white mx-auto md:gap-10 gap-0">
        <div className="flex w-full mb-10 flex-col gap-4 md:gap-0 md:flex-row">
          <div className='md:w-[50%] w-full'>
            <h1 className="text-black font-semibold text-2xl mb-4">Featured Moments</h1>
            <p className="text-[#110B08] text-sm">Our experiences reflect our distinct ethos and core values, highlighting the very best each of our homes offers.</p>
          </div>
          <div className='w-[50%] flex gap-2 items-end md:justify-end'>
           
            <button 
              className={`transition-all duration-200 ${
                canScrollLeft 
                  ? 'text-[#57392A] hover:text-[#3d251a] cursor-pointer' 
                  : 'text-gray-400 cursor-not-allowed'
              }`}
              onClick={scrollLeft}
              disabled={!canScrollLeft}
            >
              <CircleArrowLeft width={32} height={32}/>
            </button>
            

            <button 
              className={`transition-all duration-200 ${
                canScrollRight 
                  ? 'text-[#57392A] hover:text-[#3d251a] cursor-pointer' 
                  : 'text-gray-400 cursor-not-allowed'
              }`}
              onClick={scrollRight}
              disabled={!canScrollRight}
            >
              <CircleArrowRight width={32} height={32}/>
            </button>
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex gap-6 w-full overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {moments.map((moment) => (
            <Card key={moment.sys.id} moment={moment} />
          ))}
        </div>
      </main>
    </>
  )
}

export default App
