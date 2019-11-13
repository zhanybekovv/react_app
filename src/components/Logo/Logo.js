import React from 'react';
import brain from './brain.png';
import Tilt from 'react-tilt';
import "./Logo.css"
import 'tachyons';

function Logo(){
    return(
        <div className='ma4 mt0 center'>
            <Tilt className="Tilt br3 shadow-2 ph1" options={{ max : 30 }}> {/*0style={{ padding: "4px",maxWidth: "200px"*/}
                {/* <div className="Tilt-inner">  */}
                    <img style= {{width: '50px', height: '50px'}} alt = 'logo' src = {brain}  / >    
                {/* </div> */}
            </Tilt>
            
        </div>
    );
}

export default Logo;