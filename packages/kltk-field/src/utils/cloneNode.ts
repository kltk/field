import React from 'react';

export function cloneNode<P = any>(
  node: React.ReactNode,
  props?: Partial<P> & React.Attributes,
  ...children: React.ReactNode[]
) {
  if (!React.isValidElement(node)) {
    return node ?? null;
  }
  return React.cloneElement(node, props, ...children);
}
