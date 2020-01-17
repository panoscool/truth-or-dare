import React, { useState } from 'react';
import cuid from 'cuid';
import Typography from '@material-ui/core/Typography';
import TextInput from './Shared/TextInput';
import RadioInput from './Shared/RadioInput';
import { Button } from '@material-ui/core';

function QuestionsForm() {
  const [questionType, setQuestionType] = useState(null);
  const [values, setValues] = useState({
    question: '',
    category: ''
  });

  function handleQuestionType(event) {
    setQuestionType(event.target.value);
  }

  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div>
      <Typography gutterBottom>Add your own questions!</Typography>
      <form onSubmit={handleSubmit}>
        <RadioInput
          name='questionType'
          label="Question Type"
          value={questionType || ''}
          handleChange={handleQuestionType}
          optionsArray={[
            { id: cuid(), value: 'truth', label: 'Truth' },
            { id: cuid(), value: 'dare', label: 'Dare' }
          ]} />
        <RadioInput
          name='category'
          label="Select Category"
          value={values.category || ''}
          handleChange={handleChange}
          optionsArray={[
            { id: cuid(), value: 'funny', label: 'Funny' },
            { id: cuid(), value: 'challenging', label: 'Challenging' },
            { id: cuid(), value: 'uncensored', label: 'Uncensored' }
          ]} />
        <TextInput
          name='question'
          label="Add question"
          placeholder="Add question"
          value={values.question || ''}
          handleChange={handleChange} />
        <Button type='submit' variant='contained' color='primary'>Save</Button>
      </form>
    </div>
  );
}

export default QuestionsForm;
