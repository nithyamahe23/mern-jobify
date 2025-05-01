import styled from 'styled-components';

const Wrapper = styled.section`
  nav{
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto; //To make the nav bar center
    height: var(--nav-height);  
    //To place the logo center vertically
    display: flex;
    align-items: center;
  }

  .page{
    //To make other contents occupy most of the height -> subtract the total height 100%(100vh) from the nav height
    min-height: calc(100vh - var(--nav-height));
    //To make all the contents to appear in center vertically
    display: grid;
    align-items: center;
    //To lift the items a bit higher
    margin-top: -3rem;
  }
  h1{
    font-weight: 700;
    span{
      color: var(--primary-500);
    }
    margin-bottom: 1.5rem;
  }

  p{
    line-height: 2;
    color: var(--text-secondary-color);
    margin-bottom: 1.5rem;
    //Only to this width the paragrapgh text will be displayed. Else it will occupy entire width
    max-width: 35em;
  }

  .register-link{
    //To have space between register and login buttons
    margin-right: 1rem;
  }
  .main-img{
    //Not to display the image in small screen
    display: none;
  }

  .btn{
    padding: .75rem 1rem;   //.75 - top and bottom, 1-right and left 
  }

  //All above settings will be look for small screen. To have styles for big screen, if we want to use
  //media screen use @media
   @media (min-width: 992px){
    //When the above width is reached, do the following
    .page{
      //add two columns to the page class
      grid-template-columns : 1fr 400px;  //One column occupies rest of the space, image occupies 400px
      column-gap: 3rem;
    }
    //make the image visible after the width is reached
    .main-img{
      display: block;
    }
  } 
`;
export default Wrapper;
