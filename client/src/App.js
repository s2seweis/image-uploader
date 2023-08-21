import React from 'react';
import { useFormik } from 'formik';

const App = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      number: '',
      photo: '',
    },
    onSubmit: (values)=>{
      console.log(values);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
    <div>
      <label> Name</label>
      <input
        type='text'
        name='name'
        onChange={formik.handleChange}
        value={formik.values.name}
      />
    </div>
    <div>
      <label> Number</label>
      <input
        type='tel'
        name='number'
        onChange={formik.handleChange}
        value={formik.values.number}
      />
    </div>
    < div > 
        < label > Datei hochladen </ label > 
        < input 
          type = 'file' 
          name = 'photo' 
          Accept = 'image/*' 
          onChange = {(e) =>
            formik.setFieldValue('photo', e.currentTarget.files[0])
          }
        />
      </div>

    <button type='submit'>Submit</button>
  </form>

  );
};

export default App;
