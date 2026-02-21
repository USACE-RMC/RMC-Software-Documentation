import useBaseUrl from '@docusaurus/useBaseUrl';

export default function NotFoundContent() {
  return (
    <main className="mx-auto flex w-[94%] max-w-[900px] flex-col items-center px-4 py-16 text-center">
      {/* Heading */}
      <h1 className="m-0 font-usace text-[clamp(4rem,10vw,7rem)] font-bold leading-none text-ifm-primary">404</h1>
      <p className="mb-2 mt-2 font-usace text-h2 font-semibold text-font-color">Page Not Found</p>
      <p className="mb-10 mt-0 max-w-[480px] text-normal text-font-color-description">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      {/* Return home card */}
      <a
        href={useBaseUrl('/')}
        className="group relative flex min-h-[160px] w-full max-w-[360px] flex-col items-center justify-center overflow-hidden rounded-2xl px-5 py-6 text-center no-underline transition-all duration-300 hover:scale-[1.03] hover:no-underline active-gradient-card"
      >
        <p className="mb-0 font-usace text-[1.1rem] font-bold leading-[1.2] text-white">Return Home</p>
        <p className="mb-0 mt-1 font-usace text-[0.85rem] leading-[1.3] text-white/80">Browse all available documentation</p>
        <p className="mb-0 mt-3 font-usace text-[0.8rem] text-white/70 transition-all duration-300 group-hover:text-white/90">
          Go <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </p>
      </a>
    </main>
  );
}
