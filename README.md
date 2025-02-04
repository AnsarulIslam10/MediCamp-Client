# [MediCamp | Live Link](https://medicamp-8c925.web.app)

MediCamp is a Medical Camp Management System (MCMS) platform that connects individuals to medical camps, enabling participants to discover, join, and manage their camps, while allowing organizers to post and manage their camps and participants.

![MediCamp](https://i.ibb.co.com/DD2dF8xv/medicamp-image.png)


## Organizer Login Info
email: 
```
admin@gmail.com
```
password:
```
123456Aa@
```


## Features

### For Participants:
- **Search Camps**: Easily search for camps by camp name, date, time, healthcare professional name, and location.
- **Join Camps**: Register for a camp by filling out a simple form on the camp details page.
- **Payment Integration**: Secure payment processing via Stripe for camp registration fees.
- **Registered Camps**: View and manage the camps you've registered for.
- **Cancel Registration**: Cancel your registration for a camp in the 'Registered Camps' section.
- **Analytics**: Track your camp participation, payments, and personal statistics.
- **Participant Profile**: View and edit your personal profile information.
- **Payment History**: Access a record of all your payments for camp registrations.
- **Ratings & Feedback**: Rate and leave feedback on camps you’ve attended to help other users.

### For Organizers (Admin):
- **Organizer Profile**: Set up and manage your organizer profile with necessary details.
- **Add A Camp**: Post new medical camps, including dates, locations, healthcare professionals, and fees.
- **Manage Camps**: View and manage all the camps you have posted, including the ability to edit or delete them.
- **Manage Registered Camps**: Track and manage participants who have registered for your camps, including their details and payment status.

### General Features:
- **Popular Camps**: Discover the most popular camps based on participant count and join those that suit your needs.
- **Camp Details**: View detailed information about each camp, including its location, healthcare professionals, and registration fees.
- **Participant Ratings & Feedback**: After payment and confirmation from organizer participants can rate camps and leave feedback to improve future experiences.

## Tech Stack
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Payment Integration**: Stripe API

### Dependencies
- `@emotion/react ^11.14.0`  
- `@headlessui/react ^2.2.0`  
- `@smastrom/react-rating ^1.5.0`  
- `@stripe/react-stripe-js ^3.1.1`  
- `@stripe/stripe-js ^5.5.0`  
- `@tanstack/react-query ^5.64.1`  
- `axios ^1.7.9`  
- `firebase ^11.1.0`  
- `localforage ^1.10.0`  
- `lottie-react ^2.4.0`  
- `match-sorter ^8.0.0`  
- `moment ^2.30.1`  
- `react ^18.3.1`  
- `react-awesome-reveal ^4.3.1`  
- `react-datepicker ^7.6.0`  
- `react-dom ^18.3.1`  
- `react-helmet-async ^2.0.5`  
- `react-hook-form ^7.54.2`  
- `react-icons ^5.4.0`  
- `react-router-dom ^7.1.1`  
- `react-toastify ^11.0.2`  
- `recharts ^2.15.0`  
- `sort-by ^1.2.0`  
- `sweetalert2 ^11.15.10`  
- `swiper ^11.2.1`  


### DevDependencies
- `@eslint/js ^9.17.0`  
- `@types/react ^18.3.18`  
- `@types/react-dom ^18.3.5`  
- `@vitejs/plugin-react ^4.3.4`  
- `autoprefixer ^10.4.20`  
- `daisyui ^4.12.23`  
- `eslint ^9.17.0`  
- `eslint-plugin-react ^7.37.2`  
- `eslint-plugin-react-hooks ^5.0.0`  
- `eslint-plugin-react-refresh ^0.4.16`  
- `globals ^15.14.0`  
- `postcss ^8.4.49`  
- `tailwindcss ^3.4.17`  
- `vite ^6.0.5`  


## Installation
1. Clone the repo:
   ```
   git clone https://github.com/AnsarulIslam10/MediCamp-Client.git
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Set up Firebase and add config in `.env`
4. Add your Image Hosting Key
    ```
    VITE_IMAGE_HOSTING_KEY=yourImageHostingkey
    ```
5. Add your Payment Gateway PK
    ```
    VITE_Payment_Gateway_PK=yourPaymentGatewayPk
    ```
6. Run locally:
   ```
   npm run dev
   ```