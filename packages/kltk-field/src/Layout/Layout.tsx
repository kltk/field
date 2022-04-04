import React from 'react';
import { LayoutOptions } from '../types';
import './Layout.sass';

export type LayoutProps = React.PropsWithChildren<LayoutOptions>;

export function Layout(props: LayoutProps) {
  const { label, errors = [], description } = props;
  const { layout = 'vertical', required, colon = !!label, children } = props;
  const layoutClass = layout ? ` kltk-${layout}` : '';
  const fieldClass = `kltk-field${layoutClass}`;
  const requiredClass = required ? ' kltk-required' : '';
  const colonClass = colon ? ' kltk-colon' : '';
  const labelClass = `kltk-label${requiredClass}${colonClass}`;
  const controlClass = `kltk-control`;
  const errorClass = `kltk-error`;
  return (
    <span className={fieldClass}>
      <span className={labelClass}>{label}</span>
      <span className={controlClass}>
        {children}
        {description && <span>{description}</span>}
        {!!errors.length && (
          <span className={errorClass}>
            {errors.map(
              (err) => (err instanceof Error ? err?.message : err) ?? null,
            )}
          </span>
        )}
      </span>
    </span>
  );
}
