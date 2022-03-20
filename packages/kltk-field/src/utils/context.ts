import React from 'react';
import { GroupContext } from '..';

export const context = React.createContext<GroupContext<any> | null>(null);
