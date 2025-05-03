import React from 'react'
//i already use the reduce

function Sum({ parts = [] }) {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)

    return <div>total of {total} exercises</div>
}

export default Sum
