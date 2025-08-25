import { Link } from '@tanstack/react-router'
import { BtnSwitchLang } from './BtnSwitchLang'

export default function Header() {
  return (
    <header className='p-2 flex gap-2 bg-white text-black justify-between'>
      <nav className='flex flex-row flex-1 justify-between'>
        <div className='flex'>
          <div className='px-2 font-bold'>
            <Link to='/'>Home</Link>
          </div>

          <div className='px-2 font-bold'>
            <Link to='/demo/tanstack-query'>TanStack Query</Link>
          </div>
        </div>

        <BtnSwitchLang />
      </nav>
    </header>
  )
}
