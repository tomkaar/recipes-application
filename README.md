# Recipe Application

A application that allows a users to sign up and share their recipes. Written in **React**, **Redux** and **Firebase**.

`SASS Loader` was added to allow the use of the SASS, CSS extension language.

`Redux Thunk` was added so I can use dispatch function inside the Redux action Reducer. Normally redux don't allow a function or promise to be used inside a action since the function has to be pure, Redux Thunk to get around that. 



## Folder Structure 

**actions** - Functions to update update firebase and state
**components** - All the components in the Application
**firebase** - Setup Firebase
**reducers** - All the reducers for Redux
**routers** - React Router Paths and page components
**selectors** - Functionality that are used
**store** - Configurate and Setup Store to be used in Application
**styles** - All CSS writen in SCSS



## Database Structure

```
{
    users: {
        $uid: {
            firstName: string,
            lastName string,
            username: string
        }
    },
    recipeOwners: {
        $uid: {
            $recipe_id: boolean
        }
    }
    recepies: {
        $recepie_id: {
            title: string, index
            desciption: string,
            ingredients: number,
            createdBy: userID,
            timestamp: number, index
            isVegetarian: boolean
        }
    },
    ingredients: {
        $recepie_id: {
        	ingredient: {
                amount: number,
                measure: string,
                name: string
        	}
        }
    },
    instructions: {
        $recepie_id: {
            instruction: {
                order: number,
                content: string
            }
        }
    }
}
```




## Run
When happens when and how and why.

### On Start
1. `index.js` is base, here we import the Application itself (App) and we setup and connect to the Redux Store.
    We use `Provider` to make the store accessible to every component inside our app.
2. Inside `App.js` we create the foundation for our application itself. 
    We import and use Firebase to together with `componentWillMount` to check if the user is logged in. We also add our styles for the application.
    We check if a user is logged in, we will update the store and this will trigger the rerender of the application. We use `userLogin` and `userLogout` update the Store. 
3. `Routers/AppRouter` handles the different pages of the application. It looks at the URL and will render components based of the current URL. 











