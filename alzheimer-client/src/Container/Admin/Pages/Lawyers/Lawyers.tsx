import React, { useEffect, useState } from "react";
import "./Lawyers.scss";
import Button from "../../../../Components/Button/Button";
import Loader from "../../../../util/loader";
import MuiDataTable from "../../../../Components/MuiDataTable/MuiDataTable";
import AdminApi from "../../../../api/admin";
import { USER_ROLE } from "../../../../interfaces";
import { errorNotify, successNotify } from "../../../../util/toast";
import { useNavigate } from "react-router-dom";

const Lawyer = () => {
  const navigation = useNavigate();
  const [getLawyerData, setGetLawyerData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setLoading(true);
    AdminApi.getAllUsers(USER_ROLE.LAWYER, page)
      .then((res) => {
        setGetLawyerData(res.data);
        setLoading(false);
      })
      .catch((e) => {
        errorNotify(e.response.data.message);
        setLoading(false);
      });
  }, [page, isFetching]);

  const onVerifyLawyerHandler = async (lawyerId: string) => {
    setLoading(true);
    setIsFetching(true);
    try {
      const res = await AdminApi.toggleLawyerVerification(lawyerId);
      successNotify(res.data.message);
      setLoading(false);
      setIsFetching(false);
    } catch (e: any) {
      setIsFetching(false);
      setLoading(false);
      errorNotify(e.response.data.message);
    }
  };

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
    "isVerified",
    {
      name: "Verification",
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <Button
              type="button"
              onClick={() => onVerifyLawyerHandler(tableMeta.rowData[0])}
            >
              Toggle
            </Button>
          );
        },
      },
    },
    {
      name: "View",
      options: {
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
          return (
            <Button
              type="button"
              onClick={() =>
                navigation(`/admin/detail/${tableMeta.rowData[0]}`)
              }
            >
              View
            </Button>
          );
        },
      },
    },
  ];

  return (
    <div className={"page_responsive"}>
      <h1>Lawyers</h1>
      <div className={"lawyers_table_container"}>
        {loading ? (
          <Loader />
        ) : (
          <MuiDataTable
            title={"Lawyers List"}
            page={page}
            setPage={setPage}
            search={false}
            data={getLawyerData}
            columns={columns}
          />
        )}
      </div>
    </div>
  );
};

export default Lawyer;
