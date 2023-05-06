import { useState } from 'react';

export default function useToggle() {
  const [toggle, setToggle] = useState(true);

  const handleToggle = () => setToggle((prev) => !prev);

  return { toggle, handleToggle };
}
