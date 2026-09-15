/**
 * Clamp a set of scroll-progress stops into the [0,1] range while preserving a
 * non-decreasing order. Motion accelerates scroll-linked transforms with the
 * native ScrollTimeline / Web Animations API, which rejects keyframe offsets
 * outside [0,1] or that decrease. Building input ranges through this helper
 * keeps those optimized animations valid.
 */
export function stops(...values: number[]): number[] {
  const out: number[] = []
  for (let i = 0; i < values.length; i++) {
    let v = Math.min(1, Math.max(0, values[i]))
    if (i > 0 && v < out[i - 1]) v = out[i - 1]
    out.push(v)
  }
  return out
}
