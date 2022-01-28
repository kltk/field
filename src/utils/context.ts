import React from 'react';
import { createGroupContext } from "../Group/GroupContext";

export const context = React.createContext(createGroupContext(Object()));
