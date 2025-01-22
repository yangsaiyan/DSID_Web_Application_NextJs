import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to Our Website</h1>
      <p className="text-lg mb-4">
        This is a modern website built with Next.js. We provide excellent services
        and solutions for our customers.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="p-6 border rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">Service 1</h2>
          <p>Description of our first amazing service offering.</p>
        </div>
        <div className="p-6 border rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">Service 2</h2>
          <p>Description of our second amazing service offering.</p>
        </div>
        <div className="p-6 border rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">Service 3</h2>
          <p>Description of our third amazing service offering.</p>
        </div>
      </div>
    </main>
  );
}
