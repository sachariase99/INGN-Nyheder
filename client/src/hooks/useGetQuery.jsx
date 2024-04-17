import { useQuery } from "@tanstack/react-query"; // React Query hook til dataforespørgsler
import { request } from "graphql-request"; // Funktion til at foretage GraphQL-forespørgsler

// Brugerdefineret hook til at foretage GraphQL-forespørgsler
export const useGetQuery = (query, key) => {
  // Base-URL for GraphQL-endepunktet
  const baseUrl = `https://api-eu-west-2.hygraph.com/v2/cluucxoja0egr07um1minlfjo/master`;

  // Bruger useQuery-hook til at hente data asynkront
  const { data, isLoading, error } = useQuery({
    // Definerer nøglen for caching af data
    queryKey: [key],
    // Definerer funktionen til at foretage selve GraphQL-forespørgslen
    queryFn: async () => request(baseUrl, query),
  });

  // Returnerer data, loading-status og eventuelle fejl
  return { data, isLoading, error };
};