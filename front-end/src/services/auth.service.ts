import { GraphQLClient, ClientError  } from 'graphql-request';

export async function signInService(email: string, password: string) {
  const client = new GraphQLClient(process.env.NEXT_PUBLIC_API_URL!);

  try {
    console.log("1aa")
    const res = await client.request(`
      mutation SignIn($args: SignInRequestDto!) {
        signIn(args: $args) {
          token
        }
      }
    `, { args: { email, password } });

    return res;
  } catch (error) {
    if (error instanceof ClientError) {
      console.error('!GraphQL Error:', error.response.errors);
      throw new Error(error.response.errors?.[0]?.message || 'Erro na autenticação');
    }

    console.error('Unexpected Error:', error);
    throw new Error('Erro inesperado. Tente novamente mais tarde.');
  }
}