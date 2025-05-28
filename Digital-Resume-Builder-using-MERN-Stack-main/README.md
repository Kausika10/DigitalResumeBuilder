# Digital Resume Builder (MERN Stack)

##  Overview

The **Digital Resume Builder** is a web-based platform that allows users to create, customize, and share their professional resumes online. It is built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)** and provides an intuitive UI for dynamic resume generation.

## Tech Stack

- **Frontend:** React.js, Redux, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Authentication:** JWT (JSON Web Token)

##  Installation & Setup

### Prerequisites

- Node.js & npm installed
- MongoDB setup (local or cloud)



### 1) Install dependencies

#### Backend

```sh
$ cd resume-builder-backend
$ npm install
```

#### Frontend

```sh
$ cd ../resume-builder-frontend
$ npm install
```

### 2) Configure Environment Variables

Create a `.env` file in the `resume-builder-backend` folder and set the following variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUD_STORAGE_KEY=your_storage_key (if applicable)
```

### 3) Run the project

#### Start Backend Server

```sh
$ cd resume-builder-backend
$ npm start
```

#### 4) Start Frontend

```sh
$ cd ../resume-builder-frontend
$ npm start
```

### 5) Open in Browser

```
http://localhost:3000
```







