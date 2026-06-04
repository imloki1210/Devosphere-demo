import * as React from "react";
import { Container } from "../ui/container";
import { Marquee } from "../ui/marquee";
import { Heading } from "../ui/heading";

// High-fidelity inline SVG logos
const CalendlyLogo: React.FC = () => (
  <div className="flex items-center gap-2 hover:opacity-100 transition-opacity">
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-gray-900">
      <path d="M18.8 3.5H5.2C3.25 3.5 1.7 5.05 1.7 7v10c0 1.95 1.55 3.5 3.5 3.5h13.6c1.95 0 3.5-1.55 3.5-3.5V7c0-1.95-1.55-3.5-3.5-3.5zm.5 13.5c0 .83-.67 1.5-1.5 1.5H5.2c-.83 0-1.5-.67-1.5-1.5V7c0-.83.67-1.5 1.5-1.5h12.6c.83 0 1.5.67 1.5 1.5v10zM12 8.5c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zm0 5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
    </svg>
    <span className="font-sans font-extrabold text-lg text-gray-900 tracking-tighter">calendly</span>
  </div>
);

const EpicGamesLogo: React.FC = () => (
  <div className="flex items-center gap-2">
    <div className="bg-black text-white px-2 py-1 rounded font-sans font-black text-xs tracking-tighter flex items-center gap-1.5">
      <svg viewBox="0 0 24 28" className="w-3.5 h-4 fill-current">
        <path d="M12 0L1.5 3.5v14.8c0 5.4 6.7 8.9 10.5 9.7 3.8-.8 10.5-4.3 10.5-9.7V3.5L12 0zm0 3.8c4.3 0 7.8 3.5 7.8 7.8s-3.5 7.8-7.8 7.8-7.8-3.5-7.8-7.8 3.5-7.8 7.8-7.8z" />
      </svg>
      EPIC GAMES
    </div>
  </div>
);

const FoxLogo: React.FC = () => (
  <div className="flex items-center">
    <span className="font-sans font-black text-3xl tracking-tight text-gray-900 skew-x-3">FOX</span>
  </div>
);

const RiotGamesLogo: React.FC = () => (
  <div className="flex items-center gap-2">
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-gray-900">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-5h2v5zm0-6.5h-2V8h2v2z" />
    </svg>
    <span className="font-sans font-black text-sm uppercase tracking-wider text-gray-900">RIOT GAMES</span>
  </div>
);

const KaplanLogo: React.FC = () => (
  <div className="flex items-center gap-1.5">
    <span className="font-sans font-bold text-lg tracking-wider text-gray-900">KAPLAN</span>
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2 text-gray-900">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20M4 19.5V5A2.5 2.5 0 0 1 6.5 2.5H20V17H6.5" />
    </svg>
  </div>
);

const BodiLogo: React.FC = () => (
  <div className="flex items-center">
    <span className="font-sans font-black text-2xl tracking-tighter text-gray-900 italic">BOD<span className="text-purple-600">i</span></span>
  </div>
);

const FairLogo: React.FC = () => (
  <div className="flex items-center">
    <span className="font-serif font-semibold text-2xl tracking-tight text-gray-900 lowercase">fair</span>
  </div>
);

const TwitchLogo: React.FC = () => (
  <div className="flex items-center gap-1.5">
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-gray-900">
      <path d="M11.5 2L2 6v12h5v4l4-4h4l7-7V2H11.5zm8.5 11l-4 4h-4.5L8 20.5V17H5V4.5h15V13zm-3-5.5h-2v5.5h2V7.5zm-5 0h-2v5.5h2V7.5z" />
    </svg>
    <span className="font-sans font-extrabold text-lg text-gray-900 lowercase">twitch</span>
  </div>
);

const CoinbaseLogo: React.FC = () => (
  <div className="flex items-center gap-2">
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-gray-900">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
    </svg>
    <span className="font-sans font-bold text-lg text-gray-900 lowercase">coinbase</span>
  </div>
);

// Row 2
const FoxSportsLogo: React.FC = () => (
  <div className="flex items-center gap-1">
    <span className="font-sans font-black text-2xl tracking-tighter text-gray-900">FOX</span>
    <span className="font-sans font-light text-xl tracking-widest text-gray-900">SPORTS</span>
  </div>
);

const OfxLogo: React.FC = () => (
  <div className="flex items-center gap-1.5">
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-gray-900">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
    <span className="font-sans font-black text-xl tracking-tight text-gray-900">OFX</span>
  </div>
);

const DoubleLogo: React.FC = () => (
  <div className="flex items-center gap-2">
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-gray-900">
      <circle cx="8" cy="12" r="6" className="opacity-60" />
      <circle cx="16" cy="12" r="6" />
    </svg>
    <span className="font-sans font-semibold text-lg text-gray-900">Double</span>
  </div>
);

const DistrictTacoLogo: React.FC = () => (
  <div className="flex items-center gap-1.5">
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2 text-gray-900">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 8a4 4 0 0 0-4 4h8a4 4 0 0 0-4-4z" />
    </svg>
    <span className="font-sans font-black text-sm uppercase text-gray-900">DISTRICT TACO</span>
  </div>
);

const MadeLogo: React.FC = () => (
  <div className="border-2 border-gray-900 px-2 py-0.5 flex items-center">
    <span className="font-sans font-black text-sm tracking-widest text-gray-900">MADE</span>
  </div>
);

const NewsCorpLogo: React.FC = () => (
  <div className="flex items-center">
    <span className="font-serif italic font-bold text-lg text-gray-900 tracking-tight">News Corp</span>
  </div>
);

const SothebysLogo: React.FC = () => (
  <div className="flex flex-col items-center leading-none">
    <span className="font-serif text-lg tracking-wider text-gray-900">Sotheby's</span>
    <span className="font-sans text-[8px] tracking-widest text-gray-700 uppercase">INTERNATIONAL REALTY</span>
  </div>
);

const RollingStoneLogo: React.FC = () => (
  <div className="flex items-center">
    <span className="font-serif italic font-black text-xl text-gray-900 tracking-tighter">RollingStone</span>
  </div>
);

// Row 3
const SpanxLogo: React.FC = () => (
  <div className="flex items-center">
    <span className="font-sans font-light text-2xl tracking-[0.2em] text-gray-900">SPANX</span>
  </div>
);

const DowJonesLogo: React.FC = () => (
  <div className="flex items-center gap-1.5">
    <div className="w-6 h-6 rounded bg-gray-900 text-white font-serif font-bold text-sm flex items-center justify-center">D</div>
    <span className="font-serif font-bold text-sm tracking-wider text-gray-900 uppercase">DOW JONES</span>
  </div>
);

const GeneralAssemblyLogo: React.FC = () => (
  <div className="flex items-center gap-2">
    <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-white font-sans font-bold text-[10px]">GA</div>
    <span className="font-sans font-extrabold text-[10px] md:text-xs leading-none text-gray-900 uppercase tracking-tight">
      GENERAL<br />ASSEMBLY
    </span>
  </div>
);

const IkonLogo: React.FC = () => (
  <div className="flex items-center">
    <span className="font-sans font-black text-2xl tracking-widest text-gray-900">IKON</span>
  </div>
);

const UnderArmourLogo: React.FC = () => (
  <div className="flex items-center gap-2">
    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current text-gray-900">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
    </svg>
    <span className="font-sans font-bold text-sm uppercase tracking-wider text-gray-900">UNDER ARMOUR</span>
  </div>
);

const VarietyLogo: React.FC = () => (
  <div className="flex items-center">
    <span className="font-serif font-black text-2xl tracking-wider text-gray-900 uppercase">VARIETY</span>
  </div>
);

const BillboardLogo: React.FC = () => (
  <div className="flex items-center">
    <span className="font-sans font-extrabold text-2xl tracking-tighter text-gray-900 lowercase">billboard</span>
  </div>
);

const SkimsLogo: React.FC = () => (
  <div className="flex items-center">
    <span className="font-sans font-bold text-xl tracking-tight text-gray-900 uppercase bg-gray-100 px-3 py-1 rounded-full">SKIMS</span>
  </div>
);

export const TrustMarquee: React.FC = () => {
  return (
    <section className="py-20 bg-white overflow-hidden relative">
      <Container size="2xl">
        {/* Centered Heading */}
        <div className="text-center mb-16">
          <Heading level={2} size="3xl" className="font-heading font-extrabold text-black tracking-tight text-3xl md:text-4xl">
            Trusted by Leading Brands
          </Heading>
        </div>

        {/* 3 Alternating Marquee Tracks */}
        <div className="flex flex-col gap-8 md:gap-12 max-w-7xl mx-auto">
          {/* Row 1: Left */}
          <Marquee direction="left" className="gap-20 py-3">
            <CalendlyLogo />
            <EpicGamesLogo />
            <FoxLogo />
            <RiotGamesLogo />
            <KaplanLogo />
            <BodiLogo />
            <FairLogo />
            <TwitchLogo />
            <CoinbaseLogo />
          </Marquee>

          {/* Row 2: Right */}
          <Marquee direction="right" className="gap-20 py-3">
            <FoxSportsLogo />
            <OfxLogo />
            <DoubleLogo />
            <DistrictTacoLogo />
            <MadeLogo />
            <NewsCorpLogo />
            <SothebysLogo />
            <RollingStoneLogo />
          </Marquee>

          {/* Row 3: Left */}
          <Marquee direction="left" className="gap-20 py-3">
            <SpanxLogo />
            <DowJonesLogo />
            <GeneralAssemblyLogo />
            <IkonLogo />
            <UnderArmourLogo />
            <VarietyLogo />
            <BillboardLogo />
            <SkimsLogo />
          </Marquee>
        </div>
      </Container>
    </section>
  );
};

