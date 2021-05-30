import styled from "styled-components";
import Pagination from "rc-pagination";

export const StyledPagination = styled(Pagination)`
  display: grid;
  grid-auto-columns: max-content;
  grid-auto-flow: column;
  list-style-type: none;
  gap: 16px;
  li {
    cursor: pointer;
  }
  .rc-pagination-item-active {
    border-bottom: 1px solid black;
  }
`;

export const StyledPaginationPageInput = styled.input`
  max-width: 40px;
  height: 20px;
`;

export const SyledPaginationComponent = styled.div`
  display: grid;
  grid-template-columns: max-content max-content;
  align-items: center;
  gap: 24px;
`;
