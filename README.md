# HR Application

## Features

-   Creates a database for employees and enters 20 default employees.
-   Options to **update, remove or add employees**
-   Options to filter employees based on **department or location**
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
    -   json-server

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

I've used the state property to pass error data in my try/catch blocks.  
However it's important to use an effect upon mount otherwise the app will crash because <q>Location state is null</q>.

```js
useEffect(() => {
    if (location.state) {
        setErrorInfo({
            status: location.state.status,
            message: location.state.message,
        });
    } else {
        setErrorInfo({
            status: 404,
            message: 'Page not found',
        });
    }
}, []);
```

### useRef hook

I by no means fully understand the useRef hook, but I found myself using when I implemented pagination into my app.

In EmployeeList.jsx

```js
const totalPages = useRef(0);
```

I initially set the totalPages to zero.
Later, I use a function I created to calculate how many pages will be needed based on how many total employees or filtered employees there are.

```js
totalPages.current = responseData.pages;
```

## Modules

Because I created the whole project based on the idea that elements would have shared characteristics unless specified otherwise, I did not want to alter every css file there is when I found out we should implement _modules_.

That's why there is currently an inconsistency in the css files.  
Now I know however, that if one wants to have style specific to the component, you can create a module for it.

I have used module styling for `Login.jsx`

### How I used module styling

1. Renamed the css file  
   A css module should include 'module' in it's filename. In my case `Login.css` became `Login.module.css`

2. Created the classes

```css
.logInPage {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: fit-content;
    flex-direction: column;
    position: relative;
    top: -160px;
    gap: 1rem;
}

.formDiv {
    display: flex;
    justify-content: space-between;
    gap: 1rem;

    &:not(:last-of-type) {
        margin: 0 0 0.5rem;
    }
}
```

3. Import styles

```js
// In Login.jsx

import styles from './Login.module.css';
```

4. Apply styles

```js
<form className={`${styles.form}`}>
    <div className={`${styles.formDiv}`}>
        <label htmlFor='username'>Username</label>
        <input
            className={`${styles.input}`}
            type='text'
            name='username'
            id='username'
            value={user.username}
            onChange={handleUser}
        />
    </div>
    <div className={`${styles.formDiv}`}>
        <label htmlFor='password'>Password</label>

        <input
            type='password'
            name='password'
            id='password'
            value={user.password}
            onChange={handleUser}
        />
    </div>
</form>
```

Then I applied the styles using **className**. This has to be done with a JSX expression, a template literal and then accessing that class through the styles object.
