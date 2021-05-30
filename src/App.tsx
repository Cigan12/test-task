import * as React from "react";
import {
  PersonsTablePage,
  IColumn
} from "./pages/PersonsTable/PersonsTable.page";
import { useMemo, useState } from "react";
import { UCreateData } from "./utils/CreateData.util";

export const App: React.FC = () => {
  const [data] = useState(UCreateData(50));

  const columns: Array<IColumn> = useMemo(
    () => [
      { key: "firstName", title: "First name" },
      { key: "lastName", title: "Last name" },
      { key: "age", title: "Age" },
      { key: "visits", title: "Visits" },
      { key: "progress", title: "Progress" },
      { key: "status", title: "Status" },
      { key: "tags", title: "Tags", render: (value) => value.join(", ") }
    ],
    []
  );

  return (
    <div>
      <h1>Test (1 lvl)</h1>
      <h3>Description of the task in the README.md</h3>
      <PersonsTablePage columns={columns} data={data} />
    </div>
  );
};
