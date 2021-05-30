import * as React from "react";
import { newPerson } from "../../../utils/CreateData.util";
import { IColumn } from "../PersonsTable.page";
import { StyledHighlighetSearchText } from "./PersonsTableRow.styles";

interface IPersonsTableRowProps {
  person: ReturnType<typeof newPerson>;
  columns: Array<IColumn>;
  search: string;
  onColumnClick: (column: IColumn["key"]) => void;
}

export const PersonsTableRowComponent = React.memo<IPersonsTableRowProps>(
  ({ person, columns, search, onColumnClick }) => {
    const computeColumnValue = (value: string) => {
      const indexOfSearch = value.indexOf(search);
      if (search && indexOfSearch > -1) {
        return (
          <>
            {indexOfSearch !== 0 && value.substr(0, indexOfSearch)}
            <StyledHighlighetSearchText>
              {value.substr(indexOfSearch, search.length)}
            </StyledHighlighetSearchText>
            {indexOfSearch + search.length !== value.length &&
              value.slice(indexOfSearch + search.length, value.length)}
          </>
        );
      } else {
        return value;
      }
    };

    return (
      <tr>
        {columns.map((column) => (
          <td
            key={`${person.firstName}${person.lastName}${column.key}personColumn`}
            onClick={onColumnClick.bind(undefined, column.key)}
          >
            {computeColumnValue(
              `${
                column.render && column.key === "tags"
                  ? column.render(person[column.key])
                  : person[column.key]
              }`
            )}
          </td>
        ))}
      </tr>
    );
  }
);
