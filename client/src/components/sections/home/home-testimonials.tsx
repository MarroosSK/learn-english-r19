import "@splidejs/react-splide/css";
import { useQuery } from "@tanstack/react-query";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { cn } from "../../../lib/utils";
import { fetchTestimonials } from "@/api/api-calls";
import { TestimonialI } from "@/types/types";
import TestimonialModal from "@/components/modals/testimonial-modal";

export const HomeTestimonials = () => {
  const {
    data: allTestimonials,
    error,
    isLoading,
    refetch,
  } = useQuery<TestimonialI[]>({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
  });

  return (
    <section
      id="testimonials"
      className="w-full  relative space-y-12 py-24 sm:py-32"
    >
      <div className="space-y-6 text-center">
        <h2 className="text-4xl font-bold tracking-tight">Testimonials</h2>
        <p className="prose prose-base prose-zinc mt-6 text-lg leading-8 dark:prose-invert">
          If you have anything to say, let us know{" "}
          <span>
            {" "}
            <TestimonialModal refetch={refetch} />.{" "}
          </span>
        </p>
      </div>
      {error && (
        <div className="flex items-center justify-center text-red-500">
          Error loading testimonials
        </div>
      )}
      {!allTestimonials && isLoading ? (
        <div className="flex items-center justify-center ">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="w-48 h-32 bg-gray-300 animate-pulse rounded-lg"></div>
            <div className="hidden sm:flex w-48 h-32 bg-gray-300 animate-pulse rounded-lg"></div>
            <div className="hidden md:flex w-48 h-32 bg-gray-300 animate-pulse rounded-lg"></div>
          </div>
        </div>
      ) : (
        <Splide
          aria-label="Testimonials Slider"
          options={{
            arrows: false,
            rewind: true,
            perPage: 3,
            pagination: false,
            gap: "2rem",
            breakpoints: {
              1200: { perPage: 3 },
              992: { perPage: 2 },
              768: { perPage: 2 },
              576: { perPage: 1 },
            },
          }}
          className="max-w-6xl px-4 mx-auto"
        >
          {allTestimonials &&
            allTestimonials.map((testimonial, index) => (
              <SplideSlide key={index}>
                <div
                  className={cn(
                    "relative overflow-hidden rounded-lg bg-secondary-accent p-5 text-primary shadow-lg bg-white"
                  )}
                >
                  <div className="space-y-8">
                    <blockquote className="italic leading-relaxed text-gray-500">
                      &ldquo;{testimonial.body}&rdquo;
                    </blockquote>
                    <h4 className="mt-3 font-bold text-stone-500">
                      {testimonial.username}
                    </h4>
                  </div>
                </div>
              </SplideSlide>
            ))}
        </Splide>
      )}
    </section>
  );
};

export default HomeTestimonials;
