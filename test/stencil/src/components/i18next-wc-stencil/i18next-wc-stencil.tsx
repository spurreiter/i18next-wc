import { Component, ComponentInterface, Host, h } from '@stencil/core';

import i18next from 'i18next';
// import 'i18next-wc';
import '../../../../../dist/index.js'

declare global {
  interface Window {
    i18next: any;
  }
}
window.i18next = i18next;

i18next.init({
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: {
      test: {
        title: "My title",
        body: "My body"
      },
      default: {
        key: "A value"
      },
      global: {
        undefined: "Please give a value"
      }
    }
  },
  defaultNS: "default",
  fallbackNS: "global"
})

@Component({
  tag: 'i18next-wc-stencil',
  shadow: true,
})
export class I18nextWcStencil implements ComponentInterface {
  render() {
    return (
      <Host>
        <slot></slot>
        <intl-message label="test:title" id="test1"></intl-message>
        <intl-message label="test:body" id="test2"></intl-message>
        <intl-message label="key" id="test3"></intl-message>
        <intl-message label="undefined" id="test4"></intl-message>
        <intl-message key="test:title" id="test5"></intl-message>
      </Host>
    );
  }

}
