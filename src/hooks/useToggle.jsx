import { useState } from 'react';

export default function useToggle() {
  const [toggle, setToggle] = useState(true);
  const [menuToggle, setMenuToggle] = useState(false);

  const handleToggle = () => setToggle((prev) => !prev);
  const hanldeMenuToggle = () => setMenuToggle((prev) => !prev);

  return {
    toggle,
    menuToggle,
    handleToggle,
    hanldeMenuToggle,
  };
}
