import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing' ;
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
 } from '@angular/platform-browser-dynamic/testing' ;

declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp):{
    <T>(id: string): T ;
    keys(): string[];
  }
} ;

// First, initial ize the Angular test ing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  );

  // Then we f ind all the tests.
const context = require.context('./', true, /\.spec\.ts$/);

// And load the modules.
context.keys().map(context);
