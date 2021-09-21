import React from 'react';
import ReactLoading from 'react-loading';
import './Loading.css'

function Loading() {
    return (
        <div className="container_main">
            <ReactLoading className="loading" type={'spinningBubbles'} color={'black'} height={667} width={375} />
        </div>
    )
}

export default Loading;