import LayoutDashboard from "@/components/dashboardLayout/LayoutDashboard";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutDashboard>
      {children}
    </LayoutDashboard>
  );
}