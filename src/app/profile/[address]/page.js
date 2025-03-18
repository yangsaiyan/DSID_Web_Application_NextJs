"use client";
import { useEffect, useState } from "react";
import { getStudent } from "hooks/GunDB";
import { useRouter } from "next/router";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { address, callback } = router.query;

  useEffect(() => {
    if (!router.isReady || !address || !callback) return; 

    async function fetchProfile() {
      try {
        setLoading(true);
        const data = await getStudent(address);
        setProfile(data);

        if (data) {
          const redirectUrl = `${callback}?data=${encodeURIComponent(
            JSON.stringify(data) 
          )}`;
          window.location.href = redirectUrl;
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [router.isReady, address, callback]);

  return <div>{loading ? "Loading..." : "Redirecting..."}</div>;
}
