import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

const useFetch = (callback, options = {}) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  // console.log(data, "data");
  // console.log(loading, "loading");
  // console.log(error, "error");

  const { session } = useSession();
  console.log(session, "session");

  const fun = async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const supabaseAccessToken = await session?.getToken({
        template: "supabase",
      });

      console.log(supabaseAccessToken, "supabaseAccessToken");

      const response = await callback(
        supabaseAccessToken,
        session,
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

  return { fun, data, error, loading, session };
};
export default useFetch;
