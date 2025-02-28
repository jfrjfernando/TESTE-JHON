import { useRouter } from "preact-router";
import { useCallback, useMemo, useState } from "preact/hooks";

export function usePagination<T>(
  total: T[],
  showPerPage: number,
  currentPage: number
) {
  const [page, setPage] = useState<number>(currentPage);
  const totalLength = useMemo(() => total.length, [total]);

  const next = useCallback(
    () => setPage((value) => Math.min(totalLength, value + 1)),
    [setPage, totalLength]
  );

  const previous = useCallback(
    () => setPage((value) => Math.max(1, value - 1)),
    [setPage]
  );

  const view = useMemo(() => {
    const start = (page - 1) * showPerPage;
    const end = start + showPerPage;

    return total.slice(start, end);
  }, []);

  return {
    page,
    next,
    previous,
    setPage,
    view,
  };
}

export function usePaginationURL<T>(total: T[], showPerPage: number) {
  const [{ matches }, push] = useRouter();
  const allPages = useMemo(
    () => Math.ceil(total.length / showPerPage),
    [total, showPerPage]
  );

  const updatePage = (newPage: string) => {
    const url = new URL(window.location.href);

    url.searchParams.set("page", newPage);

    push(url.pathname + url.search);
  };

  const page = useMemo(() => {
    const urlPage = matches?.["page"];

    if (urlPage && !Number.isNaN(Number(urlPage))) {
      return Number(urlPage);
    }

    return 1;
  }, [matches]);

  const next = useCallback(() => {
    updatePage(String(Math.min(total.length, page + 1)));
  }, [page, total]);

  const previous = useCallback(() => {
    updatePage(String(Math.max(1, page - 1)));
  }, [page]);

  const setPage = useCallback(
    (newPage: number) => {
      updatePage(String(newPage));
    },
    [updatePage]
  );

  const view = useMemo(() => {
    const start = (page - 1) * showPerPage;
    const end = start + showPerPage;

    return total.slice(start, end);
  }, [page, total]);

  return {
    page,
    next,
    previous,
    setPage,
    view,
    allPages,
  };
}
