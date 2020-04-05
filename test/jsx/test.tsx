import app from 'apprun'

import i18next from "i18next"

// take care of treeshaking - removing the below line may cause that the Wc gets removed by treeshaking
import '../../src'
import { intlMessage, intlDatetime, intlRelativeTime, intlNumber } from '../../src'

// our app state
const state = 'en-GB'

// initialize i18next
i18next.init({
  lng: state,
  fallbackLng: "en",
  resources: {
    en: {
      default: {
        title: "My {{value}}",
        deep: "In English: {{value.key}} {{value.val}}!",
        html: "With HTML it might get {{value}}",
        item: "One item",
        item_plural: "{{count}} items",
        placeholder: 'fill in here',
        'Selected language': 'Selected language:'
      },
      test: {
        key: "A value"
      }
    },
    'en-US': {
      default: {
        deep: "In US English: {{value.key}} {{value.val}}!"
      }
    },
    fr: {
      default: {
        title: "Mon {{value}}",
        deep: "En anglais: {{value.key}} {{value.val}} !",
        html: "Avec le HTML, cela pourrait devenir {{value}}",
        item: "Un seul article",
        item_plural: "{{count}} articles",
        placeholder: 'remplir ici',
        'Selected language': 'Langue choisie :'
      },
      test: {
        key: "une valeur"
      }
    }
  },
  defaultNS: "default",
  fallbackNS: "global"
})

// inject i18next into web-components
const IntlMessage = (props: object) => (<intl-message { ...{i18next, ...props }} />)
const IntlDatetime = (props: object) => (<intl-datetime { ...{i18next, ...props }} />)
const IntlRelativeTime = (props: object) => (<intl-relative-time { ...{i18next, ...props }} />)
const IntlNumber = (props: object) => (<intl-number { ...{i18next, ...props }} />)

// our view
const view = (state: string) => (
  <section>
    <h1>demo with JSX</h1>

    <p><IntlMessage key='Selected language' /> <strong>{state}</strong></p>
    <button onclick={() => app.run('lng', 'en-GB')}>en-GB</button>
    <button onclick={() => app.run('lng', 'en-US')}>en-US</button>
    <button onclick={() => app.run('lng', 'fr')}>fr</button>
    <button onclick={() => app.run('lng', 'ar')}>ar</button>
    <button onclick={() => app.run('lng', 'zh-CN')}>zh-CN</button>

    <section>
      <h2>intl-message</h2>
      <IntlMessage key='deep' value={{ key:'Hello', val:'World' }} />
      <IntlMessage key='html' value='<span style="color: red">dangerous</span>' />
      <IntlMessage key='html' dangerous value='<span style="color: red">dangerous</span>' />
      <IntlMessage key='item' count={1} />
      <IntlMessage key='item' count={10} />
      <p><input placeholder={intlMessage({i18next, key: 'placeholder'})} /></p>
    </section>

    <section>
      <h2>intl-datetime</h2>
      <IntlDatetime />
      <IntlDatetime value='2020-03-12' />
      <IntlDatetime value={new Date('2020-03-12')} lng='en-US' />
      <IntlDatetime value='2020-03-12' options={{weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'}} />
      <IntlDatetime value='2020-03-12 12:00:00' date time timeZone='Asia/Tokyo'/>
      <p>as text: "{intlDatetime({i18next, time: true, date: true})}"</p>
    </section>

    <section>
      <h2>intl-relative-time</h2>
      <IntlRelativeTime numeric='auto'/>
      <IntlRelativeTime value={new Date(Date.now() - (3 * 7 * 24 * 3600000))} />
      <p>as text: "{intlRelativeTime({i18next})}"</p>
    </section>

    <section>
      <h2>intl-number</h2>
      <IntlNumber />
      <IntlNumber value={123456.789} />
      <IntlNumber value={123456.789} options={{"style":"currency","currency":"EUR"}} />
      <IntlNumber value={123456.789} styleProp="currency" currency="JPY" />
      <IntlNumber value={50} styleProp="unit" unit="mile-per-hour" />
      <IntlNumber value={987654321} notation="scientific" />
      <IntlNumber value="987654321" notation="engineering" />
      <IntlNumber value={987654321} notation="compact" />
      <p>as text: "{intlNumber({i18next, value: 987654321, notation: 'compact'})}"</p>
    </section>
  </section>
)

const update = {
  lng: (state: string, nextState: string): string => {
    i18next.changeLanguage(nextState)
    return nextState
  }
}

app.start(document.body, state, view, update)
