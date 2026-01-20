import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import {  MutateResult, MutationOptions } from '@apollo/client';
import { useMutation } from '@apollo/client/react';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AuthResponseDto = {
  __typename?: 'AuthResponseDto';
  token: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  signIn: AuthResponseDto;
  signUp: SignupDto;
};


export type MutationSignInArgs = {
  args: SignInRequestDto;
};


export type MutationSignUpArgs = {
  args: SignUpRequestDto;
};

export type Query = {
  __typename?: 'Query';
  getAll: Array<UserResponseDto>;
  getUserById: UserResponseDto;
};


export type QueryGetUserByIdArgs = {
  id: Scalars['Float']['input'];
};

export type SignInRequestDto = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignUpRequestDto = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  telephones: Array<TelephoneInput>;
};

export type SignupDto = {
  __typename?: 'SignupDto';
  created_at: Scalars['String']['output'];
  id: Scalars['String']['output'];
  modified_at?: Maybe<Scalars['String']['output']>;
};

export type TelephoneInput = {
  area_code: Scalars['Int']['input'];
  number: Scalars['Int']['input'];
};

export type UserResponseDto = {
  __typename?: 'UserResponseDto';
  created_at: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
};

export type SignInMutationVariables = Exact<{
  args: SignInRequestDto;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'AuthResponseDto', token: string } };

export type SignUpMutationVariables = Exact<{
  args: SignUpRequestDto;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'SignupDto', id: string, created_at: string, modified_at?: string | null } };


export const SignInDocument = gql`
    mutation SignIn($args: SignInRequestDto!) {
  signIn(args: $args) {
    token
  }
}
    `;

export function useSignInMutation(
  baseOptions?: Partial<MutationOptions<SignInMutation, SignInMutationVariables>>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
}

export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = MutateResult<SignInMutation>;
export type SignInMutationFn = ReturnType<typeof useSignInMutation>[0];
export type SignInMutationOptions = MutationOptions<SignInMutation, SignInMutationVariables>;


export const SignUpDocument = gql`
  mutation SignUp($args: SignUpRequestDto!) {
    signUp(args: $args) {
      id
      created_at
      modified_at
    }
  }
`;


export function useSignUpMutation(
  baseOptions?: MutationOptions<SignUpMutation, SignUpMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
}



export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutateResult<SignUpMutation>;
export type SignUpMutationFn = ReturnType<typeof useSignUpMutation>[0];
export type SignUpMutationOptions = Apollo.MutationOptions<SignUpMutation, SignUpMutationVariables>;
