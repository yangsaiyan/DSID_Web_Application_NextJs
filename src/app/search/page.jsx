

const Navbar = dynamic(() => import("../../components/navbar/Navbar"), {
  ssr: false,
});

export default function Search() {
  return (
    <>
    <Navbar/>
    <div>
      this is a search page
    </div>
    </>
  );
}