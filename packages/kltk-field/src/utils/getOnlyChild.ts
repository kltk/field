import React from 'react';

export function getOnlyChild<T>(children: T) {
  const childList = React.Children.toArray(children);
  if (childList.length === 1 && React.isValidElement(childList[0])) {
    return childList[0];
  }
  return null;
}
