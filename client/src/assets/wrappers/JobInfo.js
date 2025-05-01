import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;  //There are goin to be two elements, icon and text. To align them in one line use flex
  align-items: center;  //to make them center vertically
  .job-icon{
    font-size: 1rem;
    margin-right: 1rem;
    display: flex;  //to make the icon place center
    align-items: center;
    svg{
      color: var(--text-secondary-color);
    }
  }

  .job-text{
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
  }
`;
export default Wrapper;
