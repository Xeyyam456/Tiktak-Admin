import { useEffect } from 'react'

export function useTitle(title) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = title ? `${title} · Tik Tak Admin` : 'Tik Tak Admin'

    return () => {
      document.title = previousTitle
    }
  }, [title])
}
