import React from 'react'

const HighProfile = ({ img, name, designation }) => {
    return (
        <div>
            <img src={img} alt="" />
            <div>
                <div>{name}</div>
                <div>{designation}</div>
            </div>
        </div>
    )
}

export default HighProfile
