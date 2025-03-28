import React, { useEffect, useState } from 'react';
// import exhibitionOptions from '../../constants/exhibitionOptions';
import exhibitionOptions from '../../constants/exhibitionOptions';
import whyexhibit from '../../assets/whyexhibit.png';
import scroll from '../../assets/scrolltop.png';
import { useNavigate } from 'react-router-dom';
import BookBooth from './BookBooth';

const ExhibitionOptions = () => {
  const [visible, setVisible] = useState(false);
  const [selectedBooth, setSelectedBooth] = useState(null);
  const navigate = useNavigate();

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return () => {
      window.removeEventListener('scroll', toggleVisible);
    };
  }, []);

  return (
    <section className='flex flex-col items-center justify-center min-h-screen py-14 mb-8 2xl:mb-16'>
      <div className="container 3xl:w-[70%] px-8 xl:px-20">
        <div className="relative heading flex justify-center items-center text-center mb-12">
          <h2 className='font-EBGaramond uppercase lg:py-2 text-lg sm:text-lg md:text-3xl lg:text-4xl xl:text-5xl font-normal'>{exhibitionOptions.whyExhibit.title}</h2>
          <div className="absolute bottom-0 left-[47.5%] right-[47.5%] w-[5%] h-[0.15rem] lg:h-[0.25rem] bg-[#1189CC] "></div>
        </div>
        <div className='text-base lg:text-xl xl:text-2xl text-justify'>
          {exhibitionOptions.whyExhibit.description}
        </div>
        <div className='text-base lg:text-xl xl:text-2xl space-y-4'>
          <div className='float-right'>
            <img src={whyexhibit} alt="" className='md:w-96 lg:w-full' />
          </div>
          <div>{exhibitionOptions.whyExhibit.benefitsTitle}</div>
          <div>
            <ul className='list-disc list-inside'>
              {exhibitionOptions.whyExhibit.benefits.map((i, idx) => (
                <li key={idx} className='text-sm lg:text-lg xl:text-xl'>{i}</li>
              ))}
            </ul>
          </div>
          <div>{exhibitionOptions.whyExhibit.additionalDescription}</div>
        </div>
        <div className='text-base lg:text-xl xl:text-2xl my-5'>
          <div className='py-8'>{exhibitionOptions.exhibitionOptions.title}</div>
          <div className='flex flex-col gap-12'>
            <BookBooth id={exhibitionOptions.exhibitionOptions.options.C1.id} title={exhibitionOptions.exhibitionOptions.options.C1.title} subtitle={exhibitionOptions.exhibitionOptions.options.C1.subTitle} features={exhibitionOptions.exhibitionOptions.options.C1.features} btn={exhibitionOptions.exhibitionOptions.bookButtonText} price={7000000} category={"C"} booth={"C1"} />
            <BookBooth id={exhibitionOptions.exhibitionOptions.options.C2.id} title={exhibitionOptions.exhibitionOptions.options.C2.title} subtitle={exhibitionOptions.exhibitionOptions.options.C2.subTitle} features={exhibitionOptions.exhibitionOptions.options.C2.features} btn={exhibitionOptions.exhibitionOptions.bookButtonText} price={10000000} category={"C"} booth={"C2"} />
            <BookBooth id={exhibitionOptions.exhibitionOptions.options.C3.id} title={exhibitionOptions.exhibitionOptions.options.C3.title} subtitle={exhibitionOptions.exhibitionOptions.options.C3.subTitle} features={exhibitionOptions.exhibitionOptions.options.C3.features} btn={exhibitionOptions.exhibitionOptions.bookButtonText} price={14000000} category={"C"} booth={"C3"} />
            <BookBooth id={exhibitionOptions.exhibitionOptions.options.C4.id} title={exhibitionOptions.exhibitionOptions.options.C4.title} subtitle={exhibitionOptions.exhibitionOptions.options.C4.subTitle} features={exhibitionOptions.exhibitionOptions.options.C4.features} description={exhibitionOptions.exhibitionOptions.options.C4.description} btn={exhibitionOptions.exhibitionOptions.bookButtonText} />

          </div>
        </div>
      </div>
      <div className='container px-4 lg:px-8 xl:px-12 2xl:px-16 py-8 text-right '>
        <button>
          <img src={scroll} alt="" className='w-full' onClick={scrollToTop} style={{ display: visible ? 'inline' : 'none' }} />
        </button>
      </div>
    </section>
  );
};

export default ExhibitionOptions;
