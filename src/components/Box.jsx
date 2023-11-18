import React, { useRef, useState, useEffect } from 'react'
import { RigidBody } from '@react-three/rapier'
import { Box, Cylinder } from '@react-three/drei'

export const BoxComponent = ({ color, isDroppingBlock, handleBlockCollided }) => {
    const rigidBodyRef = useRef()
    const position = [0, 6, 0]
    const [rotation, setRotation] = useState(0)


    useEffect(() => {
      if (rigidBodyRef.current) {
        // A one-off "push"
        // rigidBodyRef.current.applyImpulse({ x: 0, y: 10, z: 0 }, true);
  
        // A continuous force
        // rigidBodyRef.current.addForce({ x: 0, y: 10, z: 0 }, true);
  
        // A one-off torque rotation
        // rigidBodyRef.current.applyTorqueImpulse({ x: 0, y: 10, z: 0 }, true);
  
        // A continuous torque
        // rigidBodyRef.current.addTorque({ x: 0, y: 10, z: 0 }, true);
      }
    }, [])


    useEffect(() => {
      const max = -5
      const min = 5
      setRotation(Math.floor(Math.random() * (max - min + 1)) + min)
    }, [rotation, setRotation])

    const ropeElement = (
        <Cylinder scale={[0.05, 5, 0.05]} position={position}>
          <meshStandardMaterial color="lightgray" />
        </Cylinder>
    )

    const boxElement = (
      <Box position-y={3}>
          <meshStandardMaterial color={color} />
      </Box>
    )

    return isDroppingBlock ? (
      <>
        <RigidBody type="fixed" position={position} colliders={false}>
            {ropeElement}
        </RigidBody>
        <RigidBody position={position} onCollisionEnter={handleBlockCollided}>
          {boxElement}
        </RigidBody>
      </>
    ) : (
      <RigidBody type="fixed" position={position} colliders={false} rotation={[rotation, 0, 0]} ref={rigidBodyRef}>
        {ropeElement}
        {boxElement}
      </RigidBody>
    )
}