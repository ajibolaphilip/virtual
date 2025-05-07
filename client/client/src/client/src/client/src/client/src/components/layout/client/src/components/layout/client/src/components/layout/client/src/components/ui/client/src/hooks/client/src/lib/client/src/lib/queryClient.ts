import { QueryClient } from '@tanstack/react-query';

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    let errorMsg = `${res.status} ${res.statusText}`;
    try {
      const errBody = await res.json();
      if (errBody && errBody.error) {
        errorMsg += `: ${errBody.error}`;
      }
    } catch (e) {
      // Ignore errors parsing error body
    }
    throw new Error(errorMsg);
  }
}

export async function apiRequest(
  url: string,
  options: RequestInit = {}
): Promise<any> {
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  
  await throwIfResNotOk(res);
  
  if (res.status === 204) {
    return null;
  }
  
  return res.json();
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn = <T>(options: {
  on401: UnauthorizedBehavior;
}) => {
  return async ({ queryKey }: { queryKey: unknown[] }): Promise<T | null> => {
    const [endpoint] = queryKey as string[];
    try {
      return await apiRequest(endpoint);
    } catch (err) {
      if (
        options.on401 === "returnNull" &&
        err instanceof Error &&
        err.message.startsWith("401")
      ) {
        return null;
      }
      throw err;
    }
  };
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});
