import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const fadeTransition = {
  duration: 0.72,
  ease: [0.16, 1, 0.3, 1],
};

function FadeCarouselImage({ image, className }) {
  if (!image) {
    return null;
  }

  return (
    <AnimatePresence initial={false} mode="sync">
      <motion.img
        key={image.id}
        src={image.src}
        alt={image.alt}
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={fadeTransition}
        style={{
          position: 'absolute',
          top: '-1px',
          left: 0,
          width: '100%',
          height: 'calc(100% + 1px)',
        }}
      />
    </AnimatePresence>
  );
}

export default FadeCarouselImage;
