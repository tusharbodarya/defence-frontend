import React, {  useState } from "react";
import string from "../constants/string";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import download from "../assets/Vector.png";
import bgimg from "../assets/FAQ.png"

const FAQs = () => {
    const [isOpen, setIsOpen] = useState({
        quastion1: false,
        quastion2: false,
        quastion3: false,
        quastion4: false,
        quastion5: false,
        quastion6: false,
        quastion7: false,
        quastion8: false,
        quastion9: false,
        quastion10: false,
        quastion11: false,
        quastion12: false,
        quastion13: false,
        quastion14: false,

    });
    const handleOpen = (index) => {
        setIsOpen((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    }
    // const [smallscreen, setSmallscreen]= useState(
    //     window.innerWidth >= 780
    // );
    // useEffect(()=>{
    //     const handleResize=()=>{
    //         setSmallscreen(window.innerWidth >= 780);
    //     }
    // },[])

    return (
        <>
            <section className="faqs flex justify-center text-center pb-32">
                <div className="relative container w-full flex flex-col justify-center items-center px-2 md:px-8">
                    <div className=" absolute top-[4rem] image">
                        <img src={bgimg} alt="" className="scale-50 md:scale-100"/>
                    </div>
                    <div className="heading relative w-full  items-center  font-EBGaramond font-bold p-4  mt-[6rem] ">
                        <div className="">
                            <h2 className="text-pretty text-[1.3rem] md:text-3xl lg:text-4xl xl:text-5xl pb-8 mt-4 md:mt-6 xl:mt-2 ">{string.FAQstitle}</h2>
                        </div>
                        <div className="absolute top-[4.8rem] md:top-12 lg:top-10 xl:top-8 right-8 md:right-14 lg:right-20 xl:right-28 download pb-8">
                            <button className="flex  items-center gap-1 border-blue-400 font-poppins text-textblue font-normal border rounded-lg p-1 lg:p-2 text-xs lg:text-base">
                                <img src={download} className="w-3 lg:w-5" alt="" />
                                Download
                            </button>
                        </div>
                    </div>
                    <div className="w-[80%]" >
                        <div className="flex flex-col w-full text-sm sm:text-lg lg:text-xl xl:text-xl 2xl:text-2xl py-4 ">
                            <button onClick={() => handleOpen("quastion1")} className="w-full row flex justify-between items-center  " >
                                <div className={isOpen.quastion1 === true ? "font-semibold text-left" : "font-normal text-left"}>{string.quastion1}</div>
                                <button >
                                    {isOpen.quastion1 === true ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                </button>
                            </button>
                            {isOpen.quastion1 && (
                                <div className="answer text-justify text-sm sm:text-base lg:text-lg 2xl:text-xl  py-2 md:py-4 lg:py-8 xl:py-10 2xl:py-12 text-black/50">
                                    <div>{string.answer1}</div>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col w-full text-sm sm:text-lg lg:text-xl xl:text-xl 2xl:text-2xl py-4">
                            <button onClick={() => handleOpen("quastion2")} className="w-full row flex justify-between items-center  " >
                                <div className={isOpen.quastion2 === true ? "font-semibold text-left" : "font-normal text-left"}>{string.quastion2}</div>
                                <button >
                                    {isOpen.quastion2 === true ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                </button>
                            </button>
                            {isOpen.quastion2 && (
                                <div className="answer text-justify text-sm sm:text-base lg:text-lg 2xl:text-xl  py-2 md:py-4 lg:py-8 xl:py-10 2xl:py-12 text-black/50">
                                    <div className="pb-2 lg:pb-4 xl:pb-6 2xl:pb-8" >{string.answer21}</div>
                                    <div> {string.answer22}</div>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col w-full text-sm sm:text-lg lg:text-xl xl:text-xl 2xl:text-2xl py-4">
                            <button onClick={() => handleOpen("quastion3")} className="w-full row flex justify-between items-center  " >
                                <div className={isOpen.quastion3 === true ? "font-semibold text-left" : "font-normal text-left"}>{string.quastion3}</div>
                                <button >
                                    {isOpen.quastion3 === true ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                </button>
                            </button>
                            {isOpen.quastion3 && (
                                <div className="answer text-justify text-sm sm:text-base lg:text-lg 2xl:text-xl  py-2 md:py-4 lg:py-8 xl:py-10 2xl:py-12 text-black/50">
                                    <div>{string.answer3a}</div>
                                    <div>{string.answer3b}</div>
                                    <div>{string.answer3c}</div>
                                    <div>{string.answer3d}</div>
                                    <div>{string.answer3e}</div>
                                    <div>{string.answer3f}</div>
                                    <div className="pb-2 lg:pb-4 xl:pb-6 2xl:pb-8">{string.answer3g}</div>
                                    <div>{string.answer3h}</div>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col w-full text-sm sm:text-lg lg:text-xl xl:text-xl 2xl:text-2xl py-4">
                            <button onClick={() => handleOpen("quastion4")} className="w-full row flex justify-between items-center  " >
                                <div className={isOpen.quastion4 === true ? "font-semibold text-left" : "font-normal text-left"}>{string.quastion4}</div>
                                <button >
                                    {isOpen.quastion4 === true ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                </button>
                            </button>
                            {isOpen.quastion4 && (
                                <div className=" answer text-justify text-sm sm:text-base lg:text-lg 2xl:text-xl  py-2 md:py-4 lg:py-8 xl:py-10 2xl:py-12 text-black/50">
                                    <div>{string.answer4a}</div>
                                    <div>{string.answer4b}</div>
                                    <div>{string.answer4c}</div>
                                    <div>{string.answer4d}</div>
                                    <div>{string.answer4e}</div>
                                    <div>{string.answer4f}</div>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col w-full text-sm sm:text-lg lg:text-xl xl:text-xl 2xl:text-2xl py-4">
                            <button onClick={() => handleOpen("quastion5")} className="w-full row flex justify-between items-center  " >
                                <div className={isOpen.quastion5 === true ? "font-semibold text-left" : "font-normal text-left"}>{string.quastion5}</div>
                                <button >
                                    {isOpen.quastion5 === true ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                </button>
                            </button>
                            {isOpen.quastion5 && (
                                <div className="answer text-justify text-sm sm:text-base lg:text-lg 2xl:text-xl  py-2 md:py-4 lg:py-8 xl:py-10 2xl:py-12 text-black/50">
                                    <div>{string.answer5a}</div>
                                    <div>{string.answer5b}</div>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col w-full text-sm sm:text-lg lg:text-xl xl:text-xl 2xl:text-2xl py-4">
                            <button onClick={() => handleOpen("quastion6")} className="w-full flex justify-between items-center">
                                <div className={isOpen.quastion6 === true ? "font-semibold text-left" : "font-normal text-left"}>{string.quastion6}</div>
                                <button  >
                                    {isOpen.quastion6 === true ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                </button>
                            </button>
                            {isOpen.quastion6 && (
                                <div className="answer text-justify text-sm sm:text-base lg:text-lg 2xl:text-xl  py-2 md:py-4 lg:py-8 xl:py-10 2xl:py-12 text-black/50">
                                    <div>{string.answer6a}</div>
                                    <div>{string.answer6b}</div>
                                    <div>{string.answer6c}</div>
                                    <div>{string.answer6d1}</div>
                                    <div>{string.answer6d2}</div>
                                    <div>{string.answer6d3}</div>
                                    <div>{string.answer6d4}</div>
                                    <div>{string.answer6d5}</div>
                                    <div>{string.answer6d6}</div>
                                    <div>{string.answer6d7}</div>
                                    <div>{string.answer6e}</div>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col w-full text-sm sm:text-lg lg:text-xl xl:text-xl 2xl:text-2xl py-4">
                            <button onClick={() => handleOpen("quastion7")} className="w-full row flex justify-between items-center  " >
                                <div className={isOpen.quastion7 === true ? "font-semibold text-left" : "font-normal text-left"}>{string.quastion7}</div>
                                <button >
                                    {isOpen.quastion7 === true ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                </button>
                            </button>
                            {isOpen.quastion7 && (
                                <div className="answer text-justify text-sm sm:text-base lg:text-lg 2xl:text-xl  py-2 md:py-4 lg:py-8 xl:py-10 2xl:py-12 text-black/50">
                                    <div>{string.answer7}</div>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col w-full text-sm sm:text-lg lg:text-xl xl:text-xl 2xl:text-2xl py-4">
                            <button onClick={() => handleOpen("quastion8")} className="w-full row flex justify-between items-center  " >
                                <div  className={isOpen.quastion8 === true ? "font-semibold text-left" : "font-normal text-left"}>{string.quastion8}</div>
                                <button >
                                    {isOpen.quastion8 === true ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                </button>
                            </button>
                            {isOpen.quastion8 && (
                                <div className="answer text-justify text-sm sm:text-base lg:text-lg 2xl:text-xl  py-2 md:py-4 lg:py-8 xl:py-10 2xl:py-12 text-black/50">
                                    <div>{string.answer81}</div>
                                    <div>{string.answer8a}</div>
                                    <div>{string.answer8b}</div>
                                    <div className="pb-2 lg:pb-4 xl:pb-6 2xl:pb-8">{string.answer8c}</div>
                                    <div className="pb-2 lg:pb-4 xl:pb-6 2xl:pb-8">{string.answer82}</div>
                                    <div>{string.answer83}</div>
                                    <div>{string.answer83a}</div>
                                    <div>{string.answer83b}</div>
                                    <div>{string.answer83c}</div>
                                    <div className="pb-2 lg:pb-4 xl:pb-6 2xl:pb-8">{string.answer83d}</div>
                                    <div>{string.answer84}</div>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col w-full text-sm sm:text-lg lg:text-xl xl:text-xl 2xl:text-2xl py-4">
                            <button onClick={() => handleOpen("quastion9")} className="w-full row flex justify-between items-center  " >
                                <div className={isOpen.quastion9 === true ? "font-semibold text-left" : "font-normal text-left"}>{string.quastion9}</div>
                                <button >
                                    {isOpen.quastion9 === true ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                </button>
                            </button>
                            {isOpen.quastion9 && (
                                <div className="answer text-justify text-sm sm:text-base lg:text-lg 2xl:text-xl  py-2 md:py-4 lg:py-8 xl:py-10 2xl:py-12 text-black/50">
                                    <div>{string.answer9a}</div>
                                    <div>{string.answer9b}</div>
                                    <div>{string.answer9c}</div>
                                    <div className="pb-2 lg:pb-4 xl:pb-6 2xl:pb-8">{string.answer9d}</div>
                                    <div className="pb-2 lg:pb-4 xl:pb-6 2xl:pb-8">{string.answer91}</div>
                                    <div>{string.answer92}</div>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col w-full text-sm sm:text-lg lg:text-xl xl:text-xl 2xl:text-2xl py-4">
                            <button onClick={() => handleOpen("quastion10")} className="w-full row flex justify-between items-center  " >
                                <div className={isOpen.quastion10 === true ? "font-semibold text-left" : "font-normal text-left"}>{string.quastion10}</div>
                                <button >
                                    {isOpen.quastion10 === true ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                </button>
                            </button>
                            {isOpen.quastion10 && (
                                <div className="answer text-justify text-sm sm:text-base lg:text-lg 2xl:text-xl  py-2 md:py-4 lg:py-8 xl:py-10 2xl:py-12 text-black/50">
                                    <div className="pb-2 lg:pb-4 xl:pb-6 2xl:pb-8">{string.answer101}</div>
                                    <div className="pb-2 lg:pb-4 xl:pb-6 2xl:pb-8">{string.answer102}</div>
                                    <div className="pb-2 lg:pb-4 xl:pb-6 2xl:pb-8">{string.answer103}</div>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col w-full text-sm sm:text-lg lg:text-xl xl:text-xl 2xl:text-2xl py-4">
                            <button onClick={() => handleOpen("quastion11")} className="w-full row flex justify-between items-center  " >
                                <div className={isOpen.quastion11 === true ? "font-semibold text-left" : "font-normal text-left"}>{string.quastion11}</div>
                                <button >
                                    {isOpen.quastion11 === true ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                </button>
                            </button>
                            {isOpen.quastion11 && (
                                <div className=" answer text-justify text-sm sm:text-base lg:text-lg 2xl:text-xl  py-2 md:py-4 lg:py-8 xl:py-10 2xl:py-12 text-black/50">
                                    <div className="pb-2 lg:pb-4 xl:pb-6 2xl:pb-8">{string.answer111}</div>
                                    <div className="pb-2 lg:pb-4 xl:pb-6 2xl:pb-8">{string.answer112}</div>
                                    <div className="pb-2 lg:pb-4 xl:pb-6 2xl:pb-8">{string.answer113}</div>
                                    <div className="pb-2 lg:pb-4 xl:pb-6 2xl:pb-8">{string.answer114}</div>
                                    <div className="pb-2 lg:pb-4 xl:pb-6 2xl:pb-8">{string.answer115}</div>
                                    <div className="pb-2 lg:pb-4 xl:pb-6 2xl:pb-8">{string.answer116}</div>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col w-full text-sm sm:text-lg lg:text-xl xl:text-xl 2xl:text-2xl py-4">
                            <button onClick={() => handleOpen("quastion12")} className="w-full row flex justify-between items-center  " >
                                <div className={isOpen.quastion12 === true ? "font-semibold text-left" : "font-normal text-left"}>{string.quastion12}</div>
                                <button >
                                    {isOpen.quastion12 === true ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                </button>
                            </button>
                            {isOpen.quastion12 && (
                                <div className="answer text-justify text-sm sm:text-base lg:text-lg 2xl:text-xl  py-2 md:py-4 lg:py-8 xl:py-10 2xl:py-12 text-black/50">
                                    <div className="pb-2 lg:pb-4 xl:pb-6 2xl:pb-8">{string.answer121}</div>
                                    <div>{string.answer122}</div>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col w-full text-sm sm:text-lg lg:text-xl xl:text-xl 2xl:text-2xl py-4">
                            <button onClick={() => handleOpen("quastion13")} className="w-full row flex justify-between items-center  " >
                                <div className={isOpen.quastion13 === true ? "font-semibold text-left" : "font-normal text-left"}>{string.quastion13}</div>
                                <button >
                                    {isOpen.quastion13 === true ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                </button>
                            </button>
                            {isOpen.quastion13 && (
                                <div className="answer text-justify text-sm sm:text-base lg:text-lg 2xl:text-xl  py-2 md:py-4 lg:py-8 xl:py-10 2xl:py-12 text-black/50">
                                    <div>{string.answer13}</div>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col w-full text-sm sm:text-lg lg:text-xl xl:text-xl 2xl:text-2xl py-4">
                            <button onClick={() => handleOpen("quastion14")} className="w-full row flex justify-between items-center  " >
                                <div  className={isOpen.quastion14 === true ? "font-semibold text-left" : "font-normal text-left"}>{string.quastion14}</div>
                                <button >
                                    {isOpen.quastion14 === true ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                </button>
                            </button>
                            {isOpen.quastion14 && (
                                <div className="answer text-justify text-sm sm:text-base lg:text-lg 2xl:text-xl  py-2 md:py-4 lg:py-8 xl:py-10 2xl:py-12 text-black/50">
                                    <div className="pb-2 lg:pb-4 xl:pb-6 2xl:pb-8">{string.answer141}</div>
                                    <div>{string.answer142}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default FAQs;