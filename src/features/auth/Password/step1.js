import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "../../../components/Button";
import Password from "../../../components/Password";

export default function Step1({ setPageStep }) {
  return (
    <>
      <p className="description mt-3">
        This password exclusively unlocks your Oslo wallet on this device. Oslo
        does not have the capability to recover this password. Keep it secure
        for personalized access to your wallet.
      </p>
      <div className="px-5 pt-3 oslo-form">
        <Password
          onSubmit={({password}) => setPageStep({page: 2, pass: password})}
          btnLabel={"Create New Wallet"}
        />
      </div>
    </>
  );
}
