import React from "react";
import { connect } from "react-redux";
import { signIn, signOut} from '../actions';


class GoogleApi extends React.Component{
    
    componentDidMount(){
        //below code initiates the oauth library
      window.gapi.load('client:auth2',()=>{window.gapi.client.init({
           clientId:'707002801764-4qs1rggg5qh63t5g0nn0g0ifv27te2gh.apps.googleusercontent.com',
           scope: 'email',
           plugin_name:'streamy'
     }).then(()=>{
         this.auth = window.gapi.auth2.getAuthInstance();
          this.onStatusChange(this.auth.isSignedIn.get())
         this.auth.isSignedIn.listen(this.onStatusChange)
       
     })
    })
    }

    onStatusChange= isSignedIn=>{
      if(isSignedIn){
          this.props.signIn(this.auth.currentUser.get().getId());
      }else {
          this.props.signOut();
      }
    }

    onSignInClick = () => {
        this.auth.signIn()
    }

    onSignOutClick = () => {
        this.auth.signOut()
    }

    renderAuthButton(){
        if(this.props.isSignedIn===null){
            return null
        }
         else if(this.props.isSignedIn===true){
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon"></i>
                    Sign out
                </button>
            )
        }
        return (
            <button onClick={this.onSignInClick} className="ui red google button">
                <i className="google icon"></i>
                Sign in
            </button>
            )
    }


    render(){
        return <div>{this.renderAuthButton()}</div>
    }

}

const mapStateToProps= state =>{
    return {isSignedIn: state.auth.isSignedIn}
  }

export default connect(mapStateToProps,{signIn,signOut})(GoogleApi);