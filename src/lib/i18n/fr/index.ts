import type { BaseTranslation } from '../i18n-types';

const fr = {
	connexion: 'Connexion à winNbat',
	VousAvezPasDeCompte: "Vous n'avez pas de compte?",
	InscrivezVous: ' Inscrivez-vous',
	SeConnecter: 'Se connecter',
	Password: 'Mot de passe',
	Email: 'Email',
	Afficher: 'Afficher',
	Masquer: 'Masquer',
	MotDePasseOublie: 'Mot de passe oublié?',
	ou: 'Ou',
	IsNotValidEmail: "L'email n'est pas valide",
	ShortPassword: 'Le mot de passe doit contenir au moins 8 caractères',
	PasswordTooLong: 'Le mot de passe doit contenir au maximum 100 caractères',
	Inscription: 'Inscription a winNbat',
	ConfirmPassword: 'Confirmer le mot de passe',
	AjouterVosInformations: 'Ajouter vos informations',
	Username: "Nom d'utilisateur",
	DateDeNaissance: 'Date de naissance',
	ConfirmerVotreEmail: 'Confirmer votre adresse email',
	PleaseCheckYourEmail: 'Veuillez vérifier votre adresse email',
	SiPasRecuEmail: "Si vous n'avez pas reçu l'email",
	RenvoyerEmail: "Renvoyer l'email",
	EmailEnvoye: 'Email envoyé',
	BackToHome: "Retour à l'accueil",
	EnvoyerEmailResetPassword:
		"Saisissez l'adresse e-mail associée à votre compte. Nous vous enverrons un lien par e-mail pour réinitialiser votre mot de passe.",
	EnvoyerLeLienDeRenitialisation: 'Envoyer le lien de rénitialisation',
	VeuillezSaisirVotreNouveauMotDePasse: 'Veuillez saisir votre nouveau mot de passe',
	Resetmdp: 'Réinitialiser le mot de passe',
	Incorrectemailorpassword: 'Email ou mot de passe incorrect',
	registerSchema:{
		usernameIshort: 'Le nom d\'utilisateur doit contenir au moins 3 caractères',
		usernameTooLong: 'Le nom d\'utilisateur doit contenir au maximum 100 caractères',
		birthdateRequired: 'La date de naissance est requise',
		PasswordsDoNotMatch: 'Les mots de passe ne correspondent pas',
		usernameIsTaken: 'Ce nom d\'utilisateur est déjà pris',
		emailIsTaken: 'Cet email est déjà pris',
	}
} satisfies BaseTranslation;

export default fr;
