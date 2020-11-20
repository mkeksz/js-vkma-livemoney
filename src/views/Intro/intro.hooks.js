import {useMemo} from 'react'


export function useScheme() {
  const scheme = document.body.attributes.getNamedItem('scheme')
  return useMemo(() => {
    const value = scheme ? scheme.value : null
    return value === 'bright_light' || value === 'client_light'
      ? 'light'
      : 'dark'
  }, [scheme])
}

export function useLastSlide(slide, maxSlide) {
  return useMemo(() => {
    return slide === maxSlide
  }, [slide, maxSlide])
}
