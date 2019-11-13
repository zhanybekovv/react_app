import React from 'react';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLink/ImageLinkForm';
import Rank from "./components/Rank/Rank";
import Clarifai from 'clarifai';
import './App.css';
import Particles from 'react-particles-js';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register'

const app = new Clarifai.App({
    apiKey: '9ca9bc0a32ae40eeabe902b657f3db69'
   })

const particleOptions = {
            "particles": {
              "number": {
                  "value": 160,
                  "density": {
                      "enable": false
                  }
              },
              "size": {
                  "value": 10,
                  "random": true
              },
              "move": {
                  "direction": "bottom",
                  "out_mode": "out"
              },
              "line_linked": {
                  "enable": false
              }
          },
          "interactivity": {
              "events": {
                  "onclick": {
                      "enable": true,
                      "mode": "remove"
                  }
              },
              "modes": {
                  "remove": {
                      "particles_nb": 10
                  }
              }
}
};

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            input: '',
            imgUrl: '',
            box: {},
            route: 'signin',
            isSignedIn: false
        }
    }

    calculateFace = (data)=>{
        const face = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        return{
            leftcol: face.left_col * width,
            rightcol: width - (face.right_col * width),
            toprow: face.top_row * height,
            bottomrow: height - (face.bottom_row * height)
        }
    }

    displayFace = (box)=>{
        this.setState({box: box}); 
    }

    onInputChange = (event) =>{
        this.setState({input: event.target.value})
    }

    onClickChange = () =>{
        this.setState({imgUrl: this.state.input})
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
        .then(response => this.displayFace(this.calculateFace(response)))
        .catch(err=>console.log("error!"))
        
    }
    onRouteChange = (route)=>{
        if(route==='signout'){
            this.setState({isSignedIn: false})
        } else if(route==='home'){
            this.setState({isSignedIn: true})
        }
        this.setState({route: route});
    }

    render(){
        return (
            <div className="App">
            <Particles className = "particles"
                params={particleOptions}
                    />
            <Navigation isSignedIn = {this.state.isSignedIn}  onRouteChange = {this.onRouteChange} />
            { this.state.route === 'home'
            ? <div> 
                <Logo />
                <Rank />
                <ImageLinkForm onInputChange = {this.onInputChange} onClickChange = {this.onClickChange}/>
                <FaceRecognition box = {this.state.box} imgUrl = {this.state.imgUrl}/>
            </div> 
            : ( this.state.route === 'signin'
                ? <SignIn onRouteChange={this.onRouteChange} />
                : <Register onRouteChange={this.onRouteChange} />
                  )
                }
            </div>
        );
    }
  
}

export default App;
