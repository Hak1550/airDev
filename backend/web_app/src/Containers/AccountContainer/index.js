import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserInformation } from "../../Redux/actions/login";
import {
  apiGetUserInformation,
  apiPatchUserInformation,
  resetUserInformationState
} from "../../Redux/actions/user_information";

import AccountPage from "../../Pages/AccountPage";

const AccountContainer = () => {
  const auth = useSelector(state => state.auth);
  const userInformation = useSelector(state => state.userInformation);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.token)
      dispatch(apiGetUserInformation(auth.user_information?.id, auth.token));
  }, []);

  useEffect(() => {
    if (userInformation.success) {
      dispatch(setUserInformation(userInformation.data));
      dispatch(resetUserInformationState());
    }
  }, [userInformation]);

  const onSubmit = data => {
    dispatch(
      apiPatchUserInformation(data, auth.user_information?.id, auth.token)
    );
  };

  return (
    <AccountPage auth={auth} state={userInformation} onSubmit={onSubmit} />
  );
};

export default AccountContainer;
