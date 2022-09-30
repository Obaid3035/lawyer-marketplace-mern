import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../../Components/Button/Button";
import Loader from "../../../../util/loader";
import MuiDataTable from "../../../../Components/MuiDataTable/MuiDataTable";
import "./CareGivers.scss";
import AdminApi from "../../../../api/admin";
import { USER_ROLE } from "../../../../interfaces";
import { errorNotify } from "../../../../util/toast";

const CareGivers = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [getCareGiverData, setGetCareGiverData] = useState<any>([]);

  useEffect(() => {
    setLoading(true);
    AdminApi.getAllUsers(USER_ROLE.CAREGIVER, page)
      .then((res) => {
        setGetCareGiverData(res.data);
        setLoading(false);
      })
      .catch((e) => {
        errorNotify(e.response.data.message);
        setLoading(false);
      });
  }, [page]);

  const columns = [
    {
      name: "ID",
      options: {
        display: false,
      },
    },
    "Name",
    "Email",
    "Nic",
    {
      name: "View",
      options: {
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
          return (
            <Button type="button" onClick={() => navigate(`/admin/detail/${tableMeta.rowData[0]}`)}>
              View
            </Button>
          );
        },
      },
    },
    {
      name: "Action",
      options: {
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
          return <Button type="button"> Delete </Button>;
        },
      },
    },
  ];

  return (
    <div className={"page_responsive"}>
      <h1>Caregiver</h1>
      <div className={"lawyers_table_container"}>
        {loading ? (
          <Loader />
        ) : (
          <MuiDataTable
            title={"Caregiver List"}
            page={page}
            setPage={setPage}
            search={false}
            data={getCareGiverData}
            columns={columns}
          />
        )}
      </div>
    </div>
  );
};

export default CareGivers;
