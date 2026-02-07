export const metadata = {
  title: 'Sanity Studio',
  description: 'Content Management Studio',
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <div style={{ margin: 0 }}>{children}</div>
}
