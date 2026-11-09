/* Shared scroll reveal: adds .in to [data-reveal] elements once they enter the viewport.
   Per-element stagger comes from the CSS variable --i. Elements added later can be
   registered with window.observeReveal(root). */
(function () {
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var io = ('IntersectionObserver' in window && !reduced)
        ? new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
            });
        }, { threshold: 0.08 })
        : null;

    window.observeReveal = function (root) {
        (root || document).querySelectorAll('[data-reveal]:not(.in)').forEach(function (el) {
            if (io) io.observe(el); else el.classList.add('in');
        });
    };
    window.observeReveal(document);
})();
