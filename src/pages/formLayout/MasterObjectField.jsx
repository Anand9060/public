import {
  Autocomplete,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Paper,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useMemo, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { DatePicker } from "rsuite";
import MasterDataEntry from "./MasterDataEntry";
import { AgGridReact } from "ag-grid-react";

const MasterObjectField = ({
  object,
  deleteMasterObjectSection,
  handleTextChange,
}) => {
  // const generateFieldJSX = (field) => {
  //   console.log(field.DATA_TYPE);
  //   switch (field.DATA_TYPE) {
  //     case "Single Line Text":
  //     case "Multiple Line Text":
  //       return (
  //         <Grid
  //           item
  //           xs={12}
  //           style={{ padding: 5, margin: 5 }}
  //           key={field.FIELD_ID}
  //         >
  //           <TextField
  //             variant="outlined"
  //             size="small"
  //               label={field.FIELD_NAME}
  //             fullWidth
  //             style={{ marginBottom: "1rem" }}
  //             value={field.VALUE}
  //             //   onChange={(event) =>
  //             //     handleOnChange(field.FIELD_ID, event.target.value)
  //             //   }
  //           />
  //         </Grid>
  //       );

  //     case "Number":
  //     case "Phone Number":
  //       return (
  //         <Grid
  //           item
  //           xs={12}
  //           key={field.FIELD_ID}
  //           style={{ padding: 5, margin: 5 }}
  //         >
  //           <InputLabel>{field.FIELD_NAME}</InputLabel>
  //           <TextField
  //             //   value={field.VALUE}
  //             variant="outlined"
  //             size="small"
  //             fullWidth
  //             style={{ marginBottom: "1rem" }}
  //             type="number"
  //             //   onChange={(event) =>
  //             //     handleOnChange(field.FIELD_ID, event.target.value)
  //             //   }
  //           />
  //         </Grid>
  //       );

  //     case "Email":
  //       return (
  //         <Grid key={field.FIELD_ID} style={{ padding: 5, margin: 5 }}>
  //           <TextField
  //             variant="outlined"
  //             type="email"
  //             size="small"
  //             //   label={field.FIELD_NAME}
  //             //   value={field.VALUE}
  //             //   onChange={(event) =>
  //             //     handleOnChange(field.FIELD_ID, event.target.value)
  //             //   }
  //             style={{ marginBottom: "1rem" }}
  //             fullWidth
  //           />
  //         </Grid>
  //       );

  //     case "Radio Button":
  //       return (
  //         <Grid
  //           container
  //           spacing={2}
  //           style={{ padding: 5, margin: 5 }}
  //           key={field.FIELD_ID}
  //         >
  //           <Grid item>
  //             <InputLabel>{field.FIELD_NAME}</InputLabel>
  //           </Grid>
  //           <Grid item>
  //             <FormControl component="fieldset">
  //               <RadioGroup
  //                 aria-label="radio-buttons-group"
  //                 name="radio-buttons-group"
  //                 row
  //                 //   value={field.VALUE}
  //                 //   onChange={(event) =>
  //                 //     handleOnChange(field.FIELD_ID, event.target.value)
  //                 //   }
  //               >
  //                 {/* {field.OPTIONS.map((option) => (
  //                       <FormControlLabel
  //                       //   key={option.OPTION_ID}
  //                       //   value={option.OPTION_NAME}
  //                         control={<Radio />}
  //                       //   label={option.OPTION_NAME}
  //                       />
  //                     ))} */}
  //               </RadioGroup>
  //             </FormControl>
  //           </Grid>
  //         </Grid>
  //       );

  //     case "Date-Time":
  //       return (
  //         <Grid
  //           container
  //           spacing={2}
  //           key={field.FIELD_ID}
  //           style={{ padding: 5, margin: 5 }}
  //         >
  //           <Grid item>
  //             <InputLabel>{field.FIELD_NAME}</InputLabel>
  //           </Grid>
  //           <Grid item>
  //             <DatePicker
  //               format="yyyy-MM-dd"
  //               showMeridian
  //               block
  //               // value={new Date(field.VALUE)}
  //               // onChange={(value) => handleOnChange(field.FIELD_ID, value)}
  //             />
  //           </Grid>
  //         </Grid>
  //       );

  //     case "Text Lookup":
  //       return (
  //         <Grid key={field.FIELD_ID} xs={12} style={{ padding: 5, margin: 5 }}>
  //           <Autocomplete
  //             disablePortal
  //             //   value={field.VALUE}
  //             //   onChange={(event, value) => handleOnChange(field.FIELD_ID, value)}
  //             //   options={field.OPTIONS.map((option) => option.OPTION_NAME)}
  //             renderInput={(params) => (
  //               <TextField
  //                 {...params}
  //                 //   label={field.FIELD_NAME}
  //                 variant="outlined"
  //               />
  //             )}
  //           />
  //         </Grid>
  //       );

  //     case "Dynamic Lookup":
  //       return (
  //         <Grid key={field.FIELD_ID} xs={12} style={{ padding: 5, margin: 5 }}>
  //           <Autocomplete
  //             disablePortal
  //             //   value={field.VALUE}
  //             //   onChange={(event, value) => handleOnChange(field.FIELD_ID, value)}
  //             //   options={field.OPTIONS}
  //             renderInput={(params) => (
  //               <TextField
  //                 {...params}
  //                 //   label={field.FIELD_NAME}
  //                 variant="outlined"
  //               />
  //             )}
  //           />
  //         </Grid>
  //       );

  //     case "Text Lookup Multiple Choice":
  //       console.log("TLMC", field);
  //       return (
  //         <Grid key={field.FIELD_ID} xs={12} style={{ padding: 5, margin: 5 }}>
  //           <Autocomplete
  //             multiple
  //             //   onChange={(event, value) => handleOnChange(field.FIELD_ID, value)}
  //             //   options={field.OPTIONS.map((option) => option.OPTION_NAME)}
  //             //   value={field.VALUE}
  //             renderInput={(params) => (
  //               <TextField
  //                 {...params}
  //                 //   label={field.FIELD_NAME}
  //                 variant="outlined"
  //                 fullWidth
  //               />
  //             )}
  //           />
  //         </Grid>
  //       );

  //     case "Dynamic Lookup Multiple Choice":
  //       console.log("DLMC", field);
  //       return (
  //         <Grid key={field.FIELD_ID} xs={12} style={{ padding: 5, margin: 5 }}>
  //           <Autocomplete
  //             multiple
  //             // onChange={(event, value) => handleOnChange(field.FIELD_ID, value)}
  //             // options={field.OPTIONS}
  //             // value={field.VALUE}
  //             renderInput={(params) => (
  //               <TextField
  //                 {...params}
  //                 // label={field.FIELD_NAME}
  //                 variant="outlined"
  //                 fullWidth
  //               />
  //             )}
  //           />
  //         </Grid>
  //       );

  //     default:
  //       return null;
  //   }
  // };

  // const [dataEntry, setDataEntry] = useState({
  //   open: false,
  //   ele: {},
  // });

  // const handledDataEntryOpen = (param) => {
  //   console.log("heooppppppppppppppppp");
  //   // console.log(param);
  //   setDataEntry({
  //     ...dataEntry,
  //     open: true,
  //     ele: param,
  //   });
  //   // console.log(record);
  // };
  // const handleDataEntryClose = () => {
  //   setDataEntry({
  //     ...dataEntry,
  //     open: false,
  //   });
  // };

  const gridApiRef = useRef(null);
  const [rowData, setRowData] = useState([
    { col1: "Data 1", col2: "Data 2" },
    { col1: "Data 3", col2: "Data 4" },
    // Add more row data as needed
  ]);

  const columnDefs = [
    { headerName: "Column 1", field: "col1" },
    { headerName: "Column 2", field: "col2" },
    // Add more column definitions as needed
  ];

  // const coloumDefsFun = () => {
  //   let obj = {
  //     FIELD_ID: "",
  //     headerName: "",
  //     field: "",
  //   };
  //   let arrObject = [];

  //   object.ITEMS.forEach((ele) => {
  //     obj = {
  //       FIELD_ID: ele.FIELD_ID,
  //       headerName: ele.FIELD_NAME,
  //       field: ele.FIELD_NAME,
  //     };
  //     arrObject.push(obj);
  //   });

  //   console.log(arrObject);

  //   return arrObject;
  // };
  // coloumDefsFun();

  // const onGridReady = (params) => {
  //   gridApiRef.current = params.api;
  // };

  // const defaultColDef = useMemo(() => {
  //   return {
  //     sortable: true,
  //     filter: true,
  //     resizable: true,
  //     floatingFilter: true,
  //     suppressMenu: true,
  //   };
  // }, []);

  return (
    <div
      className="ag-theme-alpine"
      style={{
        height: "80px",
        width: "200px",

        margin: "2rem",
        backgroundColor: "#eee",
        border: "1px solid red",
        display: "flex",

        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {object.REFERENCE_OBJ_NAME}
    </div>
  );
};

export default MasterObjectField;
