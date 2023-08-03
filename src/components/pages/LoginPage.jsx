import React from 'react';
import About from '../sections/About';
import LoginForm from '../login/LoginForm';
import styles from '../../../styles/cspace-ui/LoginPage.css';

export default function LoginPage() {
  return (
    <div className={styles.common}>
      <div className={styles.about}>
        <About />
      </div>

      <div className={styles.login}>
        <LoginForm />
      </div>
    </div>
  );
}
