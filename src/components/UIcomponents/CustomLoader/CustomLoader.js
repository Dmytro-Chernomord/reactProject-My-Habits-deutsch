import React from 'react';

import styles from './CustomLoader.module.css';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export function CustomLoader() {
  return (
    <div className={styles.wrap}>
      <Spinner animation="border" variant="info" />
    </div>
  );
}
