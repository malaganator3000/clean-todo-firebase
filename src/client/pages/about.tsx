import React, { useState } from "react";
export interface AboutProps {}

export const About: React.FC<AboutProps> = () => {
  const [count, set] = useState(0);
  return (
    <div>
      About
      <p>You clicked {count} times</p>
      <button onClick={() => set(count + 1)}>+</button>
    </div>
  );
};
