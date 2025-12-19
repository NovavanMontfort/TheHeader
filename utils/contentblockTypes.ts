export interface BasisContentBlock {
  titel: string;
  seoHeadingtype: string;
  customMarge: string;
  marginBottom: string;
  achtergrondkleur: null;
  publicatiedatumTot: Date;
  publicatiedatumVan: Date;
  _block: {
    _id: number;
    _name: string;
  };
}

interface Knop {
  link: string;
  name: string;
  target: string;
}

interface ElocusAfbeelding {
  id: number;
  alignment: string;
}

interface HeaderSpecifics {
  knop1: Knop;
  knop2: Knop;
  tekst: string;
  afbeelding: number;
  videoUrl: string;
  youtubeLink: string;
  // tijdVanInSeconden: {
  tijdVanInSeconden: number;
  tijdTotInSeconden: number;
  // };
}

interface HomepageHeaderSpecifics {
  knop1: Knop;
  knop2: Knop;
  subtitel: string;
  afbeelding: number;
  tekst: string;
  videoUrl: string;
  youtubeLink: string;
  tijdVanInSeconden: number;
  tijdTotInSeconden: number;
}

interface TitelSpecifics {
  tekst: string;
  quote: Boolean;
  uitlijning: string;
  titelOpmaak: string;
  knop: Knop;
}

export interface AfbeeldingSpecifics {
  afbeelding: number;
  afbeeldingAltTekst: string;
  weergave: string;
  link: string;
  fullScreen: boolean;
  klein: string;
  afbeeldingMobiel: number;
}

export interface TweeAfbeeldingenSpecifics {
  afbeeldingLinks: number;
  afbeeldingRechts: number;
  ondertitel: string;
  fullScreen: boolean;
  afbeeldingLinksMobiel: number;
  afbeeldingRechtsMobiel: number;
}

interface TekstEenKolomsSpecifics {
  tekst: string;
  inleiding: string;
  link: Knop;
}

interface TekstTweeKolomsSpecifics {
  tekst: string;
  subtitel: string;
  tekstLinks: string;
  tekstRechts: string;
  link: Knop;
}

interface TekstEnAfbeeldingSpecifics {
  tekst: string;
  inleiding: string;
  afbeelding: ElocusAfbeelding;
  knop: Knop;
  link: Knop;
  uitvullenAfbeelding: string;
  weergaveTekst: string;
  titelWeergevenAlsH1: string;
}

// Wordt gecomineerd met TekstEnAfbeeldingSpecifics
interface TekstEnVideoSpecifics {
  youtubeLink: string;
  uitlijningTekst: string;
  seoHeadingtype: string;
  tijdVanInSeconden: number;
  tijdTotInSeconden: number;
}

interface VeelgesteldeVragenSpecifics {
  vragen: string;
  subtitel: string;
}

interface VideoSpecifics {
  weergave: string;
  youtubeVimeoLink: string;
  seoHeadingtype: string;
}

interface AutoplayVideoSpecifics {
  mp4Url: string;
  fullscreen: boolean;
}

interface DocumentenSpecifics {
  document1Naam: string;
  document1: number;
  document2Naam: string;
  document2: number;
  document3Naam: string;
  document3: number;
  document4Naam: string;
  document4: number;
  document5Naam: string;
  document5: number;
}

interface GalerijSpecifics {
  folder: number;
  kolommenDesktop: string;
  kolommenTablet: string;
  kolommenMobile: string;
}

interface CarrouselSpecifics {
  folder: number;
}

interface EmbedSpecifics {
  tekst: string;
}

interface AccommodatiesSpecifics {
  titel: string;
  titelOpmaak: string;
  uitlijning: string;
  accommodaties?: any;
  regio?: any;
  accommodatieTypes?: any;
  vakantieTypes?: any;
  kwaliteitslabels?: any;
  aantalAccommodatiesTonen: string;
  selecteerSpecifiekeAccomodaties: string;
  features: string;
}

interface GerelateerdePaginasSpecifics {
  landingspaginaS: string;
}

interface EmbedScriptSpecifics {
  titel?: string;
  tekst?: string;
  scriptUrl: string;
  hoogte?: number;
  hoogteInPx?: string;
}

interface TestimonalSpecifics {
  customMarge: null;
  anchor: string;
  afbeelding: ElocusAfbeelding;
  auteur1: string;
  reactie1: string;
  auteur2: string;
  reactie2: string;
  auteur3: string;
  reactie3: string;
}

interface VerwanteArtikelenSpecifics {
  landingspaginas: string;
  cases: string;
  inleiding: string;
  aanvullenMet?: string;
  maximaalWeerTeGevenArtikelen: number;
  grootFormaat: string;
}

interface CasesSpecifics {
  filterWeergeven: string;
  landingspaginas: string;
  cases: string;
  inleiding: string;
  aanvullenMet?: string;
  maximaalWeerTeGevenArtikelen: number;
}

interface ReferentieSpecifics {
  mapMetLogoS: {
    _id: number;
    content: any
  };
}

interface StappenplanSpecifics {
  marginBottom: string;
  stap1Titel: string;
  stap1Tekst: string;
  stap2Titel: string;
  stap2Tekst: string;
  stap3Titel: string;
  stap3Tekst: string;
  stap4Titel: string;
  stap4Tekst: string;
}

interface QuicklinksSpecifics {
  knop1: Knop;
  knop2: Knop;
  knop3: Knop;
  knop4: Knop;
  knop5: Knop;
  knop6: Knop;
}

interface FormsSpecifics {
  formulier: string;
  link: Knop;
  formulierRechts: string;
  tekstFormulier: string;
  tekst: string;
  titelFormulier: string;
}

export type HeaderContentBlock = BasisContentBlock & HeaderSpecifics;
export type HomepageHeaderContentBlock = BasisContentBlock & HomepageHeaderSpecifics;
export type TitelContentBlock = BasisContentBlock & TitelSpecifics;
export type AfbeeldingContentBlockType = BasisContentBlock & AfbeeldingSpecifics;
export type TweeAfbeeldingenContentBlock = BasisContentBlock & TweeAfbeeldingenSpecifics;
export type TekstEenKolomsContentBlock = BasisContentBlock & TekstEenKolomsSpecifics;
export type TekstTweeKolomsContentBlock = BasisContentBlock & TekstTweeKolomsSpecifics;
export type TekstEnAfbeeldingContentBlock = BasisContentBlock & TekstEnAfbeeldingSpecifics & TekstEnVideoSpecifics;
export type VeelgesteldeVragenContentBlock = BasisContentBlock & VeelgesteldeVragenSpecifics;
export type DocumentenContentBlock = BasisContentBlock & DocumentenSpecifics;
export type VideoContentBlock = BasisContentBlock & VideoSpecifics;
export type AutoplayVideoContentBlock = BasisContentBlock & AutoplayVideoSpecifics;
export type GalerijContentBlock = BasisContentBlock & GalerijSpecifics;
export type CarrouselContentBlock = BasisContentBlock & CarrouselSpecifics;
export type EmbedContentBlock = BasisContentBlock & EmbedSpecifics;
export type AccommodatiesContentblock = BasisContentBlock & AccommodatiesSpecifics;
export type GerelateerdePaginasContentblock = BasisContentBlock & GerelateerdePaginasSpecifics;
export type EmbedScriptContentBlock = BasisContentBlock & EmbedScriptSpecifics;
export type TestimonalContentBlock = BasisContentBlock & TestimonalSpecifics;
export type VerwanteArtikelenContentBlock = BasisContentBlock & VerwanteArtikelenSpecifics;
export type CasesContentBlock = BasisContentBlock & CasesSpecifics;
export type ReferentieContentBlock = BasisContentBlock & ReferentieSpecifics;
export type StappenplanContentBlock = BasisContentBlock & StappenplanSpecifics;
export type QuicklinksContentBlock = BasisContentBlock & QuicklinksSpecifics;
export type FormsContentBlock = BasisContentBlock & FormsSpecifics;
