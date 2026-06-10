import Link from 'next/link'
import styles from './landing.module.css'
import LandingScrollReveal from './LandingScrollReveal'

export default function LandingPage() {
  return (
    <div className={styles.landing}>
      <LandingScrollReveal />

      {/* Header */}
      <header className={styles.bar} id="landing-bar">
        <div className={`${styles.wrap} ${styles.barInner}`}>
          <Link href="/" className={styles.wordmark} aria-label="Steer home">
            steer<span className={styles.dot}>.</span>
          </Link>
          <nav className={styles.barRight}>
            <Link href="/signin" className={`${styles.btn} ${styles.btnText} ${styles.hideSm}`}>Sign in</Link>
            <Link href="/signup" className={`${styles.btn} ${styles.btnPrimary}`}>Create account</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={`${styles.wrap} ${styles.heroGrid}`}>
          <div>
            <span className={`${styles.eyebrow} ${styles.reveal} ${styles.in}`}>
              <span className={styles.pip} /> Gift wish lists
            </span>
            <h1 className={`${styles.display} ${styles.reveal} ${styles.in}`}>
              One list. One link.<br /><em>No dud gifts.</em>
            </h1>
            <p className={`${styles.lede} ${styles.reveal} ${styles.in} ${styles.d1}`}>
              Steer is the gift wishlist for birthdays, Christmas and more. Make your list, share a single link, and let everyone claim what they&apos;re giving — privately, so nothing gets bought twice and nothing gets spoiled.
            </p>
            <div className={`${styles.heroCta} ${styles.reveal} ${styles.in} ${styles.d2}`}>
              <Link href="/signup" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`}>Create your list</Link>
              <Link href="/signin" className={`${styles.btn} ${styles.btnGhost} ${styles.btnLg}`}>Sign in</Link>
            </div>
            <p className={`${styles.heroNote} ${styles.reveal} ${styles.in} ${styles.d2}`}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Free to start · no app to install · share with anyone
            </p>
          </div>

          {/* Product preview */}
          <div className={`${styles.preview} ${styles.reveal} ${styles.in} ${styles.d2}`}>
            <div className={styles.floatChip}>
              <span className={styles.pip} /> Emma can&apos;t see who claimed
            </div>
            <div className={styles.previewCard}>
              <div className={styles.pcHead}>
                <div className={styles.pcAvatar}>ER</div>
                <div className={styles.pcHeadtext}>
                  <div className={styles.pcTitle}>Emma&apos;s Birthday</div>
                  <div className={styles.pcSub}>from Emma Rey · 7 gifts</div>
                </div>
              </div>

              <div className={styles.pcItem}>
                <div className={styles.body}>
                  <span className={styles.nm}>Fellow Stagg pour-over kettle</span>
                  <span className={styles.lk}>
                    fellowproducts.com
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
                <span className={styles.pcClaim}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Claim
                </span>
              </div>

              <div className={`${styles.pcItem} ${styles.mine}`}>
                <div className={styles.pcCheck}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className={styles.body}>
                  <span className={styles.nm}>Aesop Resurrection hand balm</span>
                  <span className={styles.pcGiving}>You&apos;re giving this</span>
                </div>
              </div>

              <div className={`${styles.pcItem} ${styles.taken}`}>
                <div className={styles.body}>
                  <span className={styles.nm}>Merino beanie, oatmeal</span>
                </div>
                <span className={styles.pcBadge}>Claimed</span>
              </div>

              <div className={styles.pcFoot}>
                <span className={styles.lock}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="5" y="11" width="14" height="9" rx="2.2" stroke="currentColor" strokeWidth="1.7" />
                    <path d="M8 11V8a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  </svg>
                </span>
                Claims stay private — the owner never sees who&apos;s giving what.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className={styles.band}>
        <div className={`${styles.wrap} ${styles.secPad}`}>
          <div className={`${styles.secHead} ${styles.reveal}`}>
            <div className={styles.secEyebrow}>How it works</div>
            <h2 className={styles.secTitle}>Three steps to a <em>better</em> gift exchange.</h2>
          </div>
          <div className={styles.steps}>
            <div className={`${styles.step} ${styles.reveal}`}>
              <div className={styles.stepN}>01</div>
              <h3>Make your list</h3>
              <p>Add anything you&apos;d love, with a link so people know exactly what to get. Edit it any time — your list is always up to date.</p>
            </div>
            <div className={`${styles.step} ${styles.reveal} ${styles.d1}`}>
              <div className={styles.stepN}>02</div>
              <h3>Share one link</h3>
              <p>Send the same link to family and friends. No apps to download, and they can preview your list before they create an account.</p>
            </div>
            <div className={`${styles.step} ${styles.reveal} ${styles.d2}`}>
              <div className={styles.stepN}>03</div>
              <h3>They claim, you stay surprised</h3>
              <p>Guests quietly mark what they&apos;re giving, so nobody buys the same thing twice — and you never see who claimed what.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy feature */}
      <section>
        <div className={`${styles.wrap} ${styles.secPad}`}>
          <div className={styles.featureGrid}>
            <div className={styles.reveal}>
              <div className={styles.secEyebrow}>The surprise stays intact</div>
              <h2 className={styles.secTitle}>Claiming is <em>private</em> — by design.</h2>
              <p className={styles.secLede}>Other guests can see what&apos;s already taken, so there are no duplicates. But the list owner never sees who claimed what — or even that anything was claimed at all.</p>
              <ul className={styles.featureList}>
                <li>
                  <span className={styles.tick}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span><b>No duplicate gifts.</b> Guests see what&apos;s already claimed before they buy.</span>
                </li>
                <li>
                  <span className={styles.tick}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span><b>No spoilers.</b> The owner&apos;s view never reveals who&apos;s giving what.</span>
                </li>
                <li>
                  <span className={styles.tick}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span><b>No pressure.</b> Claim, change your mind, and release it for someone else.</span>
                </li>
              </ul>
            </div>
            <div className={`${styles.featureVisual} ${styles.reveal} ${styles.d1}`}>
              <div className={`${styles.ring} ${styles.r1}`} />
              <div className={`${styles.ring} ${styles.r2}`} />
              <div className={`${styles.ring} ${styles.r3}`} />
              <div className={styles.lockmark}>
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="4" y="10.5" width="16" height="10" rx="2.4" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M7.5 10.5V7.5a4.5 4.5 0 019 0v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className={styles.band}>
        <div className={`${styles.wrap} ${styles.secPad} ${styles.ctaBand}`}>
          <div className={styles.reveal}>
            <div className={styles.secEyebrow}>Get started</div>
            <h2 className={styles.secTitle} style={{ maxWidth: '18em' }}>Start your wishlist in a minute.</h2>
            <p className={styles.secLede}>Make your list, share the link, and let the gifts sort themselves out.</p>
            <div className={styles.ctaActions}>
              <Link href="/signup" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`}>Create your list</Link>
              <Link href="/signin" className={`${styles.btn} ${styles.btnGhost} ${styles.btnLg}`}>Sign in</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={`${styles.wrap} ${styles.footInner}`}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Link href="/" className={styles.wordmark} style={{ fontSize: 21 }}>
              steer<span className={styles.dot}>.</span>
            </Link>
            <span className={styles.footCopy}>© 2026 Steer</span>
          </div>
          <nav className={styles.footLinks}>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/signin">Sign in</Link>
            <Link href="/signup">Create account</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
