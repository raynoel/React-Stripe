// http://localhost:3000/sign-in
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Layout from '../shared/layout';
import { Formik } from 'formik';
import { auth } from '../../firebase/index';
import '../sign-up/sign-up.scss';

// Fct appelée lors de la création du formulaire
const validate = values => {
  const errors = {};                                            // Initialise les erreurs
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
}

const SignIn = ({ history: { push } }) => {
  const [error, setError] = useState(null);
  const initialValues = {
    email: '',
    password: '',
  };

  const handleSignIn = async (values, { setSubmitting }) => {
    console.log('values', values);
    const { email, password } = values;
    try {
      await auth.signInWithEmailAndPassword(email, password);             // Login avec firebase.auth
      setSubmitting(false);
      push('/shop');
    } catch (error) {
      console.log('error', error);
      setSubmitting(false);
      setError(error);                                                    // Pour afficher les erreurss
    }    
  }

  return (
    <Layout>
      <div className='sign-up'>
        <h1>Sign In</h1>
        <div className='form-container'>
          <Formik initialValues={initialValues} validate={validate} onSubmit={handleSignIn}>
            {({ values, errors, handleChange, handleSubmit, isSubmitting }) => {
                const { email } = errors;                               // Extrait le champ 'email' de l'obj 'errors'
                return (
                <form onSubmit={handleSubmit} >
                  <div>
                    <input type='email' name='email' placeholder='Email'
                      className={'nomad-input email ' + ( email ? 'error' : '')}
                      onChange={handleChange}
                      value={values.email}
                    />
                  </div>
                  <div>
                    <input type='password' name='password' placeholder='Password'
                      className='nomad-input password'
                      onChange={handleChange}
                      value={values.password}
                    />
                  </div>

                  <div className='submit-btn'>
                    <button type="submit" disabled={isSubmitting} className="button is-black nomad-btn submit">Submit</button>
                  </div>


                  {/* Affiche les msg d'erreurs */}
                  <div className='error-message'>
                    { error && <p>{error.message}</p> }
                  </div>

                </form>
                )
              }
            }
          </Formik>
        </div>
      </div>
    </Layout>
  );
}

export default withRouter(SignIn);