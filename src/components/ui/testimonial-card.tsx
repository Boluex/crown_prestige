"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// --- Type Definitions for props ---
export interface Stat {
  value: string;
  label: string;
}

export interface Testimonial {
  name: string;
  title: string;
  quote?: string;
  avatarSrc: string;
  rating: number;
}

export interface ClientsSectionProps {
  tagLabel: string;
  title: string;
  description: string;
  stats: Stat[];
  testimonials: Testimonial[];
  primaryActionLabel: string;
  secondaryActionLabel: string;
  className?: string;
}

// --- Internal Sub-Components ---

// StatCard using shadcn variables
const StatCard = ({ value, label }: Stat) => (
  <Card className="bg-background-secondary border-border text-center rounded-none shadow-sm">
    <CardContent className="p-5">
      <p className="text-3xl font-display font-semibold text-primary">{value}</p>
      <p className="text-xs uppercase tracking-wider text-foreground-muted mt-1 font-semibold">{label}</p>
    </CardContent>
  </Card>
);

// A sticky testimonial card for the stacking effect.
const StickyTestimonialCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => {
  return (
    <motion.div
      className="sticky w-full"
      style={{ top: `${96 + index * 32}px` }} // Staggered top position for stacking under header
    >
      <div className={cn(
        "p-8 rounded-none shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col h-auto w-full",
        "bg-card border border-border transition-colors duration-500"
      )}>
        {/* Top section: Image and Author */}
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-none bg-cover bg-center flex-shrink-0 border border-border"
            style={{ backgroundImage: `url(${testimonial.avatarSrc})` }}
            aria-label={`Photo of ${testimonial.name}`}
          />
          <div className="flex-grow">
            <p className="font-display font-medium text-lg text-foreground leading-snug">{testimonial.name}</p>
            <p className="text-xs uppercase tracking-wider text-primary font-semibold mt-0.5">{testimonial.title}</p>
          </div>
        </div>

        {/* Middle section: Rating */}
        <div className="flex items-center gap-2 my-4">
          <span className="font-bold text-sm text-foreground">{testimonial.rating.toFixed(1)}</span>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3.5 w-3.5",
                  i < Math.floor(testimonial.rating)
                    ? "text-primary fill-primary"
                    : "text-foreground-muted/30"
                )}
              />
            ))}
          </div>
        </div>

        {/* Bottom section: Quote */}
        {testimonial.quote && (
          <p className="text-sm leading-7 text-foreground-body/95 font-light italic">&ldquo;{testimonial.quote}&rdquo;</p>
        )}
      </div>
    </motion.div>
  );
};

// --- Main Exported Component ---

export const ClientsSection = ({
  tagLabel,
  title,
  description,
  stats,
  testimonials,
  primaryActionLabel,
  secondaryActionLabel,
  className,
}: ClientsSectionProps) => {
  // Calculate a height for the scroll container to ensure all cards can stack
  const scrollContainerHeight = `calc(100vh + ${testimonials.length * 120}px)`;

  return (
    <section className={cn("w-full bg-background text-foreground py-20 md:py-28 transition-colors duration-500", className)}>
      <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        
        {/* Left Column: Sticky Content */}
        <div className="flex flex-col gap-6 lg:sticky lg:top-28">
          <div className="inline-flex items-center gap-2 self-start rounded-none border border-primary/30 bg-primary/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            <div className="h-1.5 w-1.5 rounded-none bg-primary animate-pulse" />
            <span>{tagLabel}</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-display font-light tracking-tight text-foreground leading-[1.1]">
            {title}
          </h2>
          <p className="text-base leading-8 text-foreground-body/80 font-light max-w-lg">
            {description}
          </p>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
          <div className="flex items-center gap-4 mt-6">
            <Link to="/our-fleet/">
              <Button variant="outline" size="lg" className="rounded-none border-border hover:border-primary text-xs uppercase tracking-wider font-semibold py-4 px-8 h-auto">{secondaryActionLabel}</Button>
            </Link>
            <Link to="/book-now/">
              <Button size="lg" className="rounded-none bg-primary hover:bg-primary-dark text-xs uppercase tracking-wider font-semibold text-white py-4 px-8 h-auto">{primaryActionLabel}</Button>
            </Link>
          </div>
        </div>

        {/* Right Column: Container for the sticky card stack */}
        <div className="relative flex flex-col gap-6" style={{ height: scrollContainerHeight }}>
          {testimonials.map((testimonial, index) => (
            <StickyTestimonialCard
              key={testimonial.name}
              index={index}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
