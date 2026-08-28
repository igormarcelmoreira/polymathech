import React from 'react' // Required for JSX syntax
import styles from './Sidebar.module.css'
import { Link } from 'react-router-dom'

// Define the prop type, ensuring path is a string
interface SidebarItemProps {
  imagePath: string
  label: string
  page: string
  active: boolean
  onClick?: React.MouseEventHandler<HTMLSpanElement>
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  imagePath,
  label,
  page,
  active,
  onClick,
}) => {
  if (onClick) {
    return (
      <span className={styles.itemContainer} onClick={onClick}>
        <span className={styles.linkSidebar}>
          <img
            className={active ? styles.itensHover : styles.itens}
            src={imagePath}
            alt="Sidebar item"
          />
          <h5 className={active ? styles.itemLabelHover : styles.itemLabel}>
            {label}
          </h5>
        </span>
      </span>
    )
  }

  return (
    <span className={styles.itemContainer}>
      <Link className={styles.linkSidebar} to={page}>
        <img
          className={active ? styles.itensHover : styles.itens}
          src={imagePath}
          alt="Sidebar item"
        />
        <h5 className={active ? styles.itemLabelHover : styles.itemLabel}>
          {label}
        </h5>
      </Link>
    </span>
  )
}
