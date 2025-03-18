"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getStudent } from "hooks/GunDB";

export default function Profile() {
  const searchParams = useSearchParams();
  const address = searchParams.get("address"); 
  const callback = searchParams.get("callback"); 
  
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!address || !callback) return;

    async function fetchProfile() {
      try {
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
  }, [address, callback]);

  return <div>{loading ? "Loading..." : "Redirecting..."}</div>;
}
