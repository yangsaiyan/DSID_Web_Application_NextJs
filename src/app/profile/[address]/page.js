"use client";
import { useEffect, useState } from "react";
import { getStudent } from "hooks/GunDB";
import { useRouter } from "next/router";

export default function Profile({ params }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { address, callback } = router.query;

  useEffect(() => {
    if (!address || !callback) return;

    async function fetchProfile() {
      try {
        const data = await getStudent(address);
        setProfile(data);
        const redirectUrl = `${callback}?data=${encodeURIComponent(
          JSON.stringify(profileData)
        )}`;
        window.location.href = redirectUrl;
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    }

    if (address) {
      fetchProfile();
    }
  }, [address, callback]);

  return <div></div>;
}
