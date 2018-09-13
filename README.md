# Recipe Application

This application uses **React**, **Redux** and **Firebase** aswell as some other functionallity.

`Redux Thunk` was added so I can use firebase inside the action reducter function. Normally redux down allow a function or promise to be use inside a action since the function has to be pure. People seem to use Redux Thunk to get around that problem. With redux thunk we can access the dispatch from inside the action. We can first call firebase and then update the redux state depending on the answer from firebase.



## Folder Structure 
`/components` - All the components in the Application
`/firebase` - Setup Firebase

`/routers` - React Router Paths and page components

`/reducers` - All the reducers for Redux
`/store` - Configurate and Setup Store to be used in Application
`/actions` - Create actions and fill them with information that will be passed into the Reducers to update the Redux State

`/selectors` - Functionality that are used often when working

`/styles` - All CSS writen in SCSS



## Scripts

use `npm start`  or  `yarn start` to start the application.


## Run
When happens when and how and why.

### On Start
1. `index.js` is base, here we import the Application itself (App) and we setup and connect to the Redux Store.
    We use `Provider` to make the store accessible to every component inside our app.
2. Inside `App.js` we create the foundation for our application itself. 
    We import and use Firebase to together with `componentWillMount` to check if the user is logged in. We also add our styles for the application.
    We use `connect` to allow access to the Redux Store on this component. If a user is logged in, we will update the store and this will trigger the rerender of the application. We use `userLogin` and `userLogout` to talk to the Store. We also import and use `<AppRouter>`.
3. `Routers/AppRouter` handles the different pages of the application. It looks at the URL and will render components based of the current URL.