import styled from 'styled-components';

const Wrapper = styled.aside`
  //since we want to hide the big side bar in case of small screen
  display: none;

  //All styles will be applied when the width is 992px
  @media (min-width: 992px){
    display: block;
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);

    .sidebar-container{
      background: var(--background-secondary-color);
      min-height: 100vh;
      height: 100%;
      width: 250px;
      //Hide it by default. show only if the show sidebar class is present
      margin-left: -250px;
      transition: margin-left 0.3s ease-in-out;
    }

    .content{
      position: sticky; //When we have more jobs and we scroll down, the sidebar stays in place

      top:0;
    }

    .show-sidebar{
      //display it
      margin-left : 0;
    }

    header{
      height: 6rem;
      display: flex;
      align-items: center;
      padding-left: 2.5rem;
    }

    .nav-links{
      padding-top: 2rem;
      display: flex;
      flex-direction: column;
    }

    .nav-link{
      display: flex;
      align-items: center;
      color: var(--text-secondary-color);
      padding: 1rem 0;
      padding-left: 2.5rem;
      text-transform: capitalize;
      //when we hover on the links, we add a padding left
      transition : padding-left 0.3s ease-in-out;
    }

    .nav-link:hover{
      padding-left: 3rem;
      color: var(--primary-500);
      //There should be some time before the color changes
      transition: var(--transition);
    }

    .icon{
      font-size: 1.5rem;
      margin-right: 1rem;
      display: grid;
      place-items: center;
    }

    .active{
      color: var(--promary-500);
    }

    .pending{
      background-color: var(--background-color);
    }
  }
`;
export default Wrapper;
