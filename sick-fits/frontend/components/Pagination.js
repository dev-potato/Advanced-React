import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Link from "next/link";
import Head from "next/head";
import PaginationStyles from "./styles/PaginationStyles";
import { perPage } from "../config";

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

class Pagination extends Component {
  render() {
    return (
      <Query query={PAGINATION_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          const count = data.itemsConnection.aggregate.count;
          const pages = Math.ceil(count / perPage);
          const page = this.props.page;
          return (
            <PaginationStyles>
              <Head>
                <title>
                  Sick Fits! - Page {page} of {pages}
                </title>
              </Head>
              <Link
                prefetch
                href={{
                  pathName: "items",
                  query: { page: page - 1 },
                }}
              >
                <a className="prev" aria-disabled={page <= 1}>
                  Prev
                </a>
              </Link>
              <p>
                Page {page} of {pages}
              </p>
              <Link
                prefetch
                href={{
                  pathName: "items",
                  query: { page: page + 1 },
                }}
              >
                <a className="prev" aria-disabled={page >= pages}>
                  Next 
                </a>
              </Link>
            </PaginationStyles>
          );
        }}
      </Query>
    );
  }
}

export default Pagination;
