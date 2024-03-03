
### About

This is a Twitter like website built using nextjs,mongodb and clerk for authentication,

![Socials][Socials] 


### Built With
* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![TailwindCSS][TailwindCss]][TailwindCss-url]
* [![Framer][Framer]][Framer-url]
* [![NodeJS][NodeJS]][NodeJS-url]
* [![MongoDB][MongoDB]][MongoDB-url]
 
###  Features
- Simple design
- Responsive.
- User Account System
- Reply , Like and mention
  

  
### Start the website
1. Clone the repo
   ```sh
   gh repo clone ilyassKrem-dev/mern-social
   ```
2. Add a MONGO_URL from [mongoDB](https://www.mongodb.com/) to the `.env.local` file
3. Add from [Clerk](https://clerk.com) to the `.env.local` file
   ```sh
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
     CLERK_SECRET_KEY=
     NEXT_CLERK_WEBHOOK_SECRET=
     NEXT_PUBLIC_CLERK_SIGN_IN_URL=
     NEXT_PUBLIC_CLERK_SIGN_UP_URL=
     NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
     NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=
   ```
4. Add from [Uploadthing](https://uploadthing.com/) to the `.env.local` file
    ```sh
     UPLOADTHING_APP_ID=
     UPLOADTHING_SECRET=
   ```

5. Add a NEXT_PUBLIC_BASE_URL= (Full Url of the site) for the share button to the `.env.local` file
6. Run
   ```sh
   npm install
   npm run dev
   ```



Credit to
### JavaScript Mastery 


[![Youtube]][YoutubeUrl]


<!-- MARKDOWN LINKS & IMAGES -->
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Framer]:https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue
[Framer-url]:https://www.framer.com/motion/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TailwindCss]:https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[TailwindCss-url]:https://tailwindcss.com/
[NodeJS]:https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[NodeJS-url]:https://nodejs.org/
[MongoDB]:https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]:https://www.mongodb.com/
[Socials]:https://www.dropbox.com/scl/fi/32ncydo8kwg8pjuytzfp5/Capture10.jpg?rlkey=sl6023dtqhckgeaa5hvh68jhx&raw=1
[Youtube]:https://img.shields.io/badge/YouTube-%23FF0000.svg?style=for-the-badge&logo=YouTube&logoColor=white
[YoutubeUrl]:https://www.youtube.com/@javascriptmastery

