import React from "react";
import flv from 'flv.js';
import { connect } from "react-redux";
import {fetchStream} from '../../actions'

class StreamShow extends React.Component{
    
    constructor(props){
        super(props);
        this.videoRef = React.createRef();
    }
     
    componentDidMount(){
        const {id} = this.props.match.params
        this.props.fetchStream(id)
        this.buildPlayer()
    }

    componentDidUpdate(){
        this.buildPlayer()
    }

    componentWillUnmount(){
        this.flvPlayer.destroy();
    }


   buildPlayer(){
    if(!this.props.stream || this.flvPlayer){
        return;
    }

    const {id} = this.props.match.params
    this.flvPlayer = flv.createPlayer({
        type: 'flv',
        url: `http://localhost:8000/live/${id}.flv`
    })
     this.flvPlayer.attachMediaElement(this.videoRef.current)
     this.flvPlayer.load();


   }
    
    render(){

    if(!this.props.stream){
        return <div>loading....</div>
    }
    const {title, description} = this.props.stream;
    return (
        <>
        <video ref={this.videoRef} style={{width:'100%'}} controls/>
        <h1>{title}</h1>
        <h3>{description}</h3>
        </>
    )
    }
}
 
const mapStateToProps = (state,ownProps) => {
    return { stream: state.streams[ownProps.match.params.id]}
}
export default connect(mapStateToProps, {fetchStream})(StreamShow);