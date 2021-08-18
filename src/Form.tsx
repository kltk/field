import { Assign } from 'kltk-observable/dist/types';
import React from 'react';
import { Group, GroupProps } from './Group';
import { useGroupContext } from './GroupContext';

export type FormProps<T> = Assign<
  React.DOMAttributes<HTMLFormElement>,
  GroupProps<T>
>;

export function Form<T>(props: FormProps<T>) {
  const { context, initial, value, disabled, children, ...rest } = props;
  const { onChange, onReset, onInvalid, onSubmit, ...formRest } = rest;
  const groupContext = useGroupContext(context);
  const groupProps = { initial, value, disabled, onChange, onInvalid, onSubmit };
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
      <Group context={groupContext} {...groupProps}>
        {children}
      </Group>
    </form>
  );
}
