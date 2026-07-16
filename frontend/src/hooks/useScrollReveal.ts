import { useEffect, useRef } from 'react';

/**
 * Adds a fade-up reveal animation to elements as they scroll into view.
 * Attach the returned ref to any container; children with [data-reveal]
 * will animate individually with a slight stagger.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    if (typeof IntersectionObserver === 'undefined') {
      root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => element.classList.add('reveal-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.revealDelay || '0';
            el.style.transitionDelay = `${delay}ms`;
            el.classList.add('reveal-visible');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const observeRevealElements = (container: ParentNode) => {
      if (container instanceof HTMLElement && container.matches('[data-reveal]')) observer.observe(container);
      container.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => {
        if (!element.classList.contains('reveal-visible')) observer.observe(element);
      });
    };

    observeRevealElements(root);
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement) observeRevealElements(node);
      }));
    });
    mutationObserver.observe(root, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  return ref;
}
