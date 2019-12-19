import React, { useState, useRef } from "react"
import { Canvas, extend, useThree, useRender } from "react-three-fiber"
import { useSpring, animated } from "react-spring/three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
// import { Link } from "gatsby"

// import Layout from "../components/layout"
// import Image from "../components/image"
// import SEO from "../components/seo"
import "./style.css"

extend({ OrbitControls })

const Box = () => {
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(false)

  const props = useSpring({
    scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
    color: hovered ? "palevioletred" : "gray",
  })

  return (
    <animated.mesh
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

const Controls = () => {
  const orbitRef = useRef()
  const { camera, gl } = useThree()
  useRender(() => {
    orbitRef.current.update()
  })
  return <orbitControls ref={orbitRef} args={[camera, gl.domElement]} />
}

const IndexPage = () => (
  <Canvas style={{ height: "100vh" }}>
    <Controls />
    <Box />
  </Canvas>
)

export default IndexPage
