import { Botao } from '@/components/Buttons/ButtonSample'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './carrerTest.module.css'

export default function CareerTest() {
  const navigate = useNavigate()
  const [selectedAnswers, setSelectedAnswers] = useState(Array(32).fill(null))
  const [currentPage, setCurrentPage] = useState(0)
  const [questions, setQuestions] = useState([])
  const [error, setError] = useState<string | null>(null)
  const [showFinishButton, setShowFinishButton] = useState(false)

  const backButton = 'src/assets/images/Refund_back.png'
  const notCompleted = 'src/assets/images/begin-statusbar.png'

  const questionContainerRef = useRef(null);

  useEffect(() => {
    fetchQuestions(0)
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (questionContainerRef.current) {
      window.scrollTo(0, 0)
    }
  }, [currentPage])

  const answerOptions = [
    'Discordo Completamente',
    'Discordo parcialmente',
    'Neutro',
    'Concordo parcialmente',
    'Concordo Completamente',
  ]

  const pageRanges = ['1-8', '9-16', '17-24', '25-32']

  const handleAnswerClick = (questionIndex: number, optionIndex: number) => {
    setSelectedAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers]
      updatedAnswers[questionIndex] = optionIndex
      return updatedAnswers
    })
  }

  const checkAllAnswersSelectedForPageRange = (pageIndex: number) => {
    const startIndex = pageIndex * 8
    const endIndex = startIndex + 8
    return selectedAnswers
      .slice(startIndex, endIndex)
      .every((answer) => answer !== null)
  }

  const handleRangeClick = async (index: number) => {
    await fetchQuestions(index)
    setCurrentPage(index)
    setShowFinishButton(index === pageRanges.length - 1)
    if (questionContainerRef.current) {
      questionContainerRef.current.scrollTo(0, 0);
    }
  }

  const getQuestionsForCurrentPage = () => {
    return questions
  }

  async function fetchQuestions(index: number) {
    try {
      const page = index + 1
      const pageSize = 8
      const endpoint = `${import.meta.env.VITE_APP_API_URL}:${import.meta.env.VITE_APP_API_PORT}/questions?page=${page}&pageSize=${pageSize}`
      const response = await axios.get(endpoint)

      setQuestions(response.data.data)
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message)
      } else {
        setError('Ocorreu um erro inesperado')
      }
    }
  }

  const handleClickCareerTest = async () => {
    console.log(selectedAnswers)

    const checkNullAnswers = selectedAnswers.every((item) => item !== null)

    if (checkNullAnswers) {
      const token = Cookies.get('jwt')

      const answerValues = selectedAnswers.map((value, index) => ({
        question_number: index + 1,
        question_value: value,
      }))

      const resultEndpoint = `${import.meta.env.VITE_APP_API_URL}:${import.meta.env.VITE_APP_API_PORT}/test-results`
      const response = await axios.post(
        resultEndpoint,
        {
          answer_values: answerValues,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      console.log(response.data)

      navigate('/careerTestResult', { state: { detail: response.data } })
    }
  }

  const handleGoBackRequest = () => {
    navigate('/home')
  }

  const handleNextClick = () => {
    const nextPage = currentPage + 1
    handleRangeClick(nextPage)
  }

  return (
    <body className={styles.bodyBackground}>
      <div className={styles.container}>
        <div className={styles.pageNumDiv}>
          <img
            src={backButton}
            className={styles.backButton}
            onClick={handleGoBackRequest}
            alt="Back"
          />
          {pageRanges.map((range, index) => (
            <div
              key={index}
              className={styles.pageNumItem}
              onClick={() => handleRangeClick(index)}
            >
              <img
                src={notCompleted}
                alt={range}
                className={`${styles.answer}  ${checkAllAnswersSelectedForPageRange(index) ? styles.allAnswersSelected : ''}`}
              />
              <span className={styles.pageNumText}>{range}</span>
            </div>
          ))}
        </div>
        <div ref={questionContainerRef} className={styles.questionContainer}>
          <div>
            {getQuestionsForCurrentPage().map((question, questionIndex) => (
              <div key={questionIndex} className={styles.questionSpace}>
                <h1
                  className={styles.question}
                >{`${question.question_number}) ${question.question_text}`}</h1>
                <div className={styles.answerSpace}>
                  {answerOptions.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={styles.answerDiv}
                      onClick={() =>
                        handleAnswerClick(
                          question.question_number - 1,
                          optionIndex,
                        )
                      }
                    >
                      <img
                        src={notCompleted}
                        alt={option}
                        className={`${styles.answer} ${
                          selectedAnswers[currentPage * 8 + questionIndex] ===
                          optionIndex
                            ? styles.selectedAnswer
                            : ''
                        }`}
                      />
                      <label>{option}</label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <span />
          <div className={styles.buttonsSpace}>
            {showFinishButton ? (
              <Botao
                text="Concluir"
                onClick={handleClickCareerTest}
                className={styles.finishButton}
              />
            ) : (
              <Botao
                text="Próximo"
                onClick={handleNextClick}
                className={styles.finishButton}
              />
            )}
          </div>
        </div>
      </div>
    </body>
  )
}
