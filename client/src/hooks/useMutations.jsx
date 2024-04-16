import { useMutation } from "@tanstack/react-query";

export const usePostQuery = () => { // Updated function name to usePostQuery
  const baseUrl = `https://api-eu-west-2.hygraph.com/v2/cluucxoja0egr07um1minlfjo/master`;
  const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MTMyNDk4MTIsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY2x1dWN4b2phMGVncjA3dW0xbWlubGZqby9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC1ldS13ZXN0LTIuaHlncmFwaC5jb20vIiwic3ViIjoiMDQxYjNjMDItMjA1OC00YTljLWJhNzQtODBiZTk3OTk5M2RmIiwianRpIjoiY2x2MjBwYnpjcXcxczA3bXY1Ym1nNzl6bSJ9.0JJ4-jdzDO0uuTJynRCPwyUPCuklMPq_UBIpT3YFJ0DkF0_EbJa67I4y2RpyhV3PoNK_S8Fo0Y6eLlRgyhIxwQop7uDbVvjB6JjVtHXf3rnnSW2mNAR7BN9xevDKU7_fpu_PmyoWJDbyu5FzAdkN3mn7_SoCIbjqnCPl8yZtGCIChp4dJEZBlJiY1ZG3gZ2geTCiGHU10cN1T0mg6yMuBZm9rCyQdw8BYTK08ApYlXL0bTEFG8UUuXJvQoJjXtUJvkSxrtKMZOoVUirirwdYoRfxekoDsqU68dyCsd-ke_Z6euNDMlHgaWkAUyeezjcYJGdBzVe_QgYGSokxcIahgzcpwFcFySMOkrcPZlCbQbNquqdURyDsKW-On33aAQZWJb13hIZmxIHg1id0Xi_0fHGm1pnZH_vvrYUTK6l-7HYMcwwd2Bl8ull-MDvK4RtDnrKdf_RLrQMvZ-oTjsdCoAvzxY9G458SXKjoFVFXYOyvAHCtcQfixm4ywyEREQh5bMGAGw2XDIxsJ9Udwb7utHAZShfwIxXaE6BxRml6UyZmbbCl2-Ggag33oVD1DwHJZ2bnjr1tOe0GrTUKAXuciPn70nTrALEugWAsd142C-d9q-U3bK33svdqYNcDrFOasBV19C-WPKi_HVnUaLz0Ova8L9jMBi_CIS-h_V9rx-Y"

  console.log(token);

  const mutation = useMutation({
    mutationFn: (query) => {
      return request(baseUrl, query, {
        Authorization: `Bearer ${token}`
      })
    },
  })

  return { data, isLoading, error };
};
