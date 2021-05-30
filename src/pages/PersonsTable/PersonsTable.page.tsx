import * as React from "react";
import { SearchComponent } from "../../components/UI/Search/Search.component";
import { PersonsTableRowComponent } from "./components/PersonsTableRow.component";
import { PaginationComponent } from "../../components/UI/Pagination/Pagination.component";
import { newPerson, UCreateData } from "../../utils/CreateData.util";
import { StyledPersonsTable } from "./PersonsTable.styles";
import { LPersonsPagination } from "./PersonsPagination.logic";
import { LPersonsFilters } from "./PersonsFilters.logic";

export interface IColumn {
  key: keyof ReturnType<typeof newPerson>;
  title: string;
  render?: (value: Array<string>) => string;
}

interface IPersonsTablePageProps {
  columns: Array<IColumn>;
  data: ReturnType<typeof UCreateData>;
}

export const PersonsTablePage = React.memo<IPersonsTablePageProps>(
  ({ columns, data }) => {
    const [filteredData, setFilteredData] = React.useState(data);
    const { handleSearch, search, handleColumnClick } = LPersonsFilters({
      data,
      setFilteredData
    });
    const {
      handlePageChange,
      page,
      pageSize,
      handlePageSizeChange,
      paginatedData
    } = LPersonsPagination({ filteredData });
    return (
      <div>
        <SearchComponent onSearch={handleSearch} />
        <StyledPersonsTable>
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  onClick={handleColumnClick.bind(undefined, column.key)}
                  key={`${column.key}header`}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((person) => (
              <PersonsTableRowComponent
                onColumnClick={handleColumnClick}
                search={search}
                key={`${person.firstName}${person.lastName}person`}
                person={person}
                columns={columns}
              />
            ))}
          </tbody>
        </StyledPersonsTable>
        <PaginationComponent
          current={page}
          pageSize={typeof pageSize === "number" ? pageSize : 1}
          pageSizeInputValue={pageSize}
          defaultPageSize={1}
          total={filteredData.length}
          onChange={handlePageChange}
          jumpPrevIcon="..."
          jumpNextIcon={"..."}
          prevIcon="<-"
          nextIcon="->"
          onChangePageSize={handlePageSizeChange}
        />
      </div>
    );
  }
);
