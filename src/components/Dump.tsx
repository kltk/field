import React from 'react';

interface DumpProps {
  value: any;
}

function Dump(props: DumpProps) {
  const { value } = props;
  return <code>{JSON.stringify(value)}</code>;
}

export default Dump;
