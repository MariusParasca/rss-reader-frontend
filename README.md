## Installation

Before Installation make sure that in the file 'src/shared/backendAxios.js' you have set your backend API URL:

```bash
import Axios from 'axios';

export default Axios.create({
  baseURL: 'http://localhost:2001/',
});
```

Steps to install:

- Step 1, install all dependencies:

```bash
npm install
```

- Step 2, run the project (the project is running on port 3000):

```bash
npm start
```
