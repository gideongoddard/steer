'use client'

import { useEffect } from 'react'
import styles from './landing.module.css'

export default function LandingScrollReveal() {
  useEffect(() => {
    const bar = document.getElementById('landing-bar')
    const onScroll = () => {
      bar?.classList[window.scrollY > 8 ? 'add' : 'remove'](styles.scrolled)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add(styles.in)
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })

    document.querySelectorAll(`.${styles.reveal}:not(.${styles.in})`).forEach(el => io.observe(el))

    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  return null
}
