import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
// import SpotForm from "./components/SpotsForm";
import MainPage from "./components/allSpots";
import IndividualSpot from "./components/IndividualSpot/IndividualSpot";
import UserProfilePage from "./components/UserProfile/UserProfilePage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/user/:id">
            <UserProfilePage/>
          </Route>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route path="/spot/:id">
            <IndividualSpot/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
