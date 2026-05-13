import { Brand, BrandStyleGuide, Logo, LogoLibrary } from "../../artifacts/artifacts";

const LogoType = {
    LIGHT_BACKGROUND: "light_background",
    DARK_BACKGROUND: "dark_background",
    SQUARE: "square",
    SOCIAL: "social",
    RECTANGLE: "rectangle",
} as const;

const PROTOFLOW_CREATORS = ["protoflow"];
const VERSION = 1;
const NOW = new Date("2026-05-13T00:00:00.000Z");

const protoflowBrand = new Brand(
    "brand.protoflow.v1",
    NOW,
    NOW,
    PROTOFLOW_CREATORS,
    "Protoflow",
    "Brand definition for Protoflow — an opinionated harness that turns Claude Code into a disciplined product development partner.",
    VERSION,
    // tone_of_voice
    [
        "Default: matter-of-fact, instructive, terse.",
        "On gate violations: firm and non-negotiable; explain the rule, not the feeling.",
        "On reuse wins: briefly celebratory ('reused 3 of 4 modules — nice').",
        "Never: cute, mascot-y, fearmongering, or salesy.",
        "Prefer imperatives and concrete numbers over adjectives.",
    ].join(" "),
    // brand_voice
    "The senior staff engineer who has watched a hundred prototypes rot in /tmp and built the system so it stops happening. Speaks engineer-to-engineer: terse, technical, plainspoken, skeptical of hype. Treats the user as a capable builder, not a customer to be onboarded.",
    // brand_promise
    "Turn AI-assisted prototyping from a chaotic sprint into a repeatable, reusable, production-track workflow — without slowing the builder down. Every prototype either ships, gets reused, or is killed cleanly; nothing rots in a forgotten folder.",
    // brand_personality
    "Opinionated. Engineering-first. Founder-empathetic. Direct. Reuse-obsessed. Allergic to ceremony that does not earn its keep. Gates exist to protect future-you, not to gatekeep. Velocity through structure, not in spite of it."
);

const protoflowColorPalette: string[] = [
    "#0A0E14", // Ink Black — primary text, blueprint borders
    "#0B1F3A", // Blueprint Blue — primary brand color, surfaces
    "#1E5BFF", // Signal Blue — interactive, links, primary CTA
    "#00D4A4", // Flow Teal — success, in-flow state, completed phases
    "#F4B400", // Gate Amber — guardrail warnings, gate checks
    "#E5484D", // Halt Red — protected files, hard stops
    "#F5F7FA", // Paper — background, canvas
    "#6B7280", // Graphite — secondary text, muted UI
    "#FFFFFF", // Pure White
];

const protoflowLogos: Logo[] = [
    new Logo(
        "logo.protoflow.wordmark.light",
        NOW,
        NOW,
        PROTOFLOW_CREATORS,
        "Protoflow Wordmark — Light",
        "Primary wordmark for use on light backgrounds. 'proto' set in mono, 'flow' set in sans, joined by a single phase-tick mark.",
        VERSION,
        "assets/brand/protoflow-wordmark-light.svg",
        LogoType.LIGHT_BACKGROUND
    ),
    new Logo(
        "logo.protoflow.wordmark.dark",
        NOW,
        NOW,
        PROTOFLOW_CREATORS,
        "Protoflow Wordmark — Dark",
        "Inverse wordmark for dark backgrounds. Same construction as the light variant; phase-tick rendered in Flow Teal.",
        VERSION,
        "assets/brand/protoflow-wordmark-dark.svg",
        LogoType.DARK_BACKGROUND
    ),
    new Logo(
        "logo.protoflow.mark.square",
        NOW,
        NOW,
        PROTOFLOW_CREATORS,
        "Protoflow Phase Mark — Square",
        "Square app icon: nine ticks of a phased pipeline arranged into a rounded square, evoking the 9-phase SDLC.",
        VERSION,
        "assets/brand/protoflow-mark-square.svg",
        LogoType.SQUARE
    ),
    new Logo(
        "logo.protoflow.mark.social",
        NOW,
        NOW,
        PROTOFLOW_CREATORS,
        "Protoflow Mark — Social",
        "Social avatar variant of the phase mark on a Blueprint Blue field, optimized for circular crops.",
        VERSION,
        "assets/brand/protoflow-mark-social.svg",
        LogoType.SOCIAL
    ),
    new Logo(
        "logo.protoflow.lockup.rectangle",
        NOW,
        NOW,
        PROTOFLOW_CREATORS,
        "Protoflow Lockup — Rectangle",
        "Horizontal lockup: phase mark + wordmark + tagline ('Prototype with discipline.'). For headers, README banners, presentation title slides.",
        VERSION,
        "assets/brand/protoflow-lockup-rectangle.svg",
        LogoType.RECTANGLE
    ),
];

const protoflowLogoLibrary = new LogoLibrary(
    "logolibrary.protoflow.v1",
    NOW,
    NOW,
    PROTOFLOW_CREATORS,
    "Protoflow Logo Library",
    "Complete set of Protoflow logo variants across light, dark, square, social, and rectangle contexts.",
    VERSION,
    "Logo library for the Protoflow brand.",
    protoflowLogos
);

const protoflowBrandStyleGuide = new BrandStyleGuide(
    "brandstyleguide.protoflow.v1",
    NOW,
    NOW,
    PROTOFLOW_CREATORS,
    "Protoflow Brand Style Guide",
    "Color palette and logo system for Protoflow. Pair with the Brand artifact for voice/tone/promise/personality.",
    VERSION,
    protoflowColorPalette,
    protoflowLogoLibrary
);

export {
    protoflowBrand,
    protoflowBrandStyleGuide,
    protoflowLogoLibrary,
    protoflowLogos,
    protoflowColorPalette,
};
