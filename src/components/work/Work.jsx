import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import "./work.css"
import Works from './Works'
import { caseStudies } from './CaseStudyData'

const Work = () => {
  const [activeCase, setActiveCase] = useState(null)
  const activeStudy = caseStudies.find((study) => study.id === activeCase)

  return (
   <section className="work section" id='portfolio'>
    <h2 className="section__title">Portfolio</h2>
    <span className="section__subtitle">My Works</span>


    <Works />

    <div className="office-projects">
      <h3 className="office__section-title">Office Projects</h3>
      <span className="office__section-subtitle">
        Case studies from professional engineering work.
      </span>

      <div className="office__container">
        {caseStudies.map((study) => (
          <article className="office__card" key={study.id}>
            <h4 className="office__name">{study.name}</h4>
            <span className="office__role">{study.role}</span>
            <div className="office__stack">
              {study.stack.map((tech) => (
                <span className="office__chip" key={tech}>{tech}</span>
              ))}
            </div>
            <button
              type="button"
              className="office__link office__link--button"
              onClick={() => setActiveCase(study.id)}
            >
              View Case Study
              <i className="uil uil-arrow-right"></i>
            </button>
          </article>
        ))}
      </div>
    </div>

    {createPortal(
      <div className={activeStudy ? "casestudy__modal active-modal" : "casestudy__modal"}>
        <div className="casestudy__modal-content">
          <i
            onClick={() => setActiveCase(null)}
            className="uil uil-times casestudy__modal-close"
          ></i>

          {activeStudy && (
            <>
              <span className="casestudy__eyebrow">{activeStudy.role}</span>
              <h3 className="casestudy__title">{activeStudy.name}</h3>

              <div className="casestudy__stack">
                {activeStudy.stack.map((tech) => (
                  <span className="office__chip" key={tech}>{tech}</span>
                ))}
              </div>

              <h5 className="casestudy__heading">The Challenge</h5>
              <p className="casestudy__paragraph">{activeStudy.problem}</p>

              <h5 className="casestudy__heading">What I Built</h5>
              <ul className="casestudy__list">
                {activeStudy.contributions.map((line) => (
                  <li className="casestudy__list-item" key={line}>
                    <i className="uil uil-check-circle casestudy__list-icon"></i>
                    <p>{line}</p>
                  </li>
                ))}
              </ul>

              <h5 className="casestudy__heading">Impact</h5>
              <ul className="casestudy__list">
                {activeStudy.impact.map((line) => (
                  <li className="casestudy__list-item" key={line}>
                    <i className="uil uil-arrow-growth casestudy__list-icon"></i>
                    <p>{line}</p>
                  </li>
                ))}
              </ul>

              <a
                href={activeStudy.link}
                target="_blank"
                rel="noopener noreferrer"
                className="button button--flex casestudy__cta"
              >
                {activeStudy.linkLabel}
                <i className="uil uil-external-link-alt"></i>
              </a>
            </>
          )}
        </div>
      </div>,
      document.body
    )}
   </section>
  )
}

export default Work
