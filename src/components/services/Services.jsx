import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'motion/react'
import "./services.css"
import SpotlightCard from "./SpotlightCard";

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.94 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

const Services = () => {
    const [toggleState, setToggleState] = useState(0);
    const toggleTab = (index) => {
        setToggleState(index);
    }

    return (
        <section className="services section" id="services">
            <h2 className="section__title">Expertise</h2>
            <span className="section__subtitle">What I Work On</span>

            <div className="services__container container grid">

                {/* ----------- CARD 1 ----------- */}
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0 }}
                >
                <SpotlightCard
                    className="services__content custom-spotlight-card"
                    spotlightColor="rgba(0, 229, 255, 0.2)"
                >
                    <div>
                        <i className="uil uil-server-network services__icon"></i>
                        <h3 className="services__title">
                            Full-Stack <br /> Developer
                        </h3>
                    </div>

                    <span className="services__button" onClick={() => toggleTab(1)}>
                        View More
                        <i className="uil uil-arrow-right services__button-icon"></i>
                    </span>

                    {createPortal(
                        <div className={toggleState === 1 ? "services__modal active-modal" : "services__modal"}>
                            <div className="services__modal-content">
                                <i onClick={() => toggleTab(0)} className="uil uil-times services__modal-close"></i>

                                <h3 className="services__modal-title">Full-Stack Developer</h3>
                                <p className="services__modal-description">Owning a product end-to-end, from the interface down to the database.</p>

                                <ul className="services__modal-services grid">
                                    <li className="services__modal-service">
                                        <i className="uil uil-check-circle services__modal-icon"></i>
                                        <p className="services__modal-info">Proficient in React, Vue.js & Laravel</p>
                                    </li>

                                    <li className="services__modal-service">
                                        <i className="uil uil-check-circle services__modal-icon"></i>
                                        <p className="services__modal-info">Skilled in REST API design & integration</p>
                                    </li>

                                    <li className="services__modal-service">
                                        <i className="uil uil-check-circle services__modal-icon"></i>
                                        <p className="services__modal-info">Experienced with MySQL, Redis & Firebase</p>
                                    </li>

                                    <li className="services__modal-service">
                                        <i className="uil uil-check-circle services__modal-icon"></i>
                                        <p className="services__modal-info">Comfortable owning the entire stack</p>
                                    </li>

                                    <li className="services__modal-service">
                                        <i className="uil uil-check-circle services__modal-icon"></i>
                                        <p className="services__modal-info">Strong Problem-Solving Skills</p>
                                    </li>
                                </ul>
                            </div>
                        </div>,
                        document.body
                    )}
                </SpotlightCard>
                </motion.div>

                {/* ----------- CARD 2 ----------- */}
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.1 }}
                >
                <SpotlightCard
                    className="services__content custom-spotlight-card"
                    spotlightColor="rgba(0, 229, 255, 0.2)"
                >
                    <div>
                        <i className="uil uil-edit services__icon"></i>
                        <h3 className="services__title">
                            Application <br /> Developer
                        </h3>
                    </div>

                    <span className="services__button" onClick={() => toggleTab(2)}>
                        View More
                        <i className="uil uil-arrow-right services__button-icon"></i>
                    </span>

                    {createPortal(
                        <div className={toggleState === 2 ? "services__modal active-modal" : "services__modal"}>
                            <div className="services__modal-content">
                                <i onClick={() => toggleTab(0)} className="uil uil-times services__modal-close"></i>

                                <h3 className="services__modal-title">Application Developer</h3>
                                <p className="services__modal-description">Building innovative apps through code, design, and deployment.</p>

                                <ul className="services__modal-services grid">
                                    <li className="services__modal-service">
                                        <i className="uil uil-check-circle services__modal-icon"></i>
                                        <p className="services__modal-info">Proficient in Programming Languages</p>
                                    </li>

                                    <li className="services__modal-service">
                                        <i className="uil uil-check-circle services__modal-icon"></i>
                                        <p className="services__modal-info">Versatile with Development Environments</p>
                                    </li>

                                    <li className="services__modal-service">
                                        <i className="uil uil-check-circle services__modal-icon"></i>
                                        <p className="services__modal-info">Skilled in UI/UX Principles</p>
                                    </li>

                                    <li className="services__modal-service">
                                        <i className="uil uil-check-circle services__modal-icon"></i>
                                        <p className="services__modal-info">Experienced in Testing & Debugging</p>
                                    </li>

                                    <li className="services__modal-service">
                                        <i className="uil uil-check-circle services__modal-icon"></i>
                                        <p className="services__modal-info">Knowledge of App Store Deployment</p>
                                    </li>
                                </ul>
                            </div>
                        </div>,
                        document.body
                    )}
                </SpotlightCard>
                </motion.div>

                {/* ----------- CARD 3 ----------- */}
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.2 }}
                >
                <SpotlightCard
                    className="services__content custom-spotlight-card"
                    spotlightColor="rgba(0, 229, 255, 0.2)"
                >
                    <div>
                        <i className="uil uil-arrow services__icon"></i>
                        <h3 className="services__title">
                            Coder
                        </h3>
                    </div>

                    <span className="services__button" onClick={() => toggleTab(3)}>
                        View More
                        <i className="uil uil-arrow-right services__button-icon"></i>
                    </span>

                    {createPortal(
                        <div className={toggleState === 3 ? "services__modal active-modal" : "services__modal"}>
                            <div className="services__modal-content">
                                <i onClick={() => toggleTab(0)} className="uil uil-times services__modal-close"></i>

                                <h3 className="services__modal-title">Coder</h3>
                                <p className="services__modal-description">Transforming ideas into code with precision and innovation.</p>

                                <ul className="services__modal-services grid">
                                    <li className="services__modal-service">
                                        <i className="uil uil-check-circle services__modal-icon"></i>
                                        <p className="services__modal-info">Proficient in Multiple Languages</p>
                                    </li>

                                    <li className="services__modal-service">
                                        <i className="uil uil-check-circle services__modal-icon"></i>
                                        <p className="services__modal-info">Strong Problem-Solving</p>
                                    </li>

                                    <li className="services__modal-service">
                                        <i className="uil uil-check-circle services__modal-icon"></i>
                                        <p className="services__modal-info">Attention to Detail</p>
                                    </li>

                                    <li className="services__modal-service">
                                        <i className="uil uil-check-circle services__modal-icon"></i>
                                        <p className="services__modal-info">Continuous Learning</p>
                                    </li>

                                    <li className="services__modal-service">
                                        <i className="uil uil-check-circle services__modal-icon"></i>
                                        <p className="services__modal-info">Effective Communication</p>
                                    </li>
                                </ul>
                            </div>
                        </div>,
                        document.body
                    )}
                </SpotlightCard>
                </motion.div>

                {/* ----------- CARD 4 ----------- */}
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.3 }}
                >
                <SpotlightCard
                    className="services__content custom-spotlight-card"
                    spotlightColor="rgba(0, 229, 255, 0.2)"
                >
                    <div>
                        <i className="uil uil-shopping-cart services__icon"></i>
                        <h3 className="services__title">
                            E-commerce <br /> Developer
                        </h3>
                    </div>

                    <span className="services__button" onClick={() => toggleTab(4)}>
                        View More
                        <i className="uil uil-arrow-right services__button-icon"></i>
                    </span>

                    {createPortal(
                        <div className={toggleState === 4 ? "services__modal active-modal" : "services__modal"}>
                            <div className="services__modal-content">
                                <i onClick={() => toggleTab(0)} className="uil uil-times services__modal-close"></i>

                                <h3 className="services__modal-title">E-commerce Developer</h3>
                                <p className="services__modal-description">Building and customizing online stores that convert.</p>

                                <ul className="services__modal-services grid">
                                    <li className="services__modal-service">
                                        <i className="uil uil-check-circle services__modal-icon"></i>
                                        <p className="services__modal-info">Shopify Liquid & Hydrogen theme development</p>
                                    </li>

                                    <li className="services__modal-service">
                                        <i className="uil uil-check-circle services__modal-icon"></i>
                                        <p className="services__modal-info">Custom storefront UI & third-party integrations</p>
                                    </li>

                                    <li className="services__modal-service">
                                        <i className="uil uil-check-circle services__modal-icon"></i>
                                        <p className="services__modal-info">Cart, checkout & site performance optimization</p>
                                    </li>

                                    <li className="services__modal-service">
                                        <i className="uil uil-check-circle services__modal-icon"></i>
                                        <p className="services__modal-info">Subscription & payment API integrations</p>
                                    </li>

                                    <li className="services__modal-service">
                                        <i className="uil uil-check-circle services__modal-icon"></i>
                                        <p className="services__modal-info">End-to-end store deployment</p>
                                    </li>
                                </ul>
                            </div>
                        </div>,
                        document.body
                    )}
                </SpotlightCard>
                </motion.div>

            </div>
        </section>
    );
};

export default Services;
