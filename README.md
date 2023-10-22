-------------------- Next.js --------------------

---
1. Configuration de Next.js
---
   
       - Installation de Next.js
         npx create-next-app
       - To run your app in the development mode, run:
        npm run dev
       - For production:
        npm run build
        npm run start
---
2. Routing with Next.js
---
       -Folder:users/page.tsx
         |-> Folder:new/page.tsx

       <Link href={'/users'}>Users</Link>
---
3. Client and server side rendering
---

       All the folder inside of the app folder are server side rendering.
       Let's say we have a ProductCard component rendering in the server side
       with a button inside who suppose to be in th client side. We can use
       By just retrieving the button in his own component using "use ckient"
       and then we can use the button in the client side.

       Example code:
        
       const AddToCard = () => {
            return (
               <div>
                 <button onClick={() => console.log('Click')}>AddToCard</button>
               </div>
           )
       }
   
       const ProductCard = () => {
          return (
                <div>
                  <AddToCard />
                </div>
          )
       }
---
4. Data Fetching
---
       Data can be fetch from the server side or the client side.
       - Fetch from the client side: Use useState() + useEffect()
          - bundle become larger, and also resource intensive, Less secure, no SEO
            always and extra roundtrip to the backend
       - Fetch from the server side: Use getStaticProps() + getServerSideProps()
       It is always a good idea to fetch data from the server side 

       --- Server side ---

       interface  User {
          id: number;
          name: string;
       }

       const UsersPage = async () => {
       const res = await fetch('https://jsonplaceholder.typicode.com/users');
       const users: User[] = await res.json();
        return (
                <>
                    <h1>Users</h1>
                    <ul>
                      {users.map(user => <li key={user.id}>{user.name}</li>)}
                    </ul>
                </>
          )
        }
   
        --- Client side ---
        
        import React, { useState, useEffect } from 'react';

         interface User {
          id: number;
          name: string;
        }

        const UsersPage = () => {
           const [users, setUsers] = useState<User[]>([]);

           useEffect(() => {
           const fetchData = async () => {
           try {
               const res = await fetch('https://jsonplaceholder.typicode.com/users');
               const data: User[] = await res.json();
               setUsers(data);
           } catch (error) {
             console.error("Error fetching users:", error);
           }
        };

        fetchData();
        }, []);

        return (
            <>
              <h1>Users</h1>
              <ul>
                 {users.map(user => <li key={user.id}>{user.name}</li>)}
              </ul>
            </>
        );
        }
---
5. Caching in the server side     
---
       const UsersPage = async () => {
       const res = await fetch('https://jsonplaceholder.typicode.com/users',
            //{cache: 'no-store'})
           { next: {revalidate: 10}}); // refresh every 10 seconds
         
       Note: This way of using the cache is only available in the fecth API
---
6. Static and Dynamic rendering
---

                  / Client Side Rendering 
       Rendering /                         
                 \                        / Static (at build time)
                  \ Server Side Rendering/
                                          \ Dynamic (at request time)
---
7. Styling in Next.js using tailwindcss
---
       ------------ Global styles ------------

       - CSS Modules
       - Styled Components
       - Sass
       - Less
       - Tailwind CSS
       - CSS-in-JS

       - App -> global.css // This is where you can find all the global styles
         Only use styles that are specific to the entire app here or specific components

       --------------- Css module -------------
   
        We can create a css module file for our component and import it in the component
        The benefit of using css module is that the css is scoped to the component
        
        productCard.module.css // Next js will automatically detect the css module
        and create a specif name for it to avoid conflict with other css module
---
8. Tailwind CSS -> some useful classes
---
 
        Tailwind is a utility-first CSS framework for rapidly building custom user interfaces.
        It is a very popular css framework and it is very easy to use.
        It is a good idea to use tailwind for the global styles and css module for the 
        component styles:
  
        Use:

        <div className="p-5 my-5 bg-sky-400 text-white text-xl hover:bg-sky-500">
           <AddToCard />
        </div>
---
9. DaisyUI
---
        DaisyUI is a component library for Tailwind CSS. It does not require
        any configuration or additional setup. Just install and start using.

        - Installation:
        npm i -D daisyui

        - Add the plugin to your tailwind.config.js file:

        module.exports = {
          plugins: [
            require('daisyui'),
          ],
        }

        - Add the theme to your tailwind.config.js file:
          plugins: [
            require('daisyui'),
          ],
         daisyui: {
           themes: ["light", "dark", "cupcake"],
          },

        -- Add the chosing themw to your layout file:
          <html lang="en" data-theme="winter">
            <body className={inter.className}>{children}</body>
          </html>

        - Import:
        import 'daisyui/dist/daisyui.css'

        - Use:
        <div class="p-5 my-5 bg-sky-400 text-white text-xl hover:bg-sky-500">
           <AddToCard />
        </div>

        - Documentation:
        https://daisyui.com/

       Example of use:

       return (
       <>
           <h1>Users</h1>
           <table className='table table-bordered'>
               <thead>
                 <tr>
                     <th>Name</th>
                     <th>Email</th>
                 </tr>
               </thead>
               <tbody>
               {users.map(user =>
                   <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                   </tr>)}
               </tbody>
           </table>
       </>
    )
---         
10. Routing & Navigation
---

     In Next js, we have a built in router that we can use to navigate between pages.
     using special file
     - page.tsx -> This is where we can find all the pages of our app
     - layout.tsx -> This is where we can find the layout of our app
     - loading.tsx -> This is where we can find the loading of our app
     - routes.tsx -> This is where we can find the routes of our app
     - not-found.tsx -> This is where we can find the not found page of our app
     - error.tsx -> This is where we can find the error page of our app
     These can only be accessible in the pages folder but not the css file

     Note: If a compnent is used only in one place, we don't need a separate component for it.
           But if it is used in multiple places, we need to create a separate component for it.

     ------ Dynamic Routing ------

        - We can create a dynamic route by creating a folder with the name of the route
        and creating a file with the name of the dynamic route in the folder.
        For example, if we want to create a dynamic route for the product page, we can
        create a folder called product and create a file called [id].tsx in the folder.
        The id in the file name is the dynamic part of the route. We can access the id
        in the component using the useRouter hook.
    
        const router = useRouter();
        const { id } = router.query;
    
        return (
            <div>
                <h1>Product {id}</h1>
            </div>
        );

     In dynamic routine, every folder we create must have an id folder in it.

     - User folder:
         - [id] => The params
            - page.tsx => The component

              The content of the page.tsx file:

              interface Props {
                 params: {
                   id: number;
                }
              }
              const UserDetailPage = ({ params: { id } }: Props) => {
                    return (
                        <div>UserDetailPage {id}</div>
                    )
              }

     Browser access: localhost:3000/user/1
  
     Let's say, you want to access:
     localhost:3000/users/id/photo.id

        - User folder:
            - [id] => The params
                - photos: Folder
                  - [photoId] => The params
                       - page.tsx => The component

                       The content of the page.tsx file:
    
                        interface Props {
                            params: {
                            id: number;
                            photoId: number;
                            }
                        }
                        const UserDetailPage = ({ params: { id, photoId } }: Props) => {
                                return (
                                    <div>UserDetailPage {id} {photoId}</div>
                                )
                        }

     Browser access: localhost:3000/users/1/photos/2
---
11. Create a better routing structure with slug:
---

     - Product: Folder
         - [[...slug]] => The params
             - page.tsx => The component

             The content of the page.tsx file:

             interface Props {
                 params: {
                     slug: string;
                 }
             }
             const ProductDetailPage = ({ params: { slug } }: Props) => {
                 return (
                     <div>ProductDetailPage {slug}</div>
                 )
             }
     Note: No matter what the user type from the product folder in the browser, we
           can be able to capture all the routes and display the content of the page.tsx

---
12. Access Query Params:

---

    Let's say, we want to sort an array by name or email by clicking oo them:
    Install fast-sort: npm i fast-sort 

    - Users: folder
      - page.tsx => The component

        interface Props {
           searchParams: {
           sortOrder: string;
          }
        }

      const UsersPage = async ({ searchParams: {sortOrder}}: Props) => {
           return (
               <>
                <h1>Users</h1>
                <UserTable sortOrder={sortOrder} />
              </>
          )
      }


    - UserTable: component
    
            import { sort } from 'fast-sort'

            interface  User {
                id: number;
                name: string;
                email: string;
            }
            
            interface Props {
                sortOrder: string;
            }

        
            const UserTable = async ({ sortOrder }: Props) => {

            const res = await fetch('https://jsonplaceholder.typicode.com/users');
            const users: User[] = await res.json();
    
            const sortedUsers = sort(users).asc(
            sortOrder === 'email' ? users => users.email : users => users.name
            );
    
            return (
                <table className='table table-bordered'>
                    <thead>
                    <tr>
                        {/*<th>Name</th>*/}
                        {/*<th>Email</th>*/}
                        <th>
                            <Link href="/users?sortOrder=name">Name</Link>
                        </th>
                        <th>
                            <Link href="/users?sortOrder=email">Email</Link>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortedUsers.map(user =>
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>)}
                    </tbody>
                </table>
            )
        }

    Note: when the user clicks on the name or email, the url will be updated with the
          query params. The query params will be accessed in the page.tsx file and passed
          to the UserTable component as props. The UserTable component will then sort the
          array based on the query params.

        ----- In a react way of doing things ------

        interface Props {
            sortOrder: string;
        }

        const UserTable = ({ sortOrder }: Props) => {
             const [users, setUsers] = useState<User[]>([]);
             const [loading, setLoading] = useState<boolean>(true);
             const [error, setError] = useState<string | null>(null);
    
             useEffect(() => {
                  const fetchUsers = async () => {
                    try {
                         const response = await fetch('https://jsonplaceholder.typicode.com/users');
                         const data = await response.json();
                         const sortedUsers = fastSort(data).asc((user: User) => user[sortOrder]);
                         setUsers(sortedUsers);
                    } catch (error) {
                         setError(error.message);
                    } finally {
                         setLoading(false);
                    }
                  }
                  fetchUsers();
             }, [sortOrder]);
    
             if (loading) {
                  return <Loading />
             }
    
             if (error) {
                  return <Error message={error} />
             }
    
             return (
                  <table className='table table-bordered'>
                    <thead>
                         <tr>
                              <th onClick={() => setSortOrder('name')}>Name</th>
                              <th onClick={() => setSortOrder('email')}>Email</th>
                         </tr>
                    </thead>
                    <tbody>
                         {users.map(user =>
                              <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                              </tr>)}
                    </tbody>
                  </table>
             )
        }


---
13. Layouts:
---
    
    We use layout to create UI that is shared with multiple pages. For example, we can
    create a layout for the header and footer of our app. We can also create a layout

    - Link only downoads the content of the target page
      Pre-fetches links that are in the viewport
      Caches pages on the client for faster navigation

    - The base layout that we have is where we can render all the other layout
      For example:
      If we want to have a specif layout for the admin:

         admin: Folder
                - layout.tsx => The component
                    interface Props {
                         children: React.ReactNode;
                    }
                    const AdminLayout = ({ children }: Props) => {
                        return (
                            <div className="flex">
                                <aside className="bg-slate-200 p-5 mr-5">Admin Sidebar</aside>
                                <div>{children}</div>
                            </div>
                        )
                    }
                - Admin Page: page.tsx => The component
                    const AdminPage = () => {
                        return (
                            <div>Admin Page</div>
                        )
                    }
         - We can even have a navigation component:
             const NavBar = () => {
                return (
                    <div className='flex bg-slate-200 p-5'>
                    <Link href="/" className='mr-5'>Next.js</Link>
                    <Link href="/users" >Users</Link>
            
                    </div>
                )
            }

        - In the base layout file, we can render the navbar and the children:

            return (
                <html lang="en" data-theme="winter">
                    <body className={inter.className}>
                    <NavBar />
                    <main className='p-5'>
                        {children}
                    </main>
                    </body>
                </html>
             )
---
14. Programmatic Navigation: 
---
   
    Sometimes, we want to navigate the user to different pages and for that, we can't use Link
    That is where programmatic navigation comes in. We can use the router hook to navigate the user
    to different pages.

    - Let's say in the user page
      - page.tsx => The component we have this button link 

        <Link href="/users/new" className='btn'>New User</Link>
      
      Our job is when click on this button, we want to navigate the user to the new user page
      if the new user page is created in the users folder, we are done.

      But if we are in the new user page coming back  to the user page is where we use programmatic navigation

      import {useRouter} from "next/navigation";

      const NewUserPage = () => {
    
        const router = useRouter()
           return (
               <button className='btn btn-primary' onClick={() => router.push('/users')}>
                  Create
               </button>
          )
        }
---
15. Loading UI using suspense:
---

    We use suspense to show a loading UI while we are fetching data from the server.
    One best way of testiong suspense page is to go to react devtools and search for 
    suspense and we can suspend the component by clicking watch to see how the component
    behaves when it is suspended.
    ----------------------------------------------
    Use:
        <Suspense fallback={<p>Loading...</p>}>
               <UserTable sortOrder={sortOrder} />
       </Suspense>
    ----------------------------------------------
    Note 1: instead since we have a lot of moving part while navigating a page, it will be better
            to use it in base layout file.

        Code:
           <html lang="en" data-theme="winter">
           <body className={inter.className}>
              <NavBar />
              <main className='p-5'>
                  <Suspense fallback={<p>Loading...</p>}>
                      {children}
                  </Suspense>
              </main>
           </body>
           </html>
    ----------------------------------------------
    Note 2: For bigger application, it will be useful to hndle suspense with a special 
            file called to loading file. Basically how that work is to create a loading.tsx
            component and import it in the base layout file and wrap the children with it.
       
          Code:

          const Loading = () => {
              return (
                 <div>Loading....</div>
              )
          }
    ----------------------------------------------
    Note 3: Take it to the next level by using daisyUI loading

         Just go the the daisyUI documentation and search for loading and copy the code

        const Loading = () => {
            return (
               <span className="loading loading-ring loading-md"></span>
            )
        } 
---
16. handling Not Found Errors:
---

     In nextjs, we have a built in component called NotFoundPage that we can use to handle
     This will automatically load this page when a given page is not found.

     const NotFoundPage = () => {
        return (
            <div>The requested Page doesn't exist.</div>
        )
     }

     ---- Create a custom not found page ----
     Let's say we want to create a custom not found page inside our usera folder:
     users: folder
          -[id]: folder
              - page.tsx => The component
              - not-found.tsx => The component


              ---- page.tsx:
              import {notFound} from "next/navigation";
              const UserDetailPage = () => {
  
                 if (id > 10) notFound();   => The hook we use to handle not found error
                  return (
                      <div>UserDetailPage</div>
                  )
              }
              ---- not-found.tsx:
              const NotFoundPage = () => {
                  return (
                      <div>The requested Page doesn't exist.</div>
                  )
              }
     ----------------------------------------------
      Unexpected Errors: are handle differently:
      for doesn't   => doesn&apos;t
      But can also be capture using special file called error.tsx
     
       interface  Props {
        error: Error;
        reset: () => void;
        }
        
        const ErrorPage = ({error, reset }: Props) => {
            return (
                <>
                <div>An unexpected error occurred.</div>
                <button className={"btn"} onClick={() => reset()}>Retry</button>
                </>
            )
        }
  
      Note: use this technic to handle unexpected errors in only some of the 
            part of your appplication

------------------ API building with Next.js -------------------------------
---
18. API Routes:
---
     - The http request in nextjs is handle by using the route file
     ---------- Getting all users ------------

     -app: folder
        - api: folder
            - users: folder
                export function GET(request: NextRequest) {
                return NextResponse.json( [
                    { id: 1, name: 'John Doe' },
                    { id: 2, name: 'Jane Doe' },
                ]);
            [id]: folder
                route.ts => The component
                export function GET(request: NextRequest) {
                    const { id } = request.params;
                    return NextResponse.json( { id, name: 'John Doe' });
                }

     - Browser access: localhost:3000/api/users
    
     Note: All the api routes specific to an id must created in the id folder
           and without the id must be created in the users folder

           All the CRUD related code can be found in the api folder.

     ------------- Validating  Request with Zod ----------------
     Documentation: zod.dev
     Install: npm i zod
  
     We can use Zod tro validate the request body and the request query params
     which can then make the validation much easier.
    
        - app: folder
            - api: folder
                - users: folder
                   
                    - schema.ts => The component
                        import {z} from "zod";

                        const schema = z.object({
                            name: z.string().min(3).max(20).optional(),
                        });
                        export default schema;

                [id]: folder
                 - route.ts => The component

                 // Update user by id
                    export async function PUT(request: NextRequest, {params}: {params: {id: number}}) {
                    // Validate the request body against the interface
                    const body = await request.json();

                        const validation = schema.safeParse(body)
                    
                        if (!validation.success)
                            return NextResponse.json(validation.error.errors, {status: 400});
                        if (params.id > 10)
                            return NextResponse.json({error: 'User Not found'}, {status: 404});
                    
                        return NextResponse.json({id: params.id, name: body.name}, {status: 201});
                    }


                        export function POST(request: NextRequest) {
                            const { body } = request;
                            const result = schema.safeParse(body);
                            if (!result.success) {
                                return NextResponse.badRequest(result.error);
                            }
                            return NextResponse.json(body);
                        }
---
19. Integrating Prisma for data modeling with mysql
---
    ---- Documentation: prisma.io ----

    Prisma is a database toolkit that consists of these tools:
    - Prisma Client: An auto-generated and type-safe query builder for Node.js 
      and TypeScript
    - Prisma Migrate: Declarative data modeling and migrations
    - Prisma Studio: GUI to view and edit data in your database
    - Prisma CLI: CLI to perform migrations and lift your Prisma schema

    - Install: npm i prisma 
    - Initialize: npx prisma init => To initialize prisma in our app
    - prisma connection string:
        https://www.prisma.io/docs/reference/database-reference/connection-urls
        and follow the configuration for mysql
    - set up mysql as provider in the schema.prisma file

    - We can run npm i prisma format => to format our prisma file
    - Prisma model documentation:
      https://www.prisma.io/docs/concepts/components/prisma-schema/data-model

    ----------- Start migration ----------

       - npx prisma migrate dev  
       - give a name to the migration
       - It is better to use DataGrip to manage the database
       - npx prisma format => to format the prisma file
       - npx prisma migrate dev => to migrate the database

    -------- Creation a prisma client ------------

       - To efficiently work with the database, we need to create a prisma client in 
         the prisma folder. We can use the prisma client to interact with the database.

       Note: It is very good to work with prisma client because when we change the schema
             of the database, the prisma client will automatically update the schema of the
             database.
       - Prisma client docs:
         https://prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices

       Recap:
         - npx i prisma
         - npx i format
         - npx prisma init => to initialize prisma in our app
             - That will create prisma folder and .env file
             - Go in the .env file and set up the connection string and don't forget to put .env
               gitignore file to avoid sending it to github
             - In the prisma folder, configure the prisma client in a new file client.ts
         - Add your model in the schema.prisma file in prism folder
         - npx prisma format => to format the prisma file
         - Configure the prisma client in the api folder
         - npx prisma migrate dev => to migrate the database
         - give a name to the migration
         - If the table is successfully created, test it using postman

         - In each api component folder, we can protect the schema, using zok
           to validate the request body and the request query params

         - prism schema => protected by zok schema in the api folder => which then validate
           everyting in the route file
---
20. Uploading files
---
      - Cloud platform: 
           - cloudinary.com    => create an account
           - Amazon s3
           - Google cloud storage
           - Microsoft Azure storage

      ----------- install cloudinary ------------

      - After creating an account
      - npm i next-cloudinary
      - Go to docs: https://next.cloudinary.dev/installation
      - Copy cloud the configuation and replace it in .env, change the name of the variable
        to NEXT_PUBLIC_CLOUDINARY_URL 
      - app folder:
         - Create a folder called upload
         - page.tsx => The component
           import { CldUploadWidget } from "next-cloudinary";
           const UploadPage = () => {
                return (
                    <CldUploadWidget uploadPreset=''></CldUploadWidget>
                )
            }
         - Where to find the preset we are using:
              - Go to website => setting => upload => upload preset => 
                click on add upload preset
              - We have the name of the upload preset
              - Copy it and change the signed mode to unsigned
              - In the folder section, we can choose the folder where we want to upload
                but for simplicity, we can leave it empty
              - Save 
              - The preset is now ready to be used and will be placed here
                 <CldUploadWidget uploadPreset=''></CldUploadWidget>

              - Upload page content code
                'use client'
                import { CldUploadWidget } from "next-cloudinary";

                const UploadPage = () => {
                    return (
                        <CldUploadWidget uploadPreset='gcku3tlc'>
                            {({ open }) =>
                            <button
                                className='btn btn-primary'
                                onClick={() => open()}>
                                Upload
                            </button> 
                           }
                        </CldUploadWidget>
                    )
                }
         Note: We use client here because of the button. If everything is correctly 
               set up, after clicking on the button, we window should open allowing us 
               to upload files
         NB: The documentation est better to write the code in the page.tsx file but
             for simplicity, we can write it in the upload folder

         - To see the image => cloudinary.com => media library => we can see the image
           we just uploaded

      ------------------ Show the uploaded image ------------------

      - Since every image we upload is combined with an id
        The code is self explanatory

        export async function GET(request: NextRequest){
        const products = await prisma.product.findMany();
        return NextResponse.json(products);
        }

        import { CldUploadWidget, CldImage } from "next-cloudinary";

        export async function POST(request: NextRequest){
        const body = await request.json();
        const validation = schema.safeParse(body)
        if (!validation.success)
        return NextResponse.json(validation.error.errors, {status: 400});
        
             const newProduct = await prisma.product.create({
                data: {
                    name: body.name,
                    price: body.price,
                }
            })
            return NextResponse.json(newProduct, {status: 201});
        }
      
      --------------- Customize the upload widget ----------------
       https://demo.cloudinary.com/uw/#/
       We can also customize ourserlve 
              options={{
                sources: ['local'],
                multiple: false,
                maxFiles: 5,
              }}
---
21. Authentication with next-auth
---
     ------ Next Auth basic set up ------
     - Documentation: https://next-auth.js.org/getting-started/example
     - npm i next-auth
     - Create a file called [...nextauth].ts in the api folder
     - Set up the route handler:
        - https://next-auth.js.org/configuration/initialization#route-handlers-app
        - /app/api/auth/[...nextauth]/route.ts
        - Configure the route.ts
            import NextAuth from "next-auth"
            const handler = NextAuth({});
            export { handler as GET, handler as POST }
        - set up the .env file
            NEXTAUTH_URL="http://localhost:3000"
            NEXTAUTH_SECRET=VFelfHAK7bXo3Dr+EWdEnJs4+VrBfs1slCxsBEAztpQ=
        - To generate the secret key we can use openssl
            openssl rand -base64 32 in the terminal

     --------- Configure a Google Provider ---------
     - We can use a provider to easily authenticate the user
     - On nextauth => Provider section => Google => which is the one we are using 
        website: https://next-auth.js.org/providers/google
     - Click the configuration link to set up a new project in google cloud platform
     - Configure a consent screen which ois the screen Google will show to the user
     - Choose external for devleopment mode only and internal for production
     - Set up the app name and support email which is your personal one
     - We can leave blank of the rest of the fields in dev mode and only provide
       deveoloer contact email which is your personal email
     - Save to continue
     
     ----- Configure scope -------
     Which kind of information we want to access from the user
     - Click add and remove scopes
        - Select email, profile....
        - update
        - Save and continue

     -----Add Test user ------
     - Add email of the test user
     - Save and continue
     - Go back dashboard

     ------ create credentials ------
     - Click on create credentials
     - Create credentials tab
     - Choose Auth client ID
     - Application type: Web application
     - App Name: .....
     - Add URI: http://localhost:3000
     - Authorized redirect URIs: http://localhost:3000/api/auth/callback/google
       We can find these URIs in the nextauth documentation there is one for dev mod
       and one for production
     - Create
     - Copy these credential into your .env file
        GOOGLE_CLIENT_ID=
        GOOGLE_CLIENT_SECRET=
   
     -------- Create a Google provider ---------
     - import: import GoogleProvider from "next-auth/providers/google"; in the route.ts file
     - Set up the provider:
        providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            }),
        ],
     - Add sign in in the navbar:
        <Link href="/api/auth/signin">Sign in</Link>
     - Voila we just have a test user that can sign in using google

     -------- Accessing the auth token ---------

     - To access the auth session in the client side, we have to go route layout file
     - Import the session: import {SessionProvider } from "next-auth/react";
     - Wrap everything in the session provider
        <SessionProvider session={pageProps.session}>
            <NavBar />
            <main className='p-5'>
                {children}
            </main>
        </SessionProvider>
     - This will create an error for that we have to wrap the session Provider inside
       of a separate component
     - In the app folder:
         - Add new folder: auth
         - Provider.tsx => The component
            import {SessionProvider } from "next-auth/react";
            interface Props {
                children: React.ReactNode;
            }
            const AuthProvider = ({ children }: Props) => {
                return (
                    <SessionProvider session={pageProps.session}>
                        {children}
                    </SessionProvider>
                )
            }
            export default AuthProvider;

        - In the layout file:
            import AuthProvider from "../auth/Provider";
            <AuthProvider>
                <NavBar />
                <main className='p-5'>
                    {children}
                </main>
            </AuthProvider>

     ----- Accessing the session in the navbar in client side -----

        - In the navbar component file:
            import {useSession} from "next-auth/react";
            const NavBar = () => {
                const {data: session, status} = useSession(); // Hook used to get the session
                return (
                    <div className='flex bg-slate-200 p-5'>
                        <Link href="/" className='mr-5'>Next.js</Link>
                        <Link href="/users" >Users</Link>
                        {session && <Link href="/api/auth/signout" className='ml-auto'>Sign out</Link>}
                        ... Render others condition here
                    </div>
                )
            }

     -------------- Accessing the auth session in server side ------
 
     - In the home page:
        import {getServerSession} from "next-auth";

        export default async function Home() {
        const session = await  getServerSession(authOptions); => Use to get the session
            return (
                <main>
                    <h1>Hello {session && <span>{session.user!.name}</span>}</h1>
                    <Link href="/users">Users</Link>
                    <ProductCard />
                </main>
            )
        }

     -------- Sign out the user ------

     - Navbar component:
       Updated code

       {status === 'authenticated' &&
            <div>
                {session.user!.name}
                <Link href="/api/auth/signout" className="ml-3">Logout</Link> 
            </div>
        }
   
     ------- protecting routes -------
     Using middleware to protect routes
      - Create a middleware.ts file outside of the app folder
      export { default } from "next-auth/middleware";

        export const config = {
        // *: 0 or more params
        // +: 1 or more params
        // ?: 0 or 1 params
        matcher: ['/dashboard/:path*']
        }

      --------- Prisma Adapter to store real user credentials -------
        - In the API Route file:
            import { PrismaAdapter } from "@next-auth/prisma-adapter"
            import { PrismaClient } from "@prisma/client"

            const prisma = new PrismaClient()

            export default NextAuth({
                providers: [
                    GoogleProvider({
                        clientId: process.env.GOOGLE_CLIENT_ID,
                        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                    }),
                ],
                adapter: PrismaAdapter(prisma),
            })
        - Docs: https://next-auth.js.org/v3/adapters/prisma

      - Time to set up the user information to store in the database
      - If we want to drop a table we can first delete it from the schema
      - run: npx prisma migrate dev

        
        


       
        
                 
                
   
    
    
