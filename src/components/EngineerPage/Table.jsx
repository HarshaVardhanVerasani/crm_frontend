import AddBox from "@mui/icons-material/AddBox";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import Check from "@mui/icons-material/Check";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import Clear from "@mui/icons-material/Clear";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Edit from "@mui/icons-material/Edit";
import FilterList from "@mui/icons-material/FilterList";
import FirstPage from "@mui/icons-material/FirstPage";
import LastPage from "@mui/icons-material/LastPage";
import Remove from "@mui/icons-material/Remove";
import SaveAlt from "@mui/icons-material/SaveAlt";
import Search from "@mui/icons-material/Search";
import ViewColumn from "@mui/icons-material/ViewColumn";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import MaterialTable from "material-table";
import React, { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  BASE_URL,
  GET_CUSTOMER_ALL_TICKETS,
  UPDATE_CUSTOMER_TICKET,
} from "../../apis/apis";
import { loadEngineerData } from "../../redux/engineerSlice";
import { deepCopying } from "../../utils/common";
import CircularLoad from "../CircularLoad/CircularLoad";
const defaultMaterialTheme = createTheme();

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

function EngineerTable() {
  const [isUserListLoading, setIsUserListLoading] = useState(true);
  const [tableData, setTableData] = useState();
  const ticketsList = useSelector((store) => store.engineerSlice.data);
  const dispatch = useDispatch();

  //material ui cannot work on immutable objects so i converted to entirely new deep copy of data.
  useEffect(() => {
    setTableData(deepCopying(ticketsList));
  }, [ticketsList]);

  const fetchAllTickets = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}${GET_CUSTOMER_ALL_TICKETS}`
      );
      dispatch(loadEngineerData(data));
      setIsUserListLoading(false);
    } catch (error) {
      toast.warn(error.response.data.message);
    }
  };

  //initial component mount
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      fetchAllTickets();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isUserListLoading ? (
        <CircularLoad />
      ) : (
        <ThemeProvider theme={defaultMaterialTheme}>
          <MaterialTable
            icons={tableIcons}
            title="ENGINEERS TABLE"
            columns={[
              {
                title: "Customer",
                field: "reporter",
                align: "center",
                editable: "never",
              },
              {
                title: "Created_Date",
                field: "createdAt",
                align: "center",
                editable: "never",
              },
              {
                title: "Title",
                field: "title",
                align: "center",
                cellStyle: {
                  fontSize: "12px",
                },
              },
              {
                title: "Description",
                field: "description",
                align: "center",
                cellStyle: {
                  fontSize: "12px",
                },
              },
              {
                title: "Engineer_Assigned",
                field: "assignee",
                align: "center",
                editable: "never",
              },
              {
                title: "Priory_Level",
                field: "ticketPriority",
                align: "center",
                editComponent: ({ value, onChange }) => (
                  <select
                    className="form-select"
                    onChange={(e) => onChange(+e.target.value)}
                  >
                    <option value={value} defaultValue={true}>
                      {value}
                    </option>
                    {[1, 2, 3, 4].map(
                      (item) =>
                        item !== value && (
                          <option value={item} key={item}>
                            {item}
                          </option>
                        )
                    )}
                  </select>
                ),
              },
              {
                title: "Status",
                field: "status",
                align: "center",
                editComponent: ({ value, onChange }) => (
                  <select
                    className="form-select"
                    onChange={(e) => onChange(e.target.value)}
                  >
                    <option value={value} defaultValue={true}>
                      {value}
                    </option>
                    {["OPEN", "CLOSED", "IN_PROGRESS", "BLOCKED"].map(
                      (item) =>
                        item !== value && (
                          <option value={item} key={item}>
                            {item}
                          </option>
                        )
                    )}
                  </select>
                ),
                cellStyle: (data, _rowData) => {
                  if (data === "OPEN") {
                    return {
                      color: "limegreen",
                    };
                  } else if (data === "BLOCKED") {
                    return {
                      color: "red",
                    };
                  } else if (data === "IN_PROGRESS") {
                    return {
                      color: "darkorange",
                    };
                  } else if (data === "CLOSED") {
                    return {
                      color: "blue",
                    };
                  }
                },
              },
              {
                title: "Update_At",
                field: "updatedAt",
                align: "center",
                editable: "never",
              },
            ]}
            editable={{
              onRowUpdate: (newData, _oldData) =>
                new Promise((resolve, _reject) => {
                  const updatingTicket = async () => {
                    try {
                      await axios.put(
                        `${BASE_URL}${UPDATE_CUSTOMER_TICKET}${newData.id}`,
                        newData
                      );
                      //after updating ticket then i call get customer tickets again get fresh data
                      fetchAllTickets();
                      //success message
                      toast.success("Ticket Updated");
                    } catch (error) {
                      console.log(error);
                      toast.warn(error.response.data.message);
                    }
                  };

                  //Calling updating ticket function
                  updatingTicket();
                  resolve();
                }),
            }}
            options={{
              exportButton: true,
              actionsColumnIndex: -1,
            }}
            data={tableData}
          />
        </ThemeProvider>
      )}
    </>
  );
}
export default EngineerTable;
