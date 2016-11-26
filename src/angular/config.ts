import * as ts from 'typescript';
import {CodeWithSourceMap} from './metadata';

export interface UrlResolver {
  (url: string, d: ts.Decorator): string;
}

export interface TemplateTransformer {
  (template: string, url: string, d: ts.Decorator): CodeWithSourceMap;
}

export interface StyleTransformer {
  (style: string, url: string, d: ts.Decorator): CodeWithSourceMap;
}

export const LogLevel = {
  None: 0,
  Error: 0b001,
  Info: 0b011,
  Debug: 0b111
};

export interface Config {
  interpolation: [string, string];
  resolveUrl: UrlResolver;
  transformTemplate: TemplateTransformer;
  transformStyle: StyleTransformer;
  predefinedDirectives: DirectiveDeclaration[];
  logLevel: number;
}

export interface DirectiveDeclaration {
  selector: string;
  exportAs: string;
}

export const Config: Config = {
  interpolation: ['{{', '}}'],

  resolveUrl(url: string, d: ts.Decorator) {
    return url;
  },

  transformTemplate(code: string, url: string, d: ts.Decorator) {
    return { code, url };
  },

  transformStyle(code: string, url: string, d: ts.Decorator) {
    return { code, url };
  },

  predefinedDirectives: [
    { selector: 'form', exportAs: 'ngForm' }
  ],

  logLevel: LogLevel.None
};

const root = require('app-root-path');

try {
  let newConfig = require(root.path + '/.codelyzer');
  Object.assign(Config, newConfig);
} catch (e) {
  console.info('Cannot find ".codelyzer.js" in the root of the project');
}
