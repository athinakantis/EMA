# HR Application

## Features

- List rendering
- Login option
- Possibility to edit employee location, salary and department
- Employees are originally sorted in alphabetical order
- Options to filter by department, location or salary
- Option to promote one member of each department to teamleader

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

- React
- HTML
- JS
- CSS

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
