# Recipe Application

A application that allows a users to sign up and share their recipes. Written in **React** and **Redux** and connected to **Firebase**.

`redux` används för att slippa passa data lika myket data mellan komponenter. Gör det lättare att återanvända komponenter om de inte är lika beroende av varandra. 

`SASS Loader` was added to allow the use of the SASS.

`Redux Thunk` was added so I can use dispatch function inside the Redux action Reducer. Normally redux don't allow a function or promise to be used inside a action since the function has to be pure. This middleware allows me to use functions and other methods so I can connect to firebase and update the users state when the connection is done. 



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



## Folder Structure 

**actions** - Functions used to update Firebase and Redux state
**components** - All the components in the Application
**firebase** - Firebase Setup
**reducers** - All the reducers for Redux, functions that update the state on our users application
**routers** - React Router Paths
**selectors** - Functionality that are used
**store** - Configurate and setup Redux Store
**styles** - All CSS writen in SCSS



## Application Structure and Dataflow

Varje sida/ Page komponent tar hand om att hämta data och att passa denna data till componenterna under. 

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



`App` takes care of the essentials. initiating Firebase connection and checkes if a user is logged in as well as setting up the Redux Store, we use `Provider` to to make the store accessible to every component inside our app. We also check if the user is logged in and we add our styles to the application.

React `Router` takes care of displaying each page, it looks at the current url and renders a component accordingly. 

Each `page` component takes care of fetching and keeping the data relevant and updated for that page. This data will be saved in the page components state or in some cases Redux Store. This information will be passed down to the appropriate components that take care of the rendering to the screen.



## Functionality Flow

#### Visits the Dashboard Page

The `DashboardPage` component which are located in `src/components/pages` will Mount with the help of `componentDidMount`. When the component mount we create a a reference to firebase and set up firebase eventlisteners *child_added*, *child_removed* and *child_changed*. All recipes will be stored in the state of the page. When a event is fired this will trigger `AddRecipeToState`, `RemoveRecipeFromState` or `EditRecipeOnState`, these functions will modify the state of the component, make sure that the state is updated properly. All the recipes `this.state.recipe` will be passed down to `Recipelist` which takes care of rendering the Recipes to the page. 

#### Visits the Search page

The `SearchPage` component which are located in `src/components/pages` will Mount with the help of `componentDidMount`. When the component mount we create a a reference to firebase and set up firebase eventlisteners *child_added*, *child_removed* and *child_changed*. All recipes will be stored in the state of the page. When a event is fired this will trigger `AddRecipeToState`, `RemoveRecipeFromState` or `EditRecipeOnState`, these functions will modify the state of the component, make sure that the state is updated properly. 

The filter properties are stored in Redux store for easy access.`RecipeListFilters` renders elements that are used to update the filter props. We can change *text*, order between *latest* and *oldest* and switch between displaying *All Recipes*, *Only Vegetarian* and *No Vegetarian* recipes. 

All the recipes `this.state.recipe` will be passed into `selectRecipes` which takes two inparameters, the recipes and the filter props. This function will filters and return only the recipes we wan't om the correct order. 

#### Visits the New recipe page

The `NewRecipePage` component which are located in `src/components/pages` only renders the `RecipeForm` used by the page does not handle a state. The `RecipeForm` component is used by both `NewRecipePage` and `EditRecipePage` and takes a `onSubmit` function. It can also take `recipeData`, but this prop is only used on the `EditRecipePage` component when we need to display some recipe when we render to edit.

#### Visits the Edit recipe page

The `EditRecipeData` component which are located in `src/components/pages` looks at the URL and picks up the recipes id `/edit/:recipe_id`  and try to fetch the data related to that id. It will fetch the *meta data* and *ingredients*. This data will be saved in the state and passed down to the `RecipeForm`. Just like `NewRecipeData` this component takes a `onSubmit` prop but also the info about the recipe. 

#### Visits the Login Page

The `LoginRegisterPage` which is located in `src/components/pages` will render the `LoginRegister` component (`src/components/auth/Loginregister`). This component takes care of everything that has to do with Registering and Logging in a user. This component is also used in the `requireAuthentication` component, so I created a component for that functionallity. 

#### Click the Login Button

If a user is Logged In, the Login button will be displayed. This button is connected to the `Login` function located in `src/actions/auth` this function takes care the logging the user in and updating the Redux state where the user information is located. It will display a message depending on if the message is successfull or failed. 

#### Click Logout Button

If a user is Logged In, the `Logout` button will be displayed. This button is connected to the `Logout` function located in `src/actions/auth` this function takes care the logging the user out and updateing the Redux state where the user information is located. It will display a message depending on if the message is successfull or failed. 

#### Add a recipe

This is located on the `NewRecipePage` and is rendered by the `NewRecipePage` component. When rendered it takes a `onSubmit` inparameter. This inparameter will be triggered when the user click the Submit button and takes care of everything after that. This will use the `AddRecipeToFirebase` function and pass in all the data the user provided. 

#### Removes a recipe

When A user click the Remove button on a Recipe Item it will fire the `RemoveRecipeFromFirebase` function which is located in `src/actions/recipes`. This function will take the *id* of the recipe. If the request to the database is successfull, a message will be displayed on screen and the state will be updated. Removing the recipe from the screen. If not successfull and error message will be displayed on the screen instead. 

#### Edit Recipe

When a user click on the *Edit* button on a recipe it will direct you to

#### Like a Recipe

Fires the `AddLikeToFirebase` function which is located in `src/actions/recipes`, This function will update the user_likes and recipe_likes in firebase. If this was a success, it will fire `AddUserLikeToState` to keep the state synced to the changes. When the state in updated, this will trigger the button and and change the Like button to a Unlike button.

#### Remove a Like from Recipe

Fires the `RemoveLikeFromFirebase` function which is located in `src/actions/recipes`... This function will update the user_likes and recipe_likes in firebase. If this was a success, it will fire RemoveUserLikeFromState to keep the state synced to the changes. When the state in updated, this will trigger the button and and change the UnLike button to a Like button..

#### Comments on a Recipe

#### Remove a Comment on a Recipe



#### Interact with RecipeListFilters

When you interact with the recipe filters, you will update the Redux State. You update the filters with the `RecipeListFilters` component. 









