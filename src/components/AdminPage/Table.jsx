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
  GET_ALL_TICKETS,
  GET_ALL_USERS,
  UPDATE_CUSTOMER_TICKET,
} from "../../apis/apis";
import { loadAdminTickets, loadAdminUsers } from "../../redux/adminSlice";
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

function AdminTable() {
  const [isUserListLoading, setIsUserListLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [tableData2, setTableData2] = useState([]);
  const [allEngineersNames, setAllEngineersNames] = useState([]);
  const allUsers = useSelector((store) => store.adminSlice.allUsers);
  const allTickets = useSelector((store) => store.adminSlice.allTickets);
  const dispatch = useDispatch();

  async function fetchAllUsers() {
    try {
      const { data } = await axios.get(`${BASE_URL}${GET_ALL_USERS}`);
      dispatch(loadAdminUsers(data));
      setIsUserListLoading(false);
    } catch (error) {
      console.log(error)
      toast.warn(error.response.data.message);
    }
  }

  async function fetchAllTickets() {
    try {
      const { data } = await axios.get(`${BASE_URL}${GET_ALL_TICKETS}`);
      dispatch(loadAdminTickets(data));
      setIsUserListLoading(false);
    } catch (error) {
      console.log(error);
      toast.warn(error.response.data.message);
    }
  }

  const findingAllEngineers = () => {
    const result = [];
    allUsers.forEach(
      (item) =>
        item.userType === "ENGINEER" &&
        item.userStatus === "APPROVED" &&
        result.push(item.id)
    );
    setAllEngineersNames(result);
  };

  //component mount we call api
  useEffect(() => {
    if (localStorage.getItem("userTypes") === "ADMIN") {
      fetchAllUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //component mount we call api
  useEffect(() => {
    if (localStorage.getItem("userTypes") === "ADMIN") {
      fetchAllTickets();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    findingAllEngineers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //material ui cannot work on immutable objects so i converted to entirely new deep copy of data.
  useEffect(() => {
    setTableData(deepCopying(allUsers));
  }, [allUsers]);

  useEffect(() => {
    setTableData2(deepCopying(allTickets));
  }, [allTickets]);

  //finding all engineers names who have in approved state when admin approved
  useEffect(() => {
    findingAllEngineers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allUsers]);

  return (
    <>
      {isUserListLoading ? (
        <CircularLoad />
      ) : (
        <>
          <ThemeProvider theme={defaultMaterialTheme}>
            <MaterialTable
              icons={tableIcons}
              title="Users Table"
              columns={[
                {
                  title: "User_ID",
                  field: "userId",
                  align: "center",
                  editable: "never",
                },
                {
                  title: "Name",
                  field: "name",
                  align: "center",
                },
                {
                  title: "Email",
                  field: "email",
                  align: "center",
                },
                {
                  title: "Role",
                  field: "userType",
                  align: "center",

                  editComponent: ({ value, onChange }) => (
                    <select
                      className="form-select"
                      onChange={(e) => onChange(e.target.value)}
                    >
                      <option value={value} defaultValue={true}>
                        {value}
                      </option>
                      {[("ADMIN", "ENGINEER", "CUSTOMER")].map(
                        (item) =>
                          item !== value && (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          )
                      )}
                    </select>
                  ),
                },
                {
                  title: "Status",
                  field: "userStatus",
                  align: "center",
                  cellStyle: (data, _rowData) => {
                    if (data === "APPROVED") {
                      return {
                        color: "limegreen",
                      };
                    } else if (data === "REJECTED") {
                      return {
                        color: "red",
                      };
                    } else if (data === "PENDING") {
                      return {
                        color: "darkorange",
                      };
                    }
                  },
                  editComponent: ({ value, onChange }) => (
                    <select
                      className="form-select"
                      onChange={(e) => onChange(e.target.value)}
                    >
                      <option defaultValue={true} value={value}>
                        {value}
                      </option>
                      {["PENDING", "APPROVED", "REJECTED"].map(
                        (item) =>
                          item !== value && (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          )
                      )}
                    </select>
                  ),
                },
              ]}
              editable={{
                onRowUpdate: (newData, _oldData) =>
                  new Promise((resolve, _reject) => {
                    // updating existing user data in database
                    const updatingUser = async () => {
                      try {
                        const { data } = await axios.put(
                          `${BASE_URL}/crm/api/v1/users/${newData.userId}`,
                          newData
                        );

                        // once we updated the database then we call api again for fresh data
                        fetchAllUsers();

                        //success message
                        toast.success(`${data.message}`);
                      } catch (error) {
                        // any error occurs while updating in database
                        console.log(error);
                        toast.warn(error.response.data.message);
                      }
                    };

                    // execute func
                    updatingUser();

                    // resolving promise
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

          {/* Table for all tickets generated by customers  */}
          <ThemeProvider theme={defaultMaterialTheme}>
            <MaterialTable
              icons={tableIcons}
              title="All Tickets"
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
                  editComponent: ({ value, onChange }) => (
                    <select
                      className="form-select"
                      onChange={(e) => onChange(e.target.value)}
                    >
                      <option value={value} defaultValue={true}>
                        {value}
                      </option>
                      {allEngineersNames.map(
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

                        //after updating calling api again for fresh data
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
              data={tableData2}
            />
          </ThemeProvider>
        </>
      )}
    </>
  );
}
export default AdminTable;
