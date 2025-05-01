import React from 'react';
import { useNavigation } from 'react-router-dom';

const SubmitBtn = ({formBtn}) =>   {    //If form btn is passed, add form-btn in classname
    //To get the navigation state
const navigation = useNavigation();
const isSubmitting = navigation.state === 'submitting';

  return (
    <button type='submit' className={`btn btn-block ${formBtn && `form-btn`}`} disabled={isSubmitting}>
            {
              isSubmitting ? 'submitting' : 'submit'
            }

    </button>
  )
}

export default SubmitBtn
