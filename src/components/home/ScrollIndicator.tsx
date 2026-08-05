'use client';

import { motion } from 'motion/react';

export default function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.6 }}
    >
      <motion.div
        className="border-foreground/20 flex h-8 w-5 items-start justify-center rounded-full border pt-2"
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
        }}
      >
        <motion.div
          className="bg-foreground h-1.5 w-1 rounded-full"
          animate={{
            y: [0, 14, 0],
            opacity: [1, 0, 0],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: 'linear',
            times: [0, 0.8, 1],
          }}
        />
      </motion.div>
    </motion.div>
  );
}
