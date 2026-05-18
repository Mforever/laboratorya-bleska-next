'use client';

import { motion } from 'framer-motion';
import Hero from '@/components/home/Hero';
import Advantages from '@/components/home/Advantages';
import Services from '@/components/home/Services';
import Process from '@/components/home/Process';
import GalleryPreview from '@/components/home/GalleryPreview';
import AdviceCarousel from '@/components/home/AdviceCarousel';
import Reviews from '@/components/home/Reviews';
import FAQ from '@/components/home/FAQ';
import Contacts from '@/components/home/Contacts';

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <Advantages />
      <Services />
      <Process />
      <GalleryPreview />
      <AdviceCarousel />
      <Reviews />
      <FAQ />
      <Contacts />
    </motion.div>
  );
}