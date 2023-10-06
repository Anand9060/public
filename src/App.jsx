import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/login/Login";
import { Home } from "./pages/home/Home";
import { CreateObject } from "./pages/object/CreateObject";
import { ObjectFields } from "./pages/object/ObjectFields";
import ObjectLists from "./pages/objectlayouts/ObjectLists";
import ObjectPageLayout from "./pages/objectlayouts/ObjectPageLayout";
import CreateLayout from "./pages/createformlayout/CreateLayout";
import SnackbarComp from "./components/SanckBar";
import { EditObjects } from "./pages/object/ObjectEdits";
import MainPage from "./pages/formLayout/MainPage.jsx";
import LayoutList from "./pages/formLayout/LayoutList";
import { useDispatch } from "react-redux";
import { getTextData } from "./services/labelSlice";
import label from "./assets/data/label.json";
import { fetchLanguageApi, fetchIconApi } from "./services/languageApi";
import UserView from "./pages/formLayout/UserView";
import FormDataUpdate from "./pages/searchForm/FormDataUpdate";
import DataEntry from "./pages/formLayout/DataEntry";
import SearchForm from "./pages/searchForm/SearchForm";
import EditData from "./pages/searchForm/EditData";
import Auth from "./pages/login/UseAuth";
import EditObjData from "./pages/searchForm/EditObjData";
import CreateObjData from "./pages/searchForm/CreateObjData";

function App() {
  const datalabels = label.Labels;

  const dispatch = useDispatch();
  // console.log(datalabels);

  const data = "en-IN";

  useEffect(() => {
    fetchLanguageApi({ Language_Code: data }).then((res) => {
      // console.log(res.data);
      dispatch(getTextData(res.data));
    });
    fetchIconApi().then((res) => {
      dispatch(getTextData(res.data));
      // console.log(res.data);
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/login" element={<Login />} />
					<Route path="/home" element={<Home />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create_object" element={<CreateObject />} />
          <Route path="/edit_object" element={<EditObjects />} />
          <Route path="/object_fields" element={<ObjectFields />} />
          <Route path="/createpagelayout" element={<ObjectLists />} />
          <Route path="/objectPageLayout" element={<ObjectPageLayout />} />
          <Route path="/mainlayout" element={<MainPage />} />
          <Route path="/getlayoutlist" element={<LayoutList />} />
          <Route path="/createlayout" element={<CreateLayout />} />
          <Route path="/userview" element={<UserView />} />
          <Route path="/searchform" element={<SearchForm />} />
          <Route path="/formLayoutUpdate" element={<FormDataUpdate />} />
          <Route path="/dataentry" element={<DataEntry />} />
          <Route path="/editData" element={<EditData />} />
          <Route path="/editObjData" element={<EditObjData />} />
          <Route path="/createObjData" element={<CreateObjData />} />
        </Routes>
        <SnackbarComp />
      </BrowserRouter>
    </div>
  );
}

export default App;
