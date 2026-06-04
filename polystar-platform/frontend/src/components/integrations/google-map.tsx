export function GoogleMap({ query = "POLYSTAR Nanotech Ltd Kigali Rwanda" }: { query?: string }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) return null;

  const src = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(query)}`;

  return (
    <iframe
      title="POLYSTAR Nanotech Ltd location"
      src={src}
      className="h-80 w-full rounded-lg border"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
