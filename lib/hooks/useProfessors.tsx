import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export const useProfessors = () => {
  const [professors, setProfessors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfessors = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(
          query(collection(db, "professors")),
        );
        const fetchedProfessors = querySnapshot.docs.map((doc) => ({
          email: doc.id,
          ...doc.data(),
        }));
        setProfessors(fetchedProfessors);
      } catch (error) {
        console.error("Error fetching professors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessors();
  }, []);

  return { professors, loading };
};
