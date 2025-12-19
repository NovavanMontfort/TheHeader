export interface Page {
  _id: number;
  content: {
    titel: string;
    slug: string;
    sortering: number;
    afbeelding: number;
  };
  metadata: {
    titel: string;
    indexeren: string;
    canonical: string;
    omschrijving: string;
    afbeelding: number;
  };
}

export interface Redirect {
  sourtce: string;
  permanent: boolean;
  destination: string;
  content: {
    naarUrl: string;
    permanent: boolean;
    vanUrl: string;
  };
}

export interface Language {
  id: number;
  title: string;
  name: string;
}

export interface NavigationItem {
  id: number;
  name: string;
  url: string;
  children: NavigationItem[];
}

export interface Navigation {
  id: number;
  name: string;
  url: string;
  children: NavigationItem[];
}

export interface CaseItem {
  _id: number;
  content: {
    slug: string;
    titel: string;
    subtitel: string;
    inleiding: string;
    tekst: string;
    vimeoYoutubeLink: string;
    sortering: number;
    afbeelding1200X900: number;
    logo285X175MargeAanZijden: number;
    transparantLogo400X400MargeAanZijden: number;
    uitlijning: string;
    branch: number;
    weergave: number;
    tags: string;
    url: string;
    tekstkleur: string;
    achtergrondKleur: string;
  };
}

export interface ElocusSettings {
  name: string;
  url: string;
  localization: {
    multiLanguage: boolean;
    defaultLanguage: Language;
    languages: Language[];
  };
  contentModules: {
    id: number;
    name: string;
  }[];
}

export interface Translation {
  label: string;
  translation: string;
}

export interface Language {
  id: number;
  title: string;
  name: string;
}

export type TranslationKey = 'Lees meer' | 'Volgende' | 'Vorige';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
