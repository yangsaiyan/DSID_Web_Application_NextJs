export default function Search() {
    return (
      <div className="min-h-screen p-8">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <div className="max-w-3xl">
          <p className="text-lg mb-4">
            We are a passionate team dedicated to delivering exceptional solutions.
            With years of experience in the industry, we strive to exceed our
            clients' expectations.
          </p>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="mb-4">
              To provide innovative solutions that help our clients succeed in their
              endeavors while maintaining the highest standards of quality and
              service.
            </p>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border rounded-lg">
                <h3 className="text-xl font-semibold">John Doe</h3>
                <p className="text-gray-600">CEO & Founder</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="text-xl font-semibold">Jane Smith</h3>
                <p className="text-gray-600">CTO</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }