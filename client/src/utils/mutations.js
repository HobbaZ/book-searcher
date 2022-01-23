import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
        token
        user {
          _id
          username
        }
      }
    }
  `;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($userId: ID!, $book: String!) {
    saveBook(userId: $userId, bookId: $bookId) {
      _id
      username
      savedBooks[authors, description, bookId, image ,link, title]
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation deleteBook($bookId: String!) {
    deleteBook(bookId: $bookId) {
      _id
      username
      savedBooks[bookId]
    }
  }
`;

export const SEARCH_BOOK = gql`
mutation searchBook($search: String!) {
    searchBook(search: $search) {
        searchQuery
    }
}
`