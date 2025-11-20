import React, { useState } from "react";

export interface WithCounterProps {
  counter: number;
  increment: () => void;
  decrement: () => void;
}

const withCounter = <P extends WithCounterProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  const WithCounterComponent = (props: Omit<P, keyof WithCounterProps>) => {
    const [counter, setCounter] = useState<number>(1);

    const increment = () => {
      if (counter < 20) setCounter((prev) => prev + 1);
    };

    const decrement = () => {
      if (counter > 1) setCounter((prev) => prev - 1);
    };

    return (
      <WrappedComponent
        {...(props as P)}
        counter={counter}
        increment={increment}
        decrement={decrement}
      />
    );
  };

  WithCounterComponent.displayName = `WithCounter(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithCounterComponent;
};

export default withCounter;
