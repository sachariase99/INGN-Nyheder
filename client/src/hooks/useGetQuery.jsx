import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";

export const useGetQuery = (query, key) => {

  const baseUrl = `https://api-eu-west-2.hygraph.com/v2/cluucxoja0egr07um1minlfjo/master`;

  const { data, isLoading, error } = useQuery({
    queryKey: [key],
    queryFn: async () => request(baseUrl, query),
  });

  return { data, isLoading, error };
};
