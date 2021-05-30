import styled from "styled-components";

export const StyledPersonsTable = styled.table`
  border-collapse: collapse;

  width: 100%;
  margin-top: 16px;
  th,
  td {
    cursor: pointer;
    border: 1px solid black;
    padding: 8px;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
