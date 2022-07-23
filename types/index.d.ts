import React from 'react';
declare module '*.svg' {
  const ReactComponent: React.StatelessComponent<React.SVGAttributes<SVGElement>>;
  export { ReactComponent };
}
