import React, { useState, useRef } from "react"
import { Canvas, useRender } from "react-three-fiber"
import { useSpring, animated } from "react-spring/three"
// import { Link } from "gatsby"

// import Layout from "../components/layout"
// import Image from "../components/image"
// import SEO from "../components/seo"
import "./style.css"

const Box = () => {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(false)

  const props = useSpring({
    scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
    color: hovered ? "gray" : "palevioletred",
  })

  useRender(() => {
    meshRef.current.rotation.y += 0.02
  })
  return (
    <animated.mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setActive(!active)}
      scale={props.scale}
    >
      <boxBufferGeometry attach="geometry" args={[2, 2, 2]} />
      <animated.meshBasicMaterial attach="material" color={props.color} />
    </animated.mesh>
  )
}

const IndexPage = () => (
  <Canvas>
    <Box />
  </Canvas>
)

export default IndexPage
