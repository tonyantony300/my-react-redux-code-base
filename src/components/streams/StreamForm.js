import React from "react";
import { Field, reduxForm} from 'redux-form';


class StreamForm extends React.Component{

    renderError({error,touched}){
        if(touched && error ){
           return( <div className="ui error message">
                <div className="header">{error}</div>
            </div>)
        }
    }
   renderInput =({input,label,meta})=>{
       const className= `field ${meta.error && meta.touched ? 'error':{}}`
    return (
    <div className= {className}>
        <label>{label}</label>
        <input {...input}/>
        <div>{this.renderError(meta)}</div>
        </div>)
   }
   
   onSubmit = (formValues) => {
       this.props.onSubmit(formValues)
   }
   
    render(){
    return (
       <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)} >
           <Field name="title" component={this.renderInput} label='Enter Title'/>
           <Field name="description"component={this.renderInput} label='Enter description'/>
           <button className="ui green button" >Submit</button>
       </form>
    )
   }
}

const validate = formValues =>{
   const error ={}

if(!formValues.title){
  error.title = 'Enter title please'
}
if(!formValues.description){
    error.description = 'Enter description'
}

return error;
}

export default reduxForm({
    form: 'streamCreate',
    validate
})(StreamForm);

