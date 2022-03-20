import { Assign } from 'kltk-observable/dist/types';
import React from 'react';
import { Group, GroupProps } from './Group/Group';
import { useGroupContext } from './Group/GroupContext';

export type FormProps<T, O> = Assign<
  React.DOMAttributes<HTMLFormElement>,
  GroupProps<T, {}>
> & { options?: O };

export function Form<T, O>(props: FormProps<T, O>) {
  const { context, initial, value, options, children, ...rest } = props;
  const { onChange, onReset, onInvalid, onSubmit, ...formRest } = rest;
  const groupContext = useGroupContext(context);
  const groupProps = { initial, value, onChange, onInvalid, onSubmit };
  const handleReset = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();
      groupContext.reset();
      onReset?.(event);
    },
    [groupContext, onReset],
  );
  const handleSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();
      groupContext.submit();
    },
    [groupContext],
  );
  return (
    <form onReset={handleReset} onSubmit={handleSubmit} {...formRest}>
      <Group context={groupContext} {...groupProps} {...options}>
        {children}
      </Group>
    </form>
  );
}
