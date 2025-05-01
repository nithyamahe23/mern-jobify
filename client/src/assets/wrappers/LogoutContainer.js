import styled from 'styled-components';

const Wrapper = styled.div`
  //for logout button, position is absolute
  //We want to control it by parent. So set the position of parent
  //to be relative
  position : relative;

  .logout-btn{
    display: flex;
    align-items: center;
    justify-content: center;
    gap : 0 0.5rem; //0- gap between rows, here no rows, so 0. 0.5-gap between columns
  }

  img{
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }

  //dropdown option
  .dropdown{
    position: absolute;
    top: 45px;
    left: 0;
    width : 100%;
    box-shadow: var(--shadow-2);
    text-align: center;
    visibility: hidden; //hidden by default
    border-radius: var(--border-radius);
    background-color: var(--primary-500);
  }

  .show-dropdown{
    visibility: visible;
  }

  //dropdown button - button inside the div
  .dropdown-btn{
    border-radius: var(--border-radius);
    padding: 0.5rem;
    background: transparent;
    border-color: transparent ;
    color: var(--white);
    letter-spacing: var(--letter-spacing);
    text-transform : capitalize;
    cursor: pointer;
    width : 100% ;
    height : 100%;
  }
`;

export default Wrapper;
