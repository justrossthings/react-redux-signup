import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {submitForm} from '../actions/index';

import FormPageONE from '../components/pageOne';
import FormPageTWO from '../components/pageTwo';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    
    //bind methods to parent
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.formComplete = this.formComplete.bind(this);
    
    this.state = {
      page: 1
    }
  }
  
  nextPage() {
    this.setState({page: this.state.page + 1});
  }
  
  prevPage() {
    this.setState({page: this.state.page - 1});
  }
  
  formComplete(form) {
    this.props.submitForm(form)
    //go to thank you page on response from dummy URL
      .then(() => {
        console.log('post successful');
        this.context.router.push('thankyou');
      })
      .catch((error) => {
        console.log('error:', error);
      })
  }
  
  // to debug current form values
  // what(e) {
  //   e.preventDefault();
  //
  //   console.log(this.props.form);
  // }
  
  //render sequence of form pages according to this.state.page
  render() {
    return (
      <div className="content-wrapper row">
        {this.state.page === 1 && <FormPageONE onSubmit={this.nextPage}/>}
        {this.state.page === 2 && <FormPageTWO onSubmit={this.formComplete} prevPage={this.prevPage}/>}
      </div>
    )
  }
}

SignupForm.contextTypes = {
  router: React.PropTypes.object
};

// getting current form values for form debugging
const mapStateToProps = (state) => {
  return {form: state.form};
};

//connect submitForm action to component
export default connect(mapStateToProps, {submitForm})(SignupForm);