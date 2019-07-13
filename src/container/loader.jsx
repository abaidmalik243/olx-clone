import React from 'react'

export const Loader = () => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, bottom: 0, right: 0, height: '100%', width: '100%', background: 'rgba(0,0,0,0.05)' }}>
            <div className="loader"></div>
        </div>
    )
}


// WEBPACK FOOTER //
// ./src/container/loader.jsx