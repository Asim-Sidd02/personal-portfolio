import React from 'react'
import SkillBar from './SkillBar'

const frontendSkills = [
  { name: 'HTML', level: 'Advanced', percent: 92 },
  { name: 'CSS', level: 'Advanced', percent: 90 },
  { name: 'JavaScript', level: 'Advanced', percent: 88 },
  { name: 'Vue.js', level: 'Advanced', percent: 85 },
  { name: 'Shopify Liquid', level: 'Advanced', percent: 85 },
  { name: 'Flutter', level: 'Intermediate', percent: 70 },
]

const Frontend = () => (
  <div className="skill__content">
    <h3 className="skills__title">Frontend & Mobile</h3>
    <div className="skills__box skills__box--stack">
      {frontendSkills.map((skill) => (
        <SkillBar key={skill.name} name={skill.name} level={skill.level} percent={skill.percent} />
      ))}
    </div>
  </div>
)

export default Frontend
