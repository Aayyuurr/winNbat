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
	registerSchema: {
		usernameIshort: "Le nom d'utilisateur doit contenir au moins 3 caractères",
		usernameTooLong: "Le nom d'utilisateur doit contenir au maximum 100 caractères",
		birthdateRequired: 'La date de naissance est requise',
		PasswordsDoNotMatch: 'Les mots de passe ne correspondent pas',
		usernameIsTaken: "Ce nom d'utilisateur est déjà pris",
		emailIsTaken: 'Cet email est déjà pris',
	},
	ProfilePage: {
		Profil: 'Profil',
		CreerUnProfile: 'Créer un profil',
		InformationsPersonnelles: 'Informations personnelles',
		ChangerLenomDutilisateur: "Changer le nom d'utilisateur",
		AjouterUnNumeroDeTelephone: 'Ajouter un numéro de téléphone',
		ConfirmerLeNumeroDeTelephone: 'Confirmer le numéro de téléphone',
		AjouterUneAdresse: 'Ajouter une adresse',
		ConfimerVotreAdresse: 'Confirmer votre adresse',
		ChangerVotreProfile: 'Changer votre profil',
		ChangerUnparametredeVotreProfile:
			'Changer un paramètre de votre profil ici et cliquez sur le bouton pour confirmer',
		MetterVotreLogement: 'Metter votre logement sur winNbat',
		GagnerDeLargent: 'Commencer votre activité et gagner de l’argent avec simplicité',
	},
	PhoneNumbre: 'Numéro de téléphone',
	IsNotValidPhone: "Le numéro de téléphone n'est pas valide",
	wilaya: 'Wilaya',
	commune: 'Commune',
	MessageNotification: {
		Succes: 'Succès',
		Error: 'Erreur',
		NomUtilisateurBienChanger: "Votre nom d'utilisateur a bien été changé",
		ErrorEstSurvenu: 'Une erreur est survenue',
		VousAvezChangerModifierVotreNumeroDeTelephone:
			'Vous avez ajouter ou modifier votre numéro de téléphone avec succès',
		VousAvezChangerModifierVotreAdresse: 'Vous avez ajouter ou modifier votre adresse avec succès',
	},
} satisfies BaseTranslation;

export default fr;
