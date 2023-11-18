import { Canvas } from "@react-three/fiber"
import React, { useState, Suspense, useEffect } from 'react'
import { Html, OrbitControls } from '@react-three/drei'

import { BoxComponent } from './components/Box.jsx'
import { Plane } from './components/Plane.jsx'
import { Physics } from "@react-three/rapier"

const colors = ['#EC8F5E', '#F3B664', '#F1EB90', '#9FBB73', '#176B87', '#64CCC5', '#DAFFFB']

export const App = () => {
  const [isDroppingBlock, setIsDroppingBlock] = useState(false)

  const handleDropBlock = () => setIsDroppingBlock(true)
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
  }

  const handleBlockCollided = () => {
    setTimeout(() => {
      setIsDroppingBlock(false)
    }, 2000)
  }

  const newBlock = { isDroppingBlock, handleBlockCollided, color: getRandomColor() }
  const [blocks, setBlocks] = useState([newBlock])

  useEffect(() => {
    isDroppingBlock && setBlocks([...blocks, newBlock])
  }, [isDroppingBlock])

  // const createNewBlock = () => {
  //   const total = blocks.length
  //   const color = colors[getRandomInt(6)]
  //   let newBlockes = blocks.map((props) => ({ ...props, move: false }))
  //   newBlockes.push({ position: [getRandomInt(3), total * 0.5 - 3, 0], color: color, move: true })
  //   setBlocks([...newBlockes])
  // }

  return (
    <Canvas camera={{ position: [10, 10, 10], fov: 70 }}>
        <color attach="background" args={['lightblue']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[-10, 10, 0]} intensity={0.4} />
        <Suspense>
          <Physics>
            <Plane position={[0, 0, 0]} color="#9FBB73" />
            {blocks.map((block, index) => {
              const isNewestBlock = index === 0
              const shouldDisplayBlock = !isNewestBlock || !isDroppingBlock
              return shouldDisplayBlock && (<BoxComponent key={index} {...block} />)}
            )}
          </Physics>
        </Suspense>
        <OrbitControls />
        <Html class="main">
          <button disabled={isDroppingBlock} onClick={handleDropBlock} className="content">DROP</button>
        </Html>  
    </Canvas>
  )
}
