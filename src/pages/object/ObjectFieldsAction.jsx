import React, { useState, useRef } from "react";
import { FaPlusCircle, FaLink, FaTrash, FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchEmployeeList,
//   fetchDeleteEmployee,
// } from "../../services/empSlice";
// import EmpEditSkill from "./EmpEditSkill";
// import EmpAvailability from "./EmpAvailability";
// import { deleteEmployeeListApi } from "../../services/employeeApiCalls";
// import { renderState } from "../../services/headerSlice";
import { useNavigate } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
// import EmpDeleteSkill from "./EmpDeleteSkill";
import ObjectFieldsDelete from "./ObjectFieldsDelete";
import ObjectFieldsEdit from "./ObjectFieldsWorkFlowEdit";
import Icons from "../../components/Icons";
import IconButton from "@mui/material/IconButton";

const ObjectFieldsAction = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const msgRefAvailability = useRef();
  const msgRefSkillE = useRef();
  // console.log(props);

  const [backdrop, setBackdrop] = useState(false);
  const handleBackdropClose = () => {
    setBackdrop(false);
  };
  const handleBackdropOpen = () => {
    setBackdrop(true);
  };
  const [manageCaseFieldEdit, setmanageCaseFieldEdit] = useState({
    open: false,
  });
  const [manageCaseFieldDelete, setmanageCaseFieldDelete] = useState({
    open: false,
  });
  // console.log(record);
  // console.log("----------------------------------------------");

  const handleManageCaseOpenFieldEdit = () => {
    setmanageCaseFieldEdit({
      open: true,
    });
  };
  const handleManageCaseCloseFieldEdit = () => {
    setmanageCaseFieldEdit({
      ...manageCaseFieldEdit,
      open: false,
    });
  };
  const handleManageCaseOpenFieldDelete = () => {
    setmanageCaseFieldDelete({
      // ...manageCaseSkillE,
      open: true,
    });
    // console.log(record);
  };
  const handleManageCaseCloseFieldDelete = () => {
    setmanageCaseFieldDelete({
      ...manageCaseFieldDelete,
      open: false,
    });
  };

  return (
    <>
      <IconButton
        id="objectFieldFaDelete"
        style={{
          marginLeft: "1.4rem",
          color: "#393E46",
          cursor: "pointer",
          fontSize: 18,
        }}
        onClick={() => handleManageCaseOpenFieldDelete()}
      >
        <Icons name={"FaTrash"} />
      </IconButton>

      {manageCaseFieldDelete.open && (
        <ObjectFieldsDelete
          // ref={msgRefSkillE}
          open={manageCaseFieldDelete.open}
          //   recorded={record}
          fieldInfoss={props.fieldInfo}
          // caseId={32}
          fieldDeleteId={props.deletefield}
          closeManageCase={() => handleManageCaseCloseFieldDelete()}
        />
      )}
    </>
  );
};

export default ObjectFieldsAction;
