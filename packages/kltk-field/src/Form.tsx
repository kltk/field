import React from 'react';
import { Group, GroupProps } from './Group/Group';
import { useGroupContext } from './Group/GroupContext';

export type FormProps<T, O> = GroupProps<T, O> & {
  formProps?: React.DOMAttributes<HTMLFormElement>;
  onReset?: React.FormEventHandler<HTMLFormElement>;
};

export function Form<T, O>(props: FormProps<T, O>) {
  const { context, formProps, onReset, ...groupProps } = props;
  const groupContext = useGroupContext(context);
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
    <form onReset={handleReset} onSubmit={handleSubmit} {...formProps}>
      <Group {...(groupProps as GroupProps<T, O>)} context={groupContext} />
    </form>
  );
}
