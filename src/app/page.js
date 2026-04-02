'use client'

import Hero from '../components/Hero'
import ForWho from '../components/ForWho'
import HowItWorks from '../components/HowItWorks'
import ResultPreview from '../components/ResultPreview'
import TrustBlock from '../components/TrustBlock'
import Testimonials from '../components/Testimonials'
import PersonBlock from '../components/PersonBlock'
import PricingCards from '../components/PricingCards'
import FoerderBlock from '../components/FoerderBlock'
import FAQ from '../components/FAQ'
import FinalCTA from '../components/FinalCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <ForWho />
      <HowItWorks />
      <ResultPreview />
      <TrustBlock />
      <Testimonials />
      <PersonBlock />
      <PricingCards />
      <FoerderBlock />
      <FAQ />
      <FinalCTA />
    </>
  )
}
