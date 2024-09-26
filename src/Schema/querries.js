export const PRODUCT_GRID = `query MyQuery($handle: String!, $after: String) {
  collectionByHandle(handle: $handle) {
    title
    handle
    products(first: 20, after: $after) {
        edges {
          cursor
          node {
            id
            title
            description
            tags
            totalInventory
            productType
            availableForSale
            images(first: 10) {
              edges {
                node {
                  src
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  availableForSale
                  compareAtPriceV2 {
                    amount
                    currencyCode
                  }
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
            handle
            options {
              id
              name
              values
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
  }
}`;

export const NEW_ARRIVAL_PRODUCTS = `query MyQuery {
      products(first: 20, sortKey: CREATED_AT, query: "tag:isNew") {
        edges {
          node {
            id
            title
            description
            tags
            totalInventory
            productType
            availableForSale
            images(first: 10) {
              edges {
                node {
                  src
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  availableForSale
                  compareAtPriceV2 {
                    amount
                    currencyCode
                  }
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
            handle
            options {
              id
              name
              values
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
    }`;

export const GET_ALL_COLLECTIONS = `query MyQuery {
  collections(first: 20) {
    edges {
      node {
        title
        image {
          src
        }
        products(first: 10) {
          edges {
            node {
              description
              id
              title
              productType
              images(first: 10) {
                edges {
                  node {
                    src
                  }
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    image {
                      src
                    }
                    id
                    compareAtPriceV2 {
                      amount
                      currencyCode
                    }
                    priceV2 {
                      amount
                      currencyCode
                    }
                    availableForSale
                  }
                }
              }
              handle
               options(first: 10) {
                  id
                  name
                  values
               }
            }
          }
        }
      }
    }
  }
}`;

export const FEATURED_PRODUCTS = `query MyQuery {
      products(first: 20, sortKey: CREATED_AT, query: "tag:Featured") {
        edges {
          node {
            id
            title
            description
            tags
            totalInventory
            productType
            availableForSale
            images(first: 10) {
              edges {
                node {
                  src
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  availableForSale
                  compareAtPriceV2 {
                    amount
                    currencyCode
                  }
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
            handle
            options {
              id
              name
              values
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
    }`;

export const GET_ALL_MENU_ITEMS = `query MyQuery($handle: String!) {
  menu(handle: $handle) {
    handle
    items {
      title
      url
      type
      resource {
        ... on Collection {
          title
          handle
          products(first: 10) {
            pageInfo {
              hasNextPage
            }
            edges {
              cursor
              node {
                description
                id
                title
                productType
                images(first: 10) {
                  edges {
                    node {
                      src
                    }
                  }
                }
                variants(first: 1) {
                  edges {
                    node {
                      image {
                        src
                      }
                      id
                      compareAtPriceV2 {
                        amount
                        currencyCode
                      }
                      priceV2 {
                        amount
                        currencyCode
                      }
                      availableForSale
                    }
                  }
                }
                handle
                options(first: 10) {
                  id
                  name
                  values
                }
              }
            }
          }
        }
      }
      items {
        title
        url
        type
        resource {
          ... on Collection {
            title
            handle
            products(first: 10) {
              pageInfo {
                hasNextPage
              }
              edges {
                cursor
                node {
                  description
                  id
                  title
                  productType
                  images(first: 10) {
                    edges {
                      node {
                        src
                      }
                    }
                  }
                  variants(first: 1) {
                    edges {
                      node {
                        image {
                          src
                        }
                        id
                        compareAtPriceV2 {
                          amount
                          currencyCode
                        }
                        priceV2 {
                          amount
                          currencyCode
                        }
                        availableForSale
                      }
                    }
                  }
                  handle
                  options(first: 10) {
                    id
                    name
                    values
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

export const GET_COLLECTION_ON_TAG = `query MyQuery
        ($handle: String!) {
  collectionByHandle(handle: $handle) {
    products(first: 20) {
        edges {
          node {
            id
            title
            description
            tags
            totalInventory
            productType
            availableForSale
            images(first: 10) {
              edges {
                node {
                  src
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  availableForSale
                  compareAtPriceV2 {
                    amount
                    currencyCode
                  }
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
            handle
            options {
              id
              name
              values
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
  }
}`;
    export const GET_HOME_COLLECTIONS = `query MyQuery ($handles : String! ) {
      collections(first: 40 ,query : $handles) {
        edges {
          node {
            title
            handle
            image {
              src
            }
            products(first: 20) {
              edges {
                cursor
                node {
                  description
                  id
                  title
                  createdAt
                  vendor
                  tags
                  productType
                  images(first: 10) {
                    edges {
                      node {
                        src
                      }
                    }
                  }
                  variants(first: 1) {
                    edges {
                      node {
                        image {
                          src
                        }
                        id
                        compareAtPriceV2 {
                          amount
                          currencyCode
                        }
                        priceV2 {
                          amount
                          currencyCode
                        }
                        availableForSale
                      }
                    }
                  }
                  handle
                   options(first: 10) {
                      id
                      name
                      values
                   }
                }
              }
              pageInfo {
                hasNextPage
              }
            }
          }
        }
      }
    }`;
