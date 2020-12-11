import React, { Component } from "react";
import PleaseSignIn from '../components/PleaseSignIn';
import Permissions from '../components/Permissions'

const permissions = (props) => {
  return (
      <PleaseSignIn>
          <Permissions />
      </PleaseSignIn>
  );
};

export default permissions;