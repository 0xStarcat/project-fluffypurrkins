function onMobileSize() {
  return window.innerWidth < 768 || screen.width < 768
}

function onDesktopSize() {
  return window.innerWidth > 768 && screen.width > 768
}

function onDesktop() {
  return screen.width > 1080
}

export { onMobileSize, onDesktopSize, onDesktop }
