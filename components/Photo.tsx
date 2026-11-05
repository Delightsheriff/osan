"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { pexelsSrc, type Photo as PhotoData } from "@/content/series";

type Props = {
  photo: PhotoData;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Fill the parent box instead of keeping the photo's own aspect ratio. */
  fill?: boolean;
  /** Clip-path wipe in when scrolled into view. */
  reveal?: boolean;
};

export default function Photo({
  photo,
  alt,
  sizes,
  className = "",
  priority,
  fill,
  reveal = true,
}: Props) {
  const image = (
    <Image
      src={pexelsSrc(photo.id)}
      alt={alt}
      sizes={sizes}
      priority={priority}
      placeholder={photo.blur as `data:image/${string}`}
      {...(fill
        ? { fill: true, className: "object-cover" }
        : { width: photo.w * 100, height: photo.h * 100, className: "h-auto w-full" })}
    />
  );

  if (!reveal) {
    return <div className={`relative overflow-hidden ${className}`}>{image}</div>;
  }

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ clipPath: "inset(18% 8% 18% 8%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className={fill ? "absolute inset-0" : undefined}
        initial={{ scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {image}
      </motion.div>
    </motion.div>
  );
}
