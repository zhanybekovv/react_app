import React from 'react';
import 'tachyons';

function Navigation({onRouteChange, isSignedIn}){
    if(isSignedIn){
        return (
            <nav style = {{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick = {()=>onRouteChange('signout')} className = 'f3 link dim black underline pa3 pointer'>
                    Sing out
                </p>
            </nav>
        )
    }else{
        return (
            <nav style = {{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick = {()=>onRouteChange('signin')} className = 'f3 link dim black underline pa3 pointer'>
                    Sing in
                </p>
                <p onClick = {()=>onRouteChange('register')} className = 'f3 link dim black underline pa3 pointer'>
                    Sing up
                </p>
            </nav>
        )
    }
    
}

export default Navigation;