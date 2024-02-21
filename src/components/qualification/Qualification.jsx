import React, {useState} from 'react'
import "./qualification.css"

const Qualification = () => {
    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index) => {
        setToggleState(index);
    }
  return (
   <section className="qualification section">
    <h2 className="section__title">Qualifications</h2>
    <span className="section__subtitle">My Personal Journey</span>

    <div className="qualification__container container">
        <div className="qualification__tabs">
            <div className={toggleState === 1 ? "qualification__button qualification__active button--flex" : "qualification__button button--flex"}
             onClick={() => toggleTab(1)}
            >
                <i className="uil uil-graduation-cap qualification__icon"></i>{" "}Education 
            </div>

            <div className={toggleState === 2 ? "qualification__button qualification__active button--flex" : "qualification__button button--flex"}
             onClick={() => toggleTab(2)}
            >
                <i className="uil uil-briefcase-alt qualification__icon"></i>{" "}Experience 
            </div>


        </div>


        <div className="qualification__sections">
            <div className={toggleState === 1 ? "qualification__content qualification__content-active" :"qualification__content "}
           
            >
                <div className="qualification__data">
                   <div>
                    <h3 className="qualification__title">B.Tech(CSE-Data Science)</h3>
                    <span className="qualification__subtitle">KGRCET, Hyderabad</span>
                    <div className="qualification__calender">
                        <i className="uil uil-claendar-alt"></i>2021 - Present
                    </div>
                    </div> 
                    <div>
                        <span className="qualification__rounder"></span>
                        <span className="qualification__line"></span>
                    </div>

                </div>

                <div className="qualification__data">
                    <div></div>

                    <div>
                        <span className="qualification__rounder"></span>
                        <span className="qualification__line"></span>
                    </div>



                   <div>
                    <h3 className="qualification__title">12<sup>th</sup></h3>
                    <span className="qualification__subtitle">Little Flower School, ISC</span>
                    <div className="qualification__calender">
                        <i className="uil uil-claendar-alt"></i>2020
                    </div>
                    </div> 
                  

                </div>


                <div className="qualification__data">
                   <div>
                    <h3 className="qualification__title">10<sup>th</sup></h3>
                    <span className="qualification__subtitle">Little Flower School, ICSE</span>
                    <div className="qualification__calender">
                        <i className="uil uil-claendar-alt"></i>2019
                    </div>
                    </div> 
                    <div>
                        <span className="qualification__rounder"></span>
                        <span className="qualification__line"></span>
                    </div>

                </div>

                



            </div>

            <div className={toggleState === 2 ? "qualification__content qualification__content-active" :"qualification__content "}
            onClick={() => toggleTab(2)}
            >
                
                <div className="qualification__data">
                   <div>
                    <h3 className="qualification__title">Flutter Developer</h3>
                    <span className="qualification__subtitle">Built-In Tech </span>
                    <div className="qualification__calender">
                        <i className="uil uil-claendar-alt"></i>2022
                    </div>
                    </div> 
                    <div>
                        <span className="qualification__rounder"></span>
                        <span className="qualification__line"></span>
                    </div>

                </div>

                <div className="qualification__data">
                    <div></div>

                    <div>
                        <span className="qualification__rounder"></span>
                        <span className="qualification__line"></span>
                    </div>



                   <div>
                    <h3 className="qualification__title">Product Developer</h3>
                    <span className="qualification__subtitle">KASE-KGRCET</span>
                    <div className="qualification__calender">
                        <i className="uil uil-claendar-alt"></i>2022 - Present
                    </div>
                    </div> 
                  

                </div>


                <div className="qualification__data">
                   <div>
                    <h3 className="qualification__title">Web Development</h3>
                    <span className="qualification__subtitle">KGRCET</span>
                    <div className="qualification__calender">
                        <i className="uil uil-claendar-alt"></i>2021 - Present
                    </div>
                    </div> 
                    <div>
                        <span className="qualification__rounder"></span>
                        <span className="qualification__line"></span>
                    </div>

                </div>

              



            </div>


        </div>
    </div>
   </section>
  )
}

export default Qualification