import React from "react";
import { connect } from "react-redux";
import {fetchStream} from '../../actions'

class StreamShow extends React.Component{
    componentDidMount(){
        this.props.fetchStream(this.props.stream.id)
    }
    render(){
        if(!this.props.stream){
            return <div>Loading....</div>
        }
    const {title, description} = this.props.stream;
    return (
        <>
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