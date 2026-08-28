import React, { useState, useEffect } from 'react'
import styles from './SendEmailModal.module.css'
import emailjs from '@emailjs/browser'
import axios from 'axios'
import Cookies from 'js-cookie'

interface Course {
  name: string
  description: string
}

interface SendEmailModalProps {
  isOpen: boolean
  onClose: () => void
  onSend: () => void
  maxIntellTypeName: string
  maxIntellTypeDescription: string
  maxIntellTypeCourses: Course[]
}

const SendEmailModal: React.FC<SendEmailModalProps> = ({
  isOpen,
  onClose,
  onSend,
  maxIntellTypeName,
  maxIntellTypeDescription,
  maxIntellTypeCourses,
}) => {
  const [userEmail, setUserEmail] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserEmail = async () => {
      const endpoint = `${import.meta.env.VITE_APP_API_URL}:${import.meta.env.VITE_APP_API_PORT}/get-email`
      try {
        const token = Cookies.get('jwt')
        const response = await axios.post(
          endpoint,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setUserEmail(response.data)
        setEmail(response.data)
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data.message)
        } else {
          setError('Ocorreu um erro inesperado')
        }
      }
    }

    if (isOpen) {
      fetchUserEmail()
    }
  }, [isOpen])

  const handleSend = async () => {
    if (userEmail === '') {
      alert('Email vazio')
      return
    }

    const formattedCourses = maxIntellTypeCourses
      .map((course) => `${course.name}: ${course.description}`)
      .join(', \n')

    const templateParams = {
      message: `Parabéns, você concluiu o teste Vocacional da Polymathech!
       Seus resultados são:
       Tipo de Inteligência: ${maxIntellTypeName}, 
       Descrição Motivacional: ${maxIntellTypeDescription}, 
       Cursos Recomendados: 
       ${formattedCourses}`,
      email,
    }

    console.log('templateParams:', templateParams)
    console.log('userEmail:', userEmail)

    emailjs
      .send(
        'service_402ev5g',
        'template_x8bqwuw',
        templateParams,
        'ZwjPC0AqMrDKyFZzm',
      )
      .then(
        (response) => {
          console.log('Email enviado com sucesso:', response.status, response.text)
          onSend()
        },
        (err) => {
          console.log('Erro ao enviar email:', err)
        }
      )
  }

  if (!isOpen) return null

  return (
    <div className={styles.div}>
      <button onClick={onClose} className={styles.closeButton}>
        X
      </button>
      <h2>Resultado do Teste</h2>
      {error && <p className={styles.error}>{error}</p>}
      <h4>O email para qual o teste será enviando é:</h4>
      <p className={styles.emailDisplay}>{userEmail}</p>
      <button className={styles.sendButton} onClick={handleSend}>
        ENVIAR
      </button>
    </div>
  )
}

export default SendEmailModal
