// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <main className="flex items-center justify-center h-screen w-full">
      <div className="container mx-auto p-2">
        <div className="max-w-lg mx-auto">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
