import styled from 'styled-components';

const Wrapper = styled.main`
 min-height: 100vh;
 text-align: center;
 //To place all the items in the center
 display: flex;
 align-items: center;
 justify-content: center;

 img{
  width: 90vw;  //Set to 90%
  max-width: 600px;
  display:block;
  margin-bottom: 2rem;
  //To move a bit higher
  margin-top: -3rem;
 }

 h3{
  margin-bottom: 0.5rem;
 }

 p{
  line-height: 2;
  margin-top: .5rem;
  margin-bottom: 1rem;
  color: var(--text-secondary-color);
 }

 a{
  color: var(--primary-500);
  text-transform: capitalize;
 }
`;

export default Wrapper;
