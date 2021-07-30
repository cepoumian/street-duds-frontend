import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false,
    read(existing = [], { args, cache }) {
      const { skip, first } = args;
      // Read the number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;

      // Calculate what page we are currently on, and the total number of pages
      const page = skip / first + 1;
      const totalPages = Math.ceil(count / first);

      // Check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);

      // If there are items
      // AND there aren't enough items to satisfy how many were requested
      // AND we are on the last page
      // THEN, just return it
      if (items.length && items.length !== first && page === totalPages) {
        return items;
      }

      if (items.length !== first) {
        // We don't have any items, they must be fetched
        return false;
      }

      // If there are items, return them
      if (items.length) {
        return items;
      }
      //  fallback to network
      return false;
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;

      const merged = existing ? existing.slice(0) : [];

      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      // Return merged items
      return merged;
    },
  };
}
