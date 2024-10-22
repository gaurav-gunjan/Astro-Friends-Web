import React from 'react'

const PorgressCard = ({ width }) => {
    return (
        <div className='w-[100%] bg-gray-200 rounded-xl'><div className='h-4 bg-green-500 rounded-xl' style={{ width: width }}></div></div>
    )
}

export default PorgressCard