import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Calendory() {
  return (
    <section>
      <h1>Calendory</h1>
      <Outlet />
    </section>
  );
}
