# HR Application

## Features

-   Creates a database for employees and enters 20 default employees.
-   Options to **update, remove or add employees**
-   Options to filter employees based on **department, location or salary**
-   Option to promote one member of each department to teamleader

## How To Use It

1. Clone the repository  
   `git clone https://github.com/athinakantis/EMA.git`

2. Navigate to the frontend directory and run  
   `npm install`

3. Navigate to the backend directory and run  
   `npm install`

4. Navigate to the project root directory and run  
   `npm install`

5. Finally, launch the application by running  
   `npm run dev` in the root directory

## Technologies Used

Framework: React

-   Frontend packages:
    -   axios
-   Backend packages:
    -   mysql2
    -   express
    -   dotenv

## Known flaws

Team leads don't persist between sessions yet.

## What I've practiced and learnt

### Mapping, and when to return

```js
{
    employees.map((employee) => {
        return (
            <div>
                <p>{employee.fullName}</p>
            </div>
        );
    });
}
```

Alternatively:

```js
{
    employees.map((employee) => (
        <div>
            <p>{employee.fullName}</p>
            <p>{employee.department}</p>
        </div>
    ));
}
```

If **only one element** is returned it is fine to exclude the return keyword.

### useState with objects

Althought somewhat familiar with it, this project really helped me practice the concept of using state with objects

#### Initial object value

```js
const [person, setPerson] = useState({
    name: 'John Doe',
    age: 25,
    isStudent: true,
});
```

#### Updating properties

```js
function handleChange(e) {
    const { value, name } = e.target;
    setPerson({ ...prev, [name]: value });
}
```

I've learnt to use destructuring with e.target for more readable code.  
Also, that you do not need to explicitly pass the event object anymore.

### Using conditions with props

```js
<Button
    role='secondary'
    text={edit ? 'Save' : 'Edit'}
    handleClick={() => setEdit((prev) => !prev)}
/>
```

I didn't realise until I really looked at it but here **we pass a prop depending on a condition**. I knew it was possible using i.e. className but I never really saw the nuance of it. And I figured we could do that with other types of data other than string, which turned out to be true.

When validating an updated employee I added two different functions:

```js
<Button
    role='secondary'
    text={edit ? 'Save' : 'Edit'}
    handleClick={edit ? handleUpdateEmployee : () => setEdit((prev) => !prev)}
/>
```

If the user is editing, we handle the data the user has passed. If not, we set editing to true to enable editing mode.

### Passing data through navigate

```js
//Login.jsx

<Button
    text='Login'
    handleClick={() => navigate('/home', { state: user.username })}
/>
```

```js
// Menu.jsx
import { useLocation } from 'react-router-dom';

function Menu() {
    const location = useLocation();
    const [username, setUsername] = useState(location.state);
}
```

Because I wanted to pass the username from my Login component to my Menu component, I had to research a little.  
Navigate takes an **optional 'options' object** as a parameter. This object can store multiple optional properties, one of these being `state`  
**State** can be of type **any**

The **problem** with this code is that when you navigate from another page, back to menu, it will set the username to be null. _whomp whomp_

Therefor my solution for now is to set the username in localstorage upon redirect, until maybe I find a better solution.

### useRef hook

I by no means fully understand the useRef hook, but I found myself using when I implemented pagination into my app.

In EmployeeList.jsx

```js
const totalPages = useRef(0);
```

I initially set the totalPages to zero.
Later, I use a function I created to calculate how many pages will be needed based on how many total employees there are.

```js
totalPages.current = calcListPages(await getEmployeeCount());
```
