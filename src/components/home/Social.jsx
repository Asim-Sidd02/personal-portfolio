import React from 'react'
import { motion } from 'motion/react'

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const iconVariants = {
    hidden: { opacity: 0, x: -16 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

const Social = () => {
  return (
    <motion.div className="home__social" variants={containerVariants} initial="hidden" animate="visible">
        <motion.a
          href="https://www.instagram.com/asim_sidd_/"
          className="home__social-icon"
          target="_blank"
          rel="noreferrer"
          variants={iconVariants}
          whileHover={{ scale: 1.15, rotate: -6 }}
          whileTap={{ scale: 0.92 }}
        >
            <i className="uil uil-instagram"></i>
        </motion.a>

        <motion.a
          href="https://www.linkedin.com/in/asim-siddiqui-a71731229/"
          className="home__social-icon"
          target="_blank"
          rel="noreferrer"
          variants={iconVariants}
          whileHover={{ scale: 1.15, rotate: -6 }}
          whileTap={{ scale: 0.92 }}
        >
          <i className="uil uil-linkedin"></i>
        </motion.a>

        <motion.a
          href="https://github.com/Asim-Sidd02"
          className="home__social-icon"
          target="_blank"
          rel="noreferrer"
          variants={iconVariants}
          whileHover={{ scale: 1.15, rotate: -6 }}
          whileTap={{ scale: 0.92 }}
        >
          <i className="uil uil-github-alt"></i>
        </motion.a>
    </motion.div>
  )
}

export default Social
