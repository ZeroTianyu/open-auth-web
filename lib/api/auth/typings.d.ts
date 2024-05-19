export interface CaptchaResponse {
  captchaId: string;
  imageData: string;
}

interface Scope {
  description: string;
  scope: string;
}

export interface LoginRequest {
  username: string;
  password: string;
  code: string;
  captchaId: string;
  loginType: string;
}

export interface ConsentResponse {
  clientId: string;
  clientName: string;
  previouslyApprovedScopes: string[];
  principalName: string;
  requestURI: string;
  scopes: Scope[];
  state: string;
}

export interface ConsentRequest {
  scope: string | null;
  client_id: string | null;
  state: string | null;
}
