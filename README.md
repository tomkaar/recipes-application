# Recipe Application

A application that allows a users to sign up and share their recipes. Written in **React** and **Redux** and connected to **Firebase**.

`redux` används för att slippa passa data lika myket data mellan komponenter. Gör det lättare att återanvända komponenter om de inte är lika beroende av varandra. 

`SASS Loader` was added to allow the use of the SASS.

`Redux Thunk` was added so I can use dispatch function inside the Redux action Reducer. Normally redux don't allow a function or promise to be used inside a action since the function has to be pure. This middleware allows me to use functions and other methods so I can connect to firebase and update the users state when the connection is done. 



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



## Application Structure and Dataflow

```
App
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



`App` takes care of the essentials. initiating Firebase connection and checkes if a user is logged in as well as setting up the Redux Store, we use `Provider` to to make the store accessible to every component inside our app. We also check if the user is logged in and we add our SCSS styles to the application.

React `Router` takes care of displaying each page, it looks at the current url and renders a component accordingly. 

Each `page` component takes care of fetching and keeping the data relevant and updated for that page. This data will be saved in the page components state or in some cases Redux Store. This information will be passed down to the appropriate components that take care of the rendering to the screen.

​	

## Database Structure

```
{
    users: {
        $uid: {
            uid: string,
            email string
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
            instructions: number,
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
    },
    user_likes: {
    	user_id: {
    		recipe_id: boolean
    	}
    },
    recipe_likes: {
		recipe_id: {
			user_id: boolean
    	}
    }
}
```





