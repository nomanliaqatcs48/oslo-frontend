import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "../../../components/Button";

export default function Step1({ setPageStep }) {
  return (
    <>
      <p className="description mt-3">
        This password exclusively unlocks your Oslo wallet on this device. Oslo
        does not have the capability to recover this password. Keep it secure
        for personalized access to your wallet.
      </p>
      <div className="px-5 pt-3 oslo-form">
        <Form.Label className="content">Create Password</Form.Label>
        <InputGroup className="mb-4">
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            size={"lg"}
            required
          />
          <InputGroup.Text>
            {/* <i className="bi bi-eye"></i> */}
            <i className="bi bi-eye-slash"></i>
          </InputGroup.Text>
        </InputGroup>
        <Form.Label className="content">Confirm Password</Form.Label>
        <InputGroup className="mb-4">
          <Form.Control
            type="password"
            name="password"
            placeholder="Confirm Password"
            size={"lg"}
            required
          />
          <InputGroup.Text>
            <i className="bi bi-eye"></i>
          </InputGroup.Text>
        </InputGroup>
        <div className="d-flex">
          <Form.Check
            type={"checkbox"}
            id={"term-checkbox"}
            label={
              <p className="description">
                I understand that OSLO cannot recover this password for me.{" "}
                <a href="#">Learn more</a>
              </p>
            }
          />
        </div>
        <Button
          label="Create New Wallet"
          className="mt-4 mb-5"
          onClick={() => setPageStep(2)}
        />
      </div>
    </>
  );
}
