import React from 'react'
import { RigidBody } from '@react-three/rapier'
import { Box } from '@react-three/drei'

export const Plane = ({ position, color }) => {
  return (
    <RigidBody type="fixed">
      <Box position={position} args={[10, 1, 10]}>
        <meshStandardMaterial color={color} />
      </Box>
    </RigidBody>
  )
}