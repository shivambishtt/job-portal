  import { useSession } from "@clerk/clerk-react";
  import { useState } from "react";

  const useFetch = (callback, options = {}) => {
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const { session } = useSession();

    const fun = async (...args) => {
      setLoading(true);
      setError(null);

      try {
        const supabaseAccessToken = await session?.getToken({
          template: "supabase",
        });
        
        const response = await callback(
          supabaseAccessToken,
          session, // this was causing the issue
          options,
          ...args
        );
        setData(response);
        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    return { fun, data, error, loading };
  };
  export default useFetch;
