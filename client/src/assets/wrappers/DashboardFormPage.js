import styled from 'styled-components';

const Wrapper = styled.section`
  border-radius: var(--border-radius);
  width: 100%;  //take up the entire space
  background-color: var(--background-secondary-color);
  padding: 3rem 2rem 4rem;  //3-top, 2-right, 4-bottom

  .form-title{
    margin-bottom: 2rem;
  }

  .form{
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }

  .form-row{
    margin-bottom: 0;
  }

  .form-center{
    display: grid;
    row-gap: 1rem;
  }

  .form-btn{
    align-self: end;
    margin-top: 1rem;
    display: grid;
    place-items: center;
  }

  @media (min-width: 992px){
    .form-center{
      grid-template-columns: 1fr 1fr; //2 column layout
      align-items: center;
      column-gap: 1rem;
    }
  }

  @media (min-width: 1120px){
    .form-center{
      grid-template-columns: 1fr 1fr 1fr; //3 column layout
    }
  }
`;

export default Wrapper;
