// import { User } from "@saleor/fragments/types/User";
import { TokenAuth_tokenCreate_user } from "@saleor/auth/types/TokenAuth";

export const isSupported =
  navigator.credentials && navigator.credentials.preventSilentAccess;

export function login<T>(loginFn: (id: string, password: string) => T): T {
  if (isSupported) {
    navigator.credentials.get({ password: true }).then(credential => {
      if (credential instanceof PasswordCredential) {
        return loginFn(credential.id, credential.password);
      }
    });
  }

  return null;
}

export function saveCredentials(user: TokenAuth_tokenCreate_user, password: string) {
  if (isSupported) {
    const cred = new PasswordCredential({
      iconURL: user.avatar ? user.avatar.url : undefined,
      id: user.phone,
      name: user.firstName ? `${user.firstName} ${user.lastName}` : undefined,
      password
    });
    navigator.credentials.store(cred);
  }
}
