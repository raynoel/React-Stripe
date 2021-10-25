// http://localhost:3000/sign-up
// les nouveaux usagés sont enregistrés dans firebase => https://console.firebase.google.com/project/nomad-bags-store-583b7/firestore/data/~2Fusers~2FCwptbXmVIZRwWHmZSi7IeKixMIJ3
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Layout from '../shared/layout';
import { Formik } from 'formik';
import { auth, createUserProfileDocument } from '../../firebase/index';
import './sign-up.scss'

// Utilisé dans la librairie Formik. Valide les champs email + firstname + password et enregistre les erreurs dans un obj 'errors'
const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.firstname) { errors.firstname = 'Required' }
  if (!values.password) { errors.password = 'Required' }
  return errors;
}
 

const SignUp = ({ history: { push }}) => {
  const [error, setError] = useState(null);                                       // Enregistre la variable error dans la sfc
  const initialValues = { firstname: '', email: '', password: '' }

  // Fct exécutée lorsque le formulaire est soumis avec les champs 'values' = 'values.email + values.name + values.password'
  // 'setSubmitting' est une fct qui désactive le bouton 'submit'
  const handleSignUp = async (values, { setSubmitting }) => {
    const { firstname, email, password } = values;
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password); // Ajoute l'usagé dans firebase.auth et obtient l'obj 'user' 
      await createUserProfileDocument(user, { displayName: firstname });           // Aujoute un doc dans firestore
      push('/shop');                                                               // redirection
      setSubmitting(false);                                                        // désactive le bouton 'Submit'
    } catch (error) {
      console.log(error);
      setSubmitting(true);
      setError(error);                                                            // Pour afficher les erreurs
    }
  }

  return (
    <Layout>
      <div className='sign-up'>
        <h1>Sign Up</h1>
        <div className='form-container'>
          <Formik 
            initialValues={initialValues}                                         // passe les var initiales de firstname, email, pw à Formik
            validate={validate}                                                   // passe la fct validate() à Formik
            onSubmit={handleSignUp}
          >
            {
              ({values, errors, handleChange, handleSubmit, isSubmitting}) => {
                const { firstname, email, password } = errors;              // Extrait les champs 'firstname, email et password' de l'obj 'errors'
                return (
                  <form onSubmit={handleSubmit}>
                    <div>
                      <input type='text' name='firstname' placeholder='First Name'
                        className={ 'nomad-input ' + ( firstname ? 'error' : '' )}
                        onChange={handleChange} 
                        value={values.firstname} 
                      />
                    </div>
                    <div>
                      <input type='text' name='email' placeholder='Email'
                        className={ 'nomad-input ' + ( email ? 'error' : '' )}
                        onChange={handleChange} 
                        value={values.email} 
                      />
                    </div>
                    <div>
                      <input type='password' name='password' placeholder='Password'
                        className={ 'nomad-input ' + ( password ? 'error' : '' )}
                        onChange={handleChange} 
                        value={values.password} 
                      />
                    </div>

                    <div className='submit-btn'>
                      <button disabled={isSubmitting} type='submit' className='button is-black nomad-btn submit'>Sign Up</button>
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
  )
}

export default withRouter(SignUp)