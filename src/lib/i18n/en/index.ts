import type { Translation } from '../i18n-types';

const en = {
	connexion: 'Login to winNbat',
	VousAvezPasDeCompte: "Don't have an account?",
	InscrivezVous: ' Sign up',
	SeConnecter: 'Login',
	Password: 'Password',
	Email: 'Email',
	Afficher: 'Show',
	Masquer: 'Hide',
	MotDePasseOublie: 'Forgot password?',
	ou: 'Or',
	IsNotValidEmail: 'Email is not valid',
	ShortPassword: 'Password must be at least 8 characters',
	PasswordTooLong: 'Password must be at most 100 characters',
	Inscription: 'Sign up to winNbat',
	ConfirmPassword: 'Confirm password',
	AjouterVosInformations: 'Add your information',
	Username: 'Username',
	DateDeNaissance: 'Date of birth',
	ConfirmerVotreEmail: 'Confirm your email address',
	PleaseCheckYourEmail: 'Please check your email address',
	SiPasRecuEmail: "If you didn't receive the email",
	RenvoyerEmail: 'Resend email',
	EmailEnvoye: 'Email sent',
	BackToHome: 'Back to home',
	EnvoyerEmailResetPassword:
		'Enter the email address associated with your account. We will send you an email link to reset your password.',
	EnvoyerLeLienDeRenitialisation: 'Send reset link',
	VeuillezSaisirVotreNouveauMotDePasse: 'Please enter your new password',
	Resetmdp: 'Reset password',
	Incorrectemailorpassword: 'Incorrect email or password',
	registerSchema: {
		usernameIshort: 'Username must be at least 3 characters',
		usernameTooLong: 'Username must be at most 100 characters',
		birthdateRequired: 'Birthdate is required',
		PasswordsDoNotMatch: 'Passwords do not match',
		usernameIsTaken: 'This username is already taken',
		emailIsTaken: 'This email is already taken',
	},
	ProfilePage: {
		Profil: 'Profile',
		CreerUnProfile: 'Create a profile',
		InformationsPersonnelles: 'Personal information',
		ChangerLenomDutilisateur: 'Change username',
		AjouterUnNumeroDeTelephone: 'Add a phone number',
		ConfirmerLeNumeroDeTelephone: 'Confirm phone number',
		AjouterUneAdresse: 'Add an address',
		ConfimerVotreAdresse: 'Confirm your address',
		ChangerVotreProfile: 'Change your profile',
		ChangerUnparametredeVotreProfile:
			'Change a parameter of your profile here and click the button to confirm',
		MetterVotreLogement: 'Put your accommodation on winNbat',
		GagnerDeLargent: 'Start your activity and earn money with simplicity',
	},
	PhoneNumbre: 'Phone number',
	IsNotValidPhone: 'Phone number is not valid',
	wilaya: 'Wilaya',
	commune: 'Commune',
	MessageNotification: {
		Succes: 'Success',
		Error: 'Error',
		NomUtilisateurBienChanger: 'Your username has been changed',
		ErrorEstSurvenu: 'An error has occurred',
		VousAvezChangerModifierVotreNumeroDeTelephone:
			'You have successfully added or changed your phone number',
		VousAvezChangerModifierVotreAdresse: 'You have successfully added or changed your address',
	},
} satisfies Translation;

export default en;
