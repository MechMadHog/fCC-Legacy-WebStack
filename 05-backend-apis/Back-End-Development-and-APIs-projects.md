# Back End Development and APIs Projects

🧠 This section corresponds to the **FreeCodeCamp - Back End Development and APIs** certification.

🎓 **Certificate:**  
https://www.freecodecamp.org/certification/mechmadhog/back-end-development-and-apis

During this part of the curriculum there are three main learning sections, followed by five required projects. While working through this certificate, parts of the **Node, Express, and MongoDB course material became unreliable or non-functional** in the FreeCodeCamp interface.

Rather than stall progress debugging platform issues, I completed the required projects locally and covered the underlying concepts through alternative, real-world learning paths.

The goal remained the same throughout: **understand and apply backend concepts in working code**, not simply complete checklist lessons.

---

## Course Sections Overview

### 1. Managing Packages with NPM
This section worked as expected and was completed directly within FreeCodeCamp.

**Key concepts covered:**
- Initialising Node projects with `npm init`
- Managing dependencies via `package.json`
- Installing, updating, and removing packages
- Understanding semantic versioning

**Additional learning:**
- Official npm documentation
- Reading and modifying real-world `package.json` files in local projects

🔗 References:  
- https://docs.npmjs.com/

---

### 2. Basic Node and Express
Parts of this section became blocked due to broken tests and environment issues in the FCC interface.

**Concepts were covered instead through:**
- Official Express and Node.js documentation
- Building and running local Express servers
- Writing and debugging middleware, routes, and request handlers
- Hands-on development while completing the certification projects
- Supplementary tutorials and walkthroughs where useful

🔗 References:  
- https://nodejs.org/en/docs  
- https://expressjs.com/

---

### 3. MongoDB and Mongoose
This section was similarly unreliable within the FCC environment.

Rather than forcing progress through broken lessons, I focused on:
- Understanding RESTful API structure
- CRUD operations at the conceptual level
- Data modelling patterns
- Deferred database-specific work to later projects and real-world applications

MongoDB and Mongoose are tools I intend to revisit in a **clean, modern setup**, separate from the FCC interface.

🔗 References:  
- https://www.mongodb.com/docs/  
- https://mongoosejs.com/docs/

---

## Back End Development and APIs Projects

All five required projects were completed **locally**, using the official FreeCodeCamp boilerplates. Each project was developed, tested, and debugged in a real Node + Express environment.

Instead of CodePen, the full source code is hosted on GitHub:

🔗 **Project Repository:**  
https://github.com/MechMadHog/fCC-Legacy-WebStack/tree/main/05-backend-apis/Projects

---

### 1. ⏱️ Timestamp Microservice
**Concepts demonstrated:**
- Express routing
- URL parameters
- Date parsing and validation
- JSON API responses

This project implements a simple API that converts dates into Unix and UTC formats, handling both valid and invalid input gracefully.

---

### 2. 🧾 Request Header Parser Microservice
**Concepts demonstrated:**
- Working with HTTP request headers
- Accessing client metadata (IP, language, user-agent)
- Returning structured JSON responses

This project extracts information directly from request headers and exposes them via a single API endpoint.

---

### 3. 🔗 URL Shortener Microservice
**Concepts demonstrated:**
- Handling POST requests with form data
- URL validation and DNS lookup
- Temporary in-memory data storage
- Redirect handling

This service accepts a valid URL, assigns it a short identifier, and redirects users when the short URL is visited.

---

### 4. 🏋️ Exercise Tracker
**Concepts demonstrated:**
- RESTful API design
- Creating and managing users
- Handling relational-style data in memory
- Query parameters (`from`, `to`, `limit`)
- Date formatting and filtering

This was the most complex project in the certificate, involving multiple endpoints and careful handling of edge cases such as date ranges and counts.

---

### 5. 📁 File Metadata Microservice
**Concepts demonstrated:**
- Handling file uploads with `multer`
- Processing multipart form data
- Returning file metadata as JSON

This microservice accepts a file upload and returns its name, type, and size in bytes.

---

## Notes on Learning Approach

Where the FreeCodeCamp interface functioned correctly, I used it directly. Where it became a blocker, I:

- Switched to local development
- Used official documentation as the primary reference
- Reinforced learning by building and debugging working projects
- Focused on transferable backend concepts rather than platform-specific quirks

This approach mirrors real-world development, where engineers regularly work around broken tooling, outdated docs, or legacy systems to deliver functional results.

---

## Status

✅ All five Back End Development and APIs projects completed  
🎓 **Certificate earned:**  
https://www.freecodecamp.org/certification/mechmadhog/back-end-development-and-apis

The certification requirements have been fully met through working implementations and verified project submissions.
