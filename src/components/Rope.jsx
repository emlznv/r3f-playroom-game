
import React from "react"
import { useFrame } from "@react-three/fiber"
import { Sphere, Box } from "@react-three/drei"
import {
  RigidBody,
  useSphericalJoint,
  useRevoluteJoint
} from "@react-three/rapier"
import { forwardRef, useRef, createRef } from "react"
import { Quaternion } from "three"

const RopeSegment = forwardRef(({ position, component, type }, ref) => {
  return  (
    <RigidBody colliders="ball" ref={ref} type={type} position={position}>
      {component}
    </RigidBody>
  )
})
  
const RopeJoint = ({ a, b }) => {
  useSphericalJoint(a, b, [
    [-0.5, 0, 0],
    [0.5, 0, 0]
  ])
  return null
}

const RopeBoxJoint = ({ a, b }) => {
  useRevoluteJoint(a, b, [
    // Position of the joint in bodyA's local space
    [0, 0, 0],
    // Position of the joint in bodyB's local space
    [0, 0, 0],
    // Axis of the joint, expressed in the local-space of
    // the rigid-bodies it is attached to. Cannot be [0,0,0].
    [0, 1, 0]
  ])
  return null
}
  

export const Rope = ({ length }) => {
  const refs = useRef(
    Array.from({ length }).map(() => createRef())
  )

  useFrame(() => {
    // Change mid value to: Math.sin(now / 800) * 6 for more unpredictable rotation
    // const now = performance.now()
    refs.current[0].current?.setNextKinematicRotation(
      new Quaternion(0, 0, 0)
    )
  })

  return (
    <group>
      {refs.current.map((ref, i) => (
        <RopeSegment
          ref={ref}
          key={i}
          position={[i * 1, 0, 0]} // Change mid value for height of rope
          component={
            i === refs.current.length - 1 ? (
              <Box>
                <meshStandardMaterial />
              </Box>
            ) : (
              <Sphere args={[0.3]}>
                <meshStandardMaterial color="springgreen" />
              </Sphere>
            )
          }
          type={i === 0 ? "kinematicPosition" : "dynamic"}
        />
      ))}
      {/**
       * Multiple joints can be initiated dynamically by
       * mapping out wrapped components containing the hooks
       */}
      {refs.current.map((ref, i) => {
        const isLastRopeElement = i === refs.current.length - 1
        if (i > 0) {
          return isLastRopeElement ? <RopeBoxJoint a={refs.current[i]} b={refs.current[i - 1]} key={i}/>
            : <RopeJoint a={refs.current[i]} b={refs.current[i - 1]} key={i}/>
        }
      })}
    </group>
  )
}


// Previous and working:

// const RopeSegment = forwardRef(({ position, component, type, isBox }, ref) => {
//     return isBox ?
//       (
//         <RigidBody colliders="" ref={ref} position={position}>
//           {component}
//         </RigidBody>
//       )
//       : (
//         <RigidBody colliders="ball" ref={ref} type={type} position={position}>
//           {component}
//         </RigidBody>
//       )
//   })

// <Box type="fixed" colliders={false}>
//   <meshStandardMaterial />
// </Box>
