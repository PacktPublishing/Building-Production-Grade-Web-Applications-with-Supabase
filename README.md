# Building Production-Grade Web Applications with Supabase

<a href="https://www.packtpub.com/en-us/product/building-production-grade-web-applications-with-supabase-9781837630684"><img src="https://content.packt.com/B19648/cover_image_small.jpg" alt="" height="256px" align="right"></a>

This is the code repository for [Building Production-Grade Web Applications with Supabase](https://www.packtpub.com/en-us/product/building-production-grade-web-applications-with-supabase-9781837630684), published by Packt.

**A comprehensive guide to database design, security, real-time data, storage, multi-tenancy, and more**

## What is this book about?
Discover the powerful capabilities of Supabase, the cutting-edge, open-source platform flipping the script on backend architecture. Guided by David Lorenz, a battle-tested software architect with over two decades of development experience, this book will transform the way you approach your projects and make you a Supabase expert.
	
This book covers the following exciting features:
* Explore essential features for effective web app development
* Handle user registration, login/logout processes, and user metadata
* Understand potential pitfalls and best practices for deploying multi-tenant applications
* Discover how to implement real-time functionality
* Upload, download, and manipulate files
* Enhance web application security with preventive measures against data manipulation and security breaches
* Increase efficiency and streamline task automation through personalized email communication, webhooks, and cron jobs	

If you feel this book is for you, get your [copy](https://www.amazon.com/dp/1837630682) today!

<a href="https://www.packtpub.com/?utm_source=github&utm_medium=banner&utm_campaign=GitHubBanner"><img src="https://raw.githubusercontent.com/PacktPublishing/GitHub/master/GitHub.png" 
alt="https://www.packtpub.com/" border="5" /></a>


## Instructions and Navigations
All of the code is organized into folders. For example, Chapter02.

The code will look like the following:
```
document = createNewTextDocument();
userId = getUserIdFromLoginSession();
getFgaClient()
  .subject({userId})
  .addPermissions({objectType: 'document', objectId: document.id})
  .relations(['save', 'delete', 'share'])
```

**Following is what you need for this book:**

This book is for developers looking for a hassle-free, universal solution to building robust apps using Supabase and its integration libraries. While a basic understanding of JavaScript is useful, it’s not essential as the book focuses on Supabase for creating high-performance web apps using Next.js. Experienced professionals from non-JavaScript backgrounds will find this book useful. Familiarity with Postgres, although helpful, is not mandatory as the book explains all the SQL statements used.

With the following software and hardware list you can run all code files present in the book (Chapter 1-13).

## Software and Hardware List

| Chapter  | Software required                      | OS required                      |
| -------- | ---------------------------------------| ---------------------------------|
| 1-13     | Docker Desktop or orbstack             | Windows, macOS, or Linux         |
| 1-13     | npm/node                               | Windows, macOS, or Linux         |
| 1-13     | An account on supabase.com             | Windows, macOS, or Linux         |
| 1-13     | DBeaver (recommended, not necessary)   | Windows, macOS, or Linux         |

## Related products <Other books you may enjoy>
* Web App Development Made Simple with Streamlit [[Packt]](https://www.packtpub.com/en-us/product/web-app-development-made-simple-with-streamlit-9781835086315) [[Amazon]](https://www.amazon.com/dp/1835086314)

* React Application Architecture for Production [[Packt]](https://www.packtpub.com/en-us/product/react-application-architecture-for-production-9781801070539) [[Amazon]](https://www.amazon.com/dp/1801070539)

* Full Stack Development with Spring Boot 3 and React - Fourth Edition [[Packt]](https://www.packtpub.com/en-us/product/full-stack-development-with-spring-boot-3-and-react-9781805122463) [[Amazon]](https://www.amazon.com/dp/1805122460)

## Errata
* Page 39, there's a missing opening curly bracket right after second arrow function arrow, here's how the code snippet should look like:
  ```
  supabase.storage.listBuckets().then((result) => {
     console.log("Bucket List", result);
  });
  ```

## Get to Know the Author
**David Lorenz** is a web software architect and lecturer who began programming at age 11. Before completing university in 2014, he had built a CRM system that automated an entire company and worked with numerous agencies through his own company. In 2015, he secured his first employment as a senior web developer, where he played a pioneering role in using cutting-edge technology and was an early adopter of progressive web apps. In 2017, he became the leading frontend architect and team lead for one of the largest projects at Mercedes-Benz.io, involving massive-scale architecture. Today, David provides valuable insights and guidance to clients across various industries, using his extensive experience and exceptional problem-solving abilities.
