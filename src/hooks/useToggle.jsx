import { useState } from 'react';

export default function useToggle() {
  const [toggle, setToggle] = useState(true);
  const [menuToggle, setMenuToggle] = useState(false);
  const [addEventToggle, setAddEventToggle] = useState(false);
  const [editEventToggle, setEditEventToggle] = useState(false);

  const handleToggle = () => setToggle((prev) => !prev);
  const hanldeMenuToggle = () => setMenuToggle((prev) => !prev);
  const handleAddEventToggle = () => setAddEventToggle((prev) => !prev);
  const handleEditEventToggle = () => setEditEventToggle((prev) => !prev);

  return {
    toggle,
    menuToggle,
    addEventToggle,
    editEventToggle,
    handleToggle,
    hanldeMenuToggle,
    handleAddEventToggle,
    handleEditEventToggle,
  };
}
