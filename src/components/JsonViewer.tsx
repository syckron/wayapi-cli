// wayapi-cli/src/components/JsonViewer.tsx
import React from 'react';
import { Text } from 'ink';
import { JsonValue } from '../types/types.js';

type JsonViewerProps = {
  data: JsonValue;
};

function renderJson(value: JsonValue, indent = 0): React.ReactNode {
  const space = ' '.repeat(indent);

  if (typeof value === 'string') {
    return <Text color="green">"{value}"</Text>;
  }

  if (typeof value === 'number') {
    return <Text color="yellow">{value}</Text>;
  }

  if (typeof value === 'boolean') {
    return <Text color="magenta">{value.toString()}</Text>;
  }

  if (value === null) {
    return <Text color="gray">null</Text>;
  }

  if (Array.isArray(value)) {
    return (
      <>
        <Text>[</Text>
        {"\n"}
        {value.map((item, i) => (
          <Text key={i}>
            {space}  {renderJson(item, indent + 2)}
            {i < value.length - 1 ? ',' : ''}
            {"\n"}
          </Text>
        ))}
        <Text>{space}]</Text>
      </>
    );
  }

  const entries = Object.entries(value);

  return (
    <>
      <Text>{'{'}</Text>
      {"\n"}
      {entries.map(([key, val], i) => (
        <Text key={key}>
          {space}  <Text color="blue">"{key}"</Text>: {renderJson(val, indent + 2)}
          {i < entries.length - 1 ? ',' : ''}
          {"\n"}
        </Text>
      ))}
      <Text>{space}{'}'}</Text>
    </>
  );
}

const JsonViewer = ({ data }: JsonViewerProps) => {
  if (typeof data === 'string') {
    try {
      const parsed = JSON.parse(data);
      return <Text>{renderJson(parsed)}</Text>;
    } catch {
      return <Text color="green">{data}</Text>;
    }
  }

  if (data === null) {
    return <Text color="gray">null</Text>;
  }

  return <Text>{renderJson(data)}</Text>;
};

export default JsonViewer;