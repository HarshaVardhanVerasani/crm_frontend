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
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BASE_URL, UPDATE_CUSTOMER_TICKET } from "../../apis/apis";
import { deepCopying } from "../../utils/common";

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

function CustomerTable({ fetchingCustomerAllTickets }) {
  const customerAllTickets = useSelector((store) => store.customerSlice.data);
  const [tableData, setTableData] = useState([]);

  //material ui cannot work on immutable objects so i converted to entirely new deep copy of data.
  useEffect(() => {
    setTableData(deepCopying(customerAllTickets));
  }, [customerAllTickets]);

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <MaterialTable
        icons={tableIcons}
        title="CUSTOMER TABLE"
        columns={[
          {
            title: "ID",
            field: "id",
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
                <option defaultValue={true} value={value}>
                  {value}
                </option>
                {["1", "2", "3", "4", "5"].map(
                  (item) =>
                    item !== value.toString() && (
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
            field: "status",
            align: "center",
            cellStyle: (data, _rowData) => {
              if (data === "OPEN") {
                return {
                  color: "limegreen",
                };
              } else if (data === "CLOSED") {
                return {
                  color: "blue",
                };
              } else if (data === "BLOCKED") {
                return {
                  color: "red",
                };
              } else if (data === "IN_PROGRESS") {
                return {
                  color: "orange",
                };
              }
            },

            editComponent: ({ value, onChange }) => (
              <select
                className="form-select"
                disabled={
                  value === "IN_PROGRESS" || value === "BLOCKED" ? true : false
                }
                onChange={(e) => onChange(e.target.value)}
              >
                <option defaultValue={true} value={value}>
                  {value}
                </option>
                {["OPEN", "CLOSED"].map(
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
            title: "Update_At",
            field: "updatedAt",
            align: "center",
            editable: "never",
          },
        ]}
        editable={{
          onRowUpdate: (newData, _oldData) =>
            new Promise((resolve, _reject) => {
              const editTicket = async () => {
                try {
                  await axios.put(
                    `${BASE_URL}${UPDATE_CUSTOMER_TICKET}${newData.id}`,
                    newData
                  );
                  //once editing is updated in backend then calling again for fresh data
                  fetchingCustomerAllTickets();
                  //success message
                  toast.success("Updated")
                } catch (error) {
                  console.log(error);
                  toast.warn(
                     error.response.data.message
                  );
                }
              };
              editTicket();
              resolve();
            }),
        }}
        data={tableData}
        options={{
          exportButton: true,
          actionsColumnIndex: -1,
        }}
      />
    </ThemeProvider>
  );
}

export default CustomerTable;
