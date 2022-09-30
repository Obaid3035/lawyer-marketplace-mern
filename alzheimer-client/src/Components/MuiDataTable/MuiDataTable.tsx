import React from "react";
import MUIDataTable, { FilterType } from "mui-datatables";
import Loader from "../../util/loader";

const MuiDataTable: React.FC<any> = ({
  data: { count, data },
  columns,
  title,
  setPage,
  page,
  search,
  setSearchText,
  isLoading,
}) => {
  const changePage = (newTableState: any) => {
    setPage(newTableState.page);
  };

  const options: FilterType | any = {
    filter: false,
    search,
    rowsPerPageOptions: [],
    rowsPerPage: 3,
    count,
    serverSide: true,
    jumpToPage: false,
    page,
    print: false,
    onTableChange: (action: string, newTableState: any) => {
      switch (action) {
        case "changePage":
          changePage(newTableState);
          break;
      }
    },
    viewColumns: false,
    responsive: "standard",
    filterType: "checkbox",
    selectableRows: "none",
    textLabels: {
      body: {
        noMatch: isLoading ? (
          <div className={"text-center"}>
            <Loader />
          </div>
        ) : (
          "No Data Found"
        ),
      },
    },
  };

  return (
    <div>
      <MUIDataTable
        title={title}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default MuiDataTable;
