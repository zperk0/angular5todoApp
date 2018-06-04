# ToDoApp

Install the angular cli with 

```
$sudo npm install --unsafe-perm -g @angular/cli
```

Generate a new angular application with:

```
$ng new my-app
```

cd into your new application and start a development server by running 

```
$ng serve
```

After the cli is done compiling your application it starts a development server running on 

```
localhost:4200
```

Take a look at app.component.ts
The first thing you want to make note of, is that Component is imported from the angular core. Component is a decorator that we use to define basic information for our component. You'll notice the the Component decorator takes an object as a parameter and that object includes keys of selector, templateUrl, and styleUrls.

1. The selector defines html element to use in your html to access the component. This can be seen in the index.html as <app-root></app-root>

2. The templateUrl defines the html template file that this component should use.

3. The styleUrl works much like the templateUrl, except it defines the stylesheets and is an array of Urls rather than a single value.
 
Notice that inside the app.component.ts there is a variable of "title". Inside of our app.component.html we see on line 4 something that may look familiar to react 

```
{{title}}
```

angular uses double brackets rather than single, but this is doing the same thing as jsx does in react. It is interpolating a variable from our component into the component's template file. If we change title to something else we can see the changle reflected on localhost:4200.

The next thing we need to understand is angular modules. Angular uses modules to declare which components are available for rendering, and which services are available to those components. But we'll get to services later. Let's take a look inside app.module.ts.

The first thing to notice is that NgModule is imported from '@angular/core'. NgModule is a decorator that takes metadata that defines what components, services and other modules that your module should have access to. The declarations array inside of our NgModule is where we define what components this module is expected to render. 
The imports array is where we define other Modules that this module will utilize. You may notice that we already have the BrowserModule inside of the imports array. The browser module defines many things that are essential for Angular to run. It's important to note that you only need to import the BrowserModule inside of the main app.module. 

Our application is going to require a form to define our to-do's, so we will also need to import the forms module from:

```typescript
import { FormsModule } from '@angular/forms';
``` 

The forms module defines angular directives that allow us to do two-way data binding on form inputs. We'll get to an example of that very soon.
Now that we have the FormsModule imported, we need to add it into our module's imports.

We now have all the imports we will need for our to-do app, so lets take a look at the other properties of our NgModule decorator. The providers array is where we define services that will be available to our components. We don't have any services to import yet, but we will soon. Services are somewhat like util files in react, but with some added functionality. Angular will create one instance of the service for all of the components defined in the declarations array to use and monitor. Meaning that if one component changes data inside of the service, then all the other components using that service will see the change also. 

The last thing in our module decorator is the bootstrap array. The bootstrap array defines the main parent component that our application will start from. In almost all cases this will be the AppComponent. The bootstrap property, much like the browserModule, is only necessary to have inside of the main app.module.

Now that we have our app module setup, lets start actually building our application. We're going to use bootstrap to style our application, so let's add the bootstrap link into the head of our index.html

```html
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
```

Let's start building out a general skeleton for what our application is going to look like inside our app.component.html. Let's add a nav bar, a row for our form to add to do's, a row for our incomplete to-do's, and a row for our completed today's.

```html
<nav class="navbar navbar-dark bg-primary">
  <span class="navbar-brand">
    Another to do application.
  </span>
</nav>
<div class="container-fluid">
  <div>
    <div class="col-md-8 offset-md-2">
      <h2>Enter something you want to do.</h2>
      <p>---We need a form here---</p>
    </div>
  </div>
  <div class = "row">
    <div class="col-md-12">
        <h2>Here's your list of things to do</h2>
        <p>---We need to display all our incomplete to-do's here---</p>
    </div> 
  </div>
  <div class = "row">
    <div class="col-md-12">
      <h2>Here's your list of things you've done!</h2>
      <p>---We need to display all our complete to-do's here---</p>
    </div>
  </div>
</div>
```

Since we have a general skeleton of our application setup, it may be tempting to start building out components to actually make and see our to-do's, but let's first define the data that our components are going to utilize. Let's create a new folder called "types" at the root of our app directory. Inside of the types folder make a file called to-do.types.ts.

Inside of our newly created file we are going to create an interface for how our to-do data should be structured.

```typescript
export interface ToDo {
    title: string;
    description: string;
    done: boolean;
}
```

With the type of our data defined, now let's setup a service that will hold the data that our components will use. Make a new folder in the root of your app directory called "services". Inside of services make a file named to-do.service.ts

Inside of the ToDo service we need to require our ToDo interface from the types file.

```typescript
import { ToDo } from '../types/to-do.types';
```

With our ToDo interface now imported, we want to create a public array called thingsToDo that will have a type of ToDo.

```typescript
public thingsToDo: Array<ToDo> = [];
```

We have our service set up now, but we still need to provide it to our application to use. So let's open our app.module again and put the ToDoService into the providers array.

```typescript
providers: [ToDoService],
```

With our ToDoService provided to the application, we now have everything we need to start actually building out components for our application. Let's start with building a form to create a new thing to do. We can use the angular cli to scaffold a new component for us. First create a new folder at the root of your app directory called component. Cd into it and run this command to make the new component:

```
ng generate component to-do-form
```

The angular cli has now created a new component for us and even imported it into our app module.

To see our new component let's edit the app.component.html to have our new component's html tag.

```html
<app-to-do-form></app-to-do-form>
```

Inside the new form component we need to create some new variables for our form inputs to bind to. Lets call these todoTitle and todoDescription

```typescript
public todoTitle:string;
public todoDescription:string;
```

With variables defined to bind to, now lets create our form html.

```html
<div class="card">
  <div class="card-body">
    <form>
      <div class="form-group">
        <label for="todoTitle">Enter a title for your new todo</label>
        <input type="text" name = "todoTitle" class="form-control">
      </div>
      <div class="form-group">
        <label for="todoDescription">Enter a description</label>
        <textarea name="todoDescription" class = "form-control" rows="3"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Add to do</button>      
    </form>
  </div>
</div>
```

We now have a basic form, but we're missing a major key. We haven't done any data binding yet. To accomplish 2 way data binding in angular 2 we use a directive called ngModel. ngModel is supplied from the formsModule that we imported into the appmodule earlier.

```typescript
[(ngModel)] = "todoTitle"
```

We've now 2 way binded our form inputs to our variables, and the only step left for completing our form is to define what our form should do when we submit it. Inside to-do-form.component.ts lets create a submitTodo function.
We want to push or new todo into our todo service's thingsTodo array. To do this we'll need to import the todoService and instantiate it inside our components constructor.

```typescript
import { ToDoService } from '../../services/to-do.service';
```

Inside the submit function create a new object using our todoTitle and todoDescription and then push that into the thingsToDo array.

```typescript
public submitTodo(){
    const newTodo = {
      title: this.todoTitle,
      description: this.todoDescription,
      done: false
    }
    this.todoService.thingsToDo.push(newTodo);
}
```

With our newly defined submit function, let's actually call it when the user clicks the submit button.

```html
<button (click) = "submitTodo()" type="submit" class="btn btn-primary">Add to do</button>
```

We now see that our function is creating a new object in our thingsToDo array, but our form doesn't reset. Let's clear our variables after we push the newTodo

```typescript
this.todoTitle = '';
this.todoDescription = '';
```

Since we can actually create things to do now, we probably want to be able to see our things to do.
Lets create a to-do component inside the components folder.

```
ng generate component to-do
```

Our new todo component is just going to display a single todo's information, and be capable of marking it as done.
The todo component is going to take an input of the item it should display, so we need to import the Input decorator from the angular core.

```typescript
import { Component, OnInit, Input } from '@angular/core';
```

We also need to import the ToDo interface once again since the inputted item should match the ToDo type.

```typescript
import { ToDo } from '../../types/to-do.types';
```

With both of these inputted, we can now define our input. lets call it itemTodo and give it a type of ToDo

```typescript
@Input() itemTodo: ToDo;
```

Now that the input has been defined, lets create some html to display our item to do. 

```html
<div class="card">
  <div class="card-header">
    <strong>{{itemTodo.title}}</strong>
  </div>
  <div class="card-body">
    <div class="row">{{itemTodo.description}}</div>
</div>
```

Let's render our new to-do component. To do this let's go back to the app.component.html

Underneath the list of things to do text we're going to add some new html.

```html
<ng-container *ngFor = 'let todo of toDoService.thingsToDo'>
    <div class="col-md-4" *ngIf = "!todo.done">
        <app-to-do [itemTodo] = 'todo'>

        </app-to-do>
    </div>
</ng-container>
```
ng-container is simply an angular structural directive(element) that is meant to help us use template directives such as ngFor. It will not be visible when rendered.

ngFor is a very useful template directive that allows us to iterate over an array and create html for each element in the array. In this case we're getting each todo out of the todoService's thingsToDo array, and then passing that todo to a to-do component to be rendered.

You're probably also noticing the *ngIf inside of our new html. This is another angular template directive that helps to conditionally render html. Since we only want to render the todo's that are not done yet, we use ngIf to help do that.

We can now see the todo's we need to do, but need a way to mark them as done. Let's go back to to-do.component.html and add a button with the functionality to mark the item as done 

```html
<br>
<div class="row">
    <button class="btn btn-primary" (click) = "itemTodo.done = !itemTodo.done">
    <span *ngIf = "!itemTodo.done">Mark as done</span>
    <span *ngIf = "itemTodo.done">Do again</span>
    </button>
</div>
```

Once again I've used ngIf to show different text depending on wether the item is done or not. I've also setup a click event that will change the item's done state.

Now go back to app.component.html and create our done todo's using the same template from earlier but just changing the *ngIf.

```html
<ng-container *ngFor = 'let todo of toDoService.thingsToDo'>
    <div class="col-md-4" *ngIf = "todo.done">
        <app-to-do [itemTodo] = 'todo'>

        </app-to-do>
    </div>
</ng-container>
```

We now have a working to do application, but we could still improve it some by only showing "
Here's your list of things to do" and "Here's your list of things you've done!" if those items exist. To do this we're going to create functions in the app.component to only return arrays of done or undone items. 

```typescript   
public returnDoneItems(){
    return this.toDoService.thingsToDo.filter(item => item.done);
}
public returnUndoneItems(){
    return this.toDoService.thingsToDo.filter(item => !item.done);
}
```
Now that we have these functions we can refactor some code inside the app.component.html. Primarily changing our ngFors to use our new functions. We're also going to add new ngIfs on the todo item's headers.

```html
<div *ngIf = "returnUndoneItems().length" class = "row">
    <div class="col-md-12">
        <h2>Here's your list of things to do</h2>
    </div> 
    <ng-container *ngFor = 'let todo of returnUndoneItems()'>
        <div class="col-md-4" *ngIf = "!todo.done">
          <app-to-do [itemTodo] = 'todo'>

          </app-to-do>
        </div>
    </ng-container>
  </div>
  <div *ngIf = "returnDoneItems().length" class = "row">
    <div class="col-md-12">
      <h2>Here's your list of things you've done!</h2>
    </div>
    <ng-container *ngFor = 'let todo of returnDoneItems()'>
        <div class="col-md-4" *ngIf = "todo.done">
          <app-to-do [itemTodo] = 'todo'>

          </app-to-do>
        </div>
    </ng-container>
  </div>
  ```

  We now have a fully funtional and clean looking to do application. 

















