import styles from "./Footer.module.css";
//images
import logo from "../../globalImages/toro_logo.svg";
import linkedInLogo from "../../globalImages/linkedInLogo.svg"
import instagramLogo from "../../globalImages/instagramLogo.svg"
import facebookLogo from "../../globalImages/facebookLogo.svg"

const Footer = () => {
    return (
        <footer>
            <div className={styles.footerWrapper}>
                {/* <div className={styles.termsWrapper}> */}
                    <div className={styles.termsContainer}>
                        <p className={styles.termsText}>Terms and conditions</p>
                        <p className={styles.termsText}>Policy</p>
                        <p className={styles.termsText}>Contact us</p>
                    </div>
                {/* </div> */}
                
                <div className={styles.logoContainer}>
                    <img src={logo} alt="" className={styles.logo} />
                </div>

                <div className={styles.social}>
                    <div className={styles.socialContainer}>
                        <span className={styles.followUs}>Follow us</span>
                        <div>
                            <img className={styles.socialLogo} src={linkedInLogo} alt="" />
                            <img className={styles.socialLogo} src={instagramLogo} alt="" />
                            <img className={styles.socialLogo} src={facebookLogo} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <p className={styles.webDeveloper}>Web developer <span className={styles.red}>hello</span>@davidchavez.tech</p>
        </footer>
    )
}

export default Footer;