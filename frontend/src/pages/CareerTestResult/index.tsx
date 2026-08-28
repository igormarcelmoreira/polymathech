/* eslint-disable prettier/prettier */
import { RadarChart } from "@/components/Charts/RadarChart";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import SendEmailModal from "@/components/Modals/SendEmailModal/SendEmailModal";
import SendEmailConfirmModal from "@/components/Modals/SendEmailConfirmModal/SendEmailConfirmModal";
import { useState } from "react";
import axios from 'axios'
import Cookies from 'js-cookie'

export default function CareerTestResult() {
    const navigate = useNavigate();
    const location = useLocation();
    const { detail } = location.state || {};
    const [isSendEmailModalOpen, setIsSendEmailModalOpen] =
        useState<boolean>(false);
    const [isSendResultsModalOpen, setIsSendResultsModalOpen] =
        useState<boolean>(false);

    const chartLabelMap = {
        "LOGICO-MATEMATICA": "Lógico-matemático",
        NATURALISTA: "Naturalista",
        MUSICAL: "Musical",
        INTERPESSOAL: "Interpessoal",
        LINGUISTICA: "Linguistica",
        INTRAPESSOAL: "Intrapessoal",
        "CORPORAL-CINESTESICA": "Corporal",
        ESPACIAL: "Espacial",
    };

    const chartLabels = [
        "Lógico-matemático",
        "Naturalista",
        "Musical",
        "Interpessoal",
        "Linguistica",
        "Intrapessoal",
        "Corporal",
        "Espacial",
    ];

    const handleClickCareerTest = () => {
        navigate("/home");
    };
    const handleSendEmail = () => {
        setIsSendEmailModalOpen(false);
        setIsSendResultsModalOpen(true);
    };

    const  handleUserEmail= async () => {
        const endpoint = `${import.meta.env.VITE_APP_API_URL}:${import.meta.env.VITE_APP_API_PORT}/get-email`;

        try {
            const token = Cookies.get('jwt')
            const response = await axios.post(
                endpoint,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )

            const { userEmail } = response.data;
            return userEmail;

        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.message);
            } else {
                setError("Ocorreu um erro inesperado");
            }
        }
    }

    const chartData = chartLabels.map((label) => {
        const backendKey = Object.keys(chartLabelMap).find(
            (key) => chartLabelMap[key] === label
        );
        return detail && detail.scores && backendKey
            ? detail.scores[backendKey]
            : 0;
    });

    const maxIntellTypeName =
        detail && detail.result
            ? chartLabelMap[detail.result.maxIntellTypeName]
            : detail.result.maxIntellTypeName;
    const maxIntellTypeDescription =
        detail && detail.result
            ? detail.result.maxIntellTypeDescription
            : detail.result.maxIntellTypeDescription;
    const maxIntellTypeCourses =
        detail && detail.result
            ? detail.result.maxIntellTypeCourses
            : detail.result.maxIntellTypeCourses;

    type IntellTypeName =
        | "Lógico-matemático"
        | "Naturalista"
        | "Musical"
        | "Interpessoal"
        | "Linguistica"
        | "Intrapessoal"
        | "Corporal"
        | "Espacial";

    interface Props {
        maxIntellTypeName: IntellTypeName;
    }
    const imageMap: Record<IntellTypeName, string> = {
        "Naturalista": "src/assets/images/naturalistaIcon.png",
        "Lógico-matemático": "src/assets/images/matematicoIcon.png",
        "Musical": "src/assets/images/musicalIcon.png",
        "Interpessoal": "src/assets/images/interpessoalIcon.png",
        "Linguistica": "src/assets/images/gramaticaIcon.png",
        "Intrapessoal": "src/assets/images/intrapessoalIcon.png",
        "Corporal": "src/assets/images/corporalIcon.png",
        "Espacial": "src/assets/images/espacialIcon.png",
    };

    const IntelligenceImage: React.FC<Props> = ({ maxIntellTypeName }) => {
        const imageUrl = imageMap[maxIntellTypeName];

        return <img src={imageUrl} alt={maxIntellTypeName} />;
    };

    return (
        <div className={styles.bodyBackground}>
            <div className={styles.container}>
                <div className={styles.resultado}>
                    <div className={styles.resultadoTexto}>
                        <span className={styles.titulo}>{maxIntellTypeName}</span>
                        <IntelligenceImage
                            maxIntellTypeName={maxIntellTypeName as IntellTypeName}
                        />

                        <span className={styles.paragrafo}>{maxIntellTypeDescription}</span>
                    </div>
                    <RadarChart data={chartData} />
                </div>
                {maxIntellTypeCourses &&
                    maxIntellTypeCourses.map((course, index) => (
                        <div className={styles.licenciatura} key={index}>
                            <div className={styles.licenciaturaTexto}>
                                <span className={styles.titulo}>{course.name}</span>
                                <span className={styles.paragrafo}>{course.description}</span>
                            </div>
                        </div>
                    ))}
                <div className={styles.buttonContainer}>
                    <button
                        className={styles.button}
                        onClick={() => setIsSendEmailModalOpen(true)}
                    >
                        Mandar resultado por email
                    </button>
                    <SendEmailModal
                        isOpen={isSendEmailModalOpen}
                        onClose={() => setIsSendEmailModalOpen(false)}
                        onSend={handleSendEmail}
                        maxIntellTypeName={maxIntellTypeName}
                        maxIntellTypeDescription={maxIntellTypeDescription}
                        maxIntellTypeCourses={maxIntellTypeCourses}
                    />
                    
                    <button className={styles.button} onClick={handleClickCareerTest}>
                        Voltar para a Home
                    </button>
                </div>
            </div>
        </div>
    );
}
