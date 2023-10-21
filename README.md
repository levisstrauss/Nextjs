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

        ------------  tailwind element --------

        Paddings:

            p-1 // padding: 0.25rem; All padding
            px-1 // padding-left: 0.25rem; padding-right: 0.25rem; Horizontal padding
            py-1 // padding-top: 0.25rem; padding-bottom: 0.25rem; Vertical padding
            pt-1 // padding-top: 0.25rem; Top padding
            pr-1 // padding-right: 0.25rem; Right padding
            pb-1 // padding-bottom: 0.25rem; Bottom padding
            pl-1 // padding-left: 0.25rem; Left padding
    
        margins:
 
            m-1 // margin: 0.25rem; All margin
            mx-1 // margin-left: 0.25rem; margin-right: 0.25rem; Horizontal margin
            my-1 // margin-top: 0.25rem; margin-bottom: 0.25rem; Vertical margin
            mt-1 // margin-top: 0.25rem; Top margin
            mr-1 // margin-right: 0.25rem; Right margin
            mb-1 // margin-bottom: 0.25rem; Bottom margin
            ml-1 // margin-left: 0.25rem; Left margin

        Text:
 
            text-1xl // font-size: 1.25rem; Text size
            text-red-500 // color: #EF4444; Text color
            text-center // text-align: center; Text align
            text-bold // font-weight: bold; Text bold
            text-italic // font-style: italic; Text italic
            text-underline // text-decoration: underline; Text underline
            text-white // color: #fff; Text color
            text-black // color: #000; Text color
            text-gray-500 // color: #6B7280; Text color
            text-green-500 // color: #10B981; Text color
            text-blue-500 // color: #3B82F6; Text color
            text-yellow-500 // color: #F59E0B; Text color
            text-red-500 // color: #EF4444; Text color

        Flex:
   
            flex // display: flex; Flex
            flex-row // flex-direction: row; Flex direction
            flex-col // flex-direction: column; Flex direction
            flex-wrap // flex-wrap: wrap; Flex wrap
            flex-1 // flex: 1; Flex
            flex-grow // flex-grow: 1; Flex grow
            flex-shrink // flex-shrink: 1; Flex shrink
            flex-basis // flex-basis: 1; Flex basis
            justify-center // justify-content: center; Justify content
            items-center // align-items: center; Align items
            content-center // align-content: center; Align content
            self-center // align-self: center; Align self
            flex-auto // flex: 1 1 auto; Flex auto
            flex-initial // flex: 0 1 auto; Flex initial
            flex-none // flex: none; Flex none
            flex-grow-0 // flex-grow: 0; Flex grow
            flex-grow-1 // flex-grow: 1; Flex grow
            flex-shrink-0 // flex-shrink: 0; Flex shrink
            flex-shrink-1 // flex-shrink: 1; Flex shrink
            flex-basis-0 // flex-basis: 0; Flex basis
            flex-basis-1 // flex-basis: 1; Flex basis
            flex-basis-auto // flex-basis: auto; Flex basis
            flex-wrap-reverse // flex-wrap: wrap-reverse; Flex wrap
            flex-wrap-no-wrap // flex-wrap: nowrap; Flex wrap
            flex-wrap-wrap // flex-wrap: wrap; Flex wrap
            flex-row-reverse // flex-direction: row-reverse; Flex direction
            flex-row-reverse // flex-direction: row-reverse; Flex direction
            flex-col-reverse // flex-direction: column-reverse; Flex direction
            flex-grow-0 // flex-grow: 0; Flex grow
            flex-grow-1 // flex-grow: 1; Flex grow
            flex-shrink-0 // flex-shrink: 0; Flex shrink
            flex-shrink-1 // flex-shrink: 1; Flex shrink
            flex-basis-0 // flex-basis: 0; Flex basis
            flex-basis-1 // flex-basis: 1; Flex basis
            flex-basis-auto // flex

        Grid:

            grid // display: grid; Grid
            grid-cols-1 // grid-template-columns: repeat(1, minmax(0, 1fr)); Grid columns
            grid-cols-2 // grid-template-columns: repeat(2, minmax(0, 1fr)); Grid columns
            grid-cols-3 // grid-template-columns: repeat(3, minmax(0, 1fr)); Grid columns
            grid-cols-4 // grid-template-columns: repeat(4, minmax(0, 1fr)); Grid columns
            grid-cols-5 // grid-template-columns: repeat(5, minmax(0, 1fr)); Grid columns
            grid-cols-6 // grid-template-columns: repeat(6, minmax(0, 1fr)); Grid columns
            grid-cols-7 // grid-template-columns: repeat(7, minmax(0, 1fr)); Grid columns
            grid-cols-8 // grid-template-columns: repeat(8, minmax(0, 1fr)); Grid columns
            grid-cols-9 // grid-template-columns: repeat(9, minmax(0, 1fr)); Grid columns
            grid-cols-10 // grid-template-columns: repeat(10, minmax(0, 1fr)); Grid columns
            grid-cols-11 // grid-template-columns: repeat(11, minmax(0, 1fr)); Grid columns
            grid-cols-12 // grid-template-columns: repeat(12, minmax(0, 1fr)); Grid columns
            grid-cols-none // grid-template-columns: none; Grid columns
            gap-1 // gap: 0.25rem; Grid gap
            gap-2 // gap: 0.5rem; Grid gap
            gap-3 // gap: 0.75rem; Grid gap
            gap-4 // gap: 1rem; Grid gap
            gap-5 // gap: 1.25rem; Grid gap
            gap-6 // gap: 1.5rem; Grid gap
            gap-7 // gap: 1.75rem; Grid gap
            gap-8 // gap: 2rem; Grid gap
            gap-9 // gap: 2.25rem; Grid gap
            gap-10 // gap: 2.5rem; Grid gap
            gap-11 // gap:

        Color:

            bg-white // background-color: #fff; Background color
            bg-black // background-color: #000; Background color
            bg-gray-500 // background-color: #6B7280; Background color
            bg-green-500 // background-color: #10B981; Background color
            bg-blue-500 // background-color: #3B82F6; Background color
            bg-yellow-500 // background-color: #F59E0B; Background color
            bg-red-500 // background-color: #EF4444; Background color
            bg-transparent // background-color: transparent; Background color
            bg-current // background-color: currentColor; Background color
            bg-gray-500 // background-color: #6B7280; Background color
            bg-green-500 // background-color: #10B981; Background color
            bg-blue-500 // background-color: #3B82F6; Background color
            bg-yellow-500 // background-color: #F59E0B; Background color
            bg-red-500 // background-color: #EF4444; Background color
            bg-white // background-color: #fff; Background color
            bg-black // background-color: #000; Background color
            bg-gray-500 // background-color: #6B7280; Background color
            bg-green-500 // background-color: #10B981; Background color
            bg-blue-500 // background-color: #3B82F6; Background color
            bg-yellow-500 // background-color: #F59E0B; Background color
            bg-red-500 // background-color: #EF4444; Background color
            bg-transparent // background-color: transparent; Background color
            bg-current // background-color: currentColor; Background color
            bg-gray-500 // background-color: #6B7280; Background color
            bg-green-500 // background-color: #10B981; Background color
            bg-blue-500 // background-color: #3B82F6; Background color
            bg-yellow-500 // background-color: #F59E0B; Background color
            bg-red-500 // background-color: #EF4444; Background color
            bg-white // background-color: #fff; Background color
            bg-black // background-color: #000; Background color
            bg-gray-500 // background-color: #6

        Border:

            border // border-width: 1px; Border width
            border-0 // border-width: 0; Border width
            border-2 // border-width: 2px; Border width
            border-4 // border-width: 4px; Border width
            border-8 // border-width: 8px; Border width
            border-t // border-top-width: 1px; Border top width
            border-t-0 // border-top-width: 0; Border top width
            border-t-2 // border-top-width: 2px; Border top width
            border-t-4 // border-top-width: 4px; Border top width
            border-t-8 // border-top-width: 8px; Border top width
            border-r // border-right-width: 1px; Border right width
            border-r-0 // border-right-width: 0; Border right width
            border-r-2 // border-right-width: 2px; Border right width
            border-r-4 // border-right-width: 4px; Border right width
            border-r-8 // border-right-width: 8px; Border right width
            border-b // border-bottom-width: 1px; Border bottom width
            border-b-0 // border-bottom-width: 0; Border bottom width
            border-b-2 // border-bottom-width: 2px; Border bottom width
            border-b-4 // border-bottom-width: 4px; Border bottom width
            border-b-8 // border-bottom-width: 8px; Border bottom width
            border-l // border-left-width: 1px; Border left width
            border-l-0 // border-left-width: 0; Border left width
            border-l-2 // border-left-width: 2px; Border left width
            border-l-4 // border-left-width: 4px; Border left width
            border-l-8 // border-left-width: 8px; Border left width
            border-solid // border-style: solid; Border style
            border-dashed // border-style: dashed; Border style
            border-dotted // border-style: dotted; Border style
            border-double // border-style: double; Border style
            border-none // border-style: none; Border style
            border-collapse // border-collapse: collapse; Border collapse
            border-separate //

        Rounded:

            rounded // border-radius: 0.25rem; Border radius
            rounded-none // border-radius: 0; Border radius
            rounded-sm // border-radius: 0.125rem; Border radius
            rounded // border-radius: 0.25rem; Border radius
            rounded-md // border-radius: 0.375rem; Border radius
            rounded-lg // border-radius: 0.5rem; Border radius
            rounded-xl // border-radius: 0.75rem; Border radius
            rounded-2xl // border-radius: 1rem; Border radius
            rounded-3xl // border-radius: 1.5rem; Border radius
            rounded-full // border-radius: 9999px; Border radius
            rounded-t-none // border-top-left-radius: 0; border-top-right-radius: 0; Border top left radius
            rounded-r-none // border-top-right-radius: 0; border-bottom-right-radius: 0; Border top right radius
            rounded-b-none // border-bottom-right-radius: 0; border-bottom-left-radius: 0; Border bottom right radius
            rounded-l-none // border-top-left-radius: 0; border-bottom-left-radius: 0; Border top left radius
            rounded-t-sm // border-top-left-radius: 0.125rem; border-top-right-radius: 0.125rem; Border top left radius
            rounded-r-sm // border-top-right-radius: 0.125rem; border-bottom-right-radius: 0.125rem; Border top right radius
            rounded-b-sm // border-bottom-right-radius: 0.125rem; border-bottom-left-radius: 0.125rem; Border bottom right radius
            rounded-l-sm // border-top-left-radius: 0.125rem; border-bottom-left-radius: 0.125rem; Border top left radius
            rounded-t // border-top-left-radius: 0.25rem; border-top-right-radius: 0.25rem; Border top left radius
            rounded-r // border-top-right-radius: 0.25rem; border-bottom-right-radius: 0.25rem; Border top right radius
            rounded-b // border-bottom-right-radius: 0.25rem; border-bottom-left-radius: 0.25rem; Border bottom right radius
            rounded-l // border-top-left-radius: 0.25rem; border-bottom-left
        
        Shadow:

            shadow-sm // box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); Box shadow
            shadow // box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); Box shadow
            shadow-md // box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); Box shadow
            shadow-lg // box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); Box shadow
            shadow-xl // box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); Box shadow
            shadow-2xl // box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); Box shadow
            shadow-inner // box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06); Box shadow
            shadow-none // box-shadow: none; Box shadow
            shadow // box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); Box shadow
            shadow-md // box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); Box shadow
            shadow-lg // box-shadow: 0 10px

        Opacity:

            opacity-0 // opacity: 0; Opacity
            opacity-5 // opacity: 0.05; Opacity
            opacity-10 // opacity: 0.1; Opacity
            opacity-20 // opacity: 0.2; Opacity
            opacity-25 // opacity: 0.25; Opacity
            opacity-30 // opacity: 0.3; Opacity
            opacity-40 // opacity: 0.4; Opacity
            opacity-50 // opacity: 0.5; Opacity
            opacity-60 // opacity: 0.6; Opacity
            opacity-70 // opacity: 0.7; Opacity
            opacity-75 // opacity: 0.75; Opacity
            opacity-80 // opacity: 0.8; Opacity
            opacity-90 // opacity: 0.9; Opacity
            opacity-95 // opacity: 0.95; Opacity
            opacity-100 // opacity: 1; Opacity

        Cursor:
   
            cursor-auto // cursor: auto; Cursor
            cursor-default // cursor: default; Cursor
            cursor-pointer // cursor: pointer; Cursor
            cursor-wait // cursor: wait; Cursor
            cursor-text // cursor: text; Cursor
            cursor-move // cursor: move; Cursor
            cursor-not-allowed // cursor: not-allowed; Cursor
            cursor-auto // cursor: auto; Cursor
            cursor-default // cursor: default; Cursor
            cursor-pointer // cursor: pointer; Cursor
            cursor-wait // cursor: wait; Cursor
            cursor-text // cursor: text; Cursor
            cursor-move // cursor: move; Cursor
            cursor-not-allowed // cursor: not-allowed; Cursor
            cursor-auto // cursor: auto; Cursor
            cursor-default // cursor: default; Cursor
            cursor-pointer // cursor: pointer; Cursor
            cursor-wait // cursor: wait; Cursor
            cursor-text // cursor: text; Cursor
            cursor-move // cursor: move; Cursor
            cursor-not-allowed // cursor: not-allowed; Cursor
            cursor-auto // cursor: auto; Cursor
            cursor-default // cursor: default; Cursor
            cursor-pointer // cursor: pointer; Cursor
            cursor-wait // cursor: wait; Cursor
            cursor-text // cursor: text; Cursor
            cursor-move // cursor: move; Cursor
            cursor-not-allowed // cursor: not-allowed; Cursor
            cursor-auto // cursor: auto; Cursor
            cursor-default // cursor: default; Cursor
            cursor-pointer // cursor: pointer; Cursor
            cursor-wait // cursor: wait; Cursor
            cursor-text // cursor: text; Cursor
            cursor-move // cursor: move; Cursor
            cursor-not-allowed // cursor: not-allowed; Cursor
            cursor-auto // cursor: auto; Cursor
            cursor-default // cursor: default; Cursor
            cursor-pointer // cursor: pointer; Cursor
            cursor-wait // cursor: wait; Cursor
            cursor-text // cursor: text; Cursor
            cursor-move // cursor: move; Cursor
            cursor-not-allowed // cursor: not-allowed; Cursor
            cursor-auto // cursor: auto; Cursor
            cursor-default // cursor: default; Cursor
            cursor-pointer // cursor: pointer; Cursor
            cursor-wait // cursor: wait; Cursor
            cursor-text // cursor: text;

        Width:
   
            w-0 // width: 0; Width
            w-1 // width: 0.25rem; Width
            w-2 // width: 0.5rem; Width
            w-3 // width: 0.75rem; Width
            w-4 // width: 1rem; Width
            w-5 // width: 1.25rem; Width
            w-6 // width: 1.5rem; Width
            w-7 // width: 1.75rem; Width
            w-8 // width: 2rem; Width
            w-9 // width: 2.25rem; Width
            w-10 // width: 2.5rem; Width
            w-11 // width: 2.75rem; Width
            w-12 // width: 3rem; Width
            w-14 // width: 3.5rem; Width
            w-16 // width: 4rem; Width
            w-20 // width: 5rem; Width
            w-24 // width: 6rem; Width
            w-28 // width: 7rem; Width
            w-32 // width: 8rem; Width
            w-36 // width: 9rem; Width
            w-40 // width: 10rem; Width
            w-44 // width: 11rem; Width
            w-48 // width: 12rem; Width
            w-52 // width: 13rem; Width
            w-56 // width: 14rem; Width
            w-60 // width: 15rem; Width
            w-64 // width: 16rem; Width
            w-72 // width: 18rem; Width
            w-80 // width: 20rem; Width
            w-96 // width: 24rem; Width
            w-auto // width: auto; Width
            w-px // width: 1px; Width
            w-1/2 // width: 50%; Width
            w-1/3 // width: 33.333333%; Width
            w-2/3 // width: 66.666667%; Width
            w-1/4 // width: 25%; Width
            w-2/

        Height:

            h-0 // height: 0; Height
            h-1 // height: 0.25rem; Height
            h-2 // height: 0.5rem; Height
            h-3 // height: 0.75rem; Height
            h-4 // height: 1rem; Height
            h-5 // height: 1.25rem; Height
            h-6 // height: 1.5rem; Height
            h-7 // height: 1.75rem; Height
            h-8 // height: 2rem; Height
            h-9 // height: 2.25rem; Height
            h-10 // height: 2.5rem; Height
            h-11 // height: 2.75rem; Height
            h-12 // height: 3rem; Height
            h-14 // height: 3.5rem; Height
            h-16 // height: 4rem; Height
            h-20 // height: 5rem; Height
            h-24 // height: 6rem; Height
            h-28 // height: 7rem; Height
            h-32 // height: 8rem; Height
            h-36 // height: 9rem; Height
            h-40 // height: 10rem; Height
            h-44 // height: 11rem; Height
            h-48 // height: 12rem; Height
            h-52 // height: 13rem; Height
            h-56 // height: 14rem; Height
            h-60 // height: 15rem; Height
            h-64 // height: 16rem; Height
            h-72 // height: 18rem; Height
            h-80 // height: 20rem; Height
            h-96 // height: 24rem; Height
            h-auto // height: auto; Height
            h-px // height: 1px; Height
            h-1/2 // height: 50%; Height
            h-1/3 // height: 33.333333%; Height
            h-2/3 // height: 66.666667%; Height
            h-1/4 // height: 25%; Height
            h-2/

        Thickness:

            font-thin // font-weight: 100; Font weight
            font-extralight // font-weight: 200; Font weight
            font-light // font-weight: 300; Font weight
            font-normal // font-weight: 400; Font weight
            font-medium // font-weight: 500; Font weight
            font-semibold // font-weight: 600; Font weight
            font-bold // font-weight: 700; Font weight
            font-extrabold // font-weight: 800; Font weight
            font-black // font-weight: 900; Font weight

        table:
            table-borbered // border: 1px solid #e2e8f0; Border
            table-auto // table-layout: auto; Table layout
            table-fixed // table-layout: fixed; Table layout
            table-caption // display: table-caption; Display
            table-cell // display: table-cell; Display
            table-column // display: table-column; Display
            table-column-group // display: table-column-group; Display
            table-footer-group // display: table-footer-group; Display
            table-header-group // display: table-header-group; Display
            table-row-group // display: table-row-group; Display
            table-row // display: table-row; Display
            table-auto // table-layout: auto; Table layout
            table-fixed // table-layout: fixed; Table layout
            table-caption // display: table-caption; Display
            table-cell // display: table-cell; Display
            table-column // display: table-column; Display
            table-column-group // display: table-column-group; Display
            table-footer-group // display: table-footer-group; Display
            table-header-group // display: table-header-group; Display
            table-row-group // display: table-row-group; Display
            table-row // display: table-row; Display
            table-auto // table-layout: auto; Table layout
            table-fixed // table-layout: fixed; Table layout
            table-caption // display: table-caption; Display
            table-cell // display: table-cell; Display
            table-column // display: table-column; Display
            table-column-group // display: table-column-group; Display
            table-footer-group // display: table-footer-group; Display
            table-header-group // display: table-header-group; Display
            table-row-group // display: table-row-group; Display
            table-row // display: table-row; Display
            table-auto // table-layout: auto; Table layout
            table-fixed // table-layout: fixed; Table layout
            table-caption // display: table-caption; Display
            table-cell // display: table-cell; Display
            table-column // display: table-column; Display
            table-column-group // display: table-column-group; Display
            table-footer-group // display: table-footer-group; Display
            table-header-group // display: table-header-group; Display
            table-row-group // display: table-row-group; Display
            table-row // display: table-row; Display
            table-auto // table-layout: auto; Table layout
            table-fixed // table-layout:
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
