import React from 'react';
import { GroupContext } from '../Group/types';

export const context = React.createContext<GroupContext<any, any> | null>(null);
