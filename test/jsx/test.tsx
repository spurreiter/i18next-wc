import app from 'apprun'

import i18next from "i18next"

// take care of treeshaking - removing the below line may cause that the Wc gets removed by treeshaking
import '../../src/intl-message'
import { intlMessage } from '../../src/intl-message'

import '../../src/intl-datetime'
import { intlDatetime } from '../../src/intl-datetime'

i18next.init({
  lng: "en-GB",
  fallbackLng: "en",
  resources: {
    en: {
      default: {
        title: "My {{value}}",
        deep: "{{value.key}} {{value.val}}!",
        html: "With HTML it might get {{value}}",
        item: "One item",
        item_plural: "{{count}} items",
        placeholder: 'inputs placeholder'
      },
      test: {
        key: "A value"
      }
    }
  },
  defaultNS: "default",
  fallbackNS: "global"
})

// inject i18next into web-components
const IntlMessage = (props: object) => (<intl-message { ...{i18next, ...props }} />)
const IntlDatetime = (props: object) => (<intl-datetime { ...{i18next, ...props }} />)

const state = '';

const view = () => (
  <section>
    <h1>demo with JSX</h1>

    <section>
      <h2>intl-message</h2>
      <IntlMessage key='undefined.key' />
      <IntlMessage key='test:key' />

      <IntlMessage key='title' value='Title' />
      <IntlMessage key='deep' value={{ key:'Hello', val:'World' }} />

      <IntlMessage key='html' value='<span style="color: red">dangerous</span>' />
      <IntlMessage key='html' dangerous value='<span style="color: red">dangerous</span>' />

      <IntlMessage key='item' count={1} />
      <IntlMessage key='item' count={10} />

      <input placeholder={intlMessage({i18next, key: 'placeholder'})} />
    </section>

    <section>
      <h2>intl-datetime</h2>
      <IntlDatetime />
      <IntlDatetime value='2020-03-12' />
      <IntlDatetime value={new Date('2020-03-12')} lng='en-US' />
      <IntlDatetime value='2020-03-12' options={{weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'}} />
      <IntlDatetime value='2020-03-12 17:42:12' date time weekday='long' month='long' lng='ja' />
      <IntlDatetime value='2020-03-12 12:00:00' date time timeZone='Asia/Tokyo'/>
      <IntlDatetime value='2020-03-12 12:00:00' date time timeZone='Foo/Bar'/>

      <p>as text {intlDatetime({i18next, time: true, date: true})}</p>
    </section>
  </section>
)

const update = {

};

app.start(document.body, state, view, update);
