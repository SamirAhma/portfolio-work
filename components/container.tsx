type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return <div className="container md:mx-auto md:px-5 md:py-5">{children}</div>;
};

export default Container;
