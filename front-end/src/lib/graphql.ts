import { GraphQLClient } from 'graphql-request';
import { cookies } from 'next/headers';

export async function getGraphQLClient() {
  const cookieStore = cookies(); // ou await cookies() se for Promise
  const token = (await cookieStore).get('access_token')?.value;

  return new GraphQLClient(process.env.NEXT_PUBLIC_API_URL!, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
}

