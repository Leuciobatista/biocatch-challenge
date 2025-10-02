# BioCatch Challenge – React SPA

## 📌 Description

This project was developed as part of the **BioCatch Challenge**.  
The goal is to demonstrate the integration of the **BioCatch SDK** in a simple site, simulating a banking journey with the steps:

👉 **Home → Login → Payment → Logout**

The site does not have its own backend (as per the challenge instructions).  
The API calls (`init` and `getScore`) are made directly from the frontend to a mock endpoint (Zapier).  
In **localhost**, due to CORS, responses may be blocked — but the payload is correctly sent and can be inspected with browser developer tools.

---

## 🚀 Technologies

- **React (SPA)** → application structure
- **React Router** → routing between Home, Login, Payment, Logout
- **Material UI + Bootstrap** → modern and responsive UI
- **Context API** → manage the **Customer Session ID (CSID)** during the session
- **BioCatch SDK JS (mock)** → included in all pages through `public/index.html`

---

## 📂 Project structure

```
src/
  ├── api.js                 # init/getScore requests (fetch → Zapier)
  ├── bc.js                  # helper to access window.cdApi (BioCatch SDK)
  ├── SessionContext.js      # provider for the CSID
  ├── styles.css             # global styles (cards, buttons, layout)
  ├── components/
  │   ├── Modal.js           # reusable modal
  │   └── NavBar.js          # navigation bar
  ├── pages/
  │   ├── Home.js
  │   ├── Login.js
  │   ├── Payment.js
  │   └── Logout.js
  ├── App.js                 # route definitions
  └── index.js               # app entry point
public/
  ├── index.html             # includes BioCatch SDK script
  └── favicon.ico
```

---

## ⚙️ Installation and execution

1. Clone the repository:

```bash
git clone https://github.com/youruser/biocatch-challenge.git
cd biocatch-challenge
```

2. Install dependencies:

```bash
npm install
```

3. Run the application:

```bash
npm start
```

4. Open in the browser:

```
http://localhost:3000
```

---

## 🖥️ Main features

### 1. **Home**

- Shows logo and introduction
- **Start Demo** button → goes to Login

### 2. **Login**

- Defines **CSID** for the session
- Calls `cdApi.changeContext("login_screen")`
- On **Login** button click:
  - Triggers `init` API call
  - Shows result in a **Modal**
  - After closing, redirects to **Payment**

### 3. **Payment**

- Calls `cdApi.changeContext("payment_screen")`
- On **Make Payment** button click:
  - Triggers `getScore` API call
  - Shows result in **Modal**

### 4. **Logout**

- Calls `cdApi.changeContext("logout_screen")`
- Clears CSID and generates a new one
- Displays confirmation message

---

## 🔎 How to validate

Use **DevTools (F12)** → **Network tab**:

- Click **Login** → see `init` request sent
- Click **Payment** → see `getScore` request sent
- Check **Payload**: customerSessionId, action, activityType, iam, etc.

⚠️ Note: In localhost, due to CORS, the response may not appear, but the payload is correctly sent.  
In production, calls would be made via **backend**, avoiding this issue.

---

## 🔐 Bonus questions

### 1. SPAs

In a SPA like React, the DOM is not fully reloaded.  
Solution: call `cdApi.changeContext()` whenever the user navigates to a new route.  
This project does that in each page (`login_screen`, `payment_screen`, `logout_screen`).

### 2. CSP (Content Security Policy)

A minimal CSP to allow the SDK would be:

```http
Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://bcdn-4ff4f23f.we-stats.com;
  connect-src 'self' https://wup.biocatch.com https://hooks.zapier.com;
  img-src 'self' data:;
  style-src 'self' 'unsafe-inline';
```

### 3. Different domains

Loading JS from another domain can cause CORS or CSP issues.  
Solution: host the SDK on the bank’s own domain or use a trusted HTTPS CDN.

### 4. iFrames

If the iFrame is from another domain, the SDK cannot collect data (same-origin policy).  
Solution: inject the SDK inside the iFrame or use `postMessage` to communicate events between iFrame and parent.

### 5. Frontend vs Backend

In this challenge, API calls are made from the frontend.  
👉 In **production**, calls must be made by the **backend** to ensure security and avoid user manipulation.

---

## ✅ Conclusion

This project meets all challenge requirements:

- SDK imported on all pages
- CSID consistent across session
- Contexts defined per page
- API calls triggered at the right events (`init`, `getScore`)
- Clear demonstration in Console/Network
- Professional, responsive UI
