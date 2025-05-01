import styled from 'styled-components';

const Wrapper = styled.article`
  background-color: var(--background-secondary-color);
  border-radius: var(--border-radius);
  display: grid;
  grid-template-rows: 1fr auto;     //1 for header and other one for remaining content: 
  box-shadow: var(--shadow-2);

  header{
    padding: 1rem 1.5rem; //1-top,bottom; 1.5-left,right
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;  //first letter is going to be auto; company and position will take remaining space
    align-items: center;  //align vertically
  }

  .main-icon{
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--border-radius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: capitalize;
    color: var(--white);
    margin-right: 2rem;
  }

  .info{
    h5{
      margin-bottom: 0.5rem;
    }
    p{
      margin: 0;
      text-transform: capitalize;
      letter-spacing: var(--letter-spacing);
      color: var(--text-secondary-color);
    }
  }

  .content{
    padding: 1rem 1.5rem;
  }
  .content-center{
    display: grid;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    grid-template-columns: 1fr; //by default 1 column. At 576 px- 2 column
    row-gap: 1.5rem;
    align-items: center;
    @media (min-width: 576px){
      grid-template-columns: 1fr 1fr; 
    }
  }

  .status{
    border-radius: var(--border-radius);
    text-transform: capitalize;
    letter-spacing: var(--leeter-spacing);
    text-align: center;
    width: 100px;
    height: 30px;
    display: grid;  //to align the text in center of button
    align-items: center;
  }

  .actions{
    margin-top: 1rem;
    display: flex;
    align-items: center;
  }

  .edit-btn, .delete-btn{
    height: 30px;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
  }

  .edit-btn{
    margin-right: 0.5rem;
  }
`;

export default Wrapper;
