# Recipe Application

A application that allows a users to sign up and share their recipes. Written in **React** and **Redux** and connected to **Firebase**. `Redux Thunk` and `SASS Loader` was added to the project.

Link to repository [Here](https://github.com/tomkaar/recipes-application).

You can find a live version on [Heroku](https://recipes-application.herokuapp.com/).



## Application Structure and Dataflow

```
App (index.js)
    Navigation
	Messages
	Router 
		DashboardRecipePage
			PageHeader
			RecipeList
				RecipeItem
		SearchRecipePage
			RecipeListFilters
			RecipeList
				RecipeItem
		EditRecipePage
			PageHeader
			RecipeForm
		NewRecipePage
			PageHeader
			RecipeForm
		LoginPage
			LoginRegister
				LoginForm
				RegisterForm
```



`App` takes care of the essentials. initiating Firebase connection and checkes if a user is logged in as well as setting up the Redux Store. We also check if the user is logged in and we add our SCSS styles to the application.

React `Router` takes care of displaying each page. 

Each `page` component takes care of fetching and keeping the data relevant and updated for that page. This data will be saved in the page components state or in some cases Redux Store. This information will be passed down to the appropriate components that take care of the rendering to the screen.

​	

## Folder Structure 

**actions** - Functions used to update Firebase and Redux state

**components** - All the components in the Application

**firebase** - Firebase Setup and actions

**img** - Images

**pages** - The Page components 

**reducers** - All the reducers for Redux, functions that update the state on our users applicatio

**routers** - React Router Paths

**selectors** - Functionality that are used

**store** - Configurate and setup Redux Store

**styles** - All CSS writen in SCSS



## Database Structure

```
{
    "users": {
        "$uid": {
            "uid": "string",
            "email": "string"
        }
    },
    "recipeOwners": {
        "$uid": {
            "$recipe_id": "boolean"
        }
    },
    "recepies": {
        "$recepie_id": {
            "title": "string, index",
            "desciption": "string",
            "ingredients": "number",
            "instructions": "number",
            "createdBy": "userID",
            "timestamp": "number, index",
            "isVegetarian": "boolean"
        }
    },
    "ingredients": {
        "$recepie_id": {
            "ingredient": {
                "amount": "number",
                "measure": "string",
                "name": "string"
            }
        }
    },
    "instructions": {
        "$recepie_id": {
            "instruction": {
                "order": "number",
                "content": "string"
            }
        }
    },
    "user_likes": {
        "$uid": {
            "$recipe_id": "boolean"
        }
    },
    "recipe_likes": {
        "$recipe_id": {
            "$uid": "boolean"
        }
    }
}
```





