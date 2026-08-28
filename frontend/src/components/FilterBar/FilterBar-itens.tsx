import React from 'react'
import styles from './FilterBar.style.module.css'

interface FilterBarItemProps {
  imagePath: string
  element?: JSX.Element
  active: boolean
  click: () => void
}

export const FilterBarItem: React.FC<FilterBarItemProps> = ({ imagePath, element, active , click }) => {
  return (
    <>
      <div className={styles.sideMenu}>
        {active ? element : null}
      </div>
      <span className={styles.itemContainer} onClick={click}>
        <img className={active ? styles.itensHover : styles.itens} src={imagePath} alt="Filter Bar item" />
      </span>
    </>
  )
}
