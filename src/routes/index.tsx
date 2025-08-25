import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from '@ns-tech/config-i18n'

import logo from '../logo.svg'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const { t } = useTranslation()

  return (
    <div className='text-center'>
      <header className='min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]'>
        <img
          src={logo}
          className='h-[40vmin] pointer-events-none animate-[spin_20s_linear_infinite]'
          alt='logo'
        />

        {/* INTERNACIONALIZAÇÃO */}
        <section className='mt-4'>
          <p>
            {t('greeting', { name: 'Rodrigo' })} {t('welcome')}
          </p>
        </section>

        <section className='flex flex-col gap-1 mt-8'>
          <a
            className='text-[#61dafb] hover:underline'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            {t('learn')} React
          </a>
          <a
            className='text-[#61dafb] hover:underline'
            href='https://tanstack.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            {t('learn')} TanStack
          </a>
        </section>
      </header>
    </div>
  )
}
