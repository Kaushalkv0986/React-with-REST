import React from 'react';
import { Field, reduxForm } from 'redux-form';

const renderErrors = ({ error, touched }) => {
  if (touched && error) {
    return (
      <div className='ui error message'>
        <div className='header' style={{ fontSize: '1rem' }}>{error}</div>
      </div>
    );
  }
  return;
};

const renderInput = ({ input, label, meta }) => {
  const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
  return (
    <div className={className}>
      <label htmlFor={`${input.name}`}>{label}</label>
      <input id={input.name} {...input} autoComplete="off" />
      {renderErrors(meta)}
    </div>

  );
}

const StreamForm = (props) => {

  const onSubmit = (formValues) => {
    props.onSubmit(formValues);
  }

  return (
    <form
      className='ui form error'
      onSubmit={props.handleSubmit(onSubmit)}
    >
      <Field name='title' component={renderInput} label='Title' />
      <Field name='description' component={renderInput} label='Description' />
      <button className='ui button primary'>Submit</button>
    </form>
  );
}

const validateForm = (formValues) => {
  const errors = {};

  /*initially title and description will be empty */
  if (!formValues.title) {
    errors.title = 'You must enter the title';
  }
  if (!formValues.description) {
    errors.description = 'You must enter the description';
  }
  return errors;
}

export default reduxForm({
  form: 'StreamForm ',
  validate: validateForm /*form validator*/
})(StreamForm);

