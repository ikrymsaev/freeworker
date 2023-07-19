class JwtService {
  private static s: JwtService | null = null;
  public static get service(): JwtService {
    if (JwtService.s === null) {
      JwtService.s = new JwtService();
    }

    return JwtService.s;
  }
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
  setToken(token: string): void {
    localStorage.setItem('access_token', token);
  }
  removeToken(): void {
    localStorage.removeItem('access_token');
  }
  hasToken(): boolean {
    return !!localStorage.getItem('access_token');
  }
}

export const jwtService = JwtService.service;
