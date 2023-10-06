import React, { useEffect, useState } from "react";
import {
  deleteRule,
  getRuleList,
  getRules,
  saveRule,
} from "../../services/objectApi";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import shortid from "shortid";
import { Button } from "rsuite";
import useGetField from "./useGetField";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const RuleModal = ({
  rowData,
  objectId,
  ruleValidationModalOpen,
  openModalForRuleValidation,
  closeModalForRuleValidation,
}) => {
  const [fieldList, setFieldList] = useState([]);
  const [ruleList, setRuleList] = useState([]);
  const [rulesAvailable, setRulesAvailable] = useState([]);

  const ruleItemInitialState = {
    OBJ_ID: objectId,
    VALIDATION_MASTER_ID: "",
    FIELD_1_VALUE: "",
    FIELD_2_VALUE: "",
    DATA_TYPE_ID_1: "",
    DATA_TYPE_ID_2: "",
    VALIDATION_TYPE: "",
    FIELD_1_NAME: "",
    FIELD_2_NAME: "",
    FIELD_1: "",
    FIELD_2: "",
    SELECT_RULE_VALUE: "",
    CONSTANT_1_REQ: false,
    CONSTANT_2_REQ: false,
    ADDITIONAL_FIELD: false,
    FIELD_CONSTANT_1: "",
    FIELD_CONSTANT_2: "",
    USER_MESSAGE: "",
  };
  const [ruleItem, setRuleItem] = useState(ruleItemInitialState);

  useEffect(() => {
    const modifyFieldList = () => {
      const list = rowData.map((ele) => ({
        DATA_TYPE_ID: ele.DATA_TYPE_ID,
        FIELD_NAME: ele.FIELD_NAME,
        FIELD_ID: ele.FIELD_ID,
      }));
      setFieldList(list);
    };

    const fetchRuleList = async () => {
      try {
        const list = await getRuleList();
        setRuleList(list);
        console.log(list);
      } catch (error) {
        console.error("Error fetching rule list:", error);
      }
    };

    const fetchEnteredRules = async () => {
      try {
        const rules = await getRules({ OBJ_ID: objectId });
        setRulesEntered(rules);
      } catch (error) {
        console.error("Error fetching entered rules:", error);
      }
    };

    modifyFieldList();
    fetchEnteredRules();
    fetchRuleList();
  }, [rowData, objectId]);

  const [rulesEntered, setRulesEntered] = useState([]);
  const [switchAddButtonName, setSwitchAddButtonName] = useState("Add");
  const [switchClearButtonName, setSwitchClearButtonName] = useState("Clear");

  const setFilteredRules = (dataTypeId) => {
    const filteredRules = ruleList.filter(
      (ele) => ele.DATA_TYPE_ID === dataTypeId
    );
    setRulesAvailable(filteredRules);
  };

  const handleFieldSelect1Change = (e) => {
    const selectedValue = e.target.value;
    const [fieldId, dataTypeId, fieldName] = selectedValue.split("*");
    setRuleItem({
      ...ruleItem,
      FIELD_1_VALUE: selectedValue,
      FIELD_1: fieldId,
      DATA_TYPE_ID_1: dataTypeId,
      FIELD_1_NAME: fieldName,
      USER_MESSAGE: "",
      CONSTANT_1_REQ: false,
      CONSTANT_2_REQ: false,
      ADDITIONAL_FIELD: false,
    });
    console.log(ruleItem);
    setFilteredRules(dataTypeId);
  };

  const handleFieldSelect2Change = (e) => {
    const selectedValue = e.targrt.value;
    const [fieldId, dataTypeId, fieldName] = selectedValue.split("*");
    setRuleItem({
      ...ruleItem,
      FIELD_2_VALUE: selectedValue,
      FIELD_2: fieldId,
      DATA_TYPE_ID_2: dataTypeId,
      FIELD_2_NAME: fieldName,
    });
  };

  const handleRuleSelectChange = (e) => {
    const selectedValue = e.target.value;
    console.log(selectedValue);
    const [
      validationType,
      ruleDescription,
      constant1req,
      constant2req,
      additionalField,
    ] = selectedValue.split("*");
    setRuleItem({
      ...ruleItem,
      SELECT_RULE_VALUE: selectedValue,
      VALIDATION_TYPE: validationType,
      CONSTANT_1_REQ: constant1req == "true",
      CONSTANT_2_REQ: constant2req == "true",
      ADDITIONAL_FIELD: additionalField == "true",
      USER_MESSAGE: ruleDescription,
    });
    console.log(ruleItem);
  };

  const handleOnChangeFC1 = (fieldId, value) => {
    setRuleItem({
      ...ruleItem,
      FIELD_CONSTANT_1: value,
    });
  };

  const handleOnChangeFC2 = (fieldId, value) => {
    setRuleItem({
      ...ruleItem,
      FIELD_CONSTANT_2: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const data = { ...ruleItem };
    if (data.VALIDATION_MASTER_ID !== "") {
      let copyRulesEntered = [...rulesEntered];
      copyRulesEntered = copyRulesEntered.filter(
        (ele) => ele.VALIDATION_MASTER_ID !== data.VALIDATION_MASTER_ID
      );
      setRulesEntered([...copyRulesEntered, data]);
    } else {
      data.VALIDATION_MASTER_ID = shortid.generate();
      console.log(data);
      setRulesEntered([...rulesEntered, data]);
    }
    const res = await saveRule(data);
    console.log(res);
    setRuleItem(ruleItemInitialState);
    setSwitchAddButtonName("Add");
    setSwitchClearButtonName("Clear");
  };

  const handleRuleUpdate = (data) => {
    console.log(data);
    setSwitchAddButtonName("Update");
    setSwitchClearButtonName("Cancel");
    setRuleItem(data);
    setFilteredRules(data.DATA_TYPE_ID_1);
  };

  const handleRuleDelete = async (VALIDATION_MASTER_ID) => {
    const filteredEnteredRules = rulesEntered.filter(
      (ele) => ele.VALIDATION_MASTER_ID !== VALIDATION_MASTER_ID
    );
    setRulesEntered(filteredEnteredRules);
    const res = await deleteRule({ VALIDATION_MASTER_ID });
    console.log(res);
  };

  const columnDefs = [
    {
      headerName: "Field 1",
      field: "FIELD_1_NAME",
      flex: 1,
    },
    {
      headerName: "Field 1 Value",
      field: "FIELD_CONSTANT_1",
      valueFormatter: (params) => {
        const valueField1 = params?.data?.FIELD_CONSTANT_1;
        return Array.isArray(valueField1)
          ? valueField1.join(", ")
          : valueField1;
      },
      flex: 1,
    },
    {
      headerName: "Field 2",
      field: "FIELD_2",
      flex: 1,
    },
    {
      headerName: "Field 2 Value",
      field: "FIELD_CONSTANT_2",
      valueFormatter: (params) => {
        const valueField2 = params?.data?.FIELD_CONSTANT_2;
        return Array.isArray(valueField2)
          ? valueField2.join(", ")
          : valueField2;
      },
      flex: 1,
    },
    {
      headerName: "Rule Code",
      field: "VALIDATION_TYPE",
      flex: 1,
    },
    {
      headerName: "User Message",
      field: "USER_MESSAGE",
      flex: 1,
    },
    {
      headerName: "Update",
      cellRendererFramework: (params) => {
        return (
          <Button
            disabled={switchAddButtonName === "Update"}
            style={{
              height: "80%",
              width: "100%",
              marginBottom: "7px",
              color: "black",
              backgroundColor: "#FEDC56",
            }}
            onClick={() => handleRuleUpdate(params.data)}
          >
            Update
          </Button>
        );
      },
      width: 100,
    },
    {
      headerName: "Remove",
      cellRendererFramework: (params) => {
        return (
          <Button
            disabled={switchAddButtonName === "Update"}
            style={{
              height: "80%",
              width: "100%",
              marginBottom: "7px",
              color: "white",
              backgroundColor: "#ff6347",
            }}
            onClick={() => handleRuleDelete(params.data.VALIDATION_MASTER_ID)}
          >
            Remove
          </Button>
        );
      },
      width: 100,
    },
  ];

  return (
    <>
      <Box style={{ width: "100%" }}>
        {fieldList.length >= 0 && (
          <form onSubmit={handleOnSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <InputLabel id="field-select-label">
                    Choose a field
                  </InputLabel>
                  <Select
                    labelId="field-select-label"
                    native
                    required={true}
                    onChange={handleFieldSelect1Change}
                    value={ruleItem.FIELD_1_VALUE}
                  >
                    <option aria-label="None" value="" />
                    {fieldList.map((field) => (
                      <option
                        key={field.FIELD_ID}
                        value={`${field.FIELD_ID}*${field.DATA_TYPE_ID}*${field.FIELD_NAME}`}
                      >
                        {field.FIELD_NAME}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <Grid container spacing={1}>
                  <Grid item xs={ruleItem.CONSTANT_2_REQ === true ? 6 : 12}>
                    {ruleItem.CONSTANT_1_REQ &&
                      useGetField(
                        ruleItem.DATA_TYPE_ID_1,
                        "FIELD_CONSTANT_1",
                        ruleItem.FIELD_1_NAME,
                        handleOnChangeFC1
                      )}
                  </Grid>
                  <Grid item xs={ruleItem.CONSTANT_2_REQ ? 6 : 0}>
                    {ruleItem.CONSTANT_2_REQ &&
                      useGetField(
                        ruleItem.DATA_TYPE_ID_1,
                        "FIELD_CONSTANT_2",
                        ruleItem.FIELD_1_NAME,
                        handleOnChangeFC2
                      )}
                  </Grid>
                </Grid>
                <Box style={{ marginTop: "20px" }}>
                  {ruleItem.ADDITIONAL_FIELD && (
                    <FormControl fullWidth>
                      <InputLabel id="field-select-2-label">
                        Choose another field
                      </InputLabel>
                      <Select
                        labelId="field-select-2-label"
                        native
                        onChange={handleFieldSelect2Change}
                        value={ruleItem.FIELD_2_VALUE}
                      >
                        <option aria-label="None" value="" />
                        {fieldList.map((field) => (
                          <option
                            key={field.FIELD_ID}
                            value={`${field.FIELD_ID}*${field.DATA_TYPE_ID}*${field.FIELD_NAME}`}
                          >
                            {field.FIELD_NAME}
                          </option>
                        ))}
                      </Select>
                      {useGetField(
                        ruleItem.DATA_TYPE_ID_1,
                        "FIELD_CONSTANT_2",
                        ruleItem.FIELD_2_NAME,
                        handleOnChangeFC2
                      )}
                    </FormControl>
                  )}
                </Box>
              </Grid>
              <Grid item xs={3.5}>
                <FormControl fullWidth>
                  <InputLabel id="rule-select-label">Choose a rule</InputLabel>
                  <Select
                    disabled={ruleItem.FIELD_1 === ""}
                    required={true}
                    labelId="rule-select-label"
                    native
                    onChange={handleRuleSelectChange}
                    value={ruleItem.SELECT_RULE_VALUE}
                  >
                    <option aria-label="None" value="" />
                    {rulesAvailable.map((rule) => (
                      <option
                        key={rule.VALIDATION_TYPE}
                        value={`${rule.VALIDATION_TYPE}*${rule.RULE_DESCRIPTION}*${rule.FIELD_CONSTANT_1}*${rule.FIELD_CONSTANT_2}*${rule.ADDITIONAL_FIELD}`}
                      >
                        {rule.RULE_DESCRIPTION}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3.5}>
                <TextField
                  required={true}
                  placeholder="Write a message"
                  disabled={
                    ruleItem.FIELD_1 === "" && ruleItem.VALIDATION_TYPE === ""
                  }
                  value={ruleItem.USER_MESSAGE}
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setRuleItem({
                      ...ruleItem,
                      USER_MESSAGE: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={1} justifyContent={"center"} alignItems={"center"}>
                <Button
                  type="submit"
                  style={{
                    width: "100%",
                    height: "60px",
                    padding: 5,
                    backgroundColor: "lightgreen",
                    color: "black",
                  }}
                >
                  {switchAddButtonName}
                </Button>
              </Grid>
              <Grid item xs={1} justifyContent={"center"} alignItems={"center"}>
                <Button
                  style={{
                    width: "100%",
                    height: "60px",
                    padding: 5,
                    backgroundColor: "#E39FF6",
                    color: "black",
                  }}
                  onClick={() => {
                    setRuleItem(ruleItemInitialState);
                    setSwitchAddButtonName("Add");
                    setSwitchClearButtonName("Clear");
                  }}
                >
                  {switchClearButtonName}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Box>
      <Box className="ag-theme-alpine" style={{ height: 290, width: "100%" }}>
        <AgGridReact columnDefs={columnDefs} rowData={rulesEntered} />
      </Box>
      <Box style={{ width: "100%", marginTop: "auto" }}>
        <Grid container spacing={2} justifyContent={"end"} alignItems={"end"}>
          <Button
            style={{
              backgroundColor: "#4682B4",
              color: "white",
              height: "60px",
              width: "80px",
            }}
            onClick={closeModalForRuleValidation}
          >
            Done
          </Button>
        </Grid>
      </Box>
    </>
  );
};

export default RuleModal;
