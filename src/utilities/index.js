import ReactGA from 'react-ga'

export const pathify = string => {
  return string
    .toLowerCase()
    .replace(/[^A-Za-z0-9\s]/gi, '')
    .replace(/\s/gi, '-')
}

export const trackProjectOpen = location => {
  if (location.hash && (location.pathname === '/work' || location.pathname === '/projects')) {
    // track project clicks
    ReactGA.event({
      category: location.pathname,
      action: 'Open list item',
      label: location.hash
    })
  } else {
    return false
  }
}
