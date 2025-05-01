import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

const TestToast = () => {
  useEffect(() => {
    toast.success('This is a test toast!');
  }, []);

  return <div>Toast Test Component</div>;
};

export default TestToast;