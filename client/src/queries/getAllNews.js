import { gql } from "graphql-request";

export const getAllNews = gql`
query NewsPost {
  newsPost(first: 100) {
    id
    date
    image {
      id
      url
    }
    shortDesc {
      markdown
      raw
    }
    longDesc {
      markdown
      raw
    }
    heading {
      markdown
      raw
    }
    author {
      markdown
      raw
    }
    category
  }
}
`;
