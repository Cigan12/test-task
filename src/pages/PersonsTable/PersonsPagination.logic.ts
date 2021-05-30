import { useCallback, useMemo, useState } from "react";
import { UCreateData } from "../../utils/CreateData.util";

interface ILPersonsPaginationProps {
  filteredData: ReturnType<typeof UCreateData>;
}

export const LPersonsPagination = ({
  filteredData
}: ILPersonsPaginationProps) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number | "">(5);

  const handlePageChange = useCallback((page: number) => {
    setPage(page);
  }, []);

  const handlePageSizeChange = useCallback((pageSize: string) => {
    if (!pageSize) {
      setPageSize("");
      setPage(1);
      return;
    }
    if (+pageSize > 0) {
      setPageSize(+pageSize);
      setPage(1);
    } else {
      setPageSize(1);
      setPage(1);
    }
  }, []);

  const paginatedData = useMemo(() => {
    return filteredData.slice(page * +pageSize - +pageSize, page * +pageSize);
  }, [page, pageSize, filteredData]);

  return {
    page,
    paginatedData,
    handlePageChange,
    pageSize: pageSize,
    handlePageSizeChange
  };
};
