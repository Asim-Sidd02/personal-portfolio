import React, { useState, useEffect } from 'react'
import { AnimatePresence } from 'motion/react'
import { projectsData, projectsNav } from './Data'
import WorkItems from './WorkItems'

const Works = () => {
  const [item, setItem] = useState({ name: 'all' })
  const [projects, setProjects] = useState(projectsData)
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (item.name === 'all') {
      setProjects(projectsData)
    } else {
      const newProjects = projectsData.filter((project) => project.category.toLowerCase() === item.name)
      setProjects(newProjects)
    }
  }, [item])

  const handleClick = (name, index) => {
    setItem({ name })
    setActive(index)
  }

  return (
    <div>
      <div className="work__filters">
        {projectsNav.map((navItem, index) => (
          <button
            type="button"
            key={navItem.name}
            onClick={() => handleClick(navItem.name.toLowerCase(), index)}
            className={active === index ? 'active-work work__item' : 'work__item'}
          >
            {navItem.name}
          </button>
        ))}
      </div>

      <div className="work__container container">
        <AnimatePresence mode="popLayout">
          {projects.map((project) => (
            <WorkItems item={project} key={project.id} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Works
