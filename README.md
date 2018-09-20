# Recipe Application

A application that allows a users to sign up and share their recipes. Written in **React**, **Redux** and connected to **Firebase**.

`redux` används för att slippa passa data lika myket data mellan olika komponenter. För att kunna komma åt ex. användardata utan att behöva passa ner den mellan komponenter som egentligen inte behöver den. Gör det lättare att återanvända komponenter om de inte är lika beroende av varrandra. 

`SASS Loader` was added to allow the use of the SASS.

`Redux Thunk` was added so I can use dispatch function inside the Redux action Reducer. Normally redux don't allow a function or promise to be used inside a action since the function has to be pure. This middleware allows me to use functions and other methods so I can connect to firebase and update the users state when the connection is done. 



## Folder Structure 

**actions** - Functions used to update firebase and redux state
**components** - All the components in the Application
**firebase** - Setup Firebase
**reducers** - All the reducers for Redux, functions update the state on our users application
**routers** - React Router Paths
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

















## How?

Varje sida component har hand om att hämta data och att passa denna data till componenterna under. 





# Structure

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
			RecipeFiltersList
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



*DashboardPage*, *SearchRecipePage*, *EditRecipePage* tar hand om att hämta och uppdatera datan som skrivs ut av komponenterna på sidan. 











### App

Kopplar till Firebase och startar Redux Store. 



### Router

`/routers/router` importerar de olika sidorna/ komponenterna som existerar i Applikationen. Tar hand om att visa rätt sida beroende på nuvarande URL. Använder komponenten `RequireAuthentication` på de sidor som endast får besökas av registrerde användare ex. `/new` och `/edit`. 



### Navigation

Visas i toppen på alla sidan. 

### Messages

Visas på alla sidor. De små meddelandena som syns i högra nedre hörnet. Innehållet bestämms av innehållet i redux state.  



### Dashboard Page

Dashboard tar hand om att lyssna efter ändringar i databasen, detta görs mer listeners. På ComponentDidMount skapar vi listeners till databasen (*child_added*, *child_removed*, *child_changed*). När någon av dessa listeners tar emot data, pushas denna data till redux globala state och sidan uppdateras med den nya datan. `RecipeList` får data från Redux State och tar hand om att skriva ut det som finns där. Skriver endast ut de 10 sista. 



### RecipeList

Tar endast emot den data som ska skrivas ut och har inget state och är därför en stateless component. Om det inte finns någon data så säger den att den laddar, om det finns data så använder den `RecipeListItem` componenten. Används på både 

### RecipeListItem

Tar endast emot data och skriver ut det till sidan. Den är stateless då den inte hanterar något state. Den tar emot data som handlar om ett recept och skapar varje recept. Det kopplar till redux state som har hand om att hålla koll på om en användare är inloggad. Den använder användarens unika id (`uid`) och kollar om värdet är samma som personen som har skapat receptet. Om detta är sant kommer knappar för att Redigera och Updatera visas för användaren.

### SearchListFilters

En stateless komponent som tar sina props från redux state. Elementen som renderas användas för att updatera redux state. När redux state uppdateras, uppdateras de recipes som visas på sidan. 

















