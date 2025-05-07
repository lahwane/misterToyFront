import { Trans, useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

export function AppHeader() {
  const { t, i18n } = useTranslation()

  const lngs = {
    en: { nativeName: 'English' },
    es: { nativeName: 'Spanish' },
  }

  return (
    <section className="app-header">
      <div className="flex justify-between">
        <nav>
          <NavLink to="/">{t('home')}</NavLink> |
          <NavLink to="/toy">{t('toys')}</NavLink> |
          <NavLink to="/dashboard">{t('dashboard')}</NavLink> |
          <NavLink to="/about">{t('about')}</NavLink>
        </nav>
        <div>
          <Trans i18nKey="i18">{{ name: 'batel' }}</Trans>
          {Object.keys(lngs).map(lng => (
            <button
              type="submit"
              key={lng}
              onClick={() => i18n.changeLanguage(lng)}
              disabled={i18n.resolvedLanguage === lng}
            >
              {lngs[lng].nativeName}
            </button>
          ))}
        </div>
      </div>
      <div className="logo">Mister Toy</div>
    </section>
  )
}
