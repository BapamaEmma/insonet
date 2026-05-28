export default function BackToTopButton({ onClick }) {
  return (
    <a
      href="#"
      onClick={onClick}
      id="back-to-top"
      className="back-to-top fixed text-base rounded-md z-10 bottom-8 right-8 h-8 w-8 text-center bg-primary text-white leading-9 justify-center items-center"
    >
      <i data-lucide="arrow-up" className="h-4 w-4 text-white stroke-2"></i>
    </a>
  );
}
