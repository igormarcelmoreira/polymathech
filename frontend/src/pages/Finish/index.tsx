/* eslint-disable prettier/prettier */
import { Botao } from "@/components/Buttons/ButtonSample";
import { Footer } from "@/components/Footers/Footer";
import { useNavigate } from 'react-router-dom';
import styles from "./finish.module.css";

export default function Finish() {
  const navigate = useNavigate()
  
  const handleClickLogin = () => { 
    navigate("/login");
  };

  return (
    <div className={styles.bodyBackground}>
      <div className={styles.container}>
        <div className={styles.progressBar}>
          <div className={styles.beginStatusDiv}>
            <img
              className={styles.beginStatusPhoto}
              src="src/assets/images/begin-statusbar.png"
              alt="begin"
            />
            <img
              className={styles.serverLogo}
              src="src/assets/images/Server.png"
              alt="server"
            />
            <p className={styles.infoText}>Informações cadastrais</p>
          </div>
          <hr />
          <div className={styles.endStatusDiv}>
            <img
              className={styles.endStatusPhoto}
              src="src/assets/images/end-statusbar.png"
              alt="end"
            />
            <img
              className={styles.userLogo}
              src="src/assets/images/User.png"
              alt="user"
            />
            <p className={styles.concText}>Conclusão</p>
          </div>
        </div>
        <div className={styles.congrats}>
          <div className={styles.congratsImages}>
            <img src="src/assets/images/check_ring.png" alt="" />
            <img src="src/assets/images/parabens.png" alt="" />
          </div>
          <div className={styles.congratsTexts}>
            <h3>Você acaba de concluir seu cadastro.</h3>
            <h3>Começe agora mesmo sua jornada clicando no botão abaixo.</h3>
          </div>
          <Botao onClick={handleClickLogin} text="Logar" className={styles.congratsButton} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
