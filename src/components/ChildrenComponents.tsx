import React, { FunctionComponent } from 'react';
import RandomNumberVisualizer from 'components/RandomNumberVisualizer';
import NameVisualizer from './NameVisualizer';

const ChildrenComponents: FunctionComponent = () => {
  return (
    <>
      <RandomNumberVisualizer />
      <NameVisualizer />
    </>
  );
}

export default ChildrenComponents;