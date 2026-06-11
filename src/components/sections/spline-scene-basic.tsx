'use client';

import { ArrowRight, PhoneCall } from 'lucide-react';
import { Link } from 'react-router-dom';

import { company } from '@/data/site-data';
import { Card } from '@/components/ui/card';
import { Spotlight } from '@/components/ui/spotlight';
import { SplineScene } from '@/components/ui/splite';

const defaultScene = 'https://prod.spline.design/m230nqxqDHZEHEr2/scene.splinecode';

export function SplineSceneBasic() {
  return (
    <Card className="relative min-h-[560px] w-full overflow-hidden rounded-none border border-white/12 bg-black/[0.96]">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,169,97,0.22),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.05),transparent_45%)]" />

      <div className="relative z-10 flex h-full flex-col lg:flex-row">
        <div className="flex flex-1 flex-col justify-center p-8 sm:p-10 lg:p-12">
          <span className="mb-4 inline-flex w-fit items-center rounded-none border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-200/90">
            Melbourne Luxury Chauffeur Service
          </span>
          <h1 className="max-w-xl font-display text-5xl leading-[0.94] text-white sm:text-6xl">
            Arrive in prestige. Move with confidence.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-neutral-300">
            Fixed-rate chauffeur cars, wedding transport, airport transfers, and
            limousine hire presented with a more premium, believable digital
            experience.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex items-center justify-center gap-2 rounded-none bg-[#b8913b] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#d1a752]"
              to="/book-now/"
            >
              Get a Free Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              className="inline-flex items-center justify-center gap-2 rounded-none border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              href={company.phoneHref}
            >
              <PhoneCall className="h-4 w-4" />
              {company.phone}
            </a>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {[
              'Original logo and core business info preserved',
              'Luxury-led spacing, typography, and section hierarchy',
              'Interactive 3D hero with cleaner composition',
              'Better route structure for service and location pages',
            ].map((item) => (
              <div
                key={item}
                className="rounded-none border border-white/8 bg-white/[0.04] px-4 py-4 text-sm text-neutral-300"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[360px] flex-1 lg:min-h-full">
          <div className="absolute inset-x-6 top-6 z-20 rounded-none border border-white/10 bg-black/35 p-4 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.24em] text-amber-200/90">
              Interactive car showcase
            </p>
            <p className="mt-2 text-sm leading-6 text-neutral-300">
              This is a cleaner Spline integration point. If you want a custom
              branded limousine scene later, we can replace the URL without
              changing the component system.
            </p>
          </div>
          <SplineScene scene={defaultScene} className="h-full w-full" />
        </div>
      </div>
    </Card>
  );
}
