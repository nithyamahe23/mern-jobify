import styled from 'styled-components';

const Wrapper = styled.aside`
  //hide it for big screen
  @media (min-width : 992px){
    display: none;
  }

  .sidebar-container{
    position: fixed; 
    inset: 0; //element should occupy the entire screen
    background: rgba(0,0,0,0.7);    //black background with opacity 0.7
    display: flex;
    align-items: center;  //set vertically
    justify-content: center;  //set horizontally
    z-index: -1;  //set z index and opacity to hide it by default
    opacity: 0;
    transition: var(--transition);
    visibility: hidden;
  }

  .show-sidebar{
    //sidebar should be visible only if this class is present
    z-index: 99; 
    opacity: 1;
    visibility: visible;
  }

  .content{
    background : var(--background-secondary-color);
    width: var(--fluid-width);
    height:95vh;
    border-radius: var(--border-radius);  //rounded edges
    padding: 4rem 2rem;
    position :relative ;  //for parent
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .close-btn{
    position: absolute;
    top:10px;
    left:10px;
    background: transparent;
    border-color: transparent;  //to remove the border around the colose button
    font-size: 2rem;
    color: var(--red-dark);
    cursor: pointer;
  }

  .nav-links{
    display: flex;
    flex-direction: column;
    padding-top: 2rem;
  }

  .nav-link{
    display: flex;
    align-items: center;
    color: var(--text-secondary-color);
    padding: 1rem 0; //1-top and bottom, 0-left and right
    text-transform: capitalize;
    transition: var(--transition);    //as we are going to have hover effect
  }

  .nav-link:hover{
    color: var(--primary-500);  //change the color
  }

  .icon{
    font-size: 1.5rem;
    margin-right: 1rem;
    //since we have the icon inside a span, to place it exactly in the center
    display: grid;
    place-items:center;
  }

  //class automatically added by react router when that page is selected
  .active{
    color: var(--primary-500)
  }
`;
export default Wrapper;
