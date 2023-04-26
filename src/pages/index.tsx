import { Power3, gsap } from 'gsap'
import { NextPage } from 'next'
import { useCallback, useEffect } from 'react'

const Home: NextPage = () => {
  const animateText = useCallback(() => {
    gsap.fromTo(
      '.text',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: Power3.easeInOut }
    )
  }, [])

  const animateCurtain = useCallback(
    (side: string) => {
      const __class = side === 'left' ? '.curtain-left' : '.curtain-right'

      const timeline = gsap.timeline()

      timeline.to(__class, { display: 'block' })
      timeline.to('.line', { display: 'none' })
      timeline.fromTo(
        __class,
        { x: 0, display: 'none', stagger: 0.1 },
        {
          x: side === 'left' ? '-150%' : '150%',
          display: 'block',
          skewX: 30,
          duration: 2,
          stagger: 0.1,
          delay: 2,
          ease: Power3.easeInOut,
        }
      )

      timeline.then(() => animateText())
    },
    [animateText]
  )

  const animateLine = useCallback(() => {
    const timeline = gsap.timeline()

    timeline.fromTo(
      '.line',
      { height: 0 },
      { height: '50%', duration: 1.4, ease: Power3.easeInOut }
    )
    timeline.fromTo(
      '.line',
      { rotate: 0, translateX: '-50%', translateY: '-50%' },
      {
        rotate: 360,
        translateX: '-50%',
        translateY: '-50%',
        duration: 1.4,
        ease: Power3.easeInOut,
      }
    )
    timeline.fromTo(
      '.line',
      { width: 4 },
      { width: '100%', duration: 1.2, ease: Power3.easeInOut }
    )
    timeline.fromTo(
      '.line',
      { height: '50%' },
      { height: '100%', duration: 1, ease: Power3.easeInOut }
    )

    timeline.then(() => {
      animateCurtain('left')
      animateCurtain('right')
    })
  }, [animateCurtain])

  useEffect(() => {
    animateLine()
  }, [animateLine])

  return (
    <div className="w-full h-full relative">
      <div className="line fixed h-1/2 w-1 bg-zinc-50 left-1/2 top-1/2"></div>
      <div className="curtain-left bg-zinc-50 w-1/2 h-screen fixed z-40 left-0 hidden"></div>
      <div className="curtain-left bg-cyan-500 w-1/2 h-screen fixed z-30 left-0 hidden"></div>
      <div className="curtain-left bg-fuchsia-500 w-1/2 h-screen fixed z-20 left-0 hidden"></div>
      <div className="curtain-left bg-amber-500 w-1/2 h-screen fixed z-10 left-0 hidden"></div>

      <div className="curtain-right bg-zinc-50 w-1/2 h-screen fixed z-40 left-1/2 hidden"></div>
      <div className="curtain-right bg-cyan-500 w-1/2 h-screen fixed z-30 left-1/2 hidden"></div>
      <div className="curtain-right bg-fuchsia-500 w-1/2 h-screen fixed z-20 left-1/2 hidden"></div>
      <div className="curtain-right bg-amber-500 w-1/2 h-screen fixed z-10 left-1/2 hidden"></div>
      <p className="text text-center -skew-x-12 font-black text-7xl fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0">
        🍿⚡🔥🎉
      </p>
    </div>
  )
}

export default Home
