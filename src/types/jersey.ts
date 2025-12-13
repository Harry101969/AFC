export interface JerseyConfig {
  primaryColor: string;
  secondaryColor: string;
  logoUrl: string;
  frontNumber: string;
  backName: string;
  backNumber: string;
  pattern: PatternType;
}

export type PatternType = 'plain' | 'stripes' | 'diagonal' | 'texture';

export interface JerseyVariant {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  pattern: PatternType;
}

export interface ColorOption {
  name: string;
  value: string;
}
