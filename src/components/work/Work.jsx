import React from 'react'
import "./work.css"
import Works from './Works'

const Work = () => {
  return (
   <section className="work section" id='portfolio'>
    <h2 className="section__title">Portfolio</h2>
    <span className="section__subtitle">My Works</span>


    <Works />

    <div className="office-projects">
      <h3 className="office__section-title">Office Projects</h3>
      <span className="office__section-subtitle">
        Projects I built while working in a professional environment.
      </span>

      <div className="office__container">
        <article className="office__card">
          <h4 className="office__name">Somany Ceramics</h4>
          <p className="office__description">
            Built the PIM backend with Laravel/Vue.js and deployed on AWS.
          </p>
          <a
            href="https://www.somanyceramics.com/"
            className="office__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            View site
          </a>
        </article>

        <article className="office__card">
          <h4 className="office__name">Jurix Legal Apps</h4>
          <p className="office__description">
            Developed a suite of 5 legal operations apps using Flutter.
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=com.jurix.jurix_mobile&hl=en_IN"
            className="office__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Play Store
          </a>
        </article>

        <article className="office__card">
          <h4 className="office__name">Aptronix India</h4>
          <p className="office__description">
            Built the Shopify storefront with third-party API integrations and custom backend apps.
          </p>
          <a
            href="https://www.aptronixindia.com/"
            className="office__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            View site
          </a>
        </article>
      </div>
    </div>
   </section>
  )
}

export default Work
