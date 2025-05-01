import styled from 'styled-components';

const Wrapper = styled.nav`
  height: var(--nav-height);
  //nav center
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  //set background color
  background: var(--background-secondary-color);

  .nav-center{
    display: flex;
    width:90vw;
    align-items: center;
    justify-content: space-between;
  }

  .toggle-btn{
    background: transparent;    //white background. removes the gray background
    border-color: transparent;
    font-size: 1.75rem;
    color: var(--primary-500);
    cursor: pointer;
    //To make the button text center by making button as flex parent
    display: flex;
    align-items: center;
  }

  .logo-text{
    display:none;   //Dashboard text will not be displayed. will be displayed only in big screen
  }

  .logo{
    display: flex;
    align-items: center;
    width: 100px;
  }
  //toggle/logout
  .btn-container{
    display: flex;
    align-items: center;
  }

  @media (min-width: 992px){
    position: sticky;   //nav bar stays on top of the screen, event though we scroll the contents below
    top: 0;

    .nav-center{
    width:90%;  //90% of parent. not the entire screen

    }
    .logo{
    display: none;
    }
    .logo-text{
      display: block;
 }
  }

 

 
  
  
`;
export default Wrapper;
