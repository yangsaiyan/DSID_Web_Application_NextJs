

const Navbar = dynamic(() => import("../../components/navbar/Navbar"), {
  ssr: false,
});
export default function Homepage() {
    return (
      <div>
        this is a homepage
      </div>
    );
  }