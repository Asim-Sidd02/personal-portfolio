import React, { useState } from 'react'
import "./services.css"

const Services = () => {
    const [toggleState, setToggleState] = useState(0);
    const toggleTab = (index) => {
        setToggleState(index);
    }


  return (
    <section className="services section" id="services">
           <h2 className="section__title">Services</h2>
        <span className="section__subtitle">What I offer</span>

        <div className="services__container container grid">
            <div className="services__content">
                <div>
                    <i className="uil uil-web-grid services__icon"></i>
                    <h3 className="services__title">
                        Front-End <br /> Developer
                    </h3>

                </div>
                <span className="services__button" onClick={() => toggleTab(1)}>
                    View More
                <i className="uil uil-arrow-right services__button-icon"></i></span>

                <div className={toggleState === 1 ? "services__modal active-modal" : "services__modal"}>
                    <div className="services__modal-content">
                        <i onClick={() => toggleTab(0)} className="uil uil-times services__modal-close"></i>

                        <h3 className="services__modal-title">Front-End Developer</h3>
                        <p className="services__modal-description">Crafting seamless web experiences with code and collaboration.</p>
                        <ul className="services__modal-services grid">
                            <li className="services__modal-service">
                                <i className="uil uil-check-circle services__modal-icon"></i>
                                <p className="services__modal-info">Proficient in HTML, CSS, JavaScript</p>
                            </li>

                            <li className="services__modal-service">
                                <i className="uil uil-check-circle services__modal-icon"></i>
                                <p className="services__modal-info">Familiar with Front-End Frameworks/Libraries (e.g., React, Angular, Vue.js)</p>
                            </li>

                            <li className="services__modal-service">
                                <i className="uil uil-check-circle services__modal-icon"></i>
                                <p className="services__modal-info">Knowledgeable in Responsive Design</p>
                            </li>

                            <li className="services__modal-service">
                                <i className="uil uil-check-circle services__modal-icon"></i>
                                <p className="services__modal-info">Strong Problem-Solving Skills.</p>
                            </li>

                            <li className="services__modal-service">
                                <i className="uil uil-check-circle services__modal-icon"></i>
                                <p className="services__modal-info">Effective Communication and Collaboration.</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        
        
            <div className="services__content">
                <div>
                    <i className="uil uil-edit services__icon "></i>
                    <h3 className="services__title">
                        Application <br /> Developer
                    </h3>

                </div>
                <span className="services__button"onClick={() => toggleTab(2)}>
                    View More
                <i className="uil uil-arrow-right services__button-icon"></i></span>

                <div className={toggleState === 2 ? "services__modal active-modal" : "services__modal"}>
                    
                    <div className="services__modal-content">
                        <i onClick={() => toggleTab(0)} className="uil uil-times services__modal-close"></i>

                        <h3 className="services__modal-title">Application Developer</h3>
                        <p className="services__modal-description">Building innovative apps through code, design, and deployment.</p>
                        <ul className="services__modal-services grid">
                            <li className="services__modal-service">
                                <i className="uil uil-check-circle services__modal-icon"></i>
                                <p className="services__modal-info">Proficient in Programming Languages.</p>
                            </li>

                            <li className="services__modal-service">
                                <i className="uil uil-check-circle services__modal-icon"></i>
                                <p className="services__modal-info">Versatile with Various Development Environments.</p>
                            </li>

                            <li className="services__modal-service">
                                <i className="uil uil-check-circle services__modal-icon"></i>
                                <p className="services__modal-info">Skilled in UI/UX Design Principles.</p>
                            </li>

                            <li className="services__modal-service">
                                <i className="uil uil-check-circle services__modal-icon"></i>
                                <p className="services__modal-info">Experienced in Testing and Debugging.</p>
                            </li>

                            <li className="services__modal-service">
                                <i className="uil uil-check-circle services__modal-icon"></i>
                                <p className="services__modal-info">Knowledgeable in App Store Deployment Processes.</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="services__content">
                <div>
                    <i className="uil uil-arrow services__icon"></i>
                    <h3 className="services__title">
                    Coder <br /> 
                    </h3>

                </div>
                <span className="services__button" onClick={() => toggleTab(3)}>
                    View More
                <i className="uil uil-arrow-right services__button-icon"></i></span>

                <div className={toggleState === 3 ? "services__modal active-modal" : "services__modal"}>
                    
                    <div className="services__modal-content">
                        <i onClick={() => toggleTab(0)}className="uil uil-times services__modal-close"></i>

                        <h3 className="services__modal-title">Coder</h3>
                        <p className="services__modal-description">Transforming ideas into code with precision and innovation</p>
                        <ul className="services__modal-services grid">
                            <li className="services__modal-service">
                                <i className="uil uil-check-circle services__modal-icon"></i>
                                <p className="services__modal-info">Proficient in Programming Languages.</p>
                            </li>

                            <li className="services__modal-service">
                                <i className="uil uil-check-circle services__modal-icon"></i>
                                <p className="services__modal-info">Strong Problem-Solving Skills.</p>
                            </li>

                            <li className="services__modal-service">
                                <i className="uil uil-check-circle services__modal-icon"></i>
                                <p className="services__modal-info">Attention to Detail.</p>
                            </li>

                            <li className="services__modal-service">
                                <i className="uil uil-check-circle services__modal-icon"></i>
                                <p className="services__modal-info">Continuous Learning and Adaptability.</p>
                            </li>

                            <li className="services__modal-service">
                                <i className="uil uil-check-circle services__modal-icon"></i>
                                <p className="services__modal-info">Effective Communication.</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            </div>

    </section>
  )
}

export default Services
