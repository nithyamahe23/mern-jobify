import styled from 'styled-components';

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns:auto 1fr;   //Big side bar becomes first column
    }
    .dashboard-page {
      width: 90%;   //Occupies 90% of the content which is 1fr set in the previous one
    }
  }
`;
export default Wrapper;
