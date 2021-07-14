import React from 'react';
import { createGroupContext } from "../GroupContext";

export const context = React.createContext(createGroupContext(Object()));
