import React from 'react'
import './techMarquee.css'

const techStack = [
  { name: 'HTML5', icon: 'bxl-html5' },
  { name: 'CSS3', icon: 'bxl-css3' },
  { name: 'JavaScript', icon: 'bxl-javascript' },
  { name: 'Vue.js', icon: 'bxl-vuejs' },
  { name: 'React', icon: 'bxl-react' },
  { name: 'Flutter', icon: 'bx-mobile-alt' },
  { name: 'Shopify', icon: 'bx-store-alt' },
  { name: 'Node.js', icon: 'bxl-nodejs' },
  { name: 'PHP', icon: 'bxl-php' },
  { name: 'Python', icon: 'bxl-python' },
  { name: 'MySQL', icon: 'bxl-mysql' },
  { name: 'Java', icon: 'bxl-java' },
  { name: 'Firebase', icon: 'bxl-firebase' },
  { name: 'Git', icon: 'bxl-git' },
]

const TechMarquee = () => (
  <section className="tech-marquee" aria-label="Technologies I work with">
    <div className="tech-marquee__fade tech-marquee__fade--left" />
    <div className="tech-marquee__fade tech-marquee__fade--right" />

    <div className="tech-marquee__track">
      {[...techStack, ...techStack].map((tech, index) => (
        <span className="tech-marquee__chip" key={`${tech.name}-${index}`}>
          <i className={`bx ${tech.icon}`}></i>
          {tech.name}
        </span>
      ))}
    </div>
  </section>
)

export default TechMarquee
