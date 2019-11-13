import React from 'react';
import "./FaceRecognition.css"

function FaceRecognition({imgUrl, box}){
    return (
        <div className = 'center ma'>
            <div className = 'absolute mt2'>
                <img id = "inputimage" alt = '' src = {imgUrl} width='500px' height='auto' />
                <div className="bounds" style={{top: box.toprow, bottom: box.bottomrow, left: box.leftcol, right: box.rightcol}}>{console.log(box)}</div>
            </div>
        </div>
    )
}

export default FaceRecognition;