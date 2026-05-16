'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

interface ModalContextValue {
  isDevisOpen: boolean
  openDevis: () => void
  closeDevis: () => void
}

const ModalContext = createContext<ModalContextValue>({
  isDevisOpen: false,
  openDevis: () => {},
  closeDevis: () => {},
})

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isDevisOpen, setIsDevisOpen] = useState(false)

  return (
    <ModalContext.Provider
      value={{
        isDevisOpen,
        openDevis: () => setIsDevisOpen(true),
        closeDevis: () => setIsDevisOpen(false),
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  return useContext(ModalContext)
}
