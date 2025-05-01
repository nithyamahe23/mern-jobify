import styled from 'styled-components';

const Wrapper = styled.section`
  margin-top: 4rem;

  //For No jobs to display
  h2{
    text-transform: none; //coz in global css we have capitalize
  }

  & > h5{   //select h5 which is a direct child of section
    font-weight: 700;
    margin-bottom: 1.5rem;
  }

  .jobs{
    display: grid;
    grid-template-columns: 1fr;   //initially 1 column
    row-gap: 2rem;
  }

  @media (min-width: 1120px){
    .jobs{
      grid-template-columns: 1fr 1fr; //2 columns
      gap: 2rem;
    }
    
  }
`;
export default Wrapper;
