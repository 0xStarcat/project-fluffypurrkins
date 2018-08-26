const HoverEffect = {
  blur: 5,
  shadowX: 0,
  shadowY: 0,
  target: null,
  interval: null
}

function startHoverEffect(e) {
  clearInterval(HoverEffect.interval)
  HoverEffect.interval = setInterval(filmEffect, 60)
}

function hoverShadow(e) {
  let target = e.target
  let shadowX = -(e.clientX - (e.target.getBoundingClientRect().left + e.target.getBoundingClientRect().width / 2))
  let shadowY = -(e.clientY - (e.target.getBoundingClientRect().top + e.target.getBoundingClientRect().height / 2))
  HoverEffect.shadowX = shadowX
  HoverEffect.shadowY = shadowY
  HoverEffect.target = target
}

function mirroredHoverShadow(e) {
  let target = e.target
  let shadowX = e.clientX - (e.target.getBoundingClientRect().left + e.target.getBoundingClientRect().width / 2)
  let shadowY = -(e.clientY - (e.target.getBoundingClientRect().top + e.target.getBoundingClientRect().height / 2))
  HoverEffect.shadowX = shadowX
  HoverEffect.shadowY = shadowY
  HoverEffect.target = target
}

function filmEffect() {
  let focusText = Math.floor(Math.random() * 50)
  let min = 4
  let range = 2
  HoverEffect.blur = focusText ? Math.random() * range + min : 1
  HoverEffect.target.style.textShadow = `${HoverEffect.shadowX * 2.5}px ${HoverEffect.shadowY * 2.5}px ${
    HoverEffect.blur
  }px black`
  HoverEffect.target.style.display = 'block'
}

function hideShadow(e) {
  e.target.style.textShadow = ''
  clearInterval(HoverEffect.interval)
}

export { startHoverEffect, hoverShadow, mirroredHoverShadow, hideShadow }
