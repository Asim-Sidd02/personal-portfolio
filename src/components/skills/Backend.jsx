import React from 'react'
import SkillBar from './SkillBar'

const backendSkills = [
  { name: 'PHP', level: 'Intermediate', percent: 72 },
  { name: 'Node.js', level: 'Basic', percent: 55 },
  { name: 'Python', level: 'Intermediate', percent: 68 },
  { name: 'MySQL', level: 'Intermediate', percent: 75 },
  { name: 'Firebase', level: 'Intermediate', percent: 70 },
  { name: 'Java', level: 'Intermediate', percent: 65 },
]

const Backend = () => (
  <div className="skill__content">
    <h3 className="skills__title">Backend Developer</h3>
    <div className="skills__box skills__box--stack">
      {backendSkills.map((skill) => (
        <SkillBar key={skill.name} name={skill.name} level={skill.level} percent={skill.percent} />
      ))}
    </div>
  </div>
)

export default Backend
