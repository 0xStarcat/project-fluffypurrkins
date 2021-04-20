import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import selfie from '@images/selfie.jpg'
import ReactGA from 'react-ga'

import { asciiText } from '@home/AsciiText.react'

import './style.scss'

let animationTimeout = null
const ImageFace = props => {
  const [dragging, setDragging] = useState(false)
  const [isAnimating, setAnimating] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: null, y: null })
  const imageRef = useRef(null)

  useEffect(() => {
    setAnimating(true)
    return clearTimeout(animationTimeout)
  }, [])

  useEffect(
    () => {
      animationTimeout = setTimeout(animate, 1000)
      setTimeout(animate, 3000) // initial delay before starting.
    },
    [isAnimating]
  )

  const updateMousePosition = ev => {
    setMousePosition({ x: ev.clientX, y: ev.clientY })
  }

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition)

    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [])

  const handleMouseDown = e => {
    setAnimating(false)
    clearTimeout(animationTimeout)
    setDragging(true)

    ReactGA.event({
      category: '/about',
      action: 'Click',
      label: 'ImageFace'
    })
  }

  const handleMouseUp = e => {
    setDragging(false)
  }

  const drag = () => {
    if (!imageRef.current) return
    const containerHeight = imageRef.current.parentElement.offsetHeight
    const imageHeight = imageRef.current.offsetHeight
    const imageY = imageRef.current.getBoundingClientRect().top
    const cursorY = mousePosition.y

    const cursorPositionDownImage = (cursorY - imageY) / containerHeight
    imageRef.current.style.transition = 'none'
    imageRef.current.style.height = `${cursorPositionDownImage * 101}%` // add an extra 1% to ensure events fire
    if (cursorY > imageY + imageHeight + 100 || imageHeight > containerHeight + 100) {
      setDragging(false) // safety check to stop.
    } else if (cursorY < imageY) {
      setDragging(false) // safety check to stop.
    }
  }

  const animate = () => {
    if (!isAnimating) return clearTimeout(animationTimeout)
    if (dragging) return clearTimeout(animationTimeout)
    if (!imageRef) return clearTimeout(animationTimeout)
    clearTimeout(animationTimeout)
    let heightFloat = parseFloat(imageRef.current.style.height.split('%')[0])
    // add delay for 3s at start
    if (heightFloat === 0) {
      heightFloat = 0.001
      imageRef.current.style.height = `${heightFloat}%`

      clearTimeout(animationTimeout)
      animationTimeout = setTimeout(animate, 5000)
    } else if (heightFloat > 100) {
      clearTimeout(animationTimeout)
      animationTimeout = setTimeout(() => {
        heightFloat = 0
        imageRef.current.style.transition = 'height 1s ease-in'
        imageRef.current.style.height = `${heightFloat}%`
        animate()
      }, 3000)
    } else {
      heightFloat += 15
      imageRef.current.style.transition = 'height 1s linear'
      animationTimeout = setTimeout(animate, 1000)
    }

    imageRef.current.style.height = `${heightFloat}%`
  }

  if (dragging) {
    drag()
  }

  return (
    <div aria-hidden="true" className="image-face">
      <pre aria-hidden="true">
        <code draggable="false" aria-hidden="true">
          <div
            ref={imageRef}
            draggable="false"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            aria-hidden="true"
            className="image"
            style={{ height: '40%', maxHeight: '98%', backgroundImage: `url(${selfie})` }}
          />
          {asciiText}
        </code>
      </pre>
    </div>
  )
}

ImageFace.propTypes = {
  imageRef: PropTypes.object
}
ImageFace.defaultProps = {}

export default ImageFace
