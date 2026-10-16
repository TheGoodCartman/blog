window.document.addEventListener("DOMContentLoaded", () => {
  const listings = window["quarto-listings"] ?? {};

  for (const [listingId, list] of Object.entries(listings)) {
    enableInfiniteScroll(listingId, list);
  }

  function enableInfiniteScroll(listingId, list) {
    const postsPerPage = list.page;
    const listingElement = window.document.getElementById(listingId);
    const pageNavigation = window.document.getElementById("listing-pagination");
    if (pageNavigation) pageNavigation.style.display = "none";

    const loadMoreTrigger = window.document.createElement("div");
    loadMoreTrigger.className = "infinite-scroll-trigger";
    listingElement.after(loadMoreTrigger);

    const hasMorePosts = () => list.visibleItems.length < list.matchingItems.length;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting) || !hasMorePosts()) return;
        list.page += postsPerPage;
        list.show(1, list.page);
        observer.unobserve(loadMoreTrigger);
        observer.observe(loadMoreTrigger);
      },
      { rootMargin: "0px 0px 600px 0px" }
    );
    observer.observe(loadMoreTrigger);
  }
});
