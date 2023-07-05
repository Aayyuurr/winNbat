import type { Translation } from '../i18n-types';

const ar = {
	connexion: 'تسجيل الدخول في winNbat',
	VousAvezPasDeCompte: 'ليس لديك حساب؟',
	InscrivezVous: ' سجل ',
	SeConnecter: 'تسجيل الدخول',
	Password: 'كلمه السر',
	Email: 'البريد الإلكتروني',
	Afficher: 'عرض',
	Masquer: 'إخفاء',
	MotDePasseOublie: 'هل نسيت كلمة المرور؟',
	ou: 'أو',
	IsNotValidEmail: 'البريد الإلكتروني غير صالح',
	ShortPassword: 'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل',
	PasswordTooLong: 'يجب أن تتكون كلمة المرور من 100 حرف على الأكثر',
	Inscription: 'الاشتراك في winNbat',
	ConfirmPassword: 'تأكيد كلمة المرور',
	AjouterVosInformations: 'أضف معلوماتك',
	Username: 'اسم المستخدم',
	DateDeNaissance: 'تاريخ الولادة',
	ConfirmerVotreEmail: 'تأكيد عنوان بريدك الإلكتروني',
	PleaseCheckYourEmail: 'يرجى التحقق من عنوان بريدك الإلكتروني',
	SiPasRecuEmail: 'إذا لم تتلق البريد الإلكتروني',
	RenvoyerEmail: 'إعادة إرسال البريد الإلكتروني',
	EmailEnvoye: 'تم إرسال البريد الإلكتروني',
	BackToHome: 'العودة إلى الصفحة الرئيسية',
	EnvoyerEmailResetPassword:
		'أدخل عنوان البريد الإلكتروني المرتبط بحسابك. سنرسل لك رابط البريد الإلكتروني لإعادة تعيين كلمة المرور الخاصة بك.',
	EnvoyerLeLienDeRenitialisation: 'إرسال رابط إعادة التعيين',
	VeuillezSaisirVotreNouveauMotDePasse: 'الرجاء إدخال كلمة المرور الجديدة',
	Resetmdp: 'إعادة تعيين كلمة المرور',
	Incorrectemailorpassword: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
	registerSchema: {
		usernameIshort: 'يجب أن يتكون اسم المستخدم من 3 أحرف على الأقل',
		usernameTooLong: 'يجب أن يتكون اسم المستخدم من 100 حرف على الأكثر',
		birthdateRequired: 'تاريخ الميلاد مطلوب',
		PasswordsDoNotMatch: 'كلمات المرور غير متطابقة',
		usernameIsTaken: 'اسم المستخدم هذا موجود بالفعل',
		emailIsTaken: 'هذا البريد الإلكتروني موجود بالفعل',
	}
} satisfies Translation;

export default ar;
