import React from 'react';
import Button from "../Button";

export const AddNewAddressBtn = ({ openModal, className, screen }) => (
    <div style={{ width: 150, marginInline: screen === "mobile" ? "1rem" :  "1.5rem 2rem" }} className={className}>
      <Button label={"+ New Account"} onClick={openModal} type="button" />
    </div>
);