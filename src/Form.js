import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const Basic = (props) => (
   <div className="form-container">
     <h1 className="mt-10 text-xl">Submit a meme</h1>
     <Formik 
       initialValues={{ name: '', caption: '', url: '' }}
       validate={values => {

         const errors = {};
         if (!values.url) {
           errors.url = 'Required';
         } else if (
           !/^[A-Z0-9._%+-]+\.[A-Z]{2,}$/i.test(values.url)
         ) {
           errors.url = 'Invalid URL';
         }
         return errors;

       }}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           props.postMemes(values);
           setSubmitting(false);
         }, 400);
       }}
     >
       {({ isSubmitting }) => (
         <Form className="form">
            <label className="">Username: </label>
           <Field type="text" name="name" className="form-input"/>
           <label className="mt-5">Caption: </label>
           <Field type="text" name="caption" className="form-input"/>
           <label className="mt-5">Meme URL: </label>
           <Field type="text" name="url" className="form-input"/>
           <ErrorMessage name="url" component="div" />
           <button type="submit" disabled={isSubmitting} className="form-button">
             Submit
           </button>
         </Form>
       )}
       
     </Formik>
   </div>
 );
 
 export default Basic;