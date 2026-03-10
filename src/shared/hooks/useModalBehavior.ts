import { useEffect } from 'react'

type UseModalBehaviorParams = {
  isOpen: boolean
  onClose: () => void
}

export const useModalBehavior = ({
  isOpen,
  onClose,
}: UseModalBehaviorParams) => {
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])
}
