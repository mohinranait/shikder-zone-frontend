import MainLayoutComponent from "@/components/shared/MainLayoutComponent";

type Props = {
  children: React.ReactNode;
};
const MainLayout = ({ children }: Props) => {
  return (
    <>
      <MainLayoutComponent childComponent={children} />
    </>
  );
};

export default MainLayout;
