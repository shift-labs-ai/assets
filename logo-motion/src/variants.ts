export type Variant = {
  name: string;
  face: string;
  shadow: string;
  arrow: string;
};

// Mirrors avatars/generate.sh — face, shadow, arrow.
export const VARIANTS: Variant[] = [
  {name: 'original', face: '#F4B7BC', shadow: '#CB8E97', arrow: '#1A2038'},
  {name: 'midnight', face: '#1A2038', shadow: '#0F1424', arrow: '#F4B7BC'},
  {name: 'eggplant', face: '#31263B', shadow: '#221A2A', arrow: '#F4B7BC'},
  {name: 'ocean', face: '#3B82F6', shadow: '#2563EB', arrow: '#FFFFFF'},
  {name: 'ocean-dark', face: '#1E3A5F', shadow: '#152D4A', arrow: '#60A5FA'},
  {name: 'emerald', face: '#34D399', shadow: '#10B981', arrow: '#064E3B'},
  {name: 'amber', face: '#FBBF24', shadow: '#F59E0B', arrow: '#78350F'},
  {name: 'coral', face: '#FB7185', shadow: '#F43F5E', arrow: '#FFFFFF'},
  {name: 'slate', face: '#64748B', shadow: '#475569', arrow: '#FFFFFF'},
  {name: 'lavender', face: '#A78BFA', shadow: '#8B5CF6', arrow: '#FFFFFF'},
  {name: 'mint', face: '#6EE7B7', shadow: '#34D399', arrow: '#064E3B'},
  {name: 'rose', face: '#FDA4AF', shadow: '#FB7185', arrow: '#881337'},
  {name: 'white', face: '#FFFFFF', shadow: '#E5E7EB', arrow: '#1A2038'},
  {name: 'charcoal', face: '#374151', shadow: '#1F2937', arrow: '#F9FAFB'},
  {name: 'sky', face: '#7DD3FC', shadow: '#38BDF8', arrow: '#0C4A6E'},
  {name: 'peach', face: '#FDBA74', shadow: '#FB923C', arrow: '#7C2D12'},
];

export const ORIGINAL = VARIANTS[0];

export const byName = (...names: string[]): Variant[] =>
  names.map((n) => {
    const v = VARIANTS.find((x) => x.name === n);
    if (!v) throw new Error(`Unknown variant: ${n}`);
    return v;
  });
