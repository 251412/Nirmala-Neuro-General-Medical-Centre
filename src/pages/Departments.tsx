import React from 'react';
import SpecializationServices from './SpecializationServices';

/**
 * Backward compatibility wrapper for legacy /departments route.
 * Renders the new Specialization & Services page directly.
 */
export default function Departments() {
  return <SpecializationServices />;
}
