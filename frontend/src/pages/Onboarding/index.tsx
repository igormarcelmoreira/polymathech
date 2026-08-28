/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Botao } from '@/components/Buttons/ButtonSample'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import styles from './onboarding.style.module.css'

export default function Onboarding() {
  const navigate = useNavigate()

  const handleLoginClick = () => {
    if (!Cookies.get('jwt')) {
      navigate('/login')
    } else {
      navigate('/home')
      window.location.reload()
    }
  }

  const handleRegisterClick = () => {
    navigate('/register')
  }

  return (
    <div className={styles.bodyBackground}>
      <div className={styles.container}>
        <div className={styles.loginDiv}>
          <Botao onClick={handleLoginClick} text={'LOGIN'} />
        </div>
        <div className={styles.titleTextDiv}>
          <div className={styles.titleDiv}>
            <h1 className={styles.title1}> POLY </h1>
            <h1 className={styles.title2}> MATHECH </h1>
          </div>
          <p className={styles.text}>
            {' '}
            Conheça melhor a si mesmo, escolha a carreira adequada para você,
            estabeleça metas, estude com os seus amigos e comece sua jornada!
          </p>
          <div className={styles.registerDiv}>
            <Botao onClick={handleRegisterClick} text={'REGISTRE-SE'} />
          </div>
        </div>
        <div className={styles.test}>
          <div className={styles.BottomDiv}>
            <div className={styles.ElementsContentDiv}>
              <div className={styles.ElementsDiv}>
                <img
                  src="../../../src/assets/images/circuloRoxoPlaca.png"
                  alt=""
                />
                <h2 className={styles.TitleBottom}> TESTE VOCACIONAL </h2>
              </div>
              <p className={styles.textBottom}>
                {' '}
                Faça um teste vocacional para descobrir a profissão mais adequada
                a você e receba conselhos de carreira.{' '}
              </p>
            </div>
            <div className={styles.ElementsContentDiv}>
              <div className={styles.ElementsDiv}>
                <img
                  src="../../../src/assets/images/circuloRosaLivro.png"
                  alt=""
                />
                <h2 className={styles.TitleBottom}> SALAS DE ESTUDO </h2>
              </div>
              <p className={styles.textBottom}>
                {' '}
                Estude em qualquer ambiente, em qualquer som, com o método de
                estudo que desejar e registre suas horas.{' '}
              </p>
            </div>
            <div className={styles.ElementsContentDiv}>
              <div className={styles.ElementsDiv}>
                <img
                  src="../../../src/assets/images/circuloAzulSelo.png"
                  alt=""
                />
                <h2 className={styles.TitleBottom}> LISTA DE METAS </h2>
              </div>
              <p className={styles.textBottom}>
                {' '}
                Decida, mantenha, conclua e analise todas suas metas de estudo a
                qualquer momento.{' '}
              </p>
            </div>
        </div>
      </div>

      </div>
    </div>
  )
}
