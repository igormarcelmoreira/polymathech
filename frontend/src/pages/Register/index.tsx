/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Footer } from '@/components/Footers/Footer';
import LensIcon from '@mui/icons-material/Lens';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Checkbox, FormControlLabel, IconButton, InputAdornment, Link, MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from './register.module.css';

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [education, setEducation] = useState('')
  const [gender, setGender] = useState('')
  const [terms, setTerms] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleSignUpClick = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(terms);

    if (!verifyRequired()) {
      return
    }

    if (password !== confirmPassword) {
      setError('A confirmação de senha não confere.')
      return
    }
    if (password.length < 8) {
      setError('O tamanho mínimo da senha é 8 caracteres.')
      return
    }
    if (!terms) {
      setError('Aceite os termos para cadastrar.')
      return
    }
    const endpoint = `${import.meta.env.VITE_APP_API_URL}:${import.meta.env.VITE_APP_API_PORT}/accounts` // Your actual NestJS API endpoint for sign-up

    try {
      await axios.post(endpoint, {
        name,
        email,
        password, // Ensure your backend hashes this before saving
        birthdate,
        role: 'USER',
        education,
        gender,
      })

      // Redirect to a confirmation page, sign-in page, or other as needed
      navigate('/finish') // Example redirection
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message)
      } else {
        setError('Ocorreu um erro inesperado')
      }
    }
  }

  const verifyRequired = () => {

    if (isEmpty(name) ||
      isEmpty(password) ||
      isEmpty(confirmPassword) ||
      isEmpty(email)) {
      setError('Por favor, preencha todos os campos obrigatorios!')
      return false;
    }
    return true;
  }

  const isEmpty = (e: string | null | undefined) => {

    if (e === null || e === undefined || e === "") {
      return true
    }
    return false
  }
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const degrees = [
    {
      value: 'FUNDAMENTAL',
      label: 'Fundamental',
    },
    {
      value: 'MEDIO',
      label: 'Ensino Médio',
    },
    {
      value: 'GRADUACAO',
      label: 'Graduação',
    },
    {
      value: 'POSGRADUACAO',
      label: 'Pós-Graduação',
    },
    {
      value: 'MESTRADO',
      label: 'Mestrado',
    },
    {
      value: 'DOUTORADO',
      label: 'Doutorado',
    },
  ];

  const genders = [
    {
      value: 'HOMEM',
      label: 'Homem',
    },
    {
      value: 'MULHER',
      label: 'Mulher',
    },
    {
      value: 'OUTRO',
      label: 'Outro',
    }
  ];


  return (
    <div className={styles.bodyBackground}>
      <div className={styles.container}>
        <div className={styles.progressBar}>
          <div className={styles.beginStatusDiv}>
            <img className={styles.beginStatusPhoto} src="src/assets/images/begin-statusbar.png" alt="begin" />
            <img className={styles.serverLogo} src="src/assets/images/Server.png" alt="server" />
            <p className={styles.infoText}>Informações cadastrais</p>
          </div>
          <hr />
          <div className={styles.endStatusDiv}>
            <img className={styles.endStatusPhoto} src="src/assets/images/end-statusbar.png" alt="end" />
            <img className={styles.userLogo} src="src/assets/images/User.png" alt="user" />
            <p className={styles.concText}>Conclusão</p>
          </div>
        </div>
        <h1>CADASTRO</h1>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1 },
            input: { color: "#B0B8BC" }
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <div className={styles.component}>
              <TextField
                required
                id="outlined-name"
                label="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputLabelProps={{ style: { color: "#B0B8BC" } }}
                InputProps={{ sx: { borderRadius: 10, backgroundColor: "#422B63", width: '55ch', boxShadow: 3 } }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Data de Nascimento"
                  onChange={(e) => setBirthdate(e !== null ? e?.toISOString() : "")}
                  format='DD/MM/YYYY'
                  // InputAdornmentProps={{
                  //   style: {
                  //     "& .MuiButtonBase-root": {
                  //       color: "orange",
                  //     },
                  //  },
                  // }}
                  slotProps={{
                    textField: {
                      sx: {
                        color: '#B0B8BC',
                        borderRadius: '30px',
                        borderWidth: '0px',
                        borderColor: '#e91e63',
                        width: '29ch',
                        border: '0px solid',
                        boxShadow: 3,
                        backgroundColor: '#422B63'
                      }
                    }
                  }}
                />
              </LocalizationProvider>
            </div>
            <TextField
              required
              id="outlined-email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{ style: { color: "#B0B8BC" } }}
              InputProps={{ sx: { borderRadius: 10, backgroundColor: "#422B63", boxShadow: 3, width: '85ch' } }}
            />
            <TextField
              required
              label="Senha"
              InputLabelProps={{ style: { color: "#B0B8BC" } }}
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                sx: { borderRadius: 10, boxShadow: 3, backgroundColor: "#422B63", width: '85ch', justifyContent: 'space-between' },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      color='secondary'
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <TextField
              required
              label="Confirme sua senha"
              InputLabelProps={{ style: { color: "#B0B8BC" } }}
              variant="outlined"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                sx: { borderRadius: 10, boxShadow: 3, backgroundColor: "#422B63", width: '85ch', justifyContent: 'space-between' },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="confirm password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownConfirmPassword}
                      edge="end"
                      color='secondary'
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <TextField
              id="outlined-select-gender"
              select
              label="Gênero"
              InputLabelProps={{ style: { color: "#B0B8BC" } }}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              variant="outlined"
              InputProps={{ sx: { borderRadius: 10, boxShadow: 3, backgroundColor: "#422B63", width: '22ch', color: "#B0B8BC" } }}
            >
              {genders.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-degree"
              select
              label="Grau de escolaridade"
              InputLabelProps={{ style: { color: "#B0B8BC" } }}
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              variant="outlined"
              InputProps={{ sx: { borderRadius: 10, boxShadow: 3, backgroundColor: "#422B63", width: '61ch', color: "#B0B8BC"} }}
            >
              {degrees.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <FormControlLabel className={styles.component} required control={<Checkbox
              icon={<LensIcon />}
              value={terms}
              onChange={(_e, c) => setTerms(c)}
              id="outlined-check-terms"
              checkedIcon={<RadioButtonCheckedIcon />} sx={{
                color: "#B0B8BC", boxShadow: 3,
                '&.Mui-checked': {
                  color: "#B0B8BC",
                },
              }} />} label={
                <span>
                  Aceito os{' '}
                  <Link href="">Termos e Condições</Link>
                </span>
              } />
          </div>
        </Box>
        <div className={styles.endRegisterDiv}>
          <button className={styles.signUpButton} onClick={handleSignUpClick}>
            Registrar
          </button>
          {error && <p className={styles.errorWarning}>{error}</p>}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
