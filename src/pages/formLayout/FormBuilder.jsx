import { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import {
  Grid,
  Button,
  InputLabel,
  TextField,
  Divider,
  Backdrop,
  CircularProgress,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { useDispatch } from "react-redux";
import FieldGenerator from "./FieldGenerator";
import shortid from "shortid";
import Section from "./Section";
import { useLocation, useNavigate } from "react-router-dom";
import { setPageLayoutSave } from "./LayoutJsonSlice";
import {
  fetchSubmitLayout,
  fetchLayoutJSON,
  layoutFieldDelete,
  deleteSectionLayout,
  fetchUpdateLayout,
} from "../../services/PageLayoutApi";
import MasterObjectField from "./MasterObjectField";
import { CheckBox } from "@mui/icons-material";

const mainBoxStyle = {
  minHeight: "100%",
  backgroundColor: "white",
  "&:hover": {
    backgroundColor: "#eee",
    opacity: [0.9],
  },
  cursor: "pointer",
  padding: "0.5rem",
};

var mainLayoutSection = {
  NAME: "Main Section",
  OBJ_ID: "",
  LAYOUT_ID: shortid.generate(),
  TYPE: "section",
  SECTION_ID: new Date().getTime(),
  PARENT_SECTION_ID: "0",
  CHILDREN: [],
};

const FormBuilder = (props) => {
  const mode = props.mode;
  //const objectId = props.objId;
  const dispatch = useDispatch();
  const location = useLocation();

  const objectId = location.state.object_id;
  const layoutId = location.state.layout_id;
  const [hasDropped, setHasDropped] = useState(false);
  const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false);
  var [layoutState, setlayoutState] = useState(null);
  const [layoutName, setlayoutName] = useState("");
  const [layoutPrintable, setlayoutPrintable] = useState(false);
  // console.log(layoutPrintable);
  const [rerender, setrerender] = useState(false);
  const navigate = useNavigate();
  /** Common State and function for all pages */
  /** Developer only need to append some code in handleAlertClose or handleAlertConfirm function  */

  const [backdrop, setBackdrop] = useState(false);
  const [msgBox, setMsgBox] = useState({
    open: false,
    action: "",
    alertTitle: "",
    alertBody: "",
    isAlertConfirm: false,
    alertConfirmTxt: "Ok",
    alertCloseTxt: "Close",
  });

  const handleBackdropClose = () => {
    setBackdrop(false);
  };
  const handleBackdropOpen = () => {
    setBackdrop(true);
  };

  const handleAlertClose = () => {
    let action = msgBox.action;
    setMsgBox({
      ...msgBox,
      open: false,
      action: "",
      alertTitle: "",
      alertBody: "",
      isAlertConfirm: false,
      alertConfirmTxt: "Ok",
      alertCloseTxt: "Close",
    });

    // Custom action
    if (action == "redirectManageFileds") {
      navigate("/object_fields", {
        state: { object_id: state.object_id },
      });
    }
  };
  const handleAlertOpen = (msgbody) => {
    setMsgBox({
      ...msgBox,
      open: true,
      action: "",
      alertTitle: "",
      alertBody: msgbody,
      isAlertConfirm: false,
      alertConfirmTxt: "Ok",
      alertCloseTxt: "Close",
    });
  };

  const handleAlertConfirm = () => {
    setMsgBox({
      ...msgBox,
      open: false,
      action: "",
      alertTitle: "",
      alertBody: "",
      isAlertConfirm: false,
      alertConfirmTxt: "Ok",
      alertCloseTxt: "Close",
    });
  };
  const msgRef = useRef();
  /******************************** */

  /** Custom State and function for this page */

  // const handleDelete = async (ele) => {
  //   console.log("Before delete was called", layoutState);
  //   console.log("To be deleted", ele.SECTION_ID);
  //   let layoutStateCopy = JSON.parse(JSON.stringify(layoutState));
  //   layoutStateCopy = deleteObjectBySectionId(layoutStateCopy, ele.SECTION_ID);
  //   console.log("Layout state copy", layoutStateCopy);
  //   setlayoutState(layoutStateCopy);
  //   dispatch(setPageLayoutSave(layoutState));
  //   if (mode === "EDIT") {
  //     if (ele.TYPE === "Field") {
  //       console.log(ele.FIELD_ID, "FIELD IS BEING DELETED");
  //       layoutFieldDelete({
  //         FIELD_ID: ele.FIELD_ID,
  //       })
  //         .then((res) => console.log("Delete Field from Backend", res))
  //         .catch((err) => console.log("Delete Field from Backend failed", err));
  //     } else {
  //       console.log(ele.SECTION_ID, "SECTION IS BEING DELETED");
  //       deleteSectionLayout({
  //         LAYOUT_ID: layoutState.LAYOUT_ID,
  //         SECTION_ID: ele.SECTION_ID,
  //       })
  //         .then((res) => console.log("Delete Section from Backend", res))
  //         .catch((err) =>
  //           console.log("Delete Section from Backend failed", err)
  //         );
  //     }
  //   }

  //   console.log("After delete was called", layoutState);
  // };
  const handleDelete = async (ele) => {
    console.log("Before delete was called", layoutState);
    console.log("To be deleted", ele.SECTION_ID);

    // Create a new layoutState without the deleted element
    const updatedLayoutState = removeElementFromLayout(
      layoutState,
      ele.SECTION_ID
    );

    console.log("Layout state after delete", updatedLayoutState);

    setlayoutState(updatedLayoutState);
    dispatch(setPageLayoutSave(updatedLayoutState));

    if (mode === "EDIT") {
      if (ele.TYPE === "Field") {
        console.log(ele.FIELD_ID, "FIELD IS BEING DELETED");
        layoutFieldDelete({
          FIELD_ID: ele.FIELD_ID,
        })
          .then((res) => console.log("Delete Field from Backend", res))
          .catch((err) => console.log("Delete Field from Backend failed", err));
      } else {
        console.log(ele.SECTION_ID, "SECTION IS BEING DELETED");
        deleteSectionLayout({
          LAYOUT_ID: layoutState.LAYOUT_ID,
          SECTION_ID: ele.SECTION_ID,
        })
          .then((res) => console.log("Delete Section from Backend", res))
          .catch((err) =>
            console.log("Delete Section from Backend failed", err)
          );
      }
    }

    console.log("After delete was called", updatedLayoutState);
  };

  const removeElementFromLayout = (layout, sectionId) => {
    if (!layout || !layout.CHILDREN) {
      return layout;
    }

    // Create a copy of the layout
    const updatedLayout = { ...layout };

    // Filter out the element with the specified SECTION_ID
    updatedLayout.CHILDREN = updatedLayout.CHILDREN.filter(
      (ele) => ele.SECTION_ID !== sectionId
    );

    // Recursively remove the element from child sections
    updatedLayout.CHILDREN = updatedLayout.CHILDREN.map((child) => ({
      ...child,
      CHILDREN: removeElementFromLayout(child, sectionId),
    }));

    return updatedLayout;
  };

  let keepReferenceObj;

  const deleteObjectBySectionId = (obj, sectionId) => {
    if (obj.SECTION_ID === sectionId) {
      return null;
    }

    if (Array.isArray(obj.CHILDREN)) {
      obj.CHILDREN = obj.CHILDREN.map((child) =>
        deleteObjectBySectionId(child, sectionId)
      );
      obj.CHILDREN = obj.CHILDREN.filter((child) => child !== null);

      return obj;
    }

    return obj;
  };

  const deleteMasterObjectSection = (sectionId) => {
    console.log(layoutState);
    console.log(sectionId, "--------------<");

    const result = layoutState.CHILDREN.filter(
      (ele) => ele.SECTION_ID != sectionId
    );
    console.log(result);
    setlayoutState({ ...layoutState, CHILDREN: result });
  };

  const handlefetchLayoutJSON = async (objectId, layoutId) => {
    const res = await fetchLayoutJSON({
      OBJ_ID: objectId,
      LAYOUT_ID: layoutId,
    });
    setlayoutState(res.data);
    console.log(res.data, "---------------->");
    setlayoutName(res.data.LAYOUT_NAME);
    setlayoutPrintable(res.data.PRINTABLE_LAYOUT);
    return;
  };

  const submitButton = () => {
    // handleBackdropOpen();
    const data = {
      ...layoutState,
      OBJ_ID: objectId,
      LAYOUT_NAME: layoutName,
      PRINTABLE_LAYOUT: layoutPrintable,
    };
    console.log(data);
    if (mode === "CREATE") {
      fetchSubmitLayout(data)
        .then((res) => {
          console.log("Submit button on click result", res);
          // setrerender(!rerender);
          handleBackdropClose();
          setlayoutState(null);
          setlayoutName("");
          setlayoutPrintable(false);
        })
        .catch((err) => {
          console.log(err);
          handleBackdropClose();
        });
      dispatch(setPageLayoutSave(layoutState));
    } else {
      const data = {
        ...layoutState,
        LAYOUT_NAME: layoutName,
        PRINTABLE_LAYOUT: layoutPrintable,
      };
      console.log(
        "THIS IS WHAT BEING PASSED A REQ BODY TO LAYOUT UPDATE",
        data
      );
      //if mode is EDIT, CALL UPDATE LAYOUT
      fetchUpdateLayout(data)
        .then((res) => {
          handleBackdropClose();
          setlayoutState(null);
          setlayoutName("");
          setlayoutPrintable(false);
        })
        .catch((err) => {
          console.log(err);
          handleBackdropClose();
        });
    }

    navigate("/getlayoutlist", { state: { object_id: objectId } });
  };

  // const [{ isOver, isOverCurrent }, drop] = useDrop(
  //   () => ({
  //     accept: ItemTypes.CARD,
  //     drop(_item, monitor) {
  //       const didDrop = monitor.didDrop();
  //       console.log(didDrop);
  //       if (didDrop) {
  //         return;
  //       }
  //       // console.log(_item);
  //       // console.log(mainLayoutSection);
  //       let mainLayout = mainLayoutSection;

  //       const obj = {
  //         ..._item,
  //         CHILDREN: [],
  //         PARENT_SECTION_ID: mainLayout.SECTION_ID,
  //         SECTION_ID: `${mainLayout.SECTION_ID}*${new Date().getTime()}`,
  //       };

  //       if (mainLayout["CHILDREN"].length === 0) {
  //         mainLayoutSection.CHILDREN = [obj];
  //       } else {
  //         const childArr = Object.values(mainLayout.CHILDREN);
  //         childArr.push(obj);
  //         mainLayoutSection.CHILDREN = childArr;
  //       }

  //       setHasDropped(true);
  //       setHasDroppedOnChild(didDrop);
  //       // return { props };
  //     },
  //     collect: (monitor) => ({
  //       isOver: monitor.isOver(),
  //       isOverCurrent: monitor.isOver({ shallow: true }),
  //       canDrop: monitor.canDrop(),
  //     }),
  //   }),
  //   [setHasDropped, setHasDroppedOnChild]
  // );

  const handleDrop = (_item, monitor) => {
    const didDrop = monitor.didDrop();
    console.log(didDrop);
    if (didDrop) {
      return;
    }
    // console.log(_item);
    // console.log(mainLayoutSection);
    let mainLayout = mainLayoutSection;

    const obj = {
      ..._item,
      CHILDREN: [],
      PARENT_SECTION_ID: mainLayout.SECTION_ID,
      SECTION_ID: `${mainLayout.SECTION_ID}*${new Date().getTime()}`,
    };

    if (mainLayout["CHILDREN"].length === 0) {
      mainLayoutSection.CHILDREN = [obj];
    } else {
      const childArr = Object.values(mainLayout.CHILDREN);
      childArr.push(obj);
      mainLayoutSection.CHILDREN = childArr;
    }

    setHasDropped(true);
    setHasDroppedOnChild(didDrop);
    // return { props };
  };

  const [{ isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      drop: handleDrop, // Use the defined handleDrop function here
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
      }),
    }),
    [setHasDropped, setHasDroppedOnChild]
  );

  useEffect(() => {
    if (layoutState === null) {
      setlayoutState(mainLayoutSection);
    }
    if (layoutId !== undefined) {
      handlefetchLayoutJSON(objectId, layoutId);
    }
  }, [rerender]);

  // console.log(layoutState);

  const handleTextChange = (objId, fieldId) => (event) => {
    const newState = updateTextvalue(
      layoutState,
      objId,
      fieldId,
      event.target.value
    );

    setlayoutState({ ...layoutState }, newState);
  };

  const updateTextvalue = (json, objId, fieldId, newValue) => {
    json.CHILDREN.forEach((ele) => {
      if (objId == ele.OBJ_ID) {
        ele.ITEMS.forEach((field) => {
          if (field.FIELD_ID == fieldId) {
            field.FIELD_VALUE = newValue;
          }
        });
      }
    });
  };

  return (
    <Grid container>
      <Grid item xs={8}>
        <TextField
          id="standard-basic"
          label="Layout Name"
          variant="standard"
          fullWidth
          placeholder="Enter Layout Name"
          value={layoutName}
          onChange={(e) => setlayoutName(e.target.value)}
        />
      </Grid>

      <Grid item xs={4}>
        <FormControlLabel
          sx={{ marginTop: "1rem" }}
          control={
            <Checkbox
              checked={layoutPrintable}
              onChange={(e) => setlayoutPrintable(e.target.checked)}
            />
          }
          label={"PRINTABLE_LAYOUT"}
        />
      </Grid>

      <Grid item xs={12} sx={{ minHeight: "10rem" }}>
        <div
          // container
          style={{
            ...mainBoxStyle,
            backgroundColor: isOverCurrent ? "#ECF9FF" : "white",
          }}
          ref={drop}
        >
          <Grid container spacing={1}>
            {/* //map function return a component with fields and section
             */}
            {layoutState && layoutState?.CHILDREN?.length > 0
              ? layoutState.CHILDREN.map((ele, index) => {
                  // console.log(ele);
                  // console.log(ele.OBJ_NAME);
                  if (ele.TYPE === "section") {
                    return (
                      <Section
                        key={index}
                        layout={ele}
                        mainlayoutState={layoutState}
                        setlayoutState={setlayoutState}
                        rerender={rerender}
                        setrerender={setrerender}
                        handleDelete={handleDelete}
                      ></Section>
                    );
                  } else if (ele.REFERENCE_OBJ_NAME) {
                    return (
                      <MasterObjectField
                        object={ele}
                        key={index}
                        deleteMasterObjectSection={deleteMasterObjectSection}
                        handleTextChange={handleTextChange}
                      />
                    );
                  } else {
                    return (
                      <Grid item xs={12} key={index}>
                        {/* <InputLabel>{ele.name}</InputLabel> */}

                        <FieldGenerator
                          handleFieldDelete={handleDelete}
                          key={index}
                          ele={ele}
                        />
                      </Grid>
                    );
                  }
                })
              : // layoutState && layoutState?.CHILDREN?.length > 0 && mode === 'EDIT' ?
                // layoutState.CHILDREN.toReversed().map((ele, index) => {
                // 	if (ele.TYPE === "section") {
                // 		return (
                // 			<Section
                // 				key={index}
                // 				layout={ele}
                // 				mainlayoutState={layoutState}
                // 				setlayoutState={setlayoutState}
                // 				rerender={rerender}
                // 				setrerender={setrerender}
                // 				handleDelete={handleDelete}
                // 			></Section>
                // 		);
                // 	} else {
                // 		return (
                // 			<Grid item xs={12} key={index}>
                // 				{/* <InputLabel>{ele.name}</InputLabel> */}

                // 				<FieldGenerator
                // 					handleFieldDelete={handleDelete}
                // 					key={index}
                // 					ele={ele}
                // 				/>
                // 			</Grid>
                // 		);
                // 	}
                // }) :
                ""}
          </Grid>
        </div>
        <Divider variant="middle" sx={{ margin: "1rem" }} />
      </Grid>
      <Grid item xs={4} sx={{ marginTop: "2rem" }}>
        <Button onClick={submitButton}>
          {mode === "CREATE" ? "Create" : "Update"}
        </Button>
        {"  "}
        <Button
          onClick={() =>
            navigate("/getlayoutlist", { state: { object_id: objectId } })
          }
        >
          Return
        </Button>
      </Grid>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  );
};

export default FormBuilder;
