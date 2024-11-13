# HR Application

## Features

-   Promotion and demotion option of employees
-   List rendering
-   Login option
-   Edit employee option
-   Employees are sorted by department in alphabetical order
-   Options to sort by department, salary or location

## How To Use It

Clone the repository  
`git clone https://github.com/athinakantis/EMA.git`

In the terminal, run npm install  
This installs all the node modules needed to run the application  
`npm install`

Finally launch the application by running  
`npm run dev` in the terminal

## Technologies Used

-   React
-   HTML
-   JS
-   CSS

## What I've practiced and learnt

-   Conditonal rendering
-   useState hooks

I was today years old when I realised that I need to use the return keyword when rendering a list that spans multiple lines, aka that is wrapped in the curly brackets.

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

If only one element is returned, it is fine to exclude the return keyword.
