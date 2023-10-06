import React, { useCallback, useEffect, useState } from "react";
import Header from "../../components/Header";
import SearchFieldGen from "./SearchFieldGen";
import { useLocation } from "react-router-dom";
import {
  fetchObjectFieldList,
  getLookUpOptionList,
} from "../../services/objectApi";
import { CircularProgress } from "@mui/material";
import Footer from "../../components/Footer";

const SearchForm = () => {
  const location = useLocation();
  const OBJ_ID = location.state.OBJ_ID;
  const [fieldListJSON, setFieldListJSON] = useState([]);

  useEffect(() => {
    console.log(OBJ_ID, "-----------------");

    const getFieldListJSON = async () => {
      const data = {
        OBJ_ID: OBJ_ID,
      };
      const res = await fetchObjectFieldList(data);
      const list = res.data;

      console.log(list);

      const fetchOptionsForDynamicLookup = async (ele) => {
        const res = await getLookUpOptionList({ FIELD_ID: ele.FIELD_ID });
        ele.OPTIONS = res.data;
      };

      for (const field of list) {
        if (
          field.DATA_TYPE === "Dynamic Lookup" ||
          field.DATA_TYPE === "Dynamic Lookup Multiple Choice"
        ) {
          await fetchOptionsForDynamicLookup(field);
        }
      }

      setFieldListJSON(list);
    };

    getFieldListJSON();
  }, [OBJ_ID]);

  const getLoading = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  };

  return (
    <container maxWidth="xl">
      <Header />
      <div style={{ padding: "10px" }}>
        {fieldListJSON.length !== 0 ? (
          <SearchFieldGen fieldList={fieldListJSON} OBJ_ID={OBJ_ID} />
        ) : (
          getLoading()
        )}
      </div>
      <Footer />
    </container>
  );
};

export default SearchForm;
