import { isIllustrative, testimonials } from "./data";
import { TestimonialCard } from "./TestimonialCard";

/** Témoignages en grille de trois cartes de même hauteur (maquettes : `.tem-grid`). */
export function TestimonialsGrid() {
  return (
    <>
      <div className="grid gap-[clamp(12px,1.6vw,22px)] min-[901px]:grid-cols-3">
        {testimonials.map((t) => (
          <TestimonialCard key={t.name} testimonial={t} className="text-[clamp(1rem,1.25vw,1.2rem)]" />
        ))}
      </div>
      {isIllustrative && (
        <p className="mt-[18px] text-[max(0.82rem,13px)] opacity-70">
          Témoignages illustratifs à remplacer par des voix réelles et consenties.
        </p>
      )}
    </>
  );
}
