import * as React from "react";
import { PaginationProps } from "rc-pagination";
import {
  StyledPagination,
  StyledPaginationPageInput,
  SyledPaginationComponent
} from "./Pagination.styles";

interface IPaginationComponentProps extends PaginationProps {
  onChangePageSize: (size: string) => void;
  pageSizeInputValue: string | number;
}

export const PaginationComponent = React.memo<IPaginationComponentProps>(
  (props) => {
    const handlePageSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      props.onChangePageSize(e.target.value);
    };

    return (
      <SyledPaginationComponent>
        <StyledPagination {...props} />
        <StyledPaginationPageInput
          value={props.pageSizeInputValue}
          onChange={handlePageSizeChange}
        />
      </SyledPaginationComponent>
    );
  }
);
