import { useCallback, useState, Dispatch, SetStateAction } from "react";
import { UCreateData } from "../../utils/CreateData.util";
import { IColumn } from "./PersonsTable.page";

enum ESortState {
  DECREASE = "decrease",
  INCREASE = "increase",
  INACTIVE = "inactive"
}

interface ISortState {
  column: IColumn["key"] | "";
  state: ESortState;
}

interface ILPersonsFiltersProps {
  data: ReturnType<typeof UCreateData>;
  setFilteredData: Dispatch<SetStateAction<ReturnType<typeof UCreateData>>>;
}

export const LPersonsFilters = ({
  data,
  setFilteredData
}: ILPersonsFiltersProps) => {
  const [search, setSearch] = useState("");
  const [sortState, setSortState] = useState<ISortState>({
    column: "",
    state: ESortState.INACTIVE
  });
  const handleSearch = useCallback(
    (value: string) => {
      setSearch(value);
      const filteredValues = data.filter((person) => {
        const values = Object.values(person);
        return !!values.filter((item) => {
          if (typeof item === "string") {
            return item.includes(value);
          }
          if (typeof item === "number") {
            return `${item}`.includes(value);
          }
          if (Array.isArray(item)) {
            return item.join(", ").includes(value);
          }
          return false;
        }).length;
      });
      setFilteredData(filteredValues);
    },
    [setSearch, setFilteredData, data]
  );

  const setDecreasingState = useCallback(
    (column: IColumn["key"]) => {
      setSortState({
        column,
        state: ESortState.DECREASE
      });
      setFilteredData((prev) =>
        [...prev].sort((a, b) => {
          const AColumn = a[column];
          const BColumn = b[column];
          if (typeof AColumn === "number" && typeof BColumn === "number") {
            if (AColumn > BColumn) return -1;
            return 0;
          }

          if (typeof AColumn === "string" && typeof BColumn === "string") {
            if (AColumn.length > BColumn.length) return -1;
            return 0;
          }

          if (Array.isArray(AColumn) && Array.isArray(BColumn)) {
            if (AColumn.join("").length > BColumn.join("").length) return -1;
            return 0;
          }
          return 0;
        })
      );
    },
    [setSortState, setFilteredData]
  );

  const setIncreasingState = useCallback(
    (column: IColumn["key"]) => {
      setSortState({
        column,
        state: ESortState.INCREASE
      });
      setFilteredData((prev) =>
        [...prev].sort((a, b) => {
          const AColumn = a[column];
          const BColumn = b[column];
          if (typeof AColumn === "number" && typeof BColumn === "number") {
            if (AColumn < BColumn) return -1;
            return 0;
          }

          if (typeof AColumn === "string" && typeof BColumn === "string") {
            if (AColumn.length < BColumn.length) return -1;
            return 0;
          }

          if (Array.isArray(AColumn) && Array.isArray(BColumn)) {
            if (AColumn.join("").length < BColumn.join("").length) return -1;
            return 0;
          }
          return 0;
        })
      );
    },
    [setSortState, setFilteredData]
  );

  const handleColumnClick = useCallback(
    (column: IColumn["key"]) => {
      if (sortState.column) {
        if (sortState.column !== column) {
          setIncreasingState(column);
        } else {
          if (sortState.state === ESortState.INCREASE)
            setDecreasingState(column);
          if (sortState.state === ESortState.DECREASE) {
            setSortState({
              column: "",
              state: ESortState.INACTIVE
            });
            setFilteredData(data);
          }
        }
      } else {
        setIncreasingState(column);
      }
    },
    [sortState, data, setIncreasingState, setDecreasingState, setFilteredData]
  );

  return {
    handleSearch,
    search,
    handleColumnClick
  };
};
