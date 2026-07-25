/* A photo, or a labelled placeholder until the real one lands.
   To fill a slot, just give the item an `img` (and `alt`) in its data array —
   no markup changes needed. */
/* ratio={null} opts out of aspect-ratio sizing, so the slot can instead be
   flex-sized by its parent (used by the hero mosaic to fit the screen). */
export default function PhotoSlot({ src, alt = "", label = "Photo", ratio = "4 / 5", className = "", rounded = "2px", style }) {
  const base = { ...(ratio ? { aspectRatio: ratio } : null), borderRadius: rounded, ...style };

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full object-cover ${className}`}
        style={base}
      />
    );
  }
  return (
    <div className={`photo-slot w-full ${className}`} style={base}>
      <span>{label}</span>
    </div>
  );
}
