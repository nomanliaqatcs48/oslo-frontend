import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Text from "../../components/Text";
import Button from "../../components/Button";
import Success from "./success";
import OsloBtn from "./osloBtn";

export default function SendTransaction() {
  const [success, setSuccess] = useState(false);
  const [activeBtn, setActiveBtn] = useState("send");
  const lableInput = ({ label, name, value, placeholder, type, options }) => {
    return (
      <div className="mt-3 oslo-form">
        <Text label={label} size={16} weight={600} className="mb-1" />
        {type === "text" && (
          <Form.Control
            type={type ?? "text"}
            name={name}
            placeholder={placeholder}
            size={"md"}
            required
          />
        )}
        {type === "select" && (
          <Form.Select>
            <option>{placeholder}</option>
          </Form.Select>
        )}
      </div>
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="m-auto col-12 col-md-9 col-lg-5">
          {success ? (
            <Success setSuccess={() => setSuccess(!success)} />
          ) : (
            <>
              <div className="text-center mb-4">
                <Text label="Send & Receive" size={24} weight={700} />
              </div>
              <div className="total-oslo mt-2">
                <Text label="OSLO 200,000" size={38} weight={600} />
              </div>
              <div className="oslo-card mt-3">
                <OsloBtn activeBtn={activeBtn} setActiveBtn={btn => setActiveBtn(btn)} />
                <div className="mt-4 mb-2">
                  {lableInput({
                    label: "Send from",
                    name: "send_from",
                    value: "",
                    placeholder: "Select Wallet",
                    type: "select",
                    options: [],
                  })}
                  {lableInput({
                    label: "Send To",
                    name: "send_to",
                    value: "",
                    placeholder: "Enter public address (0x) or ENS name",
                    type: "text",
                  })}
                  {lableInput({
                    label: "Asset",
                    name: "asset",
                    value: "",
                    placeholder: "Select Asset",
                    type: "select",
                    options: [],
                  })}
                  {lableInput({
                    label: "Amount",
                    name: "amount",
                    value: "",
                    placeholder: "0.00",
                    type: "text",
                  })}
                </div>
                <Button
                  label="Send"
                  onClick={() => setSuccess(!success)}
                  className="mt-4"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
