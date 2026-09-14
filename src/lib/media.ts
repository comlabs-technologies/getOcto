/**
 * Centralised manifest of remotely hosted media.
 *
 * Every asset is referenced directly from rulebase.co — nothing is copied into
 * /public, inlined as base64 or regenerated locally. `next/image` handles the
 * raster assets (see `remotePatterns` in next.config.ts); remote SVGs are used
 * through plain <img> elements.
 */

const asset = (name: string) => `https://rulebase.co/assets/${name}`;

export const media = {
  // Hero + video -------------------------------------------------------------
  heroRelief: asset("30c8947ce5d227a9ee9ae333e9ed8782aca3b152.webp"),
  rhoThumbnail: asset("1cb75b161f895f9c5eec1b8dda84fa9395f31d46.webp"),
  rhoPoster: asset("video-rho.webp"),
  rhoPreview: asset("social-preview.mp4"),
  rhoYouTube: "https://www.youtube.com/embed/AI4V7i9O_ec?autoplay=1&rel=0",
  ashlynnAvatar: asset("ai-avatar-ashlynn.png"),
  workflowDividers: asset("agent-workflow-dividers.svg"),

  // Product textures ---------------------------------------------------------
  textureScore: asset("ab87b77dd0f85bd07f4c59db3394e3ad065d2d45.webp"),
  texturePayment: asset("stone-payment-bg.webp"),
  textureMarbleWaves: asset("qa-marble-waves.webp"),
  textureStoneRelief: asset("qa-stone-relief.webp"),
  textureAlertGreen: asset("alert-green-texture.webp"),
  textureChatStone: asset("chat-stone.webp"),
  textureMcp: asset("mcp-bg.webp"),

  // Avatars + testimonials ---------------------------------------------------
  avatarStas: asset("avatar-stas.png"),
  avatarJames: asset("hco-av-james.webp"),
  avatarReviewer: asset("3dc0a273af93c4e3be623b6b6107b98e983530c7.webp"),
  avatarOremeyi: asset("aafbeda67d405ae1827f9c9e63f69af3a32e7a42.webp"),

  // UI icons + decorative ----------------------------------------------------
  decorKnowledge: asset("5402bef7c6772e9e50fd65f5a1813004a0d2d92d.webp"),
  decorRemediation: asset("804cd45f5dd12385ab2cbd1dd2ed4c853dfb979c.webp"),
  iconPhone: asset("icon-phone.svg"),
  iconDollar: asset("icon-dollar.svg"),
  iconDownload: asset("icon-download.svg"),

  // Brand marks used across the trust strip + integration grid ---------------
  markQonto: asset("89e14ee5fd2b45a0d03b94aea4f5eb9d7cd812bd.svg"),
  markNala: asset("79f94877ac81ae0d50787ef1b9622ef5764cdcda.svg"),
  markRho: asset("3ddecbb73cef7b9dce7762bd90d258dcfa0e8363.svg"),
  markInterswitch: asset("27d556d9f301e5295eaafb5b858379a64288ea20.svg"),
  markKuda: asset("baba3009ea8b2f36f207560106d092f4520cdf7f.svg"),
  markLesaka: asset("lesaka-logo.svg"),

  integrationMarks: [
    asset("880f813f79b81ef8495ef24579270c81bd55a8fd.svg"),
    asset("c974bd41fac6a4fa5d1109c3f1eefe8b9785395e.svg"),
    asset("96c94badcc90ad3379ecddbe751f594a94ca5e1b.svg"),
    asset("4bb11279f1bb45c9041e4e73bc894afaf2d9fde6.svg"),
    asset("e0cb34de27c7a2c32ac55aade4ee1952f5a98b6e.svg"),
  ],

  // Badges --------------------------------------------------------------------
  badgeSoc: asset("badge-soc.png"),
  badgeGdpr: asset("badge-gdpr.png"),
  badgeYc: asset("badge-yc.png"),

  // Integration tiles --------------------------------------------------------
  tiles: {
    r0c4: asset("tile-r0c4.png"),
    r0c5: asset("tile-r0c5.png"),
    r0c7: asset("tile-r0c7.png"),
    r0c8: asset("tile-r0c8.png"),
    r0c10: asset("tile-r0c10.png"),
    r0c11: asset("tile-r0c11.png"),
    r0c12: asset("tile-r0c12.png"),
    r0c13: asset("tile-r0c13.png"),
    r1c6: asset("tile-r1c6.png"),
    r1c7: asset("tile-r1c7.png"),
    r1c10: asset("tile-r1c10.png"),
    r1c12: asset("tile-r1c12.png"),
    r1c13: asset("tile-r1c13.png"),
    r2c4: asset("tile-r2c4.png"),
    r2c8: asset("tile-r2c8.png"),
  },
} as const;

export type Media = typeof media;
