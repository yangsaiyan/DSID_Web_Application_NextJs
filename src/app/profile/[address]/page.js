"use client";
import { useEffect, useState } from "react";
import { getStudent } from "hooks/GunDB";

export default function Profile({ params }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getStudent(params.address);
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    }

    if (params.address) {
      fetchProfile();
    }
  }, [params.address]);

  return (
    <div>

    </div>
  );
}
