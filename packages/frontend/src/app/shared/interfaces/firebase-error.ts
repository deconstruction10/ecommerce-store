export interface FirebaseEmailError {
  code: string;
  message: string;
}

export enum FirebaseEmailErrorCodes  {
  EmailAlreadyInUse = 'auth/email-already-in-use',
  InvalidEmail = 'auth/invalid-email',
  UserDisabled = 'auth/user-disabled'
}
