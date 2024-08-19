
const Footer = () => {
  return (
    <footer className="container mx-auto text-black">
  
        <div className="border-t border-slate-400 flex items-center justify-center">
          <p className="text-center text-sm p-2">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
    
    </footer>
  );
};

export default Footer;
