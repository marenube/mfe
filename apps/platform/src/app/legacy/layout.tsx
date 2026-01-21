import LegacyMount from './LegacyMount';

export default function LegacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LegacyMount />
      {children}
    </>
  );
}
