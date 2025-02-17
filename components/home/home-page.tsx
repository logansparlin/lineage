export interface HomePageProps {
  title: string
}

export const HomePage = (props: HomePageProps) => {
  if (!props) return null

  const { title } = props

  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

