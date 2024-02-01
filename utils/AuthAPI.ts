type AuthDataType = {
  u_id: string;
  enUID?: string;
  pwd: string;
  csrf_cookie_name: string;
  phpSessionId: string;
  captcha?: string;
};

class AuthClass {
  readonly u_id: string;
  public enUID!: string | "";
  private readonly pwd: string;
  public csrf_cookie_name: string;
  public phpSessionId: string;
  public captcha?: string;
  public authenticated?: boolean = false;
  private enc = encodeURIComponent;
  private readonly preloginURL =
    "https://rds3.northsouth.edu/index.php/common/login/preLogin";
  private readonly loginURL =
    "https://rds3.northsouth.edu/index.php/common/login";

  constructor({ u_id, pwd, phpSessionId, csrf_cookie_name }: AuthDataType) {
    this.u_id = this.enc(u_id);
    this.pwd = this.enc(pwd);
    this.phpSessionId = this.enc(phpSessionId);
    this.csrf_cookie_name = this.enc(csrf_cookie_name);
  }

  private readonly generateHeader: Function = () => {
    if (this.phpSessionId && this.csrf_cookie_name)
      return {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Sec-GPC": "1",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-User": "?1",
        "Content-Type": "application/x-www-form-urlencoded",
        Pragma: "no-cache",
        "Cache-Control": "no-cache",
        Cookie: `PHPSESSID=${this.phpSessionId}; csrf_cookie_name=${this.csrf_cookie_name}`,
      };
    else throw new Error("phpSessionId and csrf_cookie_name haven't been set");
  };

  public showData: Function = () => {
    console.log(
      "////////////USERDATA//////////////\n" +
        `u_id: ${this.u_id}\nenUID: ${this.enUID}\npwd: ${this.pwd}\ncsrf_cookie_name: ${this.csrf_cookie_name}\nphpSessionId: ${this.phpSessionId}\nCaptcha: ${this.captcha}` +
        "\n////////////END//////////////",
    );
  };

  public preLoginBody: Function = () =>
    `csrf_token=${this.csrf_cookie_name}&username=${this.u_id}&commit=Next`;

  public loginBody: Function = () =>
    `csrf_token=${this.csrf_cookie_name}&password=${this.pwd}&captcha=${
      this.captcha
    }&username=${this.enc(this.enUID)}&commit=Login`;

  public preLoginFetch: Function = async () => {
    const response = await fetch(this.preloginURL, {
      credentials: "include",
      headers: this.generateHeader(),
      referrer: "https://rds3.northsouth.edu/index.php/",
      body: this.preLoginBody(),
      method: "POST",
      mode: "cors",
    });
    console.log("Prelogin: " + response.statusText);
    return await response.text();
  };

  public loginFetch: Function = async () => {
    if (!this.enUID) throw new Error("enUID is required");
    if (this.captcha?.length != 4) throw new Error("Captcha Error");
    const response = await fetch(this.loginURL, {
      credentials: "include",
      headers: this.generateHeader(),
      referrer: "https://rds3.northsouth.edu/index.php/common/login/preLogin",
      body: this.loginBody(),
      method: "POST",
      mode: "cors",
    });
    console.log("Login: " + response.statusText);
    return await response.text();
  };
}

export default AuthClass;
