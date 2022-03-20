import { castType, CastTypeFn } from '../utils/castType';
import { GroupContext } from './types';

export const castContext: CastTypeFn<Partial<GroupContext>> = castType;
