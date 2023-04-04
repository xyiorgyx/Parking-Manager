import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('id_token');
    
  }

  login(idToken,userId) {
    localStorage.setItem('id_token', idToken);
    localStorage.setItem('user_id', userId);

    window.location.assign('/me');
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('user_id');
    window.location.assign('/');
  }
}

export default new AuthService();