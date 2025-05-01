import styled from 'styled-components';

const Wrapper = styled.section`
  min-height: 100vh; //Set minimum height to 100% of screen height
  display: grid;  //for the wrapper
  align-items: center;

  .logo{
    display: block;
    margin: 0 auto; //To center
    margin-bottom: 1.38rem;
  }

  .form{
    width: 400px;
    border-top: 5px solid var(--primary-500); //To have border at top
  }

  h4{
    text-align: center;
    margin-bottom: 1.38rem;
  }

  p{
    margin-top: 1rem;
    text-align: center;
    line-height: 1.5;
  }

  .btn{
    margin-top: 1rem;
  }

  .member-btn{
    color: var(--primary-500);
    letter-spacing: var(--letter-spacing);
    margin-left: 0.25rem;
  }
`;
export default Wrapper;
