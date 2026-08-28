/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import DiscordModal from '@/components/Modals/DiscordModal/DiscordModal'
import VocationalTestModal from '@/components/Modals/VocationalTestModal/VocationalTestModal'
import { useState } from 'react'
import { SidebarItem } from './Sidebar-itens'
import styles from './Sidebar.module.css'

export function Sidebar() {
  // eslint-disable-next-line prettier/prettier
  const [isDiscordModalOpen, setIsDiscordModalOpen] = useState<boolean>(false)
  const [isVocationalTestModalOpen, setIsVocationalModalOpen] = useState<boolean>(false)
  return (
    <div className={styles.sidebar}>
      <img className={styles.logo} src="src/assets/images/Logo.png" alt="" />

      <SidebarItem
        imagePath="src/assets/images/home.svg"
        label="HOME"
        page="/home"
        active={true}
      />
      <SidebarItem
        imagePath="src/assets/images/testeIcon.svg"
        label="TESTE VOCACIONAL"
        page="/careerTest"
        active={false}
        onClick={() => { setIsVocationalModalOpen(true); setIsDiscordModalOpen(false) }}
      />
      <SidebarItem
        imagePath="src/assets/images/studyRoomIcon.svg"
        label="SALA DE ESTUDO"
        page="https://discord.gg/A43HdPEdDj"
        active={false}
        onClick={() => { setIsDiscordModalOpen(true); setIsVocationalModalOpen(false) }}
      />
      <DiscordModal
        isOpen={isDiscordModalOpen}
        onClose={() => setIsDiscordModalOpen(false)}
      />
      <VocationalTestModal
        isOpen={isVocationalTestModalOpen}
        onClose={() => setIsVocationalModalOpen(false)}
      />
    </div>
  )
}
