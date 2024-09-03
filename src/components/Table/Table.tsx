import {
  Column,
  ColumnDef,
  PaginationState,
  Table as ReactTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  FilterFn,
  SortingState,
} from '@tanstack/react-table';
import { InputHTMLAttributes, useEffect, useState } from 'react';

import {
  RankingInfo,
  rankItem,
} from '@tanstack/match-sorter-utils'

import stylesModule from './Table.module.sass';

declare module '@tanstack/react-table' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({
    itemRank,
  })
  return itemRank.passed
}

interface ReactTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  keyToSelected?: string;
  handleClickColumn?: (value: any) => void;
}

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

 useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <input {...props} value={value} onChange={e => setValue(e.target.value)} />
  )
}

export const Table = <T extends object>({
  data,
  columns,
  keyToSelected,
  handleClickColumn,
}: ReactTableProps<T>) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 3,
  });

  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: {
      pagination,
      globalFilter,
      sorting
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    autoResetPageIndex: false,
    globalFilterFn: 'fuzzy',
    debugHeaders: true,
    debugColumns: false,
  });

  const key = keyToSelected ? keyToSelected : 'id';

  const totalPages = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;
  const pagesToShow = 5;
  const startPage = Math.max(0, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPages - 1, startPage + pagesToShow - 1);

  useEffect(() => {
    if (table.getState().columnFilters[0]?.id === 'fullName') {
      if (table.getState().sorting[0]?.id !== 'fullName') {
        table.setSorting([{ id: 'fullName', desc: false }])
      }
    }
  }, [table.getState().columnFilters[0]?.id])

  useEffect(() => {
    if(globalFilter.length){
      setPagination({
        pageIndex: 0,
        pageSize: data.length,
      })
    }else {
      if(pagination.pageSize !=  3){
        setPagination({
          pageIndex: 0,
          pageSize: 3,
        })
      }
    }

  }, [globalFilter])

  return (
    <div className={stylesModule.container}>
      <div className={stylesModule.tableWrapper}>
        <div className={stylesModule.tableContent}>
          <div className={stylesModule.searchWrapper}>
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              className={stylesModule.searchInput}
              placeholder="Search all columns..."
            />
          </div>
          <table className={stylesModule.table}>
            <thead className={stylesModule.tableHead}>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} colSpan={header.colSpan} className={stylesModule.tableHeaderCell}>
                      {header.isPlaceholder ? null : (
                        <div
                          className={
                            header.column.getCanSort()
                              ? stylesModule.sortableHeader
                              : ''
                          }
                          onClick={header.column.getToggleSortingHandler()}
                          title={
                            header.column.getCanSort()
                              ? header.column.getNextSortingOrder() === 'asc'
                                ? 'Sort ascending'
                                : header.column.getNextSortingOrder() === 'desc'
                                  ? 'Sort descending'
                                  : 'Clear sort'
                              : undefined
                          }
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row: any) => (
                <tr
                  key={row.id}
                  className={stylesModule.tableRow}
                  onClick={() => handleClickColumn && handleClickColumn(row.original[key])}
                >
                  {row.getVisibleCells().map((cell: any) => (
                    <td className={stylesModule.tableCell} key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className={stylesModule.paginationWrapper}>
            <button
              className={stylesModule.paginationButton}
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {'<<'}
            </button>
            <button
              className={stylesModule.paginationButton}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {'<'}
            </button>
            {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(page => (
              <button
                key={page}
                className={`${stylesModule.paginationButton} ${page === currentPage ? stylesModule.currentPage : ''}`}
                onClick={() => table.setPageIndex(page)}
              >
                {page + 1}
              </button>
            ))}
            <button
              className={stylesModule.paginationButton}
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {'>'}
            </button>
            <button
              className={stylesModule.paginationButton}
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
            >
              {'>>'}
            </button>
            <span className={stylesModule.pageInfo}>
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of {totalPages.toLocaleString()}
              </strong>
            </span>
            <span className={stylesModule.goToPage}>
              | Go to page:
              <input
                type="number"
                min="1"
                max={totalPages}
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className={stylesModule.goToPageInput}
              />
            </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className={stylesModule.pageSizeSelect}
            >
              {[5, 10, 15, 20, 25].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
