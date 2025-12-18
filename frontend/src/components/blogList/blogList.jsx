import React from 'react'
import { blogCategories } from '../../assets/icons/assets'
import { motion } from 'motion/react'

const BlogList = ({ menu, setMenu }) => {
  return (
    <div className="relative flex justify-center gap-4 sm:gap-8 my-10 flex-wrap">
      {blogCategories.map((item) => {
        const isActive = menu === item;

        return (
          <div key={item} className="relative">
            {isActive && (
              <motion.div
                layoutId="highlight"
                className="absolute inset-0 rounded-full bg-primary"
                transition={{ stiffness: 500, damping: 30 }}
              />
            )}
            <button
              onClick={() => setMenu(item)}
              className={`px-4 py-1.5 rounded-full text-sm relative z-10 transition-all duration-200
                ${isActive ? 'text-white' : 'text-primary hover:bg-primary/10'}
              `}
            >
              {item}
            </button>
          </div>
        );
      })}
    </div>
  )
}

export default BlogList
