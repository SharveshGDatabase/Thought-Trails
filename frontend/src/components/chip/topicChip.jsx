import React from 'react'

const TopicChip = ({category , color="primary" , bg="primary"}) => {
  return (
    <span className={`ml-5 mt-4 px-3 py-1 inline-block bg-${bg}/10 rounded-full text-${color} text-xs border-1 border-${bg}`}>
        {category}
    </span>
  )
}

export default TopicChip
